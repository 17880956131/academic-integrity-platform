"""
论文智能审核系统 — 检测编排器
Academic Integrity Platform v3.0

并行调度7大检测引擎，统一降级管理
"""

import asyncio
from typing import Dict, Any, Optional, List
from dataclasses import dataclass, field
from datetime import datetime, timezone

from engines.detection_engine import (
    DetectionRequest,
    DetectionReport,
    BlockchainEngine,
    ECUEngine,
    PlagiarismEngine,
    AIDetectEngine,
    CreativeEngine,
    TerminologyEngine,
)


@dataclass
class DetectionTask:
    """检测任务"""
    task_id: str
    request: DetectionRequest
    status: str = "pending"  # pending | running | completed | failed
    progress: int = 0
    report: Optional[DetectionReport] = None
    created_at: str = field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class DetectionOrchestrator:
    """检测编排器 — 并行调度 + 降级管理"""

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
        self._tasks: Dict[str, DetectionTask] = {}  # 内存任务存储

    async def detect(self, request: DetectionRequest) -> DetectionReport:
        """
        执行完整检测流程

        并行执行除 ECU(依赖查重结果) 外的所有引擎
        """
        report = DetectionReport(
            paper_id=request.paper_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            overall_score=0,
        )

        # 区块链存证 (同步, 最快)
        if request.options.get("blockchain", True):
            report.blockchain = BlockchainEngine.certify(
                request.content, request.author
            )

        # 并行启动所有异步引擎
        tasks = []

        if request.options.get("plagiarism", True):
            tasks.append(
                ("plagiarism", self._safe_detect(request.content, self.plagiarism))
            )
        if request.options.get("ai_detect", True):
            tasks.append(
                ("ai_detect", self._safe_detect(request.content, self.ai_detect))
            )
        if request.options.get("creative", True):
            summary = request.content[:500]
            tasks.append(
                ("creative", self._safe_detect(request.paper_id, self.creative, summary))
            )
        if request.options.get("terminology", True):
            tasks.append(
                ("terminology", self._safe_detect("核心术语", self.terminology, request.content))
            )

        # 等待所有异步任务完成
        for name, coro in tasks:
            try:
                result = await asyncio.wait_for(coro, timeout=30)
                setattr(report, name, result)
            except asyncio.TimeoutError:
                report.errors.append(f"{name}: timeout (30s)")
                setattr(report, name, {"_error": "timeout", "_fallback": True})
            except Exception as e:
                report.errors.append(f"{name}: {str(e)}")
                setattr(report, name, {"_error": str(e), "_fallback": True})

        # ECU计算 (依赖查重结果)
        if request.options.get("ecu", True):
            try:
                novelty = (
                    100 - report.plagiarism.get("similarity", 0)
                    if report.plagiarism and isinstance(report.plagiarism, dict)
                    else 50
                )
                report.ecu = ECUEngine.compute(
                    novelty_score=novelty,
                    citation_score=10,
                    methodology_score=70,
                )
            except Exception as e:
                report.errors.append(f"ecu: {str(e)}")

        # 综合评分
        report.overall_score = self._compute_overall(report)

        return report

    async def _safe_detect(self, *args) -> Dict[str, Any]:
        """
        安全检测包装器，自动降级

        检测引擎调用模式:
          PlagiarismEngine/AIDetectEngine/TerminologyEngine:
            engine.detect(content)
          CreativeEngine:
            engine.verify(paper_id, summary)
        """
        engine = args[1]
        try:
            if isinstance(engine, CreativeEngine):
                return await engine.verify(args[0], args[2])
            elif isinstance(engine, TerminologyEngine):
                return await engine.trace(args[0], args[2])
            else:
                return await engine.detect(args[0])
        except Exception:
            # 降级: 返回带标记的空结果
            return {
                "_error": "detection failed",
                "_fallback": True,
                "_engine": engine.__class__.__name__,
            }

    def _compute_overall(self, report: DetectionReport) -> int:
        """计算综合评分 (0-100)"""
        scores = []

        if report.plagiarism and isinstance(report.plagiarism, dict):
            sim = report.plagiarism.get("similarity", 50)
            scores.append(100 - sim)

        if report.ai_detect and isinstance(report.ai_detect, dict):
            ai_prob = report.ai_detect.get("ai_probability", 50)
            scores.append(100 - ai_prob)

        if report.creative and isinstance(report.creative, dict):
            cd = report.creative.get("cross_domain", {})
            scores.append(cd.get("originality_score", 70))

        if report.ecu and isinstance(report.ecu, dict):
            scores.append(report.ecu.get("ecu_score", 50))

        return round(sum(scores) / len(scores)) if scores else 0

    def get_task_status(self, task_id: str) -> Optional[DetectionTask]:
        """查询任务状态"""
        return self._tasks.get(task_id)
