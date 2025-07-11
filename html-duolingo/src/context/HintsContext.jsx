import React, { createContext, useContext, useState, useEffect } from 'react';

const HintsContext = createContext();

export const hints = {
  first_lesson: {
    title: 'Первый урок',
    content: 'Начните с изучения базовых HTML тегов. Они помогут вам создать структуру вашей первой веб-страницы.',
    icon: '🎯'
  },
  headings: {
    title: 'Заголовки',
    content: 'Используйте теги h1-h6 для создания заголовков разного уровня. h1 - самый важный, h6 - наименее важный.',
    icon: '📝'
  },
  paragraphs: {
    title: 'Параграфы',
    content: 'Тег p используется для создания параграфов текста. Каждый параграф автоматически получает отступы сверху и снизу.',
    icon: '📄'
  },
  lists: {
    title: 'Списки',
    content: 'Используйте ul для маркированных списков и ol для нумерованных. Каждый элемент списка должен быть обернут в тег li.',
    icon: '📋'
  },
  links: {
    title: 'Ссылки',
    content: 'Тег a создает гиперссылки. Используйте атрибут href для указания URL, а target="_blank" для открытия в новой вкладке.',
    icon: '🔗'
  },
  images: {
    title: 'Изображения',
    content: 'Тег img добавляет изображения. Всегда указывайте атрибут alt для доступности и загрузки изображения.',
    icon: '🖼️'
  }
};

export const HintsProvider = ({ children }) => {
  const [availableHints, setAvailableHints] = useState(() => {
    const saved = localStorage.getItem('hints');
    return saved ? JSON.parse(saved) : Object.keys(hints).reduce((acc, key) => {
      acc[key] = { used: 0, maxUses: 3 };
      return acc;
    }, {});
  });

  useEffect(() => {
    localStorage.setItem('hints', JSON.stringify(availableHints));
  }, [availableHints]);

  const useHint = (hintId) => {
    setAvailableHints(prev => {
      const hint = prev[hintId];
      if (!hint || hint.used >= hint.maxUses) return prev;
      
      return {
        ...prev,
        [hintId]: {
          ...hint,
          used: hint.used + 1
        }
      };
    });
  };

  const getHint = (hintId) => {
    return hints[hintId];
  };

  const canUseHint = (hintId) => {
    const hint = availableHints[hintId];
    return hint && hint.used < hint.maxUses;
  };

  const getRemainingHints = (hintId) => {
    const hint = availableHints[hintId];
    return hint ? hint.maxUses - hint.used : 0;
  };

  return (
    <HintsContext.Provider value={{
      useHint,
      getHint,
      canUseHint,
      getRemainingHints
    }}>
      {children}
    </HintsContext.Provider>
  );
};

export const useHints = () => {
  const context = useContext(HintsContext);
  if (!context) {
    throw new Error('useHints must be used within a HintsProvider');
  }
  return context;
}; 