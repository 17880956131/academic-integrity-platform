/**
 * 区块链存证页面
 */
const PageBlockchain = {
  render() {
    const main = document.getElementById('mainContent');
    const s = MockData.systemStats;
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>区块链存证</h1>
            <p>IEEE学术链 · 毫秒级时间戳 · 不可篡改的创新确权</p>
          </div>
          <div class="topbar-right">
            <button class="btn" onclick="PageBlockchain.showHashModal()">验证哈希</button>
            <button class="btn btn-primary" onclick="Utils.toast('请先提交论文','info')">+ 新增存证</button>
          </div>
        </div>

        <div class="grid-4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px">
          <div class="metric-card">
            <div class="metric-label">今日上链</div>
            <div class="metric-value" style="color:var(--blue)">${s.blockchainToday}</div>
            <div class="metric-delta up">↑ 持续增长</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">累计存证</div>
            <div class="metric-value">${Utils.formatNumber(s.blockchainTotal)}</div>
            <div class="metric-delta">全链可追溯</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">存证精度</div>
            <div class="metric-value">毫秒级</div>
            <div class="metric-delta">SHA-256哈希</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">争议仲裁</div>
            <div class="metric-value" style="color:var(--amber)">${s.disputes}</div>
            <div class="metric-delta">双发布冲突</div>
          </div>
        </div>

        <div class="grid-2 mb-16">
          <div class="card">
            <div class="card-header"><h3>存证机制</h3></div>
            <div class="card-body">
              <div style="margin-bottom:16px">
                <b style="font-size:12px;color:var(--blue)">实时存证机制</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:4px;line-height:1.6">
                  作者在论文创作初期提交核心创新点的哈希值（包含研究问题、技术路线、预期结论），生成不可篡改的时间戳（精确至毫秒级）。哈希值同步上链至IEEE学术联盟链，形成创作时序证据链。
                </p>
              </div>
              <div>
                <b style="font-size:12px;color:var(--purple)">双发布冲突仲裁</b>
                <p style="font-size:11px;color:var(--text-secondary);margin-top:4px;line-height:1.6">
                  当出现同期发布争议时，系统自动比对双方区块链存证：先存证方默认拥有创新优先权。存证内容颗粒度细化至"图注编号""公式推导步骤"。
                </p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>存证哈希生成示例</h3></div>
            <div class="card-body">
              <div style="padding:14px;background:#1e1e2e;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:10px;color:#a6accd;line-height:1.8">
                <div style="color:#89b4fa">import hashlib</div>
                <div style="color:#89b4fa">from datetime import datetime</div>
                <div style="margin-top:8px"></div>
                <div><span style="color:#f9e2af">core_idea</span> = <span style="color:#a6e3a1">"基于脑电信号的抄袭判定模型"</span></div>
                <div><span style="color:#f9e2af">timestamp</span> = datetime.now().strftime(<span style="color:#a6e3a1">"%Y%m%d%H%M%S.%f"</span>)</div>
                <div><span style="color:#f9e2af">hash_value</span> = hashlib.sha256(<span style="color:#cba6f7">(core_idea + timestamp).encode()</span>).hexdigest()</div>
                <div style="margin-top:8px;color:#94e2d5"># Output:</div>
                <div style="color:#94e2d5;word-break:break-all">0x7a3f8c2d4e6b1a9f3c5d7e8b2a4f6d8c...</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3>最近存证记录</h3><span class="card-action">查看全部 →</span></div>
          <table class="data-table">
            <thead><tr><th>交易哈希</th><th>论文标题</th><th>作者</th><th>时间戳</th><th>网络</th><th>验证</th></tr></thead>
            <tbody>
              ${MockData.blockchainRecords.map(r => `
                <tr onclick="PageBlockchain.showRecordDetail('${r.hash}')">
                  <td class="font-mono" style="font-size:10px;color:var(--blue);cursor:pointer">${r.hash}</td>
                  <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.title}</td>
                  <td>${r.author}</td>
                  <td style="font-size:10px">${r.timestamp}</td>
                  <td>${r.network}</td>
                  <td>${Utils.tag(r.verified ? '已验证' : '待验证', r.verified ? 'success' : 'warning')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  showHashModal() {
    const body = `
      <div class="form-group">
        <label class="form-label">输入交易哈希</label>
        <input type="text" placeholder="0x..." style="width:100%;font-family:var(--font-mono)" id="verifyHash">
        <div class="form-hint">输入完整的交易哈希值进行链上验证</div>
      </div>
    `;
    const footer = `
      <button class="btn" onclick="Utils.closeModal()">取消</button>
      <button class="btn btn-primary" onclick="PageBlockchain.verifyHash()">验证</button>
    `;
    Utils.modal('验证区块链存证', body, footer);
  },

  verifyHash() {
    const hash = document.getElementById('verifyHash').value;
    if (!hash) { Utils.toast('请输入哈希值', 'warning'); return; }
    Utils.closeModal();
    setTimeout(() => {
      Utils.toast('存证验证成功 · 该哈希已在IEEE学术链上确认', 'success');
    }, 500);
  },

  showRecordDetail(hash) {
    const record = MockData.blockchainRecords.find(r => r.hash === hash);
    if (!record) return;
    const body = `
      <div class="mini-stat"><span class="mini-stat-label">交易哈希</span><span class="mini-stat-value font-mono" style="font-size:10px;word-break:break-all;text-align:right;max-width:320px">${hash}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">论文标题</span><span class="mini-stat-value" style="font-size:12px">${record.title}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">作者</span><span class="mini-stat-value">${record.author}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">时间戳</span><span class="mini-stat-value" style="font-size:12px">${record.timestamp}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">存证网络</span><span class="mini-stat-value">${record.network}</span></div>
      <div class="mini-stat"><span class="mini-stat-label">验证状态</span>${Utils.tag('已验证', 'success')}</div>
      <div class="mini-stat"><span class="mini-stat-label">区块确认</span><span class="mini-stat-value">3/3 节点</span></div>
    `;
    Utils.modal('存证详情', body, `<button class="btn" onclick="Utils.closeModal()">关闭</button>`);
  }
};
