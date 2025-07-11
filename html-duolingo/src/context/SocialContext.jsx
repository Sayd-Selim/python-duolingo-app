import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const SocialContext = createContext();

export const useSocial = () => useContext(SocialContext);

// Демо-данные для таблицы лидеров
const demoLeaderboard = [
  {
    id: 1,
    name: 'Александр',
    avatar: '👨‍💻',
    level: 15,
    xp: 12500,
    streak: 28,
    isOnline: true
  },
  {
    id: 2,
    name: 'Мария',
    avatar: '👩‍💻',
    level: 14,
    xp: 11800,
    streak: 21,
    isOnline: false
  },
  {
    id: 3,
    name: 'Дмитрий',
    avatar: '🧙‍♂️',
    level: 13,
    xp: 11200,
    streak: 15,
    isOnline: true
  },
  {
    id: 4,
    name: 'Анна',
    avatar: '🧙‍♀️',
    level: 12,
    xp: 10500,
    streak: 12,
    isOnline: false
  },
  {
    id: 5,
    name: 'Иван',
    avatar: '🤖',
    level: 11,
    xp: 9800,
    streak: 9,
    isOnline: true
  },
  {
    id: 6,
    name: 'Елена',
    avatar: '🦸‍♀️',
    level: 10,
    xp: 9200,
    streak: 7,
    isOnline: false
  },
  {
    id: 7,
    name: 'Сергей',
    avatar: '🦸‍♂️',
    level: 9,
    xp: 8500,
    streak: 5,
    isOnline: true
  },
  {
    id: 8,
    name: 'Ольга',
    avatar: '👤',
    level: 8,
    xp: 7800,
    streak: 4,
    isOnline: false
  },
  {
    id: 9,
    name: 'Павел',
    avatar: '👨‍💻',
    level: 7,
    xp: 7200,
    streak: 3,
    isOnline: true
  },
  {
    id: 10,
    name: 'Наталья',
    avatar: '👩‍💻',
    level: 6,
    xp: 6500,
    streak: 2,
    isOnline: false
  }
];

// Демо-уведомления
const demoNotifications = [
  {
    id: 1,
    type: 'achievement',
    message: 'Поздравляем! Вы получили достижение "Первые шаги"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 минут назад
    read: false
  },
  {
    id: 2,
    type: 'friend',
    message: 'Мария приняла ваш запрос в друзья',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 минут назад
    read: false
  },
  {
    id: 3,
    type: 'level',
    message: 'Вы достигли 5 уровня! Продолжайте в том же духе!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 час назад
    read: true
  },
  {
    id: 4,
    type: 'streak',
    message: 'Ваша серия дней достигла 3! Не останавливайтесь!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 часа назад
    read: true
  }
];

export const SocialProvider = ({ children }) => {
  const { user } = useUser();
  const [friends, setFriends] = useState([]);
  const [leaderboard, setLeaderboard] = useState(demoLeaderboard);
  const [notifications, setNotifications] = useState(demoNotifications);

  // Загрузка друзей
  useEffect(() => {
    const loadFriends = () => {
      const savedFriends = JSON.parse(localStorage.getItem('friends')) || [];
      setFriends(savedFriends);
    };
    loadFriends();
  }, []);

  // Загрузка лидерборда
  useEffect(() => {
    const loadLeaderboard = () => {
      const savedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || demoLeaderboard;
      setLeaderboard(savedLeaderboard);
    };
    loadLeaderboard();
  }, []);

  // Загрузка уведомлений
  useEffect(() => {
    const loadNotifications = () => {
      const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || demoNotifications;
      setNotifications(savedNotifications);
    };
    loadNotifications();
  }, []);

  // Добавление друга
  const addFriend = (friendId) => {
    const newFriend = {
      id: friendId,
      name: `Пользователь ${friendId}`,
      avatar: '👤',
      level: Math.floor(Math.random() * 10) + 1,
      xp: Math.floor(Math.random() * 1000),
      streak: Math.floor(Math.random() * 10),
      isOnline: Math.random() > 0.5
    };

    setFriends(prev => {
      const newFriends = [...prev, newFriend];
      localStorage.setItem('friends', JSON.stringify(newFriends));
      return newFriends;
    });
  };

  // Удаление друга
  const removeFriend = (friendId) => {
    setFriends(prev => {
      const newFriends = prev.filter(friend => friend.id !== friendId);
      localStorage.setItem('friends', JSON.stringify(newFriends));
      return newFriends;
    });
  };

  // Добавление уведомления
  const addNotification = (notification) => {
    setNotifications(prev => {
      const newNotifications = [
        {
          id: Date.now(),
          type: notification.type,
          message: notification.message,
          timestamp: new Date().toISOString(),
          read: false
        },
        ...prev
      ];
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  // Отметка уведомления как прочитанного
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => {
      const newNotifications = prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      localStorage.setItem('notifications', JSON.stringify(newNotifications));
      return newNotifications;
    });
  };

  // Обновление лидерборда
  const updateLeaderboard = (newEntry) => {
    setLeaderboard(prev => {
      const newLeaderboard = [...prev, newEntry].sort((a, b) => b.xp - a.xp);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
      return newLeaderboard;
    });
  };

  return (
    <SocialContext.Provider
      value={{
        friends,
        leaderboard,
        notifications,
        addFriend,
        removeFriend,
        addNotification,
        markNotificationAsRead,
        updateLeaderboard
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}; 