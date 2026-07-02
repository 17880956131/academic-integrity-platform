"""
论文智能审核系统 — 配置文件
Academic Integrity Platform v3.0
"""

import os


class Config:
    """全局配置 (从环境变量读取)"""

    # === 外部 API Keys ===
    # 知网查重 API (需机构授权)
    CNKI_API_KEY: str = os.getenv("CNKI_API_KEY", "")

    # 万方相似性检测 API (备用)
    WANFANG_API_KEY: str = os.getenv("WANFANG_API_KEY", "")

    # GPTZero AI 检测 API
    GPTZERO_API_KEY: str = os.getenv("GPTZERO_API_KEY", "")

    # Anthropic Claude API (创意验证)
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

    # === 数据库与中间件 ===
    # Neo4j 图数据库 (术语溯源)
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER: str = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "password")

    # Redis 缓存
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # === 检测参数 ===
    # 文字查重阈值
    PLAGIARISM_THRESHOLD: float = float(os.getenv("PLAGIARISM_THRESHOLD", "0.6"))

    # AI 检测阈值
    AI_DETECT_THRESHOLD: float = float(os.getenv("AI_DETECT_THRESHOLD", "0.5"))

    # 创意验证置信度阈值
    CREATIVE_CONFIDENCE: float = float(os.getenv("CREATIVE_CONFIDENCE", "0.7"))

    # ECU 等级阈值
    ECU_LEVEL_S: float = float(os.getenv("ECU_LEVEL_S", "80"))
    ECU_LEVEL_A: float = float(os.getenv("ECU_LEVEL_A", "65"))
    ECU_LEVEL_B: float = float(os.getenv("ECU_LEVEL_B", "50"))

    # === API 超时配置 (秒) ===
    CNKI_TIMEOUT: int = int(os.getenv("CNKI_TIMEOUT", "60"))
    GPTZERO_TIMEOUT: int = int(os.getenv("GPTZERO_TIMEOUT", "15"))
    CLAUDE_TIMEOUT: int = int(os.getenv("CLAUDE_TIMEOUT", "60"))

    # === 降级配置 ===
    # 熔断阈值: 连续失败 N 次后切换到降级方案
    CIRCUIT_BREAK_THRESHOLD: int = int(os.getenv("CIRCUIT_BREAK_THRESHOLD", "5"))
    # 熔断冷却时间 (秒)
    CIRCUIT_BREAK_COOLDOWN: int = int(os.getenv("CIRCUIT_BREAK_COOLDOWN", "300"))

    # === 缓存配置 ===
    # 检测结果缓存时间 (秒), 默认 7 天
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "604800"))
