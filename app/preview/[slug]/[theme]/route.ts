import { notFound } from 'next/navigation';
import { listProjects, readPreviewHtml } from '@/lib/projects';

export function generateStaticParams() {
  const slugs = listProjects().map((p) => p.slug);
  return slugs.flatMap((slug) =>
    (['light', 'dark'] as const).map((theme) => ({ slug, theme })),
  );
}

export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; theme: string }> },
) {
  const { slug, theme } = await params;
  if (theme !== 'light' && theme !== 'dark') notFound();
  const html = readPreviewHtml(slug, theme);
  if (!html) notFound();
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
