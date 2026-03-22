# LangBot：企业级即时通讯 AI 机器人平台 模型配置与流水线调试篇

> *“专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。”*

[LangBot 项目地址](https://github.com/langbot-app/LangBot) · [LangBot 项目官网](https://langbot.app) · [LangBot 社区](https://docs.langbot.app/zh/insight/community) · [项目文档](https://docs.langbot.app/zh/insight/guide) · [我的博客](https://typerbody.xyz)

**LangBot**（原 QChatGPT）是一款专为企业设计的开源 AI 机器人平台，立项于 2021 年中旬。它专注于帮助企业将 AI 能力无缝集成到现有的工作流程中，特别针对使用飞书（Lark）和 Dify 的企业用户，提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## 模型配置与流水线调试篇
很高兴你能阅读到这里 这是这篇教程的第十章
如果你看文档或者熟悉操作流程的话 应该早已经会配置了
不过对于高标准的企业级轮询 我们有分支要使用 会在下一章番外去讲 所以这只是抽空才会去做的 不在主要服务范围内

好了 让我们现在开始

![image](https://typerbody.xyz/images/langbot_main1.png)

这里是模型配置的位置

### LangBot Models
LangBot Models 是 LangBot 官方提供的模型服务。当您使用 LangBot Space 账户初始化本地实例时，可用模型将被自动添加到您的实例中，无需进行任何配置。您将会获得一定的免费额度用于快速上手。
![image](https://typerbody.xyz/images/embedding_model.png)
具体可用模型，请查看LangBot Space。

### 自定义模型
您也可以添加其他来源的模型。
![image](https://typerbody.xyz/images/arch.png)
#### 对话模型
对话模型将被流水线用于处理消息，您配置的第一个模型将被设置为默认流水线的模型。
可以添加多个模型，然后再流水线中选择具体使用什么模型

填入这四个参数模型名称、模型供应商、请求 URL、API Key，然后提交即可
模型能力方面，请根据具体模型特性来选择：
- 视觉能力：需要启用才可以识图
- 函数调用：需要启用才可以在对话中使用 Agent 工具
![image](https://typerbody.xyz/images/model_config.png)

#### 嵌入模型
嵌入模型将被用于计算消息的向量，若您需要使用知识库，请配置此模型。

填入这四个参数模型名称、模型供应商、请求 URL、API Key，然后提交即可，之后请在知识库中配置使用此模型。
![image](https://typerbody.xyz/images/embedding_model.png)
使用 seekdb 内置嵌入模型（零配置）
系统已集成 seekdb 提供的官方嵌入模型，无需填写任何参数。
- 在“嵌入模型”页面选择「seekdb-内置」；
- 点击「保存」即可立即使用；
- 后续在知识库中选择该模型即可生效。

### 实际测试

![image](https://typerbody.xyz/images/langbot_main7.png)

位置和配置参考上期文章