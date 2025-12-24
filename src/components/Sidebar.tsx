import { Globe, LayoutDashboard, BookOpen, TrendingUp, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../App';
import { View } from './Dashboard';

interface SidebarProps {
  user: User;
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
}

export function Sidebar({ user, currentView, onViewChange, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'overview' as View, label: 'Обзор', icon: LayoutDashboard },
    { id: 'lessons' as View, label: 'Уроки', icon: BookOpen },
    { id: 'progress' as View, label: 'Прогресс', icon: TrendingUp },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-900">EnglishMaster</span>
        </div>
      </div>

      {/* User info */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-gray-900 truncate">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="px-3 py-2 bg-indigo-50 rounded-lg">
          <div className="text-xs text-indigo-600 mb-1">Ваш уровень</div>
          <div className="text-sm text-indigo-900">{user.level}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
}
