/**
 * HYPERTRANCE BLOG - 超频空间
 * Y2K Style Personal Blog JavaScript
 */

// ==========================================
// 配置
// ==========================================
const CONFIG = {
    articlesPath: 'posts/',
    articlesIndex: 'posts/index.json',
};

// ==========================================
// 初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initFloatingShapes();
    initCursorGlow();
    initGlitchEffect();
    initSmoothScroll();
    
    // 根据页面类型加载内容
    if (document.getElementById('articles-grid')) {
        loadArticles();
    }
    
    if (document.getElementById('article-content')) {
        loadArticleContent();
    }
});

// ==========================================
// 星星背景
// ==========================================
function initStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

// ==========================================
// 漂浮形状
// ==========================================
function initFloatingShapes() {
    const shapesContainer = document.getElementById('shapes');
    if (!shapesContainer) return;
    
    const shapes = ['◇', '○', '△', '□', '◈', '✦'];
    const colors = ['#ff00ff', '#00ffff', '#8000ff', '#ff1493', '#00ff80'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.fontSize = `${20 + Math.random() * 40}px`;
        shape.style.color = colors[Math.floor(Math.random() * colors.length)];
        shape.style.setProperty('--duration', `${5 + Math.random() * 10}s`);
        shape.style.animationDelay = `${Math.random() * 5}s`;
        shapesContainer.appendChild(shape);
    }
}

// ==========================================
// 鼠标跟随发光效果
// ==========================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

// ==========================================
// 随机故障效果
// ==========================================
function initGlitchEffect() {
    const overlay = document.querySelector('.glitch-overlay');
    if (!overlay) return;
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            overlay.classList.add('glitch-active');
            setTimeout(() => {
                overlay.classList.remove('glitch-active');
            }, 100);
        }
    }, 500);
}

// ==========================================
// 平滑滚动
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// 加载文章列表
// ==========================================
async function loadArticles() {
    const grid = document.getElementById('articles-grid');
    
    try {
        const response = await fetch(CONFIG.articlesIndex);
        if (!response.ok) throw new Error('Failed to load articles index');
        
        const articles = await response.json();
        
        // 清除加载动画
        grid.innerHTML = '';
        
        // 按日期排序（最新在前）
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 生成文章卡片
        articles.forEach((article, index) => {
            const card = createArticleCard(article, index);
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error loading articles:', error);
        grid.innerHTML = `
            <div class="loading-indicator">
                <span>暂无文章 // NO ARTICLES YET</span>
            </div>
        `;
    }
}

// ==========================================
// 创建文章卡片
// ==========================================
function createArticleCard(article, index) {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const icons = ['◇', '◈', '✦', '○', '△'];
    const icon = icons[index % icons.length];
    
    const tagsHTML = article.tags 
        ? article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';
    
    card.innerHTML = `
        <div class="card-image">
            <span class="card-icon">${icon}</span>
        </div>
        <div class="card-content">
            <div class="card-date">${formatDate(article.date)}</div>
            <h3 class="card-title">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt || ''}</p>
            <div class="card-tags">${tagsHTML}</div>
            <a href="post.html?id=${article.id}" class="card-link">
                阅读更多 <span>→</span>
            </a>
        </div>
    `;
    
    return card;
}

// ==========================================
// 加载文章内容
// ==========================================
async function loadArticleContent() {
    const contentContainer = document.getElementById('article-content');
    const titleElement = document.getElementById('article-title');
    const dateElement = document.getElementById('article-date');
    const tagsContainer = document.getElementById('article-tags');
    
    // 从 URL 获取文章 ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        contentContainer.innerHTML = '<p>文章不存在</p>';
        return;
    }
    
    try {
        // 加载文章索引获取元数据
        const indexResponse = await fetch(CONFIG.articlesIndex);
        const articles = await indexResponse.json();
        const articleMeta = articles.find(a => a.id === articleId);
        
        if (!articleMeta) {
            throw new Error('Article not found');
        }
        
        // 更新页面元数据
        if (titleElement) titleElement.textContent = articleMeta.title;
        if (dateElement) dateElement.textContent = formatDate(articleMeta.date);
        if (tagsContainer && articleMeta.tags) {
            tagsContainer.innerHTML = articleMeta.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        // 更新页面标题
        document.title = `${articleMeta.title} | HYPERTRANCE BLOG`;
        
        // 加载 Markdown 文件
        const mdResponse = await fetch(`${CONFIG.articlesPath}${articleId}.md`);
        if (!mdResponse.ok) throw new Error('Failed to load article content');
        
        const markdown = await mdResponse.text();
        
        // 解析 Markdown
        const html = marked.parse(markdown);
        contentContainer.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading article:', error);
        contentContainer.innerHTML = `
            <p>加载文章失败 // FAILED TO LOAD ARTICLE</p>
            <a href="index.html" class="back-link">← 返回首页</a>
        `;
    }
}

// ==========================================
// 日期格式化
// ==========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

// ==========================================
// 导出给全局使用
// ==========================================
window.HypertranceBlog = {
    loadArticles,
    loadArticleContent,
    formatDate
};
