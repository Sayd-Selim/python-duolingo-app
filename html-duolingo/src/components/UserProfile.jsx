import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const { user, updateUser, updatePreferences } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);

  const handleSaveProfile = () => {
    updateUser({ name: editName });
    setIsEditing(false);
  };

  const handleThemeChange = (theme) => {
    updatePreferences({ theme });
  };

  const avatars = ['👤', '👨‍💻', '👩‍💻', '🧙‍♂️', '🧙‍♀️', '🤖', '🦸‍♂️', '🦸‍♀️'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Профиль */}
        <div className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                {user.avatar}
              </div>
              <button
                onClick={() => {
                  const currentIndex = avatars.indexOf(user.avatar);
                  const nextIndex = (currentIndex + 1) % avatars.length;
                  updateUser({ avatar: avatars[nextIndex] });
                }}
                className="absolute bottom-0 right-0 bg-white text-indigo-600 rounded-full p-2 shadow-lg hover:bg-indigo-50 transition-colors"
              >
                🔄
              </button>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="bg-white/20 border border-white/30 rounded px-3 py-1 text-white placeholder-white/70"
                    placeholder="Введите имя"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-indigo-50 transition-colors"
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">
                    {user.name || 'Анонимный пользователь'}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <p className="text-white/80">Уровень {user.level}</p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Опыт</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-indigo-600">{user.xp}</span>
                <span className="text-gray-600">XP</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${(user.xp % 1000) / 10}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Серия дней</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-emerald-600">{user.streak}</span>
                <span className="text-gray-600">дней</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {/* Цель: {user.studyGoals.streak} дней */}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Достижения</h3>
              <div className="flex items-center space-x-2">
                {/* <span className="text-2xl font-bold text-violet-600">{user.achievements.length}</span> */}
                <span className="text-gray-600">получено</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {/* {user.badges.length} значков */}
              </p>
            </div>
          </div>
        </div>

        {/* Настройки */}
        <div className="p-8 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Настройки</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Тема</span>
              <div className="flex space-x-2">
                {/* <button
                  onClick={() => handleThemeChange('light')}
                  className={`px-4 py-2 rounded ${
                    user.preferences.theme === 'light'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Светлая
                </button> */}
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-4 py-2 rounded ${
                    user.preferences.theme === 'dark'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Тёмная
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Уведомления</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.notifications}
                  onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Звук</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.preferences.sound}
                  onChange={(e) => updatePreferences({ sound: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile; 