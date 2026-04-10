
/**
 * 洪荒人格测试 — 计分算法单元测试
 *
 * 验证:
 * 1. 全正分路径 → 全 poleA 编码 (HLQD)
 * 2. 全负分路径 → 全 poleB 编码 (PZIJ)
 * 3. 8种预设路径 → 至少8种不同结果
 * 4. 1000次随机模拟 → 16种结果分布偏差≤15%
 * 5. 16种人格编码无重复，覆盖全部2^4=16种组合
 */

import { describe, it, expect } from 'vitest';
import {
  calculateResult,
  simulateDistribution,
  type Answers,
} from './scoring';
import { QUESTIONS } from '../data/questions';
import { PERSONALITIES, PERSONALITY_MAP } from '../data/personalities';
import { DIMENSIONS } from '../data/dimensions';

// 辅助: 全部选某个分数
function allSameScore(score: number): Answers {
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    answers[q.id] = score;
  }
  return answers;
}

// 辅助: 按维度偏向生成答案
function biasedAnswers(dimBias: Record<string, 'A' | 'B'>): Answers {
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    const bias = dimBias[q.dimension];
    answers[q.id] = bias === 'A' ? 2 : -2;
  }
  return answers;
}

describe('数据完整性', () => {
  it('应有16种人格，覆盖全部2^4组合', () => {
    expect(PERSONALITIES.length).toBe(16);

    // 生成所有可能的4字母编码
    const allCodes = new Set<string>();
    const poles = DIMENSIONS.map((d) => [d.poleA.code, d.poleB.code]);
    for (const a of poles[0]) {
      for (const b of poles[1]) {
        for (const c of poles[2]) {
          for (const d of poles[3]) {
            allCodes.add(a + b + c + d);
          }
        }
      }
    }
    expect(allCodes.size).toBe(16);

    // 每种编码都有对应人格
    for (const code of allCodes) {
      expect(PERSONALITY_MAP[code]).toBeDefined();
      expect(PERSONALITY_MAP[code].beast).toBeTruthy();
    }
  });

  it('16种人格编码无重复', () => {
    const codes = PERSONALITIES.map((p) => p.code);
    expect(new Set(codes).size).toBe(16);
  });

  it('16种异兽名称无重复', () => {
    const beasts = PERSONALITIES.map((p) => p.beast);
    expect(new Set(beasts).size).toBe(16);
  });

  it('应有20道题目，每维度5题', () => {
    expect(QUESTIONS.length).toBe(20);
    const dimCounts: Record<string, number> = {};
    for (const q of QUESTIONS) {
      dimCounts[q.dimension] = (dimCounts[q.dimension] || 0) + 1;
    }
    for (const dim of DIMENSIONS) {
      expect(dimCounts[dim.id]).toBe(5);
    }
  });

  it('每道题有4个选项', () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBe(4);
    }
  });

  it('标杆文案 HLQD 和 PZIJ 的 fullDesc 非空', () => {
    expect(PERSONALITY_MAP['HLQD'].fullDesc.length).toBeGreaterThan(100);
    expect(PERSONALITY_MAP['PZIJ'].fullDesc.length).toBeGreaterThan(100);
  });
});

describe('计分算法', () => {
  it('全选最高正分 → 应得到 HLQD (九尾狐)', () => {
    const result = calculateResult(allSameScore(2));
    expect(result.code).toBe('HLQD');
    expect(result.personality.beast).toBe('九尾狐');
  });

  it('全选最高负分 → 应得到 PZIJ (玄武)', () => {
    const result = calculateResult(allSameScore(-2));
    expect(result.code).toBe('PZIJ');
    expect(result.personality.beast).toBe('玄武');
  });

  it('8种预设偏向路径应产出≥8种不同结果', () => {
    const testCases: Record<string, 'A' | 'B'>[] = [
      { hun_po: 'A', ling_zhi: 'A', qing_li: 'A', dong_jing: 'A' }, // HLQD
      { hun_po: 'B', ling_zhi: 'B', qing_li: 'B', dong_jing: 'B' }, // PZIJ
      { hun_po: 'A', ling_zhi: 'A', qing_li: 'B', dong_jing: 'B' }, // HLIJ
      { hun_po: 'B', ling_zhi: 'A', qing_li: 'A', dong_jing: 'B' }, // PLQJ
      { hun_po: 'A', ling_zhi: 'B', qing_li: 'A', dong_jing: 'A' }, // HZQD
      { hun_po: 'B', ling_zhi: 'B', qing_li: 'A', dong_jing: 'A' }, // PZQD
      { hun_po: 'A', ling_zhi: 'B', qing_li: 'B', dong_jing: 'A' }, // HZID
      { hun_po: 'B', ling_zhi: 'A', qing_li: 'B', dong_jing: 'A' }, // PLID
    ];

    const results = new Set<string>();
    for (const tc of testCases) {
      const answers = biasedAnswers(tc);
      const result = calculateResult(answers);
      results.add(result.code);
    }
    expect(results.size).toBeGreaterThanOrEqual(8);
  });

  it('维度原始分应为各题分数之和', () => {
    // 魂魄维度: 题1-5, 全选 score=1 → raw=5
    const answers: Answers = {};
    for (const q of QUESTIONS) {
      answers[q.id] = q.dimension === 'hun_po' ? 1 : 0;
    }
    const result = calculateResult(answers);
    const hunPo = result.dimensions.find((d) => d.dimensionId === 'hun_po')!;
    expect(hunPo.raw).toBe(5);
    expect(hunPo.pole).toBe('A');
    expect(hunPo.poleCode).toBe('H');
  });
});

describe('分布均匀性', () => {
  it('1000次随机模拟应覆盖≥12种人格', () => {
    const dist = simulateDistribution(1000);
    expect(dist.length).toBeGreaterThanOrEqual(12);
  });

  it('1000次随机模拟最高频率不超过15%', () => {
    const dist = simulateDistribution(1000);
    const maxPercent = Math.max(...dist.map((d) => d.count / 1000));
    // 理论均匀分布为 6.25%，允许偏差到 15%
    expect(maxPercent).toBeLessThanOrEqual(0.15);
  });
});
