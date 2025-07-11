import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function FriendsProgress() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Отправка информации о текущей активности
  const updateUserActivity = useCallback(async (currentLesson) => {
    if (!user?.userId) return;
    
    try {
      await fetch(`http://localhost:5000/api/user/${user.userId}/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentLesson }),
      });
    } catch (error) {
      console.error('Ошибка обновления активности:', error);
    }
  }, [user?.userId]);

  // Загрузка всех пользователей из базы данных
  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Загружаем пользователей...');
      const response = await fetch('http://localhost:5000/api/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Ответ сервера:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Полученные данные:', data);
      
      // Фильтруем текущего пользователя из списка
      const filteredUsers = data.filter(userData => userData._id !== user?.userId);
      console.log('Отфильтрованные пользователи:', filteredUsers);
      
      // Проверяем данные прогресса
      filteredUsers.forEach(userData => {
        console.log(`Пользователь ${userData.name}:`, {
          completedLessons: userData.completedLessons,
          currentLesson: userData.currentLesson,
          totalLessons: userData.totalLessons,
          completedCount: userData.completedCount
        });
      });
      
      setAllUsers(filteredUsers);
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
      setError(err.message || 'Неизвестная ошибка');
      
      // Fallback данные для демонстрации
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.log('Используем демо данные...');
        setAllUsers([
          {
            _id: 'demo1',
            username: 'demo_user1',
            name: 'Алексей Петров',
            role: 'student',
            level: 3,
            experience: 250,
            currentLesson: 2,
            completedLessons: [1],
            lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 минут назад
            totalLessons: 2,
            completedCount: 1
          },
          {
            _id: 'demo2',
            username: 'demo_user2',
            name: 'Мария Сидорова',
            role: 'student',
            level: 5,
            experience: 450,
            currentLesson: 4,
            completedLessons: [1, 2, 3],
            lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 минут назад
            totalLessons: 4,
            completedCount: 3
          },
          {
            _id: 'demo3',
            username: 'demo_user3',
            name: 'Дмитрий Козлов',
            role: 'student',
            level: 2,
            experience: 150,
            currentLesson: 1,
            completedLessons: [],
            lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 часа назад
            totalLessons: 1,
            completedCount: 0
          }
        ]);
        setError(null); // Убираем ошибку, так как показываем демо данные
      }
    } finally {
      setLoading(false);
    }
  }, [user?.userId]);


  console.log('allUsers',allUsers);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchAllUsers();
    // Обновляем активность пользователя
    updateUserActivity(1); // Предполагаем, что пользователь на главной странице
  }, [fetchAllUsers, updateUserActivity]);

  // Обновление данных каждые 10 секунд для более актуальной информации
  useEffect(() => {
    const interval = setInterval(fetchAllUsers, 10000);
    return () => clearInterval(interval);
  }, [fetchAllUsers]);

  const getLessonName = (lessonId) => {
    const lessonNames = {
      1: 'Введение в Python',
      2: 'Переменные и типы данных',
      3: 'Условные операторы',
      4: 'Циклы',
      5: 'Функции',
      6: 'Списки и кортежи',
      7: 'Словари и множества',
      8: 'Работа с файлами',
      9: 'Обработка исключений',
      10: 'Объектно-ориентированное программирование',
      11: 'Модули и пакеты',
      12: 'Работа с данными',
      13: 'Веб-разработка',
      14: 'API и веб-сервисы',
      15: 'Финальный проект'
    };
    return lessonNames[lessonId] || `Урок ${lessonId}`;
  };

  const getLastActivity = (userData) => {
    if (!userData.lastActivity) {
      return 'Нет активности';
    }

    const date = new Date(userData.lastActivity);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Только что';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} мин. назад`;
    } else if (diffInMinutes < 1440) { // 24 часа
      const diffInHours = Math.floor(diffInMinutes / 60);
      const remainingMinutes = diffInMinutes % 60;
      if (remainingMinutes === 0) {
        return `${diffInHours} ч. назад`;
      } else {
        return `${diffInHours} ч. ${remainingMinutes} мин. назад`;
      }
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      const remainingHours = Math.floor((diffInMinutes % 1440) / 60);
      if (remainingHours === 0) {
        return `${diffInDays} дн. назад`;
      } else {
        return `${diffInDays} дн. ${remainingHours} ч. назад`;
      }
    }
  };

  const getCurrentLesson = (userData) => {
    if (!userData.currentLesson) {
      return 'Не начал обучение';
    }
    return getLessonName(userData.currentLesson);
  };

  const getTotalProgress = (userData) => {
    if (!userData.completedLessons) {
      return 0;
    }
    const totalLessons = 15;
    const completedCount = userData.completedLessons.length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const getOnlineStatus = (userData) => {
    if (!userData.lastActivity) {
      // Если нет активности, но есть дата создания, показываем "недавно присоединился"
      if (userData.createdAt) {
        const createdAt = new Date(userData.createdAt);
        const now = new Date();
        const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
        
        if (diffInDays <= 1) {
          return { 
            status: 'recent', 
            text: 'Недавно присоединился', 
            color: 'text-blue-500',
            icon: '🔵'
          };
        }
      }
      
      return { 
        status: 'offline', 
        text: 'Никогда не был в сети', 
        color: 'text-gray-500',
        icon: '⚫'
      };
    }

    const date = new Date(userData.lastActivity);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) {
      return { 
        status: 'online', 
        text: 'Сейчас в сети', 
        color: 'text-green-500',
        icon: '🟢'
      };
    } else if (diffInMinutes < 5) {
      return { 
        status: 'online', 
        text: 'Только что был в сети', 
        color: 'text-green-500',
        icon: '🟢'
      };
    } else if (diffInMinutes < 30) {
      return { 
        status: 'recent', 
        text: `Был в сети ${diffInMinutes} мин. назад`, 
        color: 'text-yellow-500',
        icon: '🟡'
      };
    } else if (diffInMinutes < 60) {
      return { 
        status: 'recent', 
        text: `Был в сети ${Math.floor(diffInMinutes)} мин. назад`, 
        color: 'text-yellow-500',
        icon: '🟡'
      };
    } else if (diffInMinutes < 1440) { // 24 часа
      const diffInHours = Math.floor(diffInMinutes / 60);
      return { 
        status: 'away', 
        text: `Был в сети ${diffInHours} ч. назад`, 
        color: 'text-orange-500',
        icon: '🟠'
      };
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return { 
        status: 'offline', 
        text: `Был в сети ${diffInDays} дн. назад`, 
        color: 'text-gray-500',
        icon: '⚫'
      };
    }
  };

  const getTimeOnPlatform = (userData) => {
    if (!userData.createdAt) {
      return 'Неизвестно';
    }

    const createdAt = new Date(userData.createdAt);
    const now = new Date();
    
    // Проверяем, что дата создания не в будущем
    if (createdAt > now) {
      return 'Сегодня присоединился';
    }
    
    const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Сегодня присоединился';
    } else if (diffInDays === 1) {
      return 'Вчера присоединился';
    } else if (diffInDays < 7) {
      return `${diffInDays} дн. на платформе`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} нед. на платформе`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} мес. на платформе`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'} на платформе`;
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-teal-500 to-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">👥</span>
          Прогресс друзей
        </h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка пользователей...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">👥</span>
          Прогресс друзей
        </h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-2">Ошибка загрузки</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={fetchAllUsers}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="text-3xl mr-3">👥</span>
          Все пользователи
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchAllUsers}
            disabled={loading}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? '🔄' : '🔄 Обновить'}
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Всего:</span>
            <span className="text-sm font-semibold text-blue-600">{allUsers.length}</span>
          </div>
        </div>
      </div>

      {allUsers.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🤝</div>
          <p className="text-gray-600 text-lg">Пока нет других пользователей</p>
          <p className="text-gray-500 text-sm mt-2">Будьте первым, кто начнет обучение!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allUsers.map((userData, index) => {
            const onlineStatus = getOnlineStatus(userData);
            const avatarColor = getAvatarColor(userData.name || userData.username);
            
            return (
              <motion.div
                key={userData._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg relative`}>
                      {(userData.name || userData.username).charAt(0).toUpperCase()}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        onlineStatus.status === 'online' ? 'bg-green-500' : 
                        onlineStatus.status === 'recent' ? 'bg-yellow-500' : 
                        onlineStatus.status === 'away' ? 'bg-orange-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {userData.name || userData.username}
                      </h3>
                      <p className="text-sm text-gray-600">
                        @{userData.username}
                      </p>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs">{onlineStatus.icon}</span>
                        <p className={`text-xs ${onlineStatus.color} font-medium`}>
                          {onlineStatus.text}
                        </p>
                      </div>
                      {userData.lastActivity && (
                        <p className="text-xs text-gray-500 mt-1">
                          Последняя активность: {new Date(userData.lastActivity).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      )}
                      {userData.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          Присоединился: {(() => {
                            const date = new Date(userData.createdAt);
                            const now = new Date();
                            // Если дата в будущем, показываем сегодняшнюю дату
                            if (date > now) {
                              return new Date().toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              });
                            }
                            return date.toLocaleDateString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            });
                          })()}
                        </p>
                      )}
                      <p className="text-xs text-blue-500 mt-1 font-medium">
                        {getTimeOnPlatform(userData)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {getTotalProgress(userData)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Прогресс
                    </div>
                    {userData.lastActivity && (
                      <div className="text-xs text-gray-400 mt-1">
                        {getLastActivity(userData)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Прогресс бар */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getTotalProgress(userData)}%` }}
                  />
                </div>

                {/* Текущий урок */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Текущий урок:</p>
                    <p className="text-sm text-gray-600">{getCurrentLesson(userData)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">Завершено уроков:</p>
                    <p className="text-sm text-gray-600">
                      {userData.completedLessons ? userData.completedLessons.length : 0} из 15
                    </p>
                  </div>
                </div>

                {/* Последние завершенные уроки */}
                {userData.completedLessons && userData.completedLessons.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Последние достижения:</p>
                    <div className="flex flex-wrap gap-2">
                      {userData.completedLessons
                        .slice(-3)
                        .map((lessonId) => (
                          <span
                            key={lessonId}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            ✅ {getLessonName(lessonId)}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🌟</span>
            <div>
              <p className="font-medium text-gray-800">Соревнуйтесь с другими!</p>
              <p className="text-sm text-gray-600">Завершайте уроки и следите за прогрессом</p>
            </div>
          </div>
          <button
            onClick={fetchAllUsers}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Обновить
          </button>
        </div>
        
        {/* Легенда статусов */}
        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Статусы пользователей:</p>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">🟢 Сейчас в сети</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">🟡 Недавно был в сети</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              <span className="text-gray-600">🟠 Был в сети несколько часов назад</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              <span className="text-gray-600">⚫ Давно не был в сети</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FriendsProgress; 