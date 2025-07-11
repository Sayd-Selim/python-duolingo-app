import React, { createContext, useContext, useState, useEffect } from 'react';

const StudyTimeContext = createContext({
  totalStudyTime: 0,
  currentSessionTime: 0,
  dailyGoal: 30,
  streak: 0,
  formatTime: () => '',
  startSession: () => {},
  stopSession: () => {},
  setDailyGoal: () => {},
  getDailyProgress: () => 0,
  isSessionActive: false
});

export const useStudyTime = () => {
  const context = useContext(StudyTimeContext);
  if (!context) {
    throw new Error('useStudyTime must be used within a StudyTimeProvider');
  }
  return context;
};

export const StudyTimeProvider = ({ children }) => {
  const [totalStudyTime, setTotalStudyTime] = useState(() => {
    try {
      const saved = localStorage.getItem('totalStudyTime');
      return saved ? parseInt(saved) : 0;
    } catch (error) {
      console.error('Error reading totalStudyTime from localStorage:', error);
      return 0;
    }
  });
  
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [currentSessionTime, setCurrentSessionTime] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(() => {
    try {
      const saved = localStorage.getItem('dailyGoal');
      return saved ? parseInt(saved) : 30;
    } catch (error) {
      console.error('Error reading dailyGoal from localStorage:', error);
      return 30;
    }
  });
  
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem('streak');
      return saved ? parseInt(saved) : 0;
    } catch (error) {
      console.error('Error reading streak from localStorage:', error);
      return 0;
    }
  });
  
  const [lastStudyDate, setLastStudyDate] = useState(() => {
    try {
      const saved = localStorage.getItem('lastStudyDate');
      return saved ? new Date(saved) : null;
    } catch (error) {
      console.error('Error reading lastStudyDate from localStorage:', error);
      return null;
    }
  });

  // Запуск сессии
  const startSession = () => {
    if (!sessionStartTime) {
      setSessionStartTime(Date.now());
    }
  };

  // Остановка сессии
  const stopSession = () => {
    if (sessionStartTime) {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
      setTotalStudyTime(prev => prev + sessionDuration);
      setSessionStartTime(null);
      setCurrentSessionTime(0);
      
      // Обновление streak
      const today = new Date().toDateString();
      if (lastStudyDate) {
        const lastDate = new Date(lastStudyDate).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastDate === yesterday) {
          setStreak(prev => prev + 1);
        } else if (lastDate !== today) {
          setStreak(0);
        }
      } else {
        setStreak(1);
      }
      
      setLastStudyDate(new Date());
    }
  };

  // Обновление текущего времени сессии
  useEffect(() => {
    let interval;
    if (sessionStartTime) {
      interval = setInterval(() => {
        setCurrentSessionTime(Math.floor((Date.now() - sessionStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Сохранение данных в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('totalStudyTime', totalStudyTime.toString());
      localStorage.setItem('dailyGoal', dailyGoal.toString());
      localStorage.setItem('streak', streak.toString());
      if (lastStudyDate) {
        localStorage.setItem('lastStudyDate', lastStudyDate.toISOString());
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [totalStudyTime, dailyGoal, streak, lastStudyDate]);

  // Форматирование времени
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Получение прогресса к дневной цели
  const getDailyProgress = () => {
    const today = new Date().toDateString();
    const lastDate = lastStudyDate ? new Date(lastStudyDate).toDateString() : null;
    
    if (lastDate === today) {
      return Math.min(100, (totalStudyTime / (dailyGoal * 60)) * 100);
    }
    return 0;
  };

  const value = {
    totalStudyTime,
    currentSessionTime,
    dailyGoal,
    streak,
    formatTime,
    startSession,
    stopSession,
    setDailyGoal,
    getDailyProgress,
    isSessionActive: !!sessionStartTime
  };

  return (
    <StudyTimeContext.Provider value={value}>
      {children}
    </StudyTimeContext.Provider>
  );
};

export default StudyTimeContext; 