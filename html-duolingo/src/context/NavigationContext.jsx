import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

// Структура уроков
const lessonsStructure = [
  {
    id: 1,
    title: 'Основы HTML',
    icon: '🏷️',
    units: [
      { id: 1, title: 'Как работают HTML теги', path: '/level/1/unit/1' },
      { id: 2, title: 'Первая HTML страница', path: '/level/1/unit/2' },
      { id: 3, title: 'Заголовки и параграфы', path: '/level/1/unit/3' },
      { id: 4, title: 'Списки', path: '/level/1/unit/4' },
      { id: 5, title: 'Ссылки', path: '/level/1/unit/5' },
      { id: 6, title: 'Изображения', path: '/level/1/unit/6' },
      { id: 7, title: 'Таблицы', path: '/level/1/unit/7' },
      { id: 8, title: 'Атрибуты тегов', path: '/level/1/unit/8' },
      { id: 9, title: 'Вложенность тегов', path: '/level/1/unit/9' },
      { id: 10, title: 'Семантические теги', path: '/level/1/unit/10' },
      { id: 11, title: 'Метатеги и SEO', path: '/level/1/unit/11' }
    ]
  },
  {
    id: 2,
    title: 'Продвинутый HTML',
    icon: '🚀',
    units: [
      { id: 1, title: 'Формы и ввод данных', path: '/level/2/unit/1' },
      { id: 2, title: 'Мультимедиа', path: '/level/2/unit/2' },
      { id: 3, title: 'Canvas и SVG', path: '/level/2/unit/3' },
      { id: 4, title: 'Геолокация', path: '/level/2/unit/4' },
      { id: 5, title: 'Web Storage', path: '/level/2/unit/5' }
    ]
  }
];

export const NavigationProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [recentLessons, setRecentLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Загрузка закладок
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  // Загрузка недавних уроков
  useEffect(() => {
    const savedRecentLessons = JSON.parse(localStorage.getItem('recentLessons')) || [];
    setRecentLessons(savedRecentLessons);
  }, []);

  // Добавление закладки
  const addBookmark = (lesson) => {
    setBookmarks(prev => {
      const newBookmarks = [...prev, lesson];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Удаление закладки
  const removeBookmark = (lessonId) => {
    setBookmarks(prev => {
      const newBookmarks = prev.filter(bookmark => bookmark.id !== lessonId);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  // Добавление урока в недавние
  const addRecentLesson = (lesson) => {
    setRecentLessons(prev => {
      const filtered = prev.filter(l => l.id !== lesson.id);
      const newRecent = [lesson, ...filtered].slice(0, 5); // Храним только 5 последних
      localStorage.setItem('recentLessons', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  // Поиск уроков
  const searchLessons = (query) => {
    setSearchQuery(query);
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

  // Получение следующего урока
  const getNextLesson = (currentPath) => {
    for (const level of lessonsStructure) {
      for (let i = 0; i < level.units.length; i++) {
        if (level.units[i].path === currentPath && i < level.units.length - 1) {
          return level.units[i + 1];
        }
      }
    }
    return null;
  };

  // Получение предыдущего урока
  const getPreviousLesson = (currentPath) => {
    for (const level of lessonsStructure) {
      for (let i = 0; i < level.units.length; i++) {
        if (level.units[i].path === currentPath && i > 0) {
          return level.units[i - 1];
        }
      }
    }
    return null;
  };

  return (
    <NavigationContext.Provider
      value={{
        lessonsStructure,
        bookmarks,
        recentLessons,
        searchQuery,
        addBookmark,
        removeBookmark,
        addRecentLesson,
        searchLessons,
        getNextLesson,
        getPreviousLesson
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}; 