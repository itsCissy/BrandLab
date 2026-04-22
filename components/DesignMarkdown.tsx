import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { codeToHtml } from "shiki";
import type { ComponentProps } from "react";

type CodeProps = ComponentProps<"code"> & { inline?: boolean };

async function highlight(code: string, lang: string): Promise<string> {
  try {
    return await codeToHtml(code, {
      lang: lang || "text",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  } catch {
    return await codeToHtml(code, {
      lang: "text",
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    });
  }
}

export async function DesignMarkdown({ source }: { source: string }) {
  const codeBlocks: { code: string; lang: string }[] = [];
  const placeholderRe = /^```(\w+)?\n([\s\S]*?)\n```$/gm;
  source.replace(placeholderRe, (_m, lang: string | undefined, code: string) => {
    codeBlocks.push({ lang: lang ?? "", code });
    return "";
  });

  const highlighted = await Promise.all(
    codeBlocks.map((b) => highlight(b.code, b.lang)),
  );

  let idx = 0;

  return (
    <div className="prose-design">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h1 className="mt-12 text-3xl font-semibold tracking-tight" {...props} />,
          h2: (props) => <h2 className="mt-12 border-b border-[color:var(--color-border)] pb-2 text-2xl font-semibold" {...props} />,
          h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
          h4: (props) => <h4 className="mt-6 text-base font-semibold" {...props} />,
          p: (props) => <p className="mt-4 leading-7 text-[color:var(--color-fg)]" {...props} />,
          ul: (props) => <ul className="mt-4 list-disc pl-6 leading-7" {...props} />,
          ol: (props) => <ol className="mt-4 list-decimal pl-6 leading-7" {...props} />,
          li: (props) => <li className="mt-1" {...props} />,
          blockquote: (props) => (
            <blockquote className="mt-4 border-l-2 border-[color:var(--color-accent)] pl-4 italic text-[color:var(--color-muted)]" {...props} />
          ),
          a: (props) => <a className="text-[color:var(--color-accent)] underline-offset-2 hover:underline" {...props} />,
          hr: () => <hr className="my-10 border-t border-[color:var(--color-border)]" />,
          table: (props) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: (props) => <thead className="bg-[color:var(--color-surface)]" {...props} />,
          th: (props) => (
            <th className="border border-[color:var(--color-border)] px-3 py-2 text-left font-semibold" {...props} />
          ),
          td: (props) => (
            <td className="border border-[color:var(--color-border)] px-3 py-2 align-top" {...props} />
          ),
          code: ({ inline, className, children, ...rest }: CodeProps) => {
            if (inline) {
              return (
                <code
                  className="rounded-[4px] bg-[color:var(--color-surface)] px-1.5 py-0.5 text-[0.9em]"
                  {...rest}
                >
                  {children}
                </code>
              );
            }
            const html = highlighted[idx++];
            if (!html) {
              return (
                <pre className="my-4 overflow-x-auto rounded-[6px] bg-[color:var(--color-surface)] p-4 text-sm">
                  <code className={className}>{children}</code>
                </pre>
              );
            }
            return (
              <div
                className="shiki-block my-4 overflow-x-auto rounded-[6px] border border-[color:var(--color-border)] [&_pre]:!bg-[color:var(--color-surface)] [&_pre]:p-4 [&_pre]:text-sm"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
