# 贡献指南 (Contributing)

感谢你对论文智能审核系统的关注！欢迎贡献代码、文档、测试用例或提出建议。

## 行为准则

本项目遵循 [Contributor Covenant](https://www.contributor-covenant.org/) 行为准则。请以尊重和专业的态度参与。

## 如何贡献

### 报告 Bug

1. 使用 GitHub Issues 提交 Bug 报告
2. 描述清楚复现步骤、期望行为和实际行为
3. 附上浏览器版本和操作系统信息

### 提出功能建议

1. 在 Issues 中说明功能的使用场景
2. 描述你期望的交互方式
3. 如有参考，附上竞品或设计截图

### 提交代码

```bash
# 1. Fork 本仓库
git clone https://github.com/YOUR_USERNAME/academic-integrity-platform.git

# 2. 创建功能分支
git checkout -b feature/your-feature-name

# 3. 开发并测试
# 前端：python -m http.server 8080
# 后端：uvicorn main:app --reload

# 4. 提交代码
git add .
git commit -m "feat: 添加 XXX 功能"

# 5. 推送并创建 PR
git push origin feature/your-feature-name
```

### Commit 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat:` 新功能
- `fix:` 修复 Bug
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具配置

## 项目约定

### 前端开发

- 纯原生 JavaScript，不引入框架
- 页面模块位于 `js/pages/`，命名采用 camelCase
- CSS 使用设计令牌变量（`var(--blue)` 等）
- 新页面需在 `router.js` 注册路由
- 模拟数据统一放在 `js/data/mockData.js`

### 后端开发

- Python 3.10+，FastAPI 框架
- 检测引擎继承统一基类，实现 `async def detect(self, content) -> Dict`
- API 客户端使用 httpx 异步
- 每个引擎必须有本地降级方案（除创意验证外）

### 代码风格

- JavaScript: 4空格缩进，ES6+语法
- Python: PEP 8，类型注解
- CSS: 2空格缩进，BEM 命名风格
- 注释使用中文（面向中文开发者）
- 变量/函数名使用英文

## 优先贡献方向

| 优先级 | 方向 | 难度 | 说明 |
|:---:|------|:---:|------|
| 🔴 高 | 后端 API 集成 | ⭐⭐⭐⭐ | 对接知网/GPTZero/Claude |
| 🔴 高 | RoBERTa 本地检测模型 | ⭐⭐⭐ | 替换模拟检测逻辑 |
| 🟡 中 | 术语知识图谱数据 | ⭐⭐ | 丰富 Neo4j 图谱节点 |
| 🟡 中 | 移动端响应式适配 | ⭐⭐ | 768px以下布局优化 |
| 🟢 低 | 暗色模式 | ⭐ | CSS变量主题切换 |
| 🟢 低 | 国际化 (i18n) | ⭐⭐ | 抽取文案到语言文件 |

## 问题与讨论

- 开发问题：请在 GitHub Issues 提问
- 架构讨论：请在 Discussions 中发起
- 紧急问题：联系项目维护者

再次感谢你的贡献！
