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
