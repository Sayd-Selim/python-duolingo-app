import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

function CryptoTradingCourse() {
  const { isLessonCompleted, isLessonLocked, getLessonProgress, getCourseProgress, refreshUserProgress } = useProgress();
  
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
    return cryptoUnits.filter(unit => {
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
      for (let i = 1; i <= 10; i++) {
        // В демо режиме открыты только уроки 1-3
        access[i] = i <= 3
      }
      setLessonAccess(access);
      
      // Загружаем пройденные уроки из localStorage
      try {
        const completed = JSON.parse(localStorage.getItem('cryptoCompletedLessons') || '[]');
        setCompletedLessons(completed);
        console.log('Загружены пройденные уроки криптотрейдинга:', completed);
      } catch (error) {
        console.error('Ошибка загрузки пройденных уроков:', error);
        setCompletedLessons([]);
      }
      
      setIsLoading(false);
      console.log('Демо режим: данные не обновляются из БД');
    }
  }, [user]);

  const cryptoUnits = [
    { 
      id: 1, 
      title: 'Основы криптотрейдинга', 
      path: '/crypto-trading-course/unit/1', 
      icon: '💰', 
      description: 'Введение в мир криптовалют и торговли' 
    },
    { 
      id: 2, 
      title: 'Японские свечи', 
      path: '/crypto-trading-course/unit/2', 
      icon: '🕯️', 
      description: 'Чтение и анализ свечных паттернов' 
    },
    { 
      id: 3, 
      title: 'Технические индикаторы', 
      path: '/crypto-trading-course/unit/3', 
      icon: '📊', 
      description: 'RSI, MACD, Moving Averages' 
    },
    { 
      id: 4, 
      title: 'Уровни поддержки и сопротивления', 
      path: '/crypto-trading-course/unit/4', 
      icon: '🎯', 
      description: 'Определение ключевых уровней' 
    },
    { 
      id: 5, 
      title: 'Торговые стратегии', 
      path: '/crypto-trading-course/unit/5', 
      icon: '⚡', 
      description: 'Скальпинг, свинг-трейдинг, долгосрочная торговля' 
    },
    { 
      id: 6, 
      title: 'Управление рисками', 
      path: '/crypto-trading-course/unit/6', 
      icon: '🛡️', 
      description: 'Стоп-лоссы, тейк-профиты, размер позиции' 
    },
    { 
      id: 7, 
      title: 'Психология трейдинга', 
      path: '/crypto-trading-course/unit/7', 
      icon: '🧠', 
      description: 'Эмоции, дисциплина, психология рынка' 
    },
    { 
      id: 8, 
      title: 'Фундаментальный анализ', 
      path: '/crypto-trading-course/unit/8', 
      icon: '📰', 
      description: 'Новости, события, макроэкономика' 
    },
    { 
      id: 9, 
      title: 'Торговая платформа', 
      path: '/crypto-trading-course/unit/9', 
      icon: '💻', 
      description: 'Создание собственной платформы' 
    },
    { 
      id: 10, 
      title: 'Финальный проект', 
      path: '/crypto-trading-course/unit/10', 
      icon: '🚀', 
      description: 'Полноценная торговая система' 
    }
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Загружаем курс криптотрейдинга...</p>
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
          <div className="text-6xl mb-4">📈</div>
          <h1 className="text-5xl font-bold text-green-600 mb-4">
            Курс криптотрейдинга
          </h1>
        </motion.div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Научитесь торговать криптовалютами с помощью японских свечей, технического анализа и создайте собственную торговую платформу
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-green-800 font-semibold">10 уроков</span>
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Интерактивные графики</span>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-purple-800 font-semibold">Торговая платформа</span>
          </div>
        </div>
      </div>

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoUnits.map((unit, index) => {
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
          to="/courses"
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Вернуться к курсам
        </Link>
      </div>
    </motion.div>
  );
}

export default CryptoTradingCourse; 