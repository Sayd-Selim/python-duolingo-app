import React from 'react';
import { motion } from 'framer-motion';
import { useAchievements } from '../context/AchievementsContext';

const AchievementCard = ({ achievement, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-xl shadow-lg ${
        achievement.unlocked 
          ? 'bg-gradient-to-br from-green-400 to-green-500' 
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce' : 'opacity-50'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-700'}`}>
            {achievement.title}
          </h3>
          <p className={`mt-1 ${achievement.unlocked ? 'text-white/90' : 'text-gray-500'}`}>
            {achievement.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-sm font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
              +{achievement.xp} XP
            </span>
            {achievement.unlocked && (
              <span className="text-sm text-white bg-white/20 px-3 py-1 rounded-full">
                Получено
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AchievementsPage = () => {
  const { achievements } = useAchievements();
  
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const totalXP = achievements.reduce((sum, a) => sum + (a.unlocked ? a.xp : 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Заголовок и статистика */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Достижения
          </h1>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {unlockedAchievements.length}
              </div>
              <div className="text-sm text-gray-500">Получено</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {totalXP}
              </div>
              <div className="text-sm text-gray-500">Всего XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Прогресс</div>
            </div>
          </div>
        </motion.div>

        {/* Прогресс-бар */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          className="h-2 bg-gray-200 rounded-full mb-12 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
          />
        </motion.div>

        {/* Полученные достижения */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Полученные достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unlockedAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Неполученные достижения */}
        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Доступные достижения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lockedAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index + unlockedAchievements.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage; 