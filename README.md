# prototype-loop

`prototype-loop` 是一个用于**逐层确定单个界面设计**的 ZCode skill 项目。它把“界面还没想清楚”转成一系列可见、可比较、可回退的决定：先澄清页面任务，再拆成一次只决定一件事的层，每层看真实原型、讨论差异，最后整理为可供正式开发接线的说明。

它是一个**编排技能**：依赖现有的 `impeccable`、`ui-ux-pro-max`、`prototype`、`grilling` 和逐题提问工具，启动前会检查并报告可用性；不复制这些技能自身的方法。使用时以其当前版本为准。

## 适用场景

- 新页面或重设计页面尚有多个相互牵连的设计取舍，不适合一次拍板。
- 希望先看到不同结构、密度或交互方案的实际渲染，再决定取舍。
- 有既有 `PRODUCT.md`、`DESIGN.md` 或已实现界面，但希望核对视觉依据，而非默认照搬。
- 需要把原型讨论的结论、功能范围、演示与正式接口的差异，交给后续 UI 开发。

如果只是改一个已确定的按钮、做纯视觉评审，或只有一个很小且已明确的决定，直接使用相应技能会更省事。

## 安装与使用

需要 Node.js 18 或更高版本。npm 包发布后，在目标项目目录运行：

```sh
npx prototype-loop install
```

这会把技能复制到当前项目的 `.agents/skills/prototype-loop/`。要安装到当前用户的技能目录：

```sh
npx prototype-loop install --global
```

也可指定目标项目：`npx prototype-loop install --project /path/to/project`。安装器不会覆盖已存在的同名技能；更新前请自行核对并备份已有版本。未发布到 npm 前，可在本仓库运行 `node bin/prototype-loop.mjs install --project /path/to/project`，或从 GitHub 地址使用 `npx --package github:<owner>/prototype-loop prototype-loop install`（替换 `<owner>`）。包的安装仅复制 `SKILL.md` 与运行必需的 `references/`，不会复制本地文章与笔记。仅将本包作为普通依赖安装，不会自动把技能注册到其他项目。

安装到技能搜索路径后，可以这样提出任务：

> 用 `/prototype-loop` 设计“案例集”页。先澄清范围，再给出分层表；每层做可切换原型，我看过后逐题决定，冻结一层就停下。

普通的“这个页面还没想清楚，想分层看原型再决定”也可触发已安装技能。开始时先得到依赖检查结果；如缺少关键依赖，流程会停在检查阶段。已有产品或设计文档时，会先决定沿用、试画对照，还是重新澄清。

## 运行过程与产物

1. **事实与依据**：确认产品事实、视觉依据；组件库未定时先比较同一份 7–10 组元素。
2. **界面简述与资源检索**：明确页面任务、素材、状态和边界，再查设计与交互依据。
3. **拆层闸门**：写分层表初版；每层用 2–3 个单差变体做反事实测试，用户认可后才进入原型。
4. **逐层原型**：只改变本层决策点；真实渲染验收；仅询问会改变做法的问题；冻结后等下一次放行。
5. **收口**：对照 `DESIGN.md` 总结视觉变化，经确认再修订；清理临时原型，记录正式接线所需的已定结论和缺口。

过程记录默认在**被设计的目标项目**中建立 `.scratch/prototype/<页面名>/LAYER-DECISIONS.md`，而不是写回这个 skill 项目。该账本可反复修订，不是正式规格。`DESIGN.md` 与其他基线文档遵守目标项目的写入规则。参考轴池是静态示例，项目之间不会互相回填设计决定。

## 文件导航

- [SKILL.md](SKILL.md)：给代理执行的入口、顺序、闸门和完成判据。
- [references/axis-pool.md](references/axis-pool.md)：管理台页面的静态轴示例。
- [references/layers.md](references/layers.md)：拆层、影响半径排序与反事实测试。
- [references/sampler.md](references/sampler.md)：组件库可视采样。
- [references/prototype-loop.md](references/prototype-loop.md)：逐层原型、渲染验收与回退。
- [references/questions.md](references/questions.md)：只问决定性问题。
- [references/ledger-template.md](references/ledger-template.md)：目标项目中的过程账本骨架。
- [references/closure.md](references/closure.md)：收口核对与交付说明模板。
背景文章与写作笔记仅保存在本地，不随 GitHub 仓库发布；公开仓库包含技能入口与运行时所需的参考文件。

## 许可证

本项目采用 [MIT License](LICENSE)。允许使用、修改和再分发，保留原版权与许可证声明即可。

## 项目状态

这是从一次真实设计协作提炼的技能草稿，已完成文本结构与一致性修订；尚未在新会话里用 2–3 个独立提示词完成触发与产物试跑。因此 README 描述的是**预期流程**，不是已验证的跨项目效果。原案例集页仅是来源案例，不是各项目都必须采用的页面结构或设计纪律。
