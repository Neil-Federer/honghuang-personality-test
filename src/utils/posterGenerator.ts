
import html2canvas from 'html2canvas';

/**
 * 将海报 DOM 节点渲染为 PNG 图片
 * 使用 @2x 缩放以确保文字清晰
 *
 * @param element - PosterCanvas 的 DOM ref
 * @returns Data URL (image/png)
 */
export async function generatePoster(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2, // @2x 渲染，保证清晰度
    useCORS: true,
    backgroundColor: '#F5F0E8',
    width: 375,
    height: 667,
    logging: false,
  });

  return canvas.toDataURL('image/png');
}

/**
 * 展示生成的海报图片（移动端弹窗，提示长按保存）
 */
export function showPosterModal(dataUrl: string): void {
  // 创建遮罩
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.75);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 20px;
    animation: fadeIn .3s ease-out;
  `;

  // 提示文字
  const tip = document.createElement('p');
  tip.textContent = '长按图片保存到相册';
  tip.style.cssText = `
    color: rgba(255,255,255,0.8); font-size: 13px;
    margin-bottom: 12px; letter-spacing: 2px;
  `;

  // 图片
  const img = document.createElement('img');
  img.src = dataUrl;
  img.style.cssText = `
    max-width: 85vw; max-height: 75vh;
    border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  `;

  // 关闭按钮
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ 关闭';
  closeBtn.style.cssText = `
    margin-top: 16px; padding: 8px 24px;
    background: transparent; border: 1px solid rgba(255,255,255,0.3);
    color: rgba(255,255,255,0.7); font-size: 13px;
    border-radius: 20px; cursor: pointer; letter-spacing: 2px;
  `;
  closeBtn.onclick = () => overlay.remove();

  // 点击遮罩也可关闭
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };

  overlay.appendChild(tip);
  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
}
