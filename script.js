// ===== Configuration =====
const html = document.documentElement;
let lang = localStorage.getItem('lang') || 'zh';

// ===== Theme Toggle =====
let theme = localStorage.getItem('theme') || 'light';

function setTheme(t) {
    theme = t;
    localStorage.setItem('theme', t);
    html.setAttribute('data-theme', t);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = t === 'dark' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
}

(function () {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u{1F319}' : '\u{2600}\u{FE0F}';
})();

document.getElementById('themeToggle').addEventListener('click', () =>
    setTheme(theme === 'dark' ? 'light' : 'dark')
);

// ===== Language Toggle =====
function setLang(l) {
    lang = l;
    localStorage.setItem('lang', l);
    html.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    document.querySelectorAll('[data-zh]').forEach(el => {
        el.textContent = el.getAttribute('data-' + l);
    });
    document.getElementById('langToggle').textContent = l === 'zh' ? 'EN' : '\u4E2D';
    if (window.walineInstance) {
        walineInstance.update({ lang: l === 'zh' ? 'zh-CN' : 'en' });
    }
}

document.getElementById('langToggle').addEventListener('click', () =>
    setLang(lang === 'zh' ? 'en' : 'zh')
);
setLang(lang);

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Hero Entrance Animation =====
function animateHero() {
    const elements = document.querySelectorAll('.hero-left, .hero-name, .hero-stats, .hero-right');
    elements.forEach((el, i) => {
        setTimeout(() => el.classList.add('in-view'), i * 120 + 60);
    });
}

if (document.readyState === 'complete') {
    animateHero();
} else {
    window.addEventListener('DOMContentLoaded', animateHero);
}

// ===== Counter Animation =====
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

// ===== Scroll Entrance (IntersectionObserver) =====
const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            const cards = entry.target.querySelectorAll('.work-card, .contact-card');
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('in-view'), i * 70);
            });
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.section').forEach(s => scrollObserver.observe(s));

// ===== Nav Highlight + Scrolled State =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
    const scrollY = window.scrollY;
    nav.classList.toggle('nav-scrolled', scrollY > 50);

    let current = '';
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 150) current = sec.id;
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('active', isActive);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });

// ===== Waline =====
let walineLoaded = false;
window.initWaline = function (Waline) {
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

// ===== Busuanzi Stats (deferred) =====
setTimeout(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.body.appendChild(script);
}, 2000);

// ===== Site Runtime =====
(function () {
    const LAUNCH_DATE = new Date('2026-04-16T19:35:00+08:00');

    function formatRuntime() {
        const now = new Date();
        const diff = now - LAUNCH_DATE;
        if (diff < 0) return '0\u5929';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const l = window.__yan_lang || localStorage.getItem('lang') || 'zh';
        if (l === 'en') {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
        return `${days}\u5929 ${hours}\u65F6 ${minutes}\u5206 ${seconds}\u79D2`;
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
        window.setLang = function (l) {
            origSetLang(l);
            window.__yan_lang = l;
        };
    }
})();

// ===== Collapse Logic (Guestbook & Changelog) =====
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

// ===== WeChat Modal =====
(function () {
    const wechatCard = document.getElementById('wechatCard');
    const modal = document.getElementById('wechatModal');
    const close = document.getElementById('wechatModalClose');
    const bg = document.getElementById('wechatModalBg');
    if (!wechatCard || !modal) return;
    wechatCard.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('active');
    });
    function closeModal() {
        modal.classList.remove('active');
    }
    close.addEventListener('click', closeModal);
    bg.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
})();
