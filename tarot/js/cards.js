/**
 * 78张塔罗牌 — 正位/逆位中文释义
 */
const SUIT_SYMBOLS = {
  wands: '🔥',
  cups: '💧',
  swords: '⚔',
  pentacles: '⭐',
  major: '✦'
};

const SUIT_NAMES = {
  wands: '权杖',
  cups: '圣杯',
  swords: '宝剑',
  pentacles: '星币',
  major: '大阿卡纳'
};

const MAJOR_ARCANA = [
  { id: 0, name: '愚者', nameEn: 'The Fool', upright: '新的开始、冒险精神、自由、信任直觉、无限可能', reversed: '鲁莽冲动、缺乏计划、逃避责任、盲目乐观、迷失方向' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', upright: '创造力、意志力、技能施展、资源就绪、主动行动', reversed: '欺骗操纵、才能浪费、缺乏专注、错失良机、虚张声势' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', upright: '直觉智慧、内在知识、神秘洞察、静观其变、潜意识', reversed: '忽视直觉、秘密泄露、表面化、情绪压抑、信息隐藏' },
  { id: 3, name: '女皇', nameEn: 'The Empress', upright: '丰饶滋养、创造力、感官享受、母性关怀、自然和谐', reversed: '依赖过度、创造力阻塞、忽视自我、物质主义、空虚感' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', upright: '权威领导、结构秩序、稳定掌控、理性决策、保护庇护', reversed: '专制控制、僵化固执、滥用权力、缺乏纪律、独断专行' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', upright: '传统智慧、精神指引、学习教导、信仰体系、道德规范', reversed: '打破常规、个人信仰、挑战权威、虚伪教条、思想解放' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', upright: '爱情结合、重要选择、价值观一致、和谐关系、灵魂吸引', reversed: '关系失衡、错误选择、价值观冲突、诱惑考验、分离危机' },
  { id: 7, name: '战车', nameEn: 'The Chariot', upright: '意志胜利、前进动力、自我掌控、克服障碍、目标达成', reversed: '失控方向、侵略性、缺乏自律、方向迷失、内耗冲突' },
  { id: 8, name: '力量', nameEn: 'Strength', upright: '内在勇气、温柔力量、耐心毅力、驯服本能、自信从容', reversed: '自我怀疑、软弱无力、情绪失控、滥用力量、缺乏信心' },
  { id: 9, name: '隐者', nameEn: 'The Hermit', upright: '内省独处、智慧寻求、灵魂探索、指引明灯、深度思考', reversed: '孤独隔离、拒绝帮助、过度内省、迷失方向、社交退缩' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', upright: '命运转折、周期循环、好运降临、机遇来临、变化无常', reversed: '厄运连连、抗拒变化、坏运气、错失时机、循环停滞' },
  { id: 11, name: '正义', nameEn: 'Justice', upright: '公平正义、因果报应、诚实真相、法律事务、平衡决策', reversed: '不公正、逃避责任、偏见歧视、法律纠纷、失衡状态' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', upright: '暂停等待、新视角、牺牲奉献、放下执念、灵性觉醒', reversed: '无谓牺牲、拖延停滞、自私抗拒、徒劳等待、固步自封' },
  { id: 13, name: '死神', nameEn: 'Death', upright: '结束转变、重生蜕变、放下过去、重大改变、自然过渡', reversed: '抗拒改变、停滞不前、恐惧结束、无法放手、腐朽拖延' },
  { id: 14, name: '节制', nameEn: 'Temperance', upright: '平衡调和、耐心融合、适度节制、和谐共处、灵性炼金', reversed: '极端失衡、缺乏耐心、过度放纵、冲突不和、急于求成' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', upright: '物质束缚、欲望诱惑、成瘾依赖、阴暗面、权力操控', reversed: '挣脱束缚、觉醒自由、面对阴影、打破枷锁、重获掌控' },
  { id: 16, name: '塔', nameEn: 'The Tower', upright: '突然变故、旧结构崩塌、真相揭露、剧烈震荡、必要毁灭', reversed: '灾难幸免、恐惧改变、延迟崩塌、个人觉醒、渐进变革' },
  { id: 17, name: '星星', nameEn: 'The Star', upright: '希望重生、灵感指引、心灵疗愈、信念恢复、宁静祥和', reversed: '希望渺茫、信心丧失、创意枯竭、悲观失望、Disconnected' },
  { id: 18, name: '月亮', nameEn: 'The Moon', upright: '幻觉迷惑、潜意识、直觉梦境、隐藏恐惧、不确定性', reversed: '迷雾散去、恐惧释放、真相浮现、混乱平息、自我欺骗结束' },
  { id: 19, name: '太阳', nameEn: 'The Sun', upright: '成功喜悦、活力光明、真理显现、纯真快乐、丰盛成就', reversed: '暂时阴云、过度乐观、延迟成功、内在孩童、虚假快乐' },
  { id: 20, name: '审判', nameEn: 'Judgement', upright: '觉醒召唤、重生评估、因果清算、重要决定、灵魂升华', reversed: '自我批判、拒绝召唤、无法原谅、逃避审视、停滞不前' },
  { id: 21, name: '世界', nameEn: 'The World', upright: '圆满完成、成就达成、旅程终结、整合统一、新循环开始', reversed: '未完成、缺乏收尾、延迟成功、半途而废、寻求捷径' }
];

function minorCard(suit, rank, name, upright, reversed) {
  const suitPrefix = { wands: 'W', cups: 'C', swords: 'S', pentacles: 'P' };
  return {
    id: `${suit}-${rank}`,
    name,
    nameEn: `${rank} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
    arcana: 'minor',
    suit,
    rank,
    number: rank === 'ace' ? 1 : ['page', 'knight', 'queen', 'king'].includes(rank) ? rank : parseInt(rank),
    upright,
    reversed
  };
}

const MINOR_ARCANA = [
  // 权杖
  minorCard('wands', 'ace', '权杖王牌', '灵感火花、新机会、创造力爆发、热情起点、潜力无限', '延迟开始、缺乏方向、创造力枯竭、错失机会、虚有其表'),
  minorCard('wands', '2', '权杖二', '未来规划、个人力量、发现世界、做出选择、长远视野', '恐惧未知、缺乏计划、原地踏步、优柔寡断、视野狭窄'),
  minorCard('wands', '3', '权杖三', '扩展探索、远见领导、等待成果、贸易成功、团队协作', '障碍延迟、缺乏远见、失望挫折、计划受阻、团队分歧'),
  minorCard('wands', '4', '权杖四', '庆祝稳定、家庭和谐、社区归属、里程碑、安全感', '基础不稳、家庭冲突、过渡阶段、缺乏支持、庆祝过早'),
  minorCard('wands', '5', '权杖五', '竞争冲突、分歧争论、挑战考验、活力对抗、成长摩擦', '避免冲突、内部斗争、解决争端、妥协退让、精力分散'),
  minorCard('wands', '6', '权杖六', '胜利荣耀、公众认可、自信提升、领导地位、好消息', '失败挫折、缺乏认可、傲慢自负、延迟胜利、名誉受损'),
  minorCard('wands', '7', '权杖七', '防御坚持、挑战勇气、立场坚定、竞争优势、不屈不挠', '不堪重负、放弃立场、缺乏信心、四面楚歌、策略失误'),
  minorCard('wands', '8', '权杖八', '快速行动、消息传来、进展加速、自由旅行、势如破竹', '延迟阻碍、仓促行动、方向混乱、计划受挫、沟通问题'),
  minorCard('wands', '9', '权杖九', '韧性坚持、最后防线、经验智慧、警惕防备、接近胜利', '精疲力竭、偏执多疑、放弃抵抗、旧伤复发、防御过度'),
  minorCard('wands', '10', '权杖十', '负担过重、责任压力、接近完成、独自承担、成就代价', '释放负担、学会委派、减轻压力、避免崩溃、寻求帮助'),
  minorCard('wands', 'page', '权杖侍从', '探索热情、新消息、创意灵感、冒险精神、学习成长', '坏消息、缺乏方向、拖延散漫、鲁莽冲动、创意阻塞'),
  minorCard('wands', 'knight', '权杖骑士', '行动冒险、热情追求、快速变化、魅力四射、大胆前进', '鲁莽冲动、延迟行动、愤怒爆发、方向不定、虎头蛇尾'),
  minorCard('wands', 'queen', '权杖王后', '自信独立、热情魅力、社交活跃、创造力、温暖领导', '嫉妒专横、缺乏自信、依赖他人、情绪不稳、压制他人'),
  minorCard('wands', 'king', '权杖国王', '愿景领导、创业精神、荣誉正直、大胆决策、成熟权威', '专制独裁、冲动决策、缺乏远见、滥用权力、暴躁易怒'),

  // 圣杯
  minorCard('cups', 'ace', '圣杯王牌', '新感情、直觉开启、灵性觉醒、情感满足、心灵之杯', '情感阻塞、空虚失落、拒绝爱、创意枯竭、情感压抑'),
  minorCard('cups', '2', '圣杯二', '爱情伙伴、相互吸引、和谐结合、平等关系、灵魂连接', '关系失衡、分离破裂、缺乏沟通、单方面付出、误解冲突'),
  minorCard('cups', '3', '圣杯三', '友谊庆祝、社交欢乐、创造力、团聚分享、社区支持', '过度放纵、孤立排除、八卦流言、表面社交、庆祝空虚'),
  minorCard('cups', '4', '圣杯四', '沉思内省、重新评估、情感倦怠、错过机会、冥想时刻', '新机会、觉醒行动、走出停滞、接受邀请、重新参与'),
  minorCard('cups', '5', '圣杯五', '失望悲伤、追悔莫及、聚焦负面、情感创伤、潸然泪下', '接受过去、寻找希望、宽恕释怀、残留幸福、走出阴影'),
  minorCard('cups', '6', '圣杯六', '怀旧回忆、童年纯真、旧友重逢、简单快乐、馈赠温暖', '活在过去、无法前进、理想化记忆、拒绝成长、幼稚依赖'),
  minorCard('cups', '7', '圣杯七', '选择幻想、白日做梦、众多可能、想象丰富、迷惑诱惑', '清晰抉择、走出幻想、聚焦现实、减少选项、明确方向'),
  minorCard('cups', '8', '圣杯八', '离开追寻、放弃满足、灵魂探索、更高追求、勇敢告别', '恐惧改变、逃避问题、回归旧境、害怕未知、停滞舒适'),
  minorCard('cups', '9', '圣杯九', '愿望达成、满足幸福、情感丰盛、自豪享受、美梦成真', '物质主义、贪婪不满、表面幸福、愿望落空、过度自满'),
  minorCard('cups', '10', '圣杯十', '家庭幸福、情感圆满、和谐美满、永恒之爱、温馨家园', '家庭冲突、价值观分歧、破碎关系、虚假和谐、理想破灭'),
  minorCard('cups', 'page', '圣杯侍从', '创意消息、敏感直觉、浪漫提议、艺术灵感、情感探索', '情感不成熟、坏消息、创意阻塞、过度敏感、逃避现实'),
  minorCard('cups', 'knight', '圣杯骑士', '浪漫追求、魅力邀请、跟随内心、艺术气质、理想主义', '情绪化、不切实际、喜怒无常、虚假承诺、逃避冲突'),
  minorCard('cups', 'queen', '圣杯王后', '慈悲关怀、直觉强大、情感深度、滋养他人、内心平静', '情感依赖、过度牺牲、情绪操控、忽视自我、边界模糊'),
  minorCard('cups', 'king', '圣杯国王', '情感平衡、智慧领导、圆融外交、艺术鉴赏、沉稳权威', '情感操控、冷酷无情、情绪反复、压抑感受、善于操纵'),

  // 宝剑
  minorCard('swords', 'ace', '宝剑王牌', '清晰突破、新想法、真理力量、心智胜利、正义之剑', '混乱思维、残酷真相、沟通断裂、滥用权力、判断模糊'),
  minorCard('swords', '2', '宝剑二', '艰难抉择、僵局平衡、回避冲突、内心矛盾、需要决定', '信息明朗、做出决定、释放情绪、打破僵局、面对真相'),
  minorCard('swords', '3', '宝剑三', '心碎痛苦、悲伤分离、情感创伤、背叛伤害、潸然泪下', '疗愈恢复、宽恕释怀、走出悲伤、释放痛苦、重燃希望'),
  minorCard('swords', '4', '宝剑四', '休息恢复、沉思冥想、暂时退隐、充电蓄力、宁静暂停', '身心躁动、倦怠疲惫、拒绝休息、被迫行动、无法放松'),
  minorCard('swords', '5', '宝剑五', '冲突失败、惨胜、自私行为、得不偿失、紧张对立', '和解修复、放下自尊、从失败中学习、解决分歧、向前看'),
  minorCard('swords', '6', '宝剑六', '过渡旅程、离开困境、向更好前进、恢复航程、平静水域', '未解问题、情感包袱、抗拒前行、困于过去、风波再起'),
  minorCard('swords', '7', '宝剑七', '策略智取、秘密行动、迂回战术、冒险行为、足智多谋', '坦白承认、和盘托出、承担后果、策略失败、选择诚实'),
  minorCard('swords', '8', '宝剑八', '限制束缚、自我设限、受害者心态、困兽之感、恐惧', '自我解放、新视角、挣脱枷锁、赋权自己、获得释放'),
  minorCard('swords', '9', '宝剑九', '焦虑噩梦、恐惧担忧、内疚自责、精神折磨、夜不能寐', '希望重现、逐渐恢复、面对恐惧、曙光在望、释放焦虑'),
  minorCard('swords', '10', '宝剑十', '痛苦终结、跌入谷底、背叛伤害、画上句号、最后一击', '绝处逢生、劫后余生、最坏已过、重生再生、再次崛起'),
  minorCard('swords', 'page', '宝剑侍从', '好奇心、新想法、警觉观察、沟通交流、思维敏捷', '流言蜚语、欺骗隐瞒、口无遮拦、光说不做、暗中窥探'),
  minorCard('swords', 'knight', '宝剑骑士', '迅速行动、雄心壮志、思维敏捷、直截了当、坚定决心', '侵略性、冲动鲁莽、缺乏计划、恃强凌弱、 reckless'),
  minorCard('swords', 'queen', '宝剑王后', '独立果断、思维清晰、直率沟通、洞察敏锐、公正客观', '冷酷无情、 better、过于批判、恶意中伤、尖酸刻薄'),
  minorCard('swords', 'king', '宝剑国王', '智慧权威、真理力量、道德领导、逻辑清晰、理性决策', '滥用权力、操纵他人、专制暴虐、残忍无情、违背道德'),

  // 星币
  minorCard('pentacles', 'ace', '星币王牌', '新机会、物质收获、繁荣种子、显化实现、丰盛之种', '错失机会、投资失利、缺乏规划、贪婪无度、不稳定'),
  minorCard('pentacles', '2', '星币二', '平衡兼顾、适应变化、时间管理、轻重缓急、灵活应变', '失衡失控、 overwhelmed、杂乱无章、财务压力、 juggling失败'),
  minorCard('pentacles', '3', '星币三', '团队合作、技能精通、协作共赢、品质工作、学习成长', '缺乏合作、品质低劣、兴趣缺缺、沟通不畅、平庸之作'),
  minorCard('pentacles', '4', '星币四', '安全稳定、保守理财、掌控资源、储蓄积累、占有欲', '贪婪吝啬、物质主义、财务 insecurity、需要慷慨、学会放手'),
  minorCard('pentacles', '5', '星币五', '困境艰难、贫困 isolation、孤立无援、忧虑匮乏', '逐渐恢复、慈善援助、情况改善、帮助可得、困境将过'),
  minorCard('pentacles', '6', '星币六', '慷慨施予、慈善分享、公平交换、互相支持', '附带条件、不平等、自私吝啬、债务纠纷、单方面付出'),
  minorCard('pentacles', '7', '星币七', '耐心等待、长远眼光、投资耕耘、评估检视、坚持不懈', ' impatient、回报不佳、缺乏远见、白费力气、轻易放弃'),
  minorCard('pentacles', '8', '星币八', '勤奋钻研、技能发展、工匠精神、细节打磨、精益求精', '完美主义、缺乏专注、品质低劣、走捷径、动力不足'),
  minorCard('pentacles', '9', '星币九', '富足奢华、自给自足、丰盛回报、独立成就', '过度放纵、财务依赖、表面成功、孤独空虚、物质主义'),
  minorCard('pentacles', '10', '星币十', '家族 legacy、财富传承、长期成功、遗产基础', '家庭冲突、财务失败、 legacy丧失、基础动摇'),
  minorCard('pentacles', 'page', '星币侍从', '雄心学习、钻研新业、机会消息、Manifestation', '进展停滞、 procrastination、坏消息、目标不切实际、懒惰'),
  minorCard('pentacles', 'knight', '星币骑士', '勤勉踏实、 routine工作、可靠稳健、耐心前行', '工作狂、停滞不前、 bored、懒惰、 obsessive'),
  minorCard('pentacles', 'queen', '星币王后', '务实 nurturing、丰盛 security、脚踏实地、关怀他人', '物质主义、过度保护、 insecurity、忽视自我、财务焦虑'),
  minorCard('pentacles', 'king', '星币国王', '财富成功、商业头脑、安全稳定、领导 discipline', '贪婪 controlling、 materialistic、 stubborn、财务操控、腐败')
];

const CN_FIXES = {
  'swords-knight': { reversed: '侵略性、冲动鲁莽、缺乏计划、恃强凌弱、 reckless' },
  'swords-queen': { reversed: '冷酷无情、 better、过于批判、恶意中伤、尖酸刻薄' },
  'pentacles-2': { reversed: '失衡失控、 overwhelmed、杂乱无章、财务压力、应接不暇' },
  'pentacles-4': { reversed: '贪婪吝啬、物质主义、财务不稳、需要慷慨、学会放手' },
  'pentacles-5': { upright: '困境艰难、贫困潦倒、孤立无援、忧虑匮乏' },
  'pentacles-7': { reversed: '缺乏耐心、回报不佳、缺乏远见、白费力气、轻易放弃' },
  'pentacles-10': { upright: '家族传承、财富积累、长期成功、遗产基础', reversed: '家庭冲突、财务失败、传承断裂、基础动摇' },
  'pentacles-page': { upright: '雄心学习、钻研新业、机会消息、初现端倪', reversed: '进展停滞、拖延散漫、坏消息、目标不切实际、懒惰' },
  'pentacles-knight': { upright: '勤勉踏实、例行工作、可靠稳健、耐心前行', reversed: '工作狂、停滞不前、厌倦乏味、懒惰懈怠、 obsessive' },
  'pentacles-queen': { upright: '务实关怀、丰盛安定、脚踏实地、滋养他人', reversed: '物质主义、过度保护、不安全感、忽视自我、财务焦虑' },
  'pentacles-king': { upright: '财富成功、商业头脑、安全稳定、领导有方', reversed: '贪婪控制、物质至上、固执己见、财务操控、腐败堕落' },
  'major-17': { reversed: '希望渺茫、信心丧失、创意枯竭、悲观失望、失去连接' }
};

MINOR_ARCANA.forEach(card => {
  const fix = CN_FIXES[card.id];
  if (fix) {
    if (fix.upright) card.upright = fix.upright;
    if (fix.reversed) card.reversed = fix.reversed;
  }
});

MAJOR_ARCANA.forEach(card => {
  card.arcana = 'major';
  card.suit = 'major';
  card.id = `major-${card.id}`;
  const fix = CN_FIXES[card.id];
  if (fix) {
    if (fix.upright) card.upright = fix.upright;
    if (fix.reversed) card.reversed = fix.reversed;
  }
});

const TAROT_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

function shuffleDeck(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function drawCards(count) {
  const shuffled = shuffleDeck(TAROT_DECK);
  return shuffled.slice(0, count).map(card => {
    // Normalize: add arcana for major cards if missing, fix id format
    const c = { ...card };
    if (c.arcana === undefined || c.arcana === null) {
      c.arcana = 'major';
      c.id = 'major-' + c.id;
    }
    c.isReversed = Math.random() < 0.5;
    c.meaning = c.isReversed ? c.reversed : c.upright;
    return c;
  });
}

function getCardDisplayNumber(card) {
  if (card.arcana === 'major') {
    const num = parseInt(card.id.split('-')[1]);
    return num;
  }
  if (card.rank === 'ace') return 'A';
  if (['page', 'knight', 'queen', 'king'].includes(card.rank)) {
    return { page: '侍', knight: '骑', queen: '后', king: '王' }[card.rank];
  }
  return card.rank;
}

/* ===============================================================
 * 玄学对应系统：占星、元素、数秘、卡巴拉、炼金术
 * 每张牌的神秘学深度信息——供释义时嵌入
 * =============================================================== */

const MYSTIC_CORRESPONDENCES = {
  'major-0':  { star: '天王星', element: '风', sephirah: '柯忒尔(1)', number: 0, alchemy: 'Prima Materia', keyword: '无限可能', chakra: '顶轮' },
  'major-1':  { star: '水星', element: '风', sephirah: '柯忒尔(2)', number: 1, alchemy: 'Coagulatio', keyword: '显化意志', chakra: '喉轮' },
  'major-2':  { star: '月亮', element: '水', sephirah: '柯忒尔(3)', number: 2, alchemy: 'Sublimatio', keyword: '直觉之门', chakra: '眉心轮' },
  'major-3':  { star: '金星', element: '土', sephirah: '比纳(3)', number: 3, alchemy: 'Multiplicatio', keyword: '丰饶之流', chakra: '脐轮' },
  'major-4':  { star: '白羊座', element: '火', sephirah: '赫斯德(4)', number: 4, alchemy: 'Fixatio', keyword: '权威架构', chakra: '太阳轮' },
  'major-5':  { star: '金牛座', element: '土', sephirah: '格布拉(5)', number: 5, alchemy: 'Coniunctio', keyword: '传承之柱', chakra: '喉轮' },
  'major-6':  { star: '双子座', element: '风', sephirah: '蒂法雷特(6)', number: 6, alchemy: 'Copulatio', keyword: '命运抉择', chakra: '心轮' },
  'major-7':  { star: '巨蟹座', element: '水', sephirah: '内查赫(7)', number: 7, alchemy: 'Circulatio', keyword: '意志战车', chakra: '太阳轮' },
  'major-8':  { star: '狮子座', element: '火', sephirah: '霍德(8)', number: 8, alchemy: 'Fermentatio', keyword: '柔韧之力', chakra: '心轮' },
  'major-9':  { star: '处女座', element: '土', sephirah: '耶索德(9)', number: 9, alchemy: 'Separatio', keyword: '内在之光', chakra: '眉心轮' },
  'major-10': { star: '木星', element: '火', sephirah: '马尔库特(10)', number: 10, alchemy: 'Rotatio', keyword: '命运齿轮', chakra: '顶轮' },
  'major-11': { star: '天秤座', element: '风', sephirah: '蒂法雷特(6)', number: 11, alchemy: 'Aequilibrium', keyword: '天平衡量', chakra: '心轮' },
  'major-12': { star: '海王星', element: '水', sephirah: '马尔库特(10)', number: 12, alchemy: 'Suspensio', keyword: '反向之观', chakra: '眉心轮' },
  'major-13': { star: '天蝎座', element: '水', sephirah: '格布拉(5)', number: 13, alchemy: 'Nigredo', keyword: '凤凰涅槃', chakra: '海底轮' },
  'major-14': { star: '射手座', element: '火', sephirah: '耶索德(9)', number: 14, alchemy: 'Distillatio', keyword: '黄金中道', chakra: '太阳轮' },
  'major-15': { star: '摩羯座', element: '土', sephirah: '内查赫(7)', number: 15, alchemy: 'Calcinatio', keyword: '欲望之锁', chakra: '海底轮' },
  'major-16': { star: '火星', element: '火', sephirah: '赫斯德(4)', number: 16, alchemy: 'Destructio', keyword: '崩塌即重建', chakra: '太阳轮' },
  'major-17': { star: '水瓶座', element: '风', sephirah: '霍德(8)', number: 17, alchemy: 'Aqua Vitae', keyword: '希望之泉', chakra: '心轮' },
  'major-18': { star: '双鱼座', element: '水', sephirah: '比纳(3)', number: 18, alchemy: 'Lunatio', keyword: '迷雾渡者', chakra: '眉心轮' },
  'major-19': { star: '太阳', element: '火', sephirah: '蒂法雷特(6)', number: 19, alchemy: 'Albedo', keyword: '光耀真理', chakra: '太阳轮' },
  'major-20': { star: '冥王星', element: '火', sephirah: '格布拉(5)', number: 20, alchemy: 'Rubedo', keyword: '觉醒号角', chakra: '顶轮' },
  'major-21': { star: '土星', element: '土', sephirah: '马尔库特(10)', number: 21, alchemy: 'Lapis Philosophorum', keyword: '圆满之圆', chakra: '顶轮' },
  // 权杖（火元素）
  'wands-ace':   { star: '火星', element: '火', number: 1, alchemy: 'Ignis', keyword: '原初之火' },
  'wands-2':     { star: '火星在金牛', element: '火', number: 2, alchemy: 'Divisio', keyword: '展望与抉择' },
  'wands-3':     { star: '太阳在金牛', element: '火', number: 3, alchemy: 'Amplificatio', keyword: '远航之锚' },
  'wands-4':     { star: '金星在金牛', element: '火', number: 4, alchemy: 'Stabilitas', keyword: '休憩庭院' },
  'wands-5':     { star: '土星在狮子', element: '火', number: 5, alchemy: 'Conflictus', keyword: '摩擦之火' },
  'wands-6':     { star: '木星在狮子', element: '火', number: 6, alchemy: 'Victoria', keyword: '凯旋之路' },
  'wands-7':     { star: '火星在狮子', element: '火', number: 7, alchemy: 'Pugna', keyword: '高地坚守' },
  'wands-8':     { star: '水星在射手', element: '火', number: 8, alchemy: 'Velocitas', keyword: '箭矢之速' },
  'wands-9':     { star: '月亮在射手', element: '火', number: 9, alchemy: 'Fortitudo', keyword: '最终防线' },
  'wands-10':    { star: '土星在射手', element: '火', number: 10, alchemy: 'Onus', keyword: '重负之杖' },
  'wands-page':  { star: '水星在天蝎', element: '火/土', alchemy: 'Nuntius', keyword: '探索之焰' },
  'wands-knight':{ star: '火星在天蝎', element: '火/水', alchemy: 'Ardens', keyword: '冲锋之焰' },
  'wands-queen': { star: '月亮在双鱼', element: '火/水', alchemy: 'Calida', keyword: '炽热之心' },
  'wands-king':  { star: '太阳在射手', element: '火/土', alchemy: 'Rex Ignis', keyword: '火焰王座' },
  // 圣杯（水元素）
  'cups-ace':    { star: '金星', element: '水', number: 1, alchemy: 'Aqua', keyword: '情感之源' },
  'cups-2':      { star: '金星在巨蟹', element: '水', number: 2, alchemy: 'Amor', keyword: '心灵之约' },
  'cups-3':      { star: '水星在巨蟹', element: '水', number: 3, alchemy: 'Gaudium', keyword: '欢庆之杯' },
  'cups-4':      { star: '月亮在巨蟹', element: '水', number: 4, alchemy: 'Contemplatio', keyword: '内倾之镜' },
  'cups-5':      { star: '火星在天蝎', element: '水', number: 5, alchemy: 'Dolor', keyword: '破碎之杯' },
  'cups-6':      { star: '太阳在天蝎', element: '水', number: 6, alchemy: 'Memoria', keyword: '纯真之忆' },
  'cups-7':      { star: '金星在天蝎', element: '水', number: 7, alchemy: 'Illusio', keyword: '幻象迷宫' },
  'cups-8':      { star: '土星在双鱼', element: '水', number: 8, alchemy: 'Abnegatio', keyword: '告别之舟' },
  'cups-9':      { star: '木星在双鱼', element: '水', number: 9, alchemy: 'Felicitas', keyword: '幸福满溢' },
  'cups-10':     { star: '火星在双鱼', element: '水', number: 10, alchemy: 'Harmonia', keyword: '永恒之泉' },
  'cups-page':   { star: '水星在巨蟹', element: '水/土', alchemy: 'Nuntius Amoris', keyword: '情感信使' },
  'cups-knight': { star: '金星在天蝎', element: '水/风', alchemy: 'Adveniens', keyword: '骑士之心' },
  'cups-queen':  { star: '月亮在天蝎', element: '水/火', alchemy: 'Mater Aquae', keyword: '深邃之母' },
  'cups-king':   { star: '太阳在双鱼', element: '水/土', alchemy: 'Rex Aquae', keyword: '慈悲王冠' },
  // 宝剑（风元素）
  'swords-ace':  { star: '木星', element: '风', number: 1, alchemy: 'Aer', keyword: '真理之锋' },
  'swords-2':    { star: '月亮在天秤', element: '风', number: 2, alchemy: 'Bilantia', keyword: '平衡之刃' },
  'swords-3':    { star: '土星在天秤', element: '风', number: 3, alchemy: 'Tristitia', keyword: '穿心之痛' },
  'swords-4':    { star: '天王星在天秤', element: '风', number: 4, alchemy: 'Quies', keyword: '剑冢之眠' },
  'swords-5':    { star: '金星在水瓶', element: '风', number: 5, alchemy: 'Stragem', keyword: '惨胜荒芜' },
  'swords-6':    { star: '水星在水瓶', element: '风', number: 6, alchemy: 'Transitus', keyword: '渡水之舟' },
  'swords-7':    { star: '月亮在水瓶', element: '风', number: 7, alchemy: 'Furtum', keyword: '暗影之策' },
  'swords-8':    { star: '木星在双子', element: '风', number: 8, alchemy: 'Vinculum', keyword: '自我囚笼' },
  'swords-9':    { star: '火星在双子', element: '风', number: 9, alchemy: 'Insomnia', keyword: '午夜惊醒' },
  'swords-10':   { star: '太阳在双子', element: '风', number: 10, alchemy: 'Finis', keyword: '终结谷底' },
  'swords-page': { star: '太阳在水瓶', element: '风/土', alchemy: 'Explorator', keyword: '探察之眼' },
  'swords-knight':{ star: '金星在水瓶', element: '风/水', alchemy: 'Celeritas', keyword: '疾风之锋' },
  'swords-queen':{ star: '月亮在天秤', element: '风/火', alchemy: 'Mater Ventorum', keyword: '风之女王' },
  'swords-king': { star: '太阳在水瓶', element: '风/土', alchemy: 'Rex Aeris', keyword: '理智王权' },
  // 星币（土元素）
  'pentacles-ace':   { star: '金星', element: '土', number: 1, alchemy: 'Terra', keyword: '显化之种' },
  'pentacles-2':     { star: '木星在摩羯', element: '土', number: 2, alchemy: 'Motus', keyword: '流动之衡' },
  'pentacles-3':     { star: '火星在摩羯', element: '土', number: 3, alchemy: 'Ars', keyword: '工匠之手' },
  'pentacles-4':     { star: '太阳在摩羯', element: '土', number: 4, alchemy: 'Custodia', keyword: '紧握之盾' },
  'pentacles-5':     { star: '水星在金牛', element: '土', number: 5, alchemy: 'Paupertas', keyword: '寒冬之门' },
  'pentacles-6':     { star: '月亮在金牛', element: '土', number: 6, alchemy: 'Largitio', keyword: '施与受' },
  'pentacles-7':     { star: '土星在金牛', element: '土', number: 7, alchemy: 'Cultura', keyword: '深耕之候' },
  'pentacles-8':     { star: '太阳在处女', element: '土', number: 8, alchemy: 'Industria', keyword: '精雕细琢' },
  'pentacles-9':     { star: '金星在处女', element: '土', number: 9, alchemy: 'Abundantia', keyword: '独享丰盈' },
  'pentacles-10':    { star: '水星在处女', element: '土', number: 10, alchemy: 'Hereditas', keyword: '血脉之树' },
  'pentacles-page':  { star: '火星在处女', element: '土/火', alchemy: 'Discipulus', keyword: '学徒之心' },
  'pentacles-knight':{ star: '金星在摩羯', element: '土/水', alchemy: 'Strenuus', keyword: '坚实步履' },
  'pentacles-queen': { star: '月亮在摩羯', element: '土/火', alchemy: 'Mater Terrae', keyword: '大地之母' },
  'pentacles-king':  { star: '水星在摩羯', element: '土/风', alchemy: 'Rex Terrae', keyword: '丰盛王座' }
};

/**
 * 获取一张牌的完整玄学释义（含神秘学对应）
 */
function getMysticInsight(card) {
  const mc = MYSTIC_CORRESPONDENCES[card.id] || {};
  const insignts = [];
  if (mc.star) insignts.push(`占星：${mc.star}`);
  if (mc.element) insignts.push(`元素：${mc.element}`);
  if (mc.sephirah) insignts.push(`卡巴拉：${mc.sephirah}`);
  if (mc.number !== undefined) insignts.push(`数秘：${mc.number}`);
  if (mc.alchemy) insignts.push(`炼金术：${mc.alchemy}`);
  if (mc.keyword) insignts.push(`密钥：${mc.keyword}`);
  if (mc.chakra) insignts.push(`脉轮：${mc.chakra}`);
  return insignts.join(' · ');
}

/**
 * 心境对应的额外释义层
 */
const MOOD_LAYERS = {
  'heart': {
    name: '感情内耗',
    icon: '💕',
    evoke: () => '你心中那些反复咀嚼的片段与画面，正在以你不知道的方式编织你的命运经纬。卡牌的排列暗示着情感潮汐之下，有一条更深的水流等待被你觉察。'
  },
  'career': {
    name: '事业抉择',
    icon: '⚔️',
    evoke: () => '站在岔路口的不只是你的双脚，还有你尚未觉察的那部分天赋。卡牌所揭示的不是哪条路更安全，而是哪条路更接近你灵魂深处早已写就的轨迹。'
  },
  'self': {
    name: '自我迷茫',
    icon: '🌙',
    evoke: () => '当自我成为最熟悉的陌生人，塔罗将扮演你那面被遗忘的镜子。每一张牌都是你内心某个被忽略的侧面在向你伸出手，它一直在那里，等待被你认领。'
  },
  'short': {
    name: '短期运势',
    icon: '🌊',
    evoke: () => '短期之内没有偶然，只有尚未被解读的因果链条。卡牌之间的张力揭示着那股正在朝你涌来的潮汐——不在遥远的未来，就在你接下来数次日升月落之间。'
  }
};

/* ===============================================================
 * 权限模块 — 每日免费次数 + VIP会员
 * =============================================================== */
window.VipModule = (function () {
  // ---- 常量 ----
  const VIP_CODE = 'TAROT-FULL-VIP';
  const DAILY_FREE = 2;
  const STORAGE_KEY = 'mystic_tarot_vip';
  const QUOTA_KEY = 'mystic_tarot_quota';

  // ---- 内部工具 ----
  function getDateStr() {
    return new Date().toISOString().slice(0, 10); // '2026-07-11'
  }

  // ---- 读写存储 ----
  function loadVIP() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveVIP(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadQuota() {
    try {
      return JSON.parse(localStorage.getItem(QUOTA_KEY)) || {};
    } catch { return {}; }
  }

  function saveQuota(data) {
    localStorage.setItem(QUOTA_KEY, JSON.stringify(data));
  }

  // ---- 公开 API ----

  /** 判断是否为VIP会员 */
  function isUserVip() {
    const vip = loadVIP();
    return vip.isFullVip === true;
  }

  /** 获取当日已用次数 */
  function getUsedToday() {
    const quota = loadQuota();
    const today = getDateStr();
    // 日期跨天自动重置
    if (quota.date !== today) {
      quota.date = today;
      quota.used = 0;
      saveQuota(quota);
    }
    return quota.used || 0;
  }

  /** 获取今日剩余免费次数 */
  function getRemaining() {
    if (isUserVip()) return Infinity;
    return Math.max(0, DAILY_FREE - getUsedToday());
  }

  /** 尝试消耗一次免费次数，返回是否成功 */
  function tryConsume() {
    if (isUserVip()) return true; // VIP不限
    const used = getUsedToday();
    if (used >= DAILY_FREE) return false; // 已用完
    const quota = loadQuota();
    quota.date = getDateStr();
    quota.used = (quota.used || 0) + 1;
    saveQuota(quota);
    return true;
  }

  /** 兑换VIP会员码 */
  function redeemCode(code) {
    if (!code || code.trim() === '') {
      return { success: false, msg: '请输入兑换码' };
    }
    if (code.trim() !== VIP_CODE) {
      return { success: false, msg: '兑换码无效，请重试' };
    }
    const vip = loadVIP();
    if (vip.isFullVip) {
      return { success: false, msg: '您已是会员，无需重复兑换' };
    }
    vip.isFullVip = true;
    vip.activatedAt = new Date().toISOString();
    saveVIP(vip);
    return { success: true, msg: '🎉 恭喜！VIP已激活，尽享无限占卜' };
  }

  /** 获取VIP卡信息（用于弹窗展示） */
  function getStatus() {
    return {
      isVip: isUserVip(),
      remaining: getRemaining(),
      usedToday: getUsedToday(),
      dailyLimit: DAILY_FREE,
    };
  }

  /** 打开VIP会员弹窗 */
  function openVipModal() {
    // 由全局事件绑定处理
    const evt = new CustomEvent('vip:open');
    document.dispatchEvent(evt);
  }

  // 自动初始化：页面加载时确保天数切换重置
  getUsedToday(); // 副作用：检查日期并重置

  return {
    isUserVip,
    getUsedToday,
    getRemaining,
    tryConsume,
    redeemCode,
    getStatus,
    openVipModal,
    DAILY_FREE,
    VIP_CODE,
  };
})();

if (typeof module !== 'undefined') module.exports = { TAROT_DECK, SUIT_SYMBOLS, SUIT_NAMES, drawCards, getCardDisplayNumber, shuffleDeck, getMysticInsight, MYSTIC_CORRESPONDENCES, MOOD_LAYERS };
