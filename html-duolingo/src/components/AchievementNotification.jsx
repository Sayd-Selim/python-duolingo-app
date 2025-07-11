import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementNotification = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-50"
    >
      <div className="flex items-center space-x-3">
        <div className="text-4xl animate-bounce">{achievement.icon}</div>
        <div>
          <h3 className="font-bold text-gray-900">Новое достижение!</h3>
          <p className="text-sm text-gray-600">{achievement.title}</p>
          <p className="text-xs text-gray-500 mt-1">+{achievement.xp} XP</p>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default AchievementNotification; 