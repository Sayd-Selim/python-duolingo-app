import React from 'react';
import { motion } from 'framer-motion';
import { useStudyTime } from '../context/StudyTimeContext';

const StudyStats = () => {
  const {
    totalStudyTime = 0,
    currentSessionTime = 0,
    dailyGoal = 30,
    streak = 0,
    formatTime,
    startSession,
    stopSession,
    setDailyGoal,
    getDailyProgress,
    isSessionActive = false
  } = useStudyTime();

  const dailyProgress = getDailyProgress ? getDailyProgress() : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Статистика обучения</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Текущая сессия */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Текущая сессия</h3>
          <div className="text-3xl font-mono text-indigo-600 mb-4">
            {formatTime ? formatTime(currentSessionTime) : '00:00:00'}
          </div>
          <button
            onClick={isSessionActive ? stopSession : startSession}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              isSessionActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSessionActive ? 'Остановить' : 'Начать'} сессию
          </button>
        </div>

        {/* Общее время */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Общее время обучения</h3>
          <div className="text-3xl font-mono text-indigo-600">
            {formatTime ? formatTime(totalStudyTime) : '00:00:00'}
          </div>
        </div>

        {/* Дневная цель */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Дневная цель</h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={dailyGoal}
              onChange={(e) => setDailyGoal && setDailyGoal(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-20 px-2 py-1 border rounded-md"
              min="1"
            />
            <span className="text-gray-600">минут</span>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${dailyProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Прогресс: {Math.round(dailyProgress)}%
            </div>
          </div>
        </div>

        {/* Серия дней */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Серия дней</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🔥</span>
            <span className="text-3xl font-bold text-orange-500">{streak}</span>
            <span className="text-gray-600">дней подряд</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {streak > 0
              ? 'Продолжайте в том же духе!'
              : 'Начните свою серию сегодня!'}
          </p>
        </div>
      </div>

      {/* Достижения */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Достижения</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">Первая сессия</div>
            <div className="text-sm text-gray-500">
              {totalStudyTime > 0 ? 'Получено' : 'В процессе'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="font-medium">1 час обучения</div>
            <div className="text-sm text-gray-500">
              {totalStudyTime >= 3600 ? 'Получено' : 'В процессе'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📅</div>
            <div className="font-medium">7 дней подряд</div>
            <div className="text-sm text-gray-500">
              {streak >= 7 ? 'Получено' : 'В процессе'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="font-medium">10 часов</div>
            <div className="text-sm text-gray-500">
              {totalStudyTime >= 36000 ? 'Получено' : 'В процессе'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStats; 