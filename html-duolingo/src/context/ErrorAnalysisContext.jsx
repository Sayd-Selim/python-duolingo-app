import React, { createContext, useContext, useState, useEffect } from 'react';

const ErrorAnalysisContext = createContext({
  errors: [],
  addError: () => {},
  getErrorStats: () => ({}),
  getErrorSuggestions: () => [],
  clearErrors: () => {}
});

export const useErrorAnalysis = () => {
  const context = useContext(ErrorAnalysisContext);
  if (!context) {
    throw new Error('useErrorAnalysis must be used within an ErrorAnalysisProvider');
  }
  return context;
};

export const ErrorAnalysisProvider = ({ children }) => {
  const [errors, setErrors] = useState(() => {
    try {
      const saved = localStorage.getItem('userErrors');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error reading errors from localStorage:', error);
      return [];
    }
  });

  // Добавление новой ошибки
  const addError = (error) => {
    const newError = {
      ...error,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    setErrors(prev => [...prev, newError]);
  };

  // Получение статистики ошибок
  const getErrorStats = () => {
    const stats = {
      total: errors.length,
      byType: {},
      byComponent: {},
      recent: errors.slice(-5),
      mostCommon: []
    };

    // Группировка по типу ошибки
    errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.byComponent[error.component] = (stats.byComponent[error.component] || 0) + 1;
    });

    // Сортировка по частоте
    stats.mostCommon = Object.entries(stats.byType)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    return stats;
  };

  // Получение рекомендаций по исправлению
  const getErrorSuggestions = (errorType) => {
    const suggestions = {
      'syntax': [
        'Проверьте правильность закрытия тегов',
        'Убедитесь, что все атрибуты правильно оформлены',
        'Проверьте соответствие открывающих и закрывающих скобок'
      ],
      'semantic': [
        'Используйте семантические теги (header, nav, main, footer)',
        'Проверьте правильность вложенности элементов',
        'Убедитесь, что структура документа логична'
      ],
      'accessibility': [
        'Добавьте атрибуты alt для изображений',
        'Используйте ARIA-атрибуты где необходимо',
        'Проверьте контрастность текста'
      ],
      'performance': [
        'Оптимизируйте размер изображений',
        'Используйте lazy loading для изображений',
        'Минимизируйте количество HTTP-запросов'
      ],
      'responsive': [
        'Добавьте медиа-запросы для адаптивности',
        'Используйте относительные единицы измерения',
        'Проверьте отображение на разных устройствах'
      ]
    };

    return suggestions[errorType] || [
      'Проверьте код на наличие опечаток',
      'Убедитесь, что все необходимые атрибуты присутствуют',
      'Проверьте соответствие спецификации HTML5'
    ];
  };

  // Очистка истории ошибок
  const clearErrors = () => {
    setErrors([]);
  };

  // Сохранение ошибок в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('userErrors', JSON.stringify(errors));
    } catch (error) {
      console.error('Error saving errors to localStorage:', error);
    }
  }, [errors]);

  const value = {
    errors,
    addError,
    getErrorStats,
    getErrorSuggestions,
    clearErrors
  };

  return (
    <ErrorAnalysisContext.Provider value={value}>
      {children}
    </ErrorAnalysisContext.Provider>
  );
};

export default ErrorAnalysisContext; 