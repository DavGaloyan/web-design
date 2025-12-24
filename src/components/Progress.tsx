import { User } from '../App';
import { TrendingUp, Award, Flame, Target, Calendar, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ProgressProps {
  user: User;
}

export function Progress({ user }: ProgressProps) {
  const completionPercentage = Math.round((user.progress.lessonsCompleted / user.progress.totalLessons) * 100);

  // Mock data for charts
  const weeklyProgress = [
    { day: 'Пн', lessons: 2, points: 100 },
    { day: 'Вт', lessons: 1, points: 50 },
    { day: 'Ср', lessons: 3, points: 150 },
    { day: 'Чт', lessons: 2, points: 100 },
    { day: 'Пт', lessons: 1, points: 75 },
    { day: 'Сб', lessons: 0, points: 0 },
    { day: 'Вс', lessons: 2, points: 125 }
  ];

  const monthlyPoints = [
    { week: 'Нед 1', points: 300 },
    { week: 'Нед 2', points: 450 },
    { week: 'Нед 3', points: 520 },
    { week: 'Нед 4', points: user.progress.totalPoints }
  ];

  const stats = [
    {
      icon: BookOpen,
      label: 'Уроков завершено',
      value: user.progress.lessonsCompleted,
      total: user.progress.totalLessons,
      color: 'bg-blue-100 text-blue-600',
      change: '+3 на этой неделе'
    },
    {
      icon: Award,
      label: 'Всего очков',
      value: user.progress.totalPoints,
      color: 'bg-purple-100 text-purple-600',
      change: '+125 за последний урок'
    },
    {
      icon: Flame,
      label: 'Текущая серия',
      value: `${user.progress.currentStreak} дней`,
      color: 'bg-orange-100 text-orange-600',
      change: 'Продолжайте в том же духе!'
    },
    {
      icon: Target,
      label: 'Прогресс курса',
      value: `${completionPercentage}%`,
      color: 'bg-green-100 text-green-600',
      change: `${user.progress.totalLessons - user.progress.lessonsCompleted} уроков осталось`
    }
  ];

  const achievements = [
    { title: 'Первые шаги', description: 'Завершите первый урок', earned: true, icon: '🎯' },
    { title: 'Неделя учебы', description: '7 дней подряд', earned: true, icon: '🔥' },
    { title: 'Отличник', description: 'Получите 100% в уроке', earned: true, icon: '⭐' },
    { title: 'Марафонец', description: '30 дней подряд', earned: false, icon: '🏃' },
    { title: 'Мастер грамматики', description: 'Завершите все уроки грамматики', earned: false, icon: '📚' },
    { title: 'Полиглот', description: 'Наберите 1000 очков', earned: false, icon: '🏆' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Ваш прогресс</h1>
        <p className="text-gray-600">
          Отслеживайте свои успехи и достижения в изучении английского языка
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
              <div className="text-gray-900 mb-2">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-gray-900">Активность за неделю</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="lessons" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Points Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="text-gray-900">Динамика очков</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyPoints}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 mb-8 text-white">
        <h3 className="mb-4">Общий прогресс обучения</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span>Уроков завершено</span>
              <span>{user.progress.lessonsCompleted} / {user.progress.totalLessons}</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">Прогресс</div>
            <div className="">{completionPercentage}%</div>
          </div>
        </div>
        <p className="text-indigo-100 text-sm">
          {completionPercentage < 30 
            ? 'Отличное начало! Продолжайте обучение.'
            : completionPercentage < 70
            ? 'Вы на полпути к цели! Так держать!'
            : 'Почти у финиша! Осталось совсем немного.'}
        </p>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-gray-900 mb-6">Достижения</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              {achievement.earned && (
                <div className="mt-3 text-xs text-indigo-600 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Получено</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
