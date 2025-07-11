import React, { useState, useEffect } from 'react';
import { useStudyTime } from '../context/StudyTimeContext';
import { useAuth } from '../context/AuthContext';
import StudyStats from '../components/StudyStats';
import { motion } from 'framer-motion';

const Profile = () => {
  const {
    totalStudyTime,
    currentSessionTime,
    dailyGoal,
    streak,
    formatTime,
    startSession,
    stopSession,
    setDailyGoal,
    getDailyProgress,
    isSessionActive
  } = useStudyTime();
  const { user: authUser, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  // Обновляем данные пользователя при изменении authUser
  useEffect(() => {
    if (authUser) {
      setUser(prev => ({
        ...prev,
        name: authUser.name,
        email: `${authUser.username}`
      }));
    }
  }, [authUser]);
  const [user, setUser] = useState({
    name: authUser?.name || 'Загрузка...',
    role: 'Изучающий Python',
    email: authUser?.username ? `${authUser.username}` : 'loading@example.com',
    bio: 'Изучаю Python программирование с помощью интерактивного курса.',
    studyGoals: {
      streak: streak || 0,
      dailyGoal: dailyGoal || 30,
      totalTime: totalStudyTime || 0
    },
    skills: ['Python', 'Программирование'],
    level: 'Начинающий',
    joinDate: new Date().toLocaleDateString('ru-RU')
  });

  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Профиль</h1>
        
        {/* Основная информация */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Имя</label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Должность</label>
                    <input
                      type="text"
                      name="role"
                      value={editedUser.role}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">О себе</label>
                    <textarea
                      name="bio"
                      value={editedUser.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                      <p className="text-gray-600">{user.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleEdit}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={logout}
                        className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Выйти
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{user.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Информация</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Уровень:</span>
                <span className="text-gray-800">{user.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Дата регистрации:</span>
                <span className="text-gray-800">{user.joinDate}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Достижения</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <p className="text-gray-800 font-medium">Серия дней</p>
                  <p className="text-gray-600">{user.studyGoals.streak} дней подряд</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="text-gray-800 font-medium">Общее время</p>
                  <p className="text-gray-600">{formatTime(user.studyGoals.totalTime)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-gray-800 font-medium">Дневная цель</p>
                  <p className="text-gray-600">{user.studyGoals.dailyGoal} минут</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Статистика обучения */}
        <StudyStats />


      </div>
    </div>
  );
};

export default Profile; 