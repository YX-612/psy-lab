/**
 * 星穹秘仪 — 主应用逻辑
 */
(function () {
  let selectedSpread = SPREADS[0];
  let currentReading = null;
  let isDrawing = false;
  let selectedMood = null;
  let selectedMeditation = 60;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ================================================================
  //  正向化指引 — 所有卡牌释义都倾向积极情感引导
  //  逆位卡牌：简说负面，然后给予充满希望的启发
  //  正位卡牌：强化正向能量，给出积极行动建议
  // ================================================================
  const POSITIVE_ACTIONS = [
    '试着在日记中写下此刻的直觉感受',
    '给自己一杯热茶的时间安静呼吸',
    '找一面镜子，对自己说一句肯定的话',
    '打开窗户让新鲜空气流入房间',
    '在日落前出门走一段没有目的地的路',
    '给一位信任的朋友发条消息说说近况',
    '整理一个角落——空间的秩序会带来内心的秩序',
    '放下手机，闭上眼睛数三十次呼吸',
    '写下三件今天值得感恩的小事',
    '点燃一根蜡烛，凝视火焰五分钟',
    '在纸上画出此刻脑海里浮现的第一个形状',
    '对着窗外舒展双臂，深深吸气',
    '听一首没有歌词的纯音乐',
    '对路过的小动物或植物微笑——它们会记住你',
  ];

  const POSITIVE_AFFIRMATIONS = [
    '你拥有的力量比你此刻意识到的要多得多',
    '每一次迷茫，都是灵魂在为你重新校准方向',
    '停下来不是退步，是你正在等待更好的时机',
    '你值得拥有一切温柔的对待，包括你对自己的',
    '星光不会因为云层遮蔽就不再闪耀——你的光芒也是一样',
    '不必急于找到所有答案，有些路走着走着就亮了',
    '你的感受是合理的，它们不需要被任何人批准',
    '成长从来不是直线，它更像树的年轮——一圈一圈向内坚实',
    '世界上只有一种真正的勇气，就是在认清之后仍然选择向前',
    '你此刻的状态，恰恰是改变开始前的完美铺垫',
  ];

  /**
   * 获取正向化释义文本
   * 无论正逆位，最终都落在积极、鼓励、建设性建议上
   */
  function getPositiveGuidance(card) {
    if (!card.isReversed) {
      // 正位卡牌：强化正向能量 + 行动建议
      return card.upright + '。当下是顺势而为的好时机——' + pickRandom(POSITIVE_ACTIONS) + '。';
    }

    // 逆位卡牌：简说负面，随即转向积极启发
    const reversedBrief = card.reversed.split('、')[0];  // 只取第一个关键词作为简短提及
    const affirmation = pickRandom(POSITIVE_AFFIRMATIONS);
    const action = pickRandom(POSITIVE_ACTIONS);
    return `暂见「${reversedBrief}」之象，但这仅仅是提醒而非定局。${affirmation}不妨试试：${action}。`;
  }

  /**
   * 获取扩展正面指引（用于卡牌弹窗的详细展示）
   */
  function getPositiveExpandedGuidance(card) {
    const base = getPositiveGuidance(card);
    // Add a second action or affirmation for the detailed view
    if (card.isReversed) {
      return base + ' ' + pickRandom(POSITIVE_ACTIONS.filter(a => !base.includes(a)));
    }
    return base + ' 你的内在智慧已经知道答案——信任它。';
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ===== VIP权限检查 =====
  function checkQuota() {
    var status = VipModule.getStatus();
    if (!status.isVip && status.remaining <= 0) {
      VipModule.openVipModal();
      return false;
    }
    return true;
  }

  // ===== 初始化 =====
  function init() {
    renderSpreadSelector();
    updateSpreadHint();
    bindEvents();
    renderHistory();
    // 监听VIP状态变化
    window.addEventListener('vip:statuschange', function() {
      if (window._vipUpdateStatus) window._vipUpdateStatus();
    });
  }

  function bindEvents() {
    // Tab switching
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Draw button -> check quota then open mood modal
    $('#draw-btn').addEventListener('click', function() {
      if (!checkQuota()) return;
      openMoodModal();
    });

    // Clear history
    $('#clear-history-btn').addEventListener('click', clearHistory);

    // Card modal
    $('#modal-close').addEventListener('click', closeModal);
    $('#card-modal').addEventListener('click', (e) => {
      if (e.target === $('#card-modal')) closeModal();
    });

    // ===== Mood modal: mood tag selection =====
    $('#mood-modal').querySelectorAll('.mood-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        $('#mood-modal').querySelectorAll('.mood-tag').forEach(t => t.classList.remove('selected'));
        tag.classList.add('selected');
        selectedMood = tag.dataset.mood;
        $('#mood-confirm-btn').classList.add('active');
      });
    });

    // ===== Mood modal: meditation timer selection =====
    $('#mood-modal').querySelectorAll('.meditation-timer-option').forEach(opt => {
      opt.addEventListener('click', () => {
        $('#mood-modal').querySelectorAll('.meditation-timer-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedMeditation = parseInt(opt.dataset.duration, 10);
      });
    });

    // ===== Mood modal: confirm button =====
    $('#mood-confirm-btn').addEventListener('click', () => {
      if (!selectedMood) return;
      // 实际消耗一次额度
      var quotaCheck = VipModule.tryConsume();
      if (!quotaCheck) {
        closeMoodModal();
        VipModule.openVipModal();
        return;
      }
      // 更新状态栏
      if (window._vipUpdateStatus) window._vipUpdateStatus();
      closeMoodModal();
      // Start meditation, then draw
      if (selectedMeditation > 0) {
        MeditationTimer.start(selectedMeditation, () => {
          startReading();
        });
      } else {
        startReading();
      }
    });

    // ===== Mood modal: click overlay to close =====
    $('#mood-modal').addEventListener('click', (e) => {
      if (e.target === $('#mood-modal')) closeMoodModal();
    });

    // ===== Polish button =====
    $('#polish-btn').addEventListener('click', handlePolish);
  }

  // ===== 润色 =====
  function handlePolish() {
    const input = $('#question-input');
    const raw = input.value.trim();
    const polished = QuestionPolish.polish(raw);
    input.value = polished;
    // Flash animation
    const btn = $('#polish-btn');
    btn.classList.remove('flash');
    void btn.offsetWidth;
    btn.classList.add('flash');
  }

  // ===== 心境选择弹窗 =====
  function openMoodModal() {
    const modal = $('#mood-modal');
    modal.querySelectorAll('.mood-tag').forEach(t => t.classList.remove('selected'));
    selectedMood = null;
    $('#mood-confirm-btn').classList.remove('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMoodModal() {
    $('#mood-modal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== 标签切换 =====
  function switchTab(tab) {
    // 切换标签时刷新VIP状态
    if (window._vipUpdateStatus) window._vipUpdateStatus();
    $$('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
      btn.classList.toggle('text-mystic-gold-light', btn.dataset.tab === tab);
      btn.classList.toggle('text-mystic-mist', btn.dataset.tab !== tab);
      btn.classList.toggle('border-mystic-gold/40', btn.dataset.tab === tab);
      btn.classList.toggle('border-mystic-gold/20', btn.dataset.tab !== tab);
    });
    $('#panel-reading').classList.toggle('hidden', tab !== 'reading');
    $('#panel-history').classList.toggle('hidden', tab !== 'history');
    if (tab === 'history') renderHistory();
  }

  // ===== 牌阵选择器 =====
  function renderSpreadSelector() {
    const container = $('#spread-selector');
    container.innerHTML = SPREADS.map(spread => `
      <button
        class="spread-option rounded-sm p-3 sm:p-4 text-left ${spread.id === selectedSpread.id ? 'selected' : ''}"
        data-spread-id="${spread.id}"
      >
        <div class="text-2xl mb-2">${spread.icon}</div>
        <div class="font-display text-mystic-gold-light text-sm sm:text-base tracking-wider">${spread.name}</div>
        <div class="text-mystic-mist/70 text-xs mt-1 leading-relaxed">${spread.cardCount} 张牌</div>
      </button>
    `).join('');

    container.querySelectorAll('.spread-option').forEach(el => {
      el.addEventListener('click', () => {
        selectedSpread = SPREADS.find(s => s.id === el.dataset.spreadId);
        container.querySelectorAll('.spread-option').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        updateSpreadHint();
        resetReading();
      });
    });
  }

  function updateSpreadHint() {
    $('#spread-hint').textContent = selectedSpread.description;
  }

  // ===== 占卜流程 =====
  function resetReading() {
    currentReading = null;
    $('#spread-area').innerHTML = '';
    $('#interpretation-area').classList.add('hidden');
    $('#interpretation-area').innerHTML = '';
    $('#draw-btn').disabled = false;
    $('#draw-btn').querySelector('span').textContent = '开启占卜';
  }

  async function startReading() {
    if (isDrawing) return;
    isDrawing = true;
    const btn = $('#draw-btn');
    btn.disabled = true;
    btn.querySelector('span').textContent = '洗牌中...';

    resetReading();
    await renderEmptySpread();
    await shuffleAnimation();

    const drawn = drawCards(selectedSpread.cardCount);
    const question = $('#question-input').value.trim();

    currentReading = {
      spreadId: selectedSpread.id,
      spreadName: selectedSpread.name,
      question,
      mood: selectedMood,
      cards: selectedSpread.positions.map((pos, i) => ({
        position: pos,
        ...drawn[i]
      })),
      timestamp: new Date().toISOString()
    };

    await revealCards();
    renderInterpretation();
    saveToHistory();

    btn.disabled = false;
    btn.querySelector('span').textContent = '再次占卜';
    isDrawing = false;
  }

  async function renderEmptySpread() {
    const area = $('#spread-area');
    const layoutClass = getLayoutClass();

    area.innerHTML = `
      <div class="${layoutClass}">
        ${selectedSpread.positions.map(pos => `
          <div class="spread-slot ${pos.gridClass || ''}" data-position="${pos.id}">
            <div class="slot-label">${pos.label}</div>
            <div class="card-scene">
              <div class="card-3d" data-flipped="false">
                <div class="card-face card-back"><div class="card-back-design"></div></div>
                <div class="card-face card-front">
                  <span class="card-number">?</span>
                  <span class="card-symbol">✦</span>
                  <span class="card-name">...</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function getLayoutClass() {
    switch (selectedSpread.layout) {
      case 'cross': return 'spread-cross';
      case 'relationship': return 'spread-relationship';
      default: return 'spread-layout';
    }
  }

  async function shuffleAnimation() {
    const cards = $$('#spread-area .card-3d');
    cards.forEach(c => c.classList.add('shuffling'));
    await delay(1200);
    cards.forEach(c => c.classList.remove('shuffling'));
  }

  async function revealCards() {
    const slots = $$('#spread-area .spread-slot');

    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const cardData = currentReading.cards[i];
      const card3d = slot.querySelector('.card-3d');
      const front = slot.querySelector('.card-front');

      front.innerHTML = buildCardFrontHTML(cardData);

      await delay(300 + i * 400);

      card3d.classList.add('flipped');
      if (cardData.isReversed) card3d.classList.add('reversed');
      card3d.dataset.flipped = 'true';

      card3d.addEventListener('click', () => openCardModal(cardData));
    }
  }

  function buildCardFrontHTML(card) {
    const num = getCardDisplayNumber(card);
    const symbol = SUIT_SYMBOLS[card.suit] || '✦';
    const suitName = card.arcana === 'major' ? '大阿卡纳' : SUIT_NAMES[card.suit];

    return `
      <span class="card-number">${num}</span>
      <span class="card-symbol">${symbol}</span>
      <span class="card-name">${card.name}</span>
      <span class="card-suit">${suitName}</span>
    `;
  }

  function renderInterpretation() {
    const area = $('#interpretation-area');
    area.classList.remove('hidden');

    const moodLayer = currentReading.mood ? MOOD_LAYERS[currentReading.mood] : null;
    const questionHTML = currentReading.question
      ? `<p class="text-center text-mystic-mist italic mb-6">所问：「${escapeHTML(currentReading.question)}」</p>`
      : '';

    const moodHTML = moodLayer ? `
      <div class="mood-display">
        <div class="mood-display-label">心境印记</div>
        <div class="mood-display-value">${moodLayer.icon} ${moodLayer.name}</div>
        <p class="text-mystic-mist/70 text-sm mt-2 leading-relaxed">${moodLayer.evoke()}</p>
      </div>
    ` : '';

    area.innerHTML = `
      <h3 class="font-display text-center text-mystic-gold text-lg tracking-widest mb-6">牌义解读</h3>
      ${moodHTML}
      ${questionHTML}
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${currentReading.cards.map(card => {
          const mystic = getMysticInsight(card);
          const guidance = getPositiveGuidance(card);
          return `
          <div class="interpret-card p-4 sm:p-5 rounded-sm cursor-pointer hover:border-mystic-gold/50" data-card-id="${card.id}">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-display text-mystic-gold-light tracking-wider">${card.position.label}</h4>
                <p class="text-stone-300 mt-1 font-display">${card.name}</p>
              </div>
              <span class="orientation-badge ${card.isReversed ? 'reversed' : 'upright'}">
                ${card.isReversed ? '逆位' : '正位'}
              </span>
            </div>
            <p class="card-meaning-main text-mystic-mist leading-relaxed">${escapeHTML(guidance)}</p>
            ${mystic ? `<p class="card-mystic-insight text-mystic-gold/60 leading-relaxed">${mystic}</p>` : ''}
          </div>
          `;
        }).join('')}
      </div>
    `;

    area.querySelectorAll('.interpret-card').forEach((el, i) => {
      el.addEventListener('click', () => openCardModal(currentReading.cards[i]));
    });
  }

  // ===== 卡牌弹窗（扩展展示） =====
  function openCardModal(card) {
    const modal = $('#card-modal');
    const body = $('#modal-body');
    const num = getCardDisplayNumber(card);
    const symbol = SUIT_SYMBOLS[card.suit] || '✦';
    const mystic = getMysticInsight(card);
    const expandedGuidance = getPositiveExpandedGuidance(card);

    body.innerHTML = `
      <div class="text-center mb-4">
        <span class="text-4xl">${symbol}</span>
        <h3 class="font-display text-2xl text-mystic-gold-light mt-2 tracking-wider">${card.name}</h3>
        <p class="text-mystic-mist text-sm mt-1">${card.nameEn} · ${num}</p>
        <span class="orientation-badge ${card.isReversed ? 'reversed' : 'upright'} mt-3">${card.isReversed ? '逆位·发现契机' : '正位·顺势而行'}</span>
      </div>
      ${card.position ? `<p class="text-center text-mystic-gold/70 text-sm mb-4 tracking-wider">— ${card.position.label} —</p>` : ''}
      <div class="space-y-4 text-sm leading-relaxed">
        <div>
          <h4 class="text-mystic-gold text-xs tracking-widest mb-1">星语指引</h4>
          <p class="text-stone-200 text-base leading-relaxed">${escapeHTML(expandedGuidance)}</p>
        </div>
        ${mystic ? `
        <div>
          <h4 class="text-mystic-mist text-xs tracking-widest mb-1">玄学对应</h4>
          <p class="text-mystic-gold/60 text-sm leading-relaxed">${mystic}</p>
        </div>
        ` : ''}
        <div>
          <h4 class="text-mystic-mist text-xs tracking-widest mb-1">相关意涵</h4>
          <p class="text-stone-400 text-sm">正位蕴示：${card.upright}</p>
          <p class="text-stone-400 text-sm mt-1">逆位提示：${card.reversed}</p>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('#card-modal').classList.add('hidden');
    $('#card-modal').classList.remove('flex');
    document.body.style.overflow = '';
  }

  // ===== 历史记录 =====
  function saveToHistory() {
    const record = {
      spreadId: currentReading.spreadId,
      spreadName: currentReading.spreadName,
      question: currentReading.question,
      mood: currentReading.mood,
      cards: currentReading.cards.map(c => ({
        id: c.id,
        name: c.name,
        nameEn: c.nameEn,
        suit: c.suit,
        arcana: c.arcana,
        rank: c.rank,
        isReversed: c.isReversed,
        meaning: c.meaning,
        upright: c.upright,
        reversed: c.reversed,
        positionLabel: c.position.label
      }))
    };
    TarotStorage.save(record);
  }

  function renderHistory() {
    const history = TarotStorage.getAll();
    const list = $('#history-list');
    const empty = $('#history-empty');

    if (history.length === 0) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');
    list.innerHTML = history.map(record => `
      <article class="history-item p-4 sm:p-5 rounded-sm">
        <div class="flex flex-wrap justify-between items-start gap-2 mb-3">
          <div>
            <span class="font-display text-mystic-gold-light text-sm tracking-wider">${record.spreadName}</span>
            ${record.mood ? `<span class="text-mystic-mist/60 text-xs ml-2">${MOOD_LAYERS[record.mood] ? MOOD_LAYERS[record.mood].icon : ''} ${MOOD_LAYERS[record.mood] ? MOOD_LAYERS[record.mood].name : record.mood}</span>` : ''}
            ${record.question ? `<p class="text-mystic-mist text-sm mt-1 italic">「${escapeHTML(record.question)}」</p>` : ''}
          </div>
          <time class="text-mystic-mist/60 text-xs whitespace-nowrap">${TarotStorage.formatDate(record.timestamp)}</time>
        </div>
        <div class="flex flex-wrap gap-2">
          ${record.cards.map(c => `
            <span class="inline-flex items-center gap-1 text-xs px-2 py-1 border border-mystic-gold/20 rounded-sm text-stone-300">
              ${c.name}
              <span class="text-mystic-mist/60">${c.isReversed ? '↓' : '↑'}</span>
            </span>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function clearHistory() {
    if (!confirm('确定要清空所有占卜历史吗？')) return;
    TarotStorage.clear();
    renderHistory();
  }

  // ===== 工具 =====
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
