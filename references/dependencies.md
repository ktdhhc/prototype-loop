# 依赖技能来源

> 阶段 0 预检时读取。以下是依赖来源，不是原技能指令的副本，也不代表已安装或已加载。安装方式以对应仓库当前说明及宿主支持为准。

| 所需技能 | 来源仓库 | 技能入口或定位 |
| --- | --- | --- |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 仓库中的 `impeccable` 技能；包含本流程使用的 `init`、`shape` 入口 |
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 仓库中的 `ui-ux-pro-max` 技能及其检索材料、脚本 |
| `prototype` | [mattpocock/skills](https://github.com/mattpocock/skills) | [`skills/engineering/prototype`](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype)；制作界面时使用原技能指定的 UI 分支 |
| `grilling` | [mattpocock/skills](https://github.com/mattpocock/skills) | [`skills/productivity/grilling`](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling)；需要实际加载 `grilling`，只发现 `grill-me` 包装入口不算依赖就绪 |

预检报告逐项附上仓库链接。缺失或加载失败时，同时指出所需技能及具体入口，方便用户安装或修复发现路径；不擅自安装、更新或覆盖已有技能。逐题提问工具由宿主提供，不属于上述仓库中的技能。

上游版本可能改变入口、分支或行为；安装链接不保证某个版本兼容。本流程要求 `impeccable` 的产品核对与界面访谈入口、`prototype` 的 UI 原型能力，以及 `grilling` 的逐题等待和共同理解确认。实际加载后检查对应契约；发现入口缺失或与本流程硬约束冲突时，报告实际规则与冲突，暂停受影响环节，交用户决定采用兼容版本还是调整流程。不能暗中忽略上游规则或把调用成功当成兼容验证通过。
