# LangBot：企业级即时通讯 AI 机器人平台 部署篇

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

**LangBot** 是一款专为企业设计的开源 AI 机器人平台，专注于帮助企业将 AI 能力无缝集成到现有的工作流程中。特别针对使用飞书（Lark）和 Dify 的企业用户，LangBot 提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## 手动部署&开发环境部署

在LangBot文档里提供了一种手动部署方式 但这种方式之前会编译前端 后来因为动态卡片 前端编译被砍掉了 所以在此统一使用开发部署方式

### 准备安装node.js 与 python (3.10-3.13)

#### 对于Linux 

##### 安装 Node.js 和 pnpm

LangBot 的前端管理后台需要 Node.js 环境来运行，虽然现在不需要编译前端，但动态卡片等功能仍依赖 Node.js 运行时。

```bash
# 安装 Node.js (建议使用 18.x 或 20.x LTS 版本)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 pnpm (Node.js 包管理器)
sudo npm install -g pnpm
```

验证安装：
```bash
node --version  # 建议 v18.0.0 或更高
pnpm --version  # 建议 v8.0.0 或更高
```

#### 准备 Python 虚拟环境

LangBot 后端基于 Python 开发，建议使用虚拟环境来隔离依赖。

```bash
# 安装 Python 3.10 (如果系统未安装)
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev -y

# 创建项目目录
mkdir -p /opt/langbot
cd /opt/langbot

# 创建并激活虚拟环境
python3.10 -m venv venv
source venv/bin/activate
```
#### 对于windows

##### 安装python

访问 Python 官网下载
```
https://www.python.org/downloads/windows/
# 下载 Python 3.10.x 或 3.11.x（建议 3.10）
```

 安装时务必勾选：
- ✅ Add Python to PATH
- ✅ Install pip
- ✅ Install for all users
- ✅ Create shortcuts for installed applications

不然会出现环境变量错误 如果没有勾选 请卸载重安装

验证安装
```shell
python --version
pip --version
```

##### Node.js 安装

访问 Node.js 官网下载 LTS 版本
```
https://nodejs.org/
# 下载并安装 Node.js 18.x 或 20.x
```

安装完成后，打开新的 PowerShell，安装 pnpm
```shell
npm install -g pnpm
```

验证安装
```shell
node --version
pnpm --version
```

### 启动LangBot

LangBot 分为前端和后端，前端使用 Next.js + shadcn 开发，后端通过 Quart（Flask 的异步版本）开发。

#### 后端

代码位于 `pkg` 目录下，由根目录的 `main.py` 文件引导启动。  

安装依赖，我们使用 uv 管理依赖。

```bash
pip install uv
uv sync --dev
```

启动后端

```bash
uv run main.py
```

此时配置文件会自动生成到 `data/config.yaml` 文件中。

此时python版本过高uv会出错 因为 `3.14` 版本才进入正式周期 大部分python包还没有编译高版本 这是不可抗力

![Python 版本选择](/images/python_vtion.png "Python 版本选择指南")

#### 前端

代码位于 `web` 目录下，需要安装 Node.js，[pnpm](https://pnpm.io/zh/installation)。

复制 `.env.example` 到 `.env`。

- linux环境使用

```bash
cp .env.example .env
```

- windows环境使用

```bash
copy .env.example .env
```

安装依赖并启动前端

```bash
pnpm install
pnpm dev

# 若未安装pnpm，也可以使用npm来解决依赖并启动
npm install
npm run dev
```

然后根据输出信息，访问`http://127.0.0.1:3000`查看独立启动的前端页面。

<Info title="本地使用`pnpm dev`启动时，会携带`.env`中的环境变量`NEXT_PUBLIC_API_BASE_URL`，该变量会自动被前端使用，以确保前端可以访问到本地启动的后端的`5300`端口。">

生产环境中，前端会被预编译成静态文件，由后端提供服务，前端会自动访问同域的后端地址。
</Info>

