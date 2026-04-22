import { notFound } from "next/navigation";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { DesignMarkdown } from "@/components/DesignMarkdown";
import { ProjectViewer } from "@/components/ProjectViewer";
import {
  hasPreview,
  listProjects,
  loadProject,
  readDesignMarkdown,
} from "@/lib/projects";

export function generateStaticParams() {
  return listProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = loadProject(slug);
  if (!meta) notFound();

  const designPath = join(process.cwd(), "content", "projects", slug, "DESIGN.md");
  if (!existsSync(designPath)) notFound();

  const source = readDesignMarkdown(slug);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <Link
        href="/"
        className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)]"
      >
        ← 返回项目列表
      </Link>
      <header className="mt-6 mb-2 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <span className="rounded-full border border-[color:var(--color-border)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[color:var(--color-muted)]">
          {meta.status}
        </span>
      </header>
      {meta.basedOn && (
        <p className="text-sm text-[color:var(--color-muted)]">
          源：{meta.basedOn}
          {meta.lastUpdated ? ` · 更新：${meta.lastUpdated}` : ""}
        </p>
      )}

      <ProjectViewer
        slug={slug}
        hasLightPreview={hasPreview(slug, "light")}
        hasDarkPreview={hasPreview(slug, "dark")}
        designContent={<DesignMarkdown source={source} />}
      />
    </main>
  );
}
