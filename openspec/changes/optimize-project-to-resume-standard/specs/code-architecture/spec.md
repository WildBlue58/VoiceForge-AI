# Code Architecture Capability

## ADDED Requirements

### Requirement: 组件拆分

应用程序 SHALL 将 App.jsx 拆分为多个小型、单一职责的组件，提高代码可维护性和可测试性。

#### Scenario: TextInput 组件独立

- **WHEN** 用户查看项目代码结构
- **THEN** TextInput 组件独立于 src/components/TextInput.jsx
- **AND** 组件负责文本输入、字符计数、验证提示
- **AND** 组件接收 props: value, onChange, maxLength, disabled
- **AND** 组件有 PropTypes 类型检查

#### Scenario: SpeakerSelector 组件独立

- **WHEN** 用户查看项目代码结构
- **THEN** SpeakerSelector 组件独立于 src/components/SpeakerSelector.jsx
- **AND** 组件负责音色选择
- **AND** 组件接收 props: value, onChange, speakers, disabled
- **AND** 组件有 PropTypes 类型检查

#### Scenario: GenerateButton 组件独立

- **WHEN** 用户查看项目代码结构
- **THEN** GenerateButton 组件独立于 src/components/GenerateButton.jsx
- **AND** 组件负责生成按钮状态和点击事件
- **AND** 组件接收 props: onClick, disabled, isGenerating
- **AND** 组件有 PropTypes 类型检查

#### Scenario: LoadingOverlay 组件独立

- **WHEN** 用户查看项目代码结构
- **THEN** LoadingOverlay 组件独立于 src/components/LoadingOverlay.jsx
- **AND** 组件负责模型加载时的遮罩层和进度显示
- **AND** 组件接收 props: isLoading, progressItems
- **AND** 组件有 PropTypes 类型检查

### Requirement: 通用 UI 组件库

应用程序 SHALL 创建可复用的通用 UI 组件库，放置在 src/components/ui/ 目录。

#### Scenario: Button 通用组件

- **WHEN** 项目需要按钮组件
- **THEN** Button 组件独立于 src/components/ui/Button.jsx
- **AND** 组件支持 variant（primary, secondary, danger）
- **AND** 组件支持 size（sm, md, lg）
- **AND** 组件支持 disabled, loading 状态
- **AND** 组件有完整的 PropTypes 定义

#### Scenario: Input 通用组件

- **WHEN** 项目需要输入框组件
- **THEN** Input 组件独立于 src/components/ui/Input.jsx
- **AND** 组件支持 type（text, textarea）
- **AND** 组件支持 error, disabled 状态
- **AND** 组件有完整的 PropTypes 定义

#### Scenario: Select 通用组件

- **WHEN** 项目需要选择器组件
- **THEN** Select 组件独立于 src/components/ui/Select.jsx
- **AND** 组件支持 options 数组
- **AND** 组件支持 disabled 状态
- **AND** 组件有完整的 PropTypes 定义

#### Scenario: Card 通用组件

- **WHEN** 项目需要卡片容器
- **THEN** Card 组件独立于 src/components/ui/Card.jsx
- **AND** 组件提供一致的卡片样式
- **AND** 组件有完整的 PropTypes 定义

### Requirement: 自定义 Hooks

应用程序 SHALL 将复杂的逻辑提取到自定义 Hooks 中，放置在 src/hooks/ 目录。

#### Scenario: useTextToSpeech Hook

- **WHEN** 组件需要使用 TTS 功能
- **THEN** useTextToSpeech Hook 独立于 src/hooks/useTextToSpeech.js
- **AND** Hook 封装 Worker 初始化、消息监听、状态管理
- **AND** Hook 返回: { generateSpeech, isReady, isDisabled, output, progressItems }
- **AND** Hook 有详细的 JSDoc 注释

#### Scenario: useAudioPlayer Hook

- **WHEN** 组件需要音频播放功能
- **THEN** useAudioPlayer Hook 独立于 src/hooks/useAudioPlayer.js
- **AND** Hook 封装音频加载、播放、暂停逻辑
- **AND** Hook 返回: { play, pause, isPlaying, duration, currentTime }
- **AND** Hook 有详细的 JSDoc 注释

#### Scenario: useCompatibilityCheck Hook

- **WHEN** 应用需要检查浏览器兼容性
- **THEN** useCompatibilityCheck Hook 独立于 src/hooks/useCompatibilityCheck.js
- **AND** Hook 检测 Web Worker, AudioContext, Blob, IndexedDB 支持
- **AND** Hook 返回: { isCompatible, missingFeatures }
- **AND** Hook 有详细的 JSDoc 注释

#### Scenario: useNetworkStatus Hook

- **WHEN** 应用需要监控网络状态
- **THEN** useNetworkStatus Hook 独立于 src/hooks/useNetworkStatus.js
- **AND** Hook 监听 online/offline 事件
- **AND** Hook 返回: { isOnline }
- **AND** Hook 有详细的 JSDoc 注释

### Requirement: Context API 状态管理

应用程序 SHALL 使用 Context API 管理全局状态，创建 TTSContext 提供者。

#### Scenario: TTSContext 提供全局状态

- **WHEN** 应用初始化
- **THEN** TTSContext 创建于 src/contexts/TTSContext.jsx
- **AND** Context 提供: ready, disabled, progressItems, text, selectedSpeaker, output
- **AND** Context 提供: setText, setSelectedSpeaker, setReady, setDisabled, setProgressItems, setOutput
- **AND** TTSProvider 包裹整个应用

#### Scenario: 组件消费 TTSContext

- **WHEN** 组件需要访问全局状态
- **THEN** 组件使用 useContext(TTSContext) 或自定义 useTTS Hook
- **AND** 组件可以读取和更新状态
- **AND** 状态变化自动触发组件重新渲染

### Requirement: 服务层抽取

应用程序 SHALL 将业务逻辑抽取到 services 层，放置在 src/services/ 目录。

#### Scenario: ttsService 业务逻辑

- **WHEN** 需要执行 TTS 相关业务逻辑
- **THEN** ttsService 创建于 src/services/ttsService.js
- **AND** 服务提供: initWorker(), generateSpeech(text, speakerId), terminateWorker()
- **AND** 服务有详细的 JSDoc 注释

#### Scenario: audioService 音频处理

- **WHEN** 需要处理音频相关操作
- **THEN** audioService 创建于 src/services/audioService.js
- **AND** 服务提供: createAudioUrl(blob), revokeAudioUrl(url), downloadAudio(url, filename)
- **AND** 服务有详细的 JSDoc 注释

#### Scenario: cacheService 缓存管理

- **WHEN** 需要管理 IndexedDB 缓存
- **THEN** cacheService 创建于 src/services/cacheService.js
- **AND** 服务提供: openDB(), cacheModel(key, data), getModel(key), clearCache()
- **AND** 服务有详细的 JSDoc 注释

### Requirement: 工具函数层

应用程序 SHALL 将工具函数放置在 src/utils/ 目录，提供可复用的辅助功能。

#### Scenario: audio.js 音频工具

- **WHEN** 需要音频处理工具函数
- **THEN** audio.js 创建于 src/utils/audio.js
- **AND** 提供: formatDuration(seconds), createBlobUrl(blob), revokeBlobUrl(url)
- **AND** 每个函数有 JSDoc 注释和单元测试

#### Scenario: validation.js 验证工具

- **WHEN** 需要输入验证函数
- **THEN** validation.js 创建于 src/utils/validation.js
- **AND** 提供: validateText(text, maxLength), isValidSpeakerId(id)
- **AND** 每个函数有 JSDoc 注释和单元测试

### Requirement: 目录结构规范

应用程序 SHALL 遵循清晰的目录结构，便于理解和维护。

#### Scenario: 完整目录结构

- **WHEN** 开发者查看项目结构
- **THEN** 目录结构如下：

```
src/
├── components/
│   ├── ui/              # 通用UI组件
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   └── Card.jsx
│   ├── TextInput.jsx
│   ├── SpeakerSelector.jsx
│   ├── GenerateButton.jsx
│   ├── LoadingOverlay.jsx
│   ├── AudioPlayer.jsx
│   └── Progress.jsx
├── hooks/
│   ├── useTextToSpeech.js
│   ├── useAudioPlayer.js
│   ├── useCompatibilityCheck.js
│   └── useNetworkStatus.js
├── contexts/
│   └── TTSContext.jsx
├── services/
│   ├── ttsService.js
│   ├── audioService.js
│   └── cacheService.js
├── utils/
│   ├── audio.js
│   └── validation.js
├── constants.js
├── App.jsx
├── main.jsx
├── worker.js
└── index.css
```

### Requirement: PropTypes 类型检查

应用程序 SHALL 为所有组件添加 PropTypes 类型检查，提高代码健壮性。

#### Scenario: 组件有 PropTypes 定义

- **WHEN** 开发者查看任何组件
- **THEN** 组件底部有完整的 PropTypes 定义
- **AND** 所有 props 都有类型声明
- **AND** 必需的 props 标记为 isRequired
- **AND** 有默认值的 props 有 defaultProps 定义

#### Scenario: PropTypes 验证失败提示

- **WHEN** 组件接收到错误类型的 props
- **THEN** 控制台输出警告信息
- **AND** 警告信息指明具体的 prop 名称和期望类型

### Requirement: JSDoc 注释规范

应用程序 SHALL 为所有复杂函数添加 JSDoc 注释，提高代码可读性。

#### Scenario: 函数有 JSDoc 注释

- **WHEN** 开发者查看任何复杂函数
- **THEN** 函数上方有 JSDoc 注释
- **AND** 注释包含: @description, @param, @returns, @throws（如果有异常）
- **AND** 注释使用简体中文

#### Scenario: JSDoc 示例

```javascript
/**
 * 生成语音音频
 * @param {string} text - 要转换的文本，长度不超过1000字符
 * @param {string} speakerId - 音色ID，参考 SPEAKERS 常量
 * @returns {Promise<Blob>} 返回音频 Blob 对象
 * @throws {Error} 当文本为空或模型未加载时抛出错误
 */
async function generateSpeech(text, speakerId) {
  // ...
}
```

### Requirement: 性能优化钩子

应用程序 SHALL 使用 useMemo 和 useCallback 优化组件渲染性能。

#### Scenario: 使用 useMemo 缓存计算结果

- **WHEN** 组件有复杂计算或数据转换
- **THEN** 使用 useMemo 缓存结果
- **AND** 只有依赖项变化时才重新计算

#### Scenario: 使用 useCallback 缓存回调函数

- **WHEN** 组件传递回调函数给子组件
- **THEN** 使用 useCallback 缓存回调
- **AND** 避免子组件不必要的重新渲染

### Requirement: 代码规范遵循

应用程序 SHALL 遵循 ESLint 配置的代码规范，保持代码风格一致。

#### Scenario: ESLint 检查通过

- **WHEN** 运行 npm run lint
- **THEN** 所有文件通过 ESLint 检查
- **AND** 无错误和警告
- **AND** 代码格式统一

#### Scenario: 提交前自动检查

- **WHEN** 开发者提交代码
- **THEN** Git pre-commit 钩子自动运行 lint
- **AND** 如果有错误则阻止提交
- **AND** 提示开发者修复错误
