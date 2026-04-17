// ===== YanLink - 短链接生成器 =====

const STORAGE_KEY = 'yanlink_data';
const BASE_URL = window.location.origin + window.location.pathname;

// ===== Data Management =====
function getLinks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch { return []; }
}

function saveLinks(links) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function generateId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ===== Shorten URL =====
function shortenUrl(originalUrl, customAlias) {
  const links = getLinks();
  let alias = customAlias ? customAlias.trim().toLowerCase() : '';

  if (alias) {
    if (!/^[a-z0-9_-]+$/.test(alias)) {
      return { error: '别名只能包含小写字母、数字、- 和 _' };
    }
    if (links.find(l => l.alias === alias)) {
      return { error: '该别名已被使用，请换一个' };
    }
  } else {
    do {
      alias = generateId();
    } while (links.find(l => l.alias === alias));
  }

  const link = {
    id: Date.now().toString(36),
    alias,
    original: originalUrl,
    short: `${BASE_URL}#/${alias}`,
    clicks: 0,
    created: new Date().toISOString()
  };

  links.unshift(link);
  saveLinks(links);
  return { link };
}

// ===== Redirect Handler =====
function handleRedirect() {
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const alias = hash.slice(2);
    const links = getLinks();
    const link = links.find(l => l.alias === alias);
    if (link) {
      link.clicks++;
      saveLinks(links);
      window.location.href = link.original;
      return true;
    }
  }
  return false;
}

// ===== Theme Toggle =====
function initTheme() {
  const saved = localStorage.getItem('yanlink_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  updateThemeIcon();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('yanlink_theme', next);
  updateThemeIcon();
}

function updateThemeIcon() {
  const theme = document.documentElement.getAttribute('data-theme');
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ===== Navigation =====
function initNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      showSection(section);
    });
  });
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const section = document.getElementById(name);
  const navLink = document.querySelector(`.nav-link[data-section="${name}"]`);
  if (section) section.classList.add('active');
  if (navLink) navLink.classList.add('active');
  if (name === 'manage') renderLinksList();
}

// ===== Create Short Link =====
function initCreate() {
  const urlInput = document.getElementById('urlInput');
  const aliasInput = document.getElementById('customAlias');
  const shortenBtn = document.getElementById('shortenBtn');
  const result = document.getElementById('result');
  const resultUrl = document.getElementById('resultUrl');
  const error = document.getElementById('error');
  const copyBtn = document.getElementById('copyBtn');
  const openBtn = document.getElementById('openBtn');

  function isValidUrl(str) {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch { return false; }
  }

  shortenBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
      showError('请输入链接地址');
      return;
    }
    if (!isValidUrl(url)) {
      showError('请输入有效的 URL（以 http:// 或 https:// 开头）');
      return;
    }

    const alias = aliasInput.value.trim();
    const res = shortenUrl(url, alias);

    if (res.error) {
      showError(res.error);
      return;
    }

    result.style.display = 'block';
    error.style.display = 'none';
    resultUrl.textContent = res.link.short;

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(res.link.short).then(() => {
        showToast('✅ 链接已复制到剪贴板');
      });
    };

    openBtn.onclick = () => {
      window.open(res.link.short, '_blank');
    };

    updateStats();
  });

  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') shortenBtn.click();
  });

  aliasInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') shortenBtn.click();
  });

  function showError(msg) {
    error.textContent = msg;
    error.style.display = 'block';
    result.style.display = 'none';
  }
}

// ===== Stats =====
function updateStats() {
  const links = getLinks();
  const totalLinks = document.getElementById('totalLinks');
  const totalClicks = document.getElementById('totalClicks');
  if (totalLinks) totalLinks.textContent = links.length;
  if (totalClicks) totalClicks.textContent = links.reduce((sum, l) => sum + (l.clicks || 0), 0);
}

// ===== Links List =====
function renderLinksList(filter = '') {
  const links = getLinks();
  const list = document.getElementById('linksList');
  const empty = document.getElementById('emptyState');
  const actions = document.getElementById('manageActions');

  const filtered = filter
    ? links.filter(l =>
        l.alias.includes(filter.toLowerCase()) ||
        l.original.includes(filter.toLowerCase())
      )
    : links;

  if (links.length === 0) {
    list.innerHTML = '';
    list.appendChild(createEmptyState());
    actions.style.display = 'none';
    return;
  }

  actions.style.display = 'flex';

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state"><span class="empty-icon">🔍</span><p>没有找到匹配的链接</p></div>';
    return;
  }

  list.innerHTML = filtered.map(link => `
    <div class="link-item" data-id="${link.id}">
      <div class="link-info">
        <div class="link-short" onclick="copyShortLink('${link.short}')" title="点击复制">${link.alias}</div>
        <div class="link-original" title="${link.original}">${link.original}</div>
        <div class="link-meta">
          <span class="link-clicks">👆 ${link.clicks || 0}</span>
          <span class="link-date">${formatDate(link.created)}</span>
        </div>
      </div>
      <div class="link-actions">
        <button class="btn btn-copy btn-sm" onclick="copyShortLink('${link.short}')">📋</button>
        <button class="btn btn-secondary btn-sm" onclick="openOriginal('${link.original}')">↗️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteLink('${link.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

function createEmptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.id = 'emptyState';
  div.innerHTML = `
    <span class="empty-icon">📭</span>
    <p>还没有创建任何短链接</p>
    <a href="#create" class="btn btn-primary btn-sm" onclick="showSection('create')">去创建</a>
  `;
  return div;
}

function copyShortLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    showToast('✅ 链接已复制');
  });
}

function openOriginal(url) {
  window.open(url, '_blank');
}

function deleteLink(id) {
  if (!confirm('确定删除这个链接吗？')) return;
  const links = getLinks().filter(l => l.id !== id);
  saveLinks(links);
  renderLinksList(document.getElementById('searchInput')?.value || '');
  updateStats();
  showToast('🗑️ 链接已删除');
}

function clearAll() {
  if (!confirm('确定清空所有链接吗？此操作不可恢复！')) return;
  saveLinks([]);
  renderLinksList();
  updateStats();
  showToast('🗑️ 所有链接已清空');
}

function exportData() {
  const links = getLinks();
  const blob = new Blob([JSON.stringify(links, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yanlink-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 数据已导出');
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error();
      const links = getLinks();
      const existing = new Set(links.map(l => l.alias));
      let imported = 0;
      data.forEach(item => {
        if (item.alias && item.original && !existing.has(item.alias)) {
          links.unshift({
            id: item.id || Date.now().toString(36) + imported,
            alias: item.alias,
            original: item.original,
            short: `${BASE_URL}#/${item.alias}`,
            clicks: item.clicks || 0,
            created: item.created || new Date().toISOString()
          });
          existing.add(item.alias);
          imported++;
        }
      });
      saveLinks(links);
      renderLinksList();
      updateStats();
      showToast(`📤 成功导入 ${imported} 个链接`);
    } catch {
      showToast('❌ 导入失败，文件格式错误');
    }
  };
  reader.readAsText(file);
}

// ===== Search =====
function initSearch() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.addEventListener('input', (e) => {
      renderLinksList(e.target.value);
    });
  }
}

// ===== Toast =====
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Date Format =====
function formatDate(isoStr) {
  const d = new Date(isoStr);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} 天前`;
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  // Handle redirect first
  if (handleRedirect()) return;

  initTheme();
  initNav();
  initCreate();
  initSearch();
  updateStats();

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const result = document.getElementById('result');
      const error = document.getElementById('error');
      if (result) result.style.display = 'none';
      if (error) error.style.display = 'none';
    }
  });

  // Theme toggle
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

  // Manage actions
  document.getElementById('clearAllBtn')?.addEventListener('click', clearAll);
  document.getElementById('exportBtn')?.addEventListener('click', exportData);
  document.getElementById('importBtn')?.addEventListener('click', () => {
    document.getElementById('importFile')?.click();
  });
  document.getElementById('importFile')?.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      importData(e.target.files[0]);
      e.target.value = '';
    }
  });

  // Hash change handler
  window.addEventListener('hashchange', () => {
    handleRedirect();
  });
});
