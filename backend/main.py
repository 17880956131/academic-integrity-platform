"""
论文智能审核系统 — FastAPI 后端入口
Academic Integrity Platform v3.0
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import sys
import os

# 添加引擎路径
sys.path.insert(0, os.path.dirname(__file__))

from engines.detection_engine import DetectionOrchestrator, DetectionRequest
from config import Config


# 全局检测编排器
orchestrator: DetectionOrchestrator = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    global orchestrator
    orchestrator = DetectionOrchestrator(
        cnki_key=Config.CNKI_API_KEY,
        gptzero_key=Config.GPTZERO_API_KEY,
        claude_key=Config.ANTHROPIC_API_KEY,
        neo4j_uri=Config.NEO4J_URI,
    )
    yield
    # 清理资源
    pass


app = FastAPI(
    title="Academic Integrity Platform API",
    description="论文智能审核系统后端服务 — 7大检测引擎",
    version="3.0.0",
    lifespan=lifespan,
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health")
async def health_check():
    """健康检查"""
    return {
        "status": "ok",
        "version": "3.0.0",
        "engines": {
            "blockchain": "ready",
            "ecu": "ready",
            "plagiarism": "ready" if Config.CNKI_API_KEY else "local-only",
            "ai_detect": "ready" if Config.GPTZERO_API_KEY else "local-only",
            "creative": "ready" if Config.ANTHROPIC_API_KEY else "api-required",
            "terminology": "ready" if Config.NEO4J_URI else "local-only",
        },
    }


@app.post("/api/v1/detect")
async def submit_detection(request: DetectionRequest):
    """提交论文检测 (异步)"""
    report = await orchestrator.detect(request)
    return {
        "code": 0,
        "message": "detection complete",
        "data": report,
    }


@app.post("/api/v1/certify")
async def certify_content(content: str, author: str = "anonymous"):
    """区块链存证 (同步)"""
    from engines.detection_engine import BlockchainEngine
    result = BlockchainEngine.certify(content, author)
    return {
        "code": 0,
        "data": result,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
