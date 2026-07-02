<p align="center">
  <img src="https://img.shields.io/badge/version-3.0-blue" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="status">
  <img src="https://img.shields.io/badge/language-JavaScript-yellow" alt="language">
</p>

<h1 align="center">🔬 论文智能审核系统</h1>
<h3 align="center">Academic Integrity Platform · 学术诚信综合平台</h3>

<p align="center">
  融合文字查重 · AI生成检测 · 创意验证 · 术语溯源 · 区块链存证 · 脑认知指纹 · 创新势能分析
</p>

---

## 📖 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [API 依赖与费用](#api-依赖与费用)
- [贡献指南](#贡献指南)
- [开源协议](#开源协议)

---

## 项目简介

**Academic Integrity Platform v3.0** 是一个面向学术论文的全方位诚信检测与创新评估平台，将传统文字查重升级为"七维检测体系"：

```
文字层 (查重) → 语义层 (AI检测) → 逻辑层 (创意验证)
         ↓                ↓                ↓
    术语溯源        区块链存证        脑认知指纹
                        ↓
                  ECU 创新势能
```

项目起源于对6份《论文检测系统》需求文档的系统性分析，采用 SPA 单页应用架构，10个功能页面覆盖从论文提交到争议仲裁的完整学术诚信生命周期。

### 为什么值得关注

- 🧠 **多维检测**：超越传统查重，引入AI生成检测、创意验证等7大维度
- ⛓️ **区块链存证**：SHA-256哈希 + 毫秒级时间戳，实现学术创新优先权确权
- 📐 **ECU模型**：Quantitative Innovation Potential — 双函数数学模型量化创新势能
- 🏛️ **争议仲裁**：双发布冲突仲裁机制，含证据权重体系
- 🎨 **前端零依赖**：纯原生 HTML/CSS/JS，无框架无构建工具，开箱即用
- 📡 **后端可插拔**：每个检测引擎独立，支持 API/本地双模式降级

---

## 核心功能

### 🏠 仪表盘 (Dashboard)
- 系统总览：4个核心指标卡 + 迷你趋势图
- 多维检测雷达图（六边形 SVG 可视化）
- 抄袭风险热力图（7×7 网格，时间维度可视化）
- 最近检测记录 + 区块链存证状态
- 创新势能实时监测

### 📤 论文提交 (Submit)
- 4步提交流程：上传 → 配置 → 检测 → 报告
- 支持拖拽上传 + 点击上传
- 6项可配置检测项目 + 自定义参数
- 7步模拟检测流程（每步 800ms 推进）

### 📊 检测报告 (Report)
- 论文头部信息 + 综合评分环
- 6个 Tab 切换：综合报告 / 文字查重 / AI检测 / 创意验证 / 术语溯源 / 区块链存证
- 段落级查重可视化 + 来源标注
- AI模型指纹匹配表（20+ 模型特征）
- 知识图谱四层节点可视化
- 区块链存证时间线

### 🤖 AI生成检测 (AI Detection)
- 3个核心指标：检测准确率 / 模型指纹库 / 可疑片段
- 8个主流AI模型特征库（GPT-4 / Claude / Gemini / Llama 等）
- 三重检测体系：文字层 → 语义层 → 逻辑层
- 误判风险与应对机制（3个警示卡片）

### 💡 创意验证 (Creative Verification)
- 5步闭环验证流程
- 创意要素自动化解构（NLP + 4大要素）
- 虚拟模拟验证（反事实/边界/泛化/鲁棒性测试）
- 跨领域知识库比对（3个知识库）
- 三级风险预警（高/中/低）

### 📚 术语溯源 (Terminology Tracing)
- 3个统计卡片：注册术语数 / 溯源成功率 / 侵权案件
- 术语注册表（支持注册 + 详情查看）
- 术语本体知识库（6个术语的语义锚点）
- 侵权分级处理机制

### ⛓️ 区块链存证 (Blockchain)
- 4个核心存证指标
- 存证机制说明：实时存证 + 双发布冲突仲裁
- SHA-256 哈希生成代码示例
- 最近存证记录表（含验证弹窗）

### 📈 创新势能 (Innovation)
- 4个核心指标：ECU总分 / 创新密度 / 年度趋势 / 敏感度
- ECU密度进度条（渐变色 + 临界线标记）
- 双函数数学模型展示（暗色代码块）
- 年度趋势柱状图（2020-2026）
- 参数敏感度分析表

### ⚖️ 争议仲裁 (Arbitration)
- 5步垂直仲裁流程
- 双发布冲突仲裁机制 + 证据权重体系
- 4种证据链技术（区块链 / 脑认知 / 文档历史 / 语义锚点）
- 案件管理（待处理 + 已裁决）
- IEEE学术链仲裁规则 v3.0

### ⚙️ 系统设置 (Settings)
- 检测阈值配置（查重 / AI检测 / 创意 / 术语 / ECU）
- 知识库来源管理
- 系统架构说明

---

## 技术架构

```
┌─────────────────────────────────────────────┐
│              前端 SPA (纯原生)                │
│   Hash 路由 · 10 页面 · Mock 数据驱动         │
│   paper-review-system/                       │
├─────────────────────────────────────────────┤
│              后端引擎 (可选)                   │
│   FastAPI · 7大检测模块 · API/本地双模式       │
│   backend/                                   │
├────────┬────────┬────────┬──────────────────┤
│ 知网API │GPTZero │Claude  │ Neo4j 知识图谱    │
│ 查重    │AI检测  │创意验证 │ 术语溯源          │
├────────┴────────┴────────┴──────────────────┤
│ 本地引擎: TF-IDF · SHA-256 · ECU · RoBERTa  │
└─────────────────────────────────────────────┘
```

### 设计令牌系统

```css
/* 12个语义色 + 5级灰阶 + 4级圆角 + 2套字体 */
--blue: #185FA5    --green: #3B6D11
--red: #A32D2D     --amber: #854F0B
--purple: #534AB7  --teal: #0F6E56
```

### 前端零依赖

不依赖任何框架或构建工具：
- ✅ 无 React/Vue/Angular
- ✅ 无 Webpack/Vite
- ✅ 无 npm/yarn
- ✅ 原生 ES6+ JavaScript
- ✅ Custom Hash Router
- ✅ CSS Custom Properties (设计令牌)

---

## 快速开始

### 前端（立即体验）

```bash
# 进入前端目录
cd paper-review-system

# 启动本地服务器 (Python 3)
python -m http.server 8080

# 或使用 Node.js
npx serve .

# 浏览器打开
open http://localhost:8080
```

### 后端（可选部署）

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 启动 FastAPI 服务
uvicorn main:app --reload --port 8000

# API 文档
open http://localhost:8000/docs
```

### 环境变量配置

```bash
# 可选：对接外部检测 API
export CNKI_API_KEY="your_cnki_key"         # 知网查重
export GPTZERO_API_KEY="your_gptzero_key"   # AI生成检测
export ANTHROPIC_API_KEY="your_claude_key"  # 创意验证
export NEO4J_URI="bolt://localhost:7687"    # 术语知识图谱
```

---

## 项目结构

```
论文审核系统设计/
├── README.md                    # 项目说明
├── LICENSE                      # MIT 开源协议
├── .gitignore                   # Git 忽略规则
├── CONTRIBUTING.md              # 贡献指南
│
├── paper-review-system/         # 前端 SPA 应用
│   ├── index.html               # SPA 入口 (hash 路由)
│   ├── css/
│   │   └── styles.css           # 全局样式系统 (20KB)
│   └── js/
│       ├── data/
│       │   └── mockData.js      # 模拟数据层 (15KB)
│       ├── utils.js             # 工具函数库
│       ├── router.js            # Hash 路由系统
│       ├── app.js               # 应用入口
│       └── pages/               # 页面模块
│           ├── dashboard.js     # 检测总览
│           ├── submit.js        # 论文提交
│           ├── report.js        # 检测报告
│           ├── aiDetection.js   # AI生成检测
│           ├── creative.js      # 创意验证
│           ├── terminology.js   # 术语溯源
│           ├── blockchain.js    # 区块链存证
│           ├── innovation.js    # 创新势能
│           └── arbitration.js   # 争议仲裁
│
├── backend/                     # 后端引擎 (Python)
│   ├── engines/                 # 7大检测引擎
│   ├── orchestrator/            # 检测编排器
│   ├── gateway/                 # API 客户端
│   ├── models/                  # 数据模型
│   ├── main.py                  # FastAPI 入口
│   ├── config.py                # 配置
│   └── requirements.txt         # Python 依赖
│
└── docs/                        # 设计文档
    ├── architecture.md          # 架构设计
    ├── api-matrix.md            # API 依赖矩阵
    └── api-gateway.md           # API 集成模式
```

---

## API 依赖与费用

| 检测机制 | API依赖 | 推荐服务 | 月费估算 |
|---------|:------:|---------|--------|
| 文字查重 | ★★★ 必须 | 知网/万方 | ¥1,500-4,000 |
| AI检测 | ★★★ 必须 | GPTZero | $5 |
| 创意验证 | ★★★ 必须 | Claude | ~$120 |
| 术语溯源 | ★★ 混合 | Neo4j本地 | ¥0 |
| 区块链 | ☆ 纯本地 | SHA-256 | ¥0 |
| ECU | ☆ 纯本地 | 数学公式 | ¥0 |

> **零API模式下，除创意验证外所有功能均可本地运行。** 最低可行月费 ~¥1,000（仅保留 Claude API）。

---

## 贡献指南

欢迎贡献！请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献流程。

### 贡献方向

- 🔌 **后端集成**：对接知网/GPTZero/Claude API
- 🧠 **AI模型**：优化本地RoBERTa检测模型
- 🗺️ **知识图谱**：丰富术语知识图谱数据
- 🎨 **UI优化**：移动端适配、暗色模式
- 🌐 **国际化**：英文/日文等多语言支持

---

## 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

Copyright (c) 2026 Academic Integrity Platform Contributors

---

## 致谢

本项目分析并参考了以下领域的研究与工具：

- 知网 (CNKI) 学术不端检测系统
- GPTZero AI 文本检测
- IEEE 区块链学术存证标准
- Neo4j 图数据库 (社区版)
- Anthropic Claude API

---

<p align="center">
  <sub>Built with ❤️ for academic integrity</sub>
</p>
