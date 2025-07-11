import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import { motion } from 'framer-motion';

const LessonNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getNextLesson, getPreviousLesson } = useNavigation();

  const nextLesson = getNextLesson(location.pathname);
  const previousLesson = getPreviousLesson(location.pathname);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white rounded-full shadow-lg p-2 z-40">
      {previousLesson && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(previousLesson.path)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <span>←</span>
          <span className="hidden sm:inline">Предыдущий урок</span>
        </motion.button>
      )}

      {nextLesson && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(nextLesson.path)}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <span className="hidden sm:inline">Следующий урок</span>
          <span>→</span>
        </motion.button>
      )}
    </div>
  );
};

export default LessonNavigation; 