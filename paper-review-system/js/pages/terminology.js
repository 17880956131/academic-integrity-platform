/**
 * 术语溯源页面
 */
const PageTerminology = {
  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>术语溯源与注册</h1>
            <p>语义锚点 · 知识图谱 · 本体建模 · 术语数字确权</p>
          </div>
          <div class="topbar-right">
            <input placeholder="搜索术语..." style="width:200px" onkeyup="if(event.key==='Enter')Utils.toast('搜索中...','info')">
            <button class="btn btn-primary" onclick="PageTerminology.showRegisterModal()">+ 注册新术语</button>
          </div>
        </div>

        <!-- 统计 -->
        <div class="grid-3">
          <div class="metric-card">
            <div class="metric-label">已注册术语</div>
            <div class="metric-value">${MockData.terminologyRegistry.filter(t=>t.status==='已注册').length}</div>
            <div class="metric-delta up">覆盖 12 个学科领域</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">待审核</div>
            <div class="metric-value">${MockData.terminologyRegistry.filter(t=>t.status==='审核中').length}</div>
            <div class="metric-delta">平均审核周期 48h</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">术语引用次数</div>
            <div class="metric-value">${MockData.terminologyRegistry.reduce((s,t)=>s+t.references,0)}</div>
            <div class="metric-delta up">跨平台自动校验</div>
          </div>
        </div>

        <!-- 术语注册表 -->
        <div class="card mb-16">
          <div class="card-header"><h3>术语注册表</h3><span class="card-action" onclick="Utils.toast('共${MockData.terminologyRegistry.length}条记录','info')">查看全部 →</span></div>
          <table class="data-table">
            <thead>
              <tr><th>术语ID</th><th>中文术语</th><th>英文译名</th><th>注册人/机构</th><th>注册时间</th><th>引用数</th><th>状态</th></tr>
            </thead>
            <tbody>
              ${MockData.terminologyRegistry.map(t => `
                <tr onclick="PageTerminology.showTermDetail('${t.id}')">
                  <td class="font-mono" style="font-size:10px">${t.id}</td>
                  <td style="font-weight:500">${t.term}</td>
                  <td style="font-size:10px;color:var(--text-secondary)">${t.en}</td>
                  <td>${t.registrant}</td>
                  <td style="font-size:10px">${t.registeredAt}</td>
                  <td>${t.references}</td>
                  <td>${Utils.tag(t.status, t.type)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- 术语知识库 -->
        <div class="card mb-16">
          <div class="card-header"><h3>术语本体知识库 · 语义锚点</h3><span style="font-size:10px;color:var(--text-tertiary)">动态术语库</span></div>
          <div class="card-body">
            ${Object.entries(MockData.termOntology).map(([term, info]) => `
              <div style="padding:12px;border-bottom:1px solid var(--border-tertiary)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                  <b style="font-size:13px">${term}</b>
                  <span class="tag tag-info">${info.origin}</span>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px">本质概念: ${info.concept}</div>
                <div class="keyword-group">
                  ${info.attributes.map(a => `<span class="tag tag-purple">${a}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 侵权分级 -->
        <div class="card">
          <div class="card-header"><h3>术语侵权分级处理机制</h3></div>
          <div class="card-body">
            <table class="data-table">
              <thead><tr><th>侵权类型</th><th>判定标准</th><th>处理措施</th></tr></thead>
              <tbody>
                <tr>
                  <td>${Utils.tag('轻微误用','success')}</td>
                  <td>未标注注册ID但语义准确</td>
                  <td>自动插入引用提示（不影响发表）</td>
                </tr>
                <tr>
                  <td>${Utils.tag('概念偷换','warning')}</td>
                  <td>相似度>0.8且未获授权</td>
                  <td>退回修改，强制关联原术语注册页</td>
                </tr>
                <tr>
                  <td>${Utils.tag('系统性剽窃','danger')}</td>
                  <td>注册术语使用超3处且无标注</td>
                  <td>启动区块链存证追溯 + 作者信用评级降级</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  showRegisterModal() {
    const body = `
      <div class="form-group">
        <label class="form-label">中文术语 *</label>
        <input type="text" placeholder="如：脑认知指纹" style="width:100%" id="newTermCN">
      </div>
      <div class="form-group">
        <label class="form-label">英文译名 *</label>
        <input type="text" placeholder="如：Cognitive Fingerprint" style="width:100%" id="newTermEN">
      </div>
      <div class="form-group">
        <label class="form-label">本质概念 *</label>
        <input type="text" placeholder="术语的核心定义" style="width:100%" id="newTermConcept">
      </div>
      <div class="form-group">
        <label class="form-label">核心属性（逗号分隔）</label>
        <input type="text" placeholder="如：特征编码, 不可伪造, 个体唯一" style="width:100%" id="newTermAttrs">
      </div>
      <div class="form-group">
        <label class="form-label">所属领域</label>
        <select style="width:100%" id="newTermField">
          <option>计算机科学</option><option>医学工程</option><option>材料科学</option>
          <option>社会科学</option><option>人工智能</option><option>其他</option>
        </select>
      </div>
      <div style="padding:10px;background:var(--bg-info);border-radius:var(--radius-md);font-size:11px;color:var(--blue);line-height:1.5">
        系统将自动比对ISO术语库、IEEE标准库等12个权威源，确保新术语未被注册。审核通过后将生成唯一术语ID并同步至全球术语库。
      </div>
    `;
    const footer = `
      <button class="btn" onclick="Utils.closeModal()">取消</button>
      <button class="btn btn-primary" onclick="PageTerminology.submitTerm()">提交注册</button>
    `;
    Utils.modal('注册新术语', body, footer);
  },

  submitTerm() {
    const cn = document.getElementById('newTermCN').value;
    const en = document.getElementById('newTermEN').value;
    if (!cn || !en) {
      Utils.toast('请填写必填字段', 'warning');
      return;
    }
    Utils.closeModal();
    Utils.toast(`术语"${cn}"已提交审核，预计48小时内完成`, 'success');
  },

  showTermDetail(termId) {
    const term = MockData.terminologyRegistry.find(t => t.id === termId);
    if (!term) return;
    const body = `
      <div style="margin-bottom:16px">
        <div style="font-size:18px;font-weight:600;margin-bottom:4px">${term.term}</div>
        <div style="font-size:12px;color:var(--text-secondary)">${term.en}</div>
      </div>
      <div class="mini-stat"><span class="mini-stat-label">术语ID</span><span class="mini-stat-value font-mono" style="font-size:11px">${term.id}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">注册人/机构</span><span class="mini-stat-value">${term.registrant}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">注册时间</span><span class="mini-stat-value">${term.registeredAt}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">引用次数</span><span class="mini-stat-value">${term.references}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">状态</span>${Utils.tag(term.status, term.type)}</div>
      <div style="margin-top:12px;padding:10px;background:var(--bg-info);border-radius:var(--radius-md);font-size:11px;color:var(--blue)">
        后续使用者需在论文中标注此术语ID，系统将自动进行全文本语义监控，检测"换词不换义"的概念偷换行为。
      </div>
    `;
    Utils.modal(`术语详情`, body, `<button class="btn" onclick="Utils.closeModal()">关闭</button>`);
  }
};
