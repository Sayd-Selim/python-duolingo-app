import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Practice = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [userProgress, setUserProgress] = useState({
    completedExercises: 0,
    totalPoints: 0,
    achievements: []
  });
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    // Загрузка прогресса из localStorage
    const savedProgress = localStorage.getItem('practiceProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  const practiceTypes = [
    {
      id: 'basic',
      title: 'Базовая практика',
      icon: '📝',
      description: 'Простые упражнения для закрепления основ',
      progress: userProgress.basicProgress || 0
    },
    {
      id: 'advanced',
      title: 'Расширенная практика',
      icon: '🚀',
      description: 'Сложные задания и упражнения',
      progress: userProgress.advancedProgress || 0
    },
    {
      id: 'projects',
      title: 'Проектные задания',
      icon: '🎯',
      description: 'Создание реальных веб-страниц',
      progress: userProgress.projectProgress || 0
    }
  ];

  const achievements = [
    {
      id: 'first_exercise',
      title: 'Первые шаги',
      description: 'Выполните первое упражнение',
      icon: '🎯',
      unlocked: userProgress.completedExercises > 0
    },
    {
      id: 'master_coder',
      title: 'Мастер кода',
      description: 'Наберите 100 очков',
      icon: '🏆',
      unlocked: userProgress.totalPoints >= 100
    },
    {
      id: 'perfect_score',
      title: 'Идеальный результат',
      description: 'Выполните упражнение без ошибок',
      icon: '⭐',
      unlocked: userProgress.achievements.includes('perfect_score')
    }
  ];

  const helpContent = {
    basic: {
      title: 'Как работать с базовой практикой',
      steps: [
        'Выберите упражнение из списка',
        'Изучите требования к заданию',
        'Напишите код в редакторе',
        'Нажмите "Запустить код" для проверки',
        'Используйте подсказки, если застряли'
      ]
    },
    advanced: {
      title: 'Расширенная практика',
      steps: [
        'Более сложные задания для продвинутых пользователей',
        'Создание полноценных веб-страниц',
        'Работа с формами и интерактивными элементами',
        'Интеграция с CSS и JavaScript'
      ]
    },
    projects: {
      title: 'Проектные задания',
      steps: [
        'Создание реальных веб-проектов',
        'Работа над полноценными сайтами',
        'Применение всех изученных навыков',
        'Создание портфолио'
      ]
    }
  };

  const handleTypeSelect = (type) => {
    switch (type) {
      case 'basic':
        setSelectedType(type);
        break;
      case 'advanced':
        navigate('/advanced-practice');
        break;
      case 'projects':
        navigate('/projects');
        break;
      default:
        setSelectedType(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Практика</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showHelp ? 'Скрыть помощь' : 'Показать помощь'}
          </button>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-sm text-gray-600">Очки</div>
            <div className="text-2xl font-bold text-indigo-600">{userProgress.totalPoints}</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="text-sm text-gray-600">Выполнено</div>
            <div className="text-2xl font-bold text-green-600">{userProgress.completedExercises}</div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Помощь</h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                {Object.entries(helpContent).map(([type, content]) => (
                  <div key={type}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {content.title}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {content.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Достижения */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Достижения</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-lg p-4 shadow-md ${
                achievement.unlocked ? 'border-2 border-green-500' : 'opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Типы практики */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {practiceTypes.map((type) => (
          <motion.div
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer"
            onClick={() => handleTypeSelect(type.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{type.icon}</span>
              <h2 className="text-xl font-semibold text-gray-800">{type.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${type.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Прогресс: {type.progress}%</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedType === 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BasicPractice
              onComplete={(points) => {
                const newProgress = {
                  ...userProgress,
                  completedExercises: userProgress.completedExercises + 1,
                  totalPoints: userProgress.totalPoints + points
                };
                setUserProgress(newProgress);
                localStorage.setItem('practiceProgress', JSON.stringify(newProgress));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BasicPractice = ({ onComplete }) => {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>Моя первая страница</title>
</head>
<body>
  <!-- Начните писать код здесь -->
</body>
</html>`);
  const [output, setOutput] = useState('');
  const [hints, setHints] = useState([
    'Используйте тег <h1> для заголовка',
    'Добавьте параграф с помощью тега <p>',
    'Создайте список с помощью тегов <ul> и <li>'
  ]);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const currentTask = {
    title: 'Создайте простую HTML страницу',
    description: 'Создайте страницу с заголовком, параграфом и списком',
    requirements: [
      'Добавьте заголовок первого уровня',
      'Добавьте параграф текста',
      'Создайте маркированный список из 3 элементов'
    ]
  };

  const handleRunCode = () => {
    try {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(code);
      iframe.contentDocument.close();
      setOutput(iframe.contentDocument.body.innerHTML);
      document.body.removeChild(iframe);
    } catch (error) {
      setOutput('Ошибка: ' + error.message);
    }
  };

  const checkRequirements = () => {
    const checks = currentTask.requirements.map(req => {
      const passed = code.includes(req.toLowerCase());
      return { requirement: req, passed };
    });
    return checks;
  };

  const handleComplete = () => {
    const checks = checkRequirements();
    const allPassed = checks.every(check => check.passed);
    if (allPassed) {
      onComplete(10); // Начисляем 10 очков за выполнение
    }
  };

  const handleShowHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
    setShowHint(true);
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Практическое задание</h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {currentTask.title}
            </h3>
            <p className="text-gray-600 mb-4">{currentTask.description}</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-medium text-yellow-800 mb-2">Требования:</h4>
              <ul className="list-disc list-inside text-yellow-700">
                {currentTask.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Редактор кода
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  spellCheck="false"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    handleRunCode();
                    handleComplete();
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Запустить код
                </button>
                <button
                  onClick={handleShowHint}
                  className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Показать подсказку
                </button>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Результат
                </label>
                <div
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg bg-white overflow-auto"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Проверка требований:</h4>
                <ul className="space-y-2">
                  {checkRequirements().map((check, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2"
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          check.passed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {check.passed ? '✓' : '×'}
                      </span>
                      <span className="text-gray-700">{check.requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Hint Display */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-blue-50 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-blue-900">Подсказка {currentHintIndex + 1}/{hints.length}</h4>
                  <button
                    onClick={() => setShowHint(false)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-blue-700">{hints[currentHintIndex]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Practice; 