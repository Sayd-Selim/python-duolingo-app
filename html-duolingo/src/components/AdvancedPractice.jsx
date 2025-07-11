import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdvancedPractice = () => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [exerciseType, setExerciseType] = useState('interactive');

  const exerciseTypes = [
    { id: 'interactive', title: 'Интерактивные упражнения', icon: '🎮' },
    { id: 'error-fixing', title: 'Исправление ошибок', icon: '🔧' },
    { id: 'projects', title: 'Проектные задания', icon: '📝' }
  ];

  const difficultyLevels = [
    { id: 'beginner', title: 'Начинающий', color: 'bg-green-500' },
    { id: 'intermediate', title: 'Средний', color: 'bg-yellow-500' },
    { id: 'advanced', title: 'Продвинутый', color: 'bg-red-500' }
  ];

  const exercises = {
    interactive: {
      beginner: [
        {
          id: 1,
          title: 'Создание простой формы',
          description: 'Создайте форму с полями ввода имени и email',
          points: 10
        },
        {
          id: 2,
          title: 'Создание навигационного меню',
          description: 'Создайте горизонтальное меню с 4 пунктами',
          points: 15
        }
      ],
      intermediate: [
        {
          id: 3,
          title: 'Создание карточки товара',
          description: 'Создайте карточку товара с изображением, описанием и ценой',
          points: 20
        }
      ],
      advanced: [
        {
          id: 4,
          title: 'Создание галереи изображений',
          description: 'Создайте галерею с сеткой изображений и модальным окном',
          points: 30
        }
      ]
    },
    'error-fixing': {
      beginner: [
        {
          id: 1,
          title: 'Исправление структуры HTML',
          description: 'Найдите и исправьте ошибки в структуре HTML документа',
          code: '<html>\n<body>\n<h1>Заголовок</h1>\n<p>Параграф</p>\n</html>',
          points: 10
        }
      ],
      intermediate: [
        {
          id: 2,
          title: 'Исправление форм',
          description: 'Исправьте ошибки в форме обратной связи',
          code: '<form>\n<input type="text">\n<button>Отправить</button>\n</form>',
          points: 15
        }
      ],
      advanced: [
        {
          id: 3,
          title: 'Комплексное исправление',
          description: 'Исправьте все ошибки в сложной HTML структуре',
          points: 25
        }
      ]
    },
    projects: {
      beginner: [
        {
          id: 1,
          title: 'Личная страница',
          description: 'Создайте простую личную страницу с информацией о себе',
          requirements: ['Заголовок', 'Фото', 'Список интересов', 'Контактная информация'],
          points: 30
        }
      ],
      intermediate: [
        {
          id: 2,
          title: 'Блог',
          description: 'Создайте страницу блога с несколькими статьями',
          requirements: ['Шапка сайта', 'Навигация', 'Список статей', 'Форма подписки'],
          points: 45
        }
      ],
      advanced: [
        {
          id: 3,
          title: 'Интернет-магазин',
          description: 'Создайте главную страницу интернет-магазина',
          requirements: ['Каталог товаров', 'Корзина', 'Фильтры', 'Поиск'],
          points: 60
        }
      ]
    }
  };

  const handleExerciseSelect = (exercise) => {
    setCurrentExercise(exercise);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Расширенная практика</h1>
      
      {/* Выбор типа упражнения */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {exerciseTypes.map(type => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg shadow-md ${
              exerciseType === type.id ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setExerciseType(type.id)}
          >
            <span className="text-2xl mr-2">{type.icon}</span>
            {type.title}
          </motion.button>
        ))}
      </div>

      {/* Выбор уровня сложности */}
      <div className="flex space-x-4 mb-8">
        {difficultyLevels.map(level => (
          <button
            key={level.id}
            className={`px-4 py-2 rounded-full ${level.color} text-white ${
              difficulty === level.id ? 'ring-2 ring-offset-2 ring-black' : ''
            }`}
            onClick={() => setDifficulty(level.id)}
          >
            {level.title}
          </button>
        ))}
      </div>

      {/* Список упражнений */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises[exerciseType][difficulty].map(exercise => (
          <motion.div
            key={exercise.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            {exercise.requirements && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Требования:</h4>
                <ul className="list-disc list-inside">
                  {exercise.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-blue-500 font-semibold">{exercise.points} очков</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleExerciseSelect(exercise)}
              >
                Начать
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно с упражнением */}
      {currentExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{currentExercise.title}</h2>
            <p className="mb-4">{currentExercise.description}</p>
            {currentExercise.code && (
              <pre className="bg-gray-100 p-4 rounded mb-4 overflow-x-auto">
                {currentExercise.code}
              </pre>
            )}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setCurrentExercise(null)}
              >
                Закрыть
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  // Здесь будет логика проверки решения
                  setCurrentExercise(null);
                }}
              >
                Проверить решение
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedPractice; 