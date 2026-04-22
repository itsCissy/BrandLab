import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type ProjectMeta = {
  slug: string;
  title: string;
  status: string;
  tone?: string[];
  basedOn?: string;
  lastUpdated?: string;
};

const ROOT = join(process.cwd(), 'content', 'projects');

export function listProjects(): ProjectMeta[] {
  return readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => loadProject(d.name))
    .filter((p): p is ProjectMeta => p !== null);
}

export function loadProject(slug: string): ProjectMeta | null {
  const designPath = join(ROOT, slug, 'DESIGN.md');
  if (!existsSync(designPath)) return null;
  const raw = readFileSync(designPath, 'utf8');
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    status: data.status ?? 'draft',
    tone: data.tone,
    basedOn: data.based_on,
    lastUpdated: stringifyDate(data.last_updated),
  };
}

function stringifyDate(v: unknown): string | undefined {
  if (v == null) return undefined;
  if (v instanceof Date) {
    const y = v.getUTCFullYear();
    const m = String(v.getUTCMonth() + 1).padStart(2, '0');
    const d = String(v.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(v);
}

export function readDesignMarkdown(slug: string): string {
  const raw = readFileSync(join(ROOT, slug, 'DESIGN.md'), 'utf8');
  return matter(raw).content;
}

export function readDesignMarkdownRaw(slug: string): string {
  return readFileSync(join(ROOT, slug, 'DESIGN.md'), 'utf8');
}

export type Theme = 'light' | 'dark';

export function previewPath(slug: string, theme: Theme): string {
  const file = theme === 'dark' ? 'preview-dark.html' : 'preview.html';
  return join(ROOT, slug, file);
}

export function hasPreview(slug: string, theme: Theme): boolean {
  return existsSync(previewPath(slug, theme));
}

export function readPreviewHtml(slug: string, theme: Theme): string | null {
  const path = previewPath(slug, theme);
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}
