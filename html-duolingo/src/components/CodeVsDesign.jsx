import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeVsDesign = () => {
  const [userCode, setUserCode] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const levels = [
    {
      title: "Простая карточка",
      description: "Создайте карточку с заголовком и текстом",
      design: (
        <div className="w-64 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Заголовок карточки</h2>
          <p className="text-gray-600">Это описание карточки. Здесь может быть любой текст.</p>
        </div>
      ),
      solution: `<div class="w-64 p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-800 mb-2">Заголовок карточки</h2>
  <p class="text-gray-600">Это описание карточки. Здесь может быть любой текст.</p>
</div>`,
      hint: "Используйте div с классами для стилизации, h2 для заголовка и p для текста"
    },
    {
      title: "Кнопка с иконкой",
      description: "Создайте кнопку с иконкой и текстом",
      design: (
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <span className="mr-2">🚀</span>
          Начать
        </button>
      ),
      solution: `<button class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
  <span class="mr-2">🚀</span>
  Начать
</button>`,
      hint: "Используйте button с flex для выравнивания иконки и текста"
    },
    {
      title: "Профиль пользователя",
      description: "Создайте карточку профиля с аватаром и информацией",
      design: (
        <div className="w-80 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Иван Иванов</h3>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📧</span>
              ivan@example.com
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📱</span>
              +7 (999) 123-45-67
            </div>
          </div>
        </div>
      ),
      solution: `<div class="w-80 p-6 bg-white rounded-xl shadow-lg">
  <div class="flex items-center mb-4">
    <div class="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
    <div>
      <h3 class="text-lg font-semibold text-gray-800">Иван Иванов</h3>
      <p class="text-gray-500">Frontend Developer</p>
    </div>
  </div>
  <div class="space-y-2">
    <div class="flex items-center text-gray-600">
      <span class="mr-2">📧</span>
      ivan@example.com
    </div>
    <div class="flex items-center text-gray-600">
      <span class="mr-2">📱</span>
      +7 (999) 123-45-67
    </div>
  </div>
</div>`,
      hint: "Используйте вложенные div'ы с flex для создания структуры профиля"
    }
  ];

  const checkSolution = () => {
    const normalizedUserCode = userCode.replace(/\s+/g, ' ').trim();
    const normalizedSolution = levels[currentLevel].solution.replace(/\s+/g, ' ').trim();
    setIsCorrect(normalizedUserCode === normalizedSolution);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setUserCode('');
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(currentLevel - 1);
      setUserCode('');
      setIsCorrect(null);
      setShowHint(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Код против дизайна</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Дизайн */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Дизайн</h2>
            <div className="flex justify-center items-center min-h-[300px] bg-white rounded-lg shadow-sm p-4">
              {levels[currentLevel].design}
            </div>
          </div>

          {/* Редактор кода */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ваш код</h2>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Введите ваш HTML код здесь..."
            />
            <div className="mt-4 space-x-4">
              <button
                onClick={checkSolution}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Проверить
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Подсказка
              </button>
            </div>
          </div>
        </div>

        {/* Результат и навигация */}
        <div className="mt-8">
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isCorrect ? 'Поздравляем! Код верный!' : 'Попробуйте еще раз'}
            </motion.div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg"
            >
              {levels[currentLevel].hint}
            </motion.div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={prevLevel}
              disabled={currentLevel === 0}
              className={`px-4 py-2 rounded-md ${
                currentLevel === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Предыдущий уровень
            </button>
            <span className="text-gray-600">
              Уровень {currentLevel + 1} из {levels.length}
            </span>
            <button
              onClick={nextLevel}
              disabled={currentLevel === levels.length - 1}
              className={`px-4 py-2 rounded-md ${
                currentLevel === levels.length - 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Следующий уровень
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVsDesign; 