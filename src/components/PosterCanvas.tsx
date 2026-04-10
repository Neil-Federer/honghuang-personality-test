
import { forwardRef } from 'react';
import { type ScoreResult } from '../utils/scoring';
import { type Personality } from '../data/personalities';

interface PosterCanvasProps {
  result: ScoreResult;
  personalityMap: Record<string, Personality>;
}

/**
 * 海报画布组件 — 隐藏在 DOM 中，供 html2canvas 截取
 * 尺寸：375 x 667 (CSS) → 750 x 1334 (@2x 渲染)
 */
const PosterCanvas = forwardRef<HTMLDivElement, PosterCanvasProps>(
  ({ result, personalityMap }, ref) => {
    const p = result.personality;
    const bestMatchP = personalityMap[p.bestMatch];

    return (
      <div
        ref={ref}
        style={{
          width: 375,
          height: 667,
          padding: '32px 24px',
          fontFamily: "'Noto Serif SC', 'STSong', 'SimSun', serif",
          background: `linear-gradient(180deg, #F5F0E8 0%, #E8DFD0 50%, #F5F0E8 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          overflow: 'hidden',
        }}
      >
        {/* 顶部装饰线 */}
        <div style={{ width: 40, height: 1, background: '#C9A96E', marginBottom: 16, opacity: 0.6 }} />

        {/* 稀有度 */}
        <div
          style={{
            padding: '3px 12px',
            borderRadius: 20,
            fontSize: 10,
            letterSpacing: 2,
            border: `1px solid ${p.color}`,
            color: p.color,
            marginBottom: 16,
          }}
        >
          {p.rarity}
        </div>

        {/* emoji */}
        <div style={{ fontSize: 64, lineHeight: 1.2, marginBottom: 8 }}>{p.emoji}</div>

        {/* 名称 */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#2C2C2C',
            letterSpacing: 6,
            marginBottom: 4,
          }}
        >
          {p.beast}
        </div>

        {/* 称号 */}
        <div
          style={{
            fontSize: 12,
            color: p.color,
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          「{p.title}」
        </div>

        {/* 编码 */}
        <div
          style={{
            fontSize: 10,
            color: '#7A7067',
            fontFamily: 'monospace',
            marginBottom: 16,
          }}
        >
          {p.code} · {result.dimensions.map((d) => d.poleName).join(' · ')}
        </div>

        {/* shortDesc */}
        <div
          style={{
            fontSize: 13,
            color: '#4A4A4A',
            textAlign: 'center',
            lineHeight: 1.8,
            maxWidth: 300,
            marginBottom: 20,
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: 8,
            border: '1px solid #E8DFD0',
          }}
        >
          {p.shortDesc}
        </div>

        {/* 四维度条形图 */}
        <div style={{ width: '100%', maxWidth: 300, marginBottom: 20 }}>
          {result.dimensions.map((dim) => {
            const maxRaw = 10;
            const pct = Math.max(Math.min(Math.abs(dim.raw) / maxRaw, 1) * 100, 15);
            return (
              <div key={dim.dimensionId} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
                  <span style={{ color: '#7A7067' }}>{dim.dimensionName}</span>
                  <span style={{ color: p.color, fontWeight: 700 }}>{dim.poleName}</span>
                </div>
                <div style={{ width: '100%', height: 6, background: '#E8DFD0', borderRadius: 3 }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: 6,
                      background: p.color,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 优缺点简版 */}
        <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 300, marginBottom: 20 }}>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 8,
              padding: '8px 10px',
              border: '1px solid #E8DFD0',
            }}
          >
            <div style={{ fontSize: 10, color: '#3D6B69', fontWeight: 700, marginBottom: 4 }}>✅ 天赋</div>
            {p.strengths.slice(0, 2).map((s, i) => (
              <div key={i} style={{ fontSize: 9, color: '#4A4A4A', lineHeight: 1.6 }}>· {s}</div>
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 8,
              padding: '8px 10px',
              border: '1px solid #E8DFD0',
            }}
          >
            <div style={{ fontSize: 10, color: '#C73B3B', fontWeight: 700, marginBottom: 4 }}>❌ 劫数</div>
            {p.weaknesses.slice(0, 2).map((w, i) => (
              <div key={i} style={{ fontSize: 9, color: '#4A4A4A', lineHeight: 1.6 }}>· {w}</div>
            ))}
          </div>
        </div>

        {/* 最佳CP */}
        {bestMatchP && (
          <div style={{ fontSize: 10, color: '#7A7067', marginBottom: 16 }}>
            💕 天定良缘: {bestMatchP.emoji} {bestMatchP.beast}
          </div>
        )}

        {/* 底部分割线 */}
        <div style={{ width: 40, height: 1, background: '#C9A96E', opacity: 0.4, marginBottom: 8 }} />

        {/* 品牌水印 */}
        <div style={{ fontSize: 9, color: '#7A7067', opacity: 0.6, letterSpacing: 2 }}>
          洪荒人格测试 · 基于山海经
        </div>
      </div>
    );
  }
);

PosterCanvas.displayName = 'PosterCanvas';
export default PosterCanvas;
