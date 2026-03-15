# LangBot：企业级即时通讯 AI 机器人平台 部署篇

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

**LangBot** 是一款专为企业设计的开源 AI 机器人平台，专注于帮助企业将 AI 能力无缝集成到现有的工作流程中。特别针对使用飞书（Lark）和 Dify 的企业用户，LangBot 提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## 使用Docker容器

这种方式很难出现问题 有问题科学上网就好 所以不过多赘述 引用文档就好

<Warning>
  您需要提前了解：

  - `Docker` 和 `Docker Compose` 的使用
  - Docker 容器间网络通信配置方式
</Warning>

Git 克隆本项目：

```bash
git clone https://github.com/langbot-app/LangBot
cd LangBot/docker
```

启动容器：

```bash
docker compose up
```

<Info>
  - 如果你的主机位于中国大陆，可以考虑把 `docker-compose.yaml` 文件中的镜像名称改为`docker.langbot.app/langbot-public/rockchin/langbot:latest`以使用我们提供的镜像源。
  - 推荐[设置 Docker 容器代理](https://docker.github.net.cn/network/proxy/)，以便保证 LangBot 在运行期间的网络访问通畅。
</Info>

首次启动会输出创建配置文件的提示，请继续按照文件配置。

容器会映射`5300`端口供 WebUI 使用，您可以访问`http://127.0.0.1:5300`查看 WebUI。\
还会映射`2280-2290`端口供使用 OneBot 协议的消息平台适配器反向连接，其实 Satori 也可以用 但是目前不用。

这里要注意一下 `5401` 会用于runtime插件系统通信 在docker的配置文件内如果不调试 请不要映射此端口