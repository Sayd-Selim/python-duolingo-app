import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  const [category, setCategory] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Анна',
      points: 1250,
      streak: 7,
      level: 5,
      avatar: 'A',
      achievements: ['Быстрый старт', 'Неделя обучения', 'Мастер HTML']
    },
    {
      id: 2,
      name: 'Михаил',
      points: 980,
      streak: 5,
      level: 4,
      avatar: 'M',
      achievements: ['Быстрый старт', 'Неделя обучения']
    },
    {
      id: 3,
      name: 'Дмитрий',
      points: 750,
      streak: 3,
      level: 3,
      avatar: 'D',
      achievements: ['Быстрый старт']
    }
  ];

  const renderAchievement = (achievement) => {
    const colors = {
      'Быстрый старт': 'bg-yellow-100 text-yellow-800',
      'Неделя обучения': 'bg-green-100 text-green-800',
      'Мастер HTML': 'bg-purple-100 text-purple-800'
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          colors[achievement] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {achievement}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Рейтинг пользователей</h2>

          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Период
              </label>
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="week">За неделю</option>
                <option value="month">За месяц</option>
                <option value="all">За все время</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Все категории</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                  {user.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">
                        Уровень {user.level} • {user.streak} дней подряд
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">{user.points}</p>
                      <p className="text-sm text-gray-500">очков</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {user.achievements.map((achievement) => (
                      <div key={achievement}>{renderAchievement(achievement)}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 