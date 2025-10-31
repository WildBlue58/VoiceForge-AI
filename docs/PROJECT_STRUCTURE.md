# 📁 VoiceForge AI 项目结构

> 最后更新：2024-10-31

## 📂 目录结构概览

```
voiceforge-ai/
├── .github/                    # GitHub 配置
│   ├── workflows/
│   │   ├── ci.yml             # CI 工作流
│   │   └── deploy.yml         # 部署工作流
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .husky/                     # Git 钩子
│   └── pre-commit             # 提交前检查
│
├── docs/                       # 📚 项目文档
│   ├── ARCHITECTURE.md        # 架构文档
│   ├── CHANGELOG.md           # 变更日志
│   ├── GITHUB_DESCRIPTION.md  # GitHub 配置指南
│   ├── PROJECT_REBRANDING_SUMMARY.md  # 重命名总结
│   ├── PROJECT_SUMMARY.md     # 项目总结
│   ├── RESUME_HIGHLIGHTS.md   # 简历亮点
│   └── PROJECT_STRUCTURE.md   # 本文件
│
├── openspec/                   # OpenSpec 规范
│   ├── AGENTS.md              # AI 代理指南
│   ├── OPTIMIZATION_GUIDE.md  # 优化指南
│   ├── project.md             # 项目上下文
│   └── changes/               # 变更记录
│       └── optimize-project-to-resume-standard/
│           ├── proposal.md    # 提案
│           ├── design.md      # 设计文档
│           ├── tasks.md       # 任务清单
│           └── specs/         # 规范文档
│
├── public/                     # 静态资源
│   └── favicon.svg            # 网站图标
│
├── src/                        # 源代码
│   ├── components/            # React 组件
│   │   ├── AudioPlayer.jsx   # 音频播放器
│   │   ├── ErrorBoundary.jsx # 错误边界
│   │   ├── Progress.jsx      # 进度条
│   │   └── ui/               # UI 基础组件
│   │       ├── Toast.jsx
│   │       ├── CompatibilityWarning.jsx
│   │       └── NetworkStatus.jsx
│   │
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useCompatibilityCheck.js
│   │   └── useNetworkStatus.js
│   │
│   ├── utils/                 # 工具函数
│   │   ├── validation.js     # 输入验证
│   │   ├── audio.js          # 音频处理
│   │   ├── browser.js        # 浏览器检测
│   │   └── wav.js            # WAV 编码
│   │
│   ├── contexts/              # React Context（预留）
│   ├── services/              # 服务层（预留）
│   │
│   ├── App.jsx                # 主应用组件
│   ├── main.jsx               # 入口文件
│   ├── worker.js              # Web Worker（AI 推理）
│   ├── constants.js           # 常量定义
│   └── index.css              # 全局样式
│
├── .editorconfig              # 编辑器配置
├── .prettierrc                # Prettier 配置
├── .prettierignore            # Prettier 忽略文件
├── eslint.config.js           # ESLint 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── vite.config.js             # Vite 配置
├── package.json               # 项目依赖
├── pnpm-lock.yaml             # 锁定文件
├── index.html                 # HTML 入口
└── README.md                  # 项目说明

```

---

## 📋 文件分类说明

### 1. 配置文件 ⚙️

| 文件                 | 用途              | 位置   |
| -------------------- | ----------------- | ------ |
| `package.json`       | 项目依赖和脚本    | 根目录 |
| `vite.config.js`     | Vite 构建配置     | 根目录 |
| `tailwind.config.js` | Tailwind CSS 配置 | 根目录 |
| `eslint.config.js`   | ESLint 代码检查   | 根目录 |
| `.prettierrc`        | Prettier 格式化   | 根目录 |
| `.editorconfig`      | 编辑器统一配置    | 根目录 |

### 2. 文档文件 📚

| 文件                   | 用途         | 位置   |
| ---------------------- | ------------ | ------ |
| `README.md`            | 项目主文档   | 根目录 |
| `ARCHITECTURE.md`      | 架构设计文档 | docs/  |
| `CHANGELOG.md`         | 版本变更记录 | docs/  |
| `PROJECT_SUMMARY.md`   | 项目总结报告 | docs/  |
| `RESUME_HIGHLIGHTS.md` | 简历技术亮点 | docs/  |

### 3. 源代码文件 💻

#### 3.1 组件层（src/components/）

```
components/
├── AudioPlayer.jsx         # 自定义音频播放器（播放/暂停/进度/下载）
├── ErrorBoundary.jsx       # React 错误边界（捕获错误并显示降级 UI）
├── Progress.jsx            # 进度条组件（模型下载进度）
└── ui/                     # UI 基础组件
    ├── Toast.jsx           # 通知组件（success/error/info）
    ├── CompatibilityWarning.jsx  # 浏览器兼容性警告
    └── NetworkStatus.jsx   # 网络状态提示
```

#### 3.2 业务逻辑层（src/hooks/）

```
hooks/
├── useCompatibilityCheck.js  # 浏览器兼容性检查 Hook
└── useNetworkStatus.js       # 网络状态监控 Hook
```

#### 3.3 工具层（src/utils/）

```
utils/
├── validation.js          # 输入验证（文本长度、格式检查）
├── audio.js               # 音频处理（Blob URL、下载、格式化）
├── browser.js             # 浏览器检测（兼容性、设备信息）
└── wav.js                 # WAV 编码（音频格式转换）
```

#### 3.4 核心文件

```
src/
├── App.jsx               # 主应用组件（UI + 状态管理）
├── main.jsx              # 应用入口（ReactDOM.render + ErrorBoundary）
├── worker.js             # Web Worker（AI 推理、模型管理）
├── constants.js          # 常量定义（音色配置、限制）
└── index.css             # 全局样式（Tailwind + 自定义动画）
```

---

## 🗂️ 目录职责

### src/ - 源代码

所有应用源代码，按照模块化架构组织：

- **components/** - 可复用的 React 组件
- **hooks/** - 自定义 React Hooks
- **utils/** - 纯函数工具集
- **contexts/** - React Context（预留）
- **services/** - 服务层（预留）

### docs/ - 文档

项目相关的所有文档：

- 架构文档
- 技术文档
- 简历材料
- 配置指南

### openspec/ - 规范文档

OpenSpec 驱动开发的规范和变更记录：

- 项目上下文
- 优化提案
- 设计文档
- 任务清单

### .github/ - GitHub 配置

GitHub 相关配置：

- CI/CD 工作流
- Issue 模板
- PR 模板

### public/ - 静态资源

直接复制到构建输出的静态文件：

- 网站图标（favicon.svg）
- 其他静态资源

---

## 📊 代码组织原则

### 1. 模块化分层

```
展示层（UI）
    ↓
业务逻辑层（Hooks）
    ↓
工具层（Utils）
```

### 2. 职责单一

每个文件/模块只负责一个明确的职责：

- ✅ `AudioPlayer.jsx` - 只负责音频播放
- ✅ `validation.js` - 只负责输入验证
- ✅ `useNetworkStatus.js` - 只负责网络状态

### 3. 依赖关系清晰

```
App.jsx
  ↓ 导入
components/, hooks/
  ↓ 导入
utils/
  ↓ 不依赖任何业务代码
```

---

## 🔍 快速查找指南

### 需要修改 UI？

👉 查看 `src/components/` 和 `src/App.jsx`

### 需要添加工具函数？

👉 添加到 `src/utils/`，按功能分类

### 需要添加自定义 Hook？

👉 添加到 `src/hooks/`

### 需要修改样式？

👉 查看 `src/index.css` 和 `tailwind.config.js`

### 需要修改 AI 逻辑？

👉 查看 `src/worker.js`

### 需要查看文档？

👉 查看 `docs/` 目录

---

## 🎯 文件命名规范

### 组件文件

- 使用 **PascalCase**
- 例如：`AudioPlayer.jsx`, `ErrorBoundary.jsx`

### 工具文件

- 使用 **camelCase**
- 例如：`validation.js`, `audio.js`

### 配置文件

- 使用 **kebab-case** 或工具默认名称
- 例如：`vite.config.js`, `.prettierrc`

### 文档文件

- 使用 **SCREAMING_SNAKE_CASE** + `.md`
- 例如：`README.md`, `ARCHITECTURE.md`

---

## 🚀 新文件添加指南

### 添加新组件

```bash
# 1. 在 src/components/ 创建文件
src/components/NewComponent.jsx

# 2. 添加 PropTypes 类型检查
import PropTypes from 'prop-types';

# 3. 导出组件
export default NewComponent;
```

### 添加新工具函数

```bash
# 1. 在 src/utils/ 创建文件
src/utils/newUtil.js

# 2. 导出函数（带 JSDoc 注释）
/**
 * 函数说明
 * @param {type} param - 参数说明
 * @returns {type} 返回值说明
 */
export function newFunction(param) {
  // ...
}
```

### 添加新文档

```bash
# 1. 在 docs/ 创建文件
docs/NEW_DOC.md

# 2. 添加到 README.md 的文档列表
```

---

## 📌 注意事项

### ✅ 应该做的

- 保持目录结构清晰
- 遵循命名规范
- 及时更新文档
- 单个文件不超过 500 行
- 组件拆分合理

### ❌ 不应该做的

- 在根目录堆积文件
- 混乱的命名
- 循环依赖
- 过度耦合
- 缺少注释

---

## 🔄 项目结构演进历史

### v1.0.0 (2024-10-01)

- 初始结构
- 基本的 TTS 功能

### v2.0.0 (2024-10-31)

- ✨ 重构目录结构
- 📁 创建 docs/ 目录
- 🧹 清理冗余文件
- 📚 完善文档体系
- 🎨 统一命名规范

---

<div align="center">

**📂 清晰的项目结构是高质量代码的基础**

Made with ❤️ by [WildBlue58](https://github.com/WildBlue58)

</div>
