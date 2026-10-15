# 心理测试合集 · PSY LAB

> 六个纯前端的心理与趣味测试放在一个站点里。
> **零依赖 · 零构建 · 零后端 · 不收集任何数据 · 完全离线可用**

<p>
  <img alt="deps" src="https://img.shields.io/badge/dependencies-0-2437ff">
  <img alt="build" src="https://img.shields.io/badge/build-none-2437ff">
  <img alt="backend" src="https://img.shields.io/badge/backend-none-2437ff">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-2437ff">
</p>
**▶ 在线体验：[点击打开 PSY LAB](https://yx-612.github.io/psy-lab/ )**（GitHub Pages · 手机可直接打开）

## 包含的测试

| # | 测试 | 说明 | 风格 |
|---|---|---|---|
| 01 | **诸子百家人格测试** | 15 道情境题映射 10 个先秦流派，附九流分布雷达图 | 国风 |
| 02 | **测测你是红楼梦里的谁** | 8 道题映射黛玉 / 宝钗 / 熙凤等 8 个角色 | 国风 |
| 03 | **辩论位适配测试** | 16 道题判断你适合打一辩到四辩，输出四维适配度 | 现代蓝 |
| 04 | **星穹秘仪 · 塔罗占卜** | 78 张牌多牌阵，正逆位释义 + 冥想引导 + 历史存档 | 暗黑鎏金 |
| 05 | **天赋 · 职业方向测评** | 多维定位天赋区与职业方向 | 简约 |
| 06 | **你是否喜欢上一个人** | 6 道少女心趣味题，按心意分数段给答案 | 粉色 |

枢纽页统一为蓝白瑞士极简风格（`#2437ff` 克莱因蓝 + 纯白底 + 纯黑硬边框 + 零圆角），每个测试保留自己的主题。

---

## 技术形态

- **纯静态**：HTML + CSS + 原生 JavaScript，无框架、无打包工具、无 `npm install`
- **零外部依赖**：Chart.js 与 Tailwind 已本地化到 `vendor/`，字体走系统字体栈 —— **断网、内网、双击本地文件都能跑**
- **零后端**：所有计分在浏览器内完成，没有任何请求发往服务器
- **响应式**：卡片网格用 `auto-fill / minmax` 自适应，窄屏自然折叠为单列

---

## 本地预览

```bash
# 方式一：直接双击 index.html —— 没有构建步骤

# 方式二：起个静态服务器（推荐，路径行为更贴近线上）
python -m http.server 8000
# 打开 http://localhost:8000
```

---

## 部署

仓库根目录就是 `index.html`，所以静态托管平台全部开箱即用。

### GitHub Pages

1. 把本目录内容推到一个 GitHub 仓库（`index.html` 在仓库根目录）
2. `Settings` → `Pages` → Source 选 `Deploy from a branch`，分支 `main` / 目录 `/ (root)`
3. 访问 `https://<用户名>.github.io/<仓库名>/`

### Cloudflare Pages（国内访问更稳）

1. Dashboard → `Workers & Pages` → `Pages` → `Create a Page` → 关联 Git 仓库
2. Framework preset 选 `None`；Build command 与 Build output directory **都留空**
3. 部署完成即得 `*.pages.dev` 域名

> 因为整个站点零外部依赖，部署后不需要任何环境变量、API Key 或服务端配置。

---

## 计分公平性

这一节是这个项目里最值得看的部分。

心理测试的结果分布应当与用户的作答相关，而不是被"答案键的算术"左右。
判断方法很简单：**让程序完全随机作答**。随机作答下各结果类型的出现概率应当一致，
偏离多少，就是结果被结构左右了多少。

用 20 万次随机作答做蒙特卡洛，对均匀分布做卡方检验，结果如下（修复前）：

| 项目 | 并列最高分概率 | 随机作答下的实际分布（应各 1/N） |
|---|---|---|
| 诸子百家 | 38.30% | 儒家 **16.05%** → 小说家 6.18%（N=10） |
| 红楼梦 | 17.78% | 黛玉 **27.76%** → 宝玉 4.70%（N=8） |
| 辩论位 | 17.63% | 一辩 **32.51%** → 四辩 20.92%（N=4） |

**三个项目的根因各不相同，修复方式也不同：**

1. **诸子百家** —— 分值池本身是公平的（每流派均等），问题 100% 出在结果选取：
   `topSchools.length > 1 ? topSchools[0] : topSchools[0]` 这个三元表达式两个分支完全相同（死代码），
   实际按数组顺序取第一个 → 排列在前的流派永远赢下并列。
   **修复**：并列时把全部并列流派一并展示，不再由数组顺序决定。偏差 5.96pp → **0.08pp**。

2. **红楼梦** —— 除 tie-break 外还有结构性问题：各角色的"分值池"不等
   （黛玉 21 分 vs 熙凤 13 分），有些角色在算术上就不占优。
   **修复**：按 `(得分 − μ) / σ` 比较（μ、σ 由答案键在随机作答下的分布算出），把各角色拉回同一起跑线。
   偏差 15.24pp → **0.48pp**。

3. **辩论位** —— 加权计分设计本身是对的，但 Q1 的四个选项得分向量总和是 `7/5/6/6`
   （其余 15 题都是 `6/6/6/6`），让一辩白得 +1、二辩白亏 −1；再叠加严格大于号的 tie-break。
   **修复**：配平 Q1（`7/5/6/6` → `6/6/6/6`）+ 并列随机。
   偏差 7.60pp → **0.16pp**。

另外还修掉了一个**致命 bug**：红楼梦中 7 行在双引号字符串里嵌套了未转义的 ASCII 双引号，
导致整个 `<script>` 解析失败 —— 页面静态部分能显示，但**所有交互完全无效**。
修复前后的浏览器实测对比：

```
修复前  {"errs":"Uncaught SyntaxError: Unexpected identifier '越了解越让人敬佩'",
        "getResult":"undefined","charStats":"undefined","nQ":"undef"}
修复后  {"errs":"NONE","getResult":"function","charStats":"function","nQ":8}
```

> 公平性自检脚本（`tools/audit.js`）放在本地开发工程里，不随站点部署。
> 它支持 `raw` / `norm` / `zscore` 三种比较口径 × `index` / `random` 两种 tie-break 规则共 6 种组合，
> 可随时重跑以确认改动没有引入新的偏置。

---

## 隐私

- 不收集、不上传任何作答数据，没有账号体系
- 无广告、无第三方统计、无外部请求（已实测：全站零外链）
- 收藏 / 历史 / 偏好仅存在访问者自己的 `localStorage`

---

## 目录结构

```
.
├─ index.html              枢纽页（6 张卡片入口）
├─ zhuzi/                  诸子百家人格测试
├─ honglou/                红楼梦心理测试
├─ bianwei/                辩论位适配测试
├─ tarot/                  星穹秘仪 · 塔罗占卜
│  ├─ index.html
│  ├─ css/style.css
│  └─ js/  (cards / spreads / storage / particles / polish / meditation / app)
├─ talent/                 天赋 · 职业方向测评
├─ love/                   恋爱心意测试
└─ vendor/                 本地化的第三方库
   ├─ chart.umd.min.js     (Chart.js 4.4.7，供 zhuzi 画雷达图)
   └─ tailwind.js          (Tailwind CDN 构建，供 tarot)
```

---

## 声明

个人练习作品，非商业产品，与任何机构无关。
测试结果仅供娱乐与自我参考，**不构成任何心理诊断或专业建议**。

## License

MIT
