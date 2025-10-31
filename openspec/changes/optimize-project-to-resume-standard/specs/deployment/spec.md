# Deployment Capability

## ADDED Requirements

### Requirement: GitHub Actions CI/CD 配置

应用程序 SHALL 配置 GitHub Actions 实现自动化 CI/CD 流程。

#### Scenario: CI 工作流配置

- **WHEN** 推送代码到 GitHub
- **THEN** GitHub Actions 自动触发 CI 工作流
- **AND** 工作流在 .github/workflows/ci.yml 定义
- **AND** 工作流在 ubuntu-latest 环境运行

#### Scenario: 自动 Lint 检查

- **WHEN** CI 工作流运行
- **THEN** 自动执行 npm run lint
- **AND** ESLint 检查所有源代码
- **AND** 如果有错误或警告，工作流失败

#### Scenario: 自动测试

- **WHEN** CI 工作流运行
- **THEN** 自动执行 npm test
- **AND** 运行所有单元测试和集成测试
- **AND** 如果任何测试失败，工作流失败

#### Scenario: 自动构建

- **WHEN** CI 工作流运行
- **THEN** 自动执行 npm run build
- **AND** Vite 构建生产版本
- **AND** 如果构建失败，工作流失败

#### Scenario: 测试覆盖率报告

- **WHEN** CI 工作流运行测试
- **THEN** 生成测试覆盖率报告
- **AND** 上传覆盖率数据到 Codecov 或 Coveralls（可选）
- **AND** PR 中显示覆盖率变化

### Requirement: Lighthouse CI 性能监控

应用程序 SHALL 配置 Lighthouse CI 持续监控性能指标。

#### Scenario: Lighthouse CI 配置

- **WHEN** CI 工作流运行
- **THEN** Lighthouse CI 审计已部署的应用
- **AND** 审计 Performance, Accessibility, Best Practices, SEO
- **AND** 生成性能报告

#### Scenario: 性能预算检查

- **WHEN** Lighthouse CI 运行
- **THEN** 检查性能指标是否满足预算：
  - Performance >= 90
  - Accessibility >= 90
  - Best Practices >= 90
  - SEO >= 90
- **AND** 如果不满足预算，工作流发出警告或失败

#### Scenario: 性能趋势追踪

- **WHEN** 多次运行 Lighthouse CI
- **THEN** 追踪性能指标的变化趋势
- **AND** 在 PR 中显示性能对比
- **AND** 性能显著下降时发出警告

### Requirement: Vercel 自动部署

应用程序 SHALL 部署到 Vercel 平台，实现自动部署。

#### Scenario: Vercel 项目配置

- **WHEN** 连接 GitHub 仓库到 Vercel
- **THEN** Vercel 自动检测 Vite 项目
- **AND** 自动配置构建命令（npm run build）
- **AND** 自动配置输出目录（dist）

#### Scenario: 主分支自动部署

- **WHEN** 推送代码到 main 分支
- **THEN** Vercel 自动触发部署
- **AND** 构建生产版本
- **AND** 部署到生产环境
- **AND** 提供生产环境 URL

#### Scenario: PR 预览部署

- **WHEN** 创建或更新 Pull Request
- **THEN** Vercel 自动创建预览部署
- **AND** 每个 PR 有独立的预览 URL
- **AND** PR 中显示预览链接
- **AND** 预览部署与生产环境隔离

#### Scenario: 部署状态通知

- **WHEN** Vercel 部署完成
- **THEN** 在 GitHub PR 或 commit 中显示部署状态
- **AND** 部署成功显示绿色标记和 URL
- **AND** 部署失败显示红色标记和错误信息

### Requirement: 环境变量管理

应用程序 SHALL 正确管理环境变量，区分开发和生产环境。

#### Scenario: .env.example 文件

- **WHEN** 用户查看项目根目录
- **THEN** 存在 .env.example 文件
- **AND** 文件列出所有必需的环境变量
- **AND** 每个变量有说明注释

#### Scenario: 开发环境变量

- **WHEN** 在本地开发
- **THEN** 从 .env 或 .env.local 读取环境变量
- **AND** .env 文件在 .gitignore 中，不提交到 Git

#### Scenario: 生产环境变量

- **WHEN** 部署到 Vercel
- **THEN** 在 Vercel 仪表板配置环境变量
- **AND** 环境变量安全存储，不暴露在代码中

#### Scenario: 环境变量验证

- **WHEN** 应用启动
- **THEN** 验证所有必需的环境变量已设置
- **AND** 缺少环境变量时显示清晰的错误提示

### Requirement: 构建优化

应用程序 SHALL 优化生产构建，减小包体积和提升加载速度。

#### Scenario: 代码压缩

- **WHEN** 运行 npm run build
- **THEN** Vite 压缩 JavaScript 和 CSS
- **AND** 移除注释和空白
- **AND** 混淆代码（可选）

#### Scenario: Tree Shaking

- **WHEN** Vite 构建应用
- **THEN** 移除未使用的代码
- **AND** 只打包实际使用的库代码
- **AND** 减小最终 bundle 体积

#### Scenario: 资源优化

- **WHEN** Vite 构建应用
- **THEN** 优化图片和字体
- **AND** 生成合适的文件名（带 hash）
- **AND** 设置合适的 Cache-Control 头

#### Scenario: Chunk 分割

- **WHEN** Vite 构建应用
- **THEN** 将代码分割为多个 chunk
- **AND** 第三方库打包到 vendor chunk
- **AND** 应用代码打包到 main chunk
- **AND** 浏览器可以并行加载 chunk

### Requirement: 域名和 HTTPS 配置

应用程序 SHALL 配置自定义域名和 HTTPS（可选）。

#### Scenario: 使用 Vercel 默认域名

- **WHEN** 部署到 Vercel
- **THEN** 自动获得 .vercel.app 域名
- **AND** 自动启用 HTTPS
- **AND** 自动获得 SSL 证书

#### Scenario: 配置自定义域名（可选）

- **WHEN** 用户有自定义域名
- **THEN** 在 Vercel 添加自定义域名
- **AND** 配置 DNS 记录
- **AND** Vercel 自动为自定义域名配置 HTTPS
- **AND** 自动续订 SSL 证书

### Requirement: 部署回滚

应用程序 SHALL 支持快速回滚到之前的版本。

#### Scenario: 查看部署历史

- **WHEN** 用户访问 Vercel 仪表板
- **THEN** 可以查看所有历史部署
- **AND** 每个部署有 commit hash、时间、状态

#### Scenario: 回滚到之前版本

- **WHEN** 生产环境出现问题
- **THEN** 可以一键回滚到之前的稳定版本
- **AND** 回滚立即生效
- **AND** 不需要重新构建

#### Scenario: 金丝雀部署（高级，可选）

- **WHEN** 需要渐进式发布新版本
- **THEN** 可以配置金丝雀部署
- **AND** 新版本先发布给一小部分用户
- **AND** 验证无问题后全量发布

### Requirement: 监控和日志

应用程序 SHALL 配置监控和日志收集（可选）。

#### Scenario: Vercel Analytics

- **WHEN** 启用 Vercel Analytics
- **THEN** 自动收集 Web Vitals 数据
- **AND** 追踪页面访问和性能指标
- **AND** 在 Vercel 仪表板查看分析报告

#### Scenario: 错误追踪（可选）

- **WHEN** 集成 Sentry 或类似服务
- **THEN** 自动捕获生产环境错误
- **AND** 错误报告包含堆栈信息和上下文
- **AND** 及时通知开发者

#### Scenario: 日志查看

- **WHEN** 需要调试生产问题
- **THEN** 可以在 Vercel 仪表板查看部署日志
- **AND** 日志包含构建输出和运行时日志
- **AND** 可以搜索和过滤日志

### Requirement: 多环境部署支持

应用程序 SHALL 支持配置多个部署环境（开发、预发布、生产）的能力，但不强制要求全部配置。

#### Scenario: 开发环境

- **WHEN** 推送到 develop 分支
- **THEN** 自动部署到开发环境
- **AND** 使用开发环境配置
- **AND** 可供团队测试

#### Scenario: 预发布环境

- **WHEN** 推送到 staging 分支
- **THEN** 自动部署到预发布环境
- **AND** 使用接近生产的配置
- **AND** 用于最终验证

#### Scenario: 生产环境

- **WHEN** 推送到 main 分支或创建 Release
- **THEN** 自动部署到生产环境
- **AND** 使用生产环境配置
- **AND** 对外提供服务

### Requirement: Badge 状态徽章

应用程序 SHALL 在 README 中添加状态徽章，展示项目健康度。

#### Scenario: 构建状态徽章

- **WHEN** 用户查看 README
- **THEN** 显示 GitHub Actions 构建状态徽章
- **AND** 徽章显示最新构建状态（passing/failing）
- **AND** 点击徽章跳转到 Actions 页面

#### Scenario: 测试覆盖率徽章

- **WHEN** 用户查看 README
- **THEN** 显示测试覆盖率徽章
- **AND** 徽章显示当前覆盖率百分比
- **AND** 点击徽章跳转到覆盖率报告

#### Scenario: License 徽章

- **WHEN** 用户查看 README
- **THEN** 显示 License 徽章
- **AND** 徽章显示开源协议类型（MIT）

#### Scenario: Version 徽章（可选）

- **WHEN** 用户查看 README
- **THEN** 显示版本徽章
- **AND** 徽章显示当前版本号

### Requirement: 部署文档

应用程序 SHALL 提供清晰的部署文档。

#### Scenario: README 包含部署说明

- **WHEN** 用户阅读 README
- **THEN** 包含部署章节
- **AND** 说明如何部署到 Vercel
- **AND** 说明必需的环境变量

#### Scenario: 本地构建测试

- **WHEN** 用户需要本地测试构建
- **THEN** README 说明如何本地构建
- **AND** 说明如何本地预览构建结果（npm run preview）
