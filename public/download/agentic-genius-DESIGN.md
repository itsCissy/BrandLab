---
title: "Agentic Genius"
slug: agentic-genius
status: active
based_on: "Agentic Genius original"
tone: ["冷峻精确", "克制信号", "开发者优先"]
last_updated: 2026-04-21
---

# Design System — Agentic Genius

## 1. Visual Theme & Atmosphere

Agentic Genius 是一个面向开发者的 AI agent 产品。视觉系统的目标不是"被记住"，而是"不挡路"——让用户的注意力始终落在 agent 输出的内容上，而不是界面本身。整体氛围参考 Claude / Vercel / Linear 一类的开发者工具品牌：**黑灰中性色承担 95% 的视觉重量，彩色仅在关键交互信号点出现**。

界面以**中性色为基调**：浅色模式下用纯白 `#FFFFFF` 做页面底，冷蓝近黑 `#0F1729`（N1000）做主要文本，按钮和图标默认是黑底白字；暗色模式下整套翻转，背景换成 `#0F1729`，按钮变白底黑字。这种"高对比 + 无色相"的处理让产品在阅读密集的场景（聊天、代码、日志）下保持清晰，也避免了大面积彩色带来的廉价感。

**蓝色 `#123AFF`（B500，电光蓝）和绿色 `#00BF74`（G700，量子绿）是品牌指纹色，但只在三类位置出现**：(1) 链接 hover；(2) Agent 状态指示（如 8px 圆点表示"agent 正在运行"），绿色专用于"活动中"，蓝色专用于"待响应"；(3) 代码块语法高亮的 keyword/string。其余位置——按钮填充、卡片背景、卡片选中、导航栏、focus ring——一律保持中性色。

**装饰图形允许彩色**：卡片插画、空状态图、营销页 hero 背景渐变、徽章、标签可以使用完整 11 阶彩色色阶（B / G / Y / O / R / T / S / P 紫 / P 粉），用来分类或带来情绪。但这些是"内容"层，不是"控件"层，不影响上面"高频组件用中性色"的原则。

字体使用系统字体栈（`-apple-system`），在 Mac 上落到 SF Pro Text，在中文环境落到 PingFang SC。**不引入自定义 Web Font**——这与"开发者工具不应该慢"的产品哲学一致。代码字体用 `ui-monospace`（Mac 上是 SF Mono）。

**圆角 6px** 是全站默认值——比锐角（2px）柔和，比 SaaS 风格的 12-16px 收敛，处于"工具感"和"产品感"之间的精确刻度。深度系统极简：一个柔和阴影 + 边框颜色变化承担所有层级表达。

**Key Characteristics：**
- **中性色主导**：N（冷调蓝灰）+ W/B 锚点承担按钮、图标、文本、表面、边框；彩色不参与高频组件
- **黑底白字按钮**（暗色翻转）作为 Primary action 的招牌形态
- **B500 蓝 + G700 绿**作为信号色——仅出现在交互反馈、agent 状态点、代码高亮三类位置
- 系统字体栈，零 Web Font 加载
- 6px 圆角统一基准，焦点环 `2px solid B500`
- 装饰图形/插画/标签可用全色板，但与控件层严格分离

## 2. Color Palette & Roles

> 完整色板源自 Figma 设计规范（fileKey `u3Czmg7aehibR72WFntZzG`，frame "color"）。色阶命名沿用 Figma 原始记号：前缀字母代表色相（W=White / B=Black 灰阶 / N=Neutral 冷蓝灰 / R=Red / O=Orange / Y=Yellow / G=Green / T=Teal / B=Blue 彩色 / S=Sky / P=Purple/Pink），后缀数字 50→1000 代表深浅。

### 2.1 Brand Anchor

- **White** (`#FFFFFF`): 浅色模式页面底色，暗色模式上的文本。
- **Near Black** (`#0F1729`, N1000): 浅色模式主文本，暗色模式页面底色。**不用纯黑** —— 冷蓝 hue 让"机器感"更精确。
- **Pure Black** (`#000000`, B1000): 仅用于 logo、图标边线等需要最强对比的图形元素。

### 2.2 Signal Colors（信号色，克制使用）

仅出现在：链接 hover、agent 状态指示点、代码高亮 keyword/string。**不可**做按钮填充、卡片背景、卡片选中态、focus ring、大面积色块。

- **Brand Blue** (`#123AFF`, B500): 主信号色。链接 hover、"agent 待响应"指示点、代码 keyword 高亮。**不用作焦点环、卡片选中或任何结构性强调** —— 那些走中性 N1000。
- **Brand Blue Light** (`#4161FF`, B400): 暗色模式下的同等位置（亮度补偿）。
- **Brand Green** (`#00BF74`, G700): 副信号色。"agent 运行中"指示点、代码 string 高亮、success toast。
- **Brand Green Light** (`#00DF87`, G600): 暗色模式下的同等位置。

### 2.3 Neutral Scale —— N（冷调蓝灰，UI 主力）

承担文本、表面、边框、分割线。这是用得最频繁的色阶。

| Token | Hex | 角色 |
|---|---|---|
| N50 | `#F7F8FA` | 浅色 surface（卡片底、输入框底） |
| N100 | `#F0F3F7` | 浅色 hover 底色 |
| N200 | `#E7ECF3` | Border subtle（卡片边、分割线） |
| N300 | `#CDD4DF` | Border strong（输入框、悬停态） |
| N400 | `#B7BDCA` | 暗色模式 text secondary |
| N500 | `#949CAC` | Text muted、占位、禁用 |
| N600 | `#667085` | Text secondary（副文本、说明） |
| N700 | `#475569` | 暗色模式 border strong |
| N800 | `#344052` | 暗色模式 surface elevated（浮层、弹窗） |
| N900 | `#252B39` | 暗色模式 surface（卡片底） |
| N1000 | `#0F1729` | 浅色 text primary、暗色 page background |

### 2.4 Neutral Scale —— B（中性纯灰，备用）

无色相的纯灰阶，用于图片占位、图表网格线、disabled 图层等"绝对中性"场景。日常 UI 优先用 N。

| Token | Hex |
|---|---|
| B50 / B100 / B200 / B300 / B400 / B500 / B600 / B700 / B800 / B900 / B1000 | `#FAFAFA` / `#F2F2F2` / `#E5E5E5` / `#CCCCCC` / `#A6A6A6` / `#808080` / `#666666` / `#4D4D4D` / `#333333` / `#1A1A1A` / `#000000` |

### 2.5 Status & Semantic（仅 toast / badge / inline icon 使用）

| 角色 | Token | Hex | 备注 |
|---|---|---|---|
| Success | G700 | `#00BF74` | 与品牌绿同色，复用 |
| Warning | Y500 | `#FFC629` | |
| Error | R500 | `#F24E3F` | |
| Info | S500 | `#25B3FF` | 区别于品牌蓝 B500 |

不要做大面积填充。背景态用对应色阶的 50/100（如 `Y50 #FFF8E6` 做 warning 浮条底）。

### 2.6 Decorative Palette（仅装饰图形/插画/标签使用）

完整 11 阶 × 9 色相，用于卡片插画、空状态图、营销 hero 渐变、分类标签、图表配色。**不参与按钮、输入框、导航等高频组件**。

| 色相 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **R** Red | `#F7F8FA` | `#FFE8E4` | `#FFD3CD` | `#FFB3AA` | `#FE7C71` | `#F24E3F` | `#D22F21` | `#AC190B` | `#8C1409` | `#5D110A` | `#390804` |
| **O** Orange | `#FFF1EA` | `#FFD8C4` | `#FFBD9C` | `#FF9E6F` | `#FF8245` | `#FF671D` | `#E94C00` | `#CD4300` | `#AB3800` | `#7B2800` | `#441600` |
| **Y** Yellow | `#FFF8E6` | `#FFF1CA` | `#FFE9AA` | `#FFDD7D` | `#FFD254` | `#FFC629` | `#F6B500` | `#D69D00` | `#A17600` | `#715300` | `#433100` |
| **G** Green | `#E3FFF4` | `#C7FFE9` | `#A1FFDA` | `#72FFC7` | `#3FFFB3` | `#00FF9A` | `#00DF87` | `#00BF74` | `#008F57` | `#00663E` | `#003621` |
| **T** Teal | `#DFFBF2` | `#BFF8E7` | `#A2F4DC` | `#67F2C9` | `#2AEEB4` | `#00E29F` | `#00CA8E` | `#00A675` | `#007C57` | `#00563C` | `#003626` |
| **B** Blue | `#E6EAFF` | `#CED6FF` | `#AAB8FF` | `#788EFF` | `#4161FF` | `#123AFF` | `#0025DB` | `#001EB1` | `#001788` | `#00105C` | `#000937` |
| **S** Sky | `#E8F7FF` | `#D0EFFF` | `#B4E5FF` | `#8DD7FF` | `#5BC5FF` | `#25B3FF` | `#009AED` | `#0081C7` | `#00669D` | `#004B74` | `#002B42` |
| **P** Purple | `#F2EEFF` | `#E7DEFF` | `#DACDFF` | `#C1ACFF` | `#A080FF` | `#7F54FF` | `#5E2BF3` | `#4612E2` | `#360ABC` | `#270788` | `#13014A` |
| **P** Pink | `#FEF6FA` | `#FDE9F4` | `#FDD8EC` | `#FCA5D1` | `#F976B7` | `#ED4693` | `#DE237A` | `#C31A5C` | `#7E163F` | `#5C0525` | `#3B0217` |

### 2.7 Theme Mapping（语义角色 → token）

| 角色 | Light | Dark |
|---|---|---|
| Page background | `#FFFFFF` (W) | `#0F1729` (N1000) |
| Surface | `#F7F8FA` (N50) | `#252B39` (N900) |
| Surface elevated | `#FFFFFF` (W) | `#344052` (N800) |
| Border subtle | `#E7ECF3` (N200) | `#344052` (N800) |
| Border strong | `#CDD4DF` (N300) | `#475569` (N700) |
| Text primary | `#0F1729` (N1000) | `#FFFFFF` (W) |
| Text secondary | `#667085` (N600) | `#B7BDCA` (N400) |
| Text muted | `#949CAC` (N500) | `#949CAC` (N500) |
| Primary action bg | `#0F1729` (N1000) | `#FFFFFF` (W) |
| Primary action text | `#FFFFFF` (W) | `#0F1729` (N1000) |
| Primary action hover bg | `#252B39` (N900) | `#F0F3F7` (N100) |
| Focus ring | `#0F1729` (N1000), 2px | `#FFFFFF` (W), 2px |
| Link hover | `#123AFF` (B500) | `#4161FF` (B400) |

### 2.8 Shadows & Depth

- **Card Shadow**: `rgba(15, 23, 41, 0.08) 0px 1px 2px 0px, rgba(15, 23, 41, 0.06) 0px 4px 8px -2px`（双层柔和阴影，浅色模式用）
- **Modal Shadow**: `rgba(15, 23, 41, 0.16) 0px 8px 24px -4px`
- **暗色模式**：阴影替换为 `1px solid N700` 边框（深色背景上阴影不可见）


## 3. Typography Rules

### Font Family

```css
/* 主字体栈：系统字体，零 Web Font 加载 */
font-family:
  -apple-system, BlinkMacSystemFont,
  "SF Pro Text", "PingFang SC",
  "Helvetica Neue", Arial, sans-serif;

/* 等宽字体（代码块、命令行、token 流） */
font-family:
  ui-monospace, "SF Mono", "Menlo",
  "Cascadia Code", "Source Code Pro", monospace;
```

- **Primary**: 系统 sans（macOS = SF Pro Text，iOS = SF Pro，Windows = Segoe UI，Android = Roboto；中文 = PingFang SC / 思源黑体）
- **Mono**: 系统等宽（macOS = SF Mono，Windows = Cascadia Code）
- **不使用**：自定义 Web Font、Font Awesome、Google Fonts。图标用 SVG 直接 inline 或走 `lucide-react` 一类的组件库。

### Hierarchy

> 所有 Font 字段统一为 `system-sans`（即上方主字体栈），代码相关字段为 `system-mono`。

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | system-sans | 36px (2.25rem) | 600 | 1.20 (tight) | -0.02em | Marketing 页面主标题 |
| Page Title | system-sans | 28px (1.75rem) | 600 | 1.25 (tight) | -0.015em | 应用内页面标题 |
| Section Heading | system-sans | 22px (1.38rem) | 600 | 1.30 (tight) | -0.01em | 区块标题、卡片标题 |
| Sub-heading | system-sans | 18px (1.13rem) | 500 | 1.40 | normal | 次级标题、模块说明 |
| Body Large | system-sans | 16px (1.00rem) | 400 | 1.60 (relaxed) | normal | 正文重点段落 |
| Body | system-sans | 15px (0.94rem) | 400 | 1.55 | normal | 标准正文 |
| Body Bold | system-sans | 15px (0.94rem) | 600 | 1.55 | normal | 强调标签、导航项 |
| Body Small | system-sans | 13px (0.81rem) | 400 | 1.50 | normal | 副文本、说明文字 |
| Button | system-sans | 14px (0.88rem) | 500 | 1.20 (tight) | normal | 标准按钮 |
| Button Compact | system-sans | 13px (0.81rem) | 500 | 1.20 (tight) | normal | 紧凑按钮、内联 CTA |
| Link | system-sans | 14px (0.88rem) | 500 | 1.50 | normal | 导航链接 |
| Caption | system-sans | 12px (0.75rem) | 400 | 1.40 | normal | 元数据、时间戳 |
| Micro Label | system-sans | 11px (0.69rem) | 600 | 1.30 | 0.04em | `text-transform: uppercase`，徽章/标签 |
| Code Inline | system-mono | 13px (0.81rem) | 400 | 1.50 | normal | 行内代码 `like this` |
| Code Block | system-mono | 13px (0.81rem) | 400 | 1.65 | normal | 代码块、命令行输出 |

### Principles

- **Medium 为主，Bold 用于强调**：标题用 weight 600（不是 700），按钮/导航用 500。这与"克制"的视觉语言一致——Bold 700 在系统字体下显得过重，反而像营销页。
- **紧标题，松正文**：标题 line-height 1.20-1.30，正文 1.50-1.60。对比制造视觉节奏。
- **负字距用于大标题**：≥22px 的标题用 `letter-spacing: -0.01em ~ -0.02em`，让字符更紧凑，呼应"开发者工具"的密度感。
- **不用 uppercase 做导航**：保留 sentence case。Uppercase 仅用于 micro label / 徽章（11px）。
- **代码字体始终等宽**：行内代码、代码块、token 流、命令行输出统一 `system-mono`。

### Iconography

**Library**: [MingCute Icon](https://www.mingcute.com/) — 一套现代、几何化的开源图标库，风格冷峻精确，与 Agentic Genius 调性一致。所有 UI 图标统一从此库选用，**禁止混用其他图标库**（emoji、Material、Heroicons 等）。

| Variant | 用途 |
|---------|------|
| `mingcute_*_line` | **默认**。所有正文/导航/按钮内的图标 |
| `mingcute_*_fill` | 选中态、激活态、强调（如 sidebar 当前项、收藏已选） |

**Sizing**：

| Token | Size | 用途 |
|-------|------|------|
| `icon-xs` | 12px | inline 文本内图标（如 link 后的 external arrow） |
| `icon-sm` | 14px | tag / badge 内、micro label 旁 |
| `icon-md` | 16px | **默认**。按钮、输入框前缀、列表项 |
| `icon-lg` | 20px | 导航、卡片标题旁 |
| `icon-xl` | 24px | empty state、feature 卡 hero |
| `icon-2xl` | 32-40px | onboarding、大空状态 |

**Color**: 图标 `currentColor` 继承父元素文字色，不单独定色。状态图标（成功/错误等）由父容器的 status 角色色决定（见 Section 2.5）。

**Stroke weight**: 用 MingCute 默认 line 粗细，不要二次加粗——破坏几何一致性。

**Install**:

```bash
pnpm add @mingcute/icon-react
# 或者只装需要的子集 SVG（推荐，bundle 更小）
```

**用法约定**：

- 按钮内图标 `gap: 6px` 与文字保持距离
- 仅图标按钮（无文字）必须有 `aria-label`
- 装饰性图标（纯视觉、无语义）加 `aria-hidden="true"`

## 4. Component Stylings

### Buttons

**Primary（黑底白字 / 暗色翻转）**
- Light: background `#0F1729` (N1000), text `#FFFFFF`
- Dark: background `#FFFFFF`, text `#0F1729`
- Padding: `8px 14px`（标准）/ `6px 10px`（compact）
- Border: none
- Radius: `6px`
- Font: 14px weight 500
- Hover: Light → `#252B39` (N900)；Dark → `#F0F3F7` (N100)
- Active: `transform: translateY(1px)`，背景再深一阶
- Focus: `outline: 2px solid #0F1729; outline-offset: 2px`（暗色模式 `#FFFFFF`）。中性深色 ring，**不用品牌蓝**——避免 focus 抢戏
- Disabled: `opacity: 0.4; cursor: not-allowed`
- Use: 主 CTA（"开始对话"、"创建 Agent"、"提交"）

**Secondary（描边）**
- Light: background `transparent`, text `#0F1729`, border `1px solid #CDD4DF` (N300)
- Dark: background `transparent`, text `#FFFFFF`, border `1px solid #475569` (N700)
- Hover: 背景填 `#F7F8FA` (N50) / `#252B39` (N900)
- Use: 次要操作（"取消"、"返回"、"查看更多"）

**Ghost（无边）**
- Background: transparent
- Text: `#667085` (N600) / `#B7BDCA` (N400)
- Hover: 背景填 `#F0F3F7` (N100) / `#344052` (N800)
- Use: 工具栏、列表内嵌操作、菜单项

**Danger**
- Background: `#F24E3F` (R500), text `#FFFFFF`
- Hover: `#D22F21` (R600)
- Use: 仅用于不可逆破坏性操作（"删除 Agent"、"清空对话"），需带二次确认

### Inputs & Forms

- Background: `#FFFFFF` / `#0F1729`
- Border: `1px solid #CDD4DF` (N300) / `1px solid #475569` (N700)
- Radius: `6px`
- Padding: `8px 12px`
- Font: 14px weight 400
- Placeholder color: `#949CAC` (N500)
- Focus: border 替换为 `1px solid #0F1729` (暗色 `#FFFFFF`) + `box-shadow: 0 0 0 3px rgba(15, 23, 41, 0.12)` (暗色 `rgba(255, 255, 255, 0.18)`)。中性 halo，不用品牌蓝
- Error: border `#F24E3F` + 下方 12px R500 错误文案

### Search

搜索框是一种特化的 Input，多了"前置 icon / 清除 / loading"三件套。

- Container: 复用 Inputs & Forms 通用样式（背景、border、radius、padding、focus）
- **Padding 调整**: 左 `36px`（让出前置 icon 位置），右 `36px`（让出清除/loading 位置）
- **前置 search icon**:
  - MingCute `mingcute_search_line`，`16px`，颜色 N500（占位）/ N700 (light) 或 N400 (dark)（已聚焦或有内容）
  - 绝对定位 left `12px`，垂直居中
- **清除按钮**（仅当有输入值时显示）:
  - MingCute `mingcute_close_circle_fill` 或 `mingcute_close_line`，`16px`，颜色 N500
  - hover 颜色变 N700/N300，cursor pointer
  - 绝对定位 right `12px`，垂直居中
  - 键盘可访问：button 元素 + `aria-label="Clear search"`
- **Loading 态**（异步搜索时替换清除按钮）:
  - 14px 圆形 spinner，描边 N300/N700，旋转 `@keyframes`
- **Suggestions dropdown**（如有自动补全）:
  - 复用 Select 下拉规范（见下）
- **不要**给 search 加 submit 按钮（默认回车触发；只在表单提交场景才显式按钮）

### Select / Dropdown

下拉选择器。**视觉上看起来与 Input 一致**（同 padding/border/radius/font），唯一加成右侧 `mingcute_down_line` chevron `16px` N500，距右边 `12px`。

**状态**：
- Default: 同 Input default
- Hover: border 加深一阶 N400 / N600
- Focus / Open: 同 Input focus（中性 halo），chevron 旋转 180° 变 `mingcute_up_line`
- Disabled: opacity 0.4, cursor not-allowed, bg `#F7F8FA` / `#1A2236`
- Selected (有值时): 文字色 N1000/W；占位文字色 N500

**展开后的 Menu**：
- 容器: bg `#FFFFFF` / `#252B39`, radius `8px`, shadow Modal 档（详见 Section 6）
- Padding: 上下 `4px`，菜单项之间无 gap
- Min-width: 与触发器同宽
- Max-height: `280px`（约 8 项），超出滚动
- 上下偏移 `4px`（与触发器之间留呼吸）

**Menu Item**：
- Padding: `8px 12px`
- Font: 14px weight 400
- Hover: bg `#F7F8FA` (N50) / `#1A2236`
- Selected: 行尾加 `mingcute_check_line` `16px` N1000/W，bg 不变
- Disabled: opacity 0.4，hover 无反应
- Section divider（如分组）: `1px solid border-subtle`，上下各 `4px` 间距 + 11px N500 uppercase 分组标题

**Combobox 变体**（带文本输入的下拉）：
- Trigger 是真正的 input，可以输入过滤
- Menu 在键入时实时过滤，匹配字符高亮 weight 600
- 空结果显示 13px N500 muted 文案 "No matches"

### Cards & Containers

卡片是内容容器的最小单位。Agentic Genius 用 **5 级 elevation** 表达层级关系（详见 Section 6 Depth & Elevation 总表）。Cards 段聚焦"做成可用组件"的细节。

**通用规范（适用所有 variant）**：
- Background: `#FFFFFF` (light) / `#252B39` (N900, dark)
- Padding: `16px`（紧凑型，列表/网格）/ `20px`（默认）/ `24-32px`（feature/marketing）
- Radius: `8px`（卡片专属档；详见 Section 5 Border Radius Scale）
- Title 与 description 之间间距 `8px`，与 footer/action 区 `16px`
- Hover 状态过渡: `transition: border-color 120ms ease, box-shadow 160ms ease, transform 160ms ease`

**Variants**：

#### Variant 1 — Flat（Level 0）
- 视觉: 无边框无阴影，仅 padding + 标题字号建立层次
- 用途: 信息密集表格行、emoji-less 列表项、subtask 折叠子项
- Hover（如可点击）: 背景 `#F7F8FA` (N50) / `#1A2236` 整块淡化高亮

#### Variant 2 — Contained（Level 1，**默认卡片**）
- 视觉: `1px solid #E7ECF3` (N200) / `1px solid #344052` (N800)，无 shadow
- 用途: 项目卡、设置项、agent 列表项 —— 大多数列表/网格场景
- Hover（可点击）:
  - border 变 `#CDD4DF` (N300) / `#475569` (N700)
  - 浅色模式可叠加极弱 shadow `rgba(15,23,41,0.04) 0 1px 3px`
  - **不**改背景色（避免视觉跳动）
  - 可选 `transform: translateY(-1px)` 表示"被抬起"

#### Variant 3 — Ring（Level 2）
- 视觉: `box-shadow: 0 0 0 1px #E7ECF3` (N200) / `0 0 0 1px #344052` (N800)，无 border
- 用途: 选中态卡片、当前激活的 agent 卡 —— ring 比 border 视觉更"轻"，适合表达"被指针/键盘聚焦"
- Hover: ring 加深为 `0 0 0 1px #949CAC` (N500) / `0 0 0 1px #B7BDCA` (N400)，仍是中性
- Selected: ring 加粗为 `0 0 0 2px #0F1729` (N1000) / `0 0 0 2px #FFFFFF` (W)，文字色不变。**不用品牌蓝** —— 选中是结构信号，不是品牌强调

#### Variant 4 — Whisper（Level 3）
- 视觉: `box-shadow: rgba(15,23,41,0.05) 0 4px 24px`，无 border
- 用途: 浮起的 feature 卡、产品截图卡、首页 hero 下方介绍卡 —— "悬浮感"，但极柔
- Hover: shadow 加深至 `rgba(15,23,41,0.10) 0 8px 32px` + `transform: translateY(-2px)`
- **暗色模式禁用**：dark 下阴影几乎不可见，降级为 Variant 2 (Contained)

#### Variant 5 — Inset（Level 4）
- 视觉: `box-shadow: inset 0 0 0 1px rgba(15,23,41,0.15)` / `inset 0 0 0 1px rgba(255,255,255,0.10)`
- 用途: 按钮 active/pressed 态、被点下的 toggle、表单字段 disabled 容器
- Hover: 不适用（这本身就是临时反馈态）

**Card 内部组件约定**：
- Title: H3 (`22px / weight 600`)，可前置 16px MingCute icon
- Description: Body (`15px`)，N600 / N400 muted
- Footer: 顶部 `1px solid border-subtle` 分隔，内容 13px micro label
- Actions（按钮组）: 右下角，gap `8px`

### Links

链接分两类：**Inline link**（嵌在正文里）和 **Standalone link**（独立 CTA，如 footer "View all →"）。规范上风格不同，避免正文像 90 年代 web。

**Inline link（正文内）**：
- Default (light): color `#0F1729` (N1000), `text-decoration: underline; text-decoration-color: #CDD4DF (N300); text-underline-offset: 3px`
- Default (dark): color `#FFFFFF`, underline color `#475569` (N700)
- **Hover**: color `#123AFF` (B500) / `#4161FF` (B400)，下划线颜色随文字变 B500/B400，**不加粗**
- **Visited**: 不区分（与 default 同）—— Agentic Genius 不做"访问过/没访问过"的视觉区分，避免无意义的状态膨胀
- **Focus**（键盘）: 标准 focus ring（中性 N1000/W 2px outline + 2px offset），下划线保持 default
- **Active**（按下瞬间）: color B600 / B300，无 transition
- 外链结尾追加 `mingcute_external_link_line` `12px` N500，gap `2px`

**Standalone link（独立 CTA）**：
- Default: color `#0F1729` / `#FFFFFF`, **无下划线**, font weight 500
- **Hover**: color B500 / B400 + 下划线出现 (`text-decoration: underline`)
- 末尾 `mingcute_arrow_right_line` `14px`, hover 时向右位移 `2px` (`transform: translateX(2px); transition: 120ms`)
- Focus: 标准中性 focus ring
- 用途: "View all projects →"、"Read more →"、面包屑、卡片底部跳转

**禁止**：
- 用纯蓝色文字代替 underline 表示 link —— 容易被误认为标签
- 给链接加 `font-style: italic` 或换字体

### Navigation

- Background: `#FFFFFF` / `#0F1729`，sticky top，下边 `1px solid border-subtle`
- 高度: 56px（桌面）/ 48px（移动）
- Logo: 左对齐，文字标 + 单色 SVG mark
- Links: 14px weight 500，`#0F1729` / `#FFFFFF`，hover `#667085` / `#B7BDCA`（注意：导航 hover 不用品牌蓝，避免太多信号色）
- Active link: 下方 `2px solid #0F1729 / #FFFFFF` 横线
- 右侧操作区: Theme toggle、用户头像、Primary CTA

### Agent Status Indicators

Agentic Genius 特有组件，用 8px 圆点表示 agent 状态：

| 状态 | 颜色 | 动画 |
|---|---|---|
| Idle / 待响应 | `#123AFF` (B500) | 无 |
| Running / 思考中 | `#00BF74` (G700) | `pulse` 1.5s 循环 |
| Completed | `#00BF74` (G700) | 无 |
| Error | `#F24E3F` (R500) | 无 |
| Paused | `#949CAC` (N500) | 无 |

圆点旁可跟 12px 状态文本（N600 / N400）。

### Code Blocks

- Background: `#F7F8FA` (N50) / `#0F1729` (N1000) —— 暗色模式与页面同底，仅靠 border 区分
- Border: `1px solid #E7ECF3` / `1px solid #344052`
- Radius: `6px`
- Font: `system-mono` 13px line-height 1.65
- Padding: `12px 16px`
- 语法高亮: keyword `#123AFF` (B500)、string `#00BF74` (G700)、comment `#949CAC` (N500)、function `#0F1729` / `#FFFFFF`、number `#FF671D` (O500)
- 代码顶部可附 `language` 标签（micro label 样式）+ "Copy" 按钮（ghost variant）

### Form Controls

Checkbox / Radio / Switch / Slider —— 表单原子控件。**几何形态严格区分语义**：方形=多选，圆形=单选，胶囊=布尔开关。

#### Checkbox
- Size: `16px × 16px`
- Radius: `radius-xs` (4px)
- Default: `1px solid #CDD4DF` (N300) / `#475569` (N700) border, bg transparent
- Hover: border 加深一阶 N400 / N600
- Checked: bg `#0F1729` (N1000) / `#FFFFFF` (W), 无 border, 内部用 CSS 几何画勾——`::after` 宽 `10px` 高 `5px`，`border-left: 2px solid` + `border-bottom: 2px solid` 反色 (W / N1000)，`transform: rotate(-45deg)` 居中。**不要用图标 glyph**——12px 下 path 矢量会出毛刺
- Indeterminate: bg 同 checked, `::after` 宽 `8px` 高 `2px`，反色实心，居中
- Focus: 标准中性 focus ring（2px outline N1000/W + 2px offset）
- Disabled: opacity 0.4
- Label: 右侧 `gap: 8px`，字号 14px，点击 label 等同点击 checkbox

#### Radio
- Size: `16px × 16px`
- Radius: `radius-full` (50%)
- Default: 同 Checkbox default
- Checked: 外环 `1px solid #0F1729` / `#FFFFFF`, 内嵌 `8px` 同色实心圆，bg transparent
- Focus / Disabled: 同 Checkbox
- 同组 radio 之间垂直间距 `8px`

#### Switch / Toggle
- Track: `32px × 18px`, radius `radius-full` (9px)
- Thumb: `14px × 14px` 圆，bg `#FFFFFF` 永远，与 track 之间留 `2px` padding
- Off: track bg `#CDD4DF` (N300) / `#475569` (N700), thumb 在左
- On: track bg `#0F1729` (N1000) / `#FFFFFF` (W), thumb 在右；dark 模式下 thumb 改 `#0F1729`
- Transition: `transform 160ms ease, background-color 160ms ease`
- Focus: track 外加 2px N1000/W outline + 2px offset
- Disabled: opacity 0.4
- 用法约束: **仅用于即时生效的布尔开关**（如"暗色模式"、"通知开"），不要用于"提交后才生效"的表单字段——那种用 Checkbox

#### Slider
- Track: `width: 100%, height: 4px`, radius `radius-full`, bg `#E7ECF3` (N200) / `#344052` (N800)
- Filled portion: bg `#0F1729` (N1000) / `#FFFFFF` (W)
- Thumb: `16px × 16px` 圆, bg `#FFFFFF`, border `1px solid #0F1729` / `#FFFFFF`, shadow `rgba(15,23,41,0.10) 0 1px 4px`
- Hover thumb: 放大到 `20px`，shadow 加深
- Active thumb（拖拽中）: thumb 周围 `0 0 0 6px rgba(15,23,41,0.08)` halo
- Focus: thumb 周围 2px N1000/W outline + 2px offset
- 数值标签: thumb 上方 `24px` 浮一个 mini tooltip（13px N1000/W on bg N50/N900），仅在 hover/drag 时显示
- Disabled: 整体 opacity 0.4
- Range slider（双端）: 两个 thumb，filled portion 是中间区段

### Distinctive Components

**Chat Bubble（用户/Agent 对话气泡）**
- 用户消息: 右对齐，背景 `#F0F3F7` (N100) / `#252B39` (N900)，文字 `#0F1729` (N1000) / `#F7F8FA` (N50)，radius `12px`，最大宽度 70%——气泡轻量、不抢戏，与 Agent 输出节奏一致
- Agent 消息: 左对齐，背景 `transparent`，文字 N1000 / W，无边框，radius 0（直接占行）—— 强调"agent 输出 = 内容本身"
- 气泡间距: 16px

**Token Stream Highlight**
- Agent 流式输出时，最新生成的 token 用 `background: rgba(18, 58, 255, 0.08)` 短暂高亮 200ms，让用户能看到"光标位置"

**Tag / Badge**

通用形态（所有变体共享）：
- Radius: `radius-xs` (`4px`)（比按钮小一档，更紧凑）
- Padding: `2px 8px`
- Font: 11px weight 600 uppercase
- Border: 1px solid，与 bg 同色相 200 阶（如 `B100` bg → `B200` border）；中性变体可省 border
- 高度统一：约 `20px`（11px text + 2×2 padding + border）

**两层结构**：先看是不是状态（语义槽固定色），再看是不是分类（自定义槽用装饰色板）。

#### 5.1 语义槽（Status，固定 5 种 —— 颜色与状态严格绑定，不可改）

| 状态 | bg | text | 适用文案（示例） |
|------|----|----|----|
| 中性 / Default / Idle / Draft | `N100` | `N700` | `DRAFT` `IDLE` `ARCHIVED` `INACTIVE` |
| 信息 / Info / In Review | `B100` | `B800` | `INFO` `IN REVIEW` `RUNNING` `PROCESSING` |
| 成功 / Success / Done / Active | `G100` | `G800` | `ACTIVE` `DONE` `READY` `LIVE` |
| 警告 / Warning / Pending | `Y100` | `Y800` | `PENDING` `STALE` `WARNING` `DEPRECATED` |
| 错误 / Error / Failed / Blocked | `R100` | `R800` | `FAILED` `BLOCKED` `ERROR` `OFFLINE` |

**约定**：状态语义优先 —— 一旦语义匹配，必须用对应槽的颜色；不允许"成功用蓝色"或"错误用黄色"这种语义错配。

#### 5.2 自定义槽（Category，可扩展 —— 用于非状态分类）

非状态的分类标签（如领域、技能、团队、主题），从 Decorative Palette 挑色相，结构同语义槽：`<color>100` bg + `<color>800` text。可用色相：T (Teal) / P (Purple) / Pk (Pink) / S (Sky) / O (Orange)，不与 B/G/Y/R 重叠以避免与语义混淆。

| 推荐用法 | bg | text | 示例 |
|----------|----|----|----|
| Research / 研究 | `T100` | `T800` | `RESEARCH` `EXPERIMENT` |
| Design / 设计 | `P100` (Purple) | `P800` | `DESIGN` `BRAND` `UX` |
| Frontend / 前端 | `Pk100` (Pink) | `Pk800` | `FRONTEND` `MOBILE` |
| Backend / 后端 | `S100` (Sky) | `S800` | `BACKEND` `INFRA` |
| Marketing / 营销 | `O100` | `O800` | `MARKETING` `GROWTH` |

**扩展规则**：
- 新分类按上面"色相 → 含义"的映射沿用；同一品类用同色相，不要每个项目重映射
- 一个 tag 不能同时承担状态和分类含义；如需"运行中的研究项目"，并排放两个 tag（语义槽 `RUNNING` + 自定义槽 `RESEARCH`），不要合成一个紫色"RUNNING RESEARCH"
- 如果想要的色相超出推荐 5 种，从 Decorative Palette 任选一个未使用的色相，遵循 `<color>100 + <color>800` 模式

## 5. Layout Principles

### Spacing System

**Base unit**: `4px`（不是 8px——更精细，便于做密集 UI）

**Scale**（命名 token + 像素值，所有 padding/margin/gap 必须从此表挑值）：

| Token | px | 主要用途 |
|-------|----|--------|
| `space-0` | 0 | reset / 无间距 |
| `space-1` | 4 | 紧凑控件内部缝隙（icon + text gap、tag padding-y） |
| `space-2` | 8 | tag/badge padding-x、按钮组 gap、code 行内 padding |
| `space-3` | 12 | input padding-y、列表项 padding、紧凑卡片 gap |
| `space-4` | 16 | **默认 padding** —— 卡片、按钮 padding-x、card gap |
| `space-5` | 20 | 默认卡片 padding、表单字段 vertical gap |
| `space-6` | 24 | section 内组件间隔、宽松卡片 padding |
| `space-8` | 32 | section 内大块隔断、feature 卡 padding |
| `space-10` | 40 | section padding（移动端竖向） |
| `space-12` | 48 | section padding 桌面竖向最小、modal padding |
| `space-16` | 64 | hero 区竖向 padding 移动 |
| `space-20` | 80 | hero / 大 section 桌面竖向 padding |
| `space-24` | 96 | landing page section 之间 |
| `space-32` | 128 | landing page 主标题与下方内容 |

**Common patterns**:
- Inline icon + text: `gap: 6px`（特殊值，介于 4-8 之间，用于按钮/链接）
- Card 内 title → description: `gap: 8px`
- Card 内 content → footer: `gap: 16px`
- 列表项之间: `gap: 12-16px`
- Section 之间（页面级）: `48-80px` 桌面 / `32-48px` 移动

### Border Radius Scale

**所有 radius 必须从此表挑值**，不允许"自定义新 radius"。

| Token | px | 用途 |
|-------|----|--------|
| `radius-none` | 0 | Agent 消息气泡（独占一行）、纯文本块 |
| `radius-xs` | 4 | Tag / Badge / Micro chip / 标签 |
| `radius-sm` | **6** | **默认** —— 按钮、输入框、小卡片、code inline、code block |
| `radius-md` | 8 | 卡片 / Panel / Section container |
| `radius-lg` | 12 | Modal / Sheet / Popover / 用户消息气泡 |
| `radius-xl` | 16 | 大 feature 卡、onboarding card |
| `radius-full` | 9999 (50%) | Avatar、圆形指示器、status pill、IconButton 圆形态 |

**约定**：
- 嵌套元素的 radius 必须 ≤ 父元素 radius，否则视觉脱节
- 同一层级的多个元素必须用同一个 radius token，不允许"按钮 6px、输入框 8px"这种不一致

### Grid & Container
- Max content width: `1200px`（marketing 页）/ `960px`（应用内文档/对话）/ 全宽（dashboard）
- Marketing 页: full-width hero + contained text
- 应用页: 左侧固定 `240px` 侧边栏 + 流体主区
- 文档/对话: 单列 `720-880px` 居中

### Whitespace Philosophy
- **信息密度优先**：开发者每屏想看到尽可能多的内容（agent 列表、token 输出、日志）。Whitespace 用来分隔概念，不用来"呼吸"。
- **节奏靠 border + 字号差**，不靠大段空白。一段标题（22px）+ 描述（13px）的字号比就足以建立层次。
- **卡片密集排布**：列表/网格用 `12-16px gap`，营造目录感而非画廊感。

## 6. Depth & Elevation

5 级 elevation 系统。**所有 surface 必须从这 5 级里挑一个**，不允许"自定义新阴影"。

| Level | 名称 | Treatment | 用途 |
|-------|------|-----------|------|
| 0 | **Flat** | 无 shadow，无 border | 页面背景、内联文本块、密集表格行 |
| 1 | **Contained** | `1px solid #E7ECF3` (N200) / `1px solid #344052` (N800) | **默认卡片** —— 项目卡、设置项、agent 列表项；输入框；分割线 |
| 2 | **Ring** | `box-shadow: 0 0 0 1px #E7ECF3` (N200) / `0 0 0 1px #344052` (N800) | 可交互卡 hover/selected、当前激活项 —— ring 比 border 视觉更轻 |
| 3 | **Whisper** | `box-shadow: rgba(15,23,41,0.05) 0 4px 24px` | 浮起 feature 卡、产品截图、首页 hero 下方介绍卡 |
| 4 | **Inset** | `box-shadow: inset 0 0 0 1px rgba(15,23,41,0.15)` / `inset 0 0 0 1px rgba(255,255,255,0.10)` | 按钮 active/pressed、toggle 按下态、disabled 容器 |

**专用阴影（不属于 5 级，独立列出）**：

| 用途 | Treatment |
|------|-----------|
| Modal / Drawer / Popover | `box-shadow: rgba(15,23,41,0.16) 0 8px 24px -4px`（浮层级，仅浅色模式） |
| Focus Ring | `outline: 2px solid #0F1729` (light) / `#FFFFFF` (dark), `outline-offset: 2px`（键盘聚焦，所有 focusable 元素必备。中性深色，不用品牌蓝） |

**Shadow Philosophy**：
- 极简主义。仅 Whisper（卡级）+ Modal（浮层级）两档"阴影"，其余靠 border / ring / inset 区分。
- **暗色模式下 Whisper 降级为 Contained**：深色背景上阴影几乎不可见，改用 1px 边框承担"浮起"感。
- **Inset 不依赖背景色**：靠内嵌边框线表达"被压下"，避免改背景导致颜色跳变。

### Decorative Depth

- 装饰渐变（hero / 空状态插画）可用 Decorative Palette 任意色阶做径向或线性渐变。但**不用于控件背景**。
- **不使用 glassmorphism / backdrop-blur**——清晰度优于氛围感，开发者工具不应该"看不清下面是什么"。

## 7. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | 单列堆叠，侧边栏收起为汉堡 |
| Tablet | 640-1024px | 双列网格开始，侧边栏可手动展开 |
| Desktop | 1024-1440px | 标准桌面布局，侧边栏固定 |
| Large | >1440px | 内容区限宽 1200-1400px，两侧留白 |

### Touch Targets
- 按钮最小高度 `36px`（紧凑）/ `40px`（标准）—— 满足 iOS HIG 44px 容差
- 列表项最小高度 `40px`，可点击区域含 padding
- 移动端导航折叠为汉堡 + 全屏 overlay

### Collapsing Strategy
- Hero: 36px → 24px（mobile）
- 侧边栏: 桌面固定 240px → 平板可展开 → 移动收起为顶部 drawer
- 卡片网格: 3 列 → 2 列 → 1 列
- Footer: 多列 → 单列堆叠
- Section padding: 64-80px → 32-48px

### Image Behavior
- 插画/装饰图: 维持纵横比，按容器宽度缩放
- Hero 图: 移动端不超过视口高度的 60%
- 头像: `32px`（列表）/ `40px`（导航）/ `64px`（个人页）

## 8. Responsive Behavior (Extended)

### Typography Scaling
- Display 36px → 28px（mobile）
- Page Title 28px → 22px
- Section Heading 22px → 20px
- Body 15-16px 在所有断点保持不变
- Button text 14px 在所有断点保持不变

### Light/Dark Theme Strategy
- 浅色和暗色不通过"section 交替"实现，而是**整页主题切换**（受 `prefers-color-scheme` 或用户手动 toggle 控制）
- 信号色 B500 / G700 在两种模式下分别用 B500/G700（light）和 B400/G600（dark），保持感知亮度一致
- Decorative palette 同一组色，浅色模式用 500-700 段，暗色模式用 300-500 段
- 不做"局部反色 section"——整页统一主题，避免视觉跳跃

## 9. Agent Prompt Guide

> 本段供 AI 编码 agent（Claude Code / Cursor）阅读，生成符合本设计系统的 UI 时，从这里取色值/字号/组件描述。

### Quick Color Reference

- Primary action bg (light): `#0F1729` (N1000)
- Primary action bg (dark): `#FFFFFF` (W)
- Page background (light / dark): `#FFFFFF` / `#0F1729`
- Surface (light / dark): `#F7F8FA` / `#252B39`
- Text primary (light / dark): `#0F1729` / `#FFFFFF`
- Text secondary (light / dark): `#667085` / `#B7BDCA`
- Border subtle (light / dark): `#E7ECF3` / `#344052`
- Focus ring: `2px solid #0F1729` (light) / `2px solid #FFFFFF` (dark) — **中性深色**，不用品牌蓝
- Link hover: `#123AFF` / `#4161FF`
- Agent active dot: `#00BF74` (G700)
- Agent idle dot: `#123AFF` (B500)
- Status: success `#00BF74` / warning `#FFC629` / error `#F24E3F` / info `#25B3FF`

### Quick Typography Reference

- Font: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif`
- Mono: `ui-monospace, "SF Mono", Menlo, monospace`
- 标题字重 600，按钮/导航 500，正文 400
- 大标题（≥22px）带 `letter-spacing: -0.01em ~ -0.02em`

### Example Component Prompts

- "Create a primary CTA button. Background `#0F1729`, text `#FFFFFF`, padding `8px 14px`, border-radius `6px`, font 14px weight 500, no border, no shadow. Hover background `#252B39`. Focus outline `2px solid #0F1729` with 2px offset (NOT brand blue). Use system font stack."

- "Design a card: background `#FFFFFF`, border `1px solid #E7ECF3`, border-radius `8px`, padding `20px`, box-shadow `rgba(15,23,41,0.08) 0px 1px 2px 0px, rgba(15,23,41,0.06) 0px 4px 8px -2px`. Title at 22px weight 600 color `#0F1729` with letter-spacing -0.01em. Body at 15px weight 400 color `#667085` line-height 1.55."

- "Build a navigation bar: background `#FFFFFF`, sticky top, height 56px, border-bottom `1px solid #E7ECF3`. Logo left, text-only wordmark in `#0F1729`. Nav links at 14px weight 500 color `#0F1729`, hover color `#667085`. Right side: ghost icon button + primary CTA black-on-white."

- "Create an agent status indicator: 8px circle, background `#00BF74`, with `pulse` animation (scale 1 → 1.4, opacity 1 → 0, 1.5s ease-out infinite). Right of dot: text 'Running' at 12px weight 400 color `#667085`."

- "Render a code block: background `#F7F8FA`, border `1px solid #E7ECF3`, border-radius `6px`, padding `12px 16px`, font `ui-monospace, SF Mono` 13px line-height 1.65. Syntax highlight: keywords `#123AFF`, strings `#00BF74`, comments `#949CAC`."

- "Design a chat bubble for user message: right-aligned, max-width 70%, background `#0F1729`, color `#FFFFFF`, padding `10px 14px`, border-radius `12px`. For agent message: left-aligned, no background, no border, color `#0F1729`, occupying full row."

### Iteration Guide

1. **中性色优先**：按钮、导航、表单、表格统一用 N + W/B 锚点。**不要**用品牌蓝/绿做按钮填充
2. **信号色三处**：链接 hover、agent 状态点、代码 keyword 高亮。**焦点环不在此列，焦点用中性 N1000/W**。其他地方出现 B500/G700 都要复核
3. **装饰可用全色板**：卡片插画、空状态图、营销 hero 渐变、分类标签可以用任意 Decorative 色相
4. **圆角 6px 默认**：按钮/输入框 6px，卡片 8px，弹窗 12px，标签 4px
5. **系统字体**：永远不引入 Web Font。`font-family` 写完整系统栈
6. **暗色模式翻转 Primary**：黑底白字按钮 → 白底黑字按钮
7. **暗色模式去阴影**：用 `1px solid N700` 边框替代 box-shadow
8. **字重 600 是上限**：不用 700。需要更强对比时改字号或加 letter-spacing 而非加粗
9. **Agent 状态色固定**：绿点 = running，蓝点 = idle，红点 = error，灰点 = paused。不要交换
10. **代码块语法高亮固定**：keyword 蓝、string 绿、comment 灰、number 橙——保持跨页面一致
