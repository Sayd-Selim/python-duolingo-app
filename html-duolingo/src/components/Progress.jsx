import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const Progress = () => {
  const { 
    completedLessons, 
    lessonProgress, 
    getCourseProgress, 
    getCompletedLessonsCount 
  } = useProgress();
  
  const { user } = useAuth();

  // Реальные данные из контекста
  const stats = {
    totalLessons: 15, // Общее количество уроков
    completedLessons: getCompletedLessonsCount(),
    currentStreak: user?.streak || 0,
    longestStreak: user?.longestStreak || 0,
    totalXP: user?.experience || 0,
    level: user?.level || 1,
    nextLevelXP: (user?.level || 1) * 100,
    currentLevelXP: (user?.experience || 0) % 100
  };

  // Создаем навыки на основе реального прогресса
  const skills = [
    {
      name: 'Основы Python',
      progress: lessonProgress[1] || 0,
      lessons: 5,
      completed: completedLessons.includes(1) ? 1 : 0
    },
    {
      name: 'Переменные и типы данных',
      progress: lessonProgress[2] || 0,
      lessons: 5,
      completed: completedLessons.includes(2) ? 1 : 0
    },
    {
      name: 'Условия и циклы',
      progress: lessonProgress[3] || 0,
      lessons: 5,
      completed: completedLessons.includes(3) ? 1 : 0
    },
    {
      name: 'Функции',
      progress: lessonProgress[4] || 0,
      lessons: 5,
      completed: completedLessons.includes(4) ? 1 : 0
    },
    {
      name: 'Структуры данных',
      progress: lessonProgress[5] || 0,
      lessons: 5,
      completed: completedLessons.includes(5) ? 1 : 0
    }
  ];

  const achievements = [
    {
      title: 'Быстрый старт',
      description: 'Завершите первый урок',
      icon: '🚀',
      completed: completedLessons.includes(1)
    },
    {
      title: 'Неделя обучения',
      description: 'Занимайтесь 7 дней подряд',
      icon: '📅',
      completed: stats.currentStreak >= 7
    },
    {
      title: 'Мастер Python',
      description: 'Завершите все уроки по Python',
      icon: '🎯',
      completed: stats.completedLessons >= 15
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ваш прогресс</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-indigo-900 mb-4">
                Общая статистика
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-indigo-700 mb-1">
                    <span>Уроки</span>
                    <span>
                      {stats.completedLessons} из {stats.totalLessons}
                    </span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <motion.div
                      className="bg-indigo-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.completedLessons / stats.totalLessons) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-indigo-700 mb-1">
                    <span>Уровень {stats.level}</span>
                    <span>
                      {stats.currentLevelXP} / {stats.nextLevelXP} XP
                    </span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <motion.div
                      className="bg-indigo-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.currentLevelXP / stats.nextLevelXP) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {stats.currentStreak}
                    </div>
                    <div className="text-sm text-indigo-700">Дней подряд</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {stats.totalXP}
                    </div>
                    <div className="text-sm text-indigo-700">Всего XP</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-green-900 mb-4">
                Навыки
              </h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm text-green-700 mb-1">
                      <span>{skill.name}</span>
                      <span>
                        {skill.completed} из {skill.lessons}
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <motion.div
                        className="bg-green-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-yellow-900 mb-4">
              Достижения
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    achievement.completed
                      ? 'bg-yellow-100 border-2 border-yellow-400'
                      : 'bg-white'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium text-yellow-900">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress; 