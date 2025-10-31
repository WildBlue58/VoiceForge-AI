# 项目优化技术设计

## Context

Transformer-TTS 是一个基于 React 和 Transformer.js 的浏览器端 AI 文本转语音应用。当前项目具备核心功能，但在工程化实践方面存在不足：

**现状问题**:

- 所有逻辑集中在 App.jsx（~170 行），难以维护
- 缺少错误处理，应用容易崩溃
- 无测试覆盖，代码质量无法保证
- 文档简单，无法展现技术深度
- 无性能优化，首次加载体验差
- 无 CI/CD 流程，部署依赖手动

**目标**:
将项目提升至可以自信写入简历的专业水平，展现全面的前端工程能力。

## Goals / Non-Goals

### Goals

1. **工程质量**: 代码结构清晰，易于维护，有完整的错误处理
2. **测试覆盖**: 单元测试覆盖率达到 80%+，关键路径有集成测试
3. **性能优化**: Lighthouse 分数 90+，支持离线使用
4. **文档完善**: README 专业完整，突出技术亮点
5. **自动化**: CI/CD 流程完整，自动 lint/test/deploy
6. **可展示性**: 有量化数据支撑，适合面试展示

### Non-Goals

- 不添加新的业务功能（TTS 核心功能已足够）
- 不进行视觉设计大改版（Tailwind 样式已经可以）
- 不强制迁移 TypeScript（保持简单，避免过度工程化）
- 不引入复杂的状态管理库（Redux/MobX，Context API 足够）

## Decisions

### 决策 1: 组件拆分策略

**决定**: 按功能和复用性拆分组件，创建三层结构

```
src/
├── components/
│   ├── ui/                    # 通用 UI 组件（Button, Input, Card）
│   ├── TextInput.jsx          # 文本输入区域
│   ├── SpeakerSelector.jsx    # 音色选择器
│   ├── GenerateButton.jsx     # 生成按钮
│   ├── LoadingOverlay.jsx     # 加载遮罩
│   ├── AudioPlayer.jsx        # 音频播放器（已存在，优化）
│   └── Progress.jsx           # 进度条（已存在，保持）
├── hooks/
│   ├── useTextToSpeech.js     # TTS 核心逻辑
│   └── useAudioPlayer.js      # 音频播放逻辑
├── contexts/
│   └── TTSContext.jsx         # 全局状态管理
├── services/
│   ├── ttsService.js          # TTS 业务逻辑
│   └── audioService.js        # 音频处理逻辑
└── utils/
    ├── audio.js               # 音频工具函数
    └── validation.js          # 输入验证
```

**理由**:

- 单一职责：每个组件只负责一个功能
- 易于测试：小组件更容易编写测试
- 代码复用：ui/ 目录的组件可以在其他项目使用
- 渐进式：可以逐步重构，不影响现有功能

**备选方案**:

- **方案 A**: 使用 feature-based 目录结构（features/tts/, features/audio/）
  - 缺点：项目规模小，过度设计
- **方案 B**: 保持当前扁平结构
  - 缺点：不利于展现架构能力

### 决策 2: 状态管理方案

**决定**: 使用 Context API + Custom Hooks

**实现**:

```javascript
// TTSContext.jsx
const TTSContext = createContext();

export function TTSProvider({ children }) {
  const [ready, setReady] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [progressItems, setProgressItems] = useState([]);
  // ...

  return (
    <TTSContext.Provider value={{ ready, disabled, progressItems, ... }}>
      {children}
    </TTSContext.Provider>
  );
}

// hooks/useTextToSpeech.js
export function useTextToSpeech() {
  const context = useContext(TTSContext);
  const worker = useRef(null);

  useEffect(() => {
    // Worker 初始化和通信逻辑
  }, []);

  return {
    generateSpeech: (text, speakerId) => {...},
    isReady: context.ready,
    isDisabled: context.disabled
  };
}
```

**理由**:

- 原生 React API，无需额外依赖
- 足够满足当前状态管理需求
- 学习成本低，代码简洁
- 便于展示 React Hooks 深入理解

**备选方案**:

- **方案 A**: Redux Toolkit
  - 优点：规范化状态管理
  - 缺点：过度工程化，增加复杂度
- **方案 B**: Zustand
  - 优点：轻量级，API 简洁
  - 缺点：增加外部依赖

### 决策 3: 错误处理策略

**决定**: 多层次错误处理 + 用户友好提示

**层次**:

1. **React Error Boundary**: 捕获组件渲染错误
2. **Worker 错误处理**: try-catch + 错误消息传递
3. **网络错误**: 重试机制（指数退避）
4. **输入验证**: 前置检查，阻止无效操作
5. **兼容性检测**: 启动时检查必要 API

**示例**:

```javascript
// ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() => window.location.reload()}
        />
      );
    }
    return this.props.children;
  }
}

// worker.js
try {
  const tts = await MyTextToSpeechPipeline.getInstance();
  const audio = await tts(text, speaker_id);
  self.postMessage({ status: "complete", output: audio });
} catch (error) {
  self.postMessage({
    status: "error",
    message: "音频生成失败，请重试",
    details: error.message,
  });
}
```

**理由**:

- 全面覆盖各种错误场景
- 用户体验好，不会突然崩溃
- 便于调试和问题定位
- 展现对生产环境的考虑

### 决策 4: 性能优化方案

**决定**: IndexedDB 缓存 + Code Splitting + 渲染优化

**关键优化点**:

1. **模型缓存**: 使用 IndexedDB 缓存下载的模型文件
2. **代码分割**: React.lazy 懒加载非关键组件
3. **渲染优化**: useMemo/useCallback 优化依赖
4. **防抖处理**: 文本输入延迟 300ms
5. **Service Worker**: 离线支持

**IndexedDB 缓存实现**:

```javascript
// services/cacheService.js
const DB_NAME = "transformer-tts-cache";
const STORE_NAME = "models";

async function cacheModel(key, data) {
  const db = await openDB();
  await db.put(STORE_NAME, data, key);
}

async function getModel(key) {
  const db = await openDB();
  return await db.get(STORE_NAME, key);
}
```

**理由**:

- 显著提升二次访问速度（预计 93% 提升）
- 支持完全离线使用
- 展现对浏览器 API 的深入理解
- 有明确的性能数据支撑

**备选方案**:

- **方案 A**: 只使用 Cache API
  - 缺点：不够灵活，难以控制缓存策略
- **方案 B**: localStorage
  - 缺点：容量限制（5-10MB），无法存储大文件

### 决策 5: 测试策略

**决定**: Vitest + React Testing Library + Mock Worker

**测试类型**:

1. **单元测试**: 组件、Hooks、工具函数（80%+ 覆盖率）
2. **集成测试**: 完整 TTS 流程
3. **Mock 策略**: Mock Web Worker 和 Transformer.js

**示例测试**:

```javascript
// __tests__/AudioPlayer.test.jsx
import { render, screen } from "@testing-library/react";
import { AudioPlayer } from "../AudioPlayer";

describe("AudioPlayer", () => {
  it("should render audio controls", () => {
    render(<AudioPlayer audioUrl="blob:..." />);
    expect(screen.getByRole("audio")).toBeInTheDocument();
  });

  it("should auto-play new audio", () => {
    const { rerender } = render(<AudioPlayer audioUrl="blob:1" />);
    const audio = screen.getByRole("audio");
    const playSpy = jest.spyOn(audio, "play");

    rerender(<AudioPlayer audioUrl="blob:2" />);
    expect(playSpy).toHaveBeenCalled();
  });
});
```

**理由**:

- Vitest 快速，与 Vite 集成好
- React Testing Library 测试用户行为，更贴近真实
- Mock Worker 避免测试时下载大模型
- 测试覆盖率是简历的重要指标

### 决策 6: CI/CD 流程

**决定**: GitHub Actions + Vercel 自动部署

**流程**:

```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build

  lighthouse:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://your-app.vercel.app

  deploy:
    needs: [test, lighthouse]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: vercel/action@v2
```

**理由**:

- 自动化保证代码质量
- Lighthouse CI 持续监控性能
- Vercel 部署简单快速
- 展现 DevOps 能力

## Risks / Trade-offs

### Risk 1: 重构可能引入新 Bug

**缓解策略**:

- 渐进式重构，逐个组件拆分
- 每次重构后验证功能正常
- 添加测试覆盖，及时发现问题

### Risk 2: IndexedDB 兼容性

**缓解策略**:

- 检测 IndexedDB 支持，不支持时降级
- 提供 localStorage 备选方案
- 优雅降级，不影响核心功能

### Risk 3: 优化时间成本

**缓解策略**:

- 按优先级执行（错误处理 > 架构 > 测试 > 文档）
- 设定明确的完成标准，避免过度优化
- 3-7 天完成核心优化

### Trade-off: 代码复杂度 vs 展现能力

**决定**: 适度增加复杂度

- 增加的复杂度都有明确价值（性能、稳定性、可维护性）
- 不为了展示技术而过度设计
- 保持代码可读性，添加中文注释

## Migration Plan

### Phase 1: 错误处理和架构（Day 1-2）

1. 添加 ErrorBoundary
2. Worker 错误处理
3. 拆分 App.jsx 组件
4. 创建 Custom Hooks
5. 验证功能正常

### Phase 2: 性能优化（Day 3-4）

1. 实现 IndexedDB 缓存
2. 添加代码分割
3. 优化渲染性能
4. 验证性能指标

### Phase 3: 测试和文档（Day 5-6）

1. 配置测试环境
2. 编写核心组件测试
3. 重写 README
4. 添加 JSDoc 注释

### Phase 4: CI/CD 和部署（Day 7）

1. 配置 GitHub Actions
2. 部署到 Vercel
3. 配置 Lighthouse CI
4. 最终验证

### Rollback Plan

- 每个 Phase 完成后提交 Git
- 如果出现问题可以回滚到上一个稳定版本
- 保留原始代码的备份分支

## Open Questions

1. **是否添加国际化支持？**
   - 建议：作为可选后续任务，不在本次优化范围
2. **是否添加用户认证？**
   - 建议：不需要，保持简单，专注 TTS 功能
3. **是否迁移到 TypeScript？**
   - 建议：作为可选后续任务，当前保持 JavaScript
4. **是否添加更多音色？**
   - 建议：不在本次优化范围，专注工程化提升

5. **测试覆盖率目标是否调整？**
   - 建议：保持 80% 目标，核心功能 100% 覆盖
