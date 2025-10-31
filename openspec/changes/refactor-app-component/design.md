# Design: App.jsx 组件重构设计

> 📅 设计日期: 2024-10-31  
> 🎯 目标: 详细的重构技术设计方案

---

## 🏗️ 架构设计

### 1. 整体架构

```
┌─────────────────────────────────────────┐
│           App.jsx (主容器)              │
│  - 兼容性检查                           │
│  - 网络状态监控                         │
│  - UI 状态管理                          │
│  - 事件协调                             │
└─────────────────────────────────────────┘
              │
              ├─── useAudioGenerator (自定义 Hook)
              │     ├─ Worker 管理
              │     ├─ 状态管理 (ready, disabled, progress)
              │     └─ 语音生成逻辑
              │
              ├─── LoadingOverlay (加载遮罩)
              ├─── MainContentCard (主卡片容器)
              │     ├─ TextInputSection (文本输入)
              │     ├─ SpeakerSelector (音色选择)
              │     ├─ GenerateButton (生成按钮)
              │     └─ AudioPlayer (音频播放器)
              │
              ├─── Toast (通知)
              └─── NetworkStatus (网络状态)
```

---

## 📦 模块设计

### 1. useAudioGenerator Hook

**职责**: 管理 Worker 和语音生成流程

**接口设计**:

```typescript
interface UseAudioGeneratorReturn {
  ready: boolean | null; // 模型就绪状态
  disabled: boolean; // 禁用状态
  progressItems: ProgressItem[]; // 进度列表
  output: string | null; // 音频 Blob URL
  isLoading: boolean; // 是否加载中
  generateSpeech: (text: string, speakerId: string) => void;
}

function useAudioGenerator(
  isCompatible: boolean,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
): UseAudioGeneratorReturn;
```

**内部状态**:

- `ready`: null → false → true
- `disabled`: 生成中为 true
- `progressItems`: Worker 进度消息数组
- `output`: Blob URL 字符串

**生命周期**:

1. Mount: 创建 Worker（如果兼容）
2. Update: 处理 Worker 消息
3. Unmount: 清理 Worker 和 Blob URL

---

### 2. LoadingOverlay 组件

**职责**: 显示模型加载进度

**Props 设计**:

```typescript
interface LoadingOverlayProps {
  isLoading: boolean; // 是否显示
  progressItems: ProgressItem[]; // 进度项列表
}

interface ProgressItem {
  name: string; // 文件名
  file: string; // 文件路径
  progress: number; // 进度 0-100
}
```

**UI 特点**:

- 全屏遮罩（暗色背景 + 模糊）
- 加载图标 + 脉动动画
- 进度条列表
- 淡入淡出动画

---

### 3. TextInputSection 组件

**职责**: 文本输入和验证

**Props 设计**:

```typescript
interface TextInputSectionProps {
  text: string; // 文本内容
  onChange: (text: string) => void; // 变化回调
  onKeyDown: (e: KeyboardEvent) => void; // 键盘事件
  disabled: boolean; // 禁用状态
  maxLength: number; // 最大长度
}
```

**内部逻辑**:

- 字符计数显示
- 超限警告（红色高亮）
- 90% 警告（黄色提示）
- 键盘快捷键提示

---

### 4. SpeakerSelector 组件

**职责**: 音色选择

**Props 设计**:

```typescript
interface SpeakerSelectorProps {
  value: string; // 当前选中
  onChange: (value: string) => void; // 变化回调
  disabled: boolean; // 禁用状态
  speakers?: Record<string, string>; // 音色列表（可选）
}
```

**UI 特点**:

- 自定义样式的 select
- 自定义下拉箭头
- 禁用态样式
- Hover 效果

---

### 5. GenerateButton 组件

**职责**: 语音生成按钮

**Props 设计**:

```typescript
interface GenerateButtonProps {
  onClick: () => void; // 点击回调
  disabled: boolean; // 禁用状态
  isTextValid: boolean; // 文本是否有效
  isGenerating: boolean; // 是否生成中
}
```

**UI 状态**:

- Normal: 蓝色渐变 + 光效
- Hover: 放大 + 上移
- Active: 缩小
- Disabled: 灰色
- Generating: 加载图标 + 动画

---

### 6. MainContentCard 组件

**职责**: 主内容容器

**Props 设计**:

```typescript
interface MainContentCardProps {
  children: ReactNode; // 子内容
  title?: string; // 标题（可选）
  subtitle?: string; // 副标题（可选）
}
```

**UI 特点**:

- 玻璃态效果
- Logo + 标题区
- 阴影和边框
- 响应式布局

---

## 🔄 数据流设计

### 1. 语音生成流程

```
用户点击生成
    ↓
App.handleGenerateSpeech()
    ↓
验证文本和网络状态
    ↓
useAudioGenerator.generateSpeech(text, speakerId)
    ↓
Worker.postMessage({ text, speaker_id })
    ↓
Worker 处理
    ├─ "initiate" → 更新 progressItems
    ├─ "progress" → 更新进度
    ├─ "done" → 移除进度项
    ├─ "ready" → 设置 ready = true
    ├─ "complete" → 设置 output (Blob URL)
    └─ "error" → 显示错误 Toast
    ↓
UI 更新 (AudioPlayer 显示)
```

### 2. 状态同步

```
App.jsx
  ├─ text (UI state)
  ├─ selectedSpeaker (UI state)
  ├─ toast (UI state)
  └─ useAudioGenerator
       ├─ ready (shared)
       ├─ disabled (shared)
       ├─ progressItems (shared)
       └─ output (shared)
```

---

## 🎨 样式设计

### Tailwind 类名复用

**创建样式常量**:

```javascript
// src/styles/classNames.js
export const BUTTON_STYLES = {
  primary: "px-10 py-5 rounded-2xl font-bold text-white text-lg ...",
  disabled: "bg-gray-400 cursor-not-allowed ...",
};

export const INPUT_STYLES = {
  base: "w-full px-5 py-4 rounded-2xl border-2 transition-all ...",
  error: "border-red-300 focus:border-red-500 ...",
};
```

---

## 🧪 测试策略

### 1. Hook 测试

```javascript
// __tests__/hooks/useAudioGenerator.test.js
describe("useAudioGenerator", () => {
  it("should initialize worker when compatible", () => {});
  it("should handle worker messages", () => {});
  it("should cleanup on unmount", () => {});
});
```

### 2. 组件测试

```javascript
// __tests__/components/GenerateButton.test.jsx
describe("GenerateButton", () => {
  it("should call onClick when clicked", () => {});
  it("should be disabled when disabled prop is true", () => {});
  it("should show loading state when generating", () => {});
});
```

---

## 📊 性能优化

### 1. React.memo 使用

```javascript
// 纯展示组件使用 memo
export default React.memo(LoadingOverlay);
export default React.memo(TextInputSection);
export default React.memo(SpeakerSelector);
```

### 2. useCallback 优化

```javascript
// App.jsx
const handleTextChange = useCallback((newText) => {
  setText(newText);
}, []);

const handleGenerateSpeech = useCallback(() => {
  // ...
}, [text, selectedSpeaker, ready, isOnline]);
```

### 3. useMemo 优化

```javascript
// 避免重复计算
const isTextValid = useMemo(() => {
  return validateText(text, maxLength).isValid;
}, [text, maxLength]);
```

---

## 🔒 类型安全

### PropTypes 定义

```javascript
import PropTypes from "prop-types";

Component.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Component.defaultProps = {
  disabled: false,
};
```

---

## 📁 文件组织

### 最终目录结构

```
src/
├── App.jsx (150 行)
├── components/
│   ├── AudioPlayer.jsx
│   ├── ErrorBoundary.jsx
│   ├── Progress.jsx
│   ├── LoadingOverlay.jsx       ✨ 新增 (60 行)
│   ├── TextInputSection.jsx     ✨ 新增 (85 行)
│   ├── SpeakerSelector.jsx      ✨ 新增 (45 行)
│   ├── GenerateButton.jsx       ✨ 新增 (55 行)
│   ├── MainContentCard.jsx      ✨ 新增 (35 行)
│   └── ui/
│       ├── Toast.jsx
│       ├── CompatibilityWarning.jsx
│       └── NetworkStatus.jsx
├── hooks/
│   ├── useCompatibilityCheck.js
│   ├── useNetworkStatus.js
│   └── useAudioGenerator.js     ✨ 新增 (120 行)
└── utils/
    ├── validation.js
    ├── audio.js
    ├── browser.js
    └── wav.js
```

---

## 🎯 重构原则

1. **渐进式重构** - 每次改动小且可验证
2. **功能等价** - 重构不改变功能
3. **测试驱动** - 每步都要测试
4. **代码复审** - 重构后代码 review
5. **文档同步** - 及时更新文档

---

<div align="center">

**设计完成，准备开始实施！** 🚀

[查看提案](./proposal.md) | [查看任务](./tasks.md)

</div>
