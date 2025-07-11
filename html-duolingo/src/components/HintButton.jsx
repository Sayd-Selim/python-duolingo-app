import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHints } from '../context/HintsContext';

const HintButton = ({ hintId }) => {
  const [showHint, setShowHint] = useState(false);
  const { useHint, getHint, canUseHint, getRemainingHints } = useHints();
  const hint = getHint(hintId);
  const remainingHints = getRemainingHints(hintId);

  const handleClick = () => {
    if (canUseHint(hintId)) {
      useHint(hintId);
      setShowHint(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={!canUseHint(hintId)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
          canUseHint(hintId)
            ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span className="text-lg">{hint.icon}</span>
        <span>Подсказка</span>
        {remainingHints > 0 && (
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
            {remainingHints}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{hint.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900">{hint.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{hint.content}</p>
              </div>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HintButton; 