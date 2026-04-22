# BrandLab

> Vault doc: `~/Sigi-knowledge-base/20_Project/BrandLab/BrandLab.md`
> Plans / Specs / Notes: `~/Sigi-knowledge-base/20_Project/BrandLab/{plans,specs,notes}/`

品牌规范实验室。每个 `content/projects/<slug>/` 是一套独立品牌规范（DESIGN.md + 构建期生成的 preview.html / preview-dark.html），通过 Live Preview 站点可视化验证，最终下发到具体业务项目根目录给 AI 编码 agent 使用。

## Build & Test

```bash
# Install (Phase 2 之后才可用)
pnpm install

# Dev (Phase 2 之后才可用)
pnpm dev                    # localhost:3001

# Generate previews (核心脚本，Phase 2 之后才可用)
ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts
ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts --slug agentic-genius
ANTHROPIC_API_KEY=xxx pnpm tsx scripts/generate-previews.ts --force   # 忽略 hash 强制重生

# Lint / Typecheck
pnpm lint
pnpm typecheck
```

## Architecture Boundaries

- **`content/projects/<slug>/DESIGN.md`** —— 唯一手写源。其他文件都是它的派生
- **`content/projects/<slug>/preview*.html`** —— 由 `scripts/generate-previews.ts` 产出，**不要手改**（手改会被下次脚本覆盖）
- **`scripts/`** —— 仅构建期运行，不进 bundle；所有 LLM 调用集中于此
- **`app/` / `components/`** —— 只做静态读 + 客户端 tab/theme 切换；**不能**调用 Anthropic SDK
- **`lib/projects.ts`** —— 唯一的项目列表数据源，靠 `fs.readdir` + `gray-matter` 读 frontmatter

## Tech Stack

- **Language:** TypeScript（strict）
- **Framework:** Next.js 15 (App Router) + Tailwind CSS 4
- **Key dependencies:**
  - `@anthropic-ai/sdk` —— 构建期调 `claude-sonnet-4-6`，开 prompt caching
  - `react-markdown` + `shiki` —— 渲染 DESIGN.md tab
  - `gray-matter` —— 解析 DESIGN.md frontmatter
  - `figma-developer-mcp`（外部 MCP，不入 deps）—— Claude Code 通过它读 Figma

## Coding Conventions

- 命名：文件 kebab-case，组件 PascalCase
- 导出：仅命名导出，不用 default export
- 类型：所有 async 函数显式标注返回类型；禁 `any`
- 错误处理：脚本里用具体异常 + 在调用点 log；UI 端不写无意义 try/catch
- 提示词：所有 system prompt 集中放 `lib/anthropic.ts`，方便审阅

## Safety Rails

### NEVER
- 手改 `content/projects/*/preview*.html`（会被脚本覆盖）
- 把 `.env.local` 或含 `ANTHROPIC_API_KEY` / `FIGMA_PAT` 的文件提交进 git
- 在 `app/` 或 `components/` 里 `import @anthropic-ai/sdk`（运行时必须零 LLM）
- 不读 hash 直接全量重生 preview（费 token；除非用户显式 `--force`）

### ALWAYS
- 改完 `DESIGN.md` 后跑 `pnpm tsx scripts/generate-previews.ts --slug <name>` 重生 preview
- 添加新品牌：`mkdir content/projects/<slug>` → 复制 `scripts/design-template.md` 改字段 → 跑生成脚本
- Figma 接入相关问题先看 `docs/figma-mcp-setup.md`

## Verification

UI 改动：`pnpm dev` 后浏览器手验 Preview / DESIGN.md / Light / Dark 四种状态切换正常
脚本改动：先在某个具体 slug 上 `--slug` + `--dry-run` 看输出，再放开
DESIGN.md 改动：跑生成脚本，比对新旧 preview.html 看渲染合理

Definition of done：
- 站点 dev 跑通且无 console error
- 至少 1 个项目的 4 种状态都能切
- `pnpm lint && pnpm typecheck` 干净

## Compact Instructions

When compressing, preserve in priority order:
1. 架构边界（脚本/app 的 LLM 调用隔离原则）—— NEVER summarize
2. 各 phase 当前状态（见 Vault BrandLab.md）
3. 当前正在迭代的 DESIGN.md slug 名 + 卡点
4. Open TODOs（特别是"等用户操作"类阻塞）
5. 工具输出（可删，保留 pass/fail）
