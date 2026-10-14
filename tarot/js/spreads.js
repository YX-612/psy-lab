/**
 * 塔罗牌阵配置
 */
const SPREADS = [
  {
    id: 'single',
    name: '每日一牌',
    icon: '☀',
    description: '简单直接的每日指引，适合快速获得灵感',
    cardCount: 1,
    layout: 'linear',
    positions: [
      { id: 'guidance', label: '今日指引' }
    ]
  },
  {
    id: 'three',
    name: '三牌时光',
    icon: '⏳',
    description: '过去、现在与未来，洞察时间之流',
    cardCount: 3,
    layout: 'linear',
    positions: [
      { id: 'past', label: '过去' },
      { id: 'present', label: '现在' },
      { id: 'future', label: '未来' }
    ]
  },
  {
    id: 'cross',
    name: '五牌十字',
    icon: '✚',
    description: '全方位剖析局势，揭示核心与阻碍',
    cardCount: 5,
    layout: 'cross',
    positions: [
      { id: 'situation', label: '当前局势', gridClass: 'slot-center' },
      { id: 'challenge', label: '挑战', gridClass: 'slot-top' },
      { id: 'past', label: '过去影响', gridClass: 'slot-left' },
      { id: 'future', label: '未来趋势', gridClass: 'slot-right' },
      { id: 'outcome', label: '最终结果', gridClass: 'slot-bottom' }
    ]
  },
  {
    id: 'relationship',
    name: '情感六牌',
    icon: '♡',
    description: '探索两人关系的状态与发展',
    cardCount: 6,
    layout: 'relationship',
    positions: [
      { id: 'you', label: '你的状态', gridClass: 'slot-you' },
      { id: 'them', label: '对方状态', gridClass: 'slot-them' },
      { id: 'bond', label: '关系纽带', gridClass: 'slot-bond' },
      { id: 'past', label: '过去', gridClass: 'slot-past' },
      { id: 'future', label: '未来', gridClass: 'slot-future' },
      { id: 'advice', label: '建议', gridClass: 'slot-advice' }
    ]
  }
];

if (typeof module !== 'undefined') module.exports = { SPREADS };
