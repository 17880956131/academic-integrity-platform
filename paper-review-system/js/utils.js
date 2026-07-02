/**
 * 论文智能审核系统 - 工具函数库
 */

const Utils = {

  // === Toast 通知 ===
  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '!' };
    toast.innerHTML = `<span style="font-weight:600;color:var(--${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'blue'})">${icons[type] || ''}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // === 模态框 ===
  modal(title, bodyHtml, footerHtml = '') {
    const container = document.getElementById('modalContainer');
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" onclick="Utils.closeModal()">&times;</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;
    overlay.addEventListener('click', () => Utils.closeModal());
    container.appendChild(overlay);
    return overlay;
  },

  closeModal() {
    const container = document.getElementById('modalContainer');
    container.innerHTML = '';
  },

  // === 颜色映射 ===
  colorMap: {
    green: { bg: '#EAF3DE', text: '#3B6D11', solid: '#3B6D11' },
    red: { bg: '#FCEBEB', text: '#A32D2D', solid: '#A32D2D' },
    amber: { bg: '#FAEEDA', text: '#854F0B', solid: '#854F0B' },
    blue: { bg: '#E6F1FB', text: '#185FA5', solid: '#185FA5' },
    purple: { bg: '#EEEDFE', text: '#534AB7', solid: '#534AB7' },
    teal: { bg: '#E1F5EE', text: '#0F6E56', solid: '#0F6E56' }
  },

  // === 热力图颜色 ===
  heatColor(level) {
    const colors = ['#EAF3DE', '#C0DD97', '#97C459', '#FAC775', '#F09595', '#E24B4A', '#A32D2D'];
    return colors[Math.min(level - 1, colors.length - 1)];
  },

  // === 进度条 ===
  progressBar(value, max = 100, color = 'green', width = 60) {
    const pct = Math.min((value / max) * 100, 100);
    const c = this.colorMap[color] || this.colorMap.green;
    return `<span class="progress-bar" style="width:${width}px"><span class="progress-fill" style="width:${pct}%;background:${c.solid}"></span></span>`;
  },

  // === 标签 ===
  tag(text, type = 'success') {
    return `<span class="tag tag-${type}">${text}</span>`;
  },

  // === 格式化数字 ===
  formatNumber(num) {
    return num.toLocaleString('zh-CN');
  },

  // === 评分环 SVG ===
  scoreRing(score, size = 80) {
    const r = (size - 12) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - score / 100);
    const color = score >= 80 ? '#3B6D11' : score >= 60 ? '#854F0B' : '#A32D2D';
    const bgColor = score >= 80 ? '#EAF3DE' : score >= 60 ? '#FAEEDA' : '#FCEBEB';
    return `
      <div class="score-ring" style="width:${size}px;height:${size}px;position:relative">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${bgColor}" stroke-width="6"/>
          <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            stroke-linecap="round" transform="rotate(-90 ${size/2} ${size/2})"
            style="transition: stroke-dashoffset 0.8s ease"/>
        </svg>
        <div class="score-ring-text">
          <b style="color:${color}">${score}</b>
          <span>综合评分</span>
        </div>
      </div>
    `;
  },

  // === 迷你柱状图 ===
  sparkline(data, color = '#85B7EB', highlightColor = null) {
    const max = Math.max(...data);
    return `<div class="metric-spark">${data.map((v, i) => {
      const h = (v / max) * 100;
      const c = (i === data.length - 1 && highlightColor) ? highlightColor : color;
      return `<span style="background:${c};height:${h}%"></span>`;
    }).join('')}</div>`;
  },

  // === 模拟检测过程 ===
  simulateDetection(paperTitle, callback) {
    const steps = [
      '正在解析论文文本...',
      '执行文字查重比对...',
      '检测AI生成特征...',
      '解构创意要素...',
      '构建术语知识图谱...',
      '区块链存证...',
      '生成检测报告...'
    ];
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        callback(steps[stepIndex], (stepIndex + 1) / steps.length * 100);
        stepIndex++;
      } else {
        clearInterval(interval);
        callback('检测完成', 100);
      }
    }, 600);
    return interval;
  },

  // === 延迟 ===
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // === 生成哈希 ===
  generateHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 8; i++) hash += chars[Math.floor(Math.random() * 16)];
    hash += '...';
    for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * 16)];
    return hash;
  },

  // === 生成时间戳 ===
  generateTimestamp() {
    const now = new Date();
    const pad = (n, l = 2) => String(n).padStart(l, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
  }
};
