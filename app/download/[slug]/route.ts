import { notFound } from 'next/navigation';
import { listProjects, loadProject, readDesignMarkdownRaw } from '@/lib/projects';

export function generateStaticParams() {
  return listProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!loadProject(slug)) notFound();
  const md = readDesignMarkdownRaw(slug);
  return new Response(md, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'content-disposition': `attachment; filename="${slug}-DESIGN.md"`,
      'cache-control': 'no-store',
    },
  });
}
