
import { type FC } from 'react';

interface QuizOptionProps {
  text: string;
  index: number;
  selected: boolean;
  onClick: () => void;
}

const LABELS = ['甲', '乙', '丙', '丁'];

const QuizOption: FC<QuizOptionProps> = ({ text, index, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-md border transition-all duration-200 ease-out
        ${selected
          ? 'border-cinnabar bg-cinnabar/10 text-ink shadow-sm'
          : 'border-paper-dark bg-paper-light/50 text-ink-light hover:border-gold/50 hover:bg-paper-light active:scale-[0.98]'
        }`}
    >
      <span className={`inline-block w-6 h-6 text-center text-xs leading-6 rounded-full mr-3
        ${selected ? 'bg-cinnabar text-paper-light' : 'bg-paper-dark text-text-muted'}`}>
        {LABELS[index]}
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  );
};

export default QuizOption;
