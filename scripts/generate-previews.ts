#!/usr/bin/env tsx
/**
 * Generate preview.html / preview-dark.html for each content/projects/<slug>/.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts
 *   ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts --slug agentic-genius
 *   ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts --force
 *   pnpm tsx scripts/generate-previews.ts --dry-run --slug agentic-genius
 *
 * The key is also auto-loaded from .env.local at the project root.
 */
import { config as loadDotenv } from 'dotenv';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import {
  PREVIEW_MODEL,
  PREVIEW_SYSTEM_PROMPT,
  buildPreviewUserPrompt,
} from '../lib/anthropic';
import { MINGCUTE_ICONS, FALLBACK_SVG } from '../lib/mingcute-icons';

// .env.local overrides shell env so an empty ANTHROPIC_API_KEY in zsh
// doesn't shadow the value in the file.
loadDotenv({ path: join(process.cwd(), '.env.local'), override: true });
loadDotenv({ path: join(process.cwd(), '.env'), override: false });

type Theme = 'light' | 'dark';

type Args = {
  slug?: string;
  force: boolean;
  dryRun: boolean;
};

function parseArgs(argv: string[]): Args {
  const args: Args = { force: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--slug') args.slug = argv[++i];
    else if (a.startsWith('--slug=')) args.slug = a.slice(7);
    else if (a === '--force') args.force = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--help' || a === '-h') {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown arg: ${a}`);
      printHelp();
      process.exit(2);
    }
  }
  return args;
}

function printHelp(): void {
  console.log(`generate-previews.ts — render preview.html / preview-dark.html

Options:
  --slug <name>   Only process content/projects/<name>
  --force         Ignore .preview-hash and regenerate
  --dry-run       Print prompt summary, do not call API
  -h, --help      Show this message

Env:
  ANTHROPIC_API_KEY   Required unless --dry-run`);
}

const ROOT = join(process.cwd(), 'content', 'projects');

function listSlugs(filter?: string): string[] {
  const all = readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => existsSync(join(ROOT, d.name, 'DESIGN.md')))
    .map((d) => d.name);
  if (filter) {
    if (!all.includes(filter)) {
      throw new Error(`Slug "${filter}" not found under content/projects/`);
    }
    return [filter];
  }
  return all;
}

function hashFile(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

type HashRecord = Partial<Record<Theme, string>> & { source?: string };

function readHashRecord(path: string): HashRecord {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as HashRecord;
  } catch {
    return {};
  }
}

function extractHtml(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:html)?\n?([\s\S]*?)\n?```$/);
  const body = fenceMatch ? fenceMatch[1] : trimmed;
  const docStart = body.indexOf('<!DOCTYPE');
  return docStart >= 0 ? body.slice(docStart).trimEnd() + '\n' : body.trimEnd() + '\n';
}

const ICON_PLACEHOLDER_RE = /<i\s+([^>]*?)data-mc="([a-z0-9_]+)"([^>]*?)>\s*<\/i>/g;

function inlineIcons(html: string, ctx: { slug: string; theme: Theme }): { html: string; missing: Set<string>; injected: number } {
  const missing = new Set<string>();
  let injected = 0;
  const out = html.replace(ICON_PLACEHOLDER_RE, (_full, pre: string, name: string, post: string) => {
    const attrs = `${pre} ${post}`;
    const sizeMatch = attrs.match(/data-size="(\d+(?:\.\d+)?)"/);
    const size = sizeMatch ? sizeMatch[1] : '16';
    const classMatch = attrs.match(/class="([^"]*)"/);
    const styleMatch = attrs.match(/style="([^"]*)"/);
    const styleAddon = `display:inline-block;width:${size}px;height:${size}px;vertical-align:middle;flex-shrink:0;color:currentColor;`;
    const style = styleMatch ? `${styleMatch[1]};${styleAddon}` : styleAddon;
    const cls = classMatch ? ` class="${classMatch[1]}"` : '';
    const raw = MINGCUTE_ICONS[name];
    if (!raw) {
      missing.add(name);
      return `<span${cls} style="${style}" data-mc="${name}" data-mc-missing="1">${injectSize(FALLBACK_SVG, size)}</span>`;
    }
    injected += 1;
    return `<span${cls} style="${style}" data-mc="${name}">${injectSize(raw, size)}</span>`;
  });
  if (missing.size) {
    console.warn(`[${ctx.slug}/${ctx.theme}] missing icons (replaced with fallback): ${[...missing].join(', ')}`);
  }
  return { html: out, missing, injected };
}

function injectSize(svg: string, size: string): string {
  return svg.replace('<svg ', `<svg width="${size}" height="${size}" `);
}

async function renderTheme(args: {
  client: Anthropic;
  slug: string;
  designMarkdown: string;
  theme: Theme;
}): Promise<string> {
  const messages = buildPreviewUserPrompt({
    slug: args.slug,
    designMarkdown: args.designMarkdown,
    theme: args.theme,
  });
  const stream = args.client.messages.stream({
    model: PREVIEW_MODEL,
    max_tokens: 32000,
    system: [
      {
        type: 'text',
        text: PREVIEW_SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages,
  });
  const resp = await stream.finalMessage();
  const text = resp.content
    .filter((b): b is Anthropic.Messages.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
  if (!text) throw new Error(`Empty response for ${args.slug} ${args.theme}`);
  const rawHtml = extractHtml(text);
  const { html, injected } = inlineIcons(rawHtml, { slug: args.slug, theme: args.theme });
  console.log(`[${args.slug}/${args.theme}] inlined ${injected} icon(s)`);
  return html;
}

async function processSlug(args: {
  slug: string;
  client: Anthropic | null;
  force: boolean;
  dryRun: boolean;
}): Promise<{ slug: string; status: 'generated' | 'skipped' | 'dry-run' }> {
  const dir = join(ROOT, args.slug);
  const designPath = join(dir, 'DESIGN.md');
  const hashPath = join(dir, '.preview-hash.json');
  const sourceHash = hashFile(designPath);

  const prev = readHashRecord(hashPath);
  const lightOk = existsSync(join(dir, 'preview.html')) && prev.light === sourceHash;
  const darkOk = existsSync(join(dir, 'preview-dark.html')) && prev.dark === sourceHash;

  if (!args.force && lightOk && darkOk) {
    console.log(`[${args.slug}] up-to-date — skip`);
    return { slug: args.slug, status: 'skipped' };
  }

  const designMarkdown = readFileSync(designPath, 'utf8');

  if (args.dryRun) {
    const messages = buildPreviewUserPrompt({
      slug: args.slug,
      designMarkdown,
      theme: 'light',
    });
    console.log(`[${args.slug}] DRY RUN`);
    console.log(`  model: ${PREVIEW_MODEL}`);
    console.log(`  system prompt: ${PREVIEW_SYSTEM_PROMPT.length} chars`);
    console.log(`  design markdown: ${designMarkdown.length} chars`);
    console.log(`  user message blocks: ${(messages[0].content as unknown[]).length}`);
    console.log(`  source hash: ${sourceHash.slice(0, 12)}...`);
    console.log(`  would write: preview.html, preview-dark.html`);
    return { slug: args.slug, status: 'dry-run' };
  }

  if (!args.client) throw new Error('ANTHROPIC_API_KEY required (or use --dry-run)');

  const next: HashRecord = { ...prev, source: sourceHash };

  if (args.force || !lightOk) {
    console.log(`[${args.slug}] rendering light...`);
    const html = await renderTheme({
      client: args.client,
      slug: args.slug,
      designMarkdown,
      theme: 'light',
    });
    writeFileSync(join(dir, 'preview.html'), html, 'utf8');
    next.light = sourceHash;
  }

  if (args.force || !darkOk) {
    console.log(`[${args.slug}] rendering dark...`);
    const html = await renderTheme({
      client: args.client,
      slug: args.slug,
      designMarkdown,
      theme: 'dark',
    });
    writeFileSync(join(dir, 'preview-dark.html'), html, 'utf8');
    next.dark = sourceHash;
  }

  writeFileSync(hashPath, JSON.stringify(next, null, 2) + '\n', 'utf8');
  console.log(`[${args.slug}] done`);
  return { slug: args.slug, status: 'generated' };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const slugs = listSlugs(args.slug);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const baseURL = process.env.ANTHROPIC_BASE_URL || undefined;
  const client = apiKey ? new Anthropic({ apiKey, baseURL }) : null;

  if (!args.dryRun && !client) {
    console.error('error: ANTHROPIC_API_KEY is not set. Use --dry-run to inspect prompts without calling the API.');
    process.exit(1);
  }

  console.log(`Processing ${slugs.length} project(s): ${slugs.join(', ')}`);
  if (baseURL) console.log(`Using custom base URL: ${baseURL}`);
  for (const slug of slugs) {
    await processSlug({ slug, client, force: args.force, dryRun: args.dryRun });
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
