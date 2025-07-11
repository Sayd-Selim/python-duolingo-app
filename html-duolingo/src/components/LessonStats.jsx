import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-lg ${color} text-white`}
  >
    <div className="flex items-center space-x-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-sm opacity-80">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  </motion.div>
);

const LessonStats = ({ stats }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Статистика урока</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Правильных ответов"
          value={`${stats.correctAnswers}%`}
          icon="✅"
          color="bg-gradient-to-r from-green-400 to-green-500"
        />
        <StatCard
          title="Время прохождения"
          value={stats.completionTime}
          icon="⏱️"
          color="bg-gradient-to-r from-blue-400 to-blue-500"
        />
        <StatCard
          title="Получено XP"
          value={stats.xpEarned}
          icon="⭐"
          color="bg-gradient-to-r from-yellow-400 to-yellow-500"
        />
        <StatCard
          title="Попыток"
          value={stats.attempts}
          icon="🔄"
          color="bg-gradient-to-r from-purple-400 to-purple-500"
        />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Общий прогресс</span>
            <span className="text-sm text-gray-500">{stats.overallProgress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.overallProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
            />
          </div>
        </div>

        {stats.skillProgress && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Прогресс по навыкам</h4>
            {Object.entries(stats.skillProgress).map(([skill, progress]) => (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{skill}</span>
                  <span className="text-xs text-gray-500">{progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-indigo-400"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonStats; 