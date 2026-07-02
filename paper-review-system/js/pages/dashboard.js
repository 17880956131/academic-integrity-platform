/**
 * 仪表盘页面 - 检测总览
 */
const PageDashboard = {

  render() {
    const s = MockData.systemStats;
    const main = document.getElementById('mainContent');

    main.innerHTML = `
      <div class="page-view">
        <!-- 顶部工具栏 -->
        <div class="topbar">
          <div class="topbar-left">
            <h1>检测总览</h1>
            <p>${new Date().toLocaleDateString('zh-CN', { year:'numeric', month:'long', day:'numeric' })} · 系统运行正常 · 知识库已更新至最新</p>
          </div>
          <div class="topbar-right">
            <input placeholder="搜索论文 / 作者 / 术语ID..." style="width:220px" onkeyup="if(event.key==='Enter')Utils.toast('搜索功能开发中','info')">
            <button class="btn" onclick="Utils.toast('正在导出报告...','info')">导出报告</button>
            <button class="btn btn-primary" onclick="Router.navigate('submit')">+ 提交检测</button>
            <div class="avatar">管</div>
          </div>
        </div>

        <!-- 指标卡 -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-label">今日检测总量</div>
            <div class="metric-value">${Utils.formatNumber(s.todayCount)}</div>
            <div class="metric-delta up">↑ ${s.todayDelta} 较昨日</div>
            ${Utils.sparkline(MockData.weeklyTrend.detection, '#85B7EB', '#185FA5')}
          </div>
          <div class="metric-card">
            <div class="metric-label">AI生成检出率</div>
            <div class="metric-value">${s.aiDetectionRate}%</div>
            <div class="metric-delta down">↑ ${s.aiDelta} 需关注</div>
            ${Utils.sparkline(MockData.weeklyTrend.aiRate, '#FAC775', '#854F0B')}
          </div>
          <div class="metric-card">
            <div class="metric-label">创意原创性均分</div>
            <div class="metric-value">${s.creativityAvg}</div>
            <div class="metric-delta up">↑ ${s.creativityDelta}分 本周提升</div>
            ${Utils.sparkline(MockData.weeklyTrend.creativity, '#C0DD97', '#3B6D11')}
          </div>
          <div class="metric-card">
            <div class="metric-label">术语异常告警</div>
            <div class="metric-value">${s.termAlerts}</div>
            <div class="metric-delta down">↑ ${s.termDelta} 本质属性偏离</div>
            ${Utils.sparkline(MockData.weeklyTrend.termAlert, '#F09595', '#A32D2D')}
          </div>
        </div>

        <!-- 雷达图 + 热力图 -->
        <div class="grid-2-uneven">
          <div class="card">
            <div class="card-header">
              <h3>多维检测雷达 · 最新论文综合评估</h3>
              <span class="card-action" onclick="Router.navigate('report',{id:'P-2026-0702-0347'})">查看详情 →</span>
            </div>
            <div class="card-body">${this.renderRadar()}</div>
          </div>
          <div class="card">
            <div class="card-header"><h3>抄袭风险热力图</h3><span style="font-size:11px;color:var(--text-tertiary)">近7周</span></div>
            <div class="card-body">${this.renderHeatmap()}</div>
          </div>
        </div>

        <!-- 最近检测记录 -->
        <div class="card mb-16">
          <div class="card-header">
            <h3>最近检测记录</h3>
            <span class="card-action" onclick="Utils.toast('共${MockData.recentPapers.length}条记录','info')">查看全部 →</span>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>论文标题</th><th>作者</th><th>文字查重</th><th>AI生成</th><th>创意验证</th><th>术语</th><th>状态</th>
              </tr>
            </thead>
            <tbody>
              ${MockData.recentPapers.map(p => `
                <tr onclick="Router.navigate('report',{id:'${p.id}'})">
                  <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.title}</td>
                  <td>${p.author}</td>
                  <td>${Utils.progressBar(p.plagiarism, 30, p.plagiarism < 15 ? 'green' : p.plagiarism < 25 ? 'amber' : 'red')} ${p.plagiarism}%</td>
                  <td>${Utils.progressBar(p.aiGenerated, 50, p.aiGenerated < 20 ? 'green' : p.aiGenerated < 35 ? 'amber' : 'red')} ${p.aiGenerated}%</td>
                  <td>${Utils.tag(p.creativity, p.creativityType)}</td>
                  <td>${Utils.tag(p.termStatus, p.termType)}</td>
                  <td>${Utils.tag(p.status, p.statusType)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- 区块链 + 创新势能 -->
        <div class="grid-2">
          <div class="card">
            <div class="card-header"><h3>区块链存证状态</h3><span style="font-size:11px;color:var(--text-tertiary)">${s.blockchainNetwork || 'IEEE学术链'}</span></div>
            <div class="card-body">
              <div class="mini-stat"><span class="mini-stat-label">今日上链存证</span><span class="mini-stat-value" style="color:var(--blue)">${s.blockchainToday}</span></div>
              <div class="mini-stat"><span class="mini-stat-label">存证精确度</span><span class="mini-stat-value">毫秒级</span></div>
              <div class="mini-stat"><span class="mini-stat-label">双发布争议仲裁</span><span class="mini-stat-value" style="color:var(--amber)">${s.disputes} 起</span></div>
              <div class="mini-stat"><span class="mini-stat-label">链上可追溯论文</span><span class="mini-stat-value">${Utils.formatNumber(s.blockchainTotal)}</span></div>
              <div style="margin-top:10px;padding:10px 12px;background:var(--bg-info);border-radius:var(--radius-md);font-size:11px;color:var(--blue)">
                最新存证: 0x7a3f...e29b · "纳米笼递送方案" · ${Utils.generateTimestamp().split(' ')[1]}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>创新势能监测</h3><span style="font-size:11px;color:var(--text-tertiary)">ECU模型</span></div>
            <div class="card-body">
              <div class="mini-stat"><span class="mini-stat-label">ECU密度 ρ(t)</span><span class="mini-stat-value">${s.ecuDensity}</span></div>
              <div class="mini-stat"><span class="mini-stat-label">临界值 ρc</span><span class="mini-stat-value" style="color:var(--amber)">${s.ecuThreshold}</span></div>
              <div class="mini-stat"><span class="mini-stat-label">领域交叉系数 k</span><span class="mini-stat-value">${s.crossDomainK}</span></div>
              <div class="mini-stat"><span class="mini-stat-label">技术转化效率 c(t)</span><span class="mini-stat-value">${s.techTransfer}</span></div>
              <div style="margin-top:10px;padding:10px 12px;background:var(--bg-warning);border-radius:var(--radius-md);font-size:11px;color:var(--amber)">
                预测: 2035年ρ(t)突破临界值 · 科技大爆炸概率 >70%
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderRadar() {
    const dims = [
      { name: '文字查重', value: 92, color: 'green' },
      { name: 'AI检测', value: 88, color: 'green' },
      { name: '创意验证', value: 85, color: 'green' },
      { name: '术语规范', value: 90, color: 'green' },
      { name: '逻辑链路', value: 45, color: 'red' },
      { name: '引用合规', value: 82, color: 'green' }
    ];

    // 计算雷达图坐标
    const cx = 90, cy = 90, maxR = 70;
    const points = dims.map((d, i) => {
      const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
      const r = (d.value / 100) * maxR;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, label: d };
    });
    const labelPoints = dims.map((d, i) => {
      const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
      return { x: cx + Math.cos(angle) * (maxR + 15), y: cy + Math.sin(angle) * (maxR + 15) + 3 };
    });

    const polygonStr = points.map(p => `${p.x},${p.y}`).join(' ');
    const rings = [0.33, 0.66, 1.0].map(scale => {
      const ringPts = dims.map((d, i) => {
        const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
        return `${cx + Math.cos(angle) * maxR * scale},${cy + Math.sin(angle) * maxR * scale}`;
      }).join(' ');
      return `<polygon points="${ringPts}" fill="none" stroke="#E0DED5" stroke-width="0.5"/>`;
    }).join('');

    const axes = dims.map((d, i) => {
      const angle = (Math.PI * 2 * i) / dims.length - Math.PI / 2;
      return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * maxR}" y2="${cy + Math.sin(angle) * maxR}" stroke="#E0DED5" stroke-width="0.5"/>`;
    }).join('');

    const labels = labelPoints.map((p, i) => {
      const ta = p.x < 30 ? 'end' : p.x > 150 ? 'start' : 'middle';
      return `<text x="${p.x}" y="${p.y}" text-anchor="${ta}" font-size="9" fill="#888780">${dims[i].name}</text>`;
    }).join('');

    const dots = points.map(p => {
      const c = Utils.colorMap[p.label.color];
      return `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${c.solid}"/>`;
    }).join('');

    const bars = dims.map(d => {
      const c = Utils.colorMap[d.color];
      return `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:11px">
          <span style="min-width:70px;color:var(--text-secondary)">${d.name}</span>
          <div style="flex:1;height:5px;border-radius:3px;background:var(--bg-tertiary);overflow:hidden">
            <div style="height:100%;width:${d.value}%;background:${c.solid};border-radius:3px;transition:width 0.6s"></div>
          </div>
          <span style="font-weight:600;font-size:12px;min-width:36px;text-align:right;color:${c.solid}">${d.value}</span>
        </div>
      `;
    }).join('');

    return `
      <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
        <svg width="180" height="180" viewBox="0 0 180 180" style="flex-shrink:0">
          ${rings}${axes}
          <polygon points="${polygonStr}" fill="#185FA5" fill-opacity="0.12" stroke="#185FA5" stroke-width="1.5"/>
          ${dots}${labels}
        </svg>
        <div style="flex:1;min-width:180px">${bars}</div>
      </div>
    `;
  },

  renderHeatmap() {
    const cells = MockData.heatmapData.map((level, i) => {
      const color = Utils.heatColor(level);
      const textColor = level >= 3 ? '#fff' : '#888780';
      return `<div class="heatmap-cell" style="background:${color};color:${textColor}" title="第${i+1}天 · 风险等级${level}">${i + 1}</div>`;
    }).join('');

    return `
      <div class="heatmap">${cells}</div>
      <div class="heatmap-legend"><span>低风险</span><span>中风险</span><span>高风险</span></div>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border-tertiary)">
        <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-secondary);margin-bottom:6px">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--green)"></span> 绿色安全 · 创新性高于现有成果
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-secondary);margin-bottom:6px">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--amber)"></span> 黄色预警 · 技术路径相似需补充差异
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-secondary)">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--red)"></span> 红色预警 · 创意要素高度重合
        </div>
      </div>
    `;
  }
};
