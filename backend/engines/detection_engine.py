"""
论文审核系统 — 检测引擎模板
===========================
提供7大检测模块的Python实现骨架。
包含: 文字查重 / AI生成检测 / 创意验证 / 术语溯源 / 区块链存证 / ECU创新势能

依赖: pip install fastapi uvicorn redis neo4j sentence-transformers torch transformers httpx
"""

import hashlib
import json
import math
import time
from datetime import datetime, timezone
from typing import Optional, Dict, List, Any
from dataclasses import dataclass, field


# ============================================================
# 数据模型
# ============================================================

@dataclass
class DetectionRequest:
    paper_id: str
    title: str
    content: str          # 论文全文
    author: str
    options: Dict[str, bool] = field(default_factory=lambda: {
        "plagiarism": True,
        "ai_detect": True,
        "creative": True,
        "terminology": True,
        "blockchain": True,
        "ecu": True,
    })

@dataclass
class DetectionReport:
    paper_id: str
    timestamp: str
    overall_score: int
    plagiarism: Optional[Dict] = None
    ai_detect: Optional[Dict] = None
    creative: Optional[Dict] = None
    terminology: Optional[Dict] = None
    blockchain: Optional[Dict] = None
    ecu: Optional[Dict] = None
    errors: List[str] = field(default_factory=list)


# ============================================================
# 引擎1: 区块链存证 (纯本地, 零API依赖)
# ============================================================

class BlockchainEngine:
    """SHA-256 哈希 + 毫秒级时间戳"""

    @staticmethod
    def certify(content: str, author: str) -> Dict[str, Any]:
        sha256 = hashlib.sha256(content.encode('utf-8')).hexdigest()
        ts = datetime.now(timezone.utc)
        ts_ms = ts.strftime('%Y-%m-%dT%H:%M:%S.') + f'{ts.microsecond // 1000:03d}Z'

        return {
            "hash": f"0x{sha256[:16]}...{sha256[-8:]}",
            "full_hash": sha256,
            "timestamp": ts_ms,
            "author": author,
            "cert_id": f"IEEE-{ts.strftime('%Y%m%d')}-{sha256[:8].upper()}",
            "status": "certified",
        }


# ============================================================
# 引擎2: ECU创新势能 (纯本地, 纯数学计算)
# ============================================================

class ECUEngine:
    """
    ECU(x) = α·Novelty(x) + β·Impact(x) + γ·Feasibility(x)

    其中:
      α=0.5, β=0.3, γ=0.2
      Novelty(x) = 1 - max(sim(x, corpus_i))
      Impact(x)  = log(1 + citation_score)
      Feasibility(x) = σ(methodology_score)
    """

    ALPHA = 0.5
    BETA = 0.3
    GAMMA = 0.2

    @staticmethod
    def sigmoid(x: float) -> float:
        return 1 / (1 + math.exp(-x))

    @staticmethod
    def compute(
        novelty_score: float,      # 0-100, 来自查重反比
        citation_score: int,       # 预计引用数
        methodology_score: float,  # 0-100, 方法论评分
    ) -> Dict[str, Any]:
        novelty = novelty_score / 100.0
        impact = math.log(1 + citation_score) / math.log(1 + 100)  # 归一化
        feasibility = ECUEngine.sigmoid((methodology_score - 50) / 15)

        ecu = ECUEngine.ALPHA * novelty + ECUEngine.BETA * impact + ECUEngine.GAMMA * feasibility
        ecu_scaled = round(ecu * 100, 1)

        level = "S" if ecu_scaled >= 80 else "A" if ecu_scaled >= 65 else "B" if ecu_scaled >= 50 else "C"

        return {
            "ecu_score": ecu_scaled,
            "level": level,
            "components": {
                "novelty": round(novelty * 100, 1),
                "impact": round(impact * 100, 1),
                "feasibility": round(feasibility * 100, 1),
            },
            "density": f"{ecu_scaled:.1f} ECU/千字",
            "model": "ECU(x) = 0.5·Novelty + 0.3·Impact + 0.2·Feasibility",
        }


# ============================================================
# 引擎3: 文字查重 (API优先 + 本地降级)
# ============================================================

class PlagiarismEngine:
    """
    策略: 知网API > 万方API > 本地TF-IDF
    """

    def __init__(self, cnki_api_key: Optional[str] = None, wanfang_api_key: Optional[str] = None):
        self.cnki_key = cnki_api_key
        self.wanfang_key = wanfang_api_key
        self._corpus = []  # 本地语料库缓存

    async def detect(self, content: str) -> Dict[str, Any]:
        # 尝试知网API
        if self.cnki_key:
            try:
                return await self._call_cnki(content)
            except Exception:
                pass

        # 降级: 万方
        if self.wanfang_key:
            try:
                return await self._call_wanfang(content)
            except Exception:
                pass

        # 最终降级: 本地TF-IDF
        return self._local_tfidf(content)

    async def _call_cnki(self, content: str) -> Dict[str, Any]:
        """调用知网查重API (需机构授权)"""
        import httpx
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                "https://check.cnki.net/api/v1/check",
                json={"content": content},
                headers={"Authorization": f"Bearer {self.cnki_key}"},
            )
            return resp.json()

    async def _call_wanfang(self, content: str) -> Dict[str, Any]:
        """调用万方相似性检测API"""
        import httpx
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                "https://check.wanfangdata.com.cn/api/similarity",
                json={"text": content},
                headers={"Authorization": f"Bearer {self.wanfang_key}"},
            )
            return resp.json()

    def _local_tfidf(self, content: str) -> Dict[str, Any]:
        """
        本地TF-IDF + Cosine Similarity 查重

        精度: ~70% (vs 知网95%+)
        适用: 内部预审、离线场景、API降级
        """
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity
        import re

        # 中文分词 (简易: 按字符+标点边界)
        def simple_tokenize(text: str) -> str:
            text = re.sub(r'[^\u4e00-\u9fff\w]', ' ', text)
            return ' '.join(text)

        # 分句
        sentences = [s.strip() for s in re.split(r'[。！？\n]', content) if len(s.strip()) > 20]
        if len(sentences) < 2:
            return {"similarity": 0, "matches": [], "engine": "local-tfidf", "note": "文本过短"}

        # TF-IDF 向量化
        vectorizer = TfidfVectorizer(tokenizer=simple_tokenize, max_features=5000)
        try:
            tfidf_matrix = vectorizer.fit_transform(sentences)
        except ValueError:
            return {"similarity": 0, "matches": [], "engine": "local-tfidf"}

        # 两两比对
        matches = []
        for i in range(len(sentences)):
            for j in range(i + 1, len(sentences)):
                sim = cosine_similarity(tfidf_matrix[i], tfidf_matrix[j])[0][0]
                if sim > 0.6:  # 相似阈值
                    matches.append({
                        "source_sentence": i,
                        "target_sentence": j,
                        "similarity": round(sim * 100, 1),
                        "source_text": sentences[i][:80],
                        "target_text": sentences[j][:80],
                    })

        overall_sim = sum(m["similarity"] for m in matches) / max(len(matches), 1) if matches else 0

        return {
            "similarity": round(overall_sim, 1),
            "matches": matches[:10],  # Top 10
            "total_segments": len(sentences),
            "matched_segments": len(matches),
            "engine": "local-tfidf",
            "warning": "本结果为本地TF-IDF估算，精度约70%，建议使用知网API获取准确结果",
        }


# ============================================================
# 引擎4: AI生成检测 (API优先 + 本地RoBERTa降级)
# ============================================================

class AIDetectEngine:
    """
    策略: GPTZero API > 本地 RoBERTa 分类器
    L1快速筛选 → L2精准确认
    """

    MODEL_FINGERPRINTS = {
        "gpt-4": {"perplexity_range": (5, 25), "burstiness_sig": 0.3},
        "claude-3": {"perplexity_range": (8, 30), "burstiness_sig": 0.35},
        "gemini": {"perplexity_range": (6, 28), "burstiness_sig": 0.32},
    }

    def __init__(self, gptzero_api_key: Optional[str] = None):
        self.gptzero_key = gptzero_api_key
        self._local_model = None

    async def detect(self, content: str) -> Dict[str, Any]:
        # L1: 快速本地筛选 (perplexity + burstiness)
        segments = self._split_segments(content)
        l1_results = []
        high_risk_segments = []

        for seg in segments:
            ppl = self._compute_perplexity(seg)
            burst = self._compute_burstiness(seg)
            risk = self._assess_risk(ppl, burst)
            l1_results.append({"text": seg[:50], "perplexity": ppl, "burstiness": burst, "risk": risk})
            if risk > 0.6:
                high_risk_segments.append(seg)

        # L2: 高风险段落调用GPTZero精准确认
        if self.gptzero_key and high_risk_segments:
            try:
                l2_results = await self._call_gptzero("\n".join(high_risk_segments))
            except Exception:
                l2_results = self._local_model_detect(high_risk_segments)
        else:
            l2_results = self._local_model_detect(high_risk_segments) if high_risk_segments else []

        overall_ai_prob = sum(r["risk"] for r in l1_results) / max(len(l1_results), 1)

        return {
            "ai_probability": round(overall_ai_prob * 100, 1),
            "segments_analyzed": len(segments),
            "high_risk_segments": len(high_risk_segments),
            "l1_results": l1_results,
            "l2_results": l2_results,
            "model_fingerprint": self._match_fingerprint(l1_results),
            "engine": "gptzero" if self.gptzero_key else "local-roberta",
        }

    def _split_segments(self, content: str, min_len: int = 100) -> List[str]:
        import re
        parts = re.split(r'\n\n+', content)
        return [p.strip() for p in parts if len(p.strip()) >= min_len]

    def _compute_perplexity(self, text: str) -> float:
        """
        简化版 perplexity 计算 (生产环境用 transformers)
        基于 token 分布熵估算
        """
        import math
        from collections import Counter

        # 字符级 n-gram 分布熵
        chars = list(text)
        if len(chars) < 3:
            return 50.0

        bigrams = [''.join(chars[i:i+2]) for i in range(len(chars)-1)]
        counter = Counter(bigrams)
        total = sum(counter.values())
        entropy = -sum((c/total) * math.log2(c/total) for c in counter.values() if c > 0)

        # 熵映射到 perplexity 范围 (5-50)
        return max(5, min(50, 2 ** entropy * 3))

    def _compute_burstiness(self, text: str) -> float:
        """句子长度方差 → burstiness 指标"""
        import re
        sentences = re.split(r'[。！？.!?]', text)
        lengths = [len(s) for s in sentences if len(s) > 5]
        if len(lengths) < 3:
            return 0.5

        mean_len = sum(lengths) / len(lengths)
        variance = sum((l - mean_len) ** 2 for l in lengths) / len(lengths)
        return min(1.0, variance / (mean_len * 10))  # 归一化到0-1

    def _assess_risk(self, perplexity: float, burstiness: float) -> float:
        """
        AI文本特征: 低perplexity + 低burstiness = 高AI生成概率
        人类文本: 高perplexity + 高burstiness
        """
        ppl_score = 1 - (perplexity / 50)  # 困惑度越低，越像AI
        burst_score = 1 - burstiness       # 突发性越低，越像AI
        return (ppl_score * 0.6 + burst_score * 0.4)

    def _match_fingerprint(self, results: List[Dict]) -> Optional[str]:
        """匹配已知AI模型的指纹特征"""
        if not results:
            return None
        avg_ppl = sum(r["perplexity"] for r in results) / len(results)
        avg_burst = sum(r["burstiness"] for r in results) / len(results)

        for model, fp in self.MODEL_FINGERPRINTS.items():
            if fp["perplexity_range"][0] <= avg_ppl <= fp["perplexity_range"][1]:
                if abs(avg_burst - fp["burstiness_sig"]) < 0.15:
                    return model
        return "unknown"

    async def _call_gptzero(self, text: str) -> List[Dict]:
        import httpx
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                "https://api.gptzero.me/v2/predict/text",
                json={"document": text},
                headers={"x-api-key": self.gptzero_key},
            )
            return resp.json().get("results", [])

    def _local_model_detect(self, segments: List[str]) -> List[Dict]:
        """
        本地 RoBERTa 分类器 (生产环境需加载模型)
        此处为骨架，实际使用需:
          from transformers import pipeline
          classifier = pipeline("text-classification", model="roberta-base-openai-detector")
        """
        results = []
        for seg in segments:
            results.append({
                "text": seg[:80],
                "ai_probability": round(60 + hash(seg) % 30, 1),  # 模拟值
                "engine": "local-roberta",
                "note": "模拟结果，生产环境需加载RoBERTa模型",
            })
        return results


# ============================================================
# 引擎5: 创意验证 (纯API, Claude LLM)
# ============================================================

class CreativeEngine:
    """创意要素解构 + 虚拟模拟验证 (必须LLM)"""

    SYSTEM_PROMPT = """你是一个学术创意验证专家。你的任务是对论文的创意要素进行结构化分析。

请严格按以下JSON格式输出（不要输出其他内容）：
{
  "creative_elements": [
    {"name": "要素名", "type": "理论创新/方法创新/应用创新", "novelty": 1-100, "description": "简述"}
  ],
  "decomposition": {
    "core_claim": "核心主张",
    "supporting_evidence": ["论据1", "论据2"],
    "logical_chain": "逻辑链条",
    "assumptions": ["假设1"]
  },
  "virtual_validation": {
    "counterfactual_test": "反事实推演结果",
    "boundary_test": "边界条件测试",
    "generalization_test": "泛化性评估",
    "robustness_score": 1-100
  },
  "cross_domain": {
    "similar_ideas": ["相似创意1"],
    "difference_analysis": "差异性分析",
    "originality_score": 1-100
  },
  "risk_warnings": [
    {"level": "高/中/低", "type": "逻辑漏洞/假设脆弱/适用范围窄", "detail": "说明"}
  ]
}"""

    def __init__(self, claude_api_key: Optional[str] = None):
        self.claude_key = claude_api_key
        self._cache: Dict[str, Dict] = {}  # paper_id → result

    async def verify(self, paper_id: str, creative_summary: str) -> Dict[str, Any]:
        """
        创意验证 (必须API)

        Args:
            paper_id: 论文ID (用于缓存)
            creative_summary: 论文的创意要素摘要 (200-500字)

        Returns:
            结构化创意验证结果
        """
        # 缓存命中
        if paper_id in self._cache:
            return {**self._cache[paper_id], "_cached": True}

        if not self.claude_key:
            return {
                "_error": "创意验证需要 Claude API，请设置 ANTHROPIC_API_KEY",
                "_fallback": "无法降级为本地方案 —— LLM推理不可替代",
            }

        result = await self._call_claude(creative_summary)
        self._cache[paper_id] = result
        return result

    async def _call_claude(self, creative_summary: str) -> Dict[str, Any]:
        """调用 Claude API 进行创意验证"""
        import httpx

        user_prompt = f"""请分析以下论文的创意要素：

{creative_summary}

请严格按照系统要求的JSON格式输出分析结果。"""

        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": self.claude_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-sonnet-4-20250514",
                    "max_tokens": 4096,
                    "system": self.SYSTEM_PROMPT,
                    "messages": [{"role": "user", "content": user_prompt}],
                },
            )
            data = resp.json()
            content = data["content"][0]["text"]

            # 提取 JSON
            import re
            json_match = re.search(r'\{[\s\S]*\}', content)
            if json_match:
                return json.loads(json_match.group())
            return {"_raw": content, "_error": "JSON解析失败"}


# ============================================================
# 引擎6: 术语溯源 (本地Neo4j + 可选API语义增强)
# ============================================================

class TerminologyEngine:
    """知识图谱 + 语义锚点"""

    def __init__(self, neo4j_uri: Optional[str] = None):
        self.neo4j_uri = neo4j_uri or "bolt://localhost:7687"

    async def trace(self, term: str, context: str) -> Dict[str, Any]:
        """
        术语溯源

        1. Neo4j 图谱查询 → 首次使用记录、演化路径
        2. 语义锚点 → 与上下文的相关度
        """
        graph_result = await self._query_graph(term)
        semantic_anchor = self._compute_semantic_anchor(term, context)

        return {
            "term": term,
            "first_use": graph_result.get("first_use"),
            "evolution_path": graph_result.get("evolution", []),
            "semantic_anchor": semantic_anchor,
            "related_terms": graph_result.get("related", []),
            "ontology_level": graph_result.get("ontology_level", "unknown"),
        }

    async def _query_graph(self, term: str) -> Dict[str, Any]:
        """查询Neo4j术语知识图谱"""
        try:
            from neo4j import AsyncGraphDatabase
            driver = AsyncGraphDatabase.driver(self.neo4j_uri)
            async with driver.session() as session:
                result = await session.run(
                    """
                    MATCH (t:Term {name: $term})
                    OPTIONAL MATCH (t)-[:FIRST_USED_IN]->(p:Paper)
                    OPTIONAL MATCH (t)-[:EVOLVED_TO*1..3]->(e:Term)
                    OPTIONAL MATCH (t)-[:RELATED_TO]->(r:Term)
                    RETURN t, p, collect(DISTINCT e.name) as evolutions,
                           collect(DISTINCT r.name) as related
                    """,
                    term=term,
                )
                record = await result.single()
                if record:
                    t = record["t"]
                    return {
                        "first_use": dict(record["p"]) if record["p"] else None,
                        "evolution": record["evolutions"] or [],
                        "related": record["related"] or [],
                        "ontology_level": t.get("level", "unknown"),
                    }
        except Exception:
            pass

        # 图谱不可用 → 返回空结果
        return {
            "first_use": None,
            "evolution": [],
            "related": [],
            "ontology_level": "unknown",
            "_note": "Neo4j未连接，图谱查询不可用",
        }

    def _compute_semantic_anchor(self, term: str, context: str) -> Dict[str, Any]:
        """
        语义锚点: 术语在上下文中的语义定位

        生产环境: 使用 sentence-transformers 计算 term 与 context 各句的相似度
        """
        # 简化版: 基于关键词共现
        import re
        sentences = re.split(r'[。！？\n]', context)
        anchor_scores = []
        for i, sent in enumerate(sentences):
            if term in sent:
                # 术语出现位置附近的句子权重更高
                anchor_scores.append({
                    "sentence_index": i,
                    "sentence": sent[:100],
                    "relevance": 0.8 if i < len(sentences) * 0.3 else 0.5,  # 靠前出现权重高
                })

        return {
            "occurrences": len(anchor_scores),
            "anchors": anchor_scores[:5],
            "primary_location": "前段" if anchor_scores and anchor_scores[0]["sentence_index"] < len(sentences) * 0.3 else "中后段",
        }


# ============================================================
# 检测编排器
# ============================================================

class DetectionOrchestrator:
    """编排7大检测引擎，并行执行"""

    def __init__(
        self,
        cnki_key: Optional[str] = None,
        gptzero_key: Optional[str] = None,
        claude_key: Optional[str] = None,
        neo4j_uri: Optional[str] = None,
    ):
        self.plagiarism = PlagiarismEngine(cnki_key)
        self.ai_detect = AIDetectEngine(gptzero_key)
        self.creative = CreativeEngine(claude_key)
        self.terminology = TerminologyEngine(neo4j_uri)

    async def detect(self, request: DetectionRequest) -> DetectionReport:
        import asyncio

        report = DetectionReport(
            paper_id=request.paper_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            overall_score=0,
        )

        tasks = []

        # 区块链存证 (同步, 最快)
        if request.options.get("blockchain"):
            report.blockchain = BlockchainEngine.certify(request.content, request.author)

        # 并行启动各引擎
        if request.options.get("plagiarism"):
            tasks.append(("plagiarism", self.plagiarism.detect(request.content)))
        if request.options.get("ai_detect"):
            tasks.append(("ai_detect", self.ai_detect.detect(request.content)))
        if request.options.get("creative"):
            summary = request.content[:500]  # 取摘要用于创意验证
            tasks.append(("creative", self.creative.verify(request.paper_id, summary)))
        if request.options.get("terminology"):
            tasks.append(("terminology", self.terminology.trace("核心术语", request.content)))

        # 等待所有异步任务完成
        for name, coro in tasks:
            try:
                result = await asyncio.wait_for(coro, timeout=30)
                setattr(report, name, result)
            except asyncio.TimeoutError:
                report.errors.append(f"{name}: 超时")
                setattr(report, name, {"_error": "timeout"})
            except Exception as e:
                report.errors.append(f"{name}: {str(e)}")
                setattr(report, name, {"_error": str(e)})

        # ECU计算 (依赖查重结果)
        if request.options.get("ecu"):
            novelty = 100 - (report.plagiarism.get("similarity", 0) if report.plagiarism else 0)
            report.ecu = ECUEngine.compute(
                novelty_score=novelty,
                citation_score=10,  # 可从外部获取
                methodology_score=70,
            )

        # 综合评分
        scores = []
        if report.plagiarism and "similarity" in report.plagiarism:
            scores.append(100 - report.plagiarism["similarity"])
        if report.ai_detect and "ai_probability" in report.ai_detect:
            scores.append(100 - report.ai_detect["ai_probability"])
        if report.creative and "decomposition" in report.creative:
            scores.append(report.creative.get("cross_domain", {}).get("originality_score", 70))
        if report.ecu and "ecu_score" in report.ecu:
            scores.append(report.ecu["ecu_score"])

        report.overall_score = round(sum(scores) / len(scores)) if scores else 0

        return report


# ============================================================
# 使用示例
# ============================================================

async def example_usage():
    """演示完整检测流程"""
    orch = DetectionOrchestrator(
        # 不传API Key时使用本地方案
    )

    req = DetectionRequest(
        paper_id="PAPER-2026-001",
        title="基于深度学习的纳米药物递送系统研究",
        content="本文提出了一种新型的纳米药物递送系统..." * 50,  # 模拟论文内容
        author="张三 · 清华大学",
    )

    report = await orch.detect(req)
    print(json.dumps({
        "paper_id": report.paper_id,
        "overall_score": report.overall_score,
        "blockchain": report.blockchain,
        "ecu": report.ecu,
        "errors": report.errors,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    import asyncio
    asyncio.run(example_usage())
