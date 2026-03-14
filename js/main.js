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
    collectionsIndex: 'posts/collections.json',
};

// ==========================================
// SEO优化函数
// ==========================================

/**
 * URL参数规范化 - 解决重复内容问题
 * 移除有害的URL参数，防止搜索引擎索引多个版本
 */
function normalizeURLForSEO() {
    try {
        const url = new URL(window.location.href);
        const currentParams = new URLSearchParams(url.search);
        
        // 需要移除的有害SEO参数列表
        // 这些参数会导致相同内容有多个URL版本
        const harmfulParams = [
            'enable_bottom_share_style', // 主要问题参数
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', // UTM跟踪参数
            'fbclid', // Facebook点击ID
            'gclid', // Google广告点击ID
            'msclkid', // Microsoft广告点击ID
            'ref', 'source', // 引用来源参数
            'campaign', 'medium', 'term', // 营销参数
            'share', 'share_id', // 分享参数
            'from', 'via' // 来源参数
        ];
        
        let hasChanges = false;
        
        // 移除所有有害参数
        harmfulParams.forEach(param => {
            if (currentParams.has(param)) {
                currentParams.delete(param);
                hasChanges = true;
                console.log(`SEO优化: 移除了有害参数 "${param}"`);
            }
        });
        
        // 如果参数被修改，更新URL（使用replaceState不刷新页面）
        if (hasChanges) {
            const newSearch = currentParams.toString();
            const newURL = newSearch ? `${url.pathname}?${newSearch}` : url.pathname;
            
            // 更新浏览器URL而不刷新页面
            window.history.replaceState({}, '', newURL);
            console.log(`SEO优化: URL已规范化 ${window.location.href}`);
        }
        
        return !hasChanges; // 返回true表示URL已经是规范化的
    } catch (error) {
        console.error('SEO优化: URL规范化失败', error);
        return true;
    }
}

/**
 * 更新动态SEO标签
 * 在文章页面加载时更新meta标签
 */
function updateDynamicSEOTags(articleMeta, articleId) {
    if (!articleMeta || !articleId) return;
    
    const baseUrl = 'https://typerbody.xyz';
    const articleUrl = `${baseUrl}/post.html?id=${articleId}`;
    
    // 更新页面标题
    const pageTitle = `${articleMeta.title} | TYPERBODY BLOG`;
    document.title = pageTitle;
    
    // 更新canonical URL
    const canonicalEl = document.getElementById('canonical-url');
    if (canonicalEl) {
        canonicalEl.href = articleUrl;
    }
    
    // 更新meta描述
    const description = articleMeta.excerpt || articleMeta.title;
    const descEl = document.getElementById('meta-description');
    if (descEl) {
        descEl.content = description;
    }
    
    // 更新meta关键词
    const keywords = articleMeta.seoKeywords ? articleMeta.seoKeywords.join(', ') : '';
    const keywordsEl = document.getElementById('meta-keywords');
    if (keywordsEl) {
        keywordsEl.content = keywords;
    }
    
    // 更新Open Graph标签
    updateOpenGraphTags(articleMeta, articleId);
    
    // 更新结构化数据
    updateArticleStructuredData(articleMeta, articleId);
    
    // 添加隐藏的SEO关键词（搜索引擎能看到，用户看不到）
    addHiddenSEOKeywords(articleMeta);
}

/**
 * 更新Open Graph标签
 */
function updateOpenGraphTags(articleMeta, articleId) {
    const baseUrl = 'https://typerbody.xyz';
    const articleUrl = `${baseUrl}/post.html?id=${articleId}`;
    
    // Open Graph标题
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.content = articleMeta.title;
    
    // Open Graph描述
    const ogDescription = document.getElementById('og-description');
    if (ogDescription) ogDescription.content = articleMeta.excerpt || articleMeta.title;
    
    // Open Graph URL
    const ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.content = articleUrl;
    
    // Open Graph图片
    const ogImage = document.getElementById('og-image');
    if (ogImage && articleMeta.coverImage) {
        ogImage.content = `${baseUrl}/${articleMeta.coverImage}`;
    }
    
    // Twitter卡片
    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.content = articleMeta.title;
    
    const twitterDescription = document.getElementById('twitter-description');
    if (twitterDescription) twitterDescription.content = articleMeta.excerpt || articleMeta.title;
    
    const twitterImage = document.getElementById('twitter-image');
    if (twitterImage && articleMeta.coverImage) {
        twitterImage.content = `${baseUrl}/${articleMeta.coverImage}`;
    }
}

/**
 * 更新文章结构化数据
 */
function updateArticleStructuredData(articleMeta, articleId) {
    const baseUrl = 'https://typerbody.xyz';
    const articleUrl = `${baseUrl}/post.html?id=${articleId}`;
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": articleMeta.title,
        "description": articleMeta.excerpt || articleMeta.title,
        "datePublished": articleMeta.date,
        "dateModified": articleMeta.date,
        "author": {
            "@type": "Person",
            "name": "TYPERBODY",
            "url": baseUrl
        },
        "publisher": {
            "@type": "Organization",
            "name": "TYPERBODY",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/social.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": articleUrl
        },
        "url": articleUrl
    };
    
    // 添加图片
    if (articleMeta.coverImage) {
        structuredData.image = `${baseUrl}/${articleMeta.coverImage}`;
    }
    
    // 添加关键词
    if (articleMeta.seoKeywords && articleMeta.seoKeywords.length > 0) {
        structuredData.keywords = articleMeta.seoKeywords.join(', ');
    }
    
    // 更新JSON-LD脚本
    const jsonLdScript = document.getElementById('article-structured-data');
    if (jsonLdScript) {
        jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
    }
}

/**
 * 添加隐藏的SEO关键词
 * 这些关键词对搜索引擎可见，但对用户不可见
 */
function addHiddenSEOKeywords(articleMeta) {
    if (!articleMeta.seoKeywords || !Array.isArray(articleMeta.seoKeywords)) return;
    
    // 创建或获取隐藏关键词容器
    let seoContainer = document.getElementById('seo-keywords-container');
    if (!seoContainer) {
        seoContainer = document.createElement('div');
        seoContainer.id = 'seo-keywords-container';
        seoContainer.className = 'seo-keywords';
        seoContainer.setAttribute('aria-hidden', 'true');
        seoContainer.style.cssText = 'position: absolute; left: -9999px; top: -9999px; opacity: 0; height: 0; width: 0; overflow: hidden;';
        document.body.appendChild(seoContainer);
    }
    
    // 添加SEO关键词
    seoContainer.innerHTML = articleMeta.seoKeywords
        .map(keyword => `<span>${keyword}</span>`)
        .join(' ');
}

// ==========================================
// 初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // SEO优化：URL参数规范化（解决重复内容问题）
    normalizeURLForSEO();
    
    initLightBurst();
    initRadialRays();
    initInterferenceLines();
    initNoiseEffect();
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
    initNavbarScroll();
    
    // 根据页面类型加载内容
    if (document.getElementById('articles-grid')) {
        loadArticles();
        // 初始化搜索功能
        initSearch();
    }
    
    if (document.getElementById('article-content')) {
        loadArticleContent();
    }
});

// ==========================================
// 导航栏滚动显示
// ==========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero-fullpage');
    
    if (!navbar || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero 可见时隐藏导航栏
                navbar.classList.add('nav-hidden');
                navbar.classList.remove('nav-visible');
            } else {
                // Hero 不可见时显示导航栏
                navbar.classList.remove('nav-hidden');
                navbar.classList.add('nav-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(heroSection);
}

// ==========================================
// 中心爆发光源初始化
// ==========================================
function initLightBurst() {
    const lightCore = document.querySelector('.light-core');
    if (!lightCore) return;
    
    // 随机微小位置变化，增加动态感
    setInterval(() => {
        const offsetX = (Math.random() - 0.5) * 4;
        const offsetY = (Math.random() - 0.5) * 4;
        lightCore.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    }, 100);
}

// ==========================================
// Hypertrance 风格光效系统 - 放射状能量光束
// 特点：中心强光、体积光、烟雾粒子、扭曲射线、宇宙蒸气散射
// ==========================================
function initRadialRays() {
    const raysContainer = document.getElementById('radial-rays');
    if (!raysContainer) return;
    
    // 创建主 Canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    `;
    raysContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let rays = [];
    let backRays = []; // 反向光线
    let smokeParticles = [];
    let circularRings = []; // 圆形光环
    let scatterParticles = []; // 散射粒子
    
    // 光源位置 (稍微向下，约55%, 58%)
    let lightX = 0.55;
    let lightY = 0.58;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // 创建主光线（向左上发射）
    function createRay() {
        const baseAngle = Math.PI * 1.15;
        const spreadAngle = Math.PI * 0.85;
        const angle = baseAngle + (Math.random() - 0.5) * spreadAngle;
        
        const maxLen = Math.max(canvas.width, canvas.height) * 1.5;
        const length = 200 + Math.random() * maxLen;
        
        return {
            angle: angle,
            length: length,
            thickness: 0.5 + Math.random() * 4,
            opacity: 0.15 + Math.random() * 0.45,
            isBroken: Math.random() > 0.7,
            breakPoint: 0.3 + Math.random() * 0.4,
            curve: (Math.random() - 0.5) * 0.4,
            segments: 4 + Math.floor(Math.random() * 6),
            phase: Math.random() * Math.PI * 2,
            flickerSpeed: 0.3 + Math.random() * 1.5,
            isDynamic: Math.random() > 0.4
        };
    }
    
    // 创建反向光线（轻度透光）
    function createBackRay() {
        const baseAngle = Math.PI * 0.15; // 反方向（右下）
        const spreadAngle = Math.PI * 0.6;
        const angle = baseAngle + (Math.random() - 0.5) * spreadAngle;
        
        return {
            angle: angle,
            length: 150 + Math.random() * 400,
            thickness: 0.3 + Math.random() * 1.5,
            opacity: 0.03 + Math.random() * 0.08, // 很低的透明度
            phase: Math.random() * Math.PI * 2,
            flickerSpeed: 0.2 + Math.random() * 0.8
        };
    }
    
    // 创建圆形光环（斜放伪3D）
    function createCircularRing() {
        return {
            radius: 80 + Math.random() * 350,
            thickness: 1 + Math.random() * 3,
            opacity: 0.02 + Math.random() * 0.06,
            rotationX: 0.4 + Math.random() * 0.4, // 3D倾斜
            rotationY: Math.random() * 0.3,
            phase: Math.random() * Math.PI * 2,
            grainDensity: 50 + Math.floor(Math.random() * 100) // 颗粒密度
        };
    }
    
    // 创建烟雾粒子
    function createSmokeParticle() {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        const angle = Math.PI * 1.15 + (Math.random() - 0.5) * Math.PI * 0.9;
        const dist = 50 + Math.random() * 400;
        
        return {
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            size: 30 + Math.random() * 100,
            opacity: 0.03 + Math.random() * 0.08,
            vx: Math.cos(angle) * (0.2 + Math.random() * 0.5),
            vy: Math.sin(angle) * (0.2 + Math.random() * 0.5),
            life: 200 + Math.random() * 300,
            age: 0
        };
    }
    
    // 创建散射粒子（宇宙蒸气）
    function createScatterParticle() {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 500;
        
        return {
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            size: 1 + Math.random() * 3,
            opacity: 0.1 + Math.random() * 0.4,
            twinkleSpeed: 1 + Math.random() * 3,
            phase: Math.random() * Math.PI * 2
        };
    }
    
    // 初始化
    for (let i = 0; i < 80; i++) rays.push(createRay());
    for (let i = 0; i < 25; i++) backRays.push(createBackRay());
    for (let i = 0; i < 8; i++) circularRings.push(createCircularRing());
    for (let i = 0; i < 40; i++) smokeParticles.push(createSmokeParticle());
    for (let i = 0; i < 150; i++) scatterParticles.push(createScatterParticle());
    
    // 绘制圆形光环（重度颗粒虚化，斜放伪3D）
    function drawCircularRings(time) {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        
        circularRings.forEach(ring => {
            const pulse = 1 + 0.1 * Math.sin(time * 0.5 + ring.phase);
            const radius = ring.radius * pulse;
            
            ctx.save();
            ctx.translate(cx, cy);
            
            // 伪3D倾斜效果
            ctx.scale(1, ring.rotationX);
            ctx.rotate(ring.rotationY + time * 0.05);
            
            // 绘制虚化颗粒环
            for (let i = 0; i < ring.grainDensity; i++) {
                const angle = (i / ring.grainDensity) * Math.PI * 2;
                const jitter = (Math.random() - 0.5) * 20;
                const px = Math.cos(angle) * (radius + jitter);
                const py = Math.sin(angle) * (radius + jitter);
                const grainSize = 1 + Math.random() * 4;
                const grainOpacity = ring.opacity * (0.3 + Math.random() * 0.7);
                
                // 模糊颗粒
                const grad = ctx.createRadialGradient(px, py, 0, px, py, grainSize * 3);
                grad.addColorStop(0, `rgba(180, 220, 255, ${grainOpacity})`);
                grad.addColorStop(0.5, `rgba(100, 180, 230, ${grainOpacity * 0.5})`);
                grad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.fillRect(px - grainSize * 3, py - grainSize * 3, grainSize * 6, grainSize * 6);
            }
            
            // 环形轮廓线（虚化）
            ctx.strokeStyle = `rgba(150, 200, 255, ${ring.opacity * 0.3})`;
            ctx.lineWidth = ring.thickness;
            ctx.filter = 'blur(2px)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.filter = 'none';
            
            ctx.restore();
        });
    }
    
    // 绘制宇宙蒸气散射效果
    function drawScatterEffect(time) {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        
        scatterParticles.forEach(p => {
            // 闪烁
            const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.phase);
            const opacity = p.opacity * twinkle;
            
            // 绘制散射光点
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            grad.addColorStop(0, `rgba(200, 230, 255, ${opacity})`);
            grad.addColorStop(0.3, `rgba(150, 200, 255, ${opacity * 0.5})`);
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
        });
        
        // 整体散射光晕（蒸气效果）
        const vaporGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 450);
        vaporGrad.addColorStop(0, 'rgba(100, 180, 220, 0.08)');
        vaporGrad.addColorStop(0.3, 'rgba(80, 150, 200, 0.04)');
        vaporGrad.addColorStop(0.6, 'rgba(60, 120, 180, 0.02)');
        vaporGrad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = vaporGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 绘制中心强光（过曝效果）
    function drawCoreLight(time) {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        const pulse = 1 + 0.15 * Math.sin(time * 1.5);
        
        // 最内层：纯白过曝核心
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80 * pulse);
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
        coreGrad.addColorStop(0.5, 'rgba(220, 240, 255, 0.7)');
        coreGrad.addColorStop(0.8, 'rgba(150, 200, 255, 0.3)');
        coreGrad.addColorStop(1, 'rgba(100, 180, 255, 0)');
        
        ctx.fillStyle = coreGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 中层辉光
        const glowGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 300 * pulse);
        glowGrad.addColorStop(0, 'rgba(180, 220, 255, 0.5)');
        glowGrad.addColorStop(0.3, 'rgba(100, 180, 230, 0.25)');
        glowGrad.addColorStop(0.6, 'rgba(60, 140, 200, 0.1)');
        glowGrad.addColorStop(1, 'rgba(30, 80, 150, 0)');
        
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 外层环境光
        const ambientGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 600 * pulse);
        ambientGrad.addColorStop(0, 'rgba(80, 150, 200, 0.15)');
        ambientGrad.addColorStop(0.5, 'rgba(40, 100, 160, 0.05)');
        ambientGrad.addColorStop(1, 'rgba(20, 60, 100, 0)');
        
        ctx.fillStyle = ambientGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 绘制主光线
    function drawRay(ray, time) {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        
        let opacity = ray.opacity;
        if (ray.isDynamic) {
            opacity *= 0.4 + 0.6 * Math.sin(time * ray.flickerSpeed + ray.phase);
        }
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ray.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, ray.length, 0);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.9})`);
        gradient.addColorStop(0.05, `rgba(220, 240, 255, ${opacity * 0.8})`);
        gradient.addColorStop(0.15, `rgba(150, 200, 255, ${opacity * 0.5})`);
        gradient.addColorStop(0.4, `rgba(80, 150, 220, ${opacity * 0.2})`);
        gradient.addColorStop(0.7, `rgba(50, 100, 180, ${opacity * 0.05})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ray.thickness;
        ctx.lineCap = 'round';
        ctx.shadowColor = `rgba(100, 180, 255, ${opacity * 0.6})`;
        ctx.shadowBlur = 8 + ray.thickness * 3;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        if (ray.isBroken) {
            const breakLen = ray.length * ray.breakPoint;
            const gapLen = 20 + Math.random() * 40;
            const ctrl1X = breakLen * 0.5;
            const ctrl1Y = breakLen * ray.curve * 0.5;
            ctx.quadraticCurveTo(ctrl1X, ctrl1Y, breakLen, ray.curve * breakLen * 0.2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(breakLen + gapLen, ray.curve * breakLen * 0.3);
            ctx.lineTo(ray.length, ray.curve * ray.length * 0.1);
        } else {
            const segLen = ray.length / ray.segments;
            let lastY = 0;
            for (let i = 1; i <= ray.segments; i++) {
                const x = segLen * i;
                const bendFactor = (1 - i / ray.segments);
                const y = lastY + (Math.random() - 0.5) * 25 * bendFactor + ray.curve * segLen * 0.3;
                ctx.lineTo(x, y);
                lastY = y * 0.8;
            }
        }
        
        ctx.stroke();
        ctx.restore();
    }
    
    // 绘制反向光线（轻度透光）
    function drawBackRay(ray, time) {
        const cx = canvas.width * lightX;
        const cy = canvas.height * lightY;
        
        const flicker = 0.5 + 0.5 * Math.sin(time * ray.flickerSpeed + ray.phase);
        const opacity = ray.opacity * flicker;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ray.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, ray.length, 0);
        gradient.addColorStop(0, `rgba(180, 210, 240, ${opacity * 0.5})`);
        gradient.addColorStop(0.3, `rgba(120, 170, 220, ${opacity * 0.3})`);
        gradient.addColorStop(0.7, `rgba(80, 130, 180, ${opacity * 0.1})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ray.thickness;
        ctx.lineCap = 'round';
        ctx.shadowColor = `rgba(100, 150, 200, ${opacity * 0.3})`;
        ctx.shadowBlur = 5;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(ray.length, 0);
        ctx.stroke();
        ctx.restore();
    }
    
    // 绘制烟雾/粒子层
    function drawSmoke(time) {
        smokeParticles.forEach((p, idx) => {
            p.age++;
            p.x += p.vx;
            p.y += p.vy;
            
            // 生命周期淡出
            let alpha = p.opacity;
            if (p.age > p.life * 0.7) {
                alpha *= 1 - (p.age - p.life * 0.7) / (p.life * 0.3);
            }
            
            // 绘制烟雾
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            grad.addColorStop(0, `rgba(100, 180, 220, ${alpha * 1.5})`);
            grad.addColorStop(0.3, `rgba(70, 140, 190, ${alpha})`);
            grad.addColorStop(0.7, `rgba(40, 100, 150, ${alpha * 0.5})`);
            grad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = grad;
            ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
            
            // 重新生成死亡粒子
            if (p.age >= p.life) {
                smokeParticles[idx] = createSmokeParticle();
            }
        });
    }
    
    // 添加颗粒/噪点质感
    function addGrain(time) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 轻微噪点（只在有光的区域）
        for (let i = 0; i < data.length; i += 16) {
            if (data[i] > 10 || data[i+1] > 10 || data[i+2] > 10) {
                const noise = (Math.random() - 0.5) * 15;
                data[i] = Math.max(0, Math.min(255, data[i] + noise));
                data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise));
                data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise));
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    // 动画循环
    function animate(currentTime) {
        const time = currentTime * 0.001;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. 绘制宇宙蒸气散射（最底层）
        drawScatterEffect(time);
        
        // 2. 绘制烟雾层
        drawSmoke(time);
        
        // 3. 绘制圆形光环（伪3D颗粒）
        drawCircularRings(time);
        
        // 4. 绘制反向光线（轻度透光）
        backRays.forEach(ray => drawBackRay(ray, time));
        
        // 5. 绘制主光线
        rays.forEach(ray => drawRay(ray, time));
        
        // 6. 绘制中心强光（叠加模式）
        ctx.globalCompositeOperation = 'screen';
        drawCoreLight(time);
        ctx.globalCompositeOperation = 'source-over';
        
        // 7. 随机闪烁光线
        if (Math.random() > 0.93) {
            const flashRay = createRay();
            flashRay.opacity = 0.6 + Math.random() * 0.4;
            rays.push(flashRay);
            setTimeout(() => {
                const idx = rays.indexOf(flashRay);
                if (idx > -1) rays.splice(idx, 1);
            }, 200 + Math.random() * 300);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate(0);
}

// ==========================================
// 电子干扰线 - 水平扫描
// ==========================================
function initInterferenceLines() {
    const container = document.getElementById('interference-lines');
    if (!container) return;
    
    function createInterferenceLine() {
        const line = document.createElement('div');
        line.className = 'interference-line';
        
        // 随机位置
        line.style.top = `${Math.random() * 100}%`;
        // 随机宽度
        line.style.width = `${20 + Math.random() * 80}%`;
        // 随机起始位置
        line.style.left = `${Math.random() * 30}%`;
        // 随机粗细
        line.style.height = `${0.5 + Math.random() * 1.5}px`;
        line.style.setProperty('--duration', `${1 + Math.random() * 3}s`);
        
        container.appendChild(line);
        
        setTimeout(() => {
            line.remove();
        }, 4000);
    }
    
    // 更频繁的干扰线
    setInterval(() => {
        if (Math.random() > 0.4) {
            createInterferenceLine();
        }
    }, 200);
    
    // 初始创建几条
    for (let i = 0; i < 5; i++) {
        setTimeout(createInterferenceLine, i * 100);
    }
}

// ==========================================
// 噪点/颗粒感增强
// ==========================================
function initNoiseEffect() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;
    
    // 创建 canvas 噪点
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.className = 'noise-canvas';
    noiseCanvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.05;
        mix-blend-mode: screen;
    `;
    
    bgContainer.appendChild(noiseCanvas);
    
    const ctx = noiseCanvas.getContext('2d');
    
    function resize() {
        noiseCanvas.width = window.innerWidth / 4;
        noiseCanvas.height = window.innerHeight / 4;
    }
    
    function generateNoise() {
        const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            // 偏蓝色的噪点
            data[i] = value * 0.7;     // R
            data[i + 1] = value * 0.85; // G
            data[i + 2] = value;        // B
            data[i + 3] = Math.random() * 50; // A
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // 动态更新噪点
    setInterval(generateNoise, 50);
}

// ==========================================
// 二进制效果 - 跟随鼠标
// ==========================================
function initBinaryRain() {
    const bgContainer = document.querySelector('.bg-container');
    if (!bgContainer) return;
    
    // 创建二进制容器
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-container';
    binaryContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
        overflow: hidden;
    `;
    bgContainer.appendChild(binaryContainer);
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let particles = [];
    const maxParticles = 12; // 减少粒子数量
    
    // 跟踪鼠标位置
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function createBinaryParticle() {
        if (particles.length >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'binary-particle';
        
        // 在鼠标周围随机位置生成 - 更小范围
        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 40;
        const startX = mouseX + Math.cos(angle) * distance;
        const startY = mouseY + Math.sin(angle) * distance;
        
        // 更短的二进制字符 (2-4位)
        const length = 2 + Math.floor(Math.random() * 3);
        let binaryStr = '';
        for (let i = 0; i < length; i++) {
            binaryStr += Math.random() > 0.5 ? '1' : '0';
        }
        
        particle.textContent = binaryStr;
        particle.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            font-family: 'Air', monospace;
            font-size: ${8 + Math.random() * 4}px;
            color: rgba(160, 176, 192, ${0.25 + Math.random() * 0.3});
            text-shadow: 0 0 3px rgba(32, 128, 192, 0.4);
            writing-mode: vertical-rl;
            pointer-events: none;
            transition: opacity 0.2s;
        `;
        
        binaryContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: startX,
            y: startY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 0.5 + Math.random() * 1,
            life: 30 + Math.random() * 30, // 更短的生命周期
            age: 0
        });
    }
    
    function updateParticles() {
        particles = particles.filter(p => {
            p.age++;
            p.x += p.vx;
            p.y += p.vy;
            
            // 更新位置
            p.element.style.left = `${p.x}px`;
            p.element.style.top = `${p.y}px`;
            
            // 淡出效果 - 更快开始淡出
            if (p.age > p.life * 0.5) {
                const opacity = 1 - (p.age - p.life * 0.5) / (p.life * 0.5);
                p.element.style.opacity = Math.max(0, opacity);
            }
            
            // 移除过期粒子
            if (p.age >= p.life) {
                p.element.remove();
                return false;
            }
            return true;
        });
    }
    
    // 定期创建新粒子 - 更长间隔
    setInterval(createBinaryParticle, 150);
    
    // 更新粒子动画
    function animate() {
        updateParticles();
        requestAnimationFrame(animate);
    }
    animate();
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
        
        // 随机大尺寸 (100px - 350px)
        const fontSize = 100 + Math.random() * 250;
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
    
    // 减少时间效果数量 - 间隔更长
    setInterval(createFlyingTime, 3000 + Math.random() * 2000);
    
    // 初始只创建2个
    for (let i = 0; i < 2; i++) {
        setTimeout(createFlyingTime, i * 800);
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
// 全局存储文章数据
// ==========================================
let articlesData = {
    categories: [],
    collections: [],
    articles: [],
    currentCategory: 'all'
};

// ==========================================
// 加载文章列表
// ==========================================
async function loadArticles() {
    const grid = document.getElementById('articles-grid');
    const filterContainer = document.getElementById('category-filter');
    
    try {
        // 1. 加载主索引文件获取文章ID列表和分类
        const indexResponse = await fetch(CONFIG.articlesIndex);
        if (!indexResponse.ok) throw new Error('Failed to load articles index');
        const indexData = await indexResponse.json();
        
        // 获取分类信息
        articlesData.categories = indexData.categories || [];
        
        // 获取文章ID列表
        const articleIds = indexData.articles || [];
        
        // 2. 并行加载所有文章的JSON文件
        const articlePromises = articleIds.map(async (articleId) => {
            try {
                const response = await fetch(`${CONFIG.articlesPath}${articleId}.json`);
                if (!response.ok) {
                    console.warn(`Failed to load article: ${articleId}`);
                    return null;
                }
                const articleData = await response.json();
                // 添加 id 字段（从文件名获取）
                return { ...articleData, id: articleId };
            } catch (error) {
                console.warn(`Error loading article ${articleId}:`, error);
                return null;
            }
        });
        
        // 等待所有文章加载完成，过滤掉失败的
        const loadedArticles = await Promise.all(articlePromises);
        articlesData.articles = loadedArticles.filter(article => article !== null);
        
        // 3. 加载合集信息
        try {
            const collectionsResponse = await fetch(CONFIG.collectionsIndex);
            if (collectionsResponse.ok) {
                const collectionsData = await collectionsResponse.json();
                articlesData.collections = collectionsData.collections || [];
            } else {
                articlesData.collections = [];
            }
        } catch (error) {
            console.warn('Failed to load collections:', error);
            articlesData.collections = [];
        }
        
        // 按日期排序
        articlesData.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 渲染分类筛选按钮
        if (filterContainer) {
            renderCategoryFilter(filterContainer);
        }
        
        // 渲染合集展示区
        const collectionsGrid = document.getElementById('collections-grid');
        if (collectionsGrid) {
            renderCollections(collectionsGrid);
        }
        
        // 从 URL hash 获取初始分类
        const urlCategory = getCategoryFromHash();
        articlesData.currentCategory = urlCategory;
        
        // 渲染文章列表
        renderArticles(grid);
        
        // 监听 hash 变化
        window.addEventListener('hashchange', () => {
            const newCategory = getCategoryFromHash();
            if (newCategory !== articlesData.currentCategory) {
                articlesData.currentCategory = newCategory;
                updateActiveFilter();
                renderArticles(grid, true);
            }
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
// 从 URL hash 获取分类
// ==========================================
function getCategoryFromHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#category=')) {
        return hash.replace('#category=', '');
    }
    return 'all';
}

// ==========================================
// 渲染分类筛选按钮
// ==========================================
function renderCategoryFilter(container) {
    const categories = articlesData.categories;
    const articles = articlesData.articles;
    
    // 统计每个分类的文章数量
    const categoryCounts = {};
    articles.forEach(article => {
        const cat = article.category || 'uncategorized';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    // 创建"全部"按钮
    let html = `
        <button class="category-btn active" data-category="all">
            <span class="icon">⊕</span>
            <span class="name">全部</span>
            <span class="count">${articles.length}</span>
        </button>
    `;
    
    // 创建各分类按钮
    categories.forEach(cat => {
        const count = categoryCounts[cat.id] || 0;
        if (count > 0) {
            html += `
                <button class="category-btn" data-category="${cat.id}">
                    <span class="icon">${cat.icon}</span>
                    <span class="name">${cat.name}</span>
                    <span class="count">${count}</span>
                </button>
            `;
        }
    });
    
    container.innerHTML = html;
    
    // 绑定点击事件
    container.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            handleCategoryClick(category);
        });
    });
    
    // 设置初始激活状态
    updateActiveFilter();
}

// ==========================================
// 处理分类按钮点击
// ==========================================
function handleCategoryClick(category) {
    if (category === articlesData.currentCategory) return;
    
    // 更新 URL hash
    if (category === 'all') {
        history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
        history.pushState(null, '', `#category=${category}`);
    }
    
    articlesData.currentCategory = category;
    updateActiveFilter();
    renderArticles(document.getElementById('articles-grid'), true);
}

// ==========================================
// 更新激活的筛选按钮
// ==========================================
function updateActiveFilter() {
    const container = document.getElementById('category-filter');
    if (!container) return;
    
    container.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === articlesData.currentCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ==========================================
// 渲染文章列表
// ==========================================
function renderArticles(grid, animate = false) {
    const category = articlesData.currentCategory;
    let articles = articlesData.articles;
    
    // 过滤文章
    if (category !== 'all') {
        articles = articles.filter(article => article.category === category);
    }
    
    // 添加淡出动画
    if (animate) {
        grid.classList.add('fade-out');
        setTimeout(() => {
            updateArticleGrid(grid, articles);
            grid.classList.remove('fade-out');
            grid.classList.add('fade-in');
            setTimeout(() => {
                grid.classList.remove('fade-in');
            }, 300);
        }, 200);
    } else {
        updateArticleGrid(grid, articles);
        animateCards();
    }
}

// ==========================================
// 渲染合集展示区
// ==========================================
function renderCollections(grid) {
    const collections = articlesData.collections;
    const articles = articlesData.articles;
    
    if (!collections || collections.length === 0) {
        // 没有合集，隐藏整个区域
        const collectionsSection = document.getElementById('collections');
        if (collectionsSection) {
            collectionsSection.style.display = 'none';
        }
        return;
    }
    
    // 计算每个合集的统计信息
    const collectionsWithStats = collections.map(collection => {
        const collectionArticles = articles.filter(a => a.collection === collection.id);
        const articleCount = collectionArticles.length;
        
        // 计算总阅读时间
        let totalReadingTime = 0;
        collectionArticles.forEach(article => {
            if (article.readingTime) {
                const match = article.readingTime.match(/(\d+)/);
                if (match) {
                    totalReadingTime += parseInt(match[1]);
                }
            }
        });
        
        return {
            ...collection,
            articleCount,
            totalReadingTime
        };
    });
    
    // 渲染合集卡片
    grid.innerHTML = collectionsWithStats.map(collection => {
        const icon = collection.icon || '⬡';
        
        return `
            <div class="collection-card" data-collection="${collection.id}" onclick="handleCollectionClick('${collection.id}')">
                <div class="collection-card-content">
                    <div class="collection-card-header">
                        <span class="collection-card-icon">${icon}</span>
                        <h3 class="collection-card-title">${collection.name}</h3>
                    </div>
                    <p class="collection-card-desc">${collection.description || ''}</p>
                    <div class="collection-card-meta">
                        <span class="collection-meta-item">
                            <span class="collection-meta-icon">◇</span>
                            <span>${collection.articleCount} 篇文章</span>
                        </span>
                        <span class="collection-meta-item">
                            <span class="collection-meta-icon">⏱</span>
                            <span>${collection.totalReadingTime} min</span>
                        </span>
                    </div>
                </div>
                <span class="collection-card-arrow">→</span>
            </div>
        `;
    }).join('');
    
    // 入场动画
    const cards = grid.querySelectorAll('.collection-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * 处理合集卡片点击
 */
function handleCollectionClick(collectionId) {
    // 找到该合集的第一篇文章并跳转
    const collection = articlesData.collections.find(c => c.id === collectionId);
    if (collection && collection.articles && collection.articles.length > 0) {
        const firstArticleId = collection.articles[0];
        window.location.href = `post.html?id=${firstArticleId}`;
    }
}

// 将函数暴露到全局
window.handleCollectionClick = handleCollectionClick;

// ==========================================
// 更新文章网格内容
// ==========================================
function updateArticleGrid(grid, articles) {
    if (articles.length === 0) {
        grid.innerHTML = `
            <div class="loading-indicator">
                <span>该分类暂无文章 // NO ARTICLES IN THIS CATEGORY</span>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = '';
    articles.forEach((article, index) => {
        const card = createArticleCard(article, index);
        grid.appendChild(card);
    });
    
    animateCards();
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
    
    // 判断是否有封面图片
    let cardImageHTML;
    if (article.coverImage) {
        cardImageHTML = `
            <div class="card-image card-image--has-cover">
                <img src="${article.coverImage}" alt="${article.title}" class="card-cover-image" loading="lazy">
            </div>
        `;
    } else {
        cardImageHTML = `
            <div class="card-image">
                <span class="card-icon">${icon}</span>
            </div>
        `;
    }
    
    card.innerHTML = `
        ${cardImageHTML}
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
        // 1. 加载文章元数据
        const metaResponse = await fetch(`${CONFIG.articlesPath}${articleId}.json`);
        if (!metaResponse.ok) throw new Error('Article not found');
        const articleMeta = await metaResponse.json();
        articleMeta.id = articleId; // 添加 id 字段
        
        // 2. 加载合集信息
        let collections = [];
        let allArticles = [];
        try {
            const collectionsResponse = await fetch(CONFIG.collectionsIndex);
            if (collectionsResponse.ok) {
                const collectionsData = await collectionsResponse.json();
                collections = collectionsData.collections || [];
            }
        } catch (error) {
            console.warn('Failed to load collections:', error);
        }
        
        if (titleElement) titleElement.textContent = articleMeta.title;
        if (dateElement) dateElement.textContent = formatDate(articleMeta.date);
        if (tagsContainer && articleMeta.tags) {
            tagsContainer.innerHTML = articleMeta.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }
        
        // 如果有封面图片，添加封面图片显示
        if (articleMeta.coverImage) {
            const articleHeader = document.querySelector('.article-header');
            if (articleHeader) {
                const coverImageContainer = document.createElement('div');
                coverImageContainer.className = 'article-cover-container';
                coverImageContainer.innerHTML = `
                    <img src="${articleMeta.coverImage}" alt="${articleMeta.title}" class="article-cover-image">
                `;
                articleHeader.insertBefore(coverImageContainer, articleHeader.firstChild);
            }
        }
        
        document.title = `${articleMeta.title} | HYPERTRANCE BLOG`;
        
        // SEO优化：更新动态SEO标签（包括canonical、meta描述、关键词、Open Graph等）
        updateDynamicSEOTags(articleMeta, articleId);
        
        // 初始化合集导航（如果文章属于某个合集）
        const belongsToCollection = collections.find(c => c.articles && c.articles.includes(articleId));
        if (belongsToCollection) {
            // 加载合集中所有文章的元数据用于导航
            const collectionArticlePromises = belongsToCollection.articles.map(async (id) => {
                try {
                    const response = await fetch(`${CONFIG.articlesPath}${id}.json`);
                    if (response.ok) {
                        const data = await response.json();
                        return { ...data, id, collection: belongsToCollection.id };
                    }
                } catch (e) {
                    console.warn(`Failed to load article ${id} for collection nav`);
                }
                return null;
            });
            allArticles = (await Promise.all(collectionArticlePromises)).filter(a => a !== null);
            
            // 为文章添加合集信息和顺序
            allArticles.forEach((article, index) => {
                article.collectionOrder = index + 1;
            });
            
            articleMeta.collection = belongsToCollection.id;
            articleMeta.collectionOrder = belongsToCollection.articles.indexOf(articleId) + 1;
            
            initCollectionNav(articleMeta, allArticles, collections);
        }
        
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
            
            // 文章渲染完成后初始化 TOC
            initTOC();
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
// SEO 优化 - 动态添加meta标签
// ==========================================

/**
 * 更新页面的SEO meta标签
 * 添加隐藏的SEO关键词，搜索引擎可见但用户不可见
 * @param {Object} articleMeta - 文章元数据
 */
function updateSEOMeta(articleMeta) {
    const head = document.head;
    
    // 1. 添加/更新 description meta标签
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.name = 'description';
        head.appendChild(descMeta);
    }
    descMeta.content = articleMeta.excerpt || articleMeta.title;
    
    // 2. 合并可见标签和隐藏SEO关键词
    const visibleTags = articleMeta.tags || [];
    const seoKeywords = articleMeta.seoKeywords || [];
    const allKeywords = [...new Set([...visibleTags, ...seoKeywords])]; // 去重
    
    // 3. 添加/更新 keywords meta标签（搜索引擎可见）
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        head.appendChild(keywordsMeta);
    }
    keywordsMeta.content = allKeywords.join(', ');
    
    // 4. Open Graph 标签（社交媒体分享优化）
    const ogTags = {
        'og:title': articleMeta.title,
        'og:description': articleMeta.excerpt || articleMeta.title,
        'og:type': 'article',
        'og:url': window.location.href
    };
    
    if (articleMeta.coverImage) {
        ogTags['og:image'] = new URL(articleMeta.coverImage, window.location.href).href;
    }
    
    Object.entries(ogTags).forEach(([property, content]) => {
        let ogMeta = document.querySelector(`meta[property="${property}"]`);
        if (!ogMeta) {
            ogMeta = document.createElement('meta');
            ogMeta.setAttribute('property', property);
            head.appendChild(ogMeta);
        }
        ogMeta.content = content;
    });
    
    // 5. Twitter Card 标签
    const twitterTags = {
        'twitter:card': 'summary_large_image',
        'twitter:title': articleMeta.title,
        'twitter:description': articleMeta.excerpt || articleMeta.title
    };
    
    if (articleMeta.coverImage) {
        twitterTags['twitter:image'] = new URL(articleMeta.coverImage, window.location.href).href;
    }
    
    Object.entries(twitterTags).forEach(([name, content]) => {
        let twitterMeta = document.querySelector(`meta[name="${name}"]`);
        if (!twitterMeta) {
            twitterMeta = document.createElement('meta');
            twitterMeta.name = name;
            head.appendChild(twitterMeta);
        }
        twitterMeta.content = content;
    });
    
    // 6. 添加文章结构化数据（JSON-LD，对SEO非常有帮助）
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
        existingJsonLd.remove();
    }
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": articleMeta.title,
        "description": articleMeta.excerpt || articleMeta.title,
        "keywords": allKeywords.join(', '),
        "datePublished": articleMeta.date,
        "author": {
            "@type": "Person",
            "name": "TyperBody"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TYPERBODY BLOG"
        }
    };
    
    if (articleMeta.coverImage) {
        jsonLd.image = new URL(articleMeta.coverImage, window.location.href).href;
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    head.appendChild(script);
}

// ==========================================
// TOC（目录）功能
// ==========================================

/**
 * 初始化 TOC 功能
 * 在文章内容渲染后调用
 */
function initTOC() {
    const articleBody = document.getElementById('article-content');
    const tocSidebar = document.getElementById('toc-sidebar');
    const tocNav = document.getElementById('toc-nav');
    const tocMobileNav = document.getElementById('toc-mobile-nav');
    const progressBar = document.getElementById('reading-progress-bar');
    
    if (!articleBody || !tocNav) return;
    
    // 提取所有标题 (h1-h3)
    const headings = articleBody.querySelectorAll('h1, h2, h3');
    
    if (headings.length === 0) {
        // 没有标题，隐藏 TOC
        if (tocSidebar) tocSidebar.style.display = 'none';
        const tocFab = document.getElementById('toc-fab');
        if (tocFab) tocFab.style.display = 'none';
        return;
    }
    
    // 为每个标题生成唯一 ID
    headings.forEach((heading, index) => {
        if (!heading.id) {
            // 生成基于标题内容的 slug
            const slug = generateSlug(heading.textContent);
            heading.id = `heading-${slug}-${index}`;
        }
    });
    
    // 生成 TOC 内容
    const tocHTML = generateTOCHTML(headings);
    tocNav.innerHTML = tocHTML;
    if (tocMobileNav) {
        tocMobileNav.innerHTML = tocHTML;
    }
    
    // 初始化滚动监听
    initScrollSpy(headings);
    
    // 初始化阅读进度条
    if (progressBar) {
        initReadingProgress(progressBar);
    }
    
    // 初始化移动端 TOC 交互
    initMobileTOC();
    
    // 初始化 TOC 项点击事件
    initTOCClickHandlers();
}

/**
 * 生成 URL 友好的 slug
 */
function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, '-')
        .replace(/[^\w\u4e00-\u9fa5-]/g, '')
        .substring(0, 50);
}

/**
 * 生成 TOC HTML
 */
function generateTOCHTML(headings) {
    let html = '';
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        const id = heading.id;
        
        html += `
            <a href="#${id}" class="toc-item toc-level-${level}" data-target="${id}">
                <span class="toc-indicator"></span>
                <span class="toc-text">${text}</span>
            </a>
        `;
    });
    
    return html;
}

/**
 * 初始化滚动监听（高亮当前章节）
 */
function initScrollSpy(headings) {
    if (headings.length === 0) return;
    
    // 使用 Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -70% 0px', // 顶部偏移导航栏高度
        threshold: 0
    };
    
    let currentActiveId = null;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                setActiveTOCItem(id);
                currentActiveId = id;
            }
        });
    }, observerOptions);
    
    headings.forEach(heading => {
        observer.observe(heading);
    });
    
    // 备用：滚动事件监听（处理快速滚动情况）
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateTOCOnScroll(headings);
        }, 100);
    });
}

/**
 * 滚动时更新 TOC 高亮
 */
function updateTOCOnScroll(headings) {
    const scrollPos = window.scrollY + 100; // 偏移量
    
    let currentHeading = null;
    
    headings.forEach(heading => {
        if (heading.offsetTop <= scrollPos) {
            currentHeading = heading;
        }
    });
    
    if (currentHeading) {
        setActiveTOCItem(currentHeading.id);
    }
}

/**
 * 设置当前激活的 TOC 项
 */
function setActiveTOCItem(id) {
    // 桌面端
    const tocNav = document.getElementById('toc-nav');
    // 移动端
    const tocMobileNav = document.getElementById('toc-mobile-nav');
    
    [tocNav, tocMobileNav].forEach(nav => {
        if (!nav) return;
        
        // 移除所有激活状态
        nav.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 添加新的激活状态
        const activeItem = nav.querySelector(`.toc-item[data-target="${id}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            
            // 确保激活项在视口中可见（自动滚动 TOC）
            scrollTOCItemIntoView(activeItem, nav);
        }
    });
}

/**
 * 确保 TOC 项在视口中可见
 */
function scrollTOCItemIntoView(item, container) {
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    // 检查是否在视口外
    if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
        item.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

/**
 * 初始化阅读进度条
 */
function initReadingProgress(progressBar) {
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // 初始化
    updateProgress();
}

/**
 * 初始化移动端 TOC 交互
 */
function initMobileTOC() {
    const tocFab = document.getElementById('toc-fab');
    const tocPanel = document.getElementById('toc-mobile-panel');
    const tocOverlay = document.getElementById('toc-mobile-overlay');
    const tocClose = document.getElementById('toc-close');
    
    if (!tocFab || !tocPanel) return;
    
    // 打开面板
    tocFab.addEventListener('click', () => {
        tocPanel.classList.add('open');
        if (tocOverlay) tocOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    // 关闭面板
    function closePanel() {
        tocPanel.classList.remove('open');
        if (tocOverlay) tocOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    if (tocClose) {
        tocClose.addEventListener('click', closePanel);
    }
    
    if (tocOverlay) {
        tocOverlay.addEventListener('click', closePanel);
    }
    
    // 点击 TOC 项后关闭面板
    const tocMobileNav = document.getElementById('toc-mobile-nav');
    if (tocMobileNav) {
        tocMobileNav.addEventListener('click', (e) => {
            if (e.target.closest('.toc-item')) {
                setTimeout(closePanel, 100);
            }
        });
    }
}

/**
 * 初始化 TOC 项点击事件（平滑滚动）
 */
function initTOCClickHandlers() {
    const tocNav = document.getElementById('toc-nav');
    const tocMobileNav = document.getElementById('toc-mobile-nav');
    
    [tocNav, tocMobileNav].forEach(nav => {
        if (!nav) return;
        
        nav.addEventListener('click', (e) => {
            const tocItem = e.target.closest('.toc-item');
            if (!tocItem) return;
            
            e.preventDefault();
            
            const targetId = tocItem.dataset.target;
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 计算偏移量（考虑固定导航栏）
                const navBar = document.querySelector('.nav-bar');
                const offset = navBar ? navBar.offsetHeight + 20 : 80;
                
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 更新 URL hash（不跳转）
                history.pushState(null, '', `#${targetId}`);
            }
        });
    });
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
// 合集导航功能
// ==========================================

// LocalStorage 键名
const READING_PROGRESS_KEY = 'hypertrance_reading_progress';

/**
 * 保存阅读进度
 * @param {string} collectionId - 合集ID
 * @param {string} articleSlug - 文章slug
 */
function saveReadingProgress(collectionId, articleSlug) {
    const progress = JSON.parse(localStorage.getItem(READING_PROGRESS_KEY) || '{}');
    if (!progress[collectionId]) {
        progress[collectionId] = { read: [] };
    }
    if (!progress[collectionId].read.includes(articleSlug)) {
        progress[collectionId].read.push(articleSlug);
    }
    localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(progress));
}

/**
 * 获取阅读进度
 * @param {string} collectionId - 合集ID
 * @returns {Object} - 阅读进度对象
 */
function getReadingProgress(collectionId) {
    const progress = JSON.parse(localStorage.getItem(READING_PROGRESS_KEY) || '{}');
    return progress[collectionId] || { read: [] };
}

/**
 * 初始化合集导航
 * @param {Object} currentArticle - 当前文章元数据
 * @param {Array} allArticles - 所有文章列表
 * @param {Array} collections - 所有合集列表
 */
function initCollectionNav(currentArticle, allArticles, collections) {
    const collectionNav = document.getElementById('collection-nav');
    const collectionNameEl = document.getElementById('collection-name');
    const collectionProgressEl = document.getElementById('collection-progress');
    const collectionListEl = document.getElementById('collection-list');
    const collectionToggleBtn = document.getElementById('collection-toggle');
    const toggleIconEl = document.getElementById('toggle-icon');
    const prevArticleEl = document.getElementById('prev-article');
    const nextArticleEl = document.getElementById('next-article');
    
    if (!collectionNav || !currentArticle.collection) return;
    
    // 查找当前文章所属的合集
    const collection = collections.find(c => c.id === currentArticle.collection);
    if (!collection) return;
    
    // 获取合集中的所有文章（按 collectionOrder 排序）
    const collectionArticles = allArticles
        .filter(a => a.collection === collection.id)
        .sort((a, b) => (a.collectionOrder || 0) - (b.collectionOrder || 0));
    
    if (collectionArticles.length === 0) return;
    
    // 找到当前文章在合集中的位置
    const currentIndex = collectionArticles.findIndex(a => a.id === currentArticle.id);
    if (currentIndex === -1) return;
    
    // 显示合集导航
    collectionNav.style.display = 'block';
    
    // 设置合集名称
    collectionNameEl.textContent = collection.name;
    
    // 设置进度
    collectionProgressEl.textContent = `${currentIndex + 1}/${collectionArticles.length}`;
    
    // 保存当前文章的阅读记录
    saveReadingProgress(collection.id, currentArticle.id);
    
    // 获取阅读进度
    const readingProgress = getReadingProgress(collection.id);
    
    // 渲染文章列表
    renderCollectionList(collectionListEl, collectionArticles, currentArticle.id, readingProgress);
    
    // 设置上一篇/下一篇按钮
    if (currentIndex > 0) {
        const prevArticle = collectionArticles[currentIndex - 1];
        prevArticleEl.href = `post.html?id=${prevArticle.id}`;
        prevArticleEl.style.visibility = 'visible';
        prevArticleEl.title = prevArticle.title;
    }
    
    if (currentIndex < collectionArticles.length - 1) {
        const nextArticle = collectionArticles[currentIndex + 1];
        nextArticleEl.href = `post.html?id=${nextArticle.id}`;
        nextArticleEl.style.visibility = 'visible';
        nextArticleEl.title = nextArticle.title;
    }
    
    // 展开/收起切换
    let isExpanded = false;
    collectionToggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        collectionListEl.classList.toggle('expanded', isExpanded);
        toggleIconEl.textContent = isExpanded ? '▲' : '▼';
        toggleIconEl.classList.toggle('rotated', isExpanded);
    });
}

/**
 * 渲染合集文章列表
 * @param {HTMLElement} container - 列表容器
 * @param {Array} articles - 合集中的文章列表
 * @param {string} currentArticleId - 当前文章ID
 * @param {Object} readingProgress - 阅读进度
 */
function renderCollectionList(container, articles, currentArticleId, readingProgress) {
    const html = articles.map((article, index) => {
        const isCurrent = article.id === currentArticleId;
        const isRead = readingProgress.read.includes(article.id);
        
        let statusIcon = '';
        let statusClass = '';
        
        if (isCurrent) {
            statusIcon = '📖';
            statusClass = 'current';
        } else if (isRead) {
            statusIcon = '✓';
            statusClass = 'read';
        } else {
            statusIcon = String(index + 1);
            statusClass = 'unread';
        }
        
        return `
            <a href="${isCurrent ? '#' : `post.html?id=${article.id}`}"
               class="collection-item ${statusClass}"
               ${isCurrent ? 'onclick="return false;"' : ''}>
                <span class="item-status">${statusIcon}</span>
                <span class="item-title">${article.title}</span>
                ${article.readingTime ? `<span class="item-time">${article.readingTime}</span>` : ''}
            </a>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// ==========================================
// 搜索功能
// ==========================================

// 搜索相关常量
const SEARCH_CONFIG = {
    debounceTime: 300,
    maxRecentSearches: 5,
    maxResults: 8,
    recentSearchesKey: 'hypertrance_recent_searches'
};

// 搜索状态
let searchState = {
    isOpen: false,
    selectedIndex: -1,
    results: [],
    query: ''
};

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');
    
    if (!searchInput) return;
    
    // 输入事件（带防抖）
    const debouncedSearch = debounce(handleSearchInput, SEARCH_CONFIG.debounceTime);
    searchInput.addEventListener('input', debouncedSearch);
    
    // 聚焦事件
    searchInput.addEventListener('focus', () => {
        searchState.isOpen = true;
        showSearchPanel();
    });
    
    // 清除按钮
    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            clearSearchResults();
            searchInput.focus();
        });
    }
    
    // 键盘事件
    searchInput.addEventListener('keydown', handleSearchKeydown);
    
    // 点击外部关闭
    document.addEventListener('click', (e) => {
        if (searchContainer && !searchContainer.contains(e.target)) {
            closeSearchPanel();
        }
    });
    
    // 全局键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl+K 或 / 打开搜索
        if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !isInputFocused())) {
            e.preventDefault();
            searchInput.focus();
            showSearchPanel();
        }
        
        // Esc 关闭搜索
        if (e.key === 'Escape' && searchState.isOpen) {
            closeSearchPanel();
            searchInput.blur();
        }
    });
    
    // 加载最近搜索
    loadRecentSearches();
}

/**
 * 判断是否有输入框聚焦
 */
function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');
}

/**
 * 防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 处理搜索输入
 */
function handleSearchInput(e) {
    const query = e.target.value.trim();
    const searchClear = document.getElementById('search-clear');
    
    // 显示/隐藏清除按钮
    if (searchClear) {
        searchClear.style.display = query.length > 0 ? 'flex' : 'none';
    }
    
    if (query.length === 0) {
        clearSearchResults();
        showRecentSearches();
        return;
    }
    
    searchState.query = query;
    
    // 执行搜索
    const results = fuzzySearch(query, articlesData.articles);
    searchState.results = results;
    searchState.selectedIndex = -1;
    
    renderSearchResults(results, query);
}

/**
 * 模糊搜索实现 - 支持文章和合集搜索
 */
function fuzzySearch(query, articles) {
    const lowerQuery = query.toLowerCase();
    const collections = articlesData.collections || [];
    
    // 搜索文章
    const articleResults = articles
        .filter(article => {
            const title = (article.title || '').toLowerCase();
            const excerpt = (article.excerpt || '').toLowerCase();
            const tags = (article.tags || []).join(' ').toLowerCase();
            const category = (article.category || '').toLowerCase();
            
            return title.includes(lowerQuery) ||
                   excerpt.includes(lowerQuery) ||
                   tags.includes(lowerQuery) ||
                   category.includes(lowerQuery);
        })
        .map(article => ({
            ...article,
            resultType: 'article',
            score: calculateRelevance(article, lowerQuery)
        }));
    
    // 搜索合集
    const collectionResults = collections
        .filter(collection => {
            const name = (collection.name || '').toLowerCase();
            const description = (collection.description || '').toLowerCase();
            
            return name.includes(lowerQuery) ||
                   description.includes(lowerQuery);
        })
        .map(collection => {
            // 获取合集文章数量
            const collectionArticles = articles.filter(a => a.collection === collection.id);
            let totalReadingTime = 0;
            collectionArticles.forEach(article => {
                if (article.readingTime) {
                    const match = article.readingTime.match(/(\d+)/);
                    if (match) totalReadingTime += parseInt(match[1]);
                }
            });
            
            return {
                ...collection,
                resultType: 'collection',
                articleCount: collectionArticles.length,
                totalReadingTime,
                score: calculateCollectionRelevance(collection, lowerQuery)
            };
        });
    
    // 合并结果，合集优先显示
    const allResults = [...collectionResults, ...articleResults];
    
    return allResults
        .sort((a, b) => b.score - a.score)
        .slice(0, SEARCH_CONFIG.maxResults);
}

/**
 * 计算合集搜索相关度分数
 */
function calculateCollectionRelevance(collection, query) {
    let score = 0;
    const name = (collection.name || '').toLowerCase();
    const description = (collection.description || '').toLowerCase();
    
    // 名称匹配权重最高
    if (name.includes(query)) {
        score += 120;
        if (name.startsWith(query)) {
            score += 60;
        }
    }
    
    // 描述匹配
    if (description.includes(query)) {
        score += 30;
    }
    
    return score;
}

/**
 * 计算搜索相关度分数
 */
function calculateRelevance(article, query) {
    let score = 0;
    const title = (article.title || '').toLowerCase();
    const excerpt = (article.excerpt || '').toLowerCase();
    const tags = (article.tags || []).join(' ').toLowerCase();
    
    // 标题匹配权重最高
    if (title.includes(query)) {
        score += 100;
        // 标题开头匹配更高
        if (title.startsWith(query)) {
            score += 50;
        }
    }
    
    // 标签匹配
    if (tags.includes(query)) {
        score += 50;
    }
    
    // 摘要匹配
    if (excerpt.includes(query)) {
        score += 20;
    }
    
    // 时间权重（越新越靠前）
    const date = new Date(article.date);
    const now = new Date();
    const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    score += Math.max(0, 10 - daysDiff / 30);
    
    return score;
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 高亮匹配词
 */
function highlightMatch(text, query) {
    if (!query || !text) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/**
 * 渲染搜索结果
 */
function renderSearchResults(results, query) {
    const resultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('search-no-results');
    const recentSearches = document.getElementById('recent-searches');
    const searchResults = document.getElementById('search-results');
    
    if (!resultsList || !searchResults) return;
    
    // 隐藏最近搜索
    if (recentSearches) {
        recentSearches.style.display = 'none';
    }
    
    // 显示搜索结果面板
    searchResults.style.display = 'block';
    
    if (results.length === 0) {
        resultsList.innerHTML = '';
        resultsList.style.display = 'none';
        if (noResults) noResults.style.display = 'flex';
        if (resultsCount) resultsCount.textContent = '';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
    resultsList.style.display = 'block';
    
    // 更新结果计数
    if (resultsCount) {
        resultsCount.textContent = `找到 ${results.length} 个结果`;
    }
    
    // 获取分类信息
    const categories = articlesData.categories || [];
    
    // 渲染结果项
    resultsList.innerHTML = results.map((item, index) => {
        if (item.resultType === 'collection') {
            // 渲染合集结果
            const highlightedName = highlightMatch(item.name, query);
            const descSnippet = getExcerptSnippet(item.description, query, 60);
            const highlightedDesc = highlightMatch(descSnippet, query);
            const icon = item.icon || '⬡';
            const firstArticleId = item.articles && item.articles.length > 0 ? item.articles[0] : '';
            
            return `
                <a href="${firstArticleId ? `post.html?id=${firstArticleId}` : '#'}"
                   class="search-result-item search-result-collection ${index === searchState.selectedIndex ? 'selected' : ''}"
                   data-index="${index}">
                    <div class="result-main">
                        <div class="result-title">
                            <span class="result-collection-icon">${icon}</span>
                            ${highlightedName}
                        </div>
                        <div class="result-excerpt">${highlightedDesc}</div>
                    </div>
                    <div class="result-meta">
                        <span class="result-category result-collection-tag">合集</span>
                        <span class="result-date">${item.articleCount} 篇 · ${item.totalReadingTime} min</span>
                    </div>
                </a>
            `;
        } else {
            // 渲染文章结果
            const highlightedTitle = highlightMatch(item.title, query);
            const excerptSnippet = getExcerptSnippet(item.excerpt, query, 80);
            const highlightedExcerpt = highlightMatch(excerptSnippet, query);
            
            // 获取分类名称
            const category = categories.find(c => c.id === item.category);
            const categoryName = category ? category.name : item.category || '';
            
            return `
                <a href="post.html?id=${item.id}"
                   class="search-result-item ${index === searchState.selectedIndex ? 'selected' : ''}"
                   data-index="${index}">
                    <div class="result-main">
                        <div class="result-title">${highlightedTitle}</div>
                        <div class="result-excerpt">${highlightedExcerpt}</div>
                    </div>
                    <div class="result-meta">
                        ${categoryName ? `<span class="result-category">${categoryName}</span>` : ''}
                        <span class="result-date">${formatDate(item.date)}</span>
                    </div>
                </a>
            `;
        }
    }).join('');
    
    // 绑定鼠标悬停事件
    resultsList.querySelectorAll('.search-result-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            searchState.selectedIndex = index;
            updateSelectedResult();
        });
    });
}

/**
 * 获取摘要片段（围绕匹配词）
 */
function getExcerptSnippet(excerpt, query, maxLength) {
    if (!excerpt) return '';
    
    const lowerExcerpt = excerpt.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerExcerpt.indexOf(lowerQuery);
    
    if (index === -1) {
        return excerpt.substring(0, maxLength) + (excerpt.length > maxLength ? '...' : '');
    }
    
    // 以匹配词为中心截取
    const start = Math.max(0, index - 20);
    const end = Math.min(excerpt.length, index + query.length + 60);
    let snippet = excerpt.substring(start, end);
    
    if (start > 0) snippet = '...' + snippet;
    if (end < excerpt.length) snippet = snippet + '...';
    
    return snippet;
}

/**
 * 处理搜索键盘事件
 */
function handleSearchKeydown(e) {
    const results = searchState.results;
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (results.length > 0) {
                searchState.selectedIndex = Math.min(
                    searchState.selectedIndex + 1,
                    results.length - 1
                );
                updateSelectedResult();
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (results.length > 0) {
                searchState.selectedIndex = Math.max(
                    searchState.selectedIndex - 1,
                    0
                );
                updateSelectedResult();
            }
            break;
            
        case 'Enter':
            e.preventDefault();
            if (searchState.selectedIndex >= 0 && results[searchState.selectedIndex]) {
                // 跳转到选中结果
                const item = results[searchState.selectedIndex];
                saveRecentSearch(searchState.query);
                if (item.resultType === 'collection') {
                    // 合集：跳转到第一篇文章
                    const firstArticleId = item.articles && item.articles.length > 0 ? item.articles[0] : '';
                    if (firstArticleId) {
                        window.location.href = `post.html?id=${firstArticleId}`;
                    }
                } else {
                    // 文章
                    window.location.href = `post.html?id=${item.id}`;
                }
            } else if (searchState.query && results.length > 0) {
                // 跳转到第一个结果
                const firstItem = results[0];
                saveRecentSearch(searchState.query);
                if (firstItem.resultType === 'collection') {
                    const firstArticleId = firstItem.articles && firstItem.articles.length > 0 ? firstItem.articles[0] : '';
                    if (firstArticleId) {
                        window.location.href = `post.html?id=${firstArticleId}`;
                    }
                } else {
                    window.location.href = `post.html?id=${firstItem.id}`;
                }
            }
            break;
    }
}

/**
 * 更新选中的搜索结果
 */
function updateSelectedResult() {
    const items = document.querySelectorAll('.search-result-item');
    items.forEach((item, index) => {
        if (index === searchState.selectedIndex) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
            item.classList.remove('selected');
        }
    });
}

/**
 * 显示搜索面板
 */
function showSearchPanel() {
    const searchResults = document.getElementById('search-results');
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.getElementById('search-container');
    
    if (searchContainer) {
        searchContainer.classList.add('active');
    }
    
    if (searchResults && searchInput) {
        // 如果有搜索内容，显示结果；否则显示最近搜索
        if (searchInput.value.trim()) {
            handleSearchInput({ target: searchInput });
        } else {
            searchResults.style.display = 'block';
            showRecentSearches();
        }
    }
}

/**
 * 关闭搜索面板
 */
function closeSearchPanel() {
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');
    
    searchState.isOpen = false;
    searchState.selectedIndex = -1;
    
    if (searchResults) {
        searchResults.style.display = 'none';
    }
    
    if (searchContainer) {
        searchContainer.classList.remove('active');
    }
}

/**
 * 清除搜索结果
 */
function clearSearchResults() {
    const resultsList = document.getElementById('search-results-list');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('search-no-results');
    
    if (resultsList) resultsList.innerHTML = '';
    if (resultsCount) resultsCount.textContent = '';
    if (noResults) noResults.style.display = 'none';
    
    searchState.results = [];
    searchState.selectedIndex = -1;
    searchState.query = '';
}

/**
 * 保存最近搜索
 */
function saveRecentSearch(query) {
    if (!query || query.trim().length === 0) return;
    
    let recentSearches = JSON.parse(
        localStorage.getItem(SEARCH_CONFIG.recentSearchesKey) || '[]'
    );
    
    // 移除重复项
    recentSearches = recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase());
    
    // 添加到开头
    recentSearches.unshift(query.trim());
    
    // 限制数量
    recentSearches = recentSearches.slice(0, SEARCH_CONFIG.maxRecentSearches);
    
    localStorage.setItem(SEARCH_CONFIG.recentSearchesKey, JSON.stringify(recentSearches));
}

/**
 * 加载并显示最近搜索
 */
function loadRecentSearches() {
    const recentSearches = JSON.parse(
        localStorage.getItem(SEARCH_CONFIG.recentSearchesKey) || '[]'
    );
    
    return recentSearches;
}

/**
 * 显示最近搜索
 */
function showRecentSearches() {
    const recentSearchesContainer = document.getElementById('recent-searches');
    const recentList = document.getElementById('recent-list');
    const resultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('search-no-results');
    
    if (!recentSearchesContainer || !recentList) return;
    
    // 隐藏搜索结果
    if (resultsList) resultsList.style.display = 'none';
    if (noResults) noResults.style.display = 'none';
    
    const recentSearches = loadRecentSearches();
    
    if (recentSearches.length === 0) {
        recentSearchesContainer.style.display = 'none';
        return;
    }
    
    recentSearchesContainer.style.display = 'block';
    
    recentList.innerHTML = recentSearches.map(search => `
        <button class="recent-item" data-search="${escapeHtml(search)}">
            <span class="recent-icon">🕐</span>
            <span class="recent-text">${escapeHtml(search)}</span>
            <span class="recent-arrow">→</span>
        </button>
    `).join('');
    
    // 绑定点击事件
    recentList.querySelectorAll('.recent-item').forEach(item => {
        item.addEventListener('click', () => {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = item.dataset.search;
                handleSearchInput({ target: searchInput });
            }
        });
    });
}

/**
 * 转义 HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// 导出给全局使用
// ==========================================
window.HypertranceBlog = {
    loadArticles,
    loadArticleContent,
    formatDate,
    saveReadingProgress,
    getReadingProgress,
    initSearch,
    fuzzySearch
};
