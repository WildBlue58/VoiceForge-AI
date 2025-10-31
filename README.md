# 🎙️ VoiceForge AI - 声铸 | 端模型AI语音铸造工坊

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC?logo=tailwind-css)
![Transformers.js](https://img.shields.io/badge/Transformers.js-2.17.2-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-2.0.0-green)

**🔥 AI驱动的浏览器端语音铸造工坊 | 零服务器 · 完全离线 · 极致隐私**

[在线演示](#) · [功能特性](#-功能特性) · [技术栈](#-技术栈) · [快速开始](#-快速开始)

</div>

---

## 📂 项目结构

完整的项目结构说明请查看：[📁 PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)

```
voiceforge-ai/
├── docs/                      # 📚 项目文档
├── src/
│   ├── components/            # React 组件
│   ├── hooks/                 # 自定义 Hooks
│   ├── utils/                 # 工具函数
│   ├── App.jsx                # 主应用
│   └── worker.js              # Web Worker（AI推理）
├── public/                    # 静态资源
└── openspec/                  # 规范文档
```

---

## 📖 项目简介

**VoiceForge AI（声铸）** 是一个革命性的浏览器端 AI 文本转语音应用，基于 **Transformer.js** 技术，将强大的 AI 语音合成能力直接带入您的浏览器。如同声音的铸造工坊，我们用前沿的深度学习技术，在浏览器中"铸造"出自然流畅的人声。

### 🎯 核心理念

> "将AI的力量铸造成声音，让技术在浏览器中自由流淌"

VoiceForge AI 的核心特点是**完全在客户端运行 AI 推理**，无需后端服务器，实现了低延迟、高隐私、离线可用的语音合成体验。这不仅是一个TTS应用，更是浏览器端AI能力的完美展示。

### 🎯 核心优势

- 🌐 **零服务器依赖** - 所有计算在浏览器端完成，保护用户隐私
- 🚀 **离线可用** - 模型缓存后支持完全离线使用
- ⚡ **低延迟** - 无需网络请求，实时生成语音
- 🎨 **现代化UI** - 蓝色渐变主题 + 玻璃态设计 + 流畅动画
- 🛡️ **健壮性** - 完善的错误处理、兼容性检查、网络状态监控

---

## ✨ 功能特性

### 核心功能

- ✅ 文本转语音（支持多种音色）
- ✅ 实时字符计数（1000字符限制）
- ✅ 自定义音频播放器（播放/暂停/进度条/下载）
- ✅ 模型下载进度可视化
- ✅ 一键下载生成的语音文件

### 用户体验

- ✅ 键盘快捷键（Ctrl+Enter 快速生成）
- ✅ Toast 通知系统
- ✅ 网络状态实时监控
- ✅ 浏览器兼容性自动检测
- ✅ 响应式设计（支持移动端）

### 错误处理

- ✅ React 错误边界（捕获组件错误）
- ✅ Worker 错误处理（模型加载失败重试）
- ✅ 输入验证（文本长度、格式检查）
- ✅ 兼容性警告（缺失功能提示）

---

## 🛠️ 技术栈

### 前端框架

- **React 19** - 最新版本的 React
- **Vite 6** - 快速的前端构建工具
- **Tailwind CSS 4** - 原子化 CSS 框架

### AI/机器学习

- **Transformer.js** - Hugging Face 的浏览器端 AI 库
- **SpeechT5** - Microsoft 的语音合成模型
- **Web Worker** - 隔离 AI 推理，避免阻塞主线程

### 工程化

- **ESLint** - 代码规范检查
- **PropTypes** - 运行时类型检查
- **EditorConfig** - 统一编辑器配置

### UI/UX

- **Lucide React** - 现代化图标库
- **CSS Animations** - 自定义动画（渐变、淡入、滑动）
- **Glassmorphism** - 玻璃态设计风格

---

## 🏗️ 项目架构

```markdown
src/
├── components/ # React 组件
│ ├── AudioPlayer.jsx # 音频播放器组件
│ ├── ErrorBoundary.jsx # 错误边界组件
│ ├── Progress.jsx # 进度条组件
│ └── ui/ # UI 基础组件
│ ├── Toast.jsx # 通知组件
│ ├── CompatibilityWarning.jsx # 兼容性警告
│ └── NetworkStatus.jsx # 网络状态提示
├── hooks/ # 自定义 Hooks
│ ├── useCompatibilityCheck.js # 浏览器兼容性检查
│ └── useNetworkStatus.js # 网络状态监控
├── utils/ # 工具函数
│ ├── validation.js # 输入验证工具
│ ├── audio.js # 音频处理工具
│ └── browser.js # 浏览器检测工具
├── App.jsx # 主应用组件
├── worker.js # Web Worker（AI 推理）
├── utils.js # WAV 编码工具
└── constants.js # 常量定义（音色配置）
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm / npm / yarn

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
pnpm dev
# 或
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
pnpm build
# 或
npm run build
```

构建产物将生成在 `dist/` 目录。

---

## 💡 核心技术实现

### 1. **单例模式 - AI 模型管理**

```javascript
class MyTextToSpeechPipeline {
  static tokenizer_instance = null;
  static model_instance = null;
  static vocoder_instance = null;

  static async getInstance(progress_callback) {
    // 确保模型只实例化一次
    if (this.model_instance === null) {
      this.model_instance = SpeechT5ForTextToSpeech.from_pretrained(...);
    }
    // ...
  }
}
```

**优势**：

- 避免重复下载和实例化模型（节省内存和时间）
- 支持懒加载（首次使用时才下载）

### 2. **Web Worker 隔离计算**

```javascript
// 主线程
worker.current = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

// Worker 线程（worker.js）
self.onmessage = async (e) => {
  const [tokenizer, model, vocoder] =
    await MyTextToSpeechPipeline.getInstance();
  // AI 推理...
};
```

**优势**：

- AI 推理不阻塞 UI 渲染
- 提升用户体验（界面保持流畅）

### 3. **音色特征缓存**

```javascript
const speaker_embeddings_cache = new Map();

// 首次下载后缓存
if (!speaker_embeddings_cache.has(speaker_id)) {
  const embeddings = await getSpeakerEmbeddings(speaker_id);
  speaker_embeddings_cache.set(speaker_id, embeddings);
}
```

**优势**：

- 避免重复下载音色文件
- 提升切换音色的速度

### 4. **自定义 Hooks - 关注点分离**

```javascript
// 浏览器兼容性检查
const { isCompatible, missingFeatures } = useCompatibilityCheck();

// 网络状态监控
const { isOnline, wasOffline } = useNetworkStatus();
```

**优势**：

- 逻辑复用
- 代码清晰易维护

### 5. **Blob URL 内存管理**

```javascript
// 创建 URL
const blobUrl = URL.createObjectURL(blob);

// 使用完毕后释放
useEffect(() => {
  return () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  };
}, [blobUrl]);
```

**优势**：

- 防止内存泄漏
- 优化浏览器性能

---

## 📊 性能优化

### 1. **代码分割**

- Vite 自动分割 `vendor` 和 `transformers` chunk
- 减小首次加载体积

### 2. **路径别名**

```javascript
// vite.config.js
alias: {
  '@': path.resolve(__dirname, './src'),
  '@utils': path.resolve(__dirname, './src/utils'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  // ...
}
```

### 3. **PropTypes 类型检查**

- 运行时捕获类型错误
- 提升代码健壮性

---

## 🎨 UI 设计亮点

### 1. **蓝色渐变主题**

- 主色调：`#3b82f6 (Blue) → #06b6d4 (Cyan)`
- 统一的视觉风格

### 2. **玻璃态设计（Glassmorphism）**

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### 3. **丰富的动画**

- 淡入动画（fadeIn）
- 滑入动画（slideUp）
- 缩放动画（scale-in）
- 脉动动画（pulse-ring）
- 渐变动画（gradient-x）

### 4. **自定义音频播放器**

- 可交互进度条
- 播放/暂停控制
- 时间显示（当前/总时长）
- 一键下载功能

---

## 🐛 错误处理

### 1. **ErrorBoundary 组件**

- 捕获 React 组件树中的 JavaScript 错误
- 显示友好的错误界面
- 提供故障排除建议

### 2. **Worker 错误处理**

- 模型加载失败重试
- 网络请求超时处理
- 输入验证（文本长度、格式）

### 3. **兼容性检查**

- 检测 Web Worker 支持
- 检测 AudioContext 支持
- 检测 IndexedDB 支持
- 检测 Blob 支持

### 4. **网络状态监控**

- 实时监听在线/离线状态
- 显示网络断开警告
- 显示网络恢复提示

---

## 📝 简历技术亮点总结

### 前端工程化

✅ **模块化架构设计** - 组件化、工具层、Hooks 层清晰分离  
✅ **单例模式** - 优化 AI 模型内存占用  
✅ **Web Worker 多线程** - 避免 AI 推理阻塞 UI  
✅ **Blob URL 内存管理** - 防止内存泄漏

### 用户体验优化

✅ **错误边界** - 优雅处理运行时错误  
✅ **兼容性检查** - 自动检测浏览器功能  
✅ **网络监控** - 离线/在线状态提示  
✅ **Toast 通知系统** - 友好的用户反馈

### UI/UX 设计

✅ **现代化设计系统** - Tailwind CSS + 自定义主题  
✅ **玻璃态效果** - 半透明 + 模糊背景  
✅ **流畅动画** - CSS 动画 + 过渡效果  
✅ **响应式设计** - 移动端/桌面端适配

### AI/机器学习

✅ **浏览器端 AI 推理** - Transformer.js  
✅ **模型懒加载** - 首次使用时下载  
✅ **音色缓存策略** - Map 数据结构优化性能  
✅ **离线可用** - 模型本地缓存

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- [Hugging Face](https://huggingface.co/) - 提供 Transformer.js 和预训练模型
- [Microsoft](https://github.com/microsoft/SpeechT5) - SpeechT5 模型
- [Xenova](https://github.com/xenova) - Transformer.js 维护者

---

## 📧 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request！

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star！⭐**

Made with ❤️ by [WildBlue58]

</div>
