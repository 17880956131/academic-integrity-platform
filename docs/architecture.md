# 论文审核系统 — 后端架构设计

## 三层架构: 本地核心 + API 增强 + 降级策略

```
┌─────────────────────────────────────────────────────────┐
│                    前端 SPA (已完成)                       │
│              paper-review-system/                         │
│              Hash路由 · 10页面 · Mock数据驱动               │
└────────────────────────┬────────────────────────────────┘
                         │ REST API (JSON)
                         │ POST /api/detect
                         │ GET  /api/report/{id}
                         │ GET  /api/term/{name}
                         │ POST /api/certify
┌────────────────────────▼────────────────────────────────┐
│                  FastAPI 后端服务                          │
│                  port: 8000                               │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              检测编排器 (Orchestrator)              │   │
│  │  - 接收检测请求                                    │   │
│  │  - 并行调度各检测模块                               │   │
│  │  - 聚合结果 → 统一 JSON 响应                       │   │
│  └────┬─────────┬─────────┬──────────┬──────────────┘   │
│       │         │         │          │                   │
│  ┌────▼───┐ ┌───▼────┐ ┌──▼───┐ ┌───▼──────┐           │
│  │本地引擎 │ │API网关  │ │缓存层 │ │任务队列   │           │
│  │        │ │        │ │      │ │          │           │
│  │SHA-256 │ │知网API │ │Redis │ │Celery/RQ │           │
│  │TF-IDF  │ │GPTZero │ │结果  │ │异步检测   │           │
│  │ECU模型 │ │Claude  │ │缓存  │ │大论文     │           │
│  │Neo4j   │ │万方API │ │7天   │ │排队处理   │           │
│  │RoBERTa │ │        │ │      │ │          │           │
│  └────────┘ └────────┘ └──────┘ └──────────┘           │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              降级管理器 (Fallback Manager)          │   │
│  │  - API 超时 30s → 自动切换本地方案                  │   │
│  │  - API 错误率 >10% → 熔断 5min                      │   │
│  │  - 本地方案无法覆盖 → 返回 partial_result + 标注     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 目录结构

```
paper-review-backend/
├── main.py                  # FastAPI 入口
├── config.py                # 配置 (API Keys, 阈值)
├── requirements.txt
├── orchestrator/
│   └── detector.py          # 检测编排器
├── engines/
│   ├── plagiarism.py        # 文字查重引擎
│   ├── ai_detect.py         # AI生成检测引擎
│   ├── creative.py          # 创意验证引擎 (Claude)
│   ├── terminology.py       # 术语溯源引擎
│   ├── blockchain.py        # 区块链存证引擎
│   └── ecu.py               # ECU创新势能引擎
├── gateway/
│   ├── cnki_client.py       # 知网API客户端
│   ├── gptzero_client.py    # GPTZero客户端
│   └── claude_client.py     # Claude API客户端
├── fallback/
│   ├── local_plagiarism.py  # 本地TF-IDF查重
│   └── local_ai_detect.py   # 本地RoBERTa检测
├── models/
│   └── schemas.py           # Pydantic数据模型
└── tests/
    └── test_engines.py
```

## API 端点设计

```
POST   /api/v1/detect              # 提交检测 (异步)
GET    /api/v1/detect/{task_id}    # 查询检测进度
GET    /api/v1/report/{report_id}  # 获取检测报告
POST   /api/v1/certify             # 区块链存证
GET    /api/v1/term/{term_name}    # 术语查询
POST   /api/v1/term/register      # 术语注册
GET    /api/v1/health             # 健康检查
```

## 数据流

```
用户提交论文
  │
  ▼
POST /api/v1/detect
  │
  ▼
Orchestrator 并行调度:
  ├─► 文字查重 ──► 知网API ──► (降级: TF-IDF本地)
  ├─► AI检测   ──► GPTZero ──► (降级: RoBERTa本地)
  ├─► 创意验证 ──► Claude  ──► (不可降级, 标注)
  ├─► 术语溯源 ──► Neo4j   ──► (纯本地)
  ├─► 区块链   ──► SHA-256 ──► (纯本地)
  └─► ECU计算  ──► 数学公式 ──► (纯本地)
  │
  ▼
聚合结果 → 缓存 (Redis, 7天)
  │
  ▼
返回统一 Report JSON
```

## 部署拓扑

```
开发环境:
  - FastAPI: uvicorn 单进程
  - Neo4j: Docker 本地
  - Redis: Docker 本地
  - GPU: 可选 (RoBERTa 可用 CPU)

生产环境 (小规模 <1000篇/月):
  - FastAPI: Gunicorn + Uvicorn workers (4进程)
  - Neo4j: 云数据库 4GB RAM
  - Redis: 云Redis 1GB
  - 总成本: ~¥500/月 (不含API费用)

生产环境 (中规模 >1000篇/月):
  - K8s 部署 + HPA 自动扩缩
  - GPU节点 (T4) for RoBERTa
  - 总成本: ~¥3,000/月 (不含API费用)
```
