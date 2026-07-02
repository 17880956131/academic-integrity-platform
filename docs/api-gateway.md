# API 网关配置模式

## 通用 API 客户端模式

所有外部 API 调用遵循统一模式：

```python
import httpx
from typing import Optional, Dict, Any
import asyncio

class APIGateway:
    """通用API网关基类"""

    def __init__(self, api_key: Optional[str], base_url: str, timeout: int = 30):
        self.api_key = api_key
        self.base_url = base_url
        self.timeout = timeout
        self._failure_count = 0
        self._circuit_open = False
        self._circuit_open_until = 0

    async def call(self, endpoint: str, payload: Dict) -> Dict:
        """
        统一API调用 with 熔断+重试
        """
        # 熔断检查
        if self._circuit_open:
            if time.time() < self._circuit_open_until:
                raise Exception("Circuit breaker open")
            self._circuit_open = False
            self._failure_count = 0

        for attempt in range(3):  # 最多重试3次
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    resp = await client.post(
                        f"{self.base_url}{endpoint}",
                        json=payload,
                        headers={"Authorization": f"Bearer {self.api_key}"},
                    )
                    resp.raise_for_status()
                    self._failure_count = 0
                    return resp.json()
            except Exception as e:
                self._failure_count += 1
                if attempt == 2:
                    # 熔断: 错误率 > 阈值
                    if self._failure_count > 5:
                        self._circuit_open = True
                        self._circuit_open_until = time.time() + 300  # 5分钟
                    raise
                await asyncio.sleep(2 ** attempt)  # 指数退避
```

## 各API接入要点

### 知网查重 API

```
端点: https://check.cnki.net/api/v1/check
认证: API Key (机构授权)
限制: 500次/月 (基础), 需机构邮箱注册
超时: 60s (大论文)
格式: content → JSON {similarity, matches, sources}

注意:
- 论文需预处理为纯文本 (去除图表)
- 单次限制 50,000 字
- 返回格式包含段落级匹配和来源标注
```

### GPTZero API

```
端点: https://api.gptzero.me/v2/predict/text
认证: x-api-key header
限制: 免费层 10,000 words/月, Pro $9.99/月 50,000 words
超时: 10s
格式: {document: "..."} → {documents: [{prediction, confidence}]}

注意:
- 最小文本长度: 200 字符
- 返回 per-sentence 概率
- 支持混合文本 (部分AI+部分人类)
```

### Claude API (Anthropic)

```
端点: https://api.anthropic.com/v1/messages
认证: x-api-key header
限制: 免费层 $5 credit (约 125K tokens)
超时: 60s (长推理)
模型: claude-sonnet-4-20250514 (推荐)

Prompt 最佳实践:
- System Prompt: 定义输出格式 + 专家角色
- User Message: 待分析内容
- 使用 Structured Output JSON mode
- 设置 max_tokens 至少 4096

成本控制:
- 单次创意验证: ~2000 input + ~500 output tokens
- 费用: ~$0.01/次
- 月处理500篇: ~$5
```

### Neo4j 知识图谱

```
连接: bolt://localhost:7687 (本地Docker)
认证: neo4j/密码
推荐配置:
  - Docker: neo4j:5-community
  - 内存: 至少2GB
  - 插件: APOC, GDS

Docker 启动:
  docker run -d --name neo4j-paper \
    -p 7474:7474 -p 7687:7687 \
    -e NEO4J_AUTH=neo4j/password \
    -e NEO4J_PLUGINS='["apoc", "graph-data-science"]' \
    neo4j:5-community
```

## 降级策略配置

```python
# config.py
FALLBACK_CONFIG = {
    "plagiarism": {
        "primary": "cnki",        # 知网API
        "fallback": "local_tfidf", # 本地TF-IDF
        "timeout": 30,
        "retry": 2,
        "circuit_threshold": 5,   # 连续失败5次熔断
        "circuit_cooldown": 300,  # 5分钟后恢复
    },
    "ai_detect": {
        "primary": "gptzero",
        "fallback": "local_roberta",
        "timeout": 15,
        "retry": 1,
    },
    "creative": {
        "primary": "claude",
        "fallback": None,         # 不可降级
        "timeout": 60,
        "retry": 2,
    },
}
```
