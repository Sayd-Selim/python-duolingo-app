import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAchievements } from "../context/AchievementsContext";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import AchievementNotification from "../components/AchievementNotification";

function Courses() {
  const [streak, setStreak] = useState(0);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [currentXP, setCurrentXP] = useState(25500);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [userLevel, setUserLevel] = useState(1);
  const [newAchievement, setNewAchievement] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const courses = [
    // {
    //   name: "Python",
    //   icon: "🐍",
    //   colors: "from-green-500 to-emerald-600",
    //   description: "Изучите Python с нуля до продвинутого уровня",
    //   features: ["Основы синтаксиса", "ООП", "Работа с данными", "Web-разработка"],
    //   target: "Начинающие программисты",
    //   path: "/python-course",
    //   lessons: 15,
    //   duration: "8-12 недель",
    //   difficulty: "Начальный"
    // },
    // {
    //   name: "HTML",
    //   icon: "🌐",
    //   colors: "from-orange-500 to-red-600",
    //   description: "Освойте HTML для создания веб-страниц",
    //   features: ["Структура документа", "Семантика", "Формы", "Мультимедиа"],
    //   target: "Веб-разработчики",
    //   path: "/html-course",
    //   lessons: 15,
    //   duration: "4-6 недель",
    //   difficulty: "Начальный"
    // },
    // {
    //   name: "CSS",
    //   icon: "🎨",
    //   colors: "from-blue-500 to-indigo-600",
    //   description: "Изучите CSS для стилизации веб-страниц",
    //   features: ["Селекторы", "Flexbox", "Grid", "Анимации"],
    //   target: "Веб-дизайнеры",
    //   path: "/css-course",
    //   lessons: 15,
    //   duration: "6-8 недель",
    //   difficulty: "Начальный"
    // },
    // {
    //   name: "JavaScript",
    //   icon: "⚡",
    //   colors: "from-yellow-500 to-orange-600",
    //   description: "Освойте JavaScript для интерактивности",
    //   features: ["ES6+", "DOM", "Асинхронность", "Модули"],
    //   target: "Frontend разработчики",
    //   path: "/javascript-course",
    //   lessons: 15,
    //   duration: "8-10 недель",
    //   difficulty: "Средний"
    // },
    {
      name: "JavaScript библиотеки",
      icon: "🔧",
      colors: "from-purple-500 to-pink-600",
      description: "Создавайте библиотеки с нуля, понимая их архитектуру",
      features: ["Архитектура библиотек", "React с нуля", "Vue с нуля", "Redux с нуля"],
      target: "Продвинутые разработчики",
      path: "/js-libraries-course",
      lessons: 15,
      duration: "10-12 недель",
      difficulty: "Продвинутый"
    },
    {
      name: "Библиотеки с нуля",
      icon: "🏗️",
      colors: "from-indigo-500 to-blue-600",
      description: "Изучите оригиналы популярных библиотек и создавайте свои",
      features: ["Анализ исходного кода", "Архитектурные паттерны", "Создание собственных библиотек", "Оптимизация производительности"],
      target: "Разработчики, желающие углубить знания",
      path: "/libraries-from-scratch",
      lessons: 20,
      duration: "12-16 недель",
      difficulty: "Продвинутый"
    },
    // {
    //   name: "Криптотрейдинг",
    //   icon: "📈",
    //   colors: "from-green-500 to-emerald-600",
    //   description: "Торговля криптовалютами с японскими свечами",
    //   features: ["Японские свечи", "Технический анализ", "Торговые стратегии", "Собственная платформа"],
    //   target: "Трейдеры и инвесторы",
    //   path: "/crypto-trading-course",
    //   lessons: 10,
    //   duration: "8-10 недель",
    //   difficulty: "Продвинутый"
    // }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="via-white to-gray-50">
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

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Наши курсы
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-xl max-w-3xl mx-auto"
          >
            Выберите курс, который подходит именно вам. Каждый курс разработан для начинающих 
            и включает практические задания для закрепления знаний.
          </motion.p>
        </div>

        {/* Выбор курсов */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Заголовок курса */}
              <div className={`bg-gradient-to-r ${course.colors} p-8 text-white text-center`}>
                <div className="text-6xl mb-4">{course.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{course.name}</h2>
                <p className="text-lg opacity-90">{course.description}</p>
              </div>

              {/* Содержимое курса */}
              <div className="p-8">
                {/* Статистика курса */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{course.lessons}</div>
                    <div className="text-sm text-gray-600">Уроков</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{course.duration}</div>
                    <div className="text-sm text-gray-600">Длительность</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{course.difficulty}</div>
                    <div className="text-sm text-gray-600">Уровень</div>
                  </div>
                </div>

                {/* Что вы изучите */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-r ${course.colors} flex items-center justify-center mr-3 text-sm text-white`}>
                      📚
                    </span>
                    Что вы изучите:
                  </h3>
                  <ul className="space-y-3">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className={`w-2 h-2 bg-gradient-to-r ${course.colors} rounded-full mr-3`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Для кого курс */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 text-xl mb-4 flex items-center">
                    <span className={`w-8 h-8 rounded-lg bg-gradient-to-r ${course.colors} flex items-center justify-center mr-3 text-sm text-white`}>
                      👥
                    </span>
                    Для кого этот курс:
                  </h3>
                  <p className="text-gray-600">{course.target}</p>
                </div>

                {/* Кнопка начала */}
                <Link
                  to={course.path}
                  className={`w-full py-4 bg-gradient-to-r ${course.colors} hover:opacity-90 text-white rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <span>{course.icon} Начать изучение {course.name}</span>
                  <span className="text-xl">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Почему стоит выбрать наши курсы?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📖</div>
              <h4 className="font-semibold text-gray-800 mb-2">Структурированное обучение</h4>
              <p className="text-gray-600">Пошаговые уроки от простого к сложному</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💻</div>
              <h4 className="font-semibold text-gray-800 mb-2">Практические задания</h4>
              <p className="text-gray-600">Закрепляйте знания на реальных примерах</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="font-semibold text-gray-800 mb-2">Система достижений</h4>
              <p className="text-gray-600">Отслеживайте прогресс и получайте награды</p>
            </div>
          </div>
        </motion.div>

        {/* Кнопка возврата */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </main>
    </motion.div>
  );
}

export default Courses; 