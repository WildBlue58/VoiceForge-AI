# Project Context

## Purpose

Transformer-TTS 是一个基于浏览器端的 AI 文本转语音应用，使用 Transformer.js 实现完全在客户端运行的深度学习推理，无需服务器支持，保护用户隐私并支持离线使用。

**目标**：

- 提供零服务器成本的 AI TTS 解决方案
- 实现高性能的浏览器端 AI 推理
- 优化用户体验，支持离线使用
- 打造可写入简历的高质量开源项目

## Tech Stack

- **前端框架**: React 19
- **构建工具**: Vite 6
- **样式方案**: Tailwind CSS 4（原子化 CSS）
- **AI 库**: @xenova/transformers 2.17.2（Transformer.js）
- **多线程**: Web Worker
- **包管理器**: pnpm

## Project Conventions

### Code Style

- **语言**: JavaScript（ES6+）
- **代码规范**: ESLint 配置（eslint.config.js）
- **注释语言**: 简体中文
- **命名约定**:
  - 组件文件: PascalCase（如 `AudioPlayer.jsx`）
  - 工具文件: camelCase（如 `utils.js`）
  - 常量文件: camelCase（如 `constants.js`）
  - CSS: Tailwind 原子类

### Architecture Patterns

- **组件化设计**: 功能拆分为独立的 React 组件
- **单例模式**: TTS 模型管道采用单例模式（MyTextToSpeechPipeline）
- **多线程架构**: Web Worker 处理 AI 模型加载和推理，主线程负责 UI
- **状态管理**: React Hooks（useState, useRef, useEffect）
- **懒加载**: 模型延迟加载，仅在需要时实例化

### Testing Strategy

- **当前状态**: 暂无测试（需要添加）
- **计划策略**:
  - 单元测试: Vitest + React Testing Library
  - 端到端测试: Playwright/Cypress（可选）
  - 目标覆盖率: 80%+

### Git Workflow

- **分支策略**: main 分支为主开发分支
- **提交规范**:
  - 使用简体中文编写提交信息
  - 格式: 动词开头，描述具体改动
  - 示例: "添加错误处理机制"、"优化音频播放逻辑"

## Domain Context

### AI 文本转语音流程

1. **Tokenizer**: 将文本转换为 token IDs
2. **Model**: 使用 token IDs 生成语音特征
3. **Vocoder**: 将语音特征合成为音频波形
4. **输出**: Blob 对象 → Object.createObjectURL → Audio 元素播放

### Web Worker 通信协议

- **主线程 → Worker**: 发送文本和音色参数
- **Worker → 主线程**: 返回状态消息
  - `initiate`: 模型开始加载
  - `progress`: 下载进度更新
  - `done`: 单个模型加载完成
  - `ready`: 所有模型就绪
  - `complete`: 音频生成完成

### 音色系统

- 支持多种预设音色（SPEAKERS 常量定义）
- 每种音色有对应的 speaker_id
- 默认音色: DEFAULT_SPEAKER

## Important Constraints

### 浏览器兼容性

- **必须支持**: Web Worker API
- **必须支持**: AudioContext API
- **必须支持**: Blob 和 URL.createObjectURL
- **推荐浏览器**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### 性能约束

- **模型大小**: 500MB+（三个子模型合计）
- **首次加载**: 预计 15-30 秒（取决于网络）
- **内存占用**: 需要至少 2GB 可用内存
- **推理时间**: 2-5 秒（取决于文本长度和设备性能）

### 用户体验约束

- 主线程必须保持流畅，不能因 AI 推理阻塞 UI
- 必须显示清晰的加载进度
- 必须有友好的错误提示（简体中文）
- 支持移动端访问

## External Dependencies

### Hugging Face Models

- **模型来源**: Hugging Face Hub
- **模型加载**: 通过 Transformer.js 自动下载
- **缓存策略**: 浏览器 Cache API 自动缓存
- **网络要求**: 首次使用需要网络连接下载模型

### CDN

- **Vite 静态资源**: 本地开发 / 生产构建
- **Tailwind CSS**: 通过 npm 包引入

### 无后端服务

- 完全在浏览器端运行
- 不依赖任何后端 API
- 所有数据处理在客户端完成
