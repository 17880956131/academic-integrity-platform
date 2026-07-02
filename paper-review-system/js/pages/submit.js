/**
 * 论文提交页面
 */
const PageSubmit = {

  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>论文提交检测</h1>
            <p>支持 PDF / DOCX / LaTeX 格式 · 检测引擎 v3.0 (文字-语义-逻辑三重检测)</p>
          </div>
          <div class="topbar-right">
            <button class="btn" onclick="Router.navigate('dashboard')">← 返回总览</button>
          </div>
        </div>

        <!-- 流程步骤 -->
        <div class="steps">
          <div class="step active" id="step1"><div class="step-num">1</div><span>上传论文</span></div>
          <div class="step-line"></div>
          <div class="step" id="step2"><div class="step-num">2</div><span>配置检测</span></div>
          <div class="step-line"></div>
          <div class="step" id="step3"><div class="step-num">3</div><span>检测进行</span></div>
          <div class="step-line"></div>
          <div class="step" id="step4"><div class="step-num">4</div><span>查看报告</span></div>
        </div>

        <!-- 步骤1: 上传 -->
        <div id="submitStep1">
          <div class="card mb-16">
            <div class="card-header"><h3>上传论文文件</h3></div>
            <div class="card-body">
              <div class="upload-zone" id="uploadZone" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">📄</div>
                <div class="upload-text">点击或拖拽文件到此处上传</div>
                <div class="upload-hint">支持 PDF / DOCX / LaTeX · 单文件最大 50MB</div>
                <input type="file" id="fileInput" style="display:none" accept=".pdf,.docx,.tex" onchange="PageSubmit.handleFile(this)">
              </div>
              <div id="fileInfo" class="hidden mt-12"></div>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h3>论文基本信息</h3></div>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">论文标题 *</label>
                  <input type="text" id="paperTitle" placeholder="请输入论文标题" style="width:100%">
                </div>
                <div class="form-group">
                  <label class="form-label">作者姓名 *</label>
                  <input type="text" id="paperAuthor" placeholder="请输入作者姓名" style="width:100%">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">所属机构</label>
                  <input type="text" id="paperAffiliation" placeholder="如：某大学 计算机学院" style="width:100%">
                </div>
                <div class="form-group">
                  <label class="form-label">学科领域 *</label>
                  <select id="paperField" style="width:100%">
                    <option value="">请选择</option>
                    <option>计算机科学</option><option>医学工程</option><option>材料科学</option>
                    <option>社会科学</option><option>人工智能</option><option>生物学</option>
                    <option>物理学</option><option>化学</option><option>工程学</option><option>其他</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">核心创新点（用于区块链存证）</label>
                <textarea id="coreIdea" rows="3" placeholder="简要描述论文的核心创新点，系统将生成SHA-256哈希值上链存证" style="width:100%;resize:vertical"></textarea>
                <div class="form-hint">此内容将生成哈希值同步至IEEE学术链，形成不可篡改的时间戳证据</div>
              </div>
              <button class="btn btn-primary btn-lg" onclick="PageSubmit.goStep2()">下一步：配置检测 →</button>
            </div>
          </div>
        </div>

        <!-- 步骤2: 配置 -->
        <div id="submitStep2" class="hidden">
          <div class="card mb-16">
            <div class="card-header"><h3>检测项目配置</h3></div>
            <div class="card-body">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                ${this.renderCheckItem('文字查重', '传统文本比对 + 语义相似度分析', true, 'green')}
                ${this.renderCheckItem('AI生成检测', '20+主流AI模型指纹识别', true, 'blue')}
                ${this.renderCheckItem('创意验证', 'NLP解构 + 虚拟模拟 + 跨领域比对', true, 'purple')}
                ${this.renderCheckItem('术语溯源', '知识图谱 + 本体锚点 + 演化路径', true, 'teal')}
                ${this.renderCheckItem('区块链存证', '创新点哈希上链 + 毫秒级时间戳', true, 'green')}
                ${this.renderCheckItem('脑认知指纹', '需EEG设备 · 实验性功能', false, 'amber')}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>检测参数</h3></div>
            <div class="card-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">查重阈值 (%)</label>
                  <input type="number" value="15" id="thresholdPlagiarism" style="width:100%">
                </div>
                <div class="form-group">
                  <label class="form-label">AI检测阈值 (%)</label>
                  <input type="number" value="20" id="thresholdAI" style="width:100%">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">知识库来源</label>
                <div class="keyword-group">
                  ${['Web of Science','CNKI','USPTO','GitHub','arXiv','IEEE Xplore'].map(s => 
                    `<span class="tag tag-success">${s} ✓</span>`
                  ).join('')}
                </div>
              </div>
              <div style="display:flex;gap:8px">
                <button class="btn" onclick="PageSubmit.goStep1()">← 上一步</button>
                <button class="btn btn-primary btn-lg" onclick="PageSubmit.startDetection()">开始检测 →</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤3: 检测中 -->
        <div id="submitStep3" class="hidden">
          <div class="card">
            <div class="card-header"><h3>检测进行中</h3></div>
            <div class="card-body" style="text-align:center;padding:40px">
              <div id="detectionProgress" style="font-size:14px;color:var(--text-secondary);margin-bottom:16px">正在初始化...</div>
              <div style="width:100%;max-width:400px;height:8px;border-radius:4px;background:var(--bg-tertiary);overflow:hidden;margin:0 auto 16px">
                <div id="detectionBar" style="height:100%;width:0%;background:var(--blue);border-radius:4px;transition:width 0.5s"></div>
              </div>
              <div id="detectionPercent" style="font-size:24px;font-weight:600;color:var(--blue)">0%</div>
              <div id="detectionSteps" style="margin-top:24px;text-align:left;max-width:400px;margin:24px auto 0"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCheckItem(title, desc, checked, color) {
    return `
      <div style="padding:14px;border:1px solid var(--border-tertiary);border-radius:var(--radius-md);display:flex;align-items:flex-start;gap:10px">
        <input type="checkbox" ${checked ? 'checked' : ''} style="margin-top:2px;accent-color:var(--${color})">
        <div>
          <div style="font-weight:500;font-size:13px">${title}</div>
          <div style="font-size:10px;color:var(--text-secondary);margin-top:2px">${desc}</div>
        </div>
      </div>
    `;
  },

  handleFile(input) {
    const file = input.files[0];
    if (!file) return;
    const info = document.getElementById('fileInfo');
    info.classList.remove('hidden');
    info.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-success);border-radius:var(--radius-md)">
        <span style="font-size:24px">📄</span>
        <div style="flex:1">
          <div style="font-weight:500;font-size:13px">${file.name}</div>
          <div style="font-size:11px;color:var(--text-secondary)">${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type || '未知类型'}</div>
        </div>
        <span class="tag tag-success">已上传</span>
      </div>
    `;
    Utils.toast(`文件 ${file.name} 上传成功`, 'success');
  },

  goStep1() {
    document.getElementById('submitStep1').classList.remove('hidden');
    document.getElementById('submitStep2').classList.add('hidden');
    document.getElementById('submitStep3').classList.add('hidden');
    this.updateSteps(1);
  },

  goStep2() {
    const title = document.getElementById('paperTitle').value;
    const author = document.getElementById('paperAuthor').value;
    const field = document.getElementById('paperField').value;
    if (!title || !author || !field) {
      Utils.toast('请填写必填字段（标题、作者、学科领域）', 'warning');
      return;
    }
    document.getElementById('submitStep1').classList.add('hidden');
    document.getElementById('submitStep2').classList.remove('hidden');
    document.getElementById('submitStep3').classList.add('hidden');
    this.updateSteps(2);
  },

  startDetection() {
    document.getElementById('submitStep1').classList.add('hidden');
    document.getElementById('submitStep2').classList.add('hidden');
    document.getElementById('submitStep3').classList.remove('hidden');
    this.updateSteps(3);

    const steps = [
      '正在解析论文文本...',
      '执行文字查重比对 (CNKI + WoS + USPTO)...',
      '检测AI生成特征 (20+模型指纹)...',
      '解构创意要素 (NLP语义解析)...',
      '构建术语知识图谱 (四层图谱)...',
      '区块链存证 (IEEE学术链)...',
      '生成检测报告...'
    ];
    let i = 0;
    const stepsEl = document.getElementById('detectionSteps');
    const progressBar = document.getElementById('detectionBar');
    const progressText = document.getElementById('detectionProgress');
    const percentEl = document.getElementById('detectionPercent');

    const interval = setInterval(() => {
      if (i < steps.length) {
        const pct = Math.round(((i + 1) / steps.length) * 100);
        progressBar.style.width = pct + '%';
        percentEl.textContent = pct + '%';
        progressText.textContent = steps[i];
        stepsEl.innerHTML += `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:12px">
            <span style="width:16px;height:16px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0">✓</span>
            <span>${steps[i]}</span>
          </div>
        `;
        i++;
      } else {
        clearInterval(interval);
        percentEl.textContent = '100%';
        progressText.textContent = '检测完成';
        progressBar.style.background = 'var(--green)';
        stepsEl.innerHTML += `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:12px;color:var(--green);font-weight:500">
            <span style="width:16px;height:16px;border-radius:50%;background:var(--green);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0">✓</span>
            <span>检测完成 · 报告已生成</span>
          </div>
        `;
        setTimeout(() => {
          Utils.toast('检测完成！正在跳转报告页面...', 'success');
          setTimeout(() => Router.navigate('report', { id: 'P-2026-0702-0347' }), 1500);
        }, 800);
      }
    }, 800);
  },

  updateSteps(step) {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById('step' + i);
      el.classList.remove('active', 'done');
      if (i < step) el.classList.add('done');
      else if (i === step) el.classList.add('active');
    }
  }
};
