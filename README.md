# prototype-loop

**逐层原型设计单个界面**：一个协助 AI Agent 把"界面没想清楚"推进到可交付设计的 Skill 项目。它针对"AI 很快给了三版，我却说不清哪里不对"的问题：把一次比较不了的取舍拆成**每层只有一件事**的可见原型，把每次决策的理由与推翻记录留在**过程账本**里，把用户看过真实渲染后的确认作为冻结条件。

目前是独立项目中的草稿，**不是已经完成多项目实测的稳定 Skill**。仓库根目录就是 Skill 本体（`SKILL.md` + `references/` + `bin/`）。

## 适用场景

- 新页面或重设计页面还有多个相互牵连的取舍，一次拍板会替用户多做决定。
- 希望先看到不同骨架、密度或交互方案的真实渲染，再决定取舍。
- 已有 `PRODUCT.md`、`DESIGN.md` 或已实现界面，需要先确认沿用、试画对照还是重新澄清。
- 组件库未定，需要同一份 7–10 组元素的真实采样再选型。
- 要把原型讨论的结论、功能范围、演示与正式接口的差异，交接给后续 UI 开发。

不适用于没有界面设计目标的任务，也不适用于已经明确到只有一个单点改动（改按钮、换主题、几处 CSS）或纯视觉评审的工作。

## 使用方法

### 安装与试用

仓库根目录就是 Skill 本体。安装器把 `SKILL.md` 与 `references/` 放进 Agent 的 Skill 发现路径：

```bash
# 安装到当前项目的 .agents/skills/prototype-loop（默认）
npx github:ktdhhc/prototype-loop

# 安装到用户级 ~/.agents/skills/prototype-loop（所有项目可用）
npx github:ktdhhc/prototype-loop --global

# 指定目标项目
npx github:ktdhhc/prototype-loop --dir /path/to/project
```

选项：`--global`/`-g` 用户级安装、`--project <path>`、`--dir <path>` 指定目标、`--help` 说明；显式写 `install` 子命令等价。安装后**重启该项目的 Agent 会话**，Skill 才会被发现。若该包已发布到 npm，也可用 `npx prototype-loop`，参数相同。也可以不用安装器：直接把本仓库的 `SKILL.md` 与 `references/` 复制成 `<项目>/.agents/skills/prototype-loop/`（或 `~/.agents/skills/prototype-loop/`），效果一样。

安装器**不覆盖已存在的同名技能**；更新前请自行核对并备份旧版本。它只复制技能文件，不会把本地文章、笔记带进目标项目，也不会自动初始化 Git 或推送远端。

安装后用户可以说"用 `prototype-loop` 设计这个页面，先拆层、每层做原型我看过再定"，或在支持 slash command 的宿主里显式调用 `/prototype-loop`。Skill 应先核对 `impeccable`、`ui-ux-pro-max`、`prototype`、`grilling` 与逐题提问工具；缺失时报告影响并询问是否继续，缺 `prototype`、`grilling` 或提问工具时停在依赖检查，不用文字推演冒充原型验收。

### 工作方式

**用户向流程**：确认产品事实与视觉依据 → 界面访谈（这页做什么、为谁、到什么边界）→ 拆层闸门（先写分层表初版，再为每层写 2–3 个只差本层决策的反事实变体）→ 逐层看图、答决定性提问、冻结并等放行 → 收口总结视觉依据变化。

**工程向流程**：锁住其他维度制作单差变体 → 真实渲染验收（执行失误当场修、未来层的输入记跨层待办）→ 只问会改变做法的问题 → 写账本并冻结 → 停层等用户放行。层数超过 12 时，向用户建议拆成两个页面或分两大轮，不自行执行。

原型结论若要改变既有视觉依据，先记为 `ΔDESIGN` 摆到桌面上，经用户逐条确认后才修订 `DESIGN.md` 等基线文档；基线文档的写入权在用户，不在 Agent。

## 文件导航

| 路径 | 作用 | 何时读 |
|---|---|---|
| [SKILL.md](SKILL.md) | 触发、依赖检查、六个阶段与完成判据 | 触发时 |
| [axis-pool.md](references/axis-pool.md) | 管理台页面的静态轴示例 | 拆层枚举轴时 |
| [layers.md](references/layers.md) | 拆层协议：独立性判定、影响半径排序、反事实测试 | 拆层与预演时 |
| [sampler.md](references/sampler.md) | 组件库采样的元素清单与制作规则 | 组件库未定或试画对照时 |
| [prototype-loop.md](references/prototype-loop.md) | 锁轴原型、渲染验收、冻结停层与回退 | 每层执行时 |
| [questions.md](references/questions.md) | 只问决定性问题的挂靠机制与提问技法 | 每层提问前 |
| [ledger-template.md](references/ledger-template.md) | 目标项目内的过程账本骨架 | 建立账本时复制 |
| [closure.md](references/closure.md) | 收口清单与交付说明模板 | 收口时 |
| [bin/prototype-loop.mjs](bin/prototype-loop.mjs) | 安装器 | 安装或改安装行为时 |
| [test/install.test.mjs](test/install.test.mjs) | 安装器测试 | 改安装器后 |
| 本地 `BACKGROUND.md` | 背景文章：从一次真实协作提炼本 Skill | 了解缘起时（不随仓库发布） |

## 最小输入与产出

输入最好包括：目标页面与期望范围、已有产品与视觉依据、组件库现状、可运行方式（能起本地服务或截图）。缺其中一项并非一律停工：没有视觉依据时先走采样；组件库已定则跳过采样；单层信息不足时用空位占位，先冻结能定的部分。

产出以**一套可运行页面、一份过程账本、一份页面设计与接线说明、经用户确认的视觉依据变化**为主。过程账本放在被设计项目的 `.scratch/prototype/<页面名>/LAYER-DECISIONS.md`，可反复修订、不是正式规格；交付说明让后续开发不必读账本即可接线。

## 开发状态与试用建议

- 已有 Skill 主文件、七份参考文件、安装器与七项安装器测试；**尚未用 2–3 个独立项目试跑**，不要把"文件已写完"误认为 Skill 已验证。
- 试用宜覆盖：①冷启动（没有任何设计文档）②已有 `DESIGN.md` 的试画对照 ③中途推翻已冻结结论的回退。
- 记录触发是否正确、是否先报告依赖、是否先写分层表再测变体、用户看图前是否提前追问、冻结后是否停下、是否被来源项目的局部经验带偏。
- 仓库已推送 GitHub；npm 包已就绪但首发需账号双重验证，未发布前请用 `npx github:ktdhhc/prototype-loop` 安装。
