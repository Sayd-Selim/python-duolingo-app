import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Certification = () => {
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const levels = [
    {
      id: 'beginner',
      name: 'Начальный уровень',
      description: 'Основы HTML и CSS',
      price: '1999₽',
      duration: '2 часа',
      requirements: [
        'Завершение базового курса HTML',
        'Завершение базового курса CSS',
        'Минимум 80% правильных ответов в тестах'
      ]
    },
    {
      id: 'intermediate',
      name: 'Средний уровень',
      description: 'Продвинутый HTML, CSS и основы JavaScript',
      price: '2999₽',
      duration: '3 часа',
      requirements: [
        'Сертификат начального уровня',
        'Завершение продвинутого курса HTML/CSS',
        'Завершение базового курса JavaScript',
        'Минимум 85% правильных ответов в тестах'
      ]
    },
    {
      id: 'advanced',
      name: 'Продвинутый уровень',
      description: 'Продвинутый JavaScript и веб-разработка',
      price: '3999₽',
      duration: '4 часа',
      requirements: [
        'Сертификат среднего уровня',
        'Завершение продвинутого курса JavaScript',
        'Завершение курса по веб-разработке',
        'Минимум 90% правильных ответов в тестах'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Сертификация
        </h1>
        <p className="text-xl text-gray-600">
          Получите официальный сертификат и подтвердите свои навыки
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all ${
              selectedLevel === level.id
                ? 'ring-2 ring-indigo-600 scale-105'
                : 'hover:shadow-xl'
            }`}
            onClick={() => setSelectedLevel(level.id)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {level.name}
              </h3>
              <p className="text-gray-600 mb-4">{level.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  {level.price}
                </span>
                <span className="text-sm text-gray-500">
                  Длительность: {level.duration}
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Требования:</h4>
                <ul className="space-y-1">
                  {level.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full mt-6 px-4 py-2 rounded-lg transition-colors ${
                  selectedLevel === level.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {selectedLevel === level.id
                  ? 'Выбрано'
                  : 'Выбрать уровень'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedLevel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Подготовка к сертификации
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Что включено:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">📚</span>
                    <span>Доступ к подготовительным материалам</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">✍️</span>
                    <span>Пробный экзамен</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">🎓</span>
                    <span>Официальный сертификат</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">🔍</span>
                    <span>Проверка результатов экспертами</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Процесс сертификации:
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">1️⃣</span>
                    <span>Выберите уровень сертификации</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">2️⃣</span>
                    <span>Изучите подготовительные материалы</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">3️⃣</span>
                    <span>Пройдите пробный экзамен</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-2xl">4️⃣</span>
                    <span>Запишитесь на основной экзамен</span>
                  </li>
                </ol>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Начать подготовку
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Certification; 