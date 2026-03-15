# LangBot：企业级即时通讯 AI 机器人平台 git工具篇

> *"专为企业打造的即时通讯 AI 机器人平台，无缝集成飞书（Lark）、钉钉、企业微信等企业通讯工具，与 Dify 等 AI 应用平台深度整合，让企业 AI 应用快速落地。"*

**LangBot** 是一款专为企业设计的开源 AI 机器人平台，专注于帮助企业将 AI 能力无缝集成到现有的工作流程中。特别针对使用飞书（Lark）和 Dify 的企业用户，LangBot 提供了完整的解决方案，让企业能够快速部署智能客服、知识库助手、工作流自动化等 AI 应用。

##前情概要

写道第三章的时候 大概是有人在群里说没有git命令 还在床上刷手机的我马上趴到电脑前写一下怎么安装git工具 当作补票了

Linux发行版一般是自带git工具的 所以应该不需要单独安装~~应该吧~~

其实对于普通用户来说git只是拉取到最新版本 和在网上找程序源码解压效果大差不差

## Git 简介

Git 是一个分布式版本控制系统，用于追踪代码变更和协作开发。它由 Linux 创始人 Linus Torvalds 开发，是目前最流行的版本控制工具。

### 检查是否已安装
打开命令提示符（CMD）或 PowerShell，输入：

```bash
git --version
```

如果显示版本号，说明已经安装；如果提示"git 不是内部或外部命令"，则需要安装，如果安装过，大概率是环境变量没有设置好。

## 下载 Git

1. 访问 Git 官方网站：https://git-scm.com/download/win
2. 系统会自动检测 Windows 版本并提供对应的下载链接
3. 选择适合系统的版本：
   - 64-bit Git for Windows Setup（64位系统）
   - 32-bit Git for Windows Setup（32位系统）

使用阿里云镜像站加速下载：
- https://mirrors.aliyun.com/git-for-windows/

## 安装步骤详解

### 1. 运行安装程序
- 双击下载的 `.exe` 文件
- 如果有安全提示，点击"是"允许运行

- 点击 **Next** 继续

### 3. 选择安装路径
- 默认路径：`C:\Program Files\Git`
- 建议保持默认，或选择其他盘符（如 `D:\Git`）
- 路径避免使用中文和空格
- 点击 **Next**

### 4. 选择组件
推荐选择以下组件：
- ✅ **Git Bash Here**（右键菜单集成）
- ✅ **Git GUI Here**（右键菜单集成）
- ✅ **Git LFS**（大文件支持）
- ✅ **Associate .git* configuration files with default editor**
- ✅ **Check daily for Git for Windows updates**
- ✅ **Add a Git Bash Profile to Windows Terminal**

> 提示：Windows Explorer integration 选项建议全部勾选，方便右键操作

### 5. 选择默认编辑器
选择 Git 默认使用的文本编辑器：
- **Vim**（默认，适合熟悉 Vim 的用户）
- **Nano**（简单易用）
- **Notepad++**（推荐新手）
- **Visual Studio Code**（推荐，如果已安装）
- 其他已安装的编辑器

**推荐**：选择 Visual Studio Code 或 Notepad++

### 6. 调整 PATH 环境
选择 Git 在命令行中的使用方式：

- **Option 1**：仅从 Git Bash 使用 Git（最安全）
- **Option 2**：从命令行以及第三方软件使用 Git（推荐）
- **Option 3**：从命令提示符使用 Git 和可选的 Unix 工具

### 7. 选择 HTTPS 传输后端
- **Use the OpenSSL library**（推荐，更通用）
- **Use the native Windows Secure Channel library**（适合企业环境）

**推荐**：选择 **OpenSSL** 选项

### 8. 配置行结束符转换
处理不同操作系统间的换行符差异：

- **Checkout Windows-style, commit Unix-style line endings**（推荐 Windows 用户）
- **Checkout as-is, commit Unix-style line endings**（适合跨平台项目）
- **Checkout as-is, commit as-is**（不推荐）

**推荐**：选择第一个选项

### 9. 选择终端模拟器
- **Use MinTTY**（默认，功能更强大，推荐）
- **Use Windows' default console window**（Windows 原生控制台）

**推荐**：选择 **MinTTY**

### 10. 选择 git pull 行为
- **Default**（fast-forward or merge）
- **Rebase**（推荐熟悉 Git 的用户）
- **Only ever fast-forward**

**推荐**：选择 **Default** 选项

### 11. 选择凭证助手
- **Git Credential Manager**（推荐，可以保存密码）
- **None**（每次都需要输入密码）

**推荐**：选择 **Git Credential Manager**

### 12. 配置额外选项
- **Enable file system caching**（启用文件系统缓存，推荐）
- **Enable symbolic links**（启用符号链接，需要管理员权限）

**推荐**：勾选 **Enable file system caching**

### 13. 实验选项
- **Enable experimental support for pseudo consoles**
- **Enable experimental built-in file system monitor**

**建议**：保持默认（不勾选），除非你知道这些功能的作用

### 14. 完成安装
- 点击 **Install** 开始安装
- 等待安装完成（通常 1-5 分钟）
- 取消勾选 "View Release Notes"
- 点击 **Finish**

## 验证安装

1. 打开 CMD 或 PowerShell
2. 输入：
   ```bash
   git --version
   ```

## 基础配置

安装完成后，需要配置用户名和邮箱（这些信息会记录在每次提交中）：

### 打开 Git Bash 并输入：

```bash
# 设置用户名（替换为你的名字）
git config --global user.name "你的名字"

# 设置邮箱（替换为你的邮箱）
git config --global user.email "你的邮箱@example.com"

# 设置默认分支名（可选）
git config --global init.defaultBranch main

# 查看配置
git config --list
```

### 配置 Git 别名（可选）
```bash
# 配置常用命令的快捷方式
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --all"
```

## 常见问题解决

### Q1: 安装后 Git 命令无法识别
**原因**：环境变量未正确配置
**解决**：
1. 重新运行安装程序
2. 选择"Modify"选项
3. 确保在 PATH 环境变量步骤选择了正确的选项

### Q2: 中文显示乱码
**解决**：在 Git Bash 中执行
```bash
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8
```

### Q3: 每次都需要输入密码
**解决**：启用凭证助手
```bash
git config --global credential.helper manager
```

### 2. 相关文档
- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [Git 教程 - 廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)

祝你在 Git 的使用之路上一切顺利！