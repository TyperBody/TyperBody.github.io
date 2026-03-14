# Canonical标签实现方案

## 问题
当前网站存在URL参数导致的重复内容问题，如：
- `typerbody.xyz/?enable_bottom_share_style=1`
- `typerbody.xyz/?enable_bottom_share_style=0&other_param=value`
- `typerbody.xyz/?id=article-name&enable_bottom_share_style=1`

## 解决方案
使用canonical标签告诉搜索引擎哪个URL是规范版本。

## 实施步骤

### 1. 首页(index.html)的canonical标签
在`index.html`的`<head>`部分添加：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TYPERBODY // 超频空间</title>
    
    <!-- SEO Meta Tags -->
    <link rel="canonical" href="https://typerbody.xyz/" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="description" content="TYPERBODY超频空间 - 探索数字边界、网络空间与前沿技术的前沿博客。专注技术教程、设计美学与人工智能应用。">
    <meta name="keywords" content="博客,技术,编程,设计,人工智能,LangBot,教程,前端开发,Y2K美学">
    
    <!-- Open Graph Tags -->
    <meta property="og:title" content="TYPERBODY // 超频空间">
    <meta property="og:description" content="探索数字边界、网络空间与前沿技术的前沿博客">
    <meta property="og:url" content="https://typerbody.xyz/">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://typerbody.xyz/images/social.png">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TYPERBODY // 超频空间">
    <meta name="twitter:description" content="探索数字边界、网络空间与前沿技术的前沿博客">
    <meta name="twitter:image" content="https://typerbody.xyz/images/social.png">
    
    <!-- 现有代码 -->
    <link rel="stylesheet" href="css/style.css">
    <!-- ... -->
</head>
```

### 2. 文章页(post.html)的canonical标签
在`post.html`的`<head>`部分添加基础结构和动态占位符：

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="page-title">文章 | TYPERBODY BLOG</title>
    
    <!-- SEO Meta Tags (动态填充) -->
    <link rel="canonical" id="canonical-url" href="https://typerbody.xyz/post.html" />
    <meta name="robots" content="index, follow" id="robots-meta">
    <meta name="description" id="meta-description" content="阅读TYPERBODY博客文章">
    <meta name="keywords" id="meta-keywords" content="博客,文章,阅读">
    
    <!-- Open Graph Tags (动态填充) -->
    <meta property="og:title" id="og-title" content="文章 | TYPERBODY BLOG">
    <meta property="og:description" id="og-description" content="阅读TYPERBODY博客文章">
    <meta property="og:url" id="og-url" content="https://typerbody.xyz/post.html">
    <meta property="og:type" content="article">
    <meta property="og:image" id="og-image" content="https://typerbody.xyz/images/social.png">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" id="twitter-title" content="文章 | TYPERBODY BLOG">
    <meta name="twitter:description" id="twitter-description" content="阅读TYPERBODY博客文章">
    <meta name="twitter:image" id="twitter-image" content="https://typerbody.xyz/images/social.png">
    
    <!-- 文章结构化数据 (动态生成) -->
    <script type="application/ld+json" id="article-json-ld">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "文章标题",
        "description": "文章描述",
        "datePublished": "2024-01-01",
        "dateModified": "2024-01-01"
    }
    </script>
    
    <!-- 现有代码 -->
    <link rel="stylesheet" href="css/style.css">
    <!-- ... -->
</head>
```

### 3. JavaScript实现动态canonical标签
在`js/main.js`的`loadArticleContent`函数中添加：

```javascript
// 在loadArticleContent函数中添加以下代码
function updateSEOMetaTags(articleMeta, articleId) {
    // 更新页面标题
    document.title = `${articleMeta.title} | TYPERBODY BLOG`;
    
    // 更新canonical URL
    const canonicalUrl = `https://typerbody.xyz/post.html?id=${articleId}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = canonicalUrl;
    }
    
    // 更新meta描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = articleMeta.excerpt || articleMeta.title;
    }
    
    // 更新meta关键词
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && articleMeta.seoKeywords) {
        metaKeywords.content = articleMeta.seoKeywords.join(', ');
    }
    
    // 更新Open Graph标签
    updateOpenGraphTags(articleMeta, articleId);
    
    // 更新结构化数据
    updateStructuredData(articleMeta, articleId);
    
    // 添加隐藏的SEO关键词（搜索引擎能看到，用户看不到）
    addHiddenSEOKeywords(articleMeta);
}

function updateOpenGraphTags(articleMeta, articleId) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    
    if (ogTitle) ogTitle.content = articleMeta.title;
    if (ogDescription) ogDescription.content = articleMeta.excerpt || articleMeta.title;
    if (ogUrl) ogUrl.content = `https://typerbody.xyz/post.html?id=${articleId}`;
    if (ogImage && articleMeta.coverImage) {
        ogImage.content = `https://typerbody.xyz/${articleMeta.coverImage}`;
    }
    
    // Twitter卡片
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    
    if (twitterTitle) twitterTitle.content = articleMeta.title;
    if (twitterDescription) twitterDescription.content = articleMeta.excerpt || articleMeta.title;
    if (twitterImage && articleMeta.coverImage) {
        twitterImage.content = `https://typerbody.xyz/${articleMeta.coverImage}`;
    }
}

function updateStructuredData(articleMeta, articleId) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": articleMeta.title,
        "description": articleMeta.excerpt || articleMeta.title,
        "datePublished": articleMeta.date,
        "dateModified": articleMeta.date,
        "author": {
            "@type": "Person",
            "name": "TYPERBODY"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TYPERBODY",
            "logo": {
                "@type": "ImageObject",
                "url": "https://typerbody.xyz/images/social.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://typerbody.xyz/post.html?id=${articleId}`
        },
        "image": articleMeta.coverImage ? `https://typerbody.xyz/${articleMeta.coverImage}` : "https://typerbody.xyz/images/social.png"
    };
    
    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
        jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
    }
}

function addHiddenSEOKeywords(articleMeta) {
    // 创建隐藏的SEO关键词容器
    let seoContainer = document.getElementById('seo-keywords-container');
    if (!seoContainer) {
        seoContainer = document.createElement('div');
        seoContainer.id = 'seo-keywords-container';
        seoContainer.className = 'seo-keywords';
        seoContainer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(seoContainer);
    }
    
    // 添加SEO关键词
    if (articleMeta.seoKeywords && Array.isArray(articleMeta.seoKeywords)) {
        seoContainer.innerHTML = articleMeta.seoKeywords
            .map(keyword => `<span>${keyword}</span>`)
            .join(' ');
    }
}

// 在loadArticleContent函数中调用
// 找到 loadArticleContent 函数，在 articleMeta 加载后添加：
updateSEOMetaTags(articleMeta, articleId);
```

### 4. CSS样式（隐藏SEO关键词）
在`css/style.css`中添加：

```css
/* SEO优化样式 */
.seo-keywords {
    position: absolute;
    left: -9999px;
    top: -9999px;
    opacity: 0;
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
}

/* Canonical和相关标签的样式优化 */
.link-rel-canonical {
    display: none; /* 对用户不可见 */
}
```

### 5. 处理URL参数规范化
在JavaScript中添加URL参数处理：

```javascript
// 规范化URL参数，移除不必要的参数
function normalizeURL() {
    const url = new URL(window.location.href);
    const allowedParams = ['id', 'tag', 'category']; // 允许的参数
    
    // 移除不必要的参数
    for (const param of url.searchParams.keys()) {
        if (!allowedParams.includes(param)) {
            url.searchParams.delete(param);
        }
    }
    
    // 如果当前URL有参数且不是规范版本，重定向到规范版本
    if (window.location.search !== url.search && url.search !== '') {
        // 使用replaceState更新浏览器历史记录而不刷新页面
        window.history.replaceState({}, '', url.toString());
    }
}

// 在页面加载时调用
document.addEventListener('DOMContentLoaded', () => {
    normalizeURL();
    // ... 其他初始化代码
});
```

## 测试验证
1. 使用浏览器开发者工具检查`<head>`中的canonical标签
2. 使用Google的Rich Results Test工具测试结构化数据
3. 使用SEO检查工具验证meta标签
4. 检查robots.txt是否正确配置

## 注意事项
1. canonical标签必须使用绝对URL
2. 确保每个页面只有一个canonical标签
3. 动态生成的meta标签需要确保在页面加载后立即更新
4. 隐藏的SEO关键词容器需要确保对屏幕阅读器不可访问