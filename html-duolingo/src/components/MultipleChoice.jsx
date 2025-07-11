import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function MultipleChoice({ question, options, answer, explanation, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setShowFeedback(true);
    onAnswer(option === answer);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question}</p>
      
      <div className="space-y-2">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option)}
            disabled={showFeedback}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              showFeedback
                ? option === answer
                  ? 'bg-green-50 border-green-500'
                  : option === selected
                  ? 'bg-red-50 border-red-500'
                  : 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-green-500'
            }`}
          >
            <div className="flex items-center space-x-3">
              {showFeedback && option === answer && (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
              {showFeedback && option === selected && option !== answer && (
                <XCircleIcon className="h-5 w-5 text-red-500" />
              )}
              <span>{option}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            selected === answer ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <p className="text-sm">
            {selected === answer
              ? "Правильно! " + explanation
              : "Неправильно. " + explanation}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default MultipleChoice; 