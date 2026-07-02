/**
 * AI生成检测页面
 */
const PageAIDetection = {
  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>AI生成检测</h1>
            <p>20+主流AI模型指纹识别 · 跨语言语义分析 · 创作过程验证</p>
          </div>
          <div class="topbar-right">
            <button class="btn btn-primary" onclick="Router.navigate('submit')">+ 提交检测</button>
          </div>
        </div>

        <div class="grid-3">
          <div class="metric-card">
            <div class="metric-label">检测模型数</div>
            <div class="metric-value">20+</div>
            <div class="metric-delta up">GPT-4 / Claude / Gemini / 文心一言 / Sora</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">识别准确率</div>
            <div class="metric-value">98.7%</div>
            <div class="metric-delta up">↑ 持续学习中</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">今日检出</div>
            <div class="metric-value">161</div>
            <div class="metric-delta down">↑ 检出率 8.7%</div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header"><h3>支持检测的AI模型</h3></div>
            <div class="card-body">
              ${this.renderModelList()}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>三重检测体系</h3></div>
            <div class="card-body">
              <div style="margin-bottom:16px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span style="width:20px;height:20px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">1</span>
                  <b style="font-size:13px">文字层检测</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.6;padding-left:28px">
                  传统文本比对（知网/Turnitin）+ AI生成特征库 · 识别特定模型的代码注释习惯、公式排版风格
                </div>
              </div>
              <div style="margin-bottom:16px">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span style="width:20px;height:20px;border-radius:50%;background:var(--purple);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">2</span>
                  <b style="font-size:13px">语义层检测</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.6;padding-left:28px">
                  深度学习模型构建文本"语义指纹" · 解析术语保留率、公式重组误差 · 检测改写后的残留AI痕迹
                </div>
              </div>
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span style="width:20px;height:20px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600">3</span>
                  <b style="font-size:13px">逻辑层检测</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.6;padding-left:28px">
                  动态对抗网络（DAN）模拟降重行为 · 追溯论证框架原创性 · 检测"模板化论证结构"
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3>误判风险与应对</h3></div>
          <div class="card-body">
            <div class="grid-3">
              <div style="padding:14px;background:var(--bg-warning);border-radius:var(--radius-md)">
                <b style="font-size:12px;color:var(--amber)">文学性文本误判</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;line-height:1.5">朱自清《荷塘月色》被判62.88% AI生成概率 · 创造性表达与机械生成的区分能力不足</p>
              </div>
              <div style="padding:14px;background:var(--bg-warning);border-radius:var(--radius-md)">
                <b style="font-size:12px;color:var(--amber)">专业领域误判</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;line-height:1.5">理工科论文因术语规范、逻辑严谨，"规范性表达"易被误判为AI生成</p>
              </div>
              <div style="padding:14px;background:var(--bg-danger);border-radius:var(--radius-md)">
                <b style="font-size:12px;color:var(--red)">对抗性规避</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:6px;line-height:1.5">中英文互译三次可使AI率从72%降至11% · 故意拼写错误可提升通过率45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderModelList() {
    const models = [
      { name: 'GPT-4', vendor: 'OpenAI', accuracy: 99.2 },
      { name: 'Claude 3.5', vendor: 'Anthropic', accuracy: 98.8 },
      { name: 'Gemini Pro', vendor: 'Google', accuracy: 98.5 },
      { name: '文心一言', vendor: '百度', accuracy: 97.9 },
      { name: 'Sora', vendor: 'OpenAI', accuracy: 96.3 },
      { name: '通义千问', vendor: '阿里', accuracy: 97.5 },
      { name: 'Copilot', vendor: 'Microsoft/GitHub', accuracy: 98.1 },
      { name: 'Llama 3', vendor: 'Meta', accuracy: 96.8 }
    ];
    return models.map(m => `
      <div class="mini-stat" style="padding:8px 0">
        <span style="font-weight:500;font-size:12px">${m.name}</span>
        <span style="font-size:11px;color:var(--text-secondary)">${m.vendor}</span>
        <span style="font-size:12px;font-weight:600;color:var(--green)">${m.accuracy}%</span>
      </div>
    `).join('');
  }
};
