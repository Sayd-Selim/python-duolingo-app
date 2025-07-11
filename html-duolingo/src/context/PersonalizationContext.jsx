import React, { createContext, useContext, useState, useEffect } from 'react';

const PersonalizationContext = createContext();

export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
};

export const PersonalizationProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    try {
      return savedTheme ? JSON.parse(savedTheme) : {
        colors: {
          primary: '#4F46E5',
          secondary: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        fonts: {
          main: 'Inter',
          heading: 'Poppins'
        },
        sounds: {
          enabled: true,
          volume: 0.5
        }
      };
    } catch (error) {
      // If the saved theme is a string (like "light"), return the default theme
      return {
        colors: {
          primary: '#4F46E5',
          secondary: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        fonts: {
          main: 'Inter',
          heading: 'Poppins'
        },
        sounds: {
          enabled: true,
          volume: 0.5
        }
      };
    }
  });

  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar ? JSON.parse(savedAvatar) : {
      type: 'robot',
      name: 'Ассистент',
      mood: 'happy',
      customizations: {
        color: '#4F46E5',
        accessories: []
      }
    };
  });

  const [miniSite, setMiniSite] = useState(() => {
    const savedSite = localStorage.getItem('miniSite');
    return savedSite ? JSON.parse(savedSite) : {
      title: 'Мой мини-сайт',
      blocks: [],
      background: '#FFFFFF',
      layout: 'default'
    };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('avatar', JSON.stringify(avatar));
  }, [avatar]);

  useEffect(() => {
    localStorage.setItem('miniSite', JSON.stringify(miniSite));
  }, [miniSite]);

  const updateTheme = (newTheme) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const updateAvatar = (newAvatar) => {
    setAvatar(prev => ({ ...prev, ...newAvatar }));
  };

  const updateMiniSite = (newSite) => {
    setMiniSite(prev => ({ ...prev, ...newSite }));
  };

  const addMiniSiteBlock = (block) => {
    setMiniSite(prev => ({
      ...prev,
      blocks: [...prev.blocks, { ...block, id: Date.now() }]
    }));
  };

  const removeMiniSiteBlock = (blockId) => {
    setMiniSite(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }));
  };

  const updateMiniSiteBlock = (blockId, updates) => {
    setMiniSite(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  const value = {
    theme,
    avatar,
    miniSite,
    updateTheme,
    updateAvatar,
    updateMiniSite,
    addMiniSiteBlock,
    removeMiniSiteBlock,
    updateMiniSiteBlock
  };

  return (
    <PersonalizationContext.Provider value={value}>
      {children}
    </PersonalizationContext.Provider>
  );
}; 