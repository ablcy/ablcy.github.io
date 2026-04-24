# Cloudflare Pages 部署指南

## 自动部署已配置 ✅

GitHub Actions 工作流已创建，位于 `.github/workflows/deploy-cloudflare.yml`

## 需要配置的 Secrets

在 GitHub 仓库设置中添加以下两个 Secrets：

### 1. CLOUDFLARE_API_TOKEN
**值**: （你的 Cloudflare API Token）

### 2. CLOUDFLARE_ACCOUNT_ID  
**值**: `ed761de4705e08d4733d34ab76effa4c`

## 配置步骤

1. 打开 https://github.com/ablcy/ablcy.github.io
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加 Name: `CLOUDFLARE_API_TOKEN`，Value: 你的 Token
5. 再次点击 **New repository secret**
6. 添加 Name: `CLOUDFLARE_ACCOUNT_ID`，Value: `ed761de4705e08d4733d34ab76effa4c`

## 触发部署

配置完成后，以下操作会自动触发部署：
- 推送代码到 `main` 分支
- 手动触发：Actions 标签 → 选择工作流 → Run workflow

## 自定义域名配置

部署成功后，需要在 Cloudflare 控制台添加自定义域名：

1. 登录 https://dash.cloudflare.com
2. 进入 **Workers & Pages** → 选择 `lcy-qd-je` 项目
3. 点击 **Custom domains** → **Set up a custom domain**
4. 输入: `lcy.qd.je`
5. 按照提示完成 DNS 配置

## 当前状态

- ✅ CNAME 已更新为 `lcy.qd.je`
- ✅ GitHub Actions 工作流已创建
- ⏳ 等待 GitHub Secrets 配置
- ⏳ 等待 Cloudflare 项目创建
- ⏳ 等待自定义域名配置