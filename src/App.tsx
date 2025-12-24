import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { LevelTest } from './components/LevelTest';

export interface User {
  id: string;
  email: string;
  name: string;
  level: string | null;
  progress: {
    lessonsCompleted: number;
    totalLessons: number;
    currentStreak: number;
    totalPoints: number;
  };
  completedLessons: string[];
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLevelTest, setShowLevelTest] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      if (!user.level) {
        setShowLevelTest(true);
      }
    } else {
      alert('Неверный email или пароль');
    }
  };

  const handleRegister = (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      alert('Пользователь с таким email уже существует');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      level: null,
      progress: {
        lessonsCompleted: 0,
        totalLessons: 30,
        currentStreak: 0,
        totalPoints: 0
      },
      completedLessons: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    setShowLevelTest(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleLevelTestComplete = (level: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, level };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], level };
        localStorage.setItem('users', JSON.stringify(users));
      }
      
      setShowLevelTest(false);
    }
  };

  const updateUserProgress = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;
  }

  if (showLevelTest || !currentUser.level) {
    return <LevelTest onComplete={handleLevelTestComplete} userName={currentUser.name} />;
  }

  return (
    <Dashboard 
      user={currentUser} 
      onLogout={handleLogout}
      onUpdateUser={updateUserProgress}
    />
  );
}
