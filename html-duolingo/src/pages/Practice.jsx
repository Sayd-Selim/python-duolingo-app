import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { getRandomTasks } from '../data/practiceTasks';

function Practice() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);
  const { user } = useAuth();
  const { completedLessons, lessonProgress, refreshUserProgress, isLessonLocked } = useProgress();

  console.log('🔄 Practice компонент перерендерился:', {
    completedLessons,
    lessonProgress,
    user: user?.userId
  });

  // Доступные уроки (соответствуют реальным урокам курса)
  const availableLessons = useMemo(() => [
    {
      id: 1,
      title: 'Урок 1: Введение в Python',
      description: 'Основы Python, функция print(), комментарии',
      topics: ['print()', 'комментарии', 'строки'],
      difficulty: 'Начинающий',
    },
    {
      id: 2,
      title: 'Урок 2: Переменные и ввод данных',
      description: 'Работа с переменными, функции print() и input()',
      topics: ['переменные', 'input()', 'print()'],
      difficulty: 'Начинающий',
    },
    {
      id: 3,
      title: 'Урок 3: Типы данных',
      description: 'Вы должны понимать, с чем работаешь.',
      topics: ['Числа', 'строки', 'логические значения'],
      difficulty: 'Начинающий',
    },
    {
      id: 4,
      title: 'Урок 4: Операторы и выражения',
      description: 'Математические и логические операторы',
      topics: ['математические операторы', 'логические операторы', 'выражения'],
      difficulty: 'Начинающий',
    },
    {
      id: 5,
      title: 'Урок 5: Условные операторы',
      description: 'if, elif, else - принятие решений в программе',
      topics: ['if', 'elif', 'else', 'условия'],
      difficulty: 'Начинающий',
    },
    {
      id: 6,
      title: 'Урок 6: Циклы for и while',
      description: 'Циклы, итерации, range()',
      topics: ['for', 'while', 'циклы', 'range()'],
      difficulty: 'Начинающий',
    },
    {
      id: 7,
      title: 'Урок 7: Списки в Python',
      description: 'Работа с коллекциями данных',
      topics: ['Списки', 'массивы'],
      difficulty: 'Средний',
    },
    // {
    //   id: 7,
    //   title: 'Урок 7: Словари и множества',
    //   description: 'Структуры данных Python',
    //   topics: ['словари', 'множества', 'ключи'],
    //   difficulty: 'Средний',
    // },
    // {
    //   id: 8,
    //   title: 'Урок 8: Функции',
    //   description: 'Создание и использование функций',
    //   topics: ['функции', 'параметры', 'return'],
    //   difficulty: 'Средний',
    // },
    // {
    //   id: 9,
    //   title: 'Урок 9: Работа с файлами',
    //   description: 'Чтение и запись файлов',
    //   topics: ['файлы', 'open()', 'read()', 'write()'],
    //   difficulty: 'Средний',
    // },
    // {
    //   id: 10,
    //   title: 'Урок 10: Обработка исключений',
    //   description: 'try, except, finally',
    //   topics: ['try', 'except', 'исключения'],
    //   difficulty: 'Средний',
    // },
    // {
    //   id: 11,
    //   title: 'Урок 11: Модули и пакеты',
    //   description: 'Импорт модулей, создание пакетов',
    //   topics: ['import', 'модули', 'пакеты'],
    //   difficulty: 'Средний',
    // },
    // {
    //   id: 12,
    //   title: 'Урок 12: ООП основы',
    //   description: 'Классы, объекты, наследование',
    //   topics: ['классы', 'объекты', 'наследование'],
    //   difficulty: 'Продвинутый',
    // },
    // {
    //   id: 13,
    //   title: 'Урок 13: Работа с библиотеками',
    //   description: 'Популярные библиотеки Python',
    //   topics: ['библиотеки', 'pip', 'установка'],
    //   difficulty: 'Продвинутый',
    // },
    // {
    //   id: 14,
    //   title: 'Урок 14: Практический проект',
    //   description: 'Создание реального проекта',
    //   topics: ['проект', 'интеграция', 'деплой'],
    //   difficulty: 'Продвинутый',
    // },
    // {
    //   id: 15,
    //   title: 'Урок 15: Продвинутые темы',
    //   description: 'Декораторы, генераторы, контекстные менеджеры',
    //   topics: ['декораторы', 'генераторы', 'контекст'],
    //   difficulty: 'Продвинутый',
    // }
  ], []);

  // Доступные уроки для практики (завершенные или разблокированные)
  const unlockedLessons = useMemo(() => {
    // Получаем завершенные уроки
    const completedFromArray = completedLessons || [];
    const completedFromProgress = Object.entries(lessonProgress || {})
      .filter(([lessonId, progress]) => progress >= 100)
      .map(([lessonId]) => Number(lessonId));
    
    const allCompleted = [...new Set([...completedFromArray, ...completedFromProgress])];
    
    // Получаем разблокированные уроки (уроки, которые доступны в курсе)
    const unlockedLessonIds = [];
    for (let i = 1; i <= 15; i++) { // Проверяем все уроки курса
      if (!isLessonLocked(i)) { // Если урок не заблокирован
        unlockedLessonIds.push(i);
      }
    }
    
    // Объединяем завершенные и разблокированные уроки
    const availableLessonIds = [...new Set([...allCompleted, ...unlockedLessonIds])];
    
   
    
    return availableLessons.filter(lesson => availableLessonIds.includes(lesson.id));
  }, [availableLessons, completedLessons, lessonProgress, isLessonLocked]);


  const [currentTasks, setCurrentTasks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Автоматически генерируем задачи при выборе урока
  useEffect(() => {
    if (selectedLesson && currentTasks.length === 0) {
      console.log('useEffect: Генерируем задачи для урока:', selectedLesson.id);
      generateNewTasks();
    }
  }, [selectedLesson]);

  // Генерация новых задач
  const generateNewTasks = useCallback(async () => {
    console.log('generateNewTasks вызвана, selectedLesson:', selectedLesson);
    if (!selectedLesson) {
      console.log('selectedLesson не установлен');
      return;
    }
    
    console.log('Генерируем задачи для урока:', selectedLesson.id);
    setIsGenerating(true);
    
    // Для отладки - убираем задержку
    setGenerationStep('Генерируем задачи...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем задачи из импортированного файла
    let newTasks = getRandomTasks(selectedLesson.id, 5);
    console.log('Сгенерированные задачи:', newTasks);
    
    if (!newTasks || newTasks.length === 0) {
      console.error('Не удалось сгенерировать задачи для урока:', selectedLesson.id);
      setIsGenerating(false);
      setGenerationStep('');
      return;
    }
    
    // Добавляем случайные вариации для большей реалистичности
    newTasks = newTasks.map(task => ({
      ...task,
      // Добавляем случайные комментарии или небольшие изменения
      content: task.content + (Math.random() > 0.7 ? '\n\n💡 Попробуйте решить задачу разными способами!' : ''),
      hint: task.hint + (Math.random() > 0.8 ? '\n\n🎯 Обратите внимание на детали!' : '')
    }));
    
    console.log('Финальные задачи:', newTasks);
    setCurrentTasks(newTasks);
    setCurrentTask(0);
    setIsCompleted(false);
    setShowHint(false);
    setShowAnswer(false);
    setShowInstructions(false);
    setTaskHistory([]);
    setIsGenerating(false);
    setGenerationStep('');
  }, [selectedLesson]);

  // Переход к следующей задаче
  const nextTask = () => {
    if (currentTask < currentTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setShowHint(false);
      setShowAnswer(false);
      setShowInstructions(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Переход к предыдущей задаче
  const previousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
      setShowHint(false);
      setShowAnswer(false);
      setShowInstructions(false);
    }
  };

  // Выбор урока
  const selectLesson = (lesson) => {
    console.log('Выбран урок:', lesson);
    setSelectedLesson(lesson);
  };

  // Сброс к выбору урока
  const resetToLessonSelection = () => {
    setSelectedLesson(null);
    setCurrentTasks([]);
    setCurrentTask(0);
    setIsCompleted(false);
    setShowHint(false);
    setShowAnswer(false);
    setShowInstructions(false);
    setTaskHistory([]);
    setIsGenerating(false);
    setGenerationStep('');
  };

  if (!selectedLesson) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💻 Практика</h1>
          <p className="text-xl text-gray-600 mb-4">Выберите урок для практики</p>
          <div className="flex justify-center space-x-4">
           
            <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">
              Завершено уроков: {unlockedLessons.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLessons.map((lesson) => {
            const isCompleted = unlockedLessons.some(unlocked => unlocked.id === lesson.id);
            return (
              <motion.div
                key={lesson.id}
                whileHover={{ scale: isCompleted ? 1.02 : 1 }}
                whileTap={{ scale: isCompleted ? 0.98 : 1 }}
                className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                  isCompleted 
                    ? 'hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-blue-200' 
                    : 'opacity-60 cursor-not-allowed border-2 border-gray-100'
                }`}
                onClick={() => isCompleted && selectLesson(lesson)}
              >
                {/* Заголовок и статус */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{lesson.title}</h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isCompleted 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      {isCompleted ? 'Завершен' : lesson.difficulty}
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">{lesson.description}</p>

                {/* Топики */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {lesson.topics.map((topic, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        isCompleted 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'bg-gray-50 text-gray-500 border border-gray-200'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Статус и кнопка */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium flex items-center ${
                      isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <>
                          <span className="w-4 h-4 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </span>
                          Доступен
                        </>
                      ) : (
                        <>
                          <span className="w-4 h-4 bg-gray-400 rounded-full mr-2 flex items-center justify-center">
                            <span className="text-white text-xs">🔒</span>
                          </span>
                          Завершите урок
                        </>
                      )}
                    </span>
                  </div>
                  <button 
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      isCompleted
                        ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isCompleted}
                  >
                    {isCompleted ? 'Практиковаться' : 'Недоступно'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/python-course"
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Вернуться к курсу
          </Link>
        </div>
      </motion.div>
    );
  }

  if (currentTasks.length === 0 || isGenerating) {
    console.log('Показываем загрузку:', { currentTasks: currentTasks.length, isGenerating, selectedLesson });
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isGenerating ? 'Генерируем новые задачи...' : 'Генерируем задачи...'}
          </p>
          {isGenerating && generationStep && (
            <div className="mt-4 text-sm text-blue-600 font-medium">
              {generationStep}
            </div>
          )}
          {isGenerating && (
            <div className="mt-4 text-sm text-gray-500">
              Подбираем оптимальные задания для вашего уровня...
            </div>
          )}
          {!isGenerating && currentTasks.length === 0 && (
            <div className="mt-4">
              <div className="text-sm text-red-500 mb-4">
                Ошибка генерации задач. Попробуйте еще раз.
              </div>
              <button
                onClick={() => generateNewTasks()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                🔄 Попробовать снова
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentTaskData = currentTasks[currentTask];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              💻 Практика: {selectedLesson.title}
            </h1>
            <p className="text-gray-600">Задача {currentTask + 1} из {currentTasks.length}</p>
          </div>
          <button
            onClick={resetToLessonSelection}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Выбрать другой урок
          </button>
        </div>

        {/* Прогресс бар */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentTask + 1) / currentTasks.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
        <motion.h2
          key={currentTask}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800 mb-6"
        >
          {currentTaskData.title}
        </motion.h2>

        <motion.div
          key={`content-${currentTask}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Описание задачи */}
          <div className="text-gray-700 leading-relaxed text-lg">
            {currentTaskData.content.split('\n').map((line, index) => (
              <p key={index} className="mb-3">
                {line}
              </p>
            ))}
          </div>

          {/* Ожидаемый результат */}
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">🎯</span>
              </div>
              <span className="text-blue-900 font-semibold text-lg">Ожидаемый результат</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
              <pre className="text-green-400 text-lg font-mono">
                {currentTaskData.expectedOutput}
              </pre>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>📝</span>
              <span>{showInstructions ? 'Скрыть инструкции' : 'Показать инструкции'}</span>
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>💡</span>
              <span>Подсказка</span>
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>🔍</span>
              <span>{showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</span>
            </button>
          </div>

          {showInstructions && (
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">📝</span>
                </div>
                <span className="text-amber-900 font-semibold text-lg">Инструкции</span>
              </div>
              <ol className="text-amber-800 text-lg space-y-3">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">1</span>
                  <span>Откройте ваш редактор кода</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">2</span>
                  <span>Создайте новый файл .py</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">3</span>
                  <span>Напишите код согласно заданию</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">4</span>
                  <span>Запустите программу</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">5</span>
                  <span>Сравните результат с ожидаемым</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-amber-900 font-bold text-sm mr-3 mt-0.5">6</span>
                  <span>Нажмите "Следующая задача" когда готовы</span>
                </li>
              </ol>
            </div>
          )}

          {showHint && (
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">💡</span>
                </div>
                <span className="text-blue-900 font-semibold text-lg">Подсказка</span>
              </div>
              <div className="text-blue-800 text-lg space-y-3">
                {currentTaskData.hint.split('\n').map((line, index) => (
                  <p key={index} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {showAnswer && (
            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl">🔍</span>
                </div>
                <span className="text-green-900 font-semibold text-lg">Решение</span>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4 shadow-inner">
                <pre className="text-green-400 text-lg font-mono">
                  {currentTaskData.code}
                </pre>
              </div>
              <div className="text-green-800 text-lg space-y-3">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-lg">📖</span>
                  </div>
                  <span className="font-semibold text-green-900">Объяснение</span>
                </div>
                {currentTaskData.explanation.split('\n').map((line, index) => (
                  <p key={index} className="leading-relaxed ml-11">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <button
          onClick={previousTask}
          disabled={currentTask === 0}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            currentTask === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          <span>←</span>
          <span>Предыдущая</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={generateNewTasks}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
              isGenerating
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <span>{isGenerating ? '⏳' : '🔄'}</span>
            <span>{isGenerating ? 'Генерация...' : 'Новые задачи'}</span>
          </button>

          {currentTask < currentTasks.length - 1 ? (
            <button
              onClick={nextTask}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Следующая</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={nextTask}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>🎉</span>
              <span>Завершить</span>
            </button>
          )}
        </div>
      </div>

      {/* Поздравление при завершении */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Отлично!
            </h2>
            <p className="text-gray-600 mb-6">
              Вы завершили все задачи по уроку "{selectedLesson.title}"!
            </p>
            <div className="space-y-3">
              <button
                onClick={generateNewTasks}
                disabled={isGenerating}
                className={`w-full px-6 py-3 rounded-lg transition-all duration-200 ${
                  isGenerating
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isGenerating ? '⏳ Генерация...' : '🔄 Новые задачи'}
              </button>
              <button
                onClick={resetToLessonSelection}
                className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Выбрать другой урок
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Practice; 