import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function HTMLCourse() {
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
    return htmlUnits.filter(unit => {
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

  const htmlUnits = [
    { id: 1, title: 'Введение в HTML', path: '/html-course/lesson/1', icon: '🌐', description: 'Основы HTML, структура документа, теги' },
    { id: 2, title: 'Заголовки и параграфы', path: '/html-course/lesson/2', icon: '📝', description: 'Теги заголовков h1-h6 и параграфов p' },
    { id: 3, title: 'Списки', path: '/html-course/lesson/3', icon: '📋', description: 'Маркированные и нумерованные списки' },
    { id: 4, title: 'Ссылки', path: '/html-course/lesson/4', icon: '🔗', description: 'Создание гиперссылок и навигация' },
    { id: 5, title: 'Изображения', path: '/html-course/lesson/5', icon: '🖼️', description: 'Добавление изображений на страницу' },
    { id: 6, title: 'Таблицы', path: '/html-course/lesson/6', icon: '📊', description: 'Создание таблиц для данных' },
    { id: 7, title: 'Формы', path: '/html-course/lesson/7', icon: '📋', description: 'Создание форм для ввода данных' },
    { id: 8, title: 'Семантические теги', path: '/html-course/lesson/8', icon: '🏗️', description: 'header, nav, main, section, article, footer' },
    { id: 9, title: 'Мультимедиа', path: '/html-course/lesson/9', icon: '🎵', description: 'Видео и аудио контент' },
    { id: 10, title: 'Мета-теги', path: '/html-course/lesson/10', icon: '🏷️', description: 'SEO и метаданные страницы' },
    { id: 11, title: 'Специальные символы', path: '/html-course/lesson/11', icon: '✨', description: 'HTML-сущности и символы' },
    { id: 12, title: 'Валидация HTML', path: '/html-course/lesson/12', icon: '✅', description: 'Проверка корректности кода' },
    { id: 13, title: 'Доступность', path: '/html-course/lesson/13', icon: '♿', description: 'Создание доступного контента' },
    { id: 14, title: 'Адаптивный дизайн', path: '/html-course/lesson/14', icon: '📱', description: 'HTML для мобильных устройств' },
    { id: 15, title: 'Практический проект', path: '/html-course/lesson/15', icon: '🚀', description: 'Создание полноценного сайта' },
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
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
          <div className="text-6xl mb-4">🌐</div>
          <h1 className="text-5xl font-bold text-orange-600 mb-4">
            Курс HTML для начинающих
          </h1>
        </motion.div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Изучите основы HTML - языка разметки, который является фундаментом веб-разработки. 
          От простых тегов до создания полноценных веб-страниц.
        </p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="bg-orange-100 px-4 py-2 rounded-lg">
            <span className="text-orange-800 font-semibold">15 уроков</span>
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-blue-800 font-semibold">Интерактивные задания</span>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-purple-800 font-semibold">Практические проекты</span>
          </div>
        </div>
      </div>

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {htmlUnits.map((unit, index) => {
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
                  ? 'border-orange-500' 
                  : isLocked 
                    ? 'border-gray-300 opacity-60' 
                    : 'border-orange-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{unit.icon}</span>
                    <span className={`text-sm font-semibold ${
                      isCompleted ? 'text-orange-600' : isLocked ? 'text-gray-400' : 'text-orange-600'
                    }`}>
                      Урок {unit.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <span className="text-orange-500 text-lg">✅</span>
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
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
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
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
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

export default HTMLCourse; 