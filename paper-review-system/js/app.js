/**
 * 论文智能审核系统 - 主应用入口
 */

const App = {
  init() {
    this.renderSidebar();
    Router.init();
  },

  renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    let html = `
      <div class="sidebar-logo">
        <div class="sidebar-logo-title">
          <span class="sidebar-logo-dot"></span>论文智能审核系统
        </div>
        <div class="sidebar-logo-sub">Academic Integrity Platform v3.0</div>
      </div>
    `;

    MockData.navConfig.forEach(group => {
      html += `<div class="nav-group">
        <div class="nav-group-label">${group.group}</div>`;
      group.items.forEach(item => {
        const iconColor = item.id === 'dashboard' ? 'var(--blue)' : 'var(--text-tertiary)';
        html += `
          <div class="nav-item ${item.id === 'dashboard' ? 'active' : ''}" data-route="${item.id}" onclick="Router.navigate('${item.id}')">
            <span class="nav-icon" style="background:${iconColor}"></span>
            ${item.label}
            ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          </div>
        `;
      });
      html += `</div>`;
    });

    sidebar.innerHTML = html;
  }
};

// === 启动 ===
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
