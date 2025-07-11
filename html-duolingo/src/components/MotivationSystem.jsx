import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotivation } from '../context/MotivationContext';

const MotivationSystem = () => {
  const { motivationData, updateStreak, updateWeeklyChallenges, updateSeasonalEvents, updateCompetitions, unlockReward } = useMotivation();
  const [activeTab, setActiveTab] = useState('streak');

  // Мотивирующие сообщения
  const motivationalMessages = [
    {
      text: "Не сдавайся! Каждый эксперт когда-то был новичком. Я тоже начинал с простых HTML-тегов.",
      author: "Марк Цукерберг",
      role: "Основатель Facebook"
    },
    {
      text: "Успех — это не случайность. Это ежедневная работа над собой. Каждый день делай хотя бы один шаг вперед.",
      author: "Джек Дорси",
      role: "Основатель Twitter"
    },
    {
      text: "Верстальщик — это как художник. Сначала ты учишься держать кисть, потом создаешь шедевры.",
      author: "Тим Бернерс-Ли",
      role: "Создатель World Wide Web"
    },
    {
      text: "Каждая ошибка — это не провал, а шаг к совершенству. Не бойся ошибаться!",
      author: "Линус Торвальдс",
      role: "Создатель Linux"
    },
    {
      text: "Код — это не просто набор символов. Это твой способ изменить мир. Начни с малого, мечтай о великом!",
      author: "Стив Джобс",
      role: "Сооснователь Apple"
    },
    {
      text: "В программировании нет предела совершенству. Каждый день — новая возможность стать лучше.",
      author: "Билл Гейтс",
      role: "Основатель Microsoft"
    },
    {
      text: "Твой первый сайт может быть простым, но он — начало большого пути. Гордись каждым своим проектом!",
      author: "Джефф Безос",
      role: "Основатель Amazon"
    },
    {
      text: "Верстка — это как сборка конструктора. Сначала кажется сложным, но потом становится увлекательным!",
      author: "Илон Маск",
      role: "CEO Tesla и SpaceX"
    },
    {
      text: "Не сравнивай свой первый день с чьим-то последним. У каждого свой путь к успеху.",
      author: "Сергей Брин",
      role: "Сооснователь Google"
    }
  ];

  // Получение случайного мотивирующего сообщения
  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  const currentMessage = getRandomMessage();

  // Ежедневные стрики
  const streakData = {
    currentStreak: motivationData.streak.current,
    longestStreak: motivationData.streak.longest,
    nextReward: 5,
    streakHistory: motivationData.streak.history
  };

  // Недельные вызовы
  const weeklyChallenges = motivationData.weeklyChallenges.length > 0 ? motivationData.weeklyChallenges : [
    {
      id: 1,
      title: 'Мастер HTML',
      description: 'Выполните 10 упражнений по HTML',
      progress: 0,
      total: 10,
      reward: '500 XP',
      deadline: '2024-03-10'
    },
    {
      id: 2,
      title: 'Скоростной кодер',
      description: 'Решите 5 задач менее чем за 30 секунд',
      progress: 0,
      total: 5,
      reward: '300 XP',
      deadline: '2024-03-10'
    }
  ];

  // Сезонные события
  const seasonalEvents = motivationData.seasonalEvents.length > 0 ? motivationData.seasonalEvents : [
    {
      id: 1,
      title: 'Весенний марафон',
      description: 'Выполняйте задания каждый день в течение весны',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      progress: 0,
      total: 90,
      rewards: ['Специальный бейдж', '1000 XP', 'Премиум доступ']
    }
  ];

  // Соревнования
  const competitions = motivationData.competitions.length > 0 ? motivationData.competitions : [
    {
      id: 1,
      title: 'Турнир верстальщиков',
      description: 'Соревнуйтесь с другими учениками в создании лучшей веб-страницы',
      participants: 0,
      prize: '2000 XP',
      deadline: '2024-03-15',
      leaderboard: []
    }
  ];

  // Система наград
  const rewards = motivationData.rewards.length > 0 ? motivationData.rewards : [
    {
      id: 1,
      title: 'Начинающий верстальщик',
      description: 'Выполните первые 10 упражнений',
      icon: '🎯',
      unlocked: false
    },
    {
      id: 2,
      title: 'Недельный стрик',
      description: 'Занимайтесь 7 дней подряд',
      icon: '🔥',
      unlocked: false
    },
    {
      id: 3,
      title: 'Скоростной кодер',
      description: 'Решите 5 задач менее чем за 30 секунд',
      icon: '⚡',
      unlocked: false
    }
  ];

  // Обработчики событий
  const handleStreakUpdate = (completed) => {
    updateStreak(completed);
  };

  const handleChallengeProgress = (challengeId, progress) => {
    updateWeeklyChallenges(challengeId, progress);
  };

  const handleEventProgress = (eventId, progress) => {
    updateSeasonalEvents(eventId, progress);
  };

  const handleCompetitionPoints = (competitionId, points) => {
    updateCompetitions(competitionId, points);
  };

  const handleRewardUnlock = (rewardId) => {
    unlockReward(rewardId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Мотивирующий блок */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <div className="text-4xl">💪</div>
          <div>
            <p className="text-xl font-medium mb-2">{currentMessage.text}</p>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{currentMessage.author}</span>
              <span className="text-blue-100">•</span>
              <span className="text-blue-100">{currentMessage.role}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Система мотивации</h1>

      {/* Навигация по разделам */}
      <div className="flex space-x-4 mb-8">
        {['streak', 'weekly', 'seasonal', 'competitions', 'rewards'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab === 'streak' && 'Стрики'}
            {tab === 'weekly' && 'Вызовы'}
            {tab === 'seasonal' && 'События'}
            {tab === 'competitions' && 'Соревнования'}
            {tab === 'rewards' && 'Награды'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'streak' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Ежедневные стрики</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🔥</div>
              <div>
                <p className="text-2xl font-bold">{streakData.currentStreak} дней</p>
                <p className="text-gray-600">Текущий стрик</p>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {streakData.streakHistory.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center ${
                    day.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {day.completed ? '✓' : '×'}
                </div>
              ))}
            </div>
            <button
              onClick={() => handleStreakUpdate(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Отметить сегодняшний прогресс
            </button>
          </motion.div>
        )}

        {activeTab === 'weekly' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Недельные вызовы</h2>
            {weeklyChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{challenge.title}</h3>
                    <p className="text-gray-600">{challenge.description}</p>
                  </div>
                  <span className="text-blue-500 font-semibold">{challenge.reward}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Прогресс: {challenge.progress}/{challenge.total}
                </p>
                <button
                  onClick={() => handleChallengeProgress(challenge.id, challenge.progress + 1)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Отметить прогресс
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'seasonal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Сезонные события</h2>
            {seasonalEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(event.progress / event.total) * 100}%` }}
                  />
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Награды:</h4>
                  <ul className="list-disc list-inside">
                    {event.rewards.map((reward, index) => (
                      <li key={index} className="text-gray-600">{reward}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleEventProgress(event.id, event.progress + 1)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Отметить прогресс
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'competitions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Соревнования</h2>
            {competitions.map((competition) => (
              <div key={competition.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
                <p className="text-gray-600 mb-4">{competition.description}</p>
                <div className="mb-4">
                  <p className="text-blue-500 font-semibold">Приз: {competition.prize}</p>
                  <p className="text-gray-500">Участников: {competition.participants}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Таблица лидеров:</h4>
                  {competition.leaderboard.map((player) => (
                    <div key={player.rank} className="flex justify-between items-center py-2">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-blue-500">{player.points} очков</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleCompetitionPoints(competition.id, 100)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Добавить очки
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'rewards' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <h2 className="text-2xl font-semibold col-span-2 mb-4">Награды</h2>
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`bg-white rounded-xl shadow-lg p-6 ${
                  reward.unlocked ? 'border-2 border-green-500' : 'border-2 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{reward.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold">{reward.title}</h3>
                    <p className="text-gray-600">{reward.description}</p>
                  </div>
                </div>
                {reward.unlocked ? (
                  <div className="mt-4 text-green-500 font-semibold">Получено!</div>
                ) : (
                  <button
                    onClick={() => handleRewardUnlock(reward.id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Разблокировать
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotivationSystem; 