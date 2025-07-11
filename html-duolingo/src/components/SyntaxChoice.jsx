import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function SyntaxChoice({ question, options, correctOption, explanation, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (option) => {
    if (feedback !== null) return;
    setSelectedOption(option);
    const isCorrect = option === correctOption;
    setFeedback(isCorrect);
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg mb-4">{question}</p>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option)}
            className={`p-4 rounded-lg text-left font-mono text-sm ${
              selectedOption === option
                ? feedback
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-red-100 border-2 border-red-500"
                : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <pre className="whitespace-pre-wrap">{option}</pre>
          </motion.button>
        ))}
      </div>

      {feedback !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            feedback ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <div className="flex items-center mb-2">
            {feedback ? (
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
            )}
            <span className="font-medium">
              {feedback ? "Правильно!" : "Неправильно!"}
            </span>
          </div>
          <p className="text-gray-700">{explanation}</p>
        </motion.div>
      )}
    </div>
  );
}

export default SyntaxChoice; 