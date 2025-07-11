import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = {
  correct: [
    "Отлично! Ты на верном пути! 🎯",
    "Супер! HTML становится твоим другом! 🌟",
    "Потрясающе! Ты настоящий HTML-мастер! 👑",
    "Ого! Да ты профи в h1! 🚀",
    "Браво! Ты делаешь это правильно! 💪"
  ],
  incorrect: [
    "Не переживай, попробуй еще раз! 💪",
    "Каждая ошибка - шаг к успеху! 🌱",
    "Ты почти у цели! Попробуй еще раз! 🎯",
    "Не сдавайся, у тебя все получится! ⭐",
    "HTML требует практики, продолжаем! 📚"
  ],
  levelComplete: [
    "Потрясающе! Ты завершил уровень! 🎉",
    "Ты на пути к мастерству! 🌟",
    "Отличная работа! Продолжай в том же духе! 💪",
    "HTML покоряется тебе! 👑",
    "Ты делаешь большие успехи! 🚀"
  ]
};

function MotivationalMessage({ type, onComplete }) {
  const messageList = messages[type] || messages.correct;
  const randomMessage = messageList[Math.floor(Math.random() * messageList.length)];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="bg-white rounded-lg shadow-xl p-6 text-center">
          <p className="text-xl font-bold mb-4">{randomMessage}</p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="btn-primary"
            >
              Продолжить
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MotivationalMessage; 