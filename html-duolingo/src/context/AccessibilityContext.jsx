import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      highContrast: false,
      fontSize: 16,
      screenReader: false,
      keyboardNavigation: false,
      subtitles: false
    };
  });

  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applyAccessibilitySettings();
  }, [settings]);

  const applyAccessibilitySettings = () => {
    // Применяем высокий контраст
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Применяем размер шрифта
    document.documentElement.style.fontSize = `${settings.fontSize}px`;

    // Применяем поддержку скринридера
    if (settings.screenReader) {
      document.documentElement.setAttribute('aria-live', 'polite');
    } else {
      document.documentElement.removeAttribute('aria-live');
    }

    // Применяем клавиатурную навигацию
    if (settings.keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({
      ...prev,
      highContrast: !prev.highContrast
    }));
  };

  const setFontSize = (size) => {
    setSettings(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const toggleScreenReader = () => {
    setSettings(prev => ({
      ...prev,
      screenReader: !prev.screenReader
    }));
  };

  const toggleKeyboardNavigation = () => {
    setSettings(prev => ({
      ...prev,
      keyboardNavigation: !prev.keyboardNavigation
    }));
  };

  const toggleSubtitles = () => {
    setSettings(prev => ({
      ...prev,
      subtitles: !prev.subtitles
    }));
  };

  const value = {
    settings,
    toggleHighContrast,
    setFontSize,
    toggleScreenReader,
    toggleKeyboardNavigation,
    toggleSubtitles
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext; 