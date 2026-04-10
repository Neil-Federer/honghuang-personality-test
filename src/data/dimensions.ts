
/**
 * 洪荒人格测试 — 四维度定义
 * 
 * 四个自创维度，命名取自上古洪荒体系。
 * 每个维度有两个极性（poleA / poleB），答题分数 ≥0 归 poleA，<0 归 poleB。
 * 
 * ⚠️ 数据契约：Sprint 1 冻结后禁止修改
 */

export interface DimensionPole {
  code: string;   // 单字母编码
  name: string;   // 中文名称
  desc: string;   // 一句话描述
}

export interface Dimension {
  id: string;           // 维度标识
  name: string;         // 维度名称
  poleA: DimensionPole; // 极性A（正分方向）
  poleB: DimensionPole; // 极性B（负分方向）
}

export const DIMENSIONS: Dimension[] = [
  {
    id: 'hun_po',
    name: '魂魄之辩',
    poleA: { code: 'H', name: '游魂', desc: '灵魂出窍型，社交时散发能量' },
    poleB: { code: 'P', name: '定魄', desc: '魂归故里型，独处时回收能量' },
  },
  {
    id: 'ling_zhi',
    name: '灵智之分',
    poleA: { code: 'L', name: '通灵', desc: '第六感强烈，看山不是山' },
    poleB: { code: 'Z', name: '执智', desc: '脚踏实地，看山就是山' },
  },
  {
    id: 'qing_li',
    name: '情理之争',
    poleA: { code: 'Q', name: '殉情', desc: '感情用事，共情力爆表' },
    poleB: { code: 'I', name: '循理', desc: '理性至上，冷酷但高效' },
  },
  {
    id: 'dong_jing',
    name: '动静之择',
    poleA: { code: 'D', name: '躁动', desc: '说干就干，计划是什么？' },
    poleB: { code: 'J', name: '守静', desc: '谋定后动，运筹帷幄' },
  },
];

/**
 * 维度 id → 维度对象 的快速查找表
 */
export const DIMENSION_MAP: Record<string, Dimension> = Object.fromEntries(
  DIMENSIONS.map((d) => [d.id, d])
);
