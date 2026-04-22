# Figma MCP 接入指南（figma-developer-mcp）

> 目的：让 Claude Code 能够直接读取你 Figma 文件里的色板、文本样式、组件，再把它们写入 `DESIGN.md`，省去手动整理 hex 的工作。

## 选型说明

我们用第三方 **figma-developer-mcp**（GLips/Framelink），不用 Figma 官方 Dev Mode MCP。原因：

| 项 | 第三方（本方案） | 官方 Dev Mode MCP |
| --- | --- | --- |
| 费用 | 免费，只需 Personal Access Token | 需要 Figma Dev/Full 付费席位 |
| 安装 | `npx` 一行启动，无需桌面客户端 | 必须装 Figma 桌面端并在偏好里启用 |
| 能力 | 通过 REST API 读 file/node 的 fills、styles、layout | 更接近 Dev Mode，能拿 Variables/Tokens、生成 code |
| 适用 | 我们只要读色板/字体，足够 | 要复刻整个组件库再考虑 |

## 第一步：拿 Figma Personal Access Token

1. 浏览器打开 https://www.figma.com/
2. 右上角头像 → **Settings** → 左侧 **Security** tab
3. 滚到 **Personal access tokens** → **Generate new token**
4. **Token name** 随意（如 `claude-code-mcp`）
5. **Scope** 至少勾选：
   - `File content: Read-only`
   - 如果你的色板放在 Library 文件里，再勾 `Library content: Read-only`
6. 点 **Generate token** → **立刻复制**（关掉就再也看不到，只能重生）

把 token 暂存到密码管理器或临时记事本，下一步要用。

## 第二步：在 Claude Code 里注册 MCP

编辑 `~/.claude.json`，找到（或新增）顶层 `mcpServers` 字段，把下面这段合并进去：

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_FIGMA_PAT_HERE",
        "--stdio"
      ]
    }
  }
}
```

**注意**：

- 把 `YOUR_FIGMA_PAT_HERE` 换成上一步拿到的 token
- 如果 `~/.claude.json` 里已经有 `mcpServers`，把 `"figma": { ... }` 这一项加进去，不要覆盖整个对象
- 保存后 **重启 Claude Code**（关闭终端窗口再开一个新的），新的 MCP 才会被加载

## 第三步：验证 MCP 已连上

重启 Claude Code 后，在新对话里问我：

> "列一下当前可用的 mcp__figma__* 工具有哪些"

如果你能看到我列出 `mcp__figma__get_figma_data` 之类的工具名，说明 MCP 已经接通。如果列不出来：

- 检查 `~/.claude.json` 里 `mcpServers.figma` 是不是合法 JSON（用 `jq . ~/.claude.json` 验一下）
- 检查 `npx -y figma-developer-mcp --help` 在终端能不能跑通（首次会下载，可能慢）
- 打开 Claude Code 的日志看有没有 "MCP server 'figma' failed to start" 之类报错

## 第四步：把 Figma 文件 URL 给我

MCP 通了之后，把你存色彩规范的 Figma 文件 URL 发给我，格式形如：

```
https://www.figma.com/file/abc123XYZ/Agentic-Genius-Brand?node-id=12-345
```

或：

```
https://www.figma.com/design/abc123XYZ/Agentic-Genius-Brand?node-id=12-345
```

我会从 URL 解析出：

- `fileKey`：URL 里 `/file/` 或 `/design/` 后面那段（如 `abc123XYZ`）
- `nodeId`：`?node-id=` 后面那串（把 `-` 换成 `:` 后用，如 `12:345`）

如果你只想给我**色板那一帧/页**的内容（更精准、更省 token），在 Figma 里右键那一帧 → **Copy/Paste as → Copy link to selection**，得到的 URL 自带正确的 `node-id`。

## 第五步：我会怎么用它

拿到 URL 后我会：

1. 调 `mcp__figma__get_figma_data`（或类似工具）拉那一帧的节点树
2. 把节点 `fills` / `styles` 里的 hex 提取出来，按 `Primary 500 / Surface 100 / Text Strong / Accent` 等角色归类
3. 写进 `content/projects/agentic-genius/DESIGN.md` 的 **Color** 段
4. 跑 `pnpm tsx scripts/generate-previews.ts` 让 Claude 据此渲出 `preview.html` / `preview-dark.html`

## 常见坑

- **Token 不够权限**：如果文件在团队/组织 space 下，PAT 必须由有访问权的账号生成
- **Library 文件里的样式读不到**：要在 PAT 里勾 `Library content: Read-only`，并且团队计划支持
- **文件特别大、节点特别多**：不要把整个文件 URL 丢给我，用某一帧的 selection link，否则一次返回会爆 token
- **重启 Claude Code 后 MCP 仍未出现**：终端跑一次 `npx -y figma-developer-mcp --figma-api-key=xxx --stdio`，看启动报错；常见是 Node 版本太低（要 ≥ 18）

## 安全提示

- **不要把含 PAT 的 `~/.claude.json` 提交到 git**
- PAT 等同于你的 Figma 登录态，遗失立刻去 Settings → Security 撤销
- 如果你机器上有多人共用，建议用 `Read-only` 范围的 token 而不是给写权限
