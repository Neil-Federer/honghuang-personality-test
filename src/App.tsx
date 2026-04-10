import { useState, useCallback } from 'react';
import './App.css';
import { QUESTIONS } from './data/questions';
import { PERSONALITY_MAP } from './data/personalities';
import { calculateResult, type Answers, type ScoreResult } from './utils/scoring';
import Landing from './components/Landing';
import QuizFlow from './components/QuizFlow';
import Result from './components/Result';

type Page = 'landing' | 'quiz' | 'result';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const navigateTo = useCallback((target: Page) => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setPage(target);
      setFadeClass('fade-in');
    }, 300);
  }, []);

  const handleStart = useCallback(() => {
    setAnswers({});
    setResult(null);
    navigateTo('quiz');
  }, [navigateTo]);

  const handleQuizComplete = useCallback((finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    try {
      const res = calculateResult(finalAnswers);
      setResult(res);
      navigateTo('result');
    } catch (e) {
      console.error('计分错误:', e);
    }
  }, [navigateTo]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setResult(null);
    navigateTo('landing');
  }, [navigateTo]);

  return (
    <div className={`min-h-dvh flex flex-col ${fadeClass}`}>
      {page === 'landing' && (
        <Landing onStart={handleStart} />
      )}
      {page === 'quiz' && (
        <QuizFlow
          questions={QUESTIONS}
          onComplete={handleQuizComplete}
        />
      )}
      {page === 'result' && result && (
        <Result
          result={result}
          personalityMap={PERSONALITY_MAP}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
