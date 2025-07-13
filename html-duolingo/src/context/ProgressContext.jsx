import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [lessonProgress, setLessonProgress] = useState({});
  const [allUsersProgress, setAllUsersProgress] = useState([]);
  const { user } = useAuth();

  // Загрузка прогресса с сервера при инициализации или изменении пользователя
  useEffect(() => {
    if (user && user.userId) {
      loadProgressFromServer();
      loadAllUsersProgress();
    }
  }, [user]);

  // Загрузка прогресса с сервера
  const loadProgressFromServer = async () => {
    try {
      console.log('📥 Загрузка прогресса для пользователя:', user.userId);
      
      const response = await fetch(`http://localhost:5000/api/progress/${user.userId}`);
      if (response.ok) {
        const progressData = await response.json();
        console.log('📊 Получен прогресс с сервера:', progressData);
        
        const completed = progressData
          .filter(item => item.completed)
          .map(item => item.lessonId);
        
        const progress = {};
        progressData.forEach(item => {
          progress[item.lessonId] = item.progress;
        });
        
        console.log('✅ Обработан прогресс:', { completed, progress });
        console.log('📊 Завершенные уроки:', completed);
        console.log('📈 Прогресс по урокам:', progress);
        setCompletedLessons(completed);
        setLessonProgress(progress);
      } else {
        console.error('❌ Ошибка загрузки прогресса:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки прогресса:', error);
    }
  };

  // Загрузка прогресса всех пользователей
  const loadAllUsersProgress = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/all');
      if (response.ok) {
        const data = await response.json();
        setAllUsersProgress(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки прогресса пользователей:', error);
    }
  };

  // Принудительное обновление прогресса пользователя
  const refreshUserProgress = async () => {
    if (user && user.userId) {
      console.log('🔄 Принудительное обновление прогресса пользователя:', user.userId);
      await loadProgressFromServer();
      await loadAllUsersProgress();
      console.log('✅ Прогресс пользователя обновлен');
    }
  };


  // Проверка, завершен ли урок
  const isLessonCompleted = useCallback((lessonId) => {
    return completedLessons.includes(lessonId);
  }, [completedLessons]);

  // Проверка, заблокирован ли урок
  const isLessonLocked = useCallback((lessonId) => {
    // Урок 1 всегда доступен
    if (lessonId <= 1) return false;
    
    // Остальные уроки доступны, если предыдущий завершен
    const previousLessonId = lessonId - 1;
    return !completedLessons.includes(previousLessonId);
  }, [completedLessons]);

  // Получение прогресса урока (0-100)
  const getLessonProgress = useCallback((lessonId) => {
    return lessonProgress[lessonId] || 0;
  }, [lessonProgress]);

  // Обновление прогресса урока
  const updateLessonProgress = async (lessonId, progress) => {
    const newProgress = Math.min(100, Math.max(0, progress));
    setLessonProgress(prev => ({
      ...prev,
      [lessonId]: newProgress
    }));

    // Сохраняем на сервер
    if (user && user.userId) {
      try {
        const requestBody = {
          userId: user.userId,
          lessonId,
          progress: newProgress,
          completed: newProgress >= 100
        };
        
        console.log('📤 Отправка прогресса на сервер:', requestBody);
        
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Прогресс сохранен:', result);
        } else {
          console.error('❌ Ошибка сохранения прогресса:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('❌ Ошибка сохранения прогресса:', error);
      }
    }
  };

  // Завершение урока
  const completeLesson = async (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      updateLessonProgress(lessonId, 100);

      // Сохраняем на сервер
      if (user && user.userId) {
        try {
          await fetch('http://localhost:5000/api/progress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.userId,
              lessonId,
              progress: 100,
              completed: true
            }),
          });
          // Обновляем прогресс всех пользователей
          loadAllUsersProgress();
        } catch (error) {
          console.error('Ошибка сохранения прогресса:', error);
        }
      }
    }
  };

  // Получение общего прогресса по курсу (0-100)
  const getCourseProgress = useCallback((total = 0) => {
    const totalLessons = 15; // Можно вынести в константу
    for (let i = 1; i <= totalLessons; i++) {
      total += lessonProgress[i] || 0;
    }
    return (total / totalLessons).toFixed(2);
  }, [lessonProgress]);

  // Получение количества завершённых уроков
  const getCompletedLessonsCount = useCallback(() => {
    return completedLessons.length;
  }, [completedLessons]);

  // Получение следующего доступного урока
  const getNextAvailableLesson = useCallback(() => {
    for (let i = 1; i <= 15; i++) {
      if (!isLessonLocked(i) && !isLessonCompleted(i)) {
        return i;
      }
    }
    return null; // Все уроки завершены
  }, [isLessonLocked, isLessonCompleted]);

  // Сброс прогресса (для тестирования)
  const resetProgress = () => {
    setCompletedLessons([]);
    setLessonProgress({});
  };

  const value = {
    completedLessons,
    lessonProgress,
    allUsersProgress,
    isLessonCompleted,
    isLessonLocked,
    getLessonProgress,
    updateLessonProgress,
    completeLesson,
    getCourseProgress,
    getCompletedLessonsCount,
    getNextAvailableLesson,
    resetProgress,
    loadAllUsersProgress,
    refreshUserProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}; 