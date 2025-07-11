import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для сохранения пользователя в localStorage
  const saveUserToStorage = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Ошибка при сохранении пользователя в localStorage:', error);
    }
  };

  // Функция для загрузки пользователя из localStorage
  const loadUserFromStorage = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // Возвращаем пользователя если он существует в localStorage
        if (userData) {
          return userData;
        }
      }
      return null;
    } catch (error) {
      console.error('Ошибка при загрузке пользователя из localStorage:', error);
      return null;
    }
  };

  // Проверяем сохраненного пользователя при загрузке
  useEffect(() => {
    const savedUser = loadUserFromStorage();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('AuthContext: Ответ сервера при входе:', data);

      if (response.ok) {
        console.log('AuthContext: Сохраняем пользователя в localStorage при входе:', data);
        
        // Объединяем основные данные пользователя с данными о доступах к урокам
        const userData = {
          userId: data.userId,
          username: data.username,
          name: data.name,
          role: data.role,
          level: data.level,
          experience: data.experience,
          gems: data.gems,
          ...data.lessonAccess // Добавляем все поля уроков
        };
        
        console.log('AuthContext: Объединенные данные пользователя:', userData);
        
        // Сохраняем пользователя в localStorage
        saveUserToStorage(userData);
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return { success: false, error: 'Ошибка подключения к серверу' };
    }
  };

  const register = async (username, password, name) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name }),
      });

      const data = await response.json();
      console.log('AuthContext: Ответ сервера при регистрации:', data);

      if (response.ok) {
        // Получаем полные данные пользователя после регистрации
        const userResponse = await fetch(`http://localhost:5000/api/user/${data.userId}/lessons`);
        const userLessonsData = await userResponse.json();
        
        // Создаем объект с данными пользователя
        const userData = {
          userId: data.userId,
          username: data.username,
          name: data.name,
          role: 'user',
          level: 1,
          experience: 0,
          gems: 0
        };
        
        // Добавляем данные о доступах к урокам
        userLessonsData.forEach(lesson => {
          userData[`lesson${lesson.lessonId}`] = lesson.hasAccess;
        });
        
        console.log('AuthContext: Сохраняем пользователя в localStorage:', userData);
        // Сохраняем пользователя в localStorage
        saveUserToStorage(userData);
        setUser(userData);
        
        return { success: true, userId: data.userId, userData };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      return { success: false, error: 'Ошибка подключения к серверу' };
    }
  };

  const logout = () => {
    setUser(null);
    // Полная очистка всех данных пользователя
    localStorage.clear();
  };

  // Функция для обновления данных пользователя из базы данных
  const refreshUserData = async () => {
    if (!user || !user.userId) {
      console.log('AuthContext: Нет пользователя для обновления');
      return false;
    }

    try {
      // Добавляем таймаут для запроса
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут
      
      // Получаем свежие данные из базы
      const response = await fetch(`http://localhost:5000/api/user/${user.userId}/lessons`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Ошибка получения данных');
      }
      
      const lessonsData = await response.json();
      
      // Обновляем данные пользователя
      const updatedUser = { ...user };
      let hasChanges = false;
      
      lessonsData.forEach(lesson => {
        const lessonKey = `lesson${lesson.lessonId}`;
        if (updatedUser[lessonKey] !== lesson.hasAccess) {
          updatedUser[lessonKey] = lesson.hasAccess;
          hasChanges = true;
        }
      });
      
      // Обновляем состояние только если есть изменения
      if (hasChanges) {
        console.log('AuthContext: Обновленные данные пользователя:', updatedUser);
        saveUserToStorage(updatedUser);
        setUser(updatedUser);
      } else {
        console.log('AuthContext: Изменений нет, пропускаем обновление');
      }
      
      return true;
    } catch (error) {
      console.error('AuthContext: Ошибка обновления данных:', error);
      if (error.name === 'AbortError') {
        console.log('AuthContext: Запрос превысил время ожидания');
      }
      return false;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshUserData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 