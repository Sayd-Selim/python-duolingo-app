import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAchievements } from "../context/AchievementsContext";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import AchievementNotification from "../components/AchievementNotification";
import FriendsProgress from "../components/FriendsProgress";
import ProgressDebug from "../components/ProgressDebug";

function Home() {
  const [streak, setStreak] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [currentXP, setCurrentXP] = useState(25500);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [newAchievement, setNewAchievement] = useState(null);
  const { checkAchievements } = useAchievements();
  const { isLessonCompleted } = useProgress();
  const { user } = useAuth();

  // Эффект для показа модального окна с достижением
  useEffect(() => {
    if (streak > 0 && streak % 5 === 0) {
      setShowStreakModal(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowStreakModal(false);
        setShowConfetti(false);
      }, 3000);
    }
  }, [streak]);

  // Эффект для проверки повышения уровня
  useEffect(() => {
    const newLevel = Math.floor(currentXP / 10000) + 1;
    if (newLevel > userLevel) {
      setUserLevel(1);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [currentXP]);

  // Эффект для проверки достижений
  useEffect(() => {
    const stats = {
      lessonsCompleted: 0, // Будет обновлено когда добавим логику подсчета
      currentStreak: streak,
      totalXp: currentXP,
    };
    checkAchievements(stats);
  }, [streak, currentXP]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=" via-white to-gray-50">
      {/* Уведомление о новом достижении */}
      <AnimatePresence>{newAchievement && <AchievementNotification achievement={newAchievement} onClose={() => setNewAchievement(null)} />}</AnimatePresence>

      {/* Конфетти */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth }}
                animate={{
                  y: window.innerHeight + 100,
                  x: Math.random() * window.innerWidth,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: 0,
                }}
                className="absolute text-2xl"
              >
                {["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно с достижением */}
      <AnimatePresence>
        {showStreakModal && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-bold">Поздравляем!</h3>
                <p>Вы достигли {streak} дней подряд!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно повышения уровня */}
      {/* <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-2xl shadow-2xl text-center">
              <span className="text-6xl mb-4 block">🎉</span>
              <h2 className="text-3xl font-bold mb-2">Поздравляем!</h2>
              <p className="text-xl">Вы достигли {userLevel} уровня!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Шапка */}
      {/* <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">🐍 Python Программирование</h1>
              <div className="h-8 w-px bg-gradient-to-b from-gray-200 to-transparent"></div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Уровень:</span>
                <span className="text-sm font-semibold text-green-600">{userLevel}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-semibold text-green-600">{streak}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Всего XP:</span>
                  <span className="text-sm font-semibold text-green-600">{currentXP}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Цель:</span>
                  <span className="text-sm font-semibold text-green-600">{dailyGoal} XP</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center ring-2 ring-green-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <span className="text-white text-lg group-hover:scale-110 transition-transform">🐍</span>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок курса */}
        {/* <div className="flex justify-center mb-12">
          <div className="inline-flex items-center space-x-3 px-8 py-3 rounded-xl border border-green-200 bg-green-50 shadow-sm">
            <span className="text-2xl">🐍</span>
            <span className="text-lg font-semibold text-green-700">Python Курс</span>
          </div>
        </div> */}

        {/* Контент вкладки */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 py-2"
              >
                Изучайте Python с нуля
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-lg max-w-2xl mx-auto"
              >
                Python - это универсальный язык программирования, который отлично подходит для начинающих. 
                В этом курсе вы научитесь основам программирования, работе с данными и созданию собственных проектов.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-800 text-xl mb-6 flex items-center">
                  <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 text-lg text-white shadow-sm">
                    📚
                  </span>
                  Что вы изучите:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Основы Python и синтаксис
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Работа с переменными и типами данных
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Условные операторы и циклы
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Функции и объектно-ориентированное программирование
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-gray-800 text-xl mb-6 flex items-center">
                  <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mr-3 text-lg text-white shadow-sm">
                    👥
                  </span>
                  Для кого этот курс:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Начинающие программисты
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Студенты технических специальностей
                  </li>
                  <li className="flex items-center text-gray-600 group">
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                    Все, кто хочет освоить программирование
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Уровни курса */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }} 
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Уровни обучения</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 1, title: "Начальный уровень", description: "Основы Python", lessons: 5, color: "from-green-500 to-emerald-500" },
                  { id: 2, title: "Средний уровень", description: "Продвинутые темы", lessons: 5, color: "from-blue-500 to-indigo-500" },
                  { id: 3, title: "Продвинутый уровень", description: "ООП и проекты", lessons: 5, color: "from-purple-500 to-pink-500" }
                ].map((level, index) => (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="group"
                  >
                    <Link
                      to={`/level/${level.id}`}
                      className="block bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all shadow-sm hover:shadow-md p-6"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${level.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <span className="text-white text-xl font-bold">{level.id}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-2">{level.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{level.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{level.lessons} уроков</span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">Перейти →</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center mt-8">
              <Link
                to="/python-course"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-sm hover:shadow-md inline-flex items-center space-x-2 group"
              >
                <span>🐍 Начать изучение Python</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

       
        
      </main>
    </motion.div>
  );
}

export default Home;
