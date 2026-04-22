import Link from "next/link";
import { listProjects } from "@/lib/projects";

const STATUS_LABEL: Record<string, string> = {
  active: "在用",
  draft: "草稿",
  archived: "归档",
};

export default function Home() {
  const projects = listProjects();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">BrandLab</h1>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          每套品牌规范一份 DESIGN.md，AI 编码 agent 的唯一视觉源。
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-sm text-[color:var(--color-muted)]">
          还没有项目。把规范放到 <code>content/projects/&lt;slug&gt;/DESIGN.md</code>。
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.slug}`}
                className="block h-full rounded-[6px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-colors hover:border-[color:var(--color-accent)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  <span className="rounded-full border border-[color:var(--color-border)] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[color:var(--color-muted)]">
                    {STATUS_LABEL[p.status] ?? p.status}
                  </span>
                </div>
                {p.tone && p.tone.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tone.map((t) => (
                      <span
                        key={t}
                        className="rounded-[4px] bg-[color:var(--color-bg)] px-2 py-0.5 text-[11px] text-[color:var(--color-muted)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {p.basedOn && (
                  <p className="mt-4 text-xs text-[color:var(--color-muted)]">
                    源：{p.basedOn}
                  </p>
                )}
                {p.lastUpdated && (
                  <p className="mt-1 text-xs text-[color:var(--color-muted)]">
                    更新：{p.lastUpdated}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
