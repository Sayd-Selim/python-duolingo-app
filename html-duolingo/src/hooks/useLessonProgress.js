import { useState, useEffect, useCallback, useMemo } from 'react';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

export const useLessonProgress = (lessonId) => {
  // Мемоизируем ключ для localStorage
  const storageKey = useMemo(() => `lesson_${lessonId}_progress`, [lessonId]);
  const answersKey = useMemo(() => `lesson_${lessonId}_answers`, [lessonId]);

  // Состояния с мемоизацией
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonProgress, setLessonProgress] = useState({
    progress: 0,
    completed: false,
    lastUpdated: null
  });
  const [stepAnswers, setStepAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { refreshUserProgress } = useProgress();

  // Загрузка прогресса из базы данных
  const loadProgressFromServer = useCallback(async () => {
    if (!user?.userId) {
      setIsLoading(false);
      return;
    }

    try {
      console.log(`📥 Загрузка прогресса урока ${lessonId} для пользователя ${user.userId}`);
      
      const response = await fetch(API_ENDPOINTS.USER_PROGRESS(user.userId));
      if (response.ok) {
        const allProgress = await response.json();
        const lessonProgressData = allProgress.find(p => p.lessonId === lessonId);
        
        if (lessonProgressData) {
          console.log(`📊 Найден прогресс для урока ${lessonId}:`, lessonProgressData);
          
          // Обновляем состояние прогресса
          const serverProgress = {
            progress: lessonProgressData.progress || 0,
            completed: lessonProgressData.completed || false,
            lastUpdated: lessonProgressData.lastUpdated,
            currentStep: Math.floor((lessonProgressData.progress || 0) / 100 * 11) // Примерно 11 шагов
          };
          
          setLessonProgress(serverProgress);
          setCurrentStep(serverProgress.currentStep || 0);
          
          // Если урок завершен, загружаем сохраненные ответы
          if (lessonProgressData.completed) {
            const savedAnswers = localStorage.getItem(answersKey);
            if (savedAnswers) {
              setStepAnswers(JSON.parse(savedAnswers));
            }
          }
        } else {
          console.log(`📊 Прогресс для урока ${lessonId} не найден, начинаем с начала`);
        }
      } else {
        console.error('❌ Ошибка загрузки прогресса с сервера:', response.status);
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки прогресса с сервера:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.userId, lessonId, answersKey]);

  // Сохранение прогресса на сервер
  const saveProgressToServer = useCallback(async (progressData) => {
    if (!user?.userId) return;

    try {
      console.log(`📤 Сохранение прогресса урока ${lessonId} на сервер:`, progressData);
      
      const response = await fetch(API_ENDPOINTS.PROGRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          lessonId: lessonId,
          progress: progressData.progress,
          completed: progressData.completed,
          score: progressData.completed ? 100 : Math.floor(progressData.progress),
          timeSpent: 0 // Можно добавить подсчет времени
        }),
      });

      if (response.ok) {
        console.log('✅ Прогресс успешно сохранен на сервере');
      } else {
        console.error('❌ Ошибка сохранения прогресса на сервере:', response.status);
      }
    } catch (error) {
      console.error('❌ Ошибка сохранения прогресса на сервере:', error);
    }
  }, [user?.userId, lessonId]);

  // Загрузка данных при инициализации
  useEffect(() => {
    loadProgressFromServer();
  }, [loadProgressFromServer]);

  // Мемоизированная функция сохранения прогресса
  const saveProgress = useCallback((progress) => {
    try {
      const progressData = {
        ...progress,
        lastUpdated: new Date().toISOString()
      };
      
      // Сохраняем в localStorage
      localStorage.setItem(storageKey, JSON.stringify(progressData));
      setLessonProgress(progressData);
      
      // Сохраняем на сервер
      saveProgressToServer(progressData);
      
      // Обновляем прогресс в контексте
      refreshUserProgress();
    } catch (error) {
      console.error('Ошибка сохранения прогресса:', error);
    }
  }, [storageKey, saveProgressToServer, refreshUserProgress]);

  // Мемоизированная функция сохранения ответов
  const saveAnswers = useCallback((answers) => {
    try {
      localStorage.setItem(answersKey, JSON.stringify(answers));
      setStepAnswers(answers);
    } catch (error) {
      console.error('Ошибка сохранения ответов:', error);
    }
  }, [answersKey]);

  // Обновление текущего шага
  const updateCurrentStep = useCallback((step, totalSteps = 11) => {
    setCurrentStep(step);
    const progressPercent = ((step + 1) / totalSteps) * 100;
    const newProgress = {
      ...lessonProgress,
      currentStep: step,
      progress: progressPercent
    };
    saveProgress(newProgress);
   
   // Обновляем прогресс в контексте при изменении шага
   refreshUserProgress();
  }, [lessonProgress, saveProgress, refreshUserProgress]);

  // Сохранение ответа на шаг
  const saveStepAnswer = useCallback((stepIndex, answer, isCorrect) => {
    const newAnswers = {
      ...stepAnswers,
      [stepIndex]: {
        answer,
        isCorrect,
        timestamp: new Date().toISOString()
      }
    };
    saveAnswers(newAnswers);
  }, [stepAnswers, saveAnswers]);

  // Получение ответа на шаг
  const getStepAnswer = useCallback((stepIndex) => {
    return stepAnswers[stepIndex] || null;
  }, [stepAnswers]);

  // Проверка завершения урока
  const isLessonCompleted = useMemo(() => {
    return lessonProgress.completed;
  }, [lessonProgress.completed]);

  // Завершение урока
  const completeLesson = useCallback(async () => {
    try {
      const completedProgress = {
        ...lessonProgress,
        completed: true,
        completedAt: new Date().toISOString(),
        progress: 100
      };
      saveProgress(completedProgress);
     
      // Принудительно обновляем прогресс в контексте при завершении
      await refreshUserProgress();
      return true;
    } catch (error) {
      console.error('Ошибка завершения урока:', error);
      return false;
    }
  }, [lessonProgress, saveProgress, refreshUserProgress]);

  // Очистка прогресса урока
  const clearLessonProgress = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(answersKey);
      setLessonProgress({
        progress: 0,
        completed: false,
        lastUpdated: null
      });
      setStepAnswers({});
      setCurrentStep(0);
    } catch (error) {
      console.error('Ошибка очистки прогресса:', error);
    }
  }, [storageKey, answersKey]);

  // Мемоизированный объект возвращаемых значений
  const returnValue = useMemo(() => ({
    currentStep,
    lessonProgress,
    stepAnswers,
    isLoading,
    updateCurrentStep,
    saveStepAnswer,
    getStepAnswer,
    isLessonCompleted,
    completeLesson,
    clearLessonProgress,
    loadProgressFromServer
  }), [
    currentStep,
    lessonProgress,
    stepAnswers,
    isLoading,
    updateCurrentStep,
    saveStepAnswer,
    getStepAnswer,
    isLessonCompleted,
    completeLesson,
    clearLessonProgress,
    loadProgressFromServer
  ]);

  return returnValue;
}; 