import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function PythonCourse() {
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
    return pythonUnits.filter(unit => {
      const progress = userProgress[unit.id];
      return progress?._doc?.completed || false;
    }).length;
  }, [userProgress]);
  
  // Загружаем доступы к урокам при загрузке страницы
  useEffect(() => {
    if (user && user.userId) {
      // ДЕМО РЕЖИМ: Настраиваем доступы к урокам
      // Пока доступны только первые 3 урока, остальные заблокированы
      const access = {};
      for (let i = 1; i <= 15; i++) {
        // В демо режиме открыты только уроки 1-3
        access[i] = i <= 1;
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
      
      // ЗАКОММЕНТИРОВАНО: Обновление данных из БД в фоне (требует авторизации)
      /*
      const loadFreshData = async () => {
        try {
          const success = await refreshUserData();
          
          if (success) {
            // Получаем обновленные данные пользователя
            const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
            
            // Обновляем доступы к урокам
            const updatedAccess = {};
            for (let i = 1; i <= 15; i++) {
              const lessonKey = `lesson${i}`;
              updatedAccess[i] = updatedUser[lessonKey] === true;
            }
            setLessonAccess(updatedAccess);
          }
          
          // Обновляем прогресс из базы данных
          await refreshUserProgress();
        } catch (error) {
          console.error('PythonCourse: Ошибка обновления данных при загрузке:', error);
        }
      };
      
      // Запускаем обновление данных в фоне
      loadFreshData();
      */
      console.log('Демо режим: данные не обновляются из БД');
      
      // ЗАКОММЕНТИРОВАНО: Загрузка прогресса (требует авторизации)
      /*
      const loadProgress = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/progress/${user.userId}`);
          const data = response.data;
          console.log('data',data);
          
          const progressMap = {};
          data.forEach(progress => {
            progressMap[progress.lessonId] = progress;
          });
          setUserProgress(progressMap);
        } catch (error) {
          console.error('Ошибка загрузки прогресса:', error);
        }
      };
      loadProgress();
      */
      console.log('Демо режим: прогресс не загружается с сервера');
    }
  }, [user]);

  const pythonUnits = [
    { id: 1, title: 'Введение в Python', path: '/level/1/unit/1', icon: '🐍', description: 'Основы языка Python, первая программа, комментарии' },
    { id: 2, title: 'Переменные. Вывод и ввод данных', path: '/level/1/unit/2', icon: '📊', description: 'Создание переменных, функции print() и input()' },
    { id: 3, title: 'Типы данных', path: '/level/1/unit/3', icon: '🔢', description: 'Числа, строки, логические значения' },
    { id: 4, title: 'Операторы и выражения', path: '/level/1/unit/4', icon: '🔀', description: 'Математические и логические операторы' },
    { id: 5, title: 'Условные операторы', path: '/level/1/unit/5', icon: '🔄', description: 'if, elif, else - принятие решений в программе' },
    { id: 6, title: 'Циклы for и while', path: '/level/1/unit/6', icon: '📋', description: 'Повторение действий в программе' },
    { id: 7, title: 'Списки и кортежи', path: '/level/1/unit/7', icon: '📚', description: 'Работа с коллекциями данных' },
    { id: 8, title: 'Словари и множества', path: '/level/1/unit/8', icon: '⚙️', description: 'Структуры данных для хранения информации' },
    { id: 9, title: 'Функции', path: '/level/1/unit/9', icon: '📁', description: 'Создание и использование функций' },
    { id: 10, title: 'Работа с файлами', path: '/level/1/unit/10', icon: '📄', description: 'Чтение и запись файлов' },
    { id: 11, title: 'Обработка исключений', path: '/level/1/unit/11', icon: '⚠️', description: 'try, except - обработка ошибок' },
    { id: 12, title: 'Модули и пакеты', path: '/level/1/unit/12', icon: '📦', description: 'Использование готовых библиотек' },
    { id: 13, title: 'Объектно-ориентированное программирование', path: '/level/1/unit/13', icon: '🏗️', description: 'Классы и объекты' },
    { id: 14, title: 'Работа с библиотеками', path: '/level/1/unit/14', icon: '📚', description: 'Популярные библиотеки Python' },
    { id: 15, title: 'Практический проект', path: '/level/1/unit/15', icon: '🚀', description: 'Создание собственного проекта' },
  ];
  
  // ЗАКОММЕНТИРОВАНО: Функция для обновления данных (требует авторизации)
  /*
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const success = await refreshUserData();
      if (success) {
        // Получаем обновленные данные пользователя из AuthContext
        const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Обновляем доступы к урокам
        const access = {};
        for (let i = 1; i <= 15; i++) {
          const lessonKey = `lesson${i}`;
          access[i] = updatedUser[lessonKey] === true;
          console.log(`PythonCourse (обновление): ${lessonKey} = ${updatedUser[lessonKey]}, доступ для урока ${i}: ${access[i]}`);
        }
        setLessonAccess(access);
        console.log('PythonCourse: Данные успешно обновлены');
      } else {
        alert('Ошибка обновления данных');
      }
    } catch (error) {
      console.error('Ошибка обновления:', error);
      alert('Ошибка обновления данных');
    } finally {
      setIsRefreshing(false);
    }
  };
  */
  
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
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
          <div className="text-6xl mb-4">🐍</div>
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            Курс Python для начинающих
          </h1>
        </motion.div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Изучите основы программирования на Python - одном из самых популярных языков программирования. 
          От простых переменных до создания собственных проектов.
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-green-800 font-semibold">15 уроков</span>
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Интерактивные задания</span>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-purple-800 font-semibold">Практические проекты</span>
          </div>
        </div>
        
        
        {/* Кнопка обновления данных */}
        {/* <div className="mt-4 flex justify-center">
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              isRefreshing 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isRefreshing ? '🔄 Обновление...' : '🔄 Обновить данные из БД'}
          </button>
          <div className="mt-2 text-xs text-gray-500">
            Данные автоматически обновляются при загрузке страницы
          </div>
        </div> */}
      </div>

      {/* Прогресс курса */}
      {/* <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Ваш прогресс
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Общий прогресс курса</span>
              <span className="text-green-600 font-semibold">
                {getCourseProgress(getCompletedLessonsCount() * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getCourseProgress(getCompletedLessonsCount() * 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Завершено уроков: {getCompletedLessonsCount()} из {pythonUnits.length}
            </div>
          </div>
        </div>
      </div> */}

      {/* Кнопка практики */}
      {/* <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-blue-800">
              💻 Практика
            </h2>
            <p className="text-blue-700">
              Закрепите знания, решая дополнительные задачи по пройденным урокам
            </p>
          </div>
          <Link
            to="/practice"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <span>🚀</span>
            <span>Начать практику</span>
          </Link>
        </div>
      </div> */}

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonUnits.map((unit, index) => {
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
                  ? 'border-green-500' 
                  : isLocked 
                    ? 'border-gray-300 opacity-60' 
                    : 'border-green-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{unit.icon}</span>
                    <span className={`text-sm font-semibold ${
                      isCompleted ? 'text-green-600' : isLocked ? 'text-gray-400' : 'text-green-600'
                    }`}>
                      Урок {unit.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <span className="text-green-500 text-lg">✅</span>
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
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
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
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
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

export default PythonCourse; 