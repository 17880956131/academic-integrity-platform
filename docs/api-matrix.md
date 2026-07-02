# 论文审核系统 — API 依赖矩阵

## 七大检测机制的 API 依赖与替代方案

| # | 检测机制 | API 依赖等级 | 推荐外部 API | 本地替代方案 | 部署形态 |
|---|---------|:---------:|------------|------------|:------:|
| 1 | **文字查重** | ★★★ 必须 | 知网API / 万方API / Turnitin | TF-IDF + Cosine Similarity | 混合 |
| 2 | **AI生成检测** | ★★★ 必须 | GPTZero / Originality.ai / GLTR | 本地 perplexity 模型 | 混合 |
| 3 | **创意验证** | ★★★ 必须 | Claude API / GPT-4 API | 无 | 纯API |
| 4 | **术语溯源** | ★★ 混合 | 语义相似度API | Neo4j本地图谱 | 混合 |
| 5 | **区块链存证** | ★ 本地 | IEEE学术链API(可选) | SHA-256 + 时间戳 | 本地 |
| 6 | **ECU创新势能** | ☆ 纯本地 | — | 数学公式直接计算 | 本地 |
| 7 | **脑认知指纹** | ⚡ 硬件 | — | EEG设备采集 | 硬件 |

---

## 各机制详细说明

### 1. 文字查重 (Plagiarism Detection)

```
输入: 待检测论文全文 (txt/pdf/docx)
输出: 相似度% + 重复段落定位 + 来源标注

外部API方案:
  - 知网查重API: https://check.cnki.net/ (需机构授权)
  - 万方相似性检测: https://check.wanfangdata.com.cn/
  - Turnitin API: https://api.turnitin.com/

本地方案 (小规模/离线):
  - 算法: TF-IDF 向量化 → Cosine Similarity → 滑动窗口匹配
  - 语料库: 本地论文库 (SQLite/PostgreSQL + pgvector)
  - 召回率: ~70% (vs 知网 95%+)
  - 适用: 内部预审、非正式场景

推荐策略: API 为主 + 本地兜底
  - 正常: 调用知网/万方API，结果缓存7天
  - 降级: API不可用时自动切换到本地TF-IDF
  - 异步: 大论文(>50页)走异步队列，轮询结果
```

### 2. AI生成检测 (AI Generation Detection)

```
输入: 论文文本分段
输出: 每段AI生成概率 + 模型指纹匹配 + 置信度

外部API方案:
  - GPTZero: https://gptzero.me/api (edu授权可用)
  - Originality.ai: https://originality.ai/api
  - Sapling AI Detector: https://sapling.ai/

本地方案:
  - 模型: RoBERTa-base 微调分类器 (HuggingFace)
  - 特征: perplexity、burstiness、token分布熵
  - 依赖: transformers + torch (GPU推荐)
  - 精度: ~85% (vs GPTZero 95%+)

推荐策略: 双层检测
  - L1 (快速): 本地 perplexity + burstiness 快速筛选
  - L2 (精准): 高风险段落 (>60%) 调GPTZero确认
```

### 3. 创意验证 (Creative Verification)

```
输入: 论文的"创意要素"摘要文字
输出: 创意解构 + 虚拟模拟验证 + 跨领域比对

这是最依赖LLM推理能力的环节，本地方案不可行。

外部API方案:
  - Claude API (Anthropic): 推荐 — 长上下文、免费层慷慨
    模型: claude-sonnet-4-20250514
    成本: $3/M input tokens, $15/M output tokens
  - GPT-4 API (OpenAI):
    模型: gpt-4o
    成本: $2.5/M input, $10/M output

Prompt 模式:
  1. 创意要素解构 → System Prompt + 结构化输出
  2. 虚拟模拟验证 → Chain-of-Thought 推理
  3. 跨领域比对 → RAG + 知识库检索

推荐策略: 纯API + 结果缓存
  - Claude 为主: 成本低、长上下文优势
  - 缓存: 相同论文ID的结果永久缓存
```

### 4. 术语溯源 (Terminology Tracing)

```
输入: 术语名 + 论文上下文
输出: 首次使用记录 + 知识图谱关系 + 语义锚点

混合方案:
  - 本地: Neo4j/ArangoDB 存储术语知识图谱
  - API: 语义相似度比对 (all-MiniLM-L6-v2 或 Cohere Embed)

推荐策略: 本地图谱 + API 语义增强
  - 图谱查询 (<10ms): 直接查 Neo4j
  - 语义锚点: 调用 embedding API (或用本地 sentence-transformers)
```

### 5. 区块链存证 (Blockchain Certification)

```
输入: 论文原文或哈希值
输出: 存证哈希 + 时间戳 + 存证编号

纯本地方案:
  - SHA-256: Python hashlib / Node crypto
  - 时间戳: UTC毫秒级 datetime
  - 存证编号: IEEE学术链格式

外部API (可选):
  - IEEE学术链: 将哈希提交到联盟链
  - 以太坊: 智能合约存证 (Gas费高)

推荐策略: 本地为主，可选上链
  - 默认: 本地生成哈希+时间戳 (零成本)
  - 增强: 关键论文提交IEEE学术链 (需API Key)
```

### 6. ECU创新势能 (Innovation Potential)

```
纯数学计算，零API依赖:

ECU(x) = α · Novelty(x) + β · Impact(x) + γ · Feasibility(x)

其中:
  Novelty(x) = 1 - max(sim(x, corpus_i))  // 与语料库最大相似度的反比
  Impact(x) = log(1 + citation_score)       // 引用影响力对数缩放
  Feasibility(x) = σ(methodology_score)     // 方法论可行性 Sigmoid
  α=0.5, β=0.3, γ=0.2                      // 权重系数

实现: 纯Python/JS函数，无任何外部依赖。
```

### 7. 脑认知指纹 (Cognitive Fingerprint)

```
不是API问题，而是硬件采集问题:

  - 硬件: EEG脑电设备 (NeuroSky/Emotiv/OpenBCI)
  - 数据: 创作过程中的P300/N400波形特征
  - 存储: 时序数据库 (InfluxDB/TimescaleDB)
  - 比对: 动态时间规整 (DTW) 算法

当前阶段: 仅保留接口设计，不做硬件集成。
```

---

## API 费用估算 (月)

假设月处理论文 500 篇，平均 8000 字/篇:

| API 服务 | 月调用量 | 单价 | 月费 |
|---------|---------|------|-----|
| 知网查重 | 500次 | ¥3-8/次 | ¥1,500-4,000 |
| GPTZero | 500次 | $0.01/次 | $5 |
| Claude API | 1500次 | $3/M tokens | ~$120 |
| Embedding | 5000次 | $0.0001/次 | $0.50 |
| **合计** | | | **约 ¥2,300-5,000/月** |

降级方案 (纯本地):
- 知网→本地TF-IDF: 月费 ¥0 (精度降低 ~25%)
- GPTZero→RoBERTa本地: 月费 ¥0 (需GPU: ¥3,000/月云服务器)
- Claude→本地小模型: 不可行 (创意验证必须LLM)
- **最低可行** (保留Claude): **约 ¥1,000/月**
