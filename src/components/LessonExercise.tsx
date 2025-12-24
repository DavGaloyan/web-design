import { useState } from 'react';
import { Lesson } from './Lessons';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

interface LessonExerciseProps {
  lesson: Lesson;
  onComplete: (points: number) => void;
  onBack: () => void;
}

interface Exercise {
  id: number;
  type: 'multiple-choice' | 'fill-blank' | 'translate';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}

const exercisesByLesson: Record<string, Exercise[]> = {
  '1': [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'I ___ a student.',
      options: ['am', 'is', 'are'],
      correctAnswer: 0,
      explanation: 'Используем "am" с местоимением "I"'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'She ___ happy.',
      options: ['am', 'is', 'are'],
      correctAnswer: 1,
      explanation: 'Используем "is" с местоимениями he/she/it'
    },
    {
      id: 3,
      type: 'fill-blank',
      question: 'They ___ at home.',
      correctAnswer: 'are',
      explanation: 'Используем "are" с местоимениями we/you/they'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'We ___ ready.',
      options: ['am', 'is', 'are'],
      correctAnswer: 2,
      explanation: 'Используем "are" с местоимением "we"'
    },
    {
      id: 5,
      type: 'translate',
      question: 'Переведите: Он врач.',
      correctAnswer: 'he is a doctor',
      explanation: 'He is a doctor - правильный перевод'
    }
  ],
  '2': [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'How do you say "Привет" in English?',
      options: ['Hello', 'Goodbye', 'Thank you'],
      correctAnswer: 0,
      explanation: '"Hello" - приветствие на английском'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'What is the correct response to "How are you?"',
      options: ['I am fine, thank you', 'My name is John', 'Goodbye'],
      correctAnswer: 0,
      explanation: '"I am fine, thank you" - стандартный ответ на "How are you?"'
    },
    {
      id: 3,
      type: 'fill-blank',
      question: 'Nice to ___ you!',
      correctAnswer: 'meet',
      explanation: '"Nice to meet you" - приятно познакомиться'
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: 'What does "Good morning" mean?',
      options: ['Доброе утро', 'Добрый вечер', 'Спокойной ночи'],
      correctAnswer: 0,
      explanation: '"Good morning" означает "Доброе утро"'
    }
  ],
  '3': [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'She ___ to school every day.',
      options: ['go', 'goes', 'going'],
      correctAnswer: 1,
      explanation: 'В Present Simple с he/she/it добавляем -s/-es к глаголу'
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: 'They ___ football on weekends.',
      options: ['play', 'plays', 'playing'],
      correctAnswer: 0,
      explanation: 'С they используем базовую форму глагола'
    },
    {
      id: 3,
      type: 'fill-blank',
      question: 'I ___ coffee every morning.',
      correctAnswer: 'drink',
      explanation: 'С I используем базовую форму глагола'
    }
  ]
};

export function LessonExercise({ lesson, onComplete, onBack }: LessonExerciseProps) {
  const exercises = exercisesByLesson[lesson.id] || exercisesByLesson['1'];
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const exercise = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const handleCheck = () => {
    let correct = false;

    if (exercise.type === 'multiple-choice' && selectedOption !== null) {
      correct = selectedOption === exercise.correctAnswer;
    } else if (exercise.type === 'fill-blank' || exercise.type === 'translate') {
      correct = userAnswer.toLowerCase().trim() === String(exercise.correctAnswer).toLowerCase();
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    const earnedPoints = Math.round((correctAnswers / exercises.length) * lesson.points);
    onComplete(earnedPoints);
  };

  if (showResults) {
    const percentage = Math.round((correctAnswers / exercises.length) * 100);
    const earnedPoints = Math.round((correctAnswers / exercises.length) * lesson.points);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-gray-900 mb-2">Урок завершен!</h2>
          <p className="text-gray-600 mb-6">
            Отличная работа! Вы ответили правильно на {correctAnswers} из {exercises.length} вопросов
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-gray-500 text-sm mb-1">Результат</div>
                <div className="text-gray-900">{percentage}%</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Очки</div>
                <div className="text-indigo-600">+{earnedPoints}</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Продолжить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <div className="text-sm text-gray-600">
            {currentExercise + 1} / {exercises.length}
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-2 text-sm text-indigo-600">{lesson.category}</div>
          <h2 className="text-gray-900 mb-8">{exercise.question}</h2>

          {exercise.type === 'multiple-choice' && exercise.options && (
            <div className="space-y-3 mb-6">
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && setSelectedOption(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showFeedback
                      ? index === exercise.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : selectedOption === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : selectedOption === index
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {(exercise.type === 'fill-blank' || exercise.type === 'translate') && (
            <div className="mb-6">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                placeholder="Введите ответ..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600"
              />
            </div>
          )}

          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-900">Правильно!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-900">Неправильно</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700">{exercise.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!showFeedback ? (
              <button
                onClick={handleCheck}
                disabled={
                  (exercise.type === 'multiple-choice' && selectedOption === null) ||
                  ((exercise.type === 'fill-blank' || exercise.type === 'translate') && !userAnswer.trim())
                }
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Проверить
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {currentExercise < exercises.length - 1 ? 'Следующий вопрос' : 'Завершить урок'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
