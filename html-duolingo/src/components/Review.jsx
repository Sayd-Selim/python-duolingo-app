import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Review = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const cards = [
    {
      question: 'Что такое HTML?',
      answer: 'HTML (HyperText Markup Language) - это язык разметки, используемый для создания веб-страниц.',
      category: 'Основы'
    },
    {
      question: 'Какой тег используется для создания заголовка?',
      answer: 'Теги <h1> - <h6> используются для создания заголовков разного уровня.',
      category: 'Теги'
    },
    {
      question: 'Как создать параграф в HTML?',
      answer: 'Для создания параграфа используется тег <p>.',
      category: 'Теги'
    }
  ];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Повторение</h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Карточка {currentCard + 1} из {cards.length}
              </span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {cards[currentCard].category}
              </span>
            </div>

            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gray-50 rounded-lg p-6 mb-6"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {cards[currentCard].question}
              </h3>
              {showAnswer && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600"
                >
                  {cards[currentCard].answer}
                </motion.p>
              )}
            </motion.div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Назад
              </button>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {showAnswer ? 'Скрыть ответ' : 'Показать ответ'}
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Далее
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentCard ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review; 