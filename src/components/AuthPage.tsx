import { useState } from 'react';
import { BookOpen, Globe, Award, TrendingUp } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
}

export function AuthPage({ onLogin, onRegister }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      if (!name.trim()) {
        alert('Пожалуйста, введите ваше имя');
        return;
      }
      onRegister(email, password, name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <span className="text-indigo-900">EnglishMaster</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-indigo-900 mb-4">
                Изучайте английский язык эффективно
              </h1>
              <p className="text-gray-600">
                Интерактивные уроки, адаптивные упражнения и персональный трекер прогресса помогут вам достичь желаемого уровня владения языком.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Структурированные уроки</h3>
                  <p className="text-gray-600 text-sm">
                    Более 30 уроков от начального до продвинутого уровня
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Автоматический подбор уровня</h3>
                  <p className="text-gray-600 text-sm">
                    Пройдите тест и получите персонализированную программу обучения
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Отслеживание прогресса</h3>
                  <p className="text-gray-600 text-sm">
                    Следите за своими достижениями и поддерживайте мотивацию
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">
                {isLogin ? 'Вход в систему' : 'Регистрация'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin 
                  ? 'Введите свои данные для входа' 
                  : 'Создайте аккаунт и начните обучение'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-700 text-sm"
              >
                {isLogin 
                  ? 'Нет аккаунта? Зарегистрируйтесь' 
                  : 'Уже есть аккаунт? Войдите'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
