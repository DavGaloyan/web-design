import { useState } from 'react';
import { User } from '../App';
import { Sidebar } from './Sidebar';
import { Overview } from './Overview';
import { Lessons } from './Lessons';
import { Progress } from './Progress';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

export type View = 'overview' | 'lessons' | 'progress';

export function Dashboard({ user, onLogout, onUpdateUser }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-auto">
        {currentView === 'overview' && <Overview user={user} onViewChange={setCurrentView} />}
        {currentView === 'lessons' && <Lessons user={user} onUpdateUser={onUpdateUser} />}
        {currentView === 'progress' && <Progress user={user} />}
      </main>
    </div>
  );
}
