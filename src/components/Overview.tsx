import { User } from '../App';
import { View } from './Dashboard';
import { BookOpen, Award, Flame, Target, ArrowRight, Clock } from 'lucide-react';

interface OverviewProps {
  user: User;
  onViewChange: (view: View) => void;
}

export function Overview({ user, onViewChange }: OverviewProps) {
  const completionPercentage = Math.round((user.progress.lessonsCompleted / user.progress.totalLessons) * 100);

  const stats = [
    {
      icon: BookOpen,
      label: 'Уроков завершено',
      value: `${user.progress.lessonsCompleted}/${user.progress.totalLessons}`,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Flame,
      label: 'Текущая серия',
      value: `${user.progress.currentStreak} дней`,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: Award,
      label: 'Набрано очков',
      value: user.progress.totalPoints,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Target,
      label: 'Прогресс курса',
      value: `${completionPercentage}%`,
      color: 'bg-green-100 text-green-600'
    }
  ];

  const recentActivities = [
    { title: 'Урок 5: Present Perfect', time: '2 часа назад', type: 'completed' },
    { title: 'Тест: Irregular Verbs', time: '1 день назад', type: 'completed' },
    { title: 'Урок 4: Past Simple', time: '2 дня назад', type: 'completed' }
  ];

  const upcomingLessons = [
    { title: 'Урок 6: Future Tenses', duration: '25 мин', difficulty: 'Средний' },
    { title: 'Урок 7: Modal Verbs', duration: '30 мин', difficulty: 'Средний' },
    { title: 'Урок 8: Conditional Sentences', duration: '35 мин', difficulty: 'Сложный' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">
          Добро пожаловать, {user.name}! 👋
        </h1>
        <p className="text-gray-600">
          Продолжайте обучение и отслеживайте свой прогресс
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-gray-900">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
          <h2 className="mb-4">Продолжить обучение</h2>
          <p className="text-indigo-100 mb-6">
            Вы на полпути к завершению уровня {user.level}. Продолжайте в том же духе!
          </p>
          <div className="bg-white/20 rounded-lg h-2 mb-6">
            <div 
              className="bg-white h-full rounded-lg transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <button
            onClick={() => onViewChange('lessons')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2"
          >
            Перейти к урокам
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-4">Недавняя активность</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 text-sm mb-1">{activity.title}</div>
                  <div className="text-gray-500 text-xs">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-gray-900 mb-4">Рекомендуемые уроки</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingLessons.map((lesson, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer">
                <h4 className="text-gray-900 mb-3">{lesson.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="inline-block px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs">
                    {lesson.difficulty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
