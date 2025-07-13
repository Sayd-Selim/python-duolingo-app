import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';
import { useProgress } from '../context/ProgressContext';

// Структура уроков
const lessonsStructure = [
  {
    id: 1,
    title: 'Основы Python',
    icon: '🐍',
    units: [
      { id: 1, title: 'Введение в Python', path: '/level/1/unit/1' },
      { id: 2, title: 'Переменные. Вывод и ввод данных', path: '/level/1/unit/2' },
      { id: 3, title: 'Операторы и выражения', path: '/level/1/unit/3' },
      { id: 4, title: 'Условные операторы', path: '/level/1/unit/4' },
      { id: 5, title: 'Циклы for и while', path: '/level/1/unit/5' },
      { id: 6, title: 'Списки и кортежи', path: '/level/1/unit/6' },
      { id: 7, title: 'Словари и множества', path: '/level/1/unit/7' },
      { id: 8, title: 'Функции', path: '/level/1/unit/8' },
      { id: 9, title: 'Работа с файлами', path: '/level/1/unit/9' },
      { id: 10, title: 'Обработка исключений', path: '/level/1/unit/10' },
      { id: 11, title: 'Модули и пакеты', path: '/level/1/unit/11' },
      { id: 12, title: 'Объектно-ориентированное программирование', path: '/level/1/unit/12' },
      { id: 13, title: 'Работа с библиотеками', path: '/level/1/unit/13' },
      { id: 14, title: 'Практический проект', path: '/level/1/unit/14' }
    ]
  },
  {
    id: 2,
    title: 'Практика',
    icon: '💻',
    units: [
      { id: 1, title: 'Практика по урокам', path: '/practice' },
      { id: 2, title: 'Расширенная практика', path: '/advanced-practice' },
      { id: 3, title: 'Проектные задания', path: '/projects' }
    ]
  },
  {
    id: 3,
    title: 'Мотивация',
    icon: '🎯',
    units: [
      { id: 1, title: 'Система мотивации', path: '/motivation' }
    ]
  },
  {
    id: 4,
    title: 'Подготовка к трудоустройству',
    icon: '💼',
    units: [
      { id: 1, title: 'Вопросы на собеседование', path: '/interview-prep' },
      { id: 2, title: 'Создание резюме и портфолио', path: '/resume-builder' }
    ]
  }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [recentLessons, setRecentLessons] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState({});
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
  const { resetProgress, getCourseProgress } = useProgress();

  // Загрузка закладок и недавних уроков
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const savedRecentLessons = JSON.parse(localStorage.getItem('recentLessons')) || [];
    setBookmarks(savedBookmarks);
    setRecentLessons(savedRecentLessons);
  }, []);

  // Переключение раскрытия уровня
  const toggleLevel = (levelId) => {
    setExpandedLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId]
    }));
  };

  // Получение текущего урока
  const getCurrentLesson = () => {
    for (const level of lessonsStructure) {
      const lesson = level.units.find(unit => unit.path === location.pathname);
      if (lesson) {
        return { ...lesson, levelTitle: level.title, levelIcon: level.icon };
      }
    }
    return null;
  };

  // Получение следующего урока
  const getNextLesson = () => {
    const currentLesson = getCurrentLesson();
    if (!currentLesson) return null;

    for (const level of lessonsStructure) {
      for (let i = 0; i < level.units.length; i++) {
        if (level.units[i].path === currentLesson.path && i < level.units.length - 1) {
          return {
            ...level.units[i + 1],
            levelTitle: level.title,
            levelIcon: level.icon
          };
        }
      }
    }
    return null;
  };

  // Получение предыдущего урока
  const getPreviousLesson = () => {
    const currentLesson = getCurrentLesson();
    if (!currentLesson) return null;

    for (const level of lessonsStructure) {
      for (let i = 0; i < level.units.length; i++) {
        if (level.units[i].path === currentLesson.path && i > 0) {
          return {
            ...level.units[i - 1],
            levelTitle: level.title,
            levelIcon: level.icon
          };
        }
      }
    }
    return null;
  };

  // Поиск уроков
  const searchLessons = (query) => {
    if (!query) return [];
    const results = [];
    lessonsStructure.forEach(level => {
      level.units.forEach(unit => {
        if (
          unit.title.toLowerCase().includes(query.toLowerCase()) ||
          level.title.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            ...unit,
            levelTitle: level.title,
            levelIcon: level.icon
          });
        }
      });
    });
    return results;
  };

  // Добавление урока в недавние
  const addToRecent = (lesson) => {
    setRecentLessons(prev => {
      const filtered = prev.filter(l => l.path !== lesson.path);
      const newRecent = [lesson, ...filtered].slice(0, 5);
      localStorage.setItem('recentLessons', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  // Переключение закладки
  const toggleBookmark = (lesson) => {
    setBookmarks(prev => {
      const isBookmarked = prev.some(b => b.path === lesson.path);
      const newBookmarks = isBookmarked
        ? prev.filter(b => b.path !== lesson.path)
        : [...prev, lesson];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Обработка перехода к уроку
  const handleLessonClick = (lesson) => {
    navigate(lesson.path);
    addToRecent(lesson);
    setIsSearchOpen(false);
  };

  // Получение прогресса по уровню
  const getLevelProgress = (levelId) => {
    const level = lessonsStructure.find(l => l.id === levelId);
    if (!level) return 0;
    
    const totalUnits = level.units.length;
    const completedUnits = level.units.filter(unit => {
      const lesson = recentLessons.find(l => l.path === unit.path);
      return lesson;
    }).length;
    
    return (completedUnits / totalUnits) * 100;
  };

  // Получение текущего уровня
  const getCurrentLevel = () => {
    const currentLesson = getCurrentLesson();
    if (!currentLesson) return null;
    
    return lessonsStructure.find(level => 
      level.units.some(unit => unit.path === currentLesson.path)
    );
  };

  // Получение следующего уровня
  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    if (!currentLevel) return null;
    
    const currentIndex = lessonsStructure.findIndex(level => level.id === currentLevel.id);
    if (currentIndex < lessonsStructure.length - 1) {
      return lessonsStructure[currentIndex + 1];
    }
    return null;
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();
  const searchResults = searchLessons(searchQuery);
  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const levelProgress = currentLevel ? getLevelProgress(currentLevel.id) : 0;

  // Получение первого урока уровня
  const getFirstLessonOfLevel = (level) => {
    return level ? level.units[0] : null;
  };

  // Получение последнего урока уровня
  const getLastLessonOfLevel = (level) => {
    return level ? level.units[level.units.length - 1] : null;
  };

  // Проверка, является ли урок первым в уровне
  const isFirstLessonInLevel = (lesson) => {
    if (!lesson || !currentLevel) return false;
    return currentLevel.units[0].path === lesson.path;
  };

  // Проверка, является ли урок последним в уровне
  const isLastLessonInLevel = (lesson) => {
    if (!lesson || !currentLevel) return false;
    return currentLevel.units[currentLevel.units.length - 1].path === lesson.path;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Боковое меню */}
      {/* <motion.div
        initial={false}
        animate={{
          width: isSidebarCollapsed ? '64px' : '256px'
        }}
        className="fixed left-0 top-0 h-full bg-white shadow-lg z-30 overflow-hidden transition-all duration-300"
      >
        <div className="p-4">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg mb-4"
          >
            {!isSidebarCollapsed && <span className="text-xl font-bold">Меню</span>}
            <span className="text-gray-500">
              {isSidebarCollapsed ? '→' : '←'}
            </span>
          </button>

          <div className="space-y-2">
            {lessonsStructure.map((level) => (
              <div key={level.id}>
                <button
                  onClick={() => toggleLevel(level.id)}
                  className={`w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  }`}
                  title={isSidebarCollapsed ? level.title : ''}
                >
                  <div className={`flex items-center space-x-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <span className="text-xl">{level.icon}</span>
                    {!isSidebarCollapsed && <span>{level.title}</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span>{expandedLevels[level.id] ? '▼' : '▶'}</span>
                  )}
                </button>
                {!isSidebarCollapsed && expandedLevels[level.id] && (
                  <div className="ml-6 mt-2 space-y-1">
                    {level.units.map((unit) => (
                      <button
                        key={unit.id}
                        onClick={() => handleLessonClick(unit)}
                        className={`w-full text-left p-2 rounded-lg hover:bg-gray-100 ${
                          isActive(unit.path) ? 'bg-indigo-50 text-indigo-600' : ''
                        }`}
                      >
                        {unit.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div> */}
      

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs mt-1">Главная</span>
            </Link>

            <Link
              to="/practice"
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                isActive('/practice') ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span className="text-xs mt-1">Практика</span>
            </Link>

            <Link
              to="/review"
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                isActive('/review') ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-xs mt-1">Повторение</span>
            </Link>

            <Link
              to="/progress"
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                isActive('/progress') ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-xs mt-1">Прогресс</span>
            </Link>

            <Link
              to="/social/chat"
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                isActive('/social/chat') ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-xs mt-1">Чат</span>
            </Link>

            <button
              onClick={resetProgress}
              className="flex flex-col items-center px-3 py-2 rounded-lg text-gray-600 hover:text-red-600"
              title="Сбросить прогресс"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-xs mt-1">Сброс</span>
            </button>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navigation; 