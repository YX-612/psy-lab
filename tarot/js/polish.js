/**
 * 星穹秘仪 — 提问润色组件
 * 本地模板匹配 + 关键词替换，不调用任何外部 API
 */
(function () {
  /**
   * 本地固定润色模板库
   * 根据关键词匹配最合适的润色模板
   */
  const POLISH_TEMPLATES = [
    {
      keywords: ['感情', '爱情', '恋爱', '喜欢', '爱', '分手', '复合', '前任', '暧昧', '对象', '男朋友', '女朋友', '婚姻', '结婚', '出轨'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `这段感情之中，${cleaned || '有哪些被我忽略的暗流与机缘'}？`;
      }
    },
    {
      keywords: ['工作', '事业', '职业', '升职', '跳槽', '辞职', '创业', '面试', 'offer', '求职', '转行', '公司', '老板', '同事', '职场'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `在当前的事业进程中，${cleaned || '有哪些选择值得我投注心力'}？`;
      }
    },
    {
      keywords: ['学业', '考试', '考研', '高考', '留学', '学习', '成绩', '毕业', '论文', '研究', '读书', '学校', '专业', '选课'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `在学业之路上，${cleaned || '有什么需要我留意的方向'}？`;
      }
    },
    {
      keywords: ['财运', '金钱', '投资', '理财', '赚钱', '收入', '加薪', '彩票', '股票', '基金', '负债', '债务'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `在财富流转之中，${cleaned || '有哪些被我忽视的机遇与陷阱'}？`;
      }
    },
    {
      keywords: ['健康', '身体', '生病', '疾病', '失眠', '焦虑', '抑郁', '压力', '睡眠', '锻炼', '减肥', '体检'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `关于身心的平衡，${cleaned || '我该如何聆听来自身体的信号'}？`;
      }
    },
    {
      keywords: ['家庭', '家人', '父母', '孩子', '亲子', '兄弟', '姐妹', '亲戚', '家人关系'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `在亲缘的纽带之中，${cleaned || '有什么需要我用心觉察的纽带'}？`;
      }
    },
    {
      keywords: ['选择', '抉择', '犹豫', '纠结', '迷茫', '方向', '要不要', '该不该', '能不能', '是否'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `当我站在岔路口，${cleaned || '该如何辨别内心真正的方向'}？`;
      }
    },
    {
      keywords: ['朋友', '友谊', '社交', '人际关系', '相处', '沟通', '人缘', '圈子'],
      template: (text) => {
        const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
        return `在人海之中，${cleaned || '有哪些羁绊值得我用心维系'}？`;
      }
    }
  ];

  // Default template when nothing matches
  const DEFAULT_TEMPLATE = (text) => {
    const cleaned = text.replace(/^(我想问|请问|帮我看看|帮我算算|帮我占卜|占卜|问一下|我想知道)/, '').trim();
    return `在命运的经纬之中，${cleaned || '此刻有什么在等待我去觉察'}？`;
  };

  /**
   * 润色用户输入的问题
   * @param {string} text - 用户输入的原始文本
   * @returns {string} 润色后的文本
   */
  function polishQuestion(text) {
    if (!text || !text.trim()) return '在命运的经纬之中，此刻有什么在等待我去觉察？';

    const raw = text.trim();

    // 计算每个模板的关键词匹配分数
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of POLISH_TEMPLATES) {
      let score = 0;
      for (const kw of entry.keywords) {
        if (raw.includes(kw)) {
          score += kw.length; // 匹配的关键词越长，权重越高
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.template(raw);
    }

    return DEFAULT_TEMPLATE(raw);
  }

  // Expose globally
  window.QuestionPolish = {
    polish: polishQuestion
  };
})();
