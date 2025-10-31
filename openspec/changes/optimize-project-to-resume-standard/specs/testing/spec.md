# Testing Capability

## ADDED Requirements

### Requirement: 测试环境配置

应用程序 SHALL 配置完整的测试环境，使用 Vitest 和 React Testing Library。

#### Scenario: Vitest 配置完成

- **WHEN** 开发者运行 npm test
- **THEN** Vitest 正确加载测试文件
- **AND** 支持 JSX 和 ES6+ 语法
- **AND** 支持路径别名（如 @/components）

#### Scenario: React Testing Library 集成

- **WHEN** 测试需要渲染 React 组件
- **THEN** 使用 React Testing Library 渲染组件
- **AND** 可以查询和交互 DOM 元素
- **AND** 可以断言组件行为

#### Scenario: 测试脚本配置

- **WHEN** 查看 package.json
- **THEN** 存在以下测试脚本：
  - `npm test`: 运行所有测试
  - `npm run test:watch`: 监听模式运行测试
  - `npm run test:coverage`: 生成覆盖率报告
  - `npm run test:ui`: 打开 Vitest UI（可选）

### Requirement: 组件单元测试

应用程序 SHALL 为所有组件编写单元测试，覆盖主要功能和边界情况。

#### Scenario: AudioPlayer 组件测试

- **WHEN** 运行 AudioPlayer.test.jsx
- **THEN** 测试以下场景：
  - 组件正确渲染 audio 元素
  - 接收新 audioUrl 时自动播放
  - audio 元素有 controls 属性
  - 播放失败时不抛出错误
- **AND** 所有测试通过

#### Scenario: Progress 组件测试

- **WHEN** 运行 Progress.test.jsx
- **THEN** 测试以下场景：
  - 组件显示文本和百分比
  - 进度条宽度根据百分比调整
  - 百分比为 100 时显示完成状态
- **AND** 所有测试通过

#### Scenario: TextInput 组件测试

- **WHEN** 运行 TextInput.test.jsx
- **THEN** 测试以下场景：
  - 组件正确渲染 textarea
  - onChange 事件正确触发
  - 显示字符计数
  - 超过最大长度时显示警告
  - disabled 状态正确应用
- **AND** 所有测试通过

#### Scenario: SpeakerSelector 组件测试

- **WHEN** 运行 SpeakerSelector.test.jsx
- **THEN** 测试以下场景：
  - 组件正确渲染 select 元素
  - 渲染所有音色选项
  - onChange 事件正确触发
  - 默认选中指定音色
- **AND** 所有测试通过

#### Scenario: GenerateButton 组件测试

- **WHEN** 运行 GenerateButton.test.jsx
- **THEN** 测试以下场景：
  - 组件正确渲染按钮
  - onClick 事件正确触发
  - disabled 状态禁用点击
  - isGenerating 时显示加载状态
- **AND** 所有测试通过

#### Scenario: ErrorBoundary 组件测试

- **WHEN** 运行 ErrorBoundary.test.jsx
- **THEN** 测试以下场景：
  - 子组件正常时不显示错误页面
  - 子组件抛出错误时捕获并显示错误页面
  - 错误页面包含重新加载按钮
  - 点击重新加载按钮触发 window.location.reload
- **AND** 所有测试通过

### Requirement: Hooks 单元测试

应用程序 SHALL 为所有自定义 Hooks 编写单元测试。

#### Scenario: useTextToSpeech Hook 测试

- **WHEN** 运行 useTextToSpeech.test.js
- **THEN** 测试以下场景：
  - Hook 正确初始化 Worker
  - Hook 返回正确的状态和方法
  - generateSpeech 方法正确发送消息到 Worker
  - Worker 消息正确更新状态
  - 组件卸载时正确清理 Worker
- **AND** 使用 Mock Worker 避免实际加载模型
- **AND** 所有测试通过

#### Scenario: useAudioPlayer Hook 测试

- **WHEN** 运行 useAudioPlayer.test.js
- **THEN** 测试以下场景：
  - Hook 返回正确的播放控制方法
  - play 方法调用 audio.play()
  - pause 方法调用 audio.pause()
  - 播放状态正确更新
- **AND** 所有测试通过

#### Scenario: useCompatibilityCheck Hook 测试

- **WHEN** 运行 useCompatibilityCheck.test.js
- **THEN** 测试以下场景：
  - Hook 检测所有必需 API
  - 所有 API 支持时返回 isCompatible: true
  - 缺少 API 时返回 isCompatible: false 和 missingFeatures
- **AND** 所有测试通过

#### Scenario: useNetworkStatus Hook 测试

- **WHEN** 运行 useNetworkStatus.test.js
- **THEN** 测试以下场景：
  - Hook 返回当前网络状态
  - 监听 online/offline 事件
  - 网络状态变化时更新 isOnline
- **AND** 所有测试通过

### Requirement: 工具函数测试

应用程序 SHALL 为所有工具函数编写单元测试。

#### Scenario: validation.js 测试

- **WHEN** 运行 validation.test.js
- **THEN** 测试以下场景：
  - validateText 正确验证空文本
  - validateText 正确验证超长文本
  - validateText 正确验证有效文本
  - isValidSpeakerId 正确验证音色 ID
- **AND** 所有测试通过

#### Scenario: audio.js 测试

- **WHEN** 运行 audio.test.js
- **THEN** 测试以下场景：
  - formatDuration 正确格式化时长
  - createBlobUrl 返回有效 URL
  - revokeBlobUrl 正确释放 URL
- **AND** 所有测试通过

### Requirement: 集成测试

应用程序 SHALL 编写集成测试，覆盖完整的用户流程。

#### Scenario: 完整 TTS 流程集成测试

- **WHEN** 运行集成测试
- **THEN** 测试以下完整流程：
  1. 应用启动，显示加载状态
  2. 模型加载完成，显示 ready 状态
  3. 用户输入文本
  4. 用户选择音色
  5. 用户点击生成按钮
  6. 显示生成中状态
  7. 生成完成，显示音频播放器
  8. 用户可以播放音频
- **AND** 使用 Mock Worker 避免实际加载模型
- **AND** 所有步骤验证通过

### Requirement: Mock Worker 策略

应用程序 SHALL 实现 Mock Worker 策略，避免测试时加载大模型。

#### Scenario: Mock Worker 创建

- **WHEN** 测试需要使用 Worker
- **THEN** 使用 Mock Worker 替代真实 Worker
- **AND** Mock Worker 模拟消息通信
- **AND** Mock Worker 模拟状态变化（initiate, progress, done, ready, complete）

#### Scenario: Mock Worker 消息模拟

- **WHEN** 测试发送消息到 Worker
- **THEN** Mock Worker 接收消息
- **AND** 根据消息类型返回对应的 Mock 响应
- **AND** 响应格式与真实 Worker 一致

#### Scenario: Mock Transformer.js

- **WHEN** 测试需要使用 Transformer.js
- **THEN** Mock Transformer.js 模块
- **AND** Mock MyTextToSpeechPipeline 类
- **AND** Mock getInstance 方法返回 Mock 实例
- **AND** Mock 实例的调用返回 Mock 音频数据

### Requirement: 测试覆盖率

应用程序 SHALL 达到高测试覆盖率目标。

#### Scenario: 整体覆盖率目标

- **WHEN** 运行 npm run test:coverage
- **THEN** 语句覆盖率（Statements） >= 80%
- **AND** 分支覆盖率（Branches） >= 75%
- **AND** 函数覆盖率（Functions） >= 80%
- **AND** 行覆盖率（Lines） >= 80%

#### Scenario: 核心功能 100% 覆盖

- **WHEN** 查看覆盖率报告
- **THEN** 以下核心文件 100% 覆盖：
  - worker.js (关键部分)
  - services/ttsService.js
  - utils/validation.js
  - utils/audio.js

#### Scenario: 覆盖率报告生成

- **WHEN** 运行 npm run test:coverage
- **THEN** 生成 HTML 覆盖率报告
- **AND** 报告保存在 coverage/ 目录
- **AND** 可以在浏览器中查看详细覆盖情况

### Requirement: 测试工具函数

应用程序 SHALL 提供测试工具函数，简化测试编写。

#### Scenario: 自定义渲染函数

- **WHEN** 测试需要渲染组件并提供 Context
- **THEN** 使用自定义 renderWithProviders 函数
- **AND** 函数自动包裹 TTSProvider
- **AND** 函数返回 render 结果和 store（如果有）

#### Scenario: Mock 数据工厂

- **WHEN** 测试需要 Mock 数据
- **THEN** 使用 Mock 数据工厂创建测试数据
- **AND** 工厂提供: createMockProgressItem(), createMockAudioBlob(), createMockWorkerMessage()

### Requirement: 测试最佳实践

应用程序 SHALL 遵循测试最佳实践，编写高质量测试。

#### Scenario: 测试用户行为而非实现细节

- **WHEN** 编写组件测试
- **THEN** 测试用户可见的行为
- **AND** 不测试内部状态和实现细节
- **AND** 使用 screen.getByRole, screen.getByLabelText 等语义查询

#### Scenario: 测试独立性

- **WHEN** 运行多个测试
- **THEN** 每个测试独立运行，互不影响
- **AND** 测试之间不共享状态
- **AND** 每个测试清理自己的副作用

#### Scenario: 测试可读性

- **WHEN** 阅读测试代码
- **THEN** 测试命名清晰描述测试内容
- **AND** 测试结构遵循 Arrange-Act-Assert 模式
- **AND** 测试有适当的注释说明复杂场景

#### Scenario: 快速测试

- **WHEN** 运行测试套件
- **THEN** 所有测试在 30 秒内完成
- **AND** 单个测试在 1 秒内完成
- **AND** 使用 Mock 避免实际网络请求和大文件加载

### Requirement: CI 测试集成

应用程序 SHALL 在 CI 环境中自动运行测试。

#### Scenario: GitHub Actions 运行测试

- **WHEN** 推送代码到 GitHub
- **THEN** GitHub Actions 自动运行测试
- **AND** 测试失败时阻止合并
- **AND** 测试通过时显示绿色标记

#### Scenario: PR 测试状态显示

- **WHEN** 创建 Pull Request
- **THEN** PR 页面显示测试状态
- **AND** 显示覆盖率变化
- **AND** 覆盖率降低时发出警告
