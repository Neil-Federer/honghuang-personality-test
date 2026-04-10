# 🐉 洪荒人格测试

> 汝本洪荒何等异兽？二十道天命之问，揭示你的山海经本命人格。

一个基于 MBTI 四维度框架、以《山海经》异兽为人格载体的趣味 H5 人格测试。文风毒舌自嘲，视觉古典水墨，适配手机端。

## ✨ 特性

- 🎴 **20 道洪荒场景题** — 远古修仙世界观，每题都是一个小故事
- 🦊 **16 种山海经异兽人格** — 九尾狐、玄武、穷奇、帝江……每种都有毒舌解读
- 📊 **四维天命图谱** — 魂魄之辩 / 灵智之分 / 情理之争 / 动静之择
- 🎨 **古典水墨风 UI** — CSS 云雾动画开屏，卡片式答题，朱砂金配色
- 📜 **天命卷轴海报** — 一键生成可分享的高清结果图
- 📱 **纯前端 H5** — 无需后端，GitHub Pages 一键部署

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS v4 |
| 海报 | html2canvas |
| 测试 | Vitest |
| 部署 | GitHub Pages + GitHub Actions |

## 🚀 本地开发

```bash
# 克隆项目
git clone https://github.com/Neil-Federer/honghuang-personality-test.git
cd honghuang-personality-test

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npx vitest run

# 生产构建
npm run build
```

## 📁 项目结构

```
src/
├── App.tsx                    # 全局状态路由 + fade 过渡
├── components/
│   ├── Landing.tsx            # 水墨云雾开屏页
│   ├── QuizFlow.tsx           # 卡片式答题页
│   ├── QuizOption.tsx         # 选项卡片组件
│   ├── ProgressBar.tsx        # 进度条组件
│   ├── Result.tsx             # 结果展示页
│   └── PosterCanvas.tsx       # 海报渲染画布
├── data/
│   ├── dimensions.ts          # 4 维度定义
│   ├── personalities.ts       # 16 人格完整数据
│   └── questions.ts           # 20 道题目
└── utils/
    ├── scoring.ts             # 计分算法
    ├── scoring.test.ts        # 单元测试 (12 cases)
    └── posterGenerator.ts     # 海报生成器
```

## 🌐 部署

项目已配置 GitHub Actions CI/CD，推送到 `main` 分支后自动构建并部署到 GitHub Pages。

访问地址：`https://Neil-Federer.github.io/honghuang-personality-test/`

## 📄 License

MIT
