/**
 * HYPERTRANCE BLOG - 超频空间
 * Y2K Style Personal Blog JavaScript
 * 深蓝 + 银色金属风格 + 二进制流 + 飞速时间
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
    initBinaryRain();
    initFlyingTime();
    initStaticTime();
    initDataStreams();
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
// 二进制代码雨效果
// ==========================================
function initBinaryRain() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;
    
    // 创建二进制容器
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-container';
    bgContainer.appendChild(binaryContainer);
    
    const columnCount = Math.floor(window.innerWidth / 50);
    
    function createBinaryColumn() {
        const column = document.createElement('div');
        column.className = 'binary-column';
        
        // 生成随机二进制字符串
        const length = 20 + Math.floor(Math.random() * 30);
        let binaryStr = '';
        for (let i = 0; i < length; i++) {
            binaryStr += Math.random() > 0.5 ? '1' : '0';
        }
        
        column.textContent = binaryStr;
        column.style.left = `${Math.random() * 100}%`;
        column.style.setProperty('--duration', `${8 + Math.random() * 12}s`);
        column.style.animationDelay = `${Math.random() * 10}s`;
        column.style.opacity = 0.3 + Math.random() * 0.4;
        column.style.fontSize = `${10 + Math.random() * 8}px`;
        
        binaryContainer.appendChild(column);
        
        // 动态更新二进制内容
        const updateInterval = setInterval(() => {
            let newStr = '';
            for (let i = 0; i < length; i++) {
                newStr += Math.random() > 0.5 ? '1' : '0';
            }
            column.textContent = newStr;
        }, 100 + Math.random() * 200);
        
        // 动画结束后重新创建
        setTimeout(() => {
            clearInterval(updateInterval);
            column.remove();
            createBinaryColumn();
        }, (8 + Math.random() * 12) * 1000);
    }
    
    // 初始创建多个列
    for (let i = 0; i < columnCount; i++) {
        setTimeout(() => createBinaryColumn(), i * 200);
    }
}

// ==========================================
// 飞速时间效果 - 蹦出 + 横向滑动 + 突然消失
// ==========================================
function initFlyingTime() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;
    
    // 创建时间显示容器
    const timeContainer = document.createElement('div');
    timeContainer.className = 'time-display-container';
    bgContainer.appendChild(timeContainer);
    
    function createFlyingTime() {
        const timeElement = document.createElement('div');
        timeElement.className = 'flying-time';
        
        // 生成随机时间格式
        const formats = [
            () => {
                const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
                const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                return `${h}:${m}:${s}`;
            },
            () => {
                const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
                const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                return `${h}:${m}`;
            },
            () => {
                const ms = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
                return `00:${ms}`;
            },
            () => {
                const year = 1999 + Math.floor(Math.random() * 30);
                return `${year}`;
            },
            () => {
                const timestamp = Date.now() - Math.floor(Math.random() * 1000000000);
                return timestamp.toString().slice(-8);
            },
            () => {
                const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
                const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                const ms = String(Math.floor(Math.random() * 100)).padStart(2, '0');
                return `${h}:${m}:${s}.${ms}`;
            }
        ];
        
        const formatFn = formats[Math.floor(Math.random() * formats.length)];
        timeElement.textContent = formatFn();
        
        // 随机大尺寸 (60px - 200px)
        const fontSize = 60 + Math.random() * 140;
        timeElement.style.fontSize = `${fontSize}px`;
        
        // 随机垂直位置
        timeElement.style.top = `${5 + Math.random() * 80}%`;
        
        // 随机起始水平位置 (可以从左边或右边开始)
        const startFromLeft = Math.random() > 0.5;
        const startX = startFromLeft ? -10 : 80 + Math.random() * 20;
        timeElement.style.left = `${startX}%`;
        
        // 滑动方向和距离
        const slideDirection = startFromLeft ? 1 : -1;
        const slideDistance = (300 + Math.random() * 500) * slideDirection;
        timeElement.style.setProperty('--slide-distance', `${slideDistance}px`);
        
        // 滑动时间 (1-4秒)
        const slideDuration = 1 + Math.random() * 3;
        timeElement.style.setProperty('--slide-duration', `${slideDuration}s`);
        
        // 随机透明度
        timeElement.style.color = `rgba(192, 199, 214, ${0.15 + Math.random() * 0.25})`;
        
        timeContainer.appendChild(timeElement);
        
        // 阶段1: 蹦出 (0.15s)
        timeElement.classList.add('pop-in');
        
        // 快速更新时间显示
        const updateInterval = setInterval(() => {
            timeElement.textContent = formatFn();
        }, 30 + Math.random() * 70);
        
        // 阶段2: 横向滑动
        setTimeout(() => {
            timeElement.classList.remove('pop-in');
            timeElement.classList.add('sliding');
        }, 150);
        
        // 阶段3: 突然消失 (在滑动过程中的随机时刻)
        const disappearTime = 150 + (slideDuration * 1000 * (0.3 + Math.random() * 0.5));
        
        setTimeout(() => {
            clearInterval(updateInterval);
            // 记录当前位置用于消失动画
            const currentX = slideDistance * (disappearTime - 150) / (slideDuration * 1000);
            timeElement.style.setProperty('--current-x', `${currentX}px`);
            timeElement.classList.remove('sliding');
            timeElement.classList.add('pop-out');
            
            // 完全移除
            setTimeout(() => {
                timeElement.remove();
            }, 50);
        }, disappearTime);
    }
    
    // 更频繁地创建时间元素
    setInterval(createFlyingTime, 800 + Math.random() * 600);
    
    // 初始创建几个
    for (let i = 0; i < 5; i++) {
        setTimeout(createFlyingTime, i * 300);
    }
}

// ==========================================
// 静态时间显示（右上角）
// ==========================================
function initStaticTime() {
    const timeStatic = document.createElement('div');
    timeStatic.className = 'time-static';
    document.body.appendChild(timeStatic);
    
    function updateTime() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
        
        timeStatic.innerHTML = `${h}<span class="separator">:</span>${m}<span class="separator">:</span>${s}<span class="ms">.${ms}</span>`;
    }
    
    updateTime();
    setInterval(updateTime, 10);
}

// ==========================================
// 数据流线条
// ==========================================
function initDataStreams() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;
    
    function createDataStream() {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        
        stream.style.top = `${Math.random() * 100}%`;
        stream.style.width = `${100 + Math.random() * 300}px`;
        stream.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
        
        bgContainer.appendChild(stream);
        
        setTimeout(() => {
            stream.remove();
        }, 6000);
    }
    
    setInterval(() => {
        if (Math.random() > 0.5) {
            createDataStream();
        }
    }, 500);
}

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
        
        setTimeout(() => {
            meteor.remove();
        }, 4000);
    }
    
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
    
    const shapes = [
        '◇', '○', '△', '□', '◈', '✦', '⬡', '⬢', 
        '◯', '◭', '⟐', '⌬', '⏣', '⎔'
    ];
    
    const colors = [
        '#c0c7d6', '#e8edf5', '#9aa5bb', 
        '#5e8fff', '#00d4ff', '#3a5fff'
    ];
    
    for (let i = 0; i < 15; i++) {
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
    
    setInterval(() => {
        if (Math.random() > 0.5) {
            createRing();
        }
    }, 3000);
    
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
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        
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
        if (Math.random() > 0.92) {
            overlay.classList.add('glitch-active');
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
        
        grid.innerHTML = '';
        articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        articles.forEach((article, index) => {
            const card = createArticleCard(article, index);
            grid.appendChild(card);
        });
        
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
    
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        contentContainer.innerHTML = '<p>文章不存在 // ARTICLE NOT FOUND</p>';
        return;
    }
    
    try {
        const indexResponse = await fetch(CONFIG.articlesIndex);
        const articles = await indexResponse.json();
        const articleMeta = articles.find(a => a.id === articleId);
        
        if (!articleMeta) {
            throw new Error('Article not found');
        }
        
        if (titleElement) titleElement.textContent = articleMeta.title;
        if (dateElement) dateElement.textContent = formatDate(articleMeta.date);
        if (tagsContainer && articleMeta.tags) {
            tagsContainer.innerHTML = articleMeta.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        document.title = `${articleMeta.title} | HYPERTRANCE BLOG`;
        
        const mdResponse = await fetch(`${CONFIG.articlesPath}${articleId}.md`);
        if (!mdResponse.ok) throw new Error('Failed to load article content');
        
        const markdown = await mdResponse.text();
        const html = marked.parse(markdown);
        contentContainer.innerHTML = html;
        
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
