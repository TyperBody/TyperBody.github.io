---
title: GitHub Actions 入门指南
date: 2024-01-17 12:30:00
categories:
  - 教程
tags:
  - GitHub Actions
  - CI/CD
  - 入门
description: 学习如何使用 GitHub Actions 创建你的第一个自动化工作流
---

# GitHub Actions 入门指南

GitHub Actions 是 GitHub 提供的强大 CI/CD 平台，让你能够自动化你的软件开发工作流程。

## 什么是 GitHub Actions？

GitHub Actions 是一个事件驱动的工作流自动化工具，可以帮助你：

- 🚀 **自动化部署**: 自动将代码部署到生产环境
- 🧪 **运行测试**: 每次提交时自动运行测试
- 🔄 **持续集成**: 自动化构建和集成过程
- 📦 **发布包**: 自动发布到各种平台

## 核心概念

在开始之前，让我们了解几个核心概念：

### 1. Workflow（工作流）

工作流是自动化过程的定义，存放在 `.github/workflows` 目录中。

```yaml
name: My First Workflow
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a script
        run: echo "Hello, World!"
```

### 2. Job（作业）

一个工作流由一个或多个作业组成，每个作业在独立的虚拟机中运行。

### 3. Step（步骤）

每个作业包含一系列步骤，可以是 shell 命令或 Action。

### 4. Action（动作）

Action 是工作流的基本构建块，可以是自定义脚本或复用他人创建的 Action。

## 创建你的第一个工作流

让我们创建一个简单的工作流，在每次推送时运行：

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build project
        run: npm run build
```

## 常用 Actions

这里有一些最常用的 Actions：

| Action | 用途 |
|--------|------|
| [actions/checkout](https://github.com/actions/checkout) | 检出代码仓库 |
| [actions/setup-node](https://github.com/actions/setup-node) | 设置 Node.js 环境 |
| [actions/setup-python](https://github.com/actions/setup-python) | 设置 Python 环境 |
| [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | 部署到 GitHub Pages |
| [actions/cache](https://github.com/actions/cache) | 缓存依赖文件 |

## 环境变量

你可以在工作流中使用环境变量：

```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Use environment variable
        run: echo "Running in ${{ env.NODE_ENV }}"
```

## 加密密钥

使用加密密钥来保护敏感信息：

1. 在仓库设置中添加 Secrets
2. 在工作流中通过 `${{ secrets.SECRET_NAME }}` 引用

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy with token
        run: |
          echo "${{ secrets.DEPLOY_TOKEN }}" | docker login ghcr.io -u ${{ secrets.USERNAME }} --password-stdin
```

## 最佳实践

### ✅ 建议

- 使用具体的版本号，而不是 `@main`
- 缓存依赖以加速构建
- 为不同类型的更改使用不同的工作流
- 使用条件语句控制步骤执行

```yaml
steps:
  - name: Deploy to production
    if: github.ref == 'refs/heads/main'
    run: npm run deploy:prod
```

### ❌ 避免

- 不要在日志中输出敏感信息
- 避免使用过时的 Action 版本
- 不要在同一个作业中混合不相关的任务

## 下一步

现在你已经掌握了基础，创建你的第一个工作流吧！

查看更多资源：

- [官方文档](https://docs.github.com/en/actions)
- [Actions 市场](https://github.com/marketplace/actions)
- [工作流语法](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

*自动化你的工作流，让代码部署变得简单！*
