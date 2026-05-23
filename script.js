// ===== 配置 =====
const html = document.documentElement;
let lang = localStorage.getItem('lang') || 'zh';

// ===== 主题切换 =====
let theme = localStorage.getItem('theme') || 'light';

function setTheme(t) {
    theme = t;
    localStorage.setItem('theme', t);
    html.setAttribute('data-theme', t);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
    // 同步粒子颜色
    if (window.__particleColorUpdate) window.__particleColorUpdate(t);
}

// 初始化主题按钮图标
(function(){
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '🌙' : '☀️';
})();

document.getElementById('themeToggle').addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));

// ===== 语言切换 =====
function setLang(l) {
    lang = l;
    localStorage.setItem('lang', l);
    html.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('[data-zh]').forEach(el => {
        el.textContent = el.getAttribute('data-' + l);
    });
    document.getElementById('langToggle').textContent = l === 'zh' ? 'EN' : '中';
    if (window.walineInstance) {
        walineInstance.update({ lang: l === 'zh' ? 'zh-CN' : 'en' });
    }
}

document.getElementById('langToggle').addEventListener('click', () => setLang(lang === 'zh' ? 'en' : 'zh'));
setLang(lang);

// ===== Hamburger 菜单 =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 点击菜单项关闭
mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== 自定义光标 =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
const isTouch = 'ontouchstart' in window;

if (!isTouch) {
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover 放大效果
    document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('follower-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('follower-hover');
        });
    });
} else {
    cursor.style.display = 'none';
    follower.style.display = 'none';
}

// ===== 磁性按钮 =====
if (!isTouch) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            el.style.transition = 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== Hero 入场动画 =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-name, .hero-stats, .hero-right');
    elements.forEach((el, i) => {
        setTimeout(() => el.classList.add('in-view'), i * 150 + 100);
    });
}

// 立即启动Hero动画（页面加载完成后）
if (document.readyState === 'complete') {
    animateHero();
} else {
    window.addEventListener('DOMContentLoaded', animateHero);
}

// ===== 数字滚动 =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            let current = 0;
            const step = Math.ceil(target / 30);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = current;
            }, 40);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== 滚动入场动画 =====
const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Work cards 逐个入场
            const cards = entry.target.querySelectorAll('.work-card, .contact-card');
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('in-view'), i * 100);
            });
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => scrollObserver.observe(s));

// ===== 导航高亮 + 滚动旋钮效果 =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // 导航背景
    nav.classList.toggle('nav-scrolled', scrollY > 50);
    // 高亮
    let current = '';
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 150) current = sec.id;
    });
    navLinks.forEach((link, index) => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('active', isActive);

        // 旋钮刻度效果：基于滚动位置的旋转和缩放
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollY / totalHeight;
        const centerIndex = navLinks.length / 2;
        const distance = index - centerIndex;

        if (!isActive) {
            const rotation = progress * 10 - distance * 2;
            const scale = 1 - Math.abs(distance) * 0.05 - progress * 0.1;
            const opacity = 1 - Math.abs(distance) * 0.1;
            link.style.transform = `rotate(${rotation}deg) scale(${Math.max(0.7, scale)})`;
            link.style.opacity = Math.max(0.4, opacity);
        } else {
            link.style.transform = 'scale(1.15)';
            link.style.opacity = '1';
        }
    });
});

// ===== 粒子背景 =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.opacity = Math.random() * 0.3 + 0.08;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const isDark = html.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark
            ? `rgba(139, 92, 246, ${this.opacity})`
            : `rgba(124, 58, 237, ${this.opacity * 0.6})`;
        ctx.fill();
    }
}

// 减少粒子数量以提升性能
const particleCount = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 15000));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

// 优化的粒子动画 - 使用 requestAnimationFrame 节流
let lastTime = 0;
const targetFPS = 30;
const interval = 1000 / targetFPS;

function animateParticles(timestamp) {
    if (timestamp - lastTime < interval) {
        requestAnimationFrame(animateParticles);
        return;
    }
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // 优化的连线算法 - 减少计算
    const connectDist = 100;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = dx * dx + dy * dy; // 避免开方运算
            if (dist < connectDist * connectDist) {
                const realDist = Math.sqrt(dist);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const isDark = html.getAttribute('data-theme') === 'dark';
                const alpha = isDark
                    ? 0.05 * (1 - realDist / connectDist)
                    : 0.03 * (1 - realDist / connectDist);
                ctx.strokeStyle = isDark
                    ? `rgba(139, 92, 246, ${alpha})`
                    : `rgba(124, 58, 237, ${alpha})`;
                ctx.lineWidth = 0.4;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
requestAnimationFrame(animateParticles);

// ===== Waline =====
let walineLoaded = false;
window.initWaline = function(Waline) {
    window.walineInstance = Waline.init({
        el: '#waline',
        serverURL: 'https://waline.luckyan.dpdns.org',
        lang: lang === 'zh' ? 'zh-CN' : 'en',
        dark: 'html[data-theme="dark"]',
        meta: ['nick', 'mail'],
        requiredMeta: [],
        login: 'disable',
        wordLimit: [0, 500],
        pageSize: 10,
    });
};

// 延迟加载 Waline - 当用户点击展开留言时才加载
const guestbookTrigger = document.getElementById('guestbookTrigger');
if (guestbookTrigger) {
    guestbookTrigger.addEventListener('click', function loadWalineOnce() {
        if (!walineLoaded) {
            walineLoaded = true;
            const script = document.createElement('script');
            script.type = 'module';
            script.textContent = `
                import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
                window.initWaline({ init });
            `;
            document.body.appendChild(script);
            guestbookTrigger.removeEventListener('click', loadWalineOnce);
        }
    });
}

// ===== 不蒜子统计 - 延迟加载 =====
setTimeout(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.body.appendChild(script);
}, 2000);

// ===== 网站运营时长 =====
(function() {
    const LAUNCH_DATE = new Date('2026-04-16T19:35:00+08:00');

    function formatRuntime() {
        const now = new Date();
        const diff = now - LAUNCH_DATE;
        if (diff < 0) return '0天';

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const l = window.__yan_lang || localStorage.getItem('lang') || 'zh';
        if (l === 'en') {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
        return `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
    }

    const el = document.getElementById('siteRuntime');
    if (el) {
        el.textContent = formatRuntime();
        setInterval(() => {
            el.textContent = formatRuntime();
        }, 1000);
    }

    const origSetLang = window.setLang;
    if (typeof origSetLang === 'function') {
        window.setLang = function(l) {
            origSetLang(l);
            window.__yan_lang = l;
        };
    }
})();

// ===== 折叠逻辑 =====
function setupCollapse(trigger, content, isOpen) {
    if (!trigger || !content) return;
    content.style.display = isOpen ? 'block' : 'none';
    trigger.classList.toggle('collapsed', !isOpen);

    trigger.addEventListener('click', () => {
        const open = content.style.display === 'none';
        content.style.display = open ? 'block' : 'none';
        trigger.classList.toggle('collapsed', !open);
    });
}

setupCollapse(
    document.getElementById('guestbookTrigger'),
    document.getElementById('guestbookContent'),
    false
);
setupCollapse(
    document.getElementById('changelogTrigger'),
    document.getElementById('changelogContent'),
    false
);

// ===== 微信弹窗 =====
(function(){
    const wechatCard = document.getElementById('wechatCard');
    const modal = document.getElementById('wechatModal');
    const close = document.getElementById('wechatModalClose');
    const bg = document.getElementById('wechatModalBg');
    if (!wechatCard || !modal) return;
    wechatCard.addEventListener('click', function(e){
        e.preventDefault();
        modal.classList.add('active');
    });
    function closeModal(){
        modal.classList.remove('active');
    }
    close.addEventListener('click', closeModal);
    bg.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') closeModal();
    });
})();
