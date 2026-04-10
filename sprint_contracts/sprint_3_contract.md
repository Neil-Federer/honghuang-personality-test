
# Sprint 3 Contract: 核心UI开发

## 目标
实现完整的用户答题流程UI，移动端优先。

## 产出文件
- `src/App.tsx`                    — 路由和全局状态管理
- `src/components/Landing.tsx`     — 开屏页
- `src/components/QuizFlow.tsx`    — 答题流程页
- `src/components/QuizOption.tsx`  — 单个选项组件
- `src/components/ProgressBar.tsx` — 进度条
- `src/components/Result.tsx`      — 结果展示页

## 验收标准
1. [必须] 开屏页：标题「洪荒人格测试」+ 副标题 + 「开启天命」按钮 + 水墨背景动效
2. [必须] 答题页：卡片式单题展示，4选项纵向排列，选择后自动进入下一题
3. [必须] 答题页：进度条显示 "第X卦/共XX卦"（用"卦"不用"题"）
4. [必须] 答题页：支持返回上一题修改答案
5. [必须] 结果页：显示异兽emoji+名称+毒舌称号+完整描述+优缺点+CP匹配
6. [必须] 结果页：底部「生成天命卷轴」按钮（触发海报生成，Sprint 4实现）
7. [必须] 结果页：底部「再测一次」按钮，点击回到开屏页
8. [必须] 全局：古典中国风视觉——素纸底色+墨色文字+朱砂强调色+金色点缀
9. [必须] 全局：iPhone SE(375px) 和 iPhone 14 Pro Max(430px) 均正常显示无溢出
10. [必须] 全局：页面切换有过渡动画（fade或slide）

## 状态: ⏳ 待开始
