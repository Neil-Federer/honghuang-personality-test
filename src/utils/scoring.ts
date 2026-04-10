
/**
 * 洪荒人格测试 — 计分算法
 *
 * 流程:
 * 1. 收集用户的 20 道题答案（每题一个 score）
 * 2. 按维度分组累加 score
 * 3. 每个维度: raw ≥ 0 → poleA.code, raw < 0 → poleB.code
 * 4. 拼接 4 个 code 得到人格编码
 * 5. 从 PERSONALITY_MAP 中查找对应人格
 *
 * ⚠️ 数据契约：Sprint 1 冻结后禁止修改
 */

import { DIMENSIONS } from '../data/dimensions';
import { PERSONALITY_MAP, type Personality } from '../data/personalities';
import { QUESTIONS } from '../data/questions';

/** 用户作答记录: questionId → 选中选项的 score */
export type Answers = Record<number, number>;

/** 单个维度的计分结果 */
export interface DimensionScore {
  dimensionId: string;
  dimensionName: string;
  raw: number;
  pole: 'A' | 'B';
  poleCode: string;
  poleName: string;
}

/** 完整计分结果 */
export interface ScoreResult {
  dimensions: DimensionScore[];
  code: string;
  personality: Personality;
}

/**
 * 根据用户答案计算人格结果
 *
 * @param answers - questionId → score 的映射
 * @returns ScoreResult
 * @throws 如果人格编码无法匹配到任何人格类型
 */
export function calculateResult(answers: Answers): ScoreResult {
  // 1. 按维度分组累加
  const rawScores: Record<string, number> = {};
  for (const dim of DIMENSIONS) {
    rawScores[dim.id] = 0;
  }

  for (const question of QUESTIONS) {
    const score = answers[question.id];
    if (score !== undefined) {
      rawScores[question.dimension] += score;
    }
  }

  // 2. 判定每个维度的极性
  const dimensionScores: DimensionScore[] = DIMENSIONS.map((dim) => {
    const raw = rawScores[dim.id];
    const pole: 'A' | 'B' = raw >= 0 ? 'A' : 'B';
    const activePole = pole === 'A' ? dim.poleA : dim.poleB;
    return {
      dimensionId: dim.id,
      dimensionName: dim.name,
      raw,
      pole,
      poleCode: activePole.code,
      poleName: activePole.name,
    };
  });

  // 3. 拼接人格编码
  const code = dimensionScores.map((ds) => ds.poleCode).join('');

  // 4. 查找人格
  const personality = PERSONALITY_MAP[code];
  if (!personality) {
    throw new Error(`未找到人格编码 "${code}" 对应的人格类型`);
  }

  return { dimensions: dimensionScores, code, personality };
}

/**
 * 生成一组模拟答案用于测试
 *
 * @param bias - 每个维度的偏向倾向: 正数偏 poleA, 负数偏 poleB, 0 随机
 */
export function generateMockAnswers(
  bias: Record<string, number> = {}
): Answers {
  const answers: Answers = {};
  const scoreOptions = [-2, -1, 1, 2];

  for (const q of QUESTIONS) {
    const dimBias = bias[q.dimension] || 0;
    if (dimBias > 0) {
      // 偏向正分
      answers[q.id] = Math.random() > 0.3 ? 2 : 1;
    } else if (dimBias < 0) {
      // 偏向负分
      answers[q.id] = Math.random() > 0.3 ? -2 : -1;
    } else {
      // 随机
      answers[q.id] = scoreOptions[Math.floor(Math.random() * 4)];
    }
  }

  return answers;
}

/**
 * 模拟 N 次随机答题，统计各人格出现频率
 */
export function simulateDistribution(
  n: number
): { code: string; beast: string; count: number; percent: string }[] {
  const counts: Record<string, number> = {};

  for (let i = 0; i < n; i++) {
    const answers = generateMockAnswers();
    try {
      const result = calculateResult(answers);
      counts[result.code] = (counts[result.code] || 0) + 1;
    } catch {
      // 忽略无法匹配的情况
    }
  }

  return Object.entries(counts)
    .map(([code, count]) => ({
      code,
      beast: PERSONALITY_MAP[code]?.beast || '未知',
      count,
      percent: ((count / n) * 100).toFixed(1) + '%',
    }))
    .sort((a, b) => b.count - a.count);
}
