'use client';

import { useState, useSyncExternalStore, type ReactNode } from 'react';

type View = 'preview' | 'design';
type Theme = 'light' | 'dark';

const STORAGE_THEME = 'brand-lab.theme';

function readStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(STORAGE_THEME);
  return stored === 'dark' || stored === 'light' ? stored : null;
}

function subscribeTheme(notify: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_THEME) notify();
  };
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  window.addEventListener('storage', onStorage);
  mql.addEventListener('change', notify);
  return () => {
    window.removeEventListener('storage', onStorage);
    mql.removeEventListener('change', notify);
  };
}

function getThemeSnapshot(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
}

function getServerTheme(): Theme {
  return 'light';
}

export function ProjectViewer({
  slug,
  hasLightPreview,
  hasDarkPreview,
  designContent,
}: {
  slug: string;
  hasLightPreview: boolean;
  hasDarkPreview: boolean;
  designContent: ReactNode;
}) {
  const hasAnyPreview = hasLightPreview || hasDarkPreview;
  const [view, setView] = useState<View>(hasAnyPreview ? 'preview' : 'design');
  const systemTheme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerTheme,
  );
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? systemTheme;

  function pickTheme(next: Theme) {
    setOverride(next);
    window.localStorage.setItem(STORAGE_THEME, next);
  }

  const previewAvailable = theme === 'dark' ? hasDarkPreview : hasLightPreview;

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--color-border)] pb-3">
        <TabBar
          view={view}
          onChange={setView}
          previewEnabled={hasAnyPreview}
        />
        <div className="flex items-center gap-2">
          <DownloadMdButton slug={slug} />
          <ThemeToggle theme={theme} onChange={pickTheme} />
        </div>
      </div>

      {view === 'preview' ? (
        <PreviewFrame
          slug={slug}
          theme={theme}
          available={previewAvailable}
        />
      ) : (
        <div className="prose-design">{designContent}</div>
      )}
    </div>
  );
}

function TabBar({
  view,
  onChange,
  previewEnabled,
}: {
  view: View;
  onChange: (v: View) => void;
  previewEnabled: boolean;
}) {
  const tabs: { key: View; label: string; disabled?: boolean }[] = [
    { key: 'preview', label: 'Preview', disabled: !previewEnabled },
    { key: 'design', label: 'DESIGN.md' },
  ];
  return (
    <div role="tablist" className="inline-flex gap-1 rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1">
      {tabs.map((t) => {
        const active = view === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={t.disabled}
            onClick={() => !t.disabled && onChange(t.key)}
            className={[
              'rounded-[4px] px-3 py-1 text-sm transition-colors',
              active
                ? 'bg-[color:var(--color-bg)] font-medium text-[color:var(--color-fg)] shadow-sm'
                : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]',
              t.disabled ? 'cursor-not-allowed opacity-40 hover:text-[color:var(--color-muted)]' : '',
            ].join(' ')}
            title={t.disabled ? 'Run pnpm tsx scripts/generate-previews.ts to enable' : undefined}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  return (
    <div role="group" aria-label="theme" className="inline-flex gap-1 rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-1">
      {(['light', 'dark'] as const).map((t) => {
        const active = theme === t;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(t)}
            className={[
              'rounded-[4px] px-3 py-1 text-sm transition-colors',
              active
                ? 'bg-[color:var(--color-bg)] font-medium text-[color:var(--color-fg)] shadow-sm'
                : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]',
            ].join(' ')}
          >
            {t === 'light' ? 'Light' : 'Dark'}
          </button>
        );
      })}
    </div>
  );
}

function DownloadMdButton({ slug }: { slug: string }) {
  return (
    <a
      href={`/download/${slug}`}
      download={`${slug}-DESIGN.md`}
      className="inline-flex items-center rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1.5 text-sm text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-fg)]"
      title="Download DESIGN.md"
    >
      Download .md
    </a>
  );
}

function PreviewFrame({
  slug,
  theme,
  available,
}: {
  slug: string;
  theme: Theme;
  available: boolean;
}) {
  if (!available) {
    return (
      <div className="rounded-[6px] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-10 text-center text-sm text-[color:var(--color-muted)]">
        <p>
          {theme === 'dark' ? 'preview-dark.html' : 'preview.html'} not generated yet.
        </p>
        <p className="mt-2">
          Run{' '}
          <code className="rounded bg-[color:var(--color-bg)] px-1.5 py-0.5">
            ANTHROPIC_API_KEY=… pnpm tsx scripts/generate-previews.ts --slug {slug}
          </code>
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
      <iframe
        key={`${slug}-${theme}`}
        src={`/preview/${slug}/${theme}`}
        title={`${slug} preview (${theme})`}
        className="h-[80vh] w-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
