# LangBot：企业级即时通讯 AI 机器人平台 部署篇

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

**LangBot** 是一款专为企业设计的开源 AI 机器人平台，专注于帮助企业将 AI 能力无缝集成到现有的工作流程中。特别针对使用飞书（Lark）和 Dify 的企业用户，LangBot 提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

## 使用包管理器部署(包含手机部署方式)

> *"支持 Windows、Linux、Mac OS 等系统，推荐在测试环境、个人用途场景使用；生产级环境请使用Docker部署。"*

LangBot 已打包发布至 PyPI。请安装uv，然后在空目录下运行以下命令：

```shell
uvx langbot@latest
```

这将把该目录作为工作目录，访问 http://localhost:5300 即可开始使用。

## 手机端部署方式uvx包的问题

部分~~离谱~~研究环境下的uvx包非常不友好 比如说termux

> *"Termux 是一款高级的 Android 终端模拟器，它开源且不需要 root 权限，支持 apt 管理软件包。通过 Termux，我们可以在安卓设备上轻松安装和管理各种 Linux 工具和应用"*

官方下载地址：

- F-Droid：https://f-droid.org/packages/com.termux/
- GitHub Releases：https://github.com/termux/termux-app/releases[citation:8]


```shell
# 更新包管理器
pkg update && pkg upgrade -y

# 开启文件访问权限（可选）
termux-setup-storage

# 安装常用工具包
pkg install vim curl wget git unzip unrar openssh -y
首先是在termux安装proot容器，升级安装Ubuntu系统包
```
### 基础配置
安装完成后，打开 Termux 应用，首先进行基础配置：

```shell
# 更新包管理器
pkg update && pkg upgrade -y

# 开启文件访问权限（可选）
termux-setup-storage

# 安装常用工具包
pkg install vim curl wget git unzip unrar openssh -y
```

然后是通过预编译UV
```shell
curl -LO https://github.com/astral-sh/uv/releases/latest/download/uv-aarch64-unknown-linux-musl.tar.gz
```

解压

```shell
tar -xzf uv-aarch64-unknown-linux-musl.tar.gz
```

然后跳转到目录

```shell
cd uv-aarch64-unknown-linux-musl
```


### 移动 uv 和 uvx 到系统目录

将 uv 工具移动到系统 PATH 目录下：

```bash
sudo mv uv uvx /usr/local/bin/
```

> **注意**：如果提示权限不足，可以尝试不使用 sudo（如果当前用户有写入权限），或者先确认文件是否存在：`ls -la uv uvx`

### 验证安装版本

检查 uv 是否成功安装并可正常使用：

```bash
uv --version
```

如果显示版本号信息（如 `uv 0.4.10`），则表示移动成功。

### 安装 langbot

在 Ubuntu 主目录中执行 langbot 安装命令：

```bash
uvx langbot@latest
```

该命令会使用 uv 工具从 Python 包索引下载并运行最新版本的 langbot。

## 常见问题排查

### 如果提示 "No such file or directory"

检查当前目录下是否存在 uv 和 uvx 文件：

```bash
ls -la | grep uv
```

如果文件不存在，可能需要先安装 uv：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 如果提示权限拒绝

确保目标目录 `/usr/local/bin/` 存在且有写入权限：

```bash
ls -ld /usr/local/bin/
sudo mkdir -p /usr/local/bin  # 如果目录不存在
```

### 如果 uv 命令找不到

检查 PATH 环境变量是否包含 `/usr/local/bin`：

```bash
echo $PATH | grep /usr/local/bin
```

如果不包含，可以临时添加：

```bash
export PATH=$PATH:/usr/local/bin
```

或者永久添加至 `~/.bashrc`。

## 完成验证

成功执行以上步骤后，uv 工具链已正确安装在系统中，可以通过 `uv --version` 随时验证，并且 `uvx langbot@latest` 应当能够正常启动 langbot 应用。

---

整个配置过程的核心是设置 `UV_LINK_MODE=copy` 环境变量，这解决了 Proot 容器环境下文件系统操作的兼容性问题，确保 uv 工具能够正常安装和运行 Python 应用。