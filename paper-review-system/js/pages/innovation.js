/**
 * 创新势能页面
 */
const PageInnovation = {
  render() {
    const main = document.getElementById('mainContent');
    const d = MockData.innovationData;
    const densityPct = (d.ecuDensity / d.ecuThreshold * 100).toFixed(1);

    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>创新势能监测</h1>
            <p>论文产出-创新势能双函数模型 · ECU量化评估 · 科技大爆炸预测</p>
          </div>
        </div>

        <!-- 核心指标 -->
        <div class="metrics-grid" style="grid-template-columns:repeat(4,1fr)">
          <div class="metric-card">
            <div class="metric-label">ECU密度 ρ(t)</div>
            <div class="metric-value">${d.ecuDensity}</div>
            <div class="metric-delta up">距离临界值 ${((d.ecuThreshold - d.ecuDensity) * 100).toFixed(1)}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">临界值 ρc</div>
            <div class="metric-value" style="color:var(--amber)">${d.ecuThreshold}</div>
            <div class="metric-delta">历史数据拟合值</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">领域交叉系数 k</div>
            <div class="metric-value">${d.crossDomainK}</div>
            <div class="metric-delta up">跨学科论文占比持续上升</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">技术转化效率 c(t)</div>
            <div class="metric-value">${d.techTransfer}</div>
            <div class="metric-delta up">产学研平台完善中</div>
          </div>
        </div>

        <!-- 密度进度 -->
        <div class="card mb-16">
          <div class="card-header"><h3>ECU密度进展 · 距离科技大爆炸</h3></div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
              <div style="flex:1;height:24px;border-radius:12px;background:var(--bg-tertiary);overflow:hidden;position:relative">
                <div style="height:100%;width:${densityPct}%;background:linear-gradient(90deg,var(--green) 0%,var(--amber) 70%,var(--red) 100%);border-radius:12px;transition:width 1s"></div>
                <div style="position:absolute;top:0;left:${densityPct}%;width:2px;height:100%;background:var(--red);transform:translateX(-1px)"></div>
                <div style="position:absolute;top:-2px;left:${densityPct}%;transform:translateX(-50%);font-size:10px;font-weight:600;color:var(--red)">ρc</div>
              </div>
              <div style="font-size:18px;font-weight:600;color:var(--amber)">${densityPct}%</div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-tertiary)">
              <span>0 (零创新)</span>
              <span>当前: ${d.ecuDensity}</span>
              <span style="color:var(--red);font-weight:500">临界: ${d.ecuThreshold}</span>
            </div>
            <div style="margin-top:16px;padding:12px;background:var(--bg-warning);border-radius:var(--radius-md);font-size:12px;color:var(--amber);line-height:1.6">
              <b>预测：</b>${d.prediction}
            </div>
          </div>
        </div>

        <div class="grid-2">
          <!-- 模型公式 -->
          <div class="card">
            <div class="card-header"><h3>双函数模型</h3></div>
            <div class="card-body">
              <div style="margin-bottom:16px">
                <b style="font-size:12px;color:var(--blue)">模型一：创新势能累积（宏观）</b>
                <div style="padding:12px;background:#1e1e2e;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:#a6e3a1;margin-top:6px">
                  ${d.formula.energy}
                </div>
                <div style="font-size:10px;color:var(--text-secondary);margin-top:6px;line-height:1.6">
                  P(t): 论文总量 · Q(t): 质量系数 · k: 领域交叉系数 · c(t): 技术转化效率
                </div>
              </div>
              <div style="margin-bottom:16px">
                <b style="font-size:12px;color:var(--purple)">模型二：微创新-链式反应（微观）</b>
                <div style="padding:12px;background:#1e1e2e;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:#a6e3a1;margin-top:6px">
                  ${d.formula.density}
                </div>
                <div style="font-size:10px;color:var(--text-secondary);margin-top:6px;line-height:1.6">
                  δ: 原创性系数(${d.originality}) · A: 知识网络表面积
                </div>
              </div>
              <div>
                <b style="font-size:12px;color:var(--red)">链式反应触发条件</b>
                <div style="padding:12px;background:#1e1e2e;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:#f38ba8;margin-top:6px">
                  ${d.formula.threshold}
                </div>
              </div>
            </div>
          </div>

          <!-- 年度趋势 -->
          <div class="card">
            <div class="card-header"><h3>ECU密度年度趋势</h3><span style="font-size:10px;color:var(--text-tertiary)">2020-2026</span></div>
            <div class="card-body">
              ${this.renderTrendChart(d)}
            </div>
          </div>
        </div>

        <!-- 敏感度分析 -->
        <div class="card mt-16">
          <div class="card-header"><h3>敏感度分析</h3></div>
          <div class="card-body">
            <table class="data-table">
              <thead><tr><th>变量调整</th><th>当前值</th><th>调整后</th><th>突破时间</th><th>影响</th></tr></thead>
              <tbody>
                <tr>
                  <td>质量系数 Q(t) 提升</td>
                  <td>${d.paperQuality}</td>
                  <td style="color:var(--green)">0.30</td>
                  <td><span class="tag tag-success">2032年</span></td>
                  <td>提前3年突破</td>
                </tr>
                <tr>
                  <td>原创性系数 δ 下降</td>
                  <td>${d.originality}</td>
                  <td style="color:var(--red)">0.50</td>
                  <td><span class="tag tag-danger">2040年</span></td>
                  <td>推迟5年突破</td>
                </tr>
                <tr>
                  <td>跨学科占比 +10%</td>
                  <td>${d.crossDomainK}</td>
                  <td style="color:var(--green)">0.37</td>
                  <td><span class="tag tag-success">2033年</span></td>
                  <td>提前2年突破</td>
                </tr>
                <tr>
                  <td>当前状态（无调整）</td>
                  <td>—</td>
                  <td>—</td>
                  <td><span class="tag tag-warning">2035年</span></td>
                  <td>基准预测</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  renderTrendChart(d) {
    const data = d.yearlyData;
    const maxDensity = d.ecuThreshold * 1.3;
    const barWidth = 100 / data.length;

    return `
      <div style="display:flex;align-items:flex-end;gap:8px;height:160px;padding:0 8px;position:relative">
        <!-- 临界线 -->
        <div style="position:absolute;left:0;right:0;top:${(1 - d.ecuThreshold / maxDensity) * 100}%;height:1px;background:var(--red);z-index:1">
          <span style="position:absolute;right:0;top:-16px;font-size:9px;color:var(--red);background:var(--bg-primary);padding:0 4px">ρc=${d.ecuThreshold}</span>
        </div>
        ${data.map(item => {
          const h = (item.density / maxDensity) * 100;
          const isCurrent = item.year === 2026;
          const color = item.density >= d.ecuThreshold ? 'var(--red)' : isCurrent ? 'var(--amber)' : 'var(--green-light)';
          return `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <span style="font-size:10px;font-weight:600;color:${color}">${item.density}</span>
              <div style="width:60%;height:${h}%;background:${color};border-radius:4px 4px 0 0;transition:height 0.8s;min-height:4px"></div>
              <span style="font-size:9px;color:var(--text-tertiary)">${item.year}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div style="margin-top:12px;font-size:10px;color:var(--text-secondary);text-align:center">
        论文总量 ${Utils.formatNumber(data[data.length-1].papers)} 篇/年 · 年均增长 18.7%
      </div>
    `;
  }
};
