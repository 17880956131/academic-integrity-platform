/**
 * 论文智能审核系统 - Mock 数据层
 * 基于需求文档1-6构建的模拟数据
 */

const MockData = {

  // === 系统全局统计 ===
  systemStats: {
    todayCount: 1847,
    todayDelta: '+12.3%',
    aiDetectionRate: 8.7,
    aiDelta: '+2.1%',
    creativityAvg: 78.2,
    creativityDelta: '+3.5',
    termAlerts: 23,
    termDelta: '+5',
    blockchainToday: 312,
    blockchainTotal: 48591,
    disputes: 2,
    ecuDensity: 0.072,
    ecuThreshold: 0.080,
    crossDomainK: 0.32,
    techTransfer: 0.15
  },

  // === 7天趋势数据 ===
  weeklyTrend: {
    detection: [40, 55, 45, 70, 60, 80, 95],
    aiRate: [30, 35, 40, 50, 55, 65, 75],
    creativity: [50, 60, 55, 65, 70, 75, 85],
    termAlert: [40, 30, 50, 45, 55, 60, 70]
  },

  // === 抄袭风险热力图 (7x7) ===
  heatmapData: [
    1,1,2,1,1,2,1, 2,3,3,4,3,4,3, 3,4,4,5,4,3,4, 4,5,5,5,5,4,4,
    3,4,4,3,3,4,3, 1,1,2,1,1,1,1, 1,1,1,1,1,2,1
  ],

  // === 最近检测记录 ===
  recentPapers: [
    {
      id: 'P-2026-0702-0347',
      title: '基于注意力机制的图像分割算法研究',
      author: '张明远',
      field: '计算机科学',
      plagiarism: 3.7,
      aiGenerated: 4.1,
      creativity: '创新',
      creativityType: 'success',
      termStatus: '规范',
      termType: 'success',
      status: '通过',
      statusType: 'success',
      submittedAt: '2026-07-02 13:45',
      score: 87,
      blockchainHash: '0x7a3f...e29b'
    },
    {
      id: 'P-2026-0702-0346',
      title: '纳米笼递送基因治疗方案及其免疫原性分析',
      author: '李思涵',
      field: '医学工程',
      plagiarism: 8.2,
      aiGenerated: 5.3,
      creativity: '全球首创',
      creativityType: 'info',
      termStatus: '规范',
      termType: 'success',
      status: '通过',
      statusType: 'success',
      submittedAt: '2026-07-02 11:20',
      score: 91,
      blockchainHash: '0x3b8c...f41d'
    },
    {
      id: 'P-2026-0702-0345',
      title: '社交媒体舆论演化模型与多智能体仿真',
      author: '王浩然',
      field: '社会科学',
      plagiarism: 12.1,
      aiGenerated: 18.7,
      creativity: '跨学科',
      creativityType: 'warning',
      termStatus: '待审',
      termType: 'warning',
      status: '复核',
      statusType: 'warning',
      submittedAt: '2026-07-02 10:15',
      score: 68,
      blockchainHash: '0x5d2e...a83f'
    },
    {
      id: 'P-2026-0702-0344',
      title: '循环神经网络在图像识别中的应用研究',
      author: '陈雨菲',
      field: '计算机科学',
      plagiarism: 10.5,
      aiGenerated: 42.3,
      creativity: '疑似AI',
      creativityType: 'danger',
      termStatus: '本质偏离',
      termType: 'danger',
      status: '退回',
      statusType: 'danger',
      submittedAt: '2026-07-02 09:30',
      score: 32,
      blockchainHash: null
    },
    {
      id: 'P-2026-0702-0343',
      title: '碳基量子点光电耦合器件性能优化',
      author: '刘子轩',
      field: '材料科学',
      plagiarism: 6.1,
      aiGenerated: 3.8,
      creativity: '创新',
      creativityType: 'success',
      termStatus: '术语待注册',
      termType: 'warning',
      status: '待审',
      statusType: 'warning',
      submittedAt: '2026-07-02 08:45',
      score: 82,
      blockchainHash: '0x9f1a...c7b2'
    },
    {
      id: 'P-2026-0701-0312',
      title: '区块链共识机制在供应链金融中的应用',
      author: '赵晨曦',
      field: '计算机科学',
      plagiarism: 5.3,
      aiGenerated: 6.2,
      creativity: '创新',
      creativityType: 'success',
      termStatus: '规范',
      termType: 'success',
      status: '通过',
      statusType: 'success',
      submittedAt: '2026-07-01 16:20',
      score: 84,
      blockchainHash: '0x2e4f...8d1a'
    },
    {
      id: 'P-2026-0701-0308',
      title: '联邦学习框架下的隐私保护医疗数据共享',
      author: '孙雨晴',
      field: '人工智能',
      plagiarism: 4.1,
      aiGenerated: 2.8,
      creativity: '跨学科',
      creativityType: 'info',
      termStatus: '规范',
      termType: 'success',
      status: '通过',
      statusType: 'success',
      submittedAt: '2026-07-01 14:10',
      score: 89,
      blockchainHash: '0x6a3b...e5f2'
    }
  ],

  // === 论文详情（完整报告） ===
  paperDetail: {
    id: 'P-2026-0702-0347',
    title: '基于注意力机制的图像分割算法研究',
    author: '张明远',
    affiliation: '某大学 计算机科学与技术学院',
    field: '计算机科学',
    submittedAt: '2026-07-02 13:45',
    engineVersion: 'v3.0',
    knowledgeBase: 'Web of Science + CNKI + USPTO + GitHub',
    score: 87,
    blockchainHash: '0x7a3f8c2d4e6b1a9f3c5d7e8b2a4f6d8c0e2b4a6f8d0c2e4b6a8f0d2c4e6b8a0f',
    blockchainTime: '2026-07-02 13:45:23.487',
    blockchainNetwork: 'IEEE学术链',

    // 文字查重
    plagiarism: {
      total: 3.7,
      threshold: 15,
      segments: [
        { name: '直接复制', value: 0.8, color: 'green' },
        { name: '改写抄袭', value: 1.5, color: 'green' },
        { name: '引用不当', value: 1.4, color: 'amber' }
      ],
      status: '通过'
    },

    // AI生成检测
    aiDetection: {
      total: 4.1,
      threshold: 20,
      modelFingerprints: [
        { model: 'GPT-4', detected: false, rate: 0 },
        { model: 'Claude', detected: false, rate: 0 },
        { model: '文心一言', detected: false, rate: 0 },
        { model: 'Gemini', detected: true, rate: 2.1 },
        { model: 'Sora', detected: false, rate: 0 }
      ],
      styleAnalysis: '词汇分布正常 · 句式复杂度符合人类学术写作特征 · 论证框架非模板化',
      status: '通过'
    },

    // 创意验证
    creativity: {
      score: 85,
      elements: [
        { name: '研究问题', content: '注意力机制+图像分割', status: '原创', type: 'success' },
        { name: '技术路径', content: 'Transformer+CNN融合', status: '跨范式', type: 'info' },
        { name: '创新假设', content: '小目标检测准确率+12%', status: '验证', type: 'success' },
        { name: '验证结论', content: 'IoU提升4.2%', status: '量化', type: 'success' }
      ],
      knowledgeGraph: '融合Transformer与传统CNN思想 · 属于跨范式创新 · 与U-Net/Mask R-CNN对比: 小目标检测+12%',
      status: '创新'
    },

    // 术语溯源
    terminology: {
      score: 90,
      graph: {
        center: { label: '注意力机制分割', x: 45, y: 42 },
        level1: [
          { label: 'Transformer', x: 12, y: 12 },
          { label: 'CNN特征提取', x: 78, y: 12 },
          { label: 'U-Net', x: 12, y: 75 },
          { label: 'Mask R-CNN', x: 78, y: 75 }
        ],
        level2: [
          { label: '2017 Vaswani', x: 2, y: 2 },
          { label: '1989 LeCun', x: 88, y: 2 },
          { label: '2015 Ronneberger', x: 2, y: 88 },
          { label: '2017 He', x: 88, y: 88 }
        ]
      },
      evolutionPath: '2017 Transformer → 跨范式融合 → 本文方法 · 无本质属性偏离',
      terms: [
        { name: '注意力机制', anchor: '特征加权·空间聚焦', status: '规范', type: 'success' },
        { name: '图像分割', anchor: '像素级分类·语义分割', status: '规范', type: 'success' },
        { name: 'Transformer', anchor: '自注意力·序列建模', status: '规范', type: 'success' },
        { name: '空间注意力', anchor: '区域聚焦·位置编码', status: '规范', type: 'success' }
      ]
    },

    // 相似文献
    similarPapers: [
      { source: 'CNKI', title: '基于Transformer的医学图像分割', similarity: 8.2 },
      { source: 'WoS', title: 'Attention U-Net for Image Segmentation', similarity: 6.1 },
      { source: 'arXiv', title: 'CNN-Transformer Hybrid Models', similarity: 5.3 },
      { source: 'USPTO', title: 'Image Segmentation with Attention', similarity: 3.7 },
      { source: 'GitHub', title: 'seg-attention-pytorch', similarity: 2.1 }
    ],

    // 智能优化建议
    suggestions: [
      {
        type: 'warning',
        icon: '!',
        title: '引用规范提醒',
        content: '第3章方法部分引用了Vaswani et al. (2017)但未标注具体贡献，建议补充"本文在Transformer架构基础上引入了空间注意力机制"的差异化说明。'
      },
      {
        type: 'info',
        icon: 'i',
        title: '跨领域迁移潜力',
        content: '该算法可迁移至医学影像分析领域，解决微小病灶检测问题。建议引用Chen et al. (2024)以体现方法演进脉络。'
      },
      {
        type: 'success',
        icon: '+',
        title: '创新性增强',
        content: '建议在第5章增加消融实验，量化空间注意力模块对分割精度的贡献（预计IoU提升3-5%），进一步强化跨范式创新的说服力。'
      }
    ]
  },

  // === 术语注册数据 ===
  terminologyRegistry: [
    { id: 'T-20250510-001', term: '脑认知指纹', en: 'Cognitive Fingerprint', registrant: 'MIT脑科学实验室', registeredAt: '2025-05-10', status: '已注册', type: 'success', references: 12 },
    { id: 'T-20250510-002', term: '认知负荷指数', en: 'Cognitive Load Index (CLI)', registrant: '清华大学', registeredAt: '2025-05-10', status: '已注册', type: 'success', references: 8 },
    { id: 'T-20250615-003', term: 'ECU有效创新单元', en: 'Effective Creative Unit', registrant: '中国科学院', registeredAt: '2025-06-15', status: '已注册', type: 'success', references: 23 },
    { id: 'T-20260620-004', term: '碳基量子点', en: 'Carbon Quantum Dot', registrant: '—', registeredAt: '—', status: '审核中', type: 'warning', references: 0 },
    { id: 'T-20260628-005', term: '语义锚点', en: 'Semantic Anchor', registrant: '北京大学', registeredAt: '2026-06-28', status: '已注册', type: 'success', references: 5 },
    { id: 'T-20260701-006', term: '创新势能', en: 'Innovation Potential Energy', registrant: '浙江大学', registeredAt: '2026-07-01', status: '已注册', type: 'success', references: 3 }
  ],

  // === 区块链存证记录 ===
  blockchainRecords: [
    { hash: '0x7a3f8c2d...e29b', title: '纳米笼递送基因治疗方案', author: '李思涵', timestamp: '2026-07-02 14:01:23.487', network: 'IEEE学术链', verified: true },
    { hash: '0x3b8c5e7f...f41d', title: '基于注意力机制的图像分割', author: '张明远', timestamp: '2026-07-02 13:45:23.487', network: 'IEEE学术链', verified: true },
    { hash: '0x5d2e8a1b...a83f', title: '社交媒体舆论演化模型', author: '王浩然', timestamp: '2026-07-02 10:15:08.123', network: 'IEEE学术链', verified: true },
    { hash: '0x9f1a3c4d...c7b2', title: '碳基量子点光电耦合器件', author: '刘子轩', timestamp: '2026-07-02 08:45:12.891', network: 'IEEE学术链', verified: true },
    { hash: '0x2e4f6a8b...8d1a', title: '区块链共识机制应用', author: '赵晨曦', timestamp: '2026-07-01 16:20:45.302', network: 'IEEE学术链', verified: true }
  ],

  // === 争议仲裁记录 ===
  arbitrationCases: [
    {
      id: 'ARB-2026-014',
      title: '"纳米笼递送方案" 同时发布争议',
      partyA: '李思涵 (某大学)',
      partyB: '王某 (某研究所)',
      coreIdea: '纳米笼递送基因治疗方案',
      aTimestamp: '2026-07-01 09:00:00.000',
      bTimestamp: '2026-07-01 14:30:00.000',
      status: '仲裁中',
      statusType: 'warning',
      evidence: ['区块链存证', '脑认知指纹', '文档版本历史'],
      assignee: '领域专家委员会'
    },
    {
      id: 'ARB-2026-013',
      title: '"注意力分割算法" 创意归属争议',
      partyA: '张明远',
      partyB: '刘某',
      coreIdea: '空间注意力机制在图像分割中的应用',
      aTimestamp: '2026-06-28 10:00:00.000',
      bTimestamp: '2026-06-30 16:00:00.000',
      status: '已裁决',
      statusType: 'success',
      result: '甲方优先 (早48小时存证)',
      evidence: ['区块链存证', '实验日志', 'Git提交记录'],
      assignee: '学术伦理法庭'
    }
  ],

  // === 创新势能数据 ===
  innovationData: {
    ecuDensity: 0.072,
    ecuThreshold: 0.080,
    crossDomainK: 0.32,
    techTransfer: 0.15,
    paperQuality: 0.23,
    originality: 0.65,
    prediction: '2035年ρ(t)突破临界值 · 科技大爆炸概率 >70%',
    yearlyData: [
      { year: 2020, density: 0.045, papers: 620 },
      { year: 2021, density: 0.051, papers: 680 },
      { year: 2022, density: 0.056, papers: 740 },
      { year: 2023, density: 0.060, papers: 860 },
      { year: 2024, density: 0.064, papers: 920 },
      { year: 2025, density: 0.068, papers: 980 },
      { year: 2026, density: 0.072, papers: 1050 }
    ],
    formula: {
      energy: 'E(t) = ∫[P(t) × Q(t) × e^(k×c(t))] dt',
      density: 'ρ(t) = [P(t) × Q(t) × δ] / A',
      threshold: 'ρ(t) ≥ ρc (历史数据拟合 ρc = 0.08)'
    }
  },

  // === 术语知识库 ===
  termOntology: {
    '注意力机制': { concept: '特征加权机制', attributes: ['空间聚焦', '通道加权', '自注意力'], origin: '2017 Vaswani' },
    '图像分割': { concept: '像素级分类', attributes: ['语义分割', '实例分割', '全景分割'], origin: '2015 Long' },
    '循环神经网络': { concept: '时序数据处理模型', attributes: ['序列建模', '记忆机制', '梯度消失'], origin: '1997 Hochreiter' },
    '卷积神经网络': { concept: '特征提取工具', attributes: ['局部感知', '参数共享', '平移不变'], origin: '1989 LeCun' },
    '生成对抗网络': { concept: '对抗训练框架', attributes: ['生成器', '判别器', '纳什均衡'], origin: '2014 Goodfellow' },
    '区块链共识': { concept: '分布式一致性算法', attributes: ['容错能力', '能耗效率', '最终一致性'], origin: '2008 Nakamoto' }
  },

  // === 导航配置 ===
  navConfig: [
    {
      group: '核心功能',
      items: [
        { id: 'dashboard', label: '检测总览', icon: '◆' },
        { id: 'submit', label: '论文提交', icon: '◇', badge: 12 },
        { id: 'report', label: '检测报告', icon: '◇' },
        { id: 'ai-detection', label: 'AI生成检测', icon: '◇' },
        { id: 'creative', label: '创意验证', icon: '◇' }
      ]
    },
    {
      group: '进阶分析',
      items: [
        { id: 'terminology', label: '术语溯源', icon: '◇' },
        { id: 'blockchain', label: '区块链存证', icon: '◇' },
        { id: 'innovation', label: '创新势能', icon: '◇' }
      ]
    },
    {
      group: '系统',
      items: [
        { id: 'arbitration', label: '争议仲裁', icon: '◇' },
        { id: 'settings', label: '设置', icon: '◇' }
      ]
    }
  ]
};
