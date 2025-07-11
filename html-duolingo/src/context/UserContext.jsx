import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Гость',
    avatar: '👤',
    level: 1,
    experience: 0,
    streak: 0,
    gems: 0
  });

  // Убираем автоматическое сохранение в localStorage
  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const updatePreferences = (newPreferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPreferences
      }
    }));
  };

  const addAchievement = (achievement) => {
    setUser(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievement]
    }));
  };

  const addBadge = (badge) => {
    setUser(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  const updateStudyGoals = (goals) => {
    setUser(prev => ({
      ...prev,
      studyGoals: {
        ...prev.studyGoals,
        ...goals
      }
    }));
  };

  const addStudySession = (session) => {
    setUser(prev => ({
      ...prev,
      studyHistory: [...prev.studyHistory, session]
    }));
  };

  const toggleFavoriteTopic = (topic) => {
    setUser(prev => ({
      ...prev,
      favoriteTopics: prev.favoriteTopics.includes(topic)
        ? prev.favoriteTopics.filter(t => t !== topic)
        : [...prev.favoriteTopics, topic]
    }));
  };

  const calculateLevel = (xp) => {
    // Формула для расчета уровня: каждый уровень требует на 100 XP больше
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  const addXP = (amount) => {
    setUser(prev => {
      const newXP = prev.experience + amount;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        experience: newXP,
        level: newLevel
      };
    });
  };

  const value = {
    user,
    updateUser,
    updatePreferences,
    addAchievement,
    addBadge,
    updateStudyGoals,
    addStudySession,
    toggleFavoriteTopic,
    addXP
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 