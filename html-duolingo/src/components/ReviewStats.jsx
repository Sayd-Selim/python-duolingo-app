import React from 'react';
import { useReview } from '../context/ReviewContext';
import { motion } from 'framer-motion';

const ReviewStats = () => {
  const { reviews, flashcards, tests } = useReview();

  // Общая статистика
  const totalReviews = reviews.length;
  const completedReviews = reviews.filter(r => r.completed).length;
  const totalFlashcards = flashcards.length;
  const totalTests = tests.length;

  // Статистика по уровням
  const levelStats = reviews.reduce((acc, review) => {
    if (!acc[review.levelTitle]) {
      acc[review.levelTitle] = {
        total: 0,
        completed: 0,
        averageScore: 0
      };
    }
    acc[review.levelTitle].total++;
    if (review.completed) {
      acc[review.levelTitle].completed++;
    }
    return acc;
  }, {});

  // Статистика по дням
  const dailyStats = reviews.reduce((acc, review) => {
    const date = new Date(review.lastReviewed).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        reviews: 0,
        flashcards: 0,
        tests: 0
      };
    }
    acc[date].reviews++;
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Статистика повторений</h2>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Уроки</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalReviews}</p>
          <p className="text-sm text-gray-500">Завершено: {completedReviews}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Карточки</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalFlashcards}</p>
          <p className="text-sm text-gray-500">Активных карточек</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Тесты</h3>
          <p className="text-3xl font-bold text-indigo-600">{totalTests}</p>
          <p className="text-sm text-gray-500">Пройдено тестов</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">Прогресс</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {Math.round((completedReviews / totalReviews) * 100)}%
          </p>
          <p className="text-sm text-gray-500">Общий прогресс</p>
        </motion.div>
      </div>

      {/* Статистика по уровням */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Прогресс по уровням</h3>
        <div className="space-y-4">
          {Object.entries(levelStats).map(([level, stats]) => (
            <div key={level}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{level}</span>
                <span className="text-sm text-gray-500">
                  {stats.completed} из {stats.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Статистика по дням */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Активность по дням</h3>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(dailyStats).map(([date, stats]) => (
            <div
              key={date}
              className="flex flex-col items-center p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-xs text-gray-500">{date}</span>
              <span className="text-lg font-medium text-indigo-600">
                {stats.reviews + stats.flashcards + stats.tests}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats; 