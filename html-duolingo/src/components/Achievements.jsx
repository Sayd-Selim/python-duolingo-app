import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: 'Быстрый старт',
      description: 'Завершите свой первый урок',
      icon: '🚀',
      category: 'general',
      progress: 100,
      completed: true,
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Неделя обучения',
      description: 'Занимайтесь 7 дней подряд',
      icon: '📅',
      category: 'streak',
      progress: 85,
      completed: false,
      date: null
    },
    {
      id: 3,
      title: 'Мастер HTML',
      description: 'Завершите все уроки по HTML',
      icon: '🎯',
      category: 'html',
      progress: 60,
      completed: false,
      date: null
    },
    {
      id: 4,
      title: 'Социальная бабочка',
      description: 'Помогите 10 другим пользователям',
      icon: '🦋',
      category: 'social',
      progress: 30,
      completed: false,
      date: null
    },
    {
      id: 5,
      title: 'Ночная сова',
      description: 'Занимайтесь в течение 5 ночей',
      icon: '🦉',
      category: 'streak',
      progress: 40,
      completed: false,
      date: null
    }
  ];

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'general', name: 'Общие' },
    { id: 'streak', name: 'Серии' },
    { id: 'html', name: 'HTML' },
    { id: 'social', name: 'Социальные' }
  ];

  const filteredAchievements = activeCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Достижения</h2>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${
                  achievement.completed
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {achievement.description}
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Прогресс</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            achievement.completed
                              ? 'bg-green-500'
                              : 'bg-indigo-600'
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                    {achievement.completed && achievement.date && (
                      <p className="text-xs text-gray-500 mt-2">
                        Получено {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
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

export default Achievements; 