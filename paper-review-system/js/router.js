/**
 * 论文智能审核系统 - 路由控制
 */

const Router = {
  currentRoute: null,
  routes: {},

  init() {
    this.registerRoutes();
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  registerRoutes() {
    this.routes = {
      'dashboard': () => PageDashboard.render(),
      'submit': () => PageSubmit.render(),
      'report': (params) => PageReport.render(params),
      'ai-detection': () => PageAIDetection.render(),
      'creative': () => PageCreative.render(),
      'terminology': () => PageTerminology.render(),
      'blockchain': () => PageBlockchain.render(),
      'innovation': () => PageInnovation.render(),
      'arbitration': () => PageArbitration.render(),
      'settings': () => this.renderSettings()
    };
  },

  navigate(route, params = {}) {
    window.location.hash = route;
    if (params.id) {
      window.location.hash = `${route}?id=${params.id}`;
    }
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const [route, queryString] = hash.split('?');
    const params = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = value;
      });
    }

    this.currentRoute = route;
    this.updateSidebar(route);

    const handler = this.routes[route];
    if (handler) {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = '';
      mainContent.scrollTop = 0;
      handler(params);
    } else {
      this.routes['dashboard']();
    }
  },

  updateSidebar(route) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });
  },

  renderSettings() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>系统设置</h1>
            <p>检测引擎配置 · 阈值设定 · 知识库管理</p>
          </div>
        </div>
        <div class="grid-2">
          <div class="card">
            <div class="card-header"><h3>检测阈值配置</h3></div>
            <div class="card-body">
              <div class="form-group">
                <label class="form-label">文字查重阈值 (%)</label>
                <input type="number" value="15" style="width:100%">
                <div class="form-hint">超过此值判定为不合格</div>
              </div>
              <div class="form-group">
                <label class="form-label">AI生成检测阈值 (%)</label>
                <input type="number" value="20" style="width:100%">
                <div class="form-hint">超过此值标记为高风险</div>
              </div>
              <div class="form-group">
                <label class="form-label">创意原创性最低分</label>
                <input type="number" value="60" style="width:100%">
                <div class="form-hint">0-100分制</div>
              </div>
              <button class="btn btn-primary" onclick="Utils.toast('阈值已保存','success')">保存配置</button>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><h3>知识库来源</h3></div>
            <div class="card-body">
              ${['Web of Science','CNKI 中国知网','USPTO 专利库','GitHub 开源项目','arXiv 预印本','IEEE Xplore'].map(src => `
                <div class="mini-stat">
                  <span class="mini-stat-label">${src}</span>
                  <span class="tag tag-success">已连接</span>
                </div>
              `).join('')}
              <div class="mt-12">
                <button class="btn" onclick="Utils.toast('正在同步知识库...','info')">手动同步</button>
                <button class="btn" onclick="Utils.toast('已添加新来源','success')">+ 添加来源</button>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>系统架构</h3></div>
          <div class="card-body">
            <div style="font-size:11px;color:var(--text-secondary);line-height:2">
              <div><b>应用层：</b>用户界面（论文提交 / 术语查询 / 争议仲裁）</div>
              <div><b>平台层：</b>区块链存证 + 脑电信号分析 + 知识图谱引擎</div>
              <div><b>数据层：</b>学术文献库 / 术语注册库 / 脑认知特征库</div>
              <div><b>基础设施层：</b>边缘计算节点（脑电设备接入）+ 云计算集群</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
