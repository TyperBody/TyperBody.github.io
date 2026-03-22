# LangBot：企业级即时通讯 AI 机器人平台 LLMops(dify,n8n,langflow,TBox,coze)平台接入指南

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

[LangBot 项目地址](https://github.com/langbot-app/LangBot) · [LangBot 项目官网](https://langbot.app) · [LangBot 社区](https://docs.langbot.app/zh/insight/community) · [项目文档](https://docs.langbot.app/zh/insight/guide) · [我的博客](https://typerbody.xyz)

**LangBot**（原 QChatGPT）是一款专为企业设计的开源 AI 机器人平台，立项于 2021 年中。它专注于帮助企业将 AI 能力无缝集成到现有的工作流程中，特别针对使用飞书（Lark）和 Dify 的企业用户，提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作自动化等 AI 应用。

## LLMops平台接入指南

### 什么是流水线（Pipelines）？

流水线控制了收到消息之后的处理流程，以及与大模型之间的信息交互。每个机器人可以绑定到一条流水线上，同一条流水线能被多个机器人绑定。

LangBot 首次启动时会自动创建一个默认的流水线。创建机器人时，会自动绑定到默认流水线。创建第一个模型时，会自动将其设置为默认流水线的模型。

![arch](https://typerbody.xyz/images/arch.png)

您可以创建多条流水线，用于不同的机器人，适应不同的场景。

### AI 能力配置

在流水线配置中，可以选择使用以下运行器：

- `内置 Agent`（默认）
- [`Dify`](https://dify.ai/)
- [`n8n`](https://n8n.io/)
- [`Langflow`](https://langflow.com/)
- [`TBox（蚂蚁百宝箱）`](https://tbox.cn/)
- [`Coze API`](https://www.coze.com/)

运行器定义了如何调度大模型处理消息。默认为`内置 Agent`，这是 LangBot 实现的一个多回合 Agent 策略，当且仅当选择此运行器时，才会使用 LangBot 内部配置的模型和工具。

![edit_pipeline](https://typerbody.xyz/images/edit_pipeline_ai.png)

您也可以选择使用 `Dify`、 `n8n` 等外部 LLMOps 平台，这种情况下所使用的模型、提示词、工具等资源将由外部平台提供。

![more_runner](https://typerbody.xyz/images/more_runner.png)

#### 请求变量

当使用外部 LLMOps 平台时，LangBot 会显式传入以下参数，您可以在外部平台的开始节点中添加（以 Dify 为例）：

- `launcher_type`：发起对象类型，私聊为 `person`，群聊为 `group`
- `launcher_id`：发起对象ID，私聊为用户ID，群聊为群ID
- `sender_id`：发送者ID
- `user_message_text`：用户消息的纯文本内容
- `session_id`：用户会话id，私聊为 `person_<id>`，群聊为 `group_<id>`
- `conversation_id`：字符串，用户会话id，由 LangBot 生成。用户重置会话后，会重新生成
- `msg_create_time`：数字类型，收到此消息的时间戳（秒）
- `group_name`：群聊名称，仅在群消息事件时设置
- `sender_name`：发送者名称

您可以通过插件自定义任何变量(/zh/plugin/dev/apis/common.html#%E8%AE%BE%E7%BD%AE%E8%AF%B7%E6%B1%82%E5%8F%98%E9%87%8F)。

![Dify 工作流开始节点配置](https://typerbody.xyz/images/dify_workflow_var.png)

---

## 接入 Dify

[Dify](https://dify.ai) 是一款开源的大语言模型(LLM) 应用开发平台。它融合了后端即服务（Backend as Service）和 LLMOps 的理念，使开发者可以快速搭建生产级的生成式 AI 应用。  
Dify 可以创建聊天助手（含Chatflow）、Agent、文本生成应用、工作流等应用。

LangBot 目前支持`聊天助手`（含Chatflow）、`Agent`、`工作流`三种 Dify 应用类型。

### 在 Dify 上创建应用

请根据 [Dify文档](https://docs.dify.ai) 部署dify并创建你的应用。  

发布应用后，在应用的 `访问API` 页面，生成 API 密钥。

![Dify 应用 API 密钥](https://typerbody.xyz/images/dify_sv_api_01.png)

保存 API 服务器和 API 密钥，在 LangBot 的流水线的`AI 能力`配置。

> **提示：** 以上为 Dify 云服务版本的示例，若您使用本地自部署的社区版本，请使用 LangBot 访问你自己 Dify 服务的地址作为 `base-url`，后方需要添加 `/v1` 作为路径。

- 若 LangBot 与 Dify 部署在同一台主机，并且都是使用 Docker 部署的，可以参考文章：[网络配置详解](/zh/workshop/network-details.html#langbot-%E5%92%8C%E6%B6%88%E6%81%AF%E5%B9%B3%E5%8F%B0%E5%9D%87%E8%BF%90%E8%A1%8C%E5%9C%A8-docker-%E5%AE%B9%E5%99%A8%E4%B8%AD)。其中，请将启动 Dify 的 docker-compose.yaml 中所有容器的`networks`均添加`langbot-network`，并为`nginx`容器添加容器名`dify-nginx`，最后在 LangBot 配置中将`base-url`设置为`http://dify-nginx/v1`。
- 其他情况请咨询贵司运维人员。


### 配置 LangBot

打开 LangBot WebUI 页面，添加一个新的流水线或在已有流水线中切换到 AI 能力配置页面。

![设置开发项](https://typerbody.xyz/images/dify_sv_api_02.png)

### 工作流输出键

如果使用的是 Dify 的工作流应用，那么请使用 `summary` 作为键传递输出内容。

![Dify 工作流应用的输出键](https://typerbody.xyz/images/dify_workflow_output_key.png)

### 输出处理

使用 工作流 应用或 Agent 应用时，如果开启了 LangBot 流水线`输出处理`中的`track-function-calls`，将会在 Dify 执行每个工具调用时，输出一个`调用函数xxx`的消息给用户。  
但如果是使用`chat`应用下的`ChatFlow`（聊天助手->工作流编排），无论如何只会输出 Answer（直接回复）节点返回的文本。


---

## 接入 n8n

[n8n](https://n8n.io/) 是一款开源的自动化工作流平台，可以创建、调度、执行各种自动化任务。

LangBot 目前支持通过 n8n 工作流的 `Webhook` 节点，来触发工作流并获取回复。

### 选用 n8n 作为运行器

请打开已有的流水线配置页面，或新建流水线（推荐）并打开配置页面，到 `AI 能力`中选择 `n8n 工作流 API` 作为运行器。

![n8n 作为运行器](https://typerbody.xyz/images/config_runner.png)


并根据下方内容设置并填写其他配置。

### 配置 n8n 工作流连接

![n8n 工作流](https://typerbody.xyz/images/create_wf.png)
or 
![n8n 工作流](https://typerbody.xyz/images/create_wf01.png)

需要选择`Webhook`或者`On chat message`触发，并参考下图配置：
* webhook
    ![n8n webhook 配置](https://typerbody.xyz/images/config_webhook.png)
* on chat message
    ![n8n on chat message 配置](https://typerbody.xyz/images/config_n8n_onchatmessage.png)

> **提示：** 如果要需要流式，其中的`Response Mode`都需要选择为`Streaming`。
![n8n 流式配置](https://typerbody.xyz/images/config_response_model.png)



> **提示：** Authentication 对应 LangBot 流水线配置中的几种鉴权方式，可自行更改。

![n8n 工作流配置](https://typerbody.xyz/images/config_auth.png)



调用ai模型的节点可配置为`AI Agent`，并参考下图配置：
> 需要流式则将图片中红框内容添加，不需要则不管

![n8n 调用ai模型配置](https://typerbody.xyz/images/config_call_ai.png)


n8n 的工作流响应内容请使用`Respond to Webhook`节点，并参考下图配置（如果你选择的是流式响应和`AI Agent`节点，则不需要操作此步骤）：

![n8n 工作流响应配置](https://typerbody.xyz/images/config_respond.png)

`Response Body`中的响应内容键名需要与 LangBot 流水线配置中的`输出键名`一致。

在完成 n8n 工作流的配置之后，请在其顶部点击`Active`以启用工作流。

---

## 接入 Langflow

Langflow 是一个开源的用于构建和部署基于 AI 的 Agent 和工作流的项目。其支持本地和云端部署，并提供 API 供其他应用接入。

LangBot 目前支持使用 Langflow 作为运行器。

### 在 Langflow 上创建工作流

请根据 [Langflow 文档](https://langflow.com/docs/introduction) 部署 Langflow 实例。

以默认模板中的 Simple Agent 为例：

![create_flow](https://typerbody.xyz/images/create_flow.png)

您可根据需求修改工作流：

![edit_flow](https://typerbody.xyz/images/edit_flow.png)

### 配置 LangBot

打开 LangBot WebUI 页面，添加一个新的流水线或在已有流水线中切换到 AI 能力配置页面，选择`Langflow API` 作为运行器。

![set_langflow_runner](https://typerbody.xyz/images/set_langflow_runner.png)

根据提示填入`Base URL`(根据实际网络情况填写) `API Key` `Flow ID` 等信息，API Key 可在 Langflow 的 Settings 中获取：   

![get_api_key](https://typerbody.xyz/images/get_api_key.png)

Flow ID 可点击编辑页右上角的`Share` -> `API access` 并示例代码中获取：

![get_flow_id](https://typerbody.xyz/images/get_flow_id.png)

---

## 接入 TBox（蚂蚁百宝箱）

[TBox（百宝箱）](https://tbox.cn/)是蚂蚁集团推出的面向 AI 开发者的一站式智能体应用开发平台。在平台上，无论您是否拥有编程基础，都可以通过自然语言，基于各种大模型搭建属于您自己的智能体应用，并将其发布到支付宝小程序、web 服务、浏览器插件等生态渠道。

LangBot 支持接入 TBox 上编排好的智能体，用作流水线 Runner。

在 TBox 上搭建好智能体后，请到[`开放平台`](https://www.tbox.cn/open/authorized-management)创建 API Key：

![TBox API Key](https://typerbody.xyz/images/create_api_key.png)

并在 TBox 的智能体编排页面找到该应用的 AppID：

![TBox AppID](https://typerbody.xyz/images/find_appid.png)

接着回到 LangBot 流水线设置中，切到`AI 能力`配置页面，选择`蚂蚁百宝箱平台 API` 作为运行器：

![TBox API Key](https://typerbody.xyz/images/tbox_runner.png)

现在即可使用 TBox 上的智能体了。

---

## 接入 Coze API

本文仅说明如何在 Coze 平台获取 Token 与 Bot ID，并将其填写到 LangBot 流水线配置中。

### 1. 获取 Token 与 Bot ID

1. 登录 Coze 平台，进入你的开发控制台。
![Coze 应用 API 密钥](https://typerbody.xyz/images/coze07.png)
2. 在"API 管理"中创建并复制令牌。
![Coze 应用 API 密钥](https://typerbody.xyz/images/coze06.png)

> **提示：**
coze.cn 的授权中有可以长期授权的`服务身份及凭证`，但是 coze.com 只有个人访问令牌。


3. 从项目开发中选择你自己的智能体，或者新建智能体，拿到一下id就是bot_id。
![Coze bot_id](https://typerbody.xyz/images/coze05.png)
* 智能体发布一定要选上api的选项
![Coze 应用 API 密钥](https://typerbody.xyz/images/coze04.png)



请妥善保存以上两项信息：
- token：Coze 平台生成的令牌
- bot_id：机器人 ID

### 2. 在 LangBot 中填写配置

1. 打开 LangBot WebUI，进入一个流水线的配置页面（或新建流水线后进入配置页面）。
2. 在"AI 能力"中选择运行器为 `Coze API`。
3. 在运行器的配置项中，填写：
   - token：粘贴你在 Coze 平台复制的 API Token
   - bot_id：粘贴对应机器人的 Bot ID
   - 请根据您使用的 Coze 站点选择 `API 基础 URL`：coze.cn 请填写 `https://api.coze.cn`；coze.com 请填写 `https://api.coze.com`

    ![流水线配置](https://typerbody.xyz/images/coze08.png)
4. 点击"保存"完成配置。

完成后，你即可在该流水线中调用 Coze 机器人完成对话处理。

### 常见问题
- 保存失败或调用报错：请确认 token 与 bot_id 是否正确且未包含多余空格。
- 无法选择 `Coze API`：请确认当前版本是否已支持该运行器；若尚未支持，请升级到包含 Coze 运行器的版本。

更多流水线通用配置说明，请参考[修改对话流水线配置](/zh/usage/pipelines/readme)。

---

## 总结

LangBot 通过流水线机制，为企业提供了灵活可配置的 AI 机器人接入方案。无论是使用内置 Agent，还是接入 Dify、n8n、Langflow、TBox、Coze 等外部 LLMOps 平台，LangBot 都能提供统一的配置界面和消息处理流程。

通过本文的指南，您可以根据实际需求选择合适的平台进行接入，快速构建适合企业场景的 AI 应用。
