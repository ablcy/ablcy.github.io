# Vercel 部署方案

## 为什么选 Vercel？

- ✅ 免费套餐 generous（100GB 带宽/月）
- ✅ 支持自定义域名（包括 `lcy.qd.je`）
- ✅ 自动 HTTPS
- ✅ GitHub 集成一键部署
- ✅ 国内访问速度较好

## 快速设置步骤

### 1. 注册/登录 Vercel
访问 https://vercel.com，用 GitHub 账号登录

### 2. 导入项目
1. 点击 **Add New Project**
2. 选择 `ablcy/ablcy.github.io`
3. 框架预设选择 **Other**（静态网站）
4. 点击 **Deploy**

### 3. 配置自定义域名
1. 进入项目 → **Settings** → **Domains**
2. 添加域名：`lcy.qd.je`
3. Vercel 会提供 DNS 记录，你需要在 `qd.je` 的 DNS 管理中添加

### 4. 配置 GitHub Secrets（可选，用于自动部署）

如果你希望用 GitHub Actions 部署，需要：

1. 在 Vercel 获取 Token：
   - Settings → Tokens → Create Token
   
2. 获取 Project ID 和 Org ID：
   - 项目根目录运行 `vercel` 命令，或查看项目设置

3. 在 GitHub Secrets 中添加：
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## DNS 配置

假设 `qd.je` 使用 Cloudflare DNS：

| 类型 | 名称 | 内容 |
|------|------|------|
| CNAME | lcy | cname.vercel-dns.com |

## 备选：Netlify

如果 Vercel 也有问题，Netlify 是另一个好选择：
- 拖拽文件夹即可部署
- 支持自定义域名
- 免费套餐够用

访问 https://app.netlify.com/drop 直接拖拽部署
