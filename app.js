// ===== 资源数据 =====
const resources = [
  // --- 电影/剧集 ---
  { name: "LIBVIO", icon: "🎬", origin: "LIBVIO", category: "movie", free: "full", tags: ["电影", "剧集", "动漫"], desc: "热门影视资源站，电影、电视剧、动漫、综艺一应俱全，播放体验流畅", url: "https://www.libvio.cc", featured: true },
  { name: "茶杯狐", icon: "🦊", origin: "茶杯狐", category: "movie", free: "full", tags: ["电影", "搜索", "聚合"], desc: "影视资源聚合搜索引擎，一键搜索全网影视站点，快速找到想看的影片", url: "https://www.cupfox.com", featured: false },
  { name: "低端影视", icon: "🎭", origin: "低端影视", category: "movie", free: "full", tags: ["电影", "剧集", "高清"], desc: "专注高清影视资源，电影电视剧资源丰富，更新速度快", url: "https://ddrk.me", featured: false },
  { name: "独播库", icon: "📺", origin: "独播库", category: "movie", free: "full", tags: ["电影", "剧集", "综艺"], desc: "综合影视站，涵盖电影、电视剧、综艺、动漫等多个分类", url: "https://www.duboku.tv", featured: false },
  { name: "电影狗", icon: "🐕", origin: "电影狗", category: "movie", free: "full", tags: ["搜索", "聚合", "电影"], desc: "影视资源聚合搜索，支持多个资源站同时搜索，快速定位播放源", url: "https://www.dianyinggou.com", featured: false },
  { name: "努努影院", icon: "🎥", origin: "努努影院", category: "movie", free: "full", tags: ["电影", "剧集", "动漫"], desc: "简洁清爽的影视站，资源覆盖面广，支持在线观看", url: "https://www.nunu.tv", featured: false },
  { name: "555电影", icon: "🎞️", origin: "555电影", category: "movie", free: "full", tags: ["电影", "剧集", "综艺"], desc: "老牌影视站，资源全面，电影电视剧综艺动漫都有", url: "https://www.555dyy.com", featured: false },
  { name: "黑洞影视", icon: "🕳️", origin: "黑洞影视", category: "movie", free: "full", tags: ["电影", "搜索", "聚合"], desc: "影视资源聚合搜索引擎，多个资源源同时检索", url: "https://www.blackhole.tv", featured: false },

  // --- 动漫 ---
  { name: "AGE动漫", icon: "🎌", origin: "AGE动漫", category: "anime", free: "full", tags: ["动漫", "番剧", "追番"], desc: "老牌动漫网站，新番连载+经典番剧库，追番神器", url: "https://www.agedm.org", featured: false },
  { name: "樱花动漫", icon: "🌸", origin: "樱花动漫", category: "anime", free: "full", tags: ["动漫", "番剧", "日漫"], desc: "专注日本动漫资源，新番更新快，画质选择多", url: "https://www.yhdm.io", featured: false },
  { name: "包子动漫", icon: "🥟", origin: "包子动漫", category: "anime", free: "full", tags: ["动漫", "番剧", "国漫"], desc: "涵盖日漫、国漫、美漫，资源丰富分类清晰", url: "https://www.baozimanhua.com", featured: false },

  // --- 音乐 ---
  { name: "方PI音乐", icon: "🎵", origin: "方PI", category: "music", free: "full", tags: ["音乐", "搜索", "下载"], desc: "免费音乐搜索与试听，多平台资源聚合，高品质音频", url: "https://www.fangpi.org", featured: true },
  { name: "铜钟音乐", icon: "🔔", origin: "铜钟", category: "music", free: "full", tags: ["音乐", "搜索", "无损"], desc: "高品质音乐搜索引擎，支持无损音质，多平台资源", url: "https://tongzhong.xyz", featured: false },
  { name: "音乐磁场", icon: "🧲", origin: "音乐磁场", category: "music", free: "full", tags: ["音乐", "在线", "播放"], desc: "在线音乐播放平台，海量歌曲免费收听，界面简洁", url: "https://www.hifini.com", featured: false },
  { name: "MyFreeMP3", icon: "🎶", origin: "MyFreeMP3", category: "music", free: "full", tags: ["音乐", "下载", "MP3"], desc: "免费MP3音乐下载站，资源量大，支持直接下载", url: "https://myfreemp3.vip", featured: false },
  { name: "Listen 1", icon: "🎧", origin: "Listen1", category: "music", free: "full", tags: ["音乐", "聚合", "工具"], desc: "开源音乐聚合工具，整合多平台资源，浏览器插件+桌面客户端", url: "https://listen1.github.io/listen1", featured: false },
  { name: "椒盐音乐", icon: "🧂", origin: "椒盐音乐", category: "music", free: "full", tags: ["音乐", "APP", "播放器"], desc: "开源Android本地音乐播放器，界面简洁，支持歌词显示", url: "https://github.com/Aux12/SaltPlayer", featured: false },

  // --- 电子书 ---
  { name: "鸠摩搜书", icon: "📚", origin: "鸠摩搜书", category: "ebook", free: "full", tags: ["电子书", "搜索", "多格式"], desc: "最知名的电子书搜索引擎，聚合多个书源，PDF/EPUB/MOBI全支持", url: "https://www.jiumodiary.com", featured: true },
  { name: "Z-Library", icon: "📖", origin: "Z-Library", category: "ebook", free: "full", tags: ["电子书", "学术", "海量"], desc: "全球最大的电子图书馆之一，千万级藏书，学术书籍丰富", url: "https://z-lib.org", featured: false },
  { name: "安娜的档案", icon: "🗂️", origin: "Anna's Archive", category: "ebook", free: "full", tags: ["电子书", "论文", "聚合"], desc: "全球最大的开源图书馆搜索引擎，聚合Z-Lib/LibGen等书源", url: "https://annas-archive.org", featured: false },
  { name: "书格", icon: "🏯", origin: "书格", category: "ebook", free: "full", tags: ["古籍", "公版", "高清"], desc: "自由开放的在线古籍图书馆，提供高清公版古籍影印本", url: "https://new.shuge.org", featured: false },
  { name: "苦瓜书盘", icon: "🥒", origin: "苦瓜书盘", category: "ebook", free: "full", tags: ["电子书", "精排", "EPUB"], desc: "高质量精排版电子书分享社区，EPUB格式为主，阅读体验极佳", url: "https://www.kugushu.com", featured: false },
  { name: "知轩藏书", icon: "📖", origin: "知轩藏书", category: "ebook", free: "full", tags: ["小说", "精校", "TXT"], desc: "网络小说精校版收藏站，大量热门小说的TXT精排版", url: "https://www.zxcs.info", featured: false },
  { name: "好读", icon: "📕", origin: "好读", category: "ebook", free: "full", tags: ["小说", "繁体", "下载"], desc: "老牌华文小说下载站，大量经典网络小说，繁简体兼有", url: "https://www.haodoo.net", featured: false },
  { name: "LoreFree", icon: "🌐", origin: "LoreFree", category: "ebook", free: "full", tags: ["电子书", "社区", "分享"], desc: "去中心化电子书共享社区，用户自发上传分享各类书籍", url: "https://lorefree.com", featured: false },

  // --- 有声书 ---
  { name: "喜马拉雅", icon: "🎙️", origin: "喜马拉雅", category: "audiobook", free: "partial", tags: ["有声书", "播客", "电台"], desc: "国内最大的有声阅读平台，海量有声书、播客、相声评书", url: "https://www.ximalaya.com", featured: false },
  { name: "懒人听书", icon: "😴", origin: "懒人听书", category: "audiobook", free: "partial", tags: ["有声书", "小说", "免费"], desc: "专注有声小说平台，大量免费有声读物，通勤必备", url: "https://www.lrts.me", featured: false },
  { name: "蜻蜓FM", icon: "🦟", origin: "蜻蜓FM", category: "audiobook", free: "partial", tags: ["有声书", "广播", "播客"], desc: "广播电台+有声书+播客综合平台，内容丰富", url: "https://www.qingting.fm", featured: false },

  // --- 公开课 ---
  { name: "中国大学MOOC", icon: "🎓", origin: "网易", category: "course", free: "full", tags: ["大学", "课程", "证书"], desc: "国内最大的在线课程平台，985/211名校课程免费学习", url: "https://www.icourse163.org", featured: false },
  { name: "B站", icon: "📺", origin: "哔哩哔哩", category: "course", free: "full", tags: ["视频", "教程", "知识"], desc: "国内最大的学习视频平台，大量免费教程和知识类UP主", url: "https://www.bilibili.com", featured: false },
  { name: "Coursera", icon: "🌐", origin: "Coursera", category: "course", free: "partial", tags: ["大学", "国际", "证书"], desc: "全球顶尖大学课程平台，支持免费旁听，付费拿证书", url: "https://www.coursera.org", featured: false },
  { name: "可汗学院", icon: "🧑‍🏫", origin: "Khan Academy", category: "course", free: "full", tags: ["教育", "数学", "科学"], desc: "非营利教育平台，从小学到大学的免费课程，数学理科尤其出色", url: "https://zh.khanacademy.org", featured: false },
  { name: "edX", icon: "🏛️", origin: "edX", category: "course", free: "partial", tags: ["大学", "国际", "MIT"], desc: "哈佛、MIT联合创办的在线学习平台，名校课程免费旁听", url: "https://www.edx.org", featured: false },
  { name: "OER", icon: "📚", origin: "OER", category: "course", free: "full", tags: ["教材", "开放", "教育"], desc: "开放教育资源平台，免费大学教材和课程资料", url: "https://oer.mit.edu", featured: false },

  // --- 工具 ---
  { name: "IDM", icon: "⬇️", origin: "Tonec", category: "tool", free: "partial", tags: ["下载", "加速", "工具"], desc: "最强的下载管理器，多线程加速下载，浏览器集成", url: "https://www.internetdownloadmanager.com", featured: false },
  { name: "Motrix", icon: "🚀", origin: "Motrix", category: "tool", free: "full", tags: ["下载", "开源", "跨平台"], desc: "开源免费下载工具，支持HTTP/FTP/BT/磁力，界面现代", url: "https://motrix.app", featured: false },
  { name: "qBittorrent", icon: "🌊", origin: "qBittorrent", category: "tool", free: "full", tags: ["BT", "下载", "开源"], desc: "开源BT下载客户端，无广告无捆绑，功能强大", url: "https://www.qbittorrent.org", featured: false },
  { name: "Calibre", icon: "📗", origin: "Calibre", category: "tool", free: "full", tags: ["电子书", "管理", "转换"], desc: "最强电子书管理工具，支持格式转换、编辑、整理个人书库", url: "https://calibre-ebook.com", featured: false },
  { name: "PotPlayer", icon: "▶️", origin: "PotPlayer", category: "tool", free: "full", tags: ["播放器", "视频", "解码"], desc: "Windows最强本地视频播放器，解码能力出色，支持硬解", url: "https://potplayer.daum.net", featured: false },
  { name: "VLC", icon: "🔶", origin: "VideoLAN", category: "tool", free: "full", tags: ["播放器", "跨平台", "开源"], desc: "开源万能播放器，支持几乎所有音视频格式，跨平台", url: "https://www.videolan.org", featured: false },
];

// ===== 分类名称映射 =====
const categoryNames = {
  all: "全部资源", movie: "电影/剧集", anime: "动漫",
  music: "音乐", ebook: "电子书", audiobook: "有声书",
  course: "公开课", tool: "工具"
};

// ===== State =====
let currentCategory = 'all';
let searchQuery = '';

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
let currentTheme = localStorage.getItem('yanread-theme') || 'dark';
applyTheme(currentTheme);

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('yanread-theme', theme);
}
themeToggle?.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});

// ===== Keyboard shortcut for search =====
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
  if (e.key === 'Escape') {
    document.getElementById('searchInput')?.blur();
    searchInput.value = '';
    searchQuery = '';
    renderTools();
  }
});

// ===== Search =====
const searchInput = document.getElementById('searchInput');
searchInput?.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderTools();
});

// ===== Category Filter =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    document.getElementById('sectionTitle').textContent = categoryNames[currentCategory] || '全部资源';
    renderTools();
  });
});

// ===== Render Tools =====
function getFilteredTools() {
  let filtered = resources;

  if (currentCategory !== 'all') {
    filtered = filtered.filter(t => t.category === currentCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(searchQuery) ||
      t.desc.toLowerCase().includes(searchQuery) ||
      t.origin.toLowerCase().includes(searchQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      (categoryNames[t.category] || '').includes(searchQuery)
    );
  }

  return filtered;
}

function renderTools() {
  const grid = document.getElementById('toolsGrid');
  const noResults = document.getElementById('noResults');
  const countLabel = document.getElementById('toolCountLabel');
  const filtered = getFilteredTools();

  countLabel.textContent = `${filtered.length} 个`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  grid.innerHTML = filtered.map((tool, i) => `
    <a href="${tool.url}" target="_blank" rel="noopener" class="tool-card" style="animation: fadeInUp 0.4s ease ${i * 0.04}s both">
      <div class="tool-card-glow"></div>
      <div class="tool-card-header">
        <div class="tool-icon">${tool.icon}</div>
        <div class="tool-card-info">
          <div class="tool-name">${tool.name}</div>
          <div class="tool-origin">${tool.origin}</div>
        </div>
        <span class="tool-arrow">→</span>
      </div>
      <p class="tool-desc">${tool.desc}</p>
      <div class="tool-card-footer">
        <div class="tool-tags">
          ${tool.tags.slice(0, 3).map(t => `<span class="mini-tag">${t}</span>`).join('')}
        </div>
        <span class="free-badge ${tool.free === 'full' ? 'full' : 'partial'}">
          ${tool.free === 'full' ? '免费' : '部分免费'}
        </span>
      </div>
    </a>
  `).join('');

  // Add hover glow effect
  grid.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const glow = card.querySelector('.tool-card-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(245,158,11,0.1) 0%, transparent 60%)`;
      }
    });
  });
}

// ===== Update tool count =====
function updateToolCount() {
  const el = document.getElementById('toolCount');
  if (el) {
    const target = resources.length;
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 30);
  }
}

// ===== Navbar scroll effect =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 20 ? '0 4px 20px rgba(0,0,0,0.3)' : 'none';
});

// ===== Entrance Animation CSS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== Init =====
updateToolCount();
renderTools();
