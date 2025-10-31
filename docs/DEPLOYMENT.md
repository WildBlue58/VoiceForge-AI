# 🚀 部署指南 - Vercel

> 📅 更新日期: 2024-10-31  
> 🎯 目标平台: Vercel

---

## ✅ 构建测试

项目已通过本地构建测试：

```bash
✅ pnpm build
   - 构建时间: 5.32s
   - 输出目录: dist/
   - 总大小: 0.96 MB
   - 文件数: 7 个
```

**构建输出：**

```
dist/
├── index.html (0.83 kB)
├── favicon.svg
└── assets/
    ├── index-CU2aZUQO.js (207.25 kB, gzip: 65.30 kB)
    ├── index-Cv1t-yve.css (38.87 kB, gzip: 7.04 kB)
    ├── vendor-gH-7aFTg.js (11.83 kB, gzip: 4.20 kB)
    ├── worker-Ds71nAvw.js (745.67 kB)
    └── transformers-l0sNRNKZ.js (0.00 kB)
```

---

## 📋 Vercel 部署步骤

### 方法 1: 通过 Vercel CLI（推荐）

1. **安装 Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署项目**

   ```bash
   vercel
   ```

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

---

### 方法 2: 通过 GitHub 集成（推荐用于持续部署）

1. **推送代码到 GitHub**

   ```bash
   git push origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Vite 项目

3. **配置项目设置**
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

4. **点击 Deploy**

---

### 方法 3: 使用 vercel.json（已配置）

项目已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Vercel 会自动识别此配置。

---

## ⚙️ 环境变量配置

项目目前不需要环境变量（完全离线运行）。

如果未来需要，可以在 Vercel 项目中设置：

1. 进入项目设置 → Environment Variables
2. 添加所需的变量

---

## 📊 构建配置说明

### Build Settings

- **Framework Preset**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
- **Node.js Version**: 18.x 或更高

### 路由配置

- 使用 SPA (Single Page Application) 路由
- 所有路由重定向到 `/index.html`
- Worker 文件单独加载（不影响路由）

---

## 🔍 常见问题

### 1. 构建失败

**问题**: 构建命令错误  
**解决**: 确保在 Vercel 设置中使用 `pnpm build`（不是 `npm run build`）

### 2. 页面空白

**问题**: 路由配置不正确  
**解决**: 已配置 `vercel.json` 中的 rewrites，确保所有路由指向 `index.html`

### 3. Worker 加载失败

**问题**: Worker 文件路径错误  
**解决**: Vite 构建会自动处理 Worker 路径，无需额外配置

### 4. 资源加载失败

**问题**: 静态资源路径问题  
**解决**: Vite 默认使用绝对路径，Vercel 会自动处理

---

## 📈 性能优化

### 已配置的优化

1. **代码分割**
   - Vendor chunk (React, React-DOM)
   - Transformers chunk (@xenova/transformers)
   - 主应用 chunk

2. **缓存策略**（vercel.json）
   - 静态资源：`max-age=31536000, immutable`
   - 长期缓存，提升加载速度

3. **Gzip 压缩**
   - Vercel 自动启用 Gzip
   - CSS: 38.87 kB → 7.04 kB (81% 压缩)
   - JS: 207.25 kB → 65.30 kB (68% 压缩)

---

## 🚨 部署注意事项

### ⚠️ 重要提示

1. **模型下载**
   - 首次访问需要下载 AI 模型（约 50-100 MB）
   - 下载后缓存在浏览器 IndexedDB
   - 后续访问完全离线

2. **Worker 文件大小**
   - Worker 文件较大（745.67 kB）
   - 这是正常的，包含 AI 模型加载逻辑
   - Vercel 会使用 CDN 加速加载

3. **浏览器兼容性**
   - 需要支持 Web Workers
   - 需要支持 IndexedDB
   - 推荐使用现代浏览器（Chrome, Firefox, Edge, Safari）

---

## 📝 部署检查清单

部署前确认：

- [x] 本地构建成功 (`pnpm build`)
- [x] 预览测试通过 (`pnpm preview`)
- [x] vercel.json 配置正确
- [x] package.json 构建脚本正确
- [x] 所有文件已提交到 Git
- [x] README.md 更新完成

---

## 🔗 部署后操作

### 1. 更新 GitHub 仓库描述

在 `docs/GITHUB_DESCRIPTION.md` 中更新网站地址：

```markdown
## Website（项目网站）

https://your-project.vercel.app
```

### 2. 更新 README.md

添加部署徽章：

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/voiceforge-ai)
```

### 3. 测试部署

访问部署后的 URL，测试：

- [x] 页面正常加载
- [x] 模型可以下载
- [x] 语音生成功能正常
- [x] 音频播放正常
- [x] 响应式设计正常

---

## 🎉 部署完成

部署成功后，你将获得：

- ✅ 生产环境 URL（如：`https://voiceforge-ai.vercel.app`）
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动部署（GitHub push 后自动更新）

---

<div align="center">

**🚀 开始部署，让 VoiceForge AI 上线吧！**

Made with ❤️ by [WildBlue58](https://github.com/WildBlue58)

</div>
