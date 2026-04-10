
import { type FC } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const pct = ((current) / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-text-muted">第 {current + 1} 卦</span>
        <span className="text-xs text-text-muted">共 {total} 卦</span>
      </div>
      <div className="w-full h-1.5 bg-paper-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cinnabar to-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
