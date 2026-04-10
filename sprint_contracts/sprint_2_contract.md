
# Sprint 2 Contract: 补齐16种人格完整文案

## 目标
补齐剩余14种人格的完整描述，确保风格一致性。

## 产出文件
- `src/data/personalities.ts` — 更新：全部16种的fullDesc+strengths+weaknesses+bestMatch+worstMatch+rarity+color

## 验收标准
1. [必须] 16种人格全部具备完整字段（无空值）
2. [必须] 每个fullDesc长度在150-250字之间
3. [必须] 随机抽查5个fullDesc，与标杆文案的毒舌程度评分差异≤1分（5分制）
4. [必须] 每个fullDesc至少包含2个山海经/洪荒元素引用
5. [必须] 16种人格的bestMatch/worstMatch映射无自引用、无孤岛
6. [必须] 4种rarity（上古凶兽/远古灵兽/洪荒瑞兽/太古妖兽）各分配4种人格
7. [必须] 16种主题色(color)无重复，且符合古典中国风调性

## 状态: ⏳ 待开始
