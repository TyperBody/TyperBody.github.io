---
title: 高级 GitHub Actions 工作流技巧
date: 2024-01-17 13:00:00
categories:
  - 教程
tags:
  - GitHub Actions
  - 高级
  - 技巧
description: 掌握高级 GitHub Actions 技巧，优化你的 CI/CD 工作流
---

# 高级 GitHub Actions 工作流技巧

在掌握基础之后，让我们学习一些高级技巧，让你的工作流更加强大和高效。

## 矩阵构建

矩阵构建允许你同时在多个环境中运行作业：

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
        exclude:
          - node-version: 22
            os: windows-latest
    
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install and test
        run: |
          npm ci
          npm test
```

## 依赖缓存

加速构建过程，通过缓存依赖文件：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Cache npm dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-npm-
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
```

## 条件执行

根据不同条件控制作业和步骤的执行：

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        if: success()
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/lcov.info
      
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.25.0
        with:
          payload: |
            {
              "text": "Build failed: ${{ github.repository }}",
              "fields": [
                { "title": "Status", "value": "Failed", "short": true },
                { "title": "Branch", "value": "${{ github.ref }}", "short": true }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## 并行作业

并行运行多个作业以提高效率：

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run linter
        run: npm run lint
  
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
  
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
```

## 自定义 Action

创建可复用的 Action：

```yaml
# action.yml
name: 'Deploy to Vercel'
description: 'Deploy your project to Vercel'
inputs:
  vercel-token:
    description: 'Vercel access token'
    required: true
  vercel-org-id:
    description: 'Vercel organization ID'
    required: true
  vercel-project-id:
    description: 'Vercel project ID'
    required: true
runs:
  using: 'node20'
  main: 'dist/index.js'
```

```javascript
// index.js
const core = require('@actions/core');
const http = require('axios');

async function run() {
  try {
    const token = core.getInput('vercel-token');
    const orgId = core.getInput('vercel-org-id');
    const projectId = core.getInput('vercel-project-id');
    
    // Deploy logic here
    console.log('Deploying to Vercel...');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
```

## 工作流模板

创建可复用的工作流模板：

```yaml
# .github/workflows/ci-template.yml
name: CI

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '20'
      test-command:
        required: false
        type: string
        default: 'npm test'
      build-command:
        required: false
        type: string
        default: 'npm run build'

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js ${{ inputs.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: ${{ inputs.test-command }}
      - name: Build
        run: ${{ inputs.build-command }}
```

在主工作流中引用：

```yaml
jobs:
  frontend:
    uses: ./.github/workflows/ci-template.yml
    with:
      node-version: '20'
      build-command: 'npm run build:frontend'
  
  backend:
    uses: ./.github/workflows/ci-template.yml
    with:
      node-version: '22'
      build-command: 'npm run build:backend'
```

## 性能优化

### 1. 使用更快的运行器

```yaml
jobs:
  build:
    runs-on: macos-14  # Apple Silicon Mac
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
```

### 2. 并行上传构件

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        component: [frontend, backend, api]
    
    steps:
      - uses: actions/checkout@v4
      - name: Build ${{ matrix.component }}
        run: npm run build:${{ matrix.component }}
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.component }}
          path: dist/${{ matrix.component }}
```

## 监控和调试

### 启用详细日志

```yaml
jobs:
  debug:
    runs-on: ubuntu-latest
    steps:
      - name: Debug info
        run: |
          echo "GitHub ref: ${{ github.ref }}"
          echo "GitHub event: ${{ github.event_name }}"
          echo "Runner OS: ${{ runner.os }}"
          env | sort
```

### 使用跟踪 ID

```yaml
- name: Start deployment
  id: deployment
  run: echo "deployment_id=$(uuidgen)" >> $GITHUB_OUTPUT

- name: Update deployment status
  run: |
    echo "Deployment ${{ steps.deployment.outputs.deployment_id }} started"
```

## 总结

掌握这些高级技巧后，你将能够：

- ✅ 创建复杂的自动化工作流
- ✅ 大幅提高构建速度
- ✅ 实现条件逻辑和错误处理
- ✅ 创建可复用的组件和模板

记住，好的 CI/CD 流程应该是快速、可靠、易于维护的。

---

*持续优化你的工作流，让自动化更加强大！*
