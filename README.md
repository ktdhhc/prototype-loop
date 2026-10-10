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
npx prototype-loop

# 安装到用户级 ~/.agents/skills/prototype-loop（所有项目可用）
npx prototype-loop --global

# 指定目标项目
npx prototype-loop --dir /path/to/project

# 也可直接取自 GitHub，参数相同
npx github:ktdhhc/prototype-loop --global
```

选项：`--global`/`-g` 用户级安装、`--project <path>`、`--dir <path>` 指定目标、`--help` 说明；显式写 `install` 子命令等价。安装后**重启该项目的 Agent 会话**，Skill 才会被发现。也可以不用安装器：直接把本仓库的 `SKILL.md` 与 `references/` 复制成 `<项目>/.agents/skills/prototype-loop/`（或 `~/.agents/skills/prototype-loop/`），效果一样。

安装器**不覆盖已存在的同名技能**；更新前请自行核对并备份旧版本。它只复制技能文件，不会把本地文章、笔记带进目标项目，也不会自动初始化 Git 或推送远端。

安装后用户可以说"用 `prototype-loop` 设计这个页面，先拆层、每层做原型我看过再定"，或在支持 slash command 的宿主里显式调用 `/prototype-loop`。Skill 应先实际调用加载四个依赖，并核对逐题提问工具；找到名称或读到片段不算已加载。有技能调用工具时须实际调用，只有宿主没有该机制时才允许完整读取原技能的文件加载路径；当前分支要求的材料也须在使用前读取。

依赖仓库：[`impeccable`](https://github.com/pbakaus/impeccable)、[`ui-ux-pro-max`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)、[`prototype`](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype)、[`grilling`](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)。具体定位及兼容要求见 [依赖技能来源](references/dependencies.md)；预检逐项附上仓库链接，方便用户安装，不自动安装或覆盖。

缺失或加载失败时报告真实结果，`impeccable`、`ui-ux-pro-max` 可由用户选择降级；缺 `prototype`、`grilling` 或提问工具则阻断。上游入口或规则与本流程冲突时暂停受影响环节，不用摘要冒充原技能执行。

### 工作方式

**用户向流程**：确认产品事实与视觉依据 → 界面访谈（这页做什么、为谁、到什么边界）→ 拆层闸门（先写分层表初版，再为每层写 2–3 个只差本层决策的反事实变体）→ 逐层看图初选、grilling 核对、确认本层结论 → 收层后冻结并等放行 → 收口总结视觉依据变化。

**工程向流程**：锁住其他维度制作单差变体 → 真实渲染验收（执行失误当场修、未来层的输入记跨层待办）→ grilling 核对并记录逐题结果或零提问依据 → 用户确认结论 → 固化唯一基线、清理落选产物并验证 → 通过收层闸门才冻结。落选分支每层收尾退出活跃原型，共享组件与仍有用途的样本保留，最终收口检查遗漏。

**原型初选、本层结论确认和下一层授权是三件事**。每层必须核对，但不套固定题序；已有明确答案可以零额外提问，须记录具体依据。“选 B，继续”或连续推进授权都不豁免核对、结论确认、清理和验证。无推进授权则冻结后停下；层数超过 12 时，建议拆成两个页面或分两大轮，不自行执行。

原型结论若要改变既有视觉依据，先记为 `ΔDESIGN` 摆到桌面上，经用户逐条确认后才修订 `DESIGN.md` 等基线文档；基线文档的写入权在用户，不在 Agent。

## 文件导航

| 路径 | 作用 | 何时读 |
|---|---|---|
| [SKILL.md](SKILL.md) | 触发、实际加载契约、六个阶段与完成判据 | 触发时 |
| [dependencies.md](references/dependencies.md) | 依赖仓库地址、技能定位与兼容要求 | 开头预检时 |
| [axis-pool.md](references/axis-pool.md) | 管理台页面的静态轴示例 | 拆层枚举轴时 |
| [layers.md](references/layers.md) | 拆层协议：独立性判定、影响半径排序、反事实测试 | 拆层与预演时 |
| [sampler.md](references/sampler.md) | 组件库采样的元素清单与制作规则 | 组件库未定或试画对照时 |
| [prototype-loop.md](references/prototype-loop.md) | 层循环、基线清理、收层闸门、冻结与回退 | 每层执行时 |
| [questions.md](references/questions.md) | grilling 核对、零提问依据与决定性问题技法 | 每层初选后 |
| [ledger-template.md](references/ledger-template.md) | 目标项目内的过程账本骨架 | 建立账本时复制 |
| [closure.md](references/closure.md) | 收口清单与交付说明模板 | 收口时 |
| [bin/prototype-loop.mjs](bin/prototype-loop.mjs) | 安装器 | 安装或改安装行为时 |
| 本地 `BACKGROUND.md`、`test/` | 背景文章与安装器的本地测试 | 了解缘起或改安装器时（均不随仓库发布） |

## 最小输入与产出

输入最好包括：目标页面与期望范围、已有产品与视觉依据、组件库现状、可运行方式（能起本地服务或截图）。缺其中一项并非一律停工：没有视觉依据时先走采样；组件库已定则跳过采样；单层信息不足时用空位占位，先冻结能定的部分。

产出以**一套可运行页面、一份过程账本、一份页面设计与接线说明、经用户确认的视觉依据变化**为主。过程账本放在被设计项目的 `.scratch/prototype/<页面名>/LAYER-DECISIONS.md`，可反复修订、不是正式规格；交付说明让后续开发不必读账本即可接线。

## 开发状态与试用建议

- 已有 Skill 主文件、八份参考文件与安装器（带本地测试）；**尚未用 2–3 个独立项目试跑**，不要把"文件已写完"误认为 Skill 已验证。
- 试用宜覆盖：①冷启动（没有任何设计文档）②已有 `DESIGN.md` 的试画对照 ③中途推翻已冻结结论的回退。
- 记录触发是否正确、是否实际调用依赖并读取当前分支材料、是否报告来源与加载结果、是否先写分层表再测变体、用户看图前是否提前追问、是否被来源项目的局部经验带偏。
- 收层重点试用：①选定后仍有本层未定边界，继续 grilling 而非直接冻结；②决定均已明确，记零提问依据并确认结论；③“选 B，继续”或连续推进仍完整收层；④落选分支逐层清理但共享产物保留，清理或验证有阻碍时不进入下一层。
- 仓库已推送 GitHub，并发布到 npm（`prototype-loop`）；本地测试覆盖安装器的目标选择与"已存在不覆盖"行为。
