import { useState } from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface LevelTestProps {
  onComplete: (level: string) => void;
  userName: string;
}

const questions = [
  {
    id: 1,
    question: 'Hello! My name ___ John.',
    options: ['am', 'is', 'are', 'be'],
    correct: 1,
    level: 'beginner'
  },
  {
    id: 2,
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    correct: 1,
    level: 'beginner'
  },
  {
    id: 3,
    question: 'I have been ___ English for three years.',
    options: ['learn', 'learned', 'learning', 'learns'],
    correct: 2,
    level: 'intermediate'
  },
  {
    id: 4,
    question: 'If I ___ you, I would accept the offer.',
    options: ['am', 'was', 'were', 'be'],
    correct: 2,
    level: 'intermediate'
  },
  {
    id: 5,
    question: 'By the time you arrive, I ___ the report.',
    options: ['finish', 'will finish', 'will have finished', 'finished'],
    correct: 2,
    level: 'advanced'
  },
  {
    id: 6,
    question: 'The project ___ by next Monday.',
    options: ['completes', 'will complete', 'will be completed', 'is completing'],
    correct: 2,
    level: 'advanced'
  }
];

export function LevelTest({ onComplete, userName }: LevelTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate level based on correct answers
      let correctCount = 0;
      newAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
          correctCount++;
        }
      });

      let level = 'Beginner (A1)';
      if (correctCount >= 5) {
        level = 'Advanced (B2-C1)';
      } else if (correctCount >= 3) {
        level = 'Intermediate (A2-B1)';
      }

      onComplete(level);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">
              Привет, {userName}! 👋
            </h2>
            <p className="text-gray-600">
              Пройдите короткий тест для определения вашего уровня английского языка
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                    selectedAnswer === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {selectedAnswer === index ? (
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <span className={selectedAnswer === index ? 'text-indigo-900' : 'text-gray-700'}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
