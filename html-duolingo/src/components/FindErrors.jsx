import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import CodeBlock from './CodeBlock';

function FindErrors({ code, errors, onComplete }) {
  const [selectedLines, setSelectedLines] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleLineClick = (lineNumber) => {
    if (selectedLines.includes(lineNumber)) {
      setSelectedLines(selectedLines.filter(line => line !== lineNumber));
    } else {
      setSelectedLines([...selectedLines, lineNumber]);
    }
  };

  const checkAnswer = () => {
    const isCorrect = selectedLines.length === errors.length &&
      errors.every(error => selectedLines.includes(error));
    
    setFeedback(isCorrect);
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 z-10">
          {code.split('\n').map((_, index) => (
            <div
              key={index}
              className={`h-6 cursor-pointer ${
                selectedLines.includes(index + 1) ? 'bg-yellow-500 bg-opacity-30' : ''
              }`}
              onClick={() => handleLineClick(index + 1)}
            />
          ))}
        </div>
        <div className="pl-8">
          <CodeBlock code={code} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={checkAnswer}
          className="btn-primary"
          disabled={selectedLines.length === 0}
        >
          Проверить
        </button>
        <span className="text-sm text-gray-500">
          Выбрано строк: {selectedLines.length}
        </span>
      </div>

      {feedback !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center ${
            feedback ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {feedback ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
          )}
          <span>
            {feedback
              ? "Отлично! Вы нашли все ошибки!"
              : "Попробуйте еще раз! Не все ошибки найдены."}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default FindErrors; 