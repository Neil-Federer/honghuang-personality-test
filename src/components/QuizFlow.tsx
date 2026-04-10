
import { useState, useCallback, type FC } from 'react';
import { type Question } from '../data/questions';
import { type Answers } from '../utils/scoring';
import ProgressBar from './ProgressBar';
import QuizOption from './QuizOption';

interface QuizFlowProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
}

const QuizFlow: FC<QuizFlowProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [animClass, setAnimClass] = useState('quiz-slide-in');

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const canGoBack = currentIndex > 0;

  const animateTo = useCallback((direction: 'next' | 'prev', cb: () => void) => {
    setAnimClass(direction === 'next' ? 'quiz-slide-out-left' : 'quiz-slide-out-right');
    setTimeout(() => {
      cb();
      setAnimClass(direction === 'next' ? 'quiz-slide-in-right' : 'quiz-slide-in');
    }, 250);
  }, []);

  const handleSelect = useCallback((score: number) => {
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    // 选择后延迟 400ms 自动进入下一题
    setTimeout(() => {
      if (isLast) {
        onComplete(newAnswers);
      } else {
        animateTo('next', () => setCurrentIndex((i) => i + 1));
      }
    }, 400);
  }, [answers, question.id, isLast, onComplete, animateTo]);

  const handleBack = useCallback(() => {
    if (!canGoBack) return;
    animateTo('prev', () => setCurrentIndex((i) => i - 1));
  }, [canGoBack, animateTo]);

  return (
    <div className="flex flex-col min-h-dvh px-5 py-6">
      {/* 返回按钮 */}
      <div className="h-8 mb-2">
        {canGoBack && (
          <button
            onClick={handleBack}
            className="text-sm text-text-muted hover:text-ink transition-colors"
          >
            ◀ 上一卦
          </button>
        )}
      </div>

      {/* 进度条 */}
      <ProgressBar current={currentIndex} total={questions.length} />

      {/* 题目卡片 */}
      <div className={`flex-1 flex flex-col ${animClass}`}>
        {/* 题干 */}
        <div className="bg-paper-light border border-paper-dark rounded-lg p-5 mb-6 shadow-sm">
          <p className="text-base leading-relaxed text-ink">
            {question.stem}
          </p>
        </div>

        {/* 选项 */}
        <div className="flex flex-col gap-3">
          {question.options.map((opt, idx) => (
            <QuizOption
              key={`${question.id}-${idx}`}
              text={opt.text}
              index={idx}
              selected={answers[question.id] === opt.score}
              onClick={() => handleSelect(opt.score)}
            />
          ))}
        </div>
      </div>

      {/* 底部留白 */}
      <div className="h-6" />

      {/* 动画样式 */}
      <style>{`
        .quiz-slide-in {
          animation: slideIn .25s ease-out forwards;
        }
        .quiz-slide-in-right {
          animation: slideInRight .25s ease-out forwards;
        }
        .quiz-slide-out-left {
          animation: slideOutLeft .25s ease-in forwards;
        }
        .quiz-slide-out-right {
          animation: slideOutRight .25s ease-in forwards;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-20px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default QuizFlow;
