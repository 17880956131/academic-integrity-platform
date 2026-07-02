/**
 * 争议仲裁页面
 * 双发布冲突仲裁 · 区块链存证比对 · 专家委员会裁决
 */
const PageArbitration = {
  render() {
    const main = document.getElementById('mainContent');
    const cases = MockData.arbitrationCases;
    const activeCases = cases.filter(c => c.status === '仲裁中');
    const resolvedCases = cases.filter(c => c.status === '已裁决');
    const s = MockData.systemStats;

    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>争议仲裁</h1>
            <p>双发布冲突仲裁 · 区块链存证比对 · 专家委员会裁决</p>
          </div>
          <div class="topbar-right">
            <button class="btn" onclick="PageArbitration.showRulesModal()">仲裁规则</button>
            <button class="btn btn-primary" onclick="PageArbitration.showNewCaseModal()">+ 提交争议</button>
          </div>
        </div>

        <!-- 统计指标 -->
        <div class="grid-4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
          <div class="metric-card">
            <div class="metric-label">待处理案件</div>
            <div class="metric-value" style="color:var(--amber)">${activeCases.length}</div>
            <div class="metric-delta">${activeCases.length > 0 ? '亟待专家介入' : '暂无待处理'}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">已裁决</div>
            <div class="metric-value" style="color:var(--green)">${resolvedCases.length}</div>
            <div class="metric-delta">裁决率 100%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">平均处理</div>
            <div class="metric-value">3.5 天</div>
            <div class="metric-delta up">↓ 较上月-0.8天</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">成功率</div>
            <div class="metric-value" style="color:var(--blue)">96.2%</div>
            <div class="metric-delta up">↑ 双方接受裁决</div>
          </div>
        </div>

        <!-- 仲裁流程 -->
        <div class="card mb-16">
          <div class="card-header"><h3>仲裁流程</h3></div>
          <div class="card-body">
            <div class="flow-steps">
              ${[
                { step: 1, title: '提交争议', desc: '任一方提交争议申请\n提供核心证据材料', icon: '◇' },
                { step: 2, title: '证据收集', desc: '区块链存证自动比对\n收集双方创作时间线', icon: '◆' },
                { step: 3, title: '专家评审', desc: '领域专家委员会\n交叉验证证据链', icon: '◇' },
                { step: 4, title: '听证辩论', desc: '双方陈述观点\n第三方质证环节', icon: '◆' },
                { step: 5, title: '裁决发布', desc: '仲裁庭出具裁决书\n区块链存证裁决结果', icon: '◇' }
              ].map(s => `
                <div class="flow-step">
                  <div class="flow-step-circle" style="background:${s.step % 2 === 1 ? 'var(--blue)' : 'var(--purple)'}">${s.icon}</div>
                  <div class="flow-step-content">
                    <b style="font-size:13px;color:var(--text-primary)">${s.title}</b>
                    <p style="font-size:11px;color:var(--text-secondary);margin-top:4px;white-space:pre-line;line-height:1.5">${s.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="grid-2 mb-16">
          <!-- 双发布仲裁机制 -->
          <div class="card">
            <div class="card-header"><h3>双发布冲突仲裁机制</h3></div>
            <div class="card-body">
              <div style="margin-bottom:20px;padding:12px;background:#E6F1FB;border-radius:var(--radius-md);border-left:3px solid var(--blue)">
                <b style="font-size:12px;color:var(--blue)">核心原则</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:4px;line-height:1.6">
                  当两个独立研究团队在同一天、或极短时间内提交了内容高度相似的论文时，系统触发"双发布冲突仲裁"。仲裁依据为区块链存证时间戳（精确至毫秒级）——先存证方默认拥有创新优先权。
                </p>
              </div>

              <b style="font-size:12px">证据权重体系</b>
              <table class="data-table" style="margin-top:8px">
                <thead><tr><th>证据类型</th><th>权重</th><th>说明</th></tr></thead>
                <tbody>
                  <tr>
                    <td><span class="tag tag-success">区块链存证</span></td>
                    <td><b style="color:var(--blue)">40%</b></td>
                    <td style="font-size:11px;color:var(--text-secondary)">毫秒级时间戳+不可篡改哈希，最核心证据</td>
                  </tr>
                  <tr>
                    <td><span class="tag tag-info">脑认知指纹</span></td>
                    <td><b style="color:var(--purple)">30%</b></td>
                    <td style="font-size:11px;color:var(--text-secondary)">创作过程中的脑电数据采集，反映独创认知路径</td>
                  </tr>
                  <tr>
                    <td><span class="tag tag-warning">文档历史</span></td>
                    <td><b style="color:var(--amber)">20%</b></td>
                    <td style="font-size:11px;color:var(--text-secondary)">Git提交记录/实验日志/草稿版本历史</td>
                  </tr>
                  <tr>
                    <td><span class="tag">交叉验证</span></td>
                    <td><b style="color:var(--green)">10%</b></td>
                    <td style="font-size:11px;color:var(--text-secondary)">导师/合作者证言、实验原始数据</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 证据链技术 -->
          <div class="card">
            <div class="card-header"><h3>证据链技术体系</h3></div>
            <div class="card-body">
              ${[
                { name: '区块链存证', desc: 'SHA-256哈希+IEEE学术链毫秒级时间戳，确保创作时间的不可篡改性。存证粒度细化至"图注编号""公式推导步骤"，杜绝笼统存证。', color: 'blue' },
                { name: '脑认知指纹', desc: '通过脑电设备(EEG)采集作者在独立创作时的脑电信号特征，形成不可伪造的"认知签名"。即使论文内容相似，脑认知指纹的独特性可区分独立创作。', color: 'purple' },
                { name: '文档版本追溯', desc: 'Git仓库完整提交历史+实验日志+草稿修改记录，构建从初始idea到最终稿件的完整演化路径。支持逐行时间线还原。', color: 'amber' },
                { name: '语义锚点比对', desc: '对两篇争议论文进行细粒度语义拆解，识别关键创新点的"语义锚点"，判断是否存在本质性雷同还是表面相似。', color: 'green' }
              ].map(t => `
                <div class="mini-stat" style="margin-bottom:12px;padding:12px;background:var(--bg-secondary);border-radius:var(--radius-sm);border-left:3px solid var(--${t.color})">
                  <div>
                    <b style="font-size:12px;color:var(--text-primary)">${t.name}</b>
                    <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;line-height:1.5">${t.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 待处理案件 -->
        ${activeCases.length > 0 ? `
        <div class="card mb-16">
          <div class="card-header">
            <h3>待处理案件</h3>
            <span class="card-action" style="color:var(--amber)">${activeCases.length} 件待裁决</span>
          </div>
          <table class="data-table">
            <thead><tr><th>案件编号</th><th>争议事项</th><th>甲方</th><th>乙方</th><th>核心创新点</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>
              ${activeCases.map(c => `
                <tr>
                  <td class="font-mono" style="font-size:10px;color:var(--blue)">${c.id}</td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c.title}">${c.title}</td>
                  <td style="font-size:11px">${c.partyA}</td>
                  <td style="font-size:11px">${c.partyB}</td>
                  <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--text-secondary)" title="${c.coreIdea}">${c.coreIdea}</td>
                  <td>${Utils.tag(c.status, c.statusType)}</td>
                  <td>
                    <button class="btn" style="padding:4px 10px;font-size:10px" onclick="PageArbitration.showCaseDetail('${c.id}')">详情</button>
                    <button class="btn btn-primary" style="padding:4px 10px;font-size:10px" onclick="PageArbitration.startArbitration('${c.id}')">介入</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ` : ''}

        <!-- 已裁决案件 -->
        <div class="card mb-16">
          <div class="card-header">
            <h3>已裁决案件</h3>
            <span class="card-action" style="color:var(--green)">${resolvedCases.length} 件已结案</span>
          </div>
          ${resolvedCases.length > 0 ? `
          <table class="data-table">
            <thead><tr><th>案件编号</th><th>争议事项</th><th>甲方</th><th>乙方</th><th>时间差</th><th>裁决结果</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>
              ${resolvedCases.map(c => {
                const timeA = new Date(c.aTimestamp);
                const timeB = new Date(c.bTimestamp);
                const diffMs = Math.abs(timeB - timeA);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffMins = Math.floor((diffMs % 3600000) / 60000);
                return `
                <tr>
                  <td class="font-mono" style="font-size:10px;color:var(--blue)">${c.id}</td>
                  <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${c.title}">${c.title}</td>
                  <td style="font-size:11px">${c.partyA.split(' ')[0]}</td>
                  <td style="font-size:11px">${c.partyB.split(' ')[0]}</td>
                  <td style="font-size:11px">${diffHours}小时${diffMins}分钟</td>
                  <td>${Utils.tag(c.result, 'success')}</td>
                  <td>${Utils.tag(c.status, c.statusType)}</td>
                  <td>
                    <button class="btn" style="padding:4px 10px;font-size:10px" onclick="PageArbitration.showCaseDetail('${c.id}')">详情</button>
                  </td>
                </tr>
                `;
              }).join('')}
            </tbody>
          </table>
          ` : `<div class="card-body" style="text-align:center;padding:40px;color:var(--text-secondary)">暂无已裁决案件</div>`}
        </div>

        <!-- 争议统计与趋势 -->
        <div class="grid-2">
          <div class="card">
            <div class="card-header"><h3>争议类型分布</h3></div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:12px">
                ${[
                  { name: '双发布冲突', count: 7, pct: 58, color: 'blue' },
                  { name: '创意归属争议', count: 3, pct: 25, color: 'amber' },
                  { name: '术语优先权', count: 1, pct: 8, color: 'purple' },
                  { name: '其他争议', count: 1, pct: 9, color: 'green' }
                ].map(item => `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px">
                      <span style="color:var(--text-secondary)">${item.name}</span>
                      <span style="color:var(--text-primary);font-weight:600">${item.count} 件 (${item.pct}%)</span>
                    </div>
                    <div class="progress-bar" style="width:100%">
                      <div class="progress-fill" style="width:${item.pct}%;background:var(--${item.color})"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>裁决原则</h3></div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:12px">
                ${[
                  { title: '优先权原则', desc: '以区块链存证时间戳为准，先存证方享有创新优先权。存证颗粒度需细化至具体技术要素。', icon: '1' },
                  { title: '独立创作推定', desc: '若双方能提供有效的脑认知指纹+文档历史，且无实质性交叉引用，推定独立创作，双方共享署名权。', icon: '2' },
                  { title: '比例裁决', desc: '当争议限于论文部分内容时，按重合部分的创新贡献比例进行裁决，双方各自保留非重合部分的优先权。', icon: '3' },
                  { title: '和解优先', desc: '在正式裁决前，系统提供调解通道。双方协商一致的，可签署联合声明避免正式裁决记录。', icon: '4' }
                ].map(p => `
                  <div style="display:flex;gap:12px;align-items:flex-start">
                    <div style="min-width:24px;height:24px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${p.icon}</div>
                    <div>
                      <b style="font-size:12px;color:var(--text-primary)">${p.title}</b>
                      <p style="font-size:10px;color:var(--text-secondary);margin-top:2px;line-height:1.5">${p.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // === 查看案件详情 ===
  showCaseDetail(caseId) {
    const c = MockData.arbitrationCases.find(c => c.id === caseId);
    if (!c) { Utils.toast('案件不存在', 'error'); return; }

    const timeA = new Date(c.aTimestamp);
    const timeB = new Date(c.bTimestamp);
    const diffMs = Math.abs(timeB - timeA);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffMins = Math.floor((diffMs % 3600000) / 60000);
    const priority = timeA < timeB ? c.partyA.split(' ')[0] : c.partyB.split(' ')[0];

    const body = `
      <div style="display:flex;flex-direction:column;gap:14px">
        <!-- 案件基本信息 -->
        <div style="padding:14px;background:var(--bg-secondary);border-radius:var(--radius-md)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <b style="font-size:13px;color:var(--text-primary)">${c.title}</b>
            ${Utils.tag(c.status, c.statusType)}
          </div>
          <div style="font-size:11px;color:var(--text-secondary);line-height:1.6">
            案件编号：<span class="font-mono" style="color:var(--blue)">${c.id}</span>
          </div>
        </div>

        <!-- 双方信息对比 -->
        <div class="grid-2" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="padding:12px;background:#E6F1FB;border-radius:var(--radius-sm)">
            <div style="font-size:11px;color:var(--blue);font-weight:600;margin-bottom:6px">甲方</div>
            <div style="font-size:12px;color:var(--text-primary)">${c.partyA}</div>
            <div style="font-size:10px;color:var(--text-secondary);margin-top:4px">存证时间：${c.aTimestamp}</div>
            ${timeA < timeB ? `<div style="margin-top:4px">${Utils.tag('优先权方', 'success')}</div>` : ''}
          </div>
          <div style="padding:12px;background:#FAEEDA;border-radius:var(--radius-sm)">
            <div style="font-size:11px;color:var(--amber);font-weight:600;margin-bottom:6px">乙方</div>
            <div style="font-size:12px;color:var(--text-primary)">${c.partyB}</div>
            <div style="font-size:10px;color:var(--text-secondary);margin-top:4px">存证时间：${c.bTimestamp}</div>
            ${timeB < timeA ? `<div style="margin-top:4px">${Utils.tag('优先权方', 'success')}</div>` : ''}
          </div>
        </div>

        <!-- 时间线 -->
        <div>
          <b style="font-size:12px;color:var(--text-primary)">存证时间线</b>
          <div style="margin-top:8px;display:flex;align-items:center;gap:0;position:relative">
            <div style="flex:1;text-align:center;padding:8px;background:${timeA < timeB ? '#EAF3DE' : '#FCEBEB'};border-radius:var(--radius-sm)">
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-secondary)">${c.aTimestamp}</div>
              <div style="font-size:11px;color:var(--text-primary);font-weight:600;margin-top:2px">${c.partyA.split(' ')[0]} 存证</div>
            </div>
            <div style="padding:0 8px;color:var(--text-secondary);font-size:11px;white-space:nowrap">→ ${diffHours}h${diffMins}m →</div>
            <div style="flex:1;text-align:center;padding:8px;background:${timeB < timeA ? '#EAF3DE' : '#FCEBEB'};border-radius:var(--radius-sm)">
              <div style="font-size:10px;font-family:var(--font-mono);color:var(--text-secondary)">${c.bTimestamp}</div>
              <div style="font-size:11px;color:var(--text-primary);font-weight:600;margin-top:2px">${c.partyB.split(' ')[0]} 存证</div>
            </div>
          </div>
        </div>

        <!-- 核心创新点 -->
        <div style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-sm)">
          <b style="font-size:11px;color:var(--text-secondary)">争议核心创新点</b>
          <p style="font-size:12px;color:var(--text-primary);margin-top:4px">${c.coreIdea}</p>
        </div>

        <!-- 证据列表 -->
        <div>
          <b style="font-size:12px;color:var(--text-primary)">可使用证据</b>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
            ${c.evidence.map(e => Utils.tag(e, 'info')).join(' ')}
          </div>
        </div>

        ${c.status === '已裁决' ? `
        <div style="padding:12px;background:#EAF3DE;border-radius:var(--radius-md);border-left:3px solid var(--green)">
          <b style="font-size:12px;color:var(--green)">裁决结果</b>
          <p style="font-size:12px;color:var(--text-primary);margin-top:4px">${c.result}</p>
          <div style="font-size:10px;color:var(--text-secondary);margin-top:4px">裁决机构：${c.assignee}</div>
        </div>
        ` : `
        <div style="padding:12px;background:#FAEEDA;border-radius:var(--radius-md);border-left:3px solid var(--amber)">
          <b style="font-size:12px;color:var(--amber)">处理进展</b>
          <p style="font-size:11px;color:var(--text-secondary);margin-top:4px">该案件正在由 <b style="color:var(--text-primary)">${c.assignee}</b> 审理中。证据收集已完成，等待专家委员会交叉验证。</p>
        </div>
        `}

        ${c.status === '仲裁中' ? `
        <div style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-sm)">
          <b style="font-size:11px;color:var(--text-secondary)">预计裁决时间</b>
          <p style="font-size:12px;color:var(--text-primary);margin-top:4px">约 3-5 个工作日</p>
        </div>
        ` : ''}
      </div>
    `;

    const footer = `
      <button class="btn" onclick="Utils.closeModal()">关闭</button>
      ${c.status === '仲裁中' ? `<button class="btn btn-primary" onclick="Utils.closeModal();PageArbitration.startArbitration('${c.id}')">介入裁决</button>` : ''}
    `;
    Utils.modal(`案件详情 · ${c.id}`, body, footer);
  },

  // === 仲裁规则 ===
  showRulesModal() {
    const body = `
      <div style="font-size:11px;line-height:1.6;color:var(--text-secondary)">
        <div style="padding:12px;background:var(--bg-secondary);border-radius:var(--radius-md);margin-bottom:10px">
          <b style="color:var(--text-primary)">IEEE学术链仲裁规则 v3.0</b>
        </div>
        <p style="margin-bottom:8px"><b style="color:var(--text-primary)">第一条 · 适用范围</b><br>本规则适用于通过IEEE学术链提交的所有学术论文的双发布冲突、创意归属争议及术语优先权争议。</p>
        <p style="margin-bottom:8px"><b style="color:var(--text-primary)">第二条 · 优先权判定</b><br>以区块链存证的毫秒级时间戳为首要判定依据。先存证方享有创新优先权，除非另一方提供不可抗力证据（系统故障、第三方攻击等）。</p>
        <p style="margin-bottom:8px"><b style="color:var(--text-primary)">第三条 · 独立创作</b><br>若双方均能提供完整的脑认知指纹+文档版本历史，且无交叉引用痕迹，可认定为独立创作，双方共享署名权。</p>
        <p style="margin-bottom:8px"><b style="color:var(--text-primary)">第四条 · 上诉机制</b><br>对裁决结果不服的，可在7个工作日内向学术伦理法庭提起上诉，需补充新的证据。</p>
        <p style="margin-bottom:8px"><b style="color:var(--text-primary)">第五条 · 保密义务</b><br>所有仲裁过程严格保密，仲裁记录仅在IEEE学术链上存证，不公开发布案件细节。</p>
      </div>
    `;
    Utils.modal('仲裁规则', body, `<button class="btn" onclick="Utils.closeModal()">关闭</button>`);
  },

  // === 提交新争议 ===
  showNewCaseModal() {
    const body = `
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="form-group">
          <label class="form-label">争议类型</label>
          <select style="width:100%" id="arbType">
            <option value="">请选择</option>
            <option value="双发布冲突">双发布冲突</option>
            <option value="创意归属争议">创意归属争议</option>
            <option value="术语优先权">术语优先权</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">争议论文标题 / 核心创新点</label>
          <input type="text" placeholder="请输入争议内容摘要" style="width:100%" id="arbTitle">
        </div>
        <div class="form-group">
          <label class="form-label">对方信息</label>
          <input type="text" placeholder="姓名 · 单位（如已知）" style="width:100%" id="arbParty">
        </div>
        <div class="form-group">
          <label class="form-label">情况说明</label>
          <textarea placeholder="请详细描述争议情况..." style="width:100%;min-height:100px;padding:8px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:11px;resize:vertical" id="arbDesc"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">附证材料</label>
          <div style="padding:40px;border:2px dashed var(--border);border-radius:var(--radius-md);text-align:center;cursor:pointer" onclick="Utils.toast('证据材料已记录（模拟）','info')">
            <p style="font-size:11px;color:var(--text-secondary)">点击上传或拖拽文件至此处</p>
            <p style="font-size:10px;color:var(--text-tertiary);margin-top:4px">支持PDF/图片/Git日志等格式</p>
          </div>
        </div>
      </div>
    `;
    const footer = `
      <button class="btn" onclick="Utils.closeModal()">取消</button>
      <button class="btn btn-primary" onclick="PageArbitration.submitCase()">提交争议申请</button>
    `;
    Utils.modal('提交争议申请', body, footer);
  },

  submitCase() {
    const title = document.getElementById('arbTitle')?.value?.trim();
    const type = document.getElementById('arbType')?.value;
    const party = document.getElementById('arbParty')?.value?.trim();
    const desc = document.getElementById('arbDesc')?.value?.trim();

    if (!type) { Utils.toast('请选择争议类型', 'warning'); return; }
    if (!title) { Utils.toast('请输入争议内容摘要', 'warning'); return; }

    Utils.closeModal();
    Utils.toast('争议申请已提交 · 案件编号：ARB-2026-' + String(Math.floor(Math.random() * 900 + 100)), 'success');
    setTimeout(() => {
      Utils.toast('系统正在匹配区块链存证记录...', 'info');
    }, 1500);
  },

  // === 介入裁决 ===
  startArbitration(caseId) {
    Utils.closeModal();
    Utils.toast('正在调取案件材料...', 'info');
    setTimeout(() => Utils.toast('证据链已加载 · 区块链存证已比对', 'success'), 800);
    setTimeout(() => Utils.toast('已通知专家委员会介入评审', 'info'), 1600);
    setTimeout(() => Utils.toast('仲裁庭将于2个工作日内组织听证', 'info'), 2400);
  }
};
