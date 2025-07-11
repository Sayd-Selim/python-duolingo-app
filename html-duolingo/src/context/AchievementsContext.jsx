import React, { createContext, useContext, useState, useEffect } from 'react';

const AchievementsContext = createContext();

export const achievements = [
  {
    id: 'first_lesson',
    title: 'Первый шаг',
    description: 'Завершите свой первый урок',
    icon: '🎯',
    xp: 50,
    unlocked: false
  },
  {
    id: 'streak_3',
    title: 'Начинающий',
    description: 'Занимайтесь 3 дня подряд',
    icon: '🔥',
    xp: 100,
    unlocked: false
  },
  {
    id: 'streak_7',
    title: 'Неделя успеха',
    description: 'Занимайтесь 7 дней подряд',
    icon: '🌟',
    xp: 200,
    unlocked: false
  },
  {
    id: 'xp_100',
    title: 'Первые 100',
    description: 'Заработайте 100 XP',
    icon: '💎',
    xp: 150,
    unlocked: false
  },
  {
    id: 'perfect_lesson',
    title: 'Идеальный урок',
    description: 'Завершите урок без ошибок',
    icon: '✨',
    xp: 100,
    unlocked: false
  }
];

export const AchievementsProvider = ({ children }) => {
  const [userAchievements, setUserAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : achievements;
  });

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(userAchievements));
  }, [userAchievements]);

  const unlockAchievement = (id) => {
    setUserAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { ...achievement, unlocked: true }
          : achievement
      )
    );
  };

  const checkAchievements = (stats) => {
    // Проверка достижений на основе статистики
    if (stats.lessonsCompleted === 1) {
      unlockAchievement('first_lesson');
    }
    if (stats.currentStreak >= 3) {
      unlockAchievement('streak_3');
    }
    if (stats.currentStreak >= 7) {
      unlockAchievement('streak_7');
    }
    if (stats.totalXp >= 100) {
      unlockAchievement('xp_100');
    }
  };

  return (
    <AchievementsContext.Provider value={{ 
      achievements: userAchievements, 
      unlockAchievement,
      checkAchievements
    }}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
}; 