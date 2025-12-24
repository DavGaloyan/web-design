import { useState } from 'react';
import { User } from '../App';
import { BookOpen, Clock, Award, Lock, CheckCircle, Play } from 'lucide-react';
import { LessonExercise } from './LessonExercise';

interface LessonsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Начальный' | 'Средний' | 'Сложный';
  category: 'Грамматика' | 'Лексика';
  level: string;
  locked: boolean;
  points: number;
}

const allLessons: Lesson[] = [
  {
    id: '1',
    title: 'Глагол to be (Present Simple)',
    description: 'Изучите основы английского языка: формы глагола to be в настоящем времени',
    duration: '20 мин',
    difficulty: 'Начальный',
    category: 'Грамматика',
    level: 'Beginner (A1)',
    locked: false,
    points: 50
  },
  {
    id: '2',
    title: 'Базовая лексика: Приветствия',
    description: 'Научитесь приветствовать людей и представляться на английском',
    duration: '15 мин',
    difficulty: 'Начальный',
    category: 'Лексика',
    level: 'Beginner (A1)',
    locked: false,
    points: 50
  },
  {
    id: '3',
    title: 'Present Simple: утверждения',
    description: 'Простое настоящее время для описания регулярных действий',
    duration: '25 мин',
    difficulty: 'Начальный',
    category: 'Грамматика',
    level: 'Beginner (A1)',
    locked: false,
    points: 50
  },
  {
    id: '4',
    title: 'Past Simple: правильные глаголы',
    description: 'Научитесь говорить о прошлом с правильными глаголами',
    duration: '30 мин',
    difficulty: 'Средний',
    category: 'Грамматика',
    level: 'Intermediate (A2-B1)',
    locked: false,
    points: 75
  },
  {
    id: '5',
    title: 'Present Perfect: основы',
    description: 'Понимание разницы между Past Simple и Present Perfect',
    duration: '35 мин',
    difficulty: 'Средний',
    category: 'Грамматика',
    level: 'Intermediate (A2-B1)',
    locked: false,
    points: 75
  },
  {
    id: '6',
    title: 'Future Tenses: will vs going to',
    description: 'Изучите различные способы выражения будущего времени',
    duration: '25 мин',
    difficulty: 'Средний',
    category: 'Грамматика',
    level: 'Intermediate (A2-B1)',
    locked: false,
    points: 75
  },
  {
    id: '7',
    title: 'Modal Verbs: can, could, may',
    description: 'Модальные глаголы для выражения возможности и разрешения',
    duration: '30 мин',
    difficulty: 'Средний',
    category: 'Грамматика',
    level: 'Intermediate (A2-B1)',
    locked: false,
    points: 75
  },
  {
    id: '8',
    title: 'Conditional Sentences: Type 1 & 2',
    description: 'Условные предложения первого и второго типа',
    duration: '35 мин',
    difficulty: 'Сложный',
    category: 'Грамматика',
    level: 'Advanced (B2-C1)',
    locked: false,
    points: 100
  },
  {
    id: '9',
    title: 'Business English: Meetings',
    description: 'Деловая лексика для проведения встреч и презентаций',
    duration: '40 мин',
    difficulty: 'Сложный',
    category: 'Лексика',
    level: 'Advanced (B2-C1)',
    locked: false,
    points: 100
  }
];

export function Lessons({ user, onUpdateUser }: LessonsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const categories = ['Все', 'Грамматика', 'Лексика', 'Аудирование'];

  const filteredLessons = selectedCategory === 'Все' 
    ? allLessons 
    : allLessons.filter(lesson => lesson.category === selectedCategory);

  const handleStartLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCompleteLesson = (points: number) => {
    if (!selectedLesson) return;

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        lessonsCompleted: user.completedLessons.includes(selectedLesson.id) 
          ? user.progress.lessonsCompleted 
          : user.progress.lessonsCompleted + 1,
        totalPoints: user.progress.totalPoints + points,
        currentStreak: user.progress.currentStreak + 1
      },
      completedLessons: user.completedLessons.includes(selectedLesson.id)
        ? user.completedLessons
        : [...user.completedLessons, selectedLesson.id]
    };

    onUpdateUser(updatedUser);
    setSelectedLesson(null);
  };

  if (selectedLesson) {
    return (
      <LessonExercise 
        lesson={selectedLesson}
        onComplete={handleCompleteLesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Уроки</h1>
        <p className="text-gray-600">
          Выберите урок и начните обучение
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const isCompleted = user.completedLessons.includes(lesson.id);
          const isLocked = lesson.locked;

          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-xl p-6 border-2 transition-all ${
                isLocked
                  ? 'border-gray-200 opacity-60'
                  : 'border-gray-200 hover:border-indigo-300 cursor-pointer'
              }`}
              onClick={() => !isLocked && handleStartLesson(lesson)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                }`}>
                  {isLocked ? (
                    <Lock className="w-6 h-6 text-gray-400" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${
                  lesson.difficulty === 'Начальный' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty}
                </div>
              </div>

              <h3 className="text-gray-900 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{lesson.points}</span>
                  </div>
                </div>
                {!isLocked && !isCompleted && (
                  <Play className="w-5 h-5 text-indigo-600" />
                )}
              </div>

              {isCompleted && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Завершено</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
