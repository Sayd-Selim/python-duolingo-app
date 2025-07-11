import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

function Practice() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskHistory, setTaskHistory] = useState([]);
  const { user } = useAuth();
  const { completedLessons, lessonProgress, refreshUserProgress } = useProgress();

  console.log('🔄 Practice компонент перерендерился:', {
    completedLessons,
    lessonProgress,
    user: user?.userId
  });

  // Доступные уроки (можно расширить)
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
      title: 'Урок 2: Переменные',
      description: 'Работа с переменными, типы данных',
      topics: ['переменные', 'строки', 'числа'],
      difficulty: 'Начинающий',
    },
    {
      id: 3,
      title: 'Урок 3: Ввод данных',
      description: 'Функция input(), преобразование типов',
      topics: ['input()', 'int()', 'str()'],
      difficulty: 'Начинающий',
    }
  ], []);

  // Только завершённые уроки доступны для практики
  const unlockedLessons = useMemo(() => {
    // Проверяем разные способы определения завершенных уроков
    const completedFromArray = completedLessons || [];
    const completedFromProgress = Object.entries(lessonProgress || {})
      .filter(([lessonId, progress]) => progress >= 100)
      .map(([lessonId]) => Number(lessonId));
    
    const allCompleted = [...new Set([...completedFromArray, ...completedFromProgress])];
    
    console.log('🔍 Проверка доступных уроков для практики:', {
      completedLessons: completedFromArray,
      lessonProgress,
      completedFromProgress,
      allCompleted,
      availableLessons: availableLessons.map(l => ({ id: l.id, title: l.title })),
      unlocked: availableLessons.filter(lesson => allCompleted.includes(lesson.id))
    });
    
    return availableLessons.filter(lesson => allCompleted.includes(lesson.id));
  }, [availableLessons, completedLessons, lessonProgress]);

  // Генератор задач для разных уроков
  const generateTasks = useMemo(() => ({
    1: () => {
      const tasks = [
        {
          title: 'Приветствие',
          content: '💻 Создайте программу, которая выводит приветствие "Добро пожаловать в Python!"',
          code: 'print("Добро пожаловать в Python!")',
          explanation: '🔍 Используйте функцию print() с текстом в кавычках',
          expectedOutput: 'Добро пожаловать в Python!',
          hint: '💡 print("ваш текст") - не забудьте кавычки!'
        },
        {
          title: 'Множественные сообщения',
          content: '💻 Напишите программу, которая выводит:\n1. "Привет!"\n2. "Как дела?"\n3. "Отлично!"',
          code: 'print("Привет!")\nprint("Как дела?")\nprint("Отлично!")',
          explanation: '🔍 Каждый print() выводит новую строку',
          expectedOutput: 'Привет!\nКак дела?\nОтлично!',
          hint: '💡 Используйте три print() один за другим'
        },
        {
          title: 'Программа с комментарием',
          content: '💻 Создайте программу с комментарием, которая выводит "Моя программа работает!"',
          code: '# Это моя программа\nprint("Моя программа работает!")',
          explanation: '🔍 Комментарий начинается с #',
          expectedOutput: 'Моя программа работает!',
          hint: '💡 Начните с комментария, затем добавьте print()'
        },
        {
          title: 'Красивое оформление',
          content: '💻 Напишите программу, которая выводит:\n1. "================"\n2. "МОЯ ПРОГРАММА"\n3. "================"',
          code: 'print("================")\nprint("МОЯ ПРОГРАММА")\nprint("================")',
          explanation: '🔍 Символы = создают рамку',
          expectedOutput: '================\nМОЯ ПРОГРАММА\n================',
          hint: '💡 Используйте символы = для создания рамки'
        },
        {
          title: 'Комментарий в строке',
          content: '💻 Напишите программу, которая выводит "Результат: 100" с комментарием в той же строке',
          code: 'print("Результат: 100")  # Выводим результат',
          explanation: '🔍 Комментарий можно писать после кода',
          expectedOutput: 'Результат: 100',
          hint: '💡 Добавьте # после кода в той же строке'
        },
        {
          title: 'Приветствие пользователя',
          content: '💻 Создайте программу, которая выводит "Привет, программист!"',
          code: 'print("Привет, программист!")',
          explanation: '🔍 Простое использование print()',
          expectedOutput: 'Привет, программист!',
          hint: '💡 print("Привет, программист!")'
        },
        {
          title: 'Информационная программа',
          content: '💻 Напишите программу, которая выводит:\n1. "Информация о программе"\n2. "Версия: 1.0"\n3. "Автор: Вы"',
          code: 'print("Информация о программе")\nprint("Версия: 1.0")\nprint("Автор: Вы")',
          explanation: '🔍 Три отдельные строки с информацией',
          expectedOutput: 'Информация о программе\nВерсия: 1.0\nАвтор: Вы',
          hint: '💡 Используйте три print() для трех строк'
        },
        {
          title: 'Программа с несколькими комментариями',
          content: '💻 Создайте программу с двумя комментариями, которая выводит "Программа завершена"',
          code: '# Начало программы\nprint("Программа завершена")  # Конец программы',
          explanation: '🔍 Комментарии в начале и в конце строки',
          expectedOutput: 'Программа завершена',
          hint: '💡 Добавьте комментарий в начале и в конце строки'
        }
      ];
      return tasks.sort(() => Math.random() - 0.5).slice(0, 5); // Перемешиваем и берем 5
    },
    2: () => {
      const tasks = [
        {
          title: 'Создание переменной',
          content: '💻 Создайте переменную name со значением "Анна" и выведите её',
          code: 'name = "Анна"\nprint(name)',
          explanation: '🔍 Используйте = для присваивания значения',
          expectedOutput: 'Анна',
          hint: '💡 name = "Анна" - создает переменную'
        },
        {
          title: 'Числовая переменная',
          content: '💻 Создайте переменную age со значением 25 и выведите её',
          code: 'age = 25\nprint(age)',
          explanation: '🔍 Числа пишутся без кавычек',
          expectedOutput: '25',
          hint: '💡 age = 25 - создает числовую переменную'
        },
        {
          title: 'Несколько переменных',
          content: '💻 Создайте переменные name="Иван" и age=30, затем выведите обе',
          code: 'name = "Иван"\nage = 30\nprint(name)\nprint(age)',
          explanation: '🔍 Можно создать несколько переменных',
          expectedOutput: 'Иван\n30',
          hint: '💡 Создайте две переменные и выведите их'
        },
        {
          title: 'Переменная с числом',
          content: '💻 Создайте переменную score со значением 95 и выведите её',
          code: 'score = 95\nprint(score)',
          explanation: '🔍 Числовые переменные не нуждаются в кавычках',
          expectedOutput: '95',
          hint: '💡 score = 95 - создает числовую переменную'
        },
        {
          title: 'Строковая переменная',
          content: '💻 Создайте переменную city со значением "Москва" и выведите её',
          code: 'city = "Москва"\nprint(city)',
          explanation: '🔍 Строковые переменные заключаются в кавычки',
          expectedOutput: 'Москва',
          hint: '💡 city = "Москва" - создает строковую переменную'
        },
        {
          title: 'Множественные переменные',
          content: '💻 Создайте переменные name="Мария", age=28, city="СПб" и выведите их',
          code: 'name = "Мария"\nage = 28\ncity = "СПб"\nprint(name)\nprint(age)\nprint(city)',
          explanation: '🔍 Можно создать много переменных разных типов',
          expectedOutput: 'Мария\n28\nСПб',
          hint: '💡 Создайте три переменные и выведите их по очереди'
        },
        {
          title: 'Переменная с комментарием',
          content: '💻 Создайте переменную price со значением 1500 и выведите её с комментарием',
          code: 'price = 1500  # Цена товара\nprint(price)',
          explanation: '🔍 Комментарии можно добавлять к переменным',
          expectedOutput: '1500',
          hint: '💡 Добавьте комментарий после создания переменной'
        }
      ];
      return tasks.sort(() => Math.random() - 0.5).slice(0, 5);
    },
    3: () => {
      const tasks = [
        {
          title: 'Ввод имени',
          content: '💻 Создайте программу, которая запрашивает имя и выводит "Привет, [имя]!"',
          code: 'name = input("Введите имя: ")\nprint("Привет, " + name + "!")',
          explanation: '🔍 input() запрашивает ввод, + соединяет строки',
          expectedOutput: 'Привет, [введенное имя]!',
          hint: '💡 Используйте input() и сложение строк'
        },
        {
          title: 'Ввод числа',
          content: '💻 Создайте программу, которая запрашивает число и выводит его удвоенное значение',
          code: 'number = int(input("Введите число: "))\nprint(number * 2)',
          explanation: '🔍 int() преобразует строку в число',
          expectedOutput: '[удвоенное число]',
          hint: '💡 Используйте int(input()) для ввода числа'
        },
        {
          title: 'Ввод возраста',
          content: '💻 Создайте программу, которая запрашивает возраст и выводит "Вам [возраст] лет"',
          code: 'age = input("Введите ваш возраст: ")\nprint("Вам " + age + " лет")',
          explanation: '🔍 input() возвращает строку, которую можно соединить с другими строками',
          expectedOutput: 'Вам [введенный возраст] лет',
          hint: '💡 Используйте input() и сложение строк'
        },
        {
          title: 'Ввод числа с вычислением',
          content: '💻 Создайте программу, которая запрашивает число и выводит его квадрат',
          code: 'number = int(input("Введите число: "))\nprint(number ** 2)',
          explanation: '🔍 ** - оператор возведения в степень',
          expectedOutput: '[квадрат числа]',
          hint: '💡 Используйте int(input()) и оператор **'
        },
        {
          title: 'Ввод двух чисел',
          content: '💻 Создайте программу, которая запрашивает два числа и выводит их сумму',
          code: 'a = int(input("Введите первое число: "))\nb = int(input("Введите второе число: "))\nprint(a + b)',
          explanation: '🔍 Можно запрашивать несколько значений',
          expectedOutput: '[сумма двух чисел]',
          hint: '💡 Используйте два int(input()) и сложение'
        },
        {
          title: 'Ввод города',
          content: '💻 Создайте программу, которая запрашивает город и выводит "Вы живете в [город]"',
          code: 'city = input("Введите ваш город: ")\nprint("Вы живете в " + city)',
          explanation: '🔍 input() для строковых данных',
          expectedOutput: 'Вы живете в [введенный город]',
          hint: '💡 Используйте input() и сложение строк'
        }
      ];
      return tasks.sort(() => Math.random() - 0.5).slice(0, 5);
    }
  }), []);

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
    console.log('Доступные генераторы:', Object.keys(generateTasks));
    setIsGenerating(true);
    
    // Для отладки - убираем задержку
    setGenerationStep('Генерируем задачи...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем базовые задачи
    if (!generateTasks[selectedLesson.id]) {
      console.error('Генератор задач не найден для урока:', selectedLesson.id);
      setIsGenerating(false);
      setGenerationStep('');
      return;
    }
    
    let newTasks = generateTasks[selectedLesson.id]();
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
    setTaskHistory([]);
    setIsGenerating(false);
    setGenerationStep('');
  }, [selectedLesson, generateTasks]);

  // Переход к следующей задаче
  const nextTask = () => {
    if (currentTask < currentTasks.length - 1) {
      setCurrentTask(currentTask + 1);
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Переход к предыдущей задаче
  const previousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1);
      setShowHint(false);
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
            <button
              onClick={refreshUserProgress}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Обновить прогресс</span>
            </button>
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
                className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-200 ${
                  isCompleted 
                    ? 'hover:shadow-xl cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => isCompleted && selectLesson(lesson)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{lesson.title}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? 'Завершен' : lesson.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {isCompleted ? '✓ Доступен' : '🔒 Завершите урок'}
                  </span>
                  <button 
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🎯</span>
              <span className="text-blue-800 font-semibold">Ожидаемый результат:</span>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <pre className="text-green-400 text-lg font-mono">
                {currentTaskData.expectedOutput}
              </pre>
            </div>
          </div>

          {/* Инструкции */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">📝</span>
              <span className="text-yellow-800 font-semibold">Инструкции:</span>
            </div>
            <ol className="text-yellow-700 text-lg space-y-2">
              <li>1. Откройте ваш редактор кода</li>
              <li>2. Создайте новый файл .py</li>
              <li>3. Напишите код согласно заданию</li>
              <li>4. Запустите программу</li>
              <li>5. Сравните результат с ожидаемым</li>
              <li>6. Нажмите "Следующая задача" когда готовы</li>
            </ol>
          </div>

          {/* Кнопки */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>💡</span>
              <span>Подсказка</span>
            </button>
          </div>

          {showHint && (
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💡</span>
                <span className="text-blue-800 font-semibold">Подсказка</span>
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
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg'
          }`}
        >
          <span>←</span>
          <span>Предыдущая</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={generateNewTasks}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg ${
              isGenerating
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
            }`}
          >
            <span>{isGenerating ? '⏳' : '🔄'}</span>
            <span>{isGenerating ? 'Генерация...' : 'Новые задачи'}</span>
          </button>

          {currentTask < currentTasks.length - 1 ? (
            <button
              onClick={nextTask}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>Следующая</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={nextTask}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
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
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
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