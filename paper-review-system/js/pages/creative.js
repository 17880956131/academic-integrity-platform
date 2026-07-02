/**
 * 创意验证页面
 */
const PageCreative = {
  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="page-view">
        <div class="topbar">
          <div class="topbar-left">
            <h1>创意验证</h1>
            <p>NLP驱动的创意解构 · 虚拟世界模拟验证 · 跨领域创意比对与溯源</p>
          </div>
        </div>

        <!-- 流程 -->
        <div class="card mb-16">
          <div class="card-header"><h3>创意验证闭环流程</h3></div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;font-size:11px">
              ${['NLP创意解构','跨模态模型生成','虚拟世界模拟','跨领域创意比对','风险预警与优化'].map((step, i, arr) => `
                <div style="padding:8px 14px;background:var(--bg-info);border-radius:var(--radius-md);color:var(--blue);font-weight:500">${i+1}. ${step}</div>
                ${i < arr.length - 1 ? '<span style="color:var(--text-tertiary)">→</span>' : ''}
              `).join('')}
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header"><h3>创意要素自动化解构</h3></div>
            <div class="card-body">
              ${[
                { name: '研究问题 (Problem)', tech: '依存句法分析', desc: '识别问题陈述中的逻辑主语和谓语' },
                { name: '技术路径 (Method)', tech: '命名实体识别(NER)', desc: '提取算法名称、实验设计、数据处理步骤' },
                { name: '创新假设 (Hypothesis)', tech: '情感分析+逻辑关系抽取', desc: '识别具有突破性的假设' },
                { name: '验证结论 (Conclusion)', tech: '文本摘要技术', desc: '提取实验结果的量化指标' }
              ].map(e => `
                <div style="padding:12px 0;border-bottom:1px solid var(--border-tertiary)">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                    <b style="font-size:12px">${e.name}</b>
                    <span class="tag tag-info">${e.tech}</span>
                  </div>
                  <div style="font-size:11px;color:var(--text-secondary)">${e.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h3>虚拟模拟验证</h3></div>
            <div class="card-body">
              ${[
                { name: '参数扰动测试', desc: '蒙特卡洛模拟随机调整模型参数，观察输出结果稳定性', icon: '波动' },
                { name: '边界条件测试', desc: '在极端条件下验证模型的鲁棒性', icon: '极限' },
                { name: '多智能体交互', desc: '使用生成式智能体模拟群体行为，验证社会动力学效应', icon: '群体' },
                { name: '性能指标量化', desc: '准确率、召回率、F1值、创新距离计算', icon: '量化' }
              ].map(e => `
                <div class="mini-stat" style="padding:10px 0">
                  <div>
                    <b style="font-size:12px">${e.name}</b>
                    <div style="font-size:10px;color:var(--text-secondary);margin-top:2px">${e.desc}</div>
                  </div>
                  <span class="tag tag-purple">${e.icon}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card mb-16">
          <div class="card-header"><h3>跨领域创意比对知识库</h3></div>
          <div class="card-body">
            <div class="grid-3">
              <div style="padding:14px;background:var(--bg-secondary);border-radius:var(--radius-md)">
                <b style="font-size:12px">学术文献库</b>
                <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;line-height:1.5">Web of Science / CNKI · 提取研究问题、方法、结论要素</p>
                <div style="margin-top:8px"><span class="tag tag-success">2.8亿+ 篇</span></div>
              </div>
              <div style="padding:14px;background:var(--bg-secondary);border-radius:var(--radius-md)">
                <b style="font-size:12px">专利库</b>
                <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;line-height:1.5">USPTO / 中国专利数据库 · 提取技术方案核心创新点</p>
                <div style="margin-top:8px"><span class="tag tag-success">1.5亿+ 件</span></div>
              </div>
              <div style="padding:14px;background:var(--bg-secondary);border-radius:var(--radius-md)">
                <b style="font-size:12px">工业界案例库</b>
                <p style="font-size:10px;color:var(--text-secondary);margin-top:4px;line-height:1.5">GitHub / Kaggle · 提取算法实现细节和应用场景</p>
                <div style="margin-top:8px"><span class="tag tag-success">4000万+ 项目</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3>风险预警分级</h3></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
              <div style="padding:16px;background:var(--bg-danger);border-radius:var(--radius-md);border-left:3px solid var(--red)">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
                  <span style="width:8px;height:8px;border-radius:50%;background:var(--red)"></span>
                  <b style="font-size:12px;color:var(--red)">红色预警</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5">创意要素与知识库记录完全重合（相似度>90%），直接标注为抄袭</div>
              </div>
              <div style="padding:16px;background:var(--bg-warning);border-radius:var(--radius-md);border-left:3px solid var(--amber)">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
                  <span style="width:8px;height:8px;border-radius:50%;background:var(--amber)"></span>
                  <b style="font-size:12px;color:var(--amber)">黄色预警</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5">核心技术路径相似但实现细节不同（60%-90%），需补充差异化分析</div>
              </div>
              <div style="padding:16px;background:var(--bg-success);border-radius:var(--radius-md);border-left:3px solid var(--green)">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
                  <span style="width:8px;height:8px;border-radius:50%;background:var(--green)"></span>
                  <b style="font-size:12px;color:var(--green)">绿色安全</b>
                </div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5">创新性指标显著高于现有成果（性能提升15%+），认定为创新</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
