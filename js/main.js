/**
 * HYPERTRANCE BLOG - 超频空间
 * Y2K Style Personal Blog JavaScript
 * 深蓝 + 银色金属风格
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
    initMeteors();
    initFloatingShapes();
    initLightRings();
    initCursorGlow();
    initGlitchEffect();
    initSmoothScroll();
    initParallax();
    
    // 根据页面类型加载内容
    if (document.getElementById('articles-grid')) {
        loadArticles();
    }
    
    if (document.getElementById('article-content')) {
        loadArticleContent();
    }
});

// ==========================================
// 星星背景 - 深空效果
// ==========================================
function initStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        // 随机颜色 - 银白色为主，偶尔有淡蓝色
        const colors = ['#e8edf5', '#c0c7d6', '#5e8fff', '#00d4ff'];
        const colorIndex = Math.random() > 0.8 ? Math.floor(Math.random() * 4) : 0;
        star.style.background = `radial-gradient(circle, ${colors[colorIndex]} 0%, transparent 70%)`;
        
        starsContainer.appendChild(star);
    }
}

// ==========================================
// 流星效果
// ==========================================
function initMeteors() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = `${20 + Math.random() * 60}%`;
        meteor.style.top = '-100px';
        meteor.style.setProperty('--duration', `${1.5 + Math.random() * 2}s`);
        
        starsContainer.appendChild(meteor);
        
        // 动画结束后移除
        setTimeout(() => {
            meteor.remove();
        }, 4000);
    }
    
    // 随机创建流星
    setInterval(() => {
        if (Math.random() > 0.7) {
            createMeteor();
        }
    }, 2000);
}

// ==========================================
// 漂浮形状 - 金属质感几何
// ==========================================
function initFloatingShapes() {
    const shapesContainer = document.getElementById('shapes');
    if (!shapesContainer) return;
    
    // 几何形状 - 更加Y2K风格
    const shapes = [
        '◇', '○', '△', '□', '◈', '✦', '⬡', '⬢', 
        '◯', '◭', '⟐', '⌬', '⏣', '⎔'
    ];
    
    // 银色/蓝色色调
    const colors = [
        '#c0c7d6', '#e8edf5', '#9aa5bb', 
        '#5e8fff', '#00d4ff', '#3a5fff'
    ];
    
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.fontSize = `${15 + Math.random() * 35}px`;
        shape.style.color = colors[Math.floor(Math.random() * colors.length)];
        shape.style.setProperty('--duration', `${8 + Math.random() * 15}s`);
        shape.style.animationDelay = `${Math.random() * 8}s`;
        shapesContainer.appendChild(shape);
    }
}

// ==========================================
// 光环脉冲效果
// ==========================================
function initLightRings() {
    const shapesContainer = document.getElementById('shapes');
    if (!shapesContainer) return;
    
    function createRing() {
        const ring = document.createElement('div');
        ring.className = 'light-ring';
        
        const size = 100 + Math.random() * 200;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
        ring.style.left = `${Math.random() * 100}%`;
        ring.style.top = `${Math.random() * 100}%`;
        ring.style.setProperty('--duration', `${3 + Math.random() * 3}s`);
        
        shapesContainer.appendChild(ring);
        
        setTimeout(() => {
            ring.remove();
        }, 6000);
    }
    
    // 定期创建光环
    setInterval(() => {
        if (Math.random() > 0.5) {
            createRing();
        }
    }, 3000);
    
    // 初始创建几个
    for (let i = 0; i < 3; i++) {
        setTimeout(createRing, i * 1000);
    }
}

// ==========================================
// 鼠标跟随发光效果 - 冰蓝色
// ==========================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        // 平滑跟随
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
    
    // 鼠标进入/离开时改变透明度
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0.5';
    });
}

// ==========================================
// 随机故障效果
// ==========================================
function initGlitchEffect() {
    const overlay = document.querySelector('.glitch-overlay');
    if (!overlay) return;
    
    setInterval(() => {
        if (Math.random() > 0.92) {
            overlay.classList.add('glitch-active');
            
            // 添加屏幕抖动效果
            document.body.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;
            
            setTimeout(() => {
                overlay.classList.remove('glitch-active');
                document.body.style.transform = '';
            }, 150);
        }
    }, 800);
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
// 视差滚动效果
// ==========================================
function initParallax() {
    const shapes = document.querySelectorAll('.floating-shape');
    const stars = document.querySelectorAll('.star');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        shapes.forEach((shape, index) => {
            const speed = 0.02 + (index % 5) * 0.01;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
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
        
        // 添加卡片入场动画
        animateCards();
        
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
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    // Y2K 风格图标
    const icons = ['◇', '◈', '✦', '⬡', '⟐', '⏣', '⎔', '◭'];
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
// 卡片入场动画
// ==========================================
function animateCards() {
    const cards = document.querySelectorAll('.article-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
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
        contentContainer.innerHTML = '<p>文章不存在 // ARTICLE NOT FOUND</p>';
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
        
        // 添加内容入场动画
        contentContainer.style.opacity = '0';
        contentContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            contentContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            contentContainer.style.opacity = '1';
            contentContainer.style.transform = 'translateY(0)';
        }, 100);
        
    } catch (error) {
        console.error('Error loading article:', error);
        contentContainer.innerHTML = `
            <p>加载文章失败 // FAILED TO LOAD ARTICLE</p>
            <a href="index.html" class="back-link">← 返回首页 // BACK</a>
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
