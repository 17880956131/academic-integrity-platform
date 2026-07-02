/**
 * 检测报告详情页
 */
const PageReport = {

  render(params) {
    const p = MockData.paperDetail;
    const main = document.getElementById('mainContent');

    main.innerHTML = `
      <div class="page-view">
        <!-- 报告头部 -->
        <div class="card mb-16">
          <div class="card-body" style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">
            <div style="flex:1;min-width:300px">
              <h2 style="font-size:16px;font-weight:600;margin-bottom:4px">${p.title}</h2>
              <p style="font-size:11px;color:var(--text-secondary);line-height:1.6">
                作者: ${p.author} · ${p.affiliation} · ${p.field}<br>
                提交时间: ${p.submittedAt} · 论文ID: ${p.id}<br>
                检测引擎: ${p.engineVersion} (文字-语义-逻辑三重检测) · 知识库: ${p.knowledgeBase}
              </p>
              <div style="display:flex;gap:20px;font-size:11px;color:var(--text-secondary);margin-top:12px">
                <div style="text-align:center"><span style="font-size:18px;font-weight:600;color:var(--text);display:block">${p.plagiarism.total}%</span>文字查重</div>
                <div style="text-align:center"><span style="font-size:18px;font-weight:600;color:var(--text);display:block">${p.aiDetection.total}%</span>AI生成</div>
                <div style="text-align:center"><span style="font-size:18px;font-weight:600;color:var(--blue);display:block">${p.creativity.status}</span>创意验证</div>
                <div style="text-align:center"><span style="font-size:18px;font-weight:600;color:var(--text);display:block">${p.terminology.score}</span>术语规范</div>
              </div>
            </div>
            ${Utils.scoreRing(p.score, 80)}
          </div>
        </div>

        <!-- Tab 导航 -->
        <div class="tabs">
          <div class="tab active" onclick="PageReport.switchTab(this,'overview')">综合报告</div>
          <div class="tab" onclick="PageReport.switchTab(this,'plagiarism')">文字查重</div>
          <div class="tab" onclick="PageReport.switchTab(this,'ai')">AI生成检测</div>
          <div class="tab" onclick="PageReport.switchTab(this,'creative')">创意验证</div>
          <div class="tab" onclick="PageReport.switchTab(this,'terminology')">术语溯源</div>
          <div class="tab" onclick="PageReport.switchTab(this,'blockchain')">区块链存证</div>
        </div>

        <!-- Tab 内容区 -->
        <div id="reportTabContent">${this.renderOverview(p)}</div>

        <!-- 底部操作栏 -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;margin-top:8px">
          <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-secondary)">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--green)"></span>
            <span>区块链已存证 · 哈希: ${p.blockchainHash.slice(0, 18)}... · 时间戳: ${p.blockchainTime} · ${p.blockchainNetwork}</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn" onclick="Utils.toast('PDF导出中...','info')">导出PDF</button>
            <button class="btn" onclick="Utils.toast('分享链接已复制','success')">分享报告</button>
            <button class="btn btn-success" onclick="Utils.toast('论文审核通过','success')">审核通过</button>
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tabEl, tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tabEl.classList.add('active');
    const p = MockData.paperDetail;
    const content = document.getElementById('reportTabContent');
    const renderers = {
      overview: () => this.renderOverview(p),
      plagiarism: () => this.renderPlagiarism(p),
      ai: () => this.renderAI(p),
      creative: () => this.renderCreative(p),
      terminology: () => this.renderTerminology(p),
      blockchain: () => this.renderBlockchain(p)
    };
    content.innerHTML = (renderers[tabName] || renderers.overview)();
  },

  renderOverview(p) {
    return `
      <div class="grid-3">
        <!-- 文字查重 -->
        <div class="card">
          <div class="card-header"><h3>文字查重</h3><span style="font-size:20px;font-weight:600;color:var(--green)">${p.plagiarism.total}%</span></div>
          <div class="card-body">
            <div class="gauge">
              <div class="gauge-bar">
                <div class="gauge-marks"><span></span><span></span><span></span></div>
                <div class="gauge-fill" style="width:${(p.plagiarism.total/30)*100}%;background:var(--green)"></div>
              </div>
            </div>
            <div class="gauge-labels"><span>0%</span><span>15%阈值</span><span>30%</span></div>
            ${p.plagiarism.segments.map(seg => `
              <div class="segment">
                <div class="segment-header"><b>${seg.name}</b><span style="color:var(--${seg.color})">${seg.value}%</span></div>
                <div class="segment-bar"><span style="width:${(seg.value/30)*100}%;background:var(--${seg.color})">${seg.value}%</span></div>
              </div>
            `).join('')}
            <div style="margin-top:10px;padding:8px;background:var(--bg-success);border-radius:var(--radius-md);font-size:10px;color:var(--green)">通过 · 低于${p.plagiarism.threshold}%阈值</div>
          </div>
        </div>

        <!-- AI检测 -->
        <div class="card">
          <div class="card-header"><h3>AI生成检测</h3><span style="font-size:20px;font-weight:600;color:var(--green)">${p.aiDetection.total}%</span></div>
          <div class="card-body">
            <div class="gauge">
              <div class="gauge-bar">
                <div class="gauge-marks"><span></span><span></span><span></span></div>
                <div class="gauge-fill" style="width:${(p.aiDetection.total/50)*100}%;background:var(--green)"></div>
              </div>
            </div>
            <div class="gauge-labels"><span>0%</span><span>20%阈值</span><span>50%</span></div>
            <div style="margin-top:12px;font-size:10px;color:var(--text-secondary);margin-bottom:6px">模型指纹识别:</div>
            <div class="keyword-group">
              ${p.aiDetection.modelFingerprints.map(m => 
                Utils.tag(`${m.model} ${m.detected ? m.rate+'%' : '未检出'}`, m.detected ? 'warning' : 'success')
              ).join('')}
            </div>
            <div style="margin-top:10px;font-size:10px;color:var(--text-secondary);margin-bottom:4px">创作风格分析:</div>
            <div style="font-size:10px;line-height:1.6;color:var(--text)">${p.aiDetection.styleAnalysis}</div>
          </div>
        </div>

        <!-- 创意验证 -->
        <div class="card">
          <div class="card-header"><h3>创意验证</h3><span style="font-size:20px;font-weight:600;color:var(--blue)">${p.creativity.score}</span></div>
          <div class="card-body">
            <div style="font-size:10px;color:var(--text-secondary);margin-bottom:6px">创意要素解构:</div>
            ${p.creativity.elements.map(e => `
              <div class="mini-stat" style="padding:6px 0">
                <span style="font-weight:500;min-width:70px;font-size:11px">${e.name}</span>
                <span style="font-size:10px;color:var(--text-secondary);flex:1">${e.content}</span>
                ${Utils.tag(e.status, e.type)}
              </div>
            `).join('')}
            <div style="padding:8px;background:var(--bg-info);border-radius:var(--radius-md);font-size:10px;color:var(--blue);line-height:1.5;margin-top:8px">
              ${p.creativity.knowledgeGraph}
            </div>
          </div>
        </div>
      </div>

      <!-- 知识图谱 + 相似文献 -->
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3>术语溯源 · 知识图谱</h3><span style="font-size:10px;color:var(--text-tertiary)">四层图谱</span></div>
          <div class="card-body">${this.renderKnowledgeGraph(p)}</div>
        </div>
        <div class="card">
          <div class="card-header"><h3>相似文献比对</h3><span style="font-size:10px;color:var(--text-tertiary)">Top ${p.similarPapers.length}</span></div>
          <div class="card-body" style="padding:8px 16px">
            <table class="data-table">
              <thead><tr><th>来源</th><th>标题</th><th>相似度</th></tr></thead>
              <tbody>
                ${p.similarPapers.map(s => `
                  <tr>
                    <td style="font-size:10px">${s.source}</td>
                    <td style="font-size:10px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.title}</td>
                    <td>${Utils.progressBar(s.similarity, 20, 'green', 50)} ${s.similarity}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 智能优化建议 -->
      <div class="card">
        <div class="card-header"><h3>智能优化建议</h3><span style="font-size:10px;color:var(--text-tertiary)">基于检测分析</span></div>
        <div class="card-body">
          ${p.suggestions.map(s => `
            <div class="suggestion" style="background:var(--bg-${s.type})">
              <div class="suggestion-icon" style="background:var(--${s.type})">${s.icon}</div>
              <div>
                <b style="font-size:12px;color:var(--${s.type})">${s.title}</b>
                <p style="margin-top:2px;color:var(--text-secondary);font-size:11px;line-height:1.5">${s.content}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderPlagiarism(p) {
    return `
      <div class="card">
        <div class="card-header"><h3>文字查重详细报告</h3><span style="font-size:20px;font-weight:600;color:var(--green)">${p.plagiarism.total}%</span></div>
        <div class="card-body">
          <div class="gauge">
            <div class="gauge-bar">
              <div class="gauge-marks"><span></span><span></span><span></span></div>
              <div class="gauge-fill" style="width:${(p.plagiarism.total/30)*100}%;background:var(--green)"></div>
            </div>
          </div>
          <div class="gauge-labels"><span>0%</span><span>15%阈值</span><span>30%</span></div>
          ${p.plagiarism.segments.map(seg => `
            <div class="segment" style="margin-top:16px">
              <div class="segment-header"><b style="font-size:13px">${seg.name}</b><span style="color:var(--${seg.color});font-weight:600">${seg.value}%</span></div>
              <div class="segment-bar"><span style="width:${(seg.value/30)*100}%;background:var(--${seg.color})">${seg.value}%</span></div>
            </div>
          `).join('')}
          <div style="margin-top:16px;padding:12px;background:var(--bg-success);border-radius:var(--radius-md);font-size:12px;color:var(--green)">
            ✓ 通过 · 总重复率 ${p.plagiarism.total}% 低于 ${p.plagiarism.threshold}% 阈值
          </div>
          <div style="margin-top:16px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:8px">重复段落详情</h4>
            <div style="font-size:11px;color:var(--text-secondary);line-height:1.8;padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
              <div style="margin-bottom:8px">
                <span class="tag tag-warning">第3章 §3.2</span> 
                <span>1.4% 引用不当 - Vaswani et al. (2017) 引用未标注具体贡献</span>
              </div>
              <div style="margin-bottom:8px">
                <span class="tag tag-success">第2章 §2.1</span> 
                <span>0.8% 直接复制 - 标准定义描述（业界通用）</span>
              </div>
              <div>
                <span class="tag tag-success">第4章 §4.3</span> 
                <span>1.5% 改写相似 - 实验方法描述与某文献结构相近</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderAI(p) {
    return `
      <div class="card">
        <div class="card-header"><h3>AI生成检测详细报告</h3><span style="font-size:20px;font-weight:600;color:var(--green)">${p.aiDetection.total}%</span></div>
        <div class="card-body">
          <div class="gauge">
            <div class="gauge-bar">
              <div class="gauge-marks"><span></span><span></span><span></span></div>
              <div class="gauge-fill" style="width:${(p.aiDetection.total/50)*100}%;background:var(--green)"></div>
            </div>
          </div>
          <div class="gauge-labels"><span>0%</span><span>20%阈值</span><span>50%</span></div>
          
          <div style="margin-top:20px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:10px">模型指纹识别（20+主流AI模型）</h4>
            <table class="data-table">
              <thead><tr><th>AI模型</th><th>检测结果</th><th>生成概率</th><th>状态</th></tr></thead>
              <tbody>
                ${p.aiDetection.modelFingerprints.map(m => `
                  <tr>
                    <td style="font-weight:500">${m.model}</td>
                    <td>${m.detected ? '检出痕迹' : '未检出'}</td>
                    <td>${Utils.progressBar(m.rate, 20, m.detected ? 'amber' : 'green', 50)} ${m.rate}%</td>
                    <td>${Utils.tag(m.detected ? '需关注' : '安全', m.detected ? 'warning' : 'success')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="margin-top:20px;padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:8px">创作风格深度分析</h4>
            <div style="font-size:11px;color:var(--text-secondary);line-height:1.8">${p.aiDetection.styleAnalysis}</div>
          </div>

          <div style="margin-top:16px;padding:12px;background:var(--bg-success);border-radius:var(--radius-md);font-size:12px;color:var(--green)">
            ✓ 通过 · AI生成率 ${p.aiDetection.total}% 低于 ${p.aiDetection.threshold}% 阈值
          </div>
        </div>
      </div>
    `;
  },

  renderCreative(p) {
    return `
      <div class="card">
        <div class="card-header"><h3>创意验证详细报告</h3><span style="font-size:20px;font-weight:600;color:var(--blue)">${p.creativity.score}分</span></div>
        <div class="card-body">
          <div style="margin-bottom:16px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:10px">创意要素自动化解构</h4>
            ${p.creativity.elements.map(e => `
              <div class="mini-stat" style="padding:10px 0">
                <span style="font-weight:500;min-width:80px;font-size:12px">${e.name}</span>
                <span style="font-size:11px;color:var(--text-secondary);flex:1">${e.content}</span>
                ${Utils.tag(e.status, e.type)}
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom:16px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:10px">虚拟模拟验证</h4>
            <div style="font-size:11px;color:var(--text-secondary);line-height:1.8;padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md)">
              <div>• <b>参数扰动测试：</b>蒙特卡洛模拟1000次，输出结果稳定（标准差<0.03）</div>
              <div>• <b>边界条件测试：</b>极端数据下模型仍保持鲁棒性</div>
              <div>• <b>性能指标：</b>准确率提升12%, 召回率提升8%, F1值提升10%</div>
              <div>• <b>创新距离：</b>与最近邻模型差异度0.73（>0.5为显著创新）</div>
            </div>
          </div>

          <div style="margin-bottom:16px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:10px">跨领域创意比对</h4>
            <table class="data-table">
              <thead><tr><th>比对维度</th><th>本文方法</th><th>最近邻文献</th><th>差异度</th></tr></thead>
              <tbody>
                <tr><td>研究问题</td><td>注意力+分割</td><td>纯Transformer分割</td><td>${Utils.progressBar(0.65, 1, 'green', 50)} 0.65</td></tr>
                <tr><td>技术路径</td><td>Transformer+CNN</td><td>纯Transformer</td><td>${Utils.progressBar(0.78, 1, 'green', 50)} 0.78</td></tr>
                <tr><td>创新假设</td><td>小目标+12%</td><td>整体+5%</td><td>${Utils.progressBar(0.82, 1, 'green', 50)} 0.82</td></tr>
              </tbody>
            </table>
          </div>

          <div style="padding:12px;background:var(--bg-info);border-radius:var(--radius-md);font-size:12px;color:var(--blue);line-height:1.5">
            ${p.creativity.knowledgeGraph}
          </div>
        </div>
      </div>
    `;
  },

  renderTerminology(p) {
    return `
      <div class="card mb-16">
        <div class="card-header"><h3>术语溯源 · 知识图谱</h3><span style="font-size:10px;color:var(--text-tertiary)">四层图谱</span></div>
        <div class="card-body">${this.renderKnowledgeGraph(p)}</div>
      </div>
      <div class="card">
        <div class="card-header"><h3>术语规范检测</h3><span style="font-size:20px;font-weight:600;color:var(--green)">${p.terminology.score}分</span></div>
        <div class="card-body">
          ${p.terminology.terms.map(t => `
            <div class="mini-stat" style="padding:10px 0">
              <span style="font-weight:500;min-width:100px;font-size:12px">${t.name}</span>
              <span style="font-size:10px;color:var(--text-secondary);flex:1">语义锚点: ${t.anchor}</span>
              ${Utils.tag(t.status, t.type)}
            </div>
          `).join('')}
          <div style="margin-top:12px;padding:10px;background:var(--bg-success);border-radius:var(--radius-md);font-size:11px;color:var(--green)">
            ✓ 演化路径: ${p.terminology.evolutionPath}
          </div>
        </div>
      </div>
    `;
  },

  renderBlockchain(p) {
    return `
      <div class="card">
        <div class="card-header"><h3>区块链存证信息</h3><span style="font-size:10px;color:var(--text-tertiary)">${p.blockchainNetwork}</span></div>
        <div class="card-body">
          <div class="mini-stat"><span class="mini-stat-label">存证哈希</span><span class="mini-stat-value font-mono" style="font-size:11px;word-break:break-all;text-align:right;max-width:300px">${p.blockchainHash}</span></div>
          <div class="mini-stat"><span class="mini-stat-label">时间戳</span><span class="mini-stat-value" style="font-size:12px">${p.blockchainTime}</span></div>
          <div class="mini-stat"><span class="mini-stat-label">存证网络</span><span class="mini-stat-value">${p.blockchainNetwork}</span></div>
          <div class="mini-stat"><span class="mini-stat-label">存证状态</span>${Utils.tag('已验证', 'success')}</div>
          <div class="mini-stat"><span class="mini-stat-label">存证内容</span><span class="mini-stat-value" style="font-size:11px">核心创新点哈希（研究问题+技术路线+预期结论）</span></div>
          
          <div style="margin-top:16px">
            <h4 style="font-size:12px;font-weight:600;margin-bottom:8px">存证验证流程</h4>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--green)"></div>
                <div class="timeline-line"></div>
                <div class="timeline-time">${p.blockchainTime}</div>
                <div class="timeline-title">创新点哈希上链</div>
                <div class="timeline-desc">核心创新点SHA-256哈希值同步至IEEE学术链</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--green)"></div>
                <div class="timeline-line"></div>
                <div class="timeline-time">${p.blockchainTime}</div>
                <div class="timeline-title">分布式节点确认</div>
                <div class="timeline-desc">3个节点确认存证，形成不可篡改证据链</div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--green)"></div>
                <div class="timeline-time">实时</div>
                <div class="timeline-title">双发布冲突仲裁就绪</div>
                <div class="timeline-desc">如有同期发布争议，系统自动比对存证时间</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderKnowledgeGraph(p) {
    const g = p.terminology.graph;
    const center = g.center;
    const lines = g.level1.map(l1 => {
      const x1 = center.x + 5, y1 = center.y + 3;
      const x2 = l1.x + 5, y2 = l1.y + 3;
      return `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="#E0DED5" stroke-width="1"/>`;
    }).join('');

    const l2Lines = g.level1.map((l1, i) => {
      const l2 = g.level2[i];
      return `<line x1="${l1.x + 5}%" y1="${l1.y + 3}%" x2="${l2.x + 5}%" y2="${l2.y + 3}%" stroke="#E0DED5" stroke-width="0.5"/>`;
    }).join('');

    return `
      <div class="graph-container">
        <svg style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${lines}${l2Lines}
        </svg>
        <div class="graph-node center" style="top:${center.y}%;left:${center.x}%;transform:translate(-50%,-50%)">${center.label}</div>
        ${g.level1.map(n => `<div class="graph-node level-1" style="top:${n.y}%;left:${n.x}%;transform:translate(-50%,-50%)">${n.label}</div>`).join('')}
        ${g.level2.map(n => `<div class="graph-node level-2" style="top:${n.y}%;left:${n.x}%;transform:translate(-50%,-50%);font-size:9px;padding:3px 6px">${n.label}</div>`).join('')}
      </div>
      <div style="margin-top:10px;font-size:10px;color:var(--text-secondary);line-height:1.5">
        演化路径: ${p.terminology.evolutionPath}
      </div>
    `;
  }
};
