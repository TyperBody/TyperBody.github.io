# HYPERTRANCE BLOG // 超频空间

一个 Y2K Hypertrance 风格的个人博客，支持 Markdown 文章，可部署到 GitHub Pages。

![Y2K Style](https://img.shields.io/badge/Style-Y2K%20Hypertrance-ff00ff)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-00ffff)

## ✨ 特性

- 🎨 **Y2K Hypertrance 视觉风格** - 霓虹色彩、故障艺术、动态效果
- 📝 **Markdown 支持** - 使用 Markdown 撰写文章
- 🚀 **GitHub Pages 友好** - 无需后端，静态部署
- 📱 **响应式设计** - 支持桌面和移动设备
- ✨ **丰富动效** - 星空背景、鼠标跟随、漂浮形状

## 📁 项目结构

```
├── index.html          # 首页
├── post.html           # 文章页面模板
├── css/
│   └── style.css       # Y2K 风格样式
├── js/
│   └── main.js         # 动态效果和文章加载
├── posts/
│   ├── index.json      # 文章索引
│   └── *.md            # Markdown 文章
├── .nojekyll           # 禁用 Jekyll
└── README.md           # 项目说明
```

## 🚀 快速开始

### 1. Fork 或克隆仓库

```bash
git clone https://github.com/你的用户名/你的仓库名.git
```

### 2. 启用 GitHub Pages

1. 进入仓库的 Settings
2. 找到 Pages 设置
3. Source 选择 `main` 分支
4. 保存后等待部署

### 3. 访问你的博客

部署完成后，访问 `https://你的用户名.github.io/你的仓库名/`

## 📝 添加新文章

### 步骤 1: 创建 Markdown 文件

在 `posts/` 目录下创建新的 `.md` 文件，例如 `my-new-post.md`：

```markdown
# 文章标题

文章内容...

## 二级标题

更多内容...
```

### 步骤 2: 更新文章索引

编辑 `posts/index.json`，添加新文章信息：

```json
{
    "id": "my-new-post",
    "title": "我的新文章",
    "date": "2024-02-01",
    "excerpt": "这是文章摘要...",
    "tags": ["标签1", "标签2"]
}
```

### 步骤 3: 推送到 GitHub

```bash
git add .
git commit -m "Add new post: 我的新文章"
git push
```

## 🎨 自定义样式

### 修改颜色主题

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --neon-pink: #ff00ff;     /* 主色调 */
    --neon-cyan: #00ffff;     /* 辅助色 */
    --neon-purple: #8000ff;   /* 强调色 */
    --bg-dark: #0a0a1a;       /* 背景色 */
}
```

### 修改博客信息

编辑 `index.html` 中的以下内容：

- 网站标题和副标题
- 关于我的介绍
- 社交链接

## 📄 Markdown 支持

支持标准 Markdown 语法：

- 标题 (H1-H6)
- 粗体、斜体、删除线
- 有序/无序列表
- 代码块（支持语法高亮）
- 引用
- 链接和图片
- 表格
- 分隔线

## 🛠 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript** - 交互逻辑
- **Marked.js** - Markdown 解析

## 📜 许可证

MIT License

---

**// HYPERTRANCE BLOG //**

*穿越数字边界，探索超频空间*
