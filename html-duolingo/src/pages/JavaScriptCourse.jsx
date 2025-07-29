import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function JavaScriptCourse() {
  const { isLessonCompleted, isLessonLocked, getLessonProgress, getCourseProgress, refreshUserProgress } = useProgress();
  // ЗАКОММЕНТИРОВАНО: Проверка авторизации
  // const { user, refreshUserData } = useAuth();
  
  // Создаем фиктивного пользователя для работы без авторизации
  const user = useMemo(() => ({ userId: 'demo_user_123' }), []);
  const refreshUserData = useCallback(async () => true, []); // Фиктивная функция
  const [lessonAccess, setLessonAccess] = useState({});
  const [userProgress, setUserProgress] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  
  // Функция для подсчета завершенных уроков
  const getCompletedLessonsCount = useCallback(() => {
    return jsUnits.filter(unit => {
      const progress = userProgress[unit.id];
      return progress?._doc?.completed || false;
    }).length;
  }, [userProgress]);
  
  // Загружаем доступы к урокам при загрузке страницы
  useEffect(() => {
    if (user && user.userId) {
      // ДЕМО РЕЖИМ: Настраиваем доступы к урокам
      // Пока доступны только первые 5 уроков, остальные заблокированы
      const access = {};
      for (let i = 1; i <= 15; i++) {
        // В демо режиме открыты только уроки 1-5
        access[i] = i <= 5
      }
      setLessonAccess(access);
      
      // Загружаем пройденные уроки из localStorage
      try {
        const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        setCompletedLessons(completed);
        console.log('Загружены пройденные уроки:', completed);
      } catch (error) {
        console.error('Ошибка загрузки пройденных уроков:', error);
        setCompletedLessons([]);
      }
      
      setIsLoading(false); // Убираем загрузку сразу
      
      console.log('Демо режим: данные не обновляются из БД');
      console.log('Демо режим: прогресс не загружается с сервера');
    }
  }, [user]);

  const jsUnits = [
    { id: 1, title: 'Введение в JavaScript', path: '/javascript-course/lesson/1', icon: '⚡', description: 'Основы JavaScript, переменные, типы данных' },
    { id: 2, title: 'Операторы и выражения', path: '/javascript-course/lesson/2', icon: '🔢', description: 'Математические и логические операторы' },
    { id: 3, title: 'Условные операторы', path: '/javascript-course/lesson/3', icon: '🔄', description: 'if, else, switch - принятие решений' },
    { id: 4, title: 'Циклы', path: '/javascript-course/lesson/4', icon: '🔄', description: 'for, while, do-while - повторение действий' },
    { id: 5, title: 'Функции', path: '/javascript-course/lesson/5', icon: '📦', description: 'Создание и использование функций' },
    { id: 6, title: 'Массивы', path: '/javascript-course/lesson/6', icon: '📋', description: 'Работа с массивами и их методы' },
    { id: 7, title: 'Объекты', path: '/javascript-course/lesson/7', icon: '🏗️', description: 'Создание и работа с объектами' },
    { id: 8, title: 'DOM-манипуляции', path: '/javascript-course/lesson/8', icon: '🌳', description: 'Работа с элементами страницы' },
    { id: 9, title: 'События', path: '/javascript-course/lesson/9', icon: '🎯', description: 'Обработка событий пользователя' },
    { id: 10, title: 'Асинхронность', path: '/javascript-course/lesson/10', icon: '⏱️', description: 'Promise, async/await' },
    { id: 11, title: 'Fetch API', path: '/javascript-course/lesson/11', icon: '🌐', description: 'Работа с серверными запросами' },
    { id: 12, title: 'ES6+ возможности', path: '/javascript-course/lesson/12', icon: '🚀', description: 'Современный JavaScript' },
    { id: 13, title: 'Модули', path: '/javascript-course/lesson/13', icon: '📦', description: 'Импорт и экспорт модулей' },
    { id: 14, title: 'Обработка ошибок', path: '/javascript-course/lesson/14', icon: '⚠️', description: 'Try-catch и обработка исключений' },
    { id: 15, title: 'Практический проект', path: '/javascript-course/lesson/15', icon: '🎉', description: 'Создание интерактивного приложения' },
  ];
  
  // ДЕМО РЕЖИМ: Простая функция обновления
  const handleRefreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // В демо режиме просто показываем сообщение
      alert('Демо режим: данные обновляются автоматически');
      console.log('Демо режим: данные обновлены');
    } catch (error) {
      console.error('Ошибка обновления:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);
  
  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем данные из базы данных...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      {/* Заголовок курса */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="text-6xl mb-4">⚡</div>
          <h1 className="text-5xl font-bold text-yellow-600 mb-4">
            Курс JavaScript для начинающих
          </h1>
        </motion.div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Изучите JavaScript - язык программирования, который делает веб-страницы интерактивными и динамичными. 
          От основ синтаксиса до создания современных веб-приложений.
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="bg-yellow-100 px-4 py-2 rounded-lg">
            <span className="text-yellow-800 font-semibold">15 уроков</span>
          </div>
          <div className="bg-orange-100 px-4 py-2 rounded-lg">
            <span className="text-orange-800 font-semibold">Интерактивные задания</span>
          </div>
          <div className="bg-red-100 px-4 py-2 rounded-lg">
            <span className="text-red-800 font-semibold">Практические проекты</span>
          </div>
        </div>
      </div>

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jsUnits.map((unit, index) => {
          const hasAccess = lessonAccess[unit.id] || false;
          const progress = userProgress[unit.id];
          // Проверяем, пройден ли урок в localStorage
          const isCompleted = completedLessons.includes(unit.id);
          // Если урок завершен, показываем 100% прогресса, иначе реальный прогресс
          const progressPercent = isCompleted ? 100 : (progress?._doc?.progress || 0);
          const isLocked = !hasAccess;
          
          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 border-l-4 hover:shadow-lg ${
                isCompleted 
                  ? 'border-yellow-500' 
                  : isLocked 
                    ? 'border-gray-300 opacity-60' 
                    : 'border-yellow-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{unit.icon}</span>
                    <span className={`text-sm font-semibold ${
                      isCompleted ? 'text-yellow-600' : isLocked ? 'text-gray-400' : 'text-yellow-600'
                    }`}>
                      Урок {unit.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <span className="text-yellow-500 text-lg">✅</span>
                    )}
                    {isLocked && (
                      <span className="text-gray-400 text-lg">🔒</span>
                    )}
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  isCompleted ? 'text-gray-800' : isLocked ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {unit.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  isCompleted ? 'text-gray-600' : isLocked ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {unit.description}
                </p>
                
                {/* Прогресс бар */}
                {!isLocked && progress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Прогресс</span>
                      <span>{progressPercent.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent.toFixed(2)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
                
                {isLocked ? (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 text-center">
                      🔒 Урок пока недоступен
                    </p>
                  </div>
                ) : (
                  <Link
                    to={unit.path}
                    className={`mt-4 w-full px-4 py-3 rounded-lg transition-colors text-center block font-medium ${
                      isCompleted
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600'
                    }`}
                  >
                    {isCompleted ? 'Повторить урок' : 'Начать урок'}
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Кнопка возврата */}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Вернуться на главную
        </Link>
      </div>
    </motion.div>
  );
}

export default JavaScriptCourse; 