# Tasks: 重构 App.jsx 组件

> 📅 创建日期: 2024-10-31  
> 🎯 目标: 将 450 行的 App.jsx 重构为模块化组件

---

## 📋 任务清单

### Phase 1: 提取自定义 Hook ✅

#### 1.1 创建 useAudioGenerator Hook

- [ ] 创建 `src/hooks/useAudioGenerator.js`
- [ ] 迁移 Worker 初始化逻辑
- [ ] 迁移状态管理（ready, disabled, progressItems, output）
- [ ] 迁移 generateSpeech 函数
- [ ] 添加 JSDoc 注释
- [ ] 添加 PropTypes/类型检查

**验收标准**:

- Hook 导出所有必要的状态和方法
- Worker 管理逻辑完整
- 清理逻辑正确（useEffect cleanup）

---

### Phase 2: 拆分 UI 组件 ✅

#### 2.1 创建 LoadingOverlay 组件

- [ ] 创建 `src/components/LoadingOverlay.jsx`
- [ ] 迁移加载遮罩 JSX（220-262 行）
- [ ] 接收 props: `isLoading`, `progressItems`
- [ ] 添加 PropTypes
- [ ] 测试显示/隐藏逻辑

**验收标准**:

- 组件 < 60 行
- 加载动画正常
- 进度条正确显示

---

#### 2.2 创建 TextInputSection 组件

- [ ] 创建 `src/components/TextInputSection.jsx`
- [ ] 迁移文本输入区 JSX（282-333 行）
- [ ] 接收 props: `text`, `onChange`, `onKeyDown`, `disabled`, `maxLength`
- [ ] 内部管理字符统计和验证状态
- [ ] 添加 PropTypes

**验收标准**:

- 组件 < 90 行
- 字符计数正确
- 超限提示正常
- 键盘快捷键工作

---

#### 2.3 创建 SpeakerSelector 组件

- [ ] 创建 `src/components/SpeakerSelector.jsx`
- [ ] 迁移音色选择 JSX（335-377 行）
- [ ] 接收 props: `value`, `onChange`, `disabled`, `speakers`
- [ ] 添加 PropTypes

**验收标准**:

- 组件 < 50 行
- 下拉菜单正常
- 自定义箭头显示

---

#### 2.4 创建 GenerateButton 组件

- [ ] 创建 `src/components/GenerateButton.jsx`
- [ ] 迁移生成按钮 JSX（379-409 行）
- [ ] 接收 props: `onClick`, `disabled`, `isTextValid`, `isGenerating`
- [ ] 添加 PropTypes

**验收标准**:

- 组件 < 60 行
- 按钮状态切换正常
- 动画效果保留
- 光效正常显示

---

#### 2.5 创建 MainContentCard 组件

- [ ] 创建 `src/components/MainContentCard.jsx`
- [ ] 迁移主卡片容器 JSX（265-266, 424 行）
- [ ] 接收 props: `children`, `title`, `subtitle`
- [ ] 添加 PropTypes

**验收标准**:

- 组件 < 40 行
- 玻璃态效果保留
- 标题区域完整

---

### Phase 3: 重构 App.jsx ✅

#### 3.1 更新 App.jsx 导入

- [ ] 导入新创建的组件
- [ ] 导入 `useAudioGenerator` Hook
- [ ] 删除未使用的导入

---

#### 3.2 重构 App.jsx 主体

- [ ] 使用 `useAudioGenerator` Hook
- [ ] 简化状态管理（只保留 UI 状态）
- [ ] 更新 `handleGenerateSpeech` 逻辑
- [ ] 使用新组件重构 JSX

---

#### 3.3 清理旧代码

- [ ] 删除已迁移的逻辑
- [ ] 删除未使用的函数
- [ ] 清理注释

**验收标准**:

- App.jsx < 200 行
- 所有功能正常
- 代码清晰易读

---

### Phase 4: 测试和验证 ✅

#### 4.1 功能测试

- [ ] 模型加载正常
- [ ] 文本输入正常
- [ ] 音色选择正常
- [ ] 语音生成正常
- [ ] 音频播放正常
- [ ] Toast 提示正常
- [ ] 网络状态监控正常
- [ ] 兼容性检查正常

---

#### 4.2 边缘情况测试

- [ ] 超长文本处理
- [ ] 空文本处理
- [ ] 连续点击生成
- [ ] 切换音色
- [ ] 离线使用

---

#### 4.3 性能测试

- [ ] 首次渲染时间
- [ ] 组件更新性能
- [ ] 内存使用情况
- [ ] 无明显性能下降

---

### Phase 5: 代码质量和文档 ✅

#### 5.1 代码质量

- [ ] ESLint 0 错误
- [ ] ESLint 0 警告
- [ ] Prettier 格式化
- [ ] 所有组件有 PropTypes
- [ ] 所有函数有 JSDoc

---

#### 5.2 更新文档

- [ ] 更新 `ARCHITECTURE.md`
- [ ] 更新 `PROJECT_STRUCTURE.md`
- [ ] 更新 `CHANGELOG.md`
- [ ] 添加组件使用示例（可选）

---

## 📊 进度跟踪

|  Phase   | 任务数 | 已完成 |  进度  |   状态    |
| :------: | :----: | :----: | :----: | :-------: |
| Phase 1  |   1    |   0    |   0%   | ⏳ 待开始 |
| Phase 2  |   5    |   0    |   0%   | ⏳ 待开始 |
| Phase 3  |   3    |   0    |   0%   | ⏳ 待开始 |
| Phase 4  |   3    |   0    |   0%   | ⏳ 待开始 |
| Phase 5  |   2    |   0    |   0%   | ⏳ 待开始 |
| **总计** | **14** | **0**  | **0%** | ⏳ 待开始 |

---

## ⏱️ 时间估算

|  Phase   |  预计时间   |
| :------: | :---------: |
| Phase 1  |   30 分钟   |
| Phase 2  |   60 分钟   |
| Phase 3  |   30 分钟   |
| Phase 4  |   30 分钟   |
| Phase 5  |   20 分钟   |
| **总计** | **~3 小时** |

---

## 🎯 验收标准

### 功能验收

- ✅ 所有原有功能正常工作
- ✅ 无新增 bug
- ✅ UI 显示一致

### 代码质量验收

- ✅ App.jsx < 200 行
- ✅ 单个组件 < 100 行
- ✅ ESLint 通过
- ✅ Build 成功

### 性能验收

- ✅ 首屏渲染 < 1s
- ✅ 交互响应 < 100ms
- ✅ 内存无泄漏

---

<div align="center">

**准备好开始重构了吗？** 🚀

[开始 Phase 1](#phase-1-提取自定义-hook-) | [查看提案](./proposal.md)

</div>
