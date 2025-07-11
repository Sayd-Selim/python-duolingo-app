import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';

function Level1Unit2() {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const navigate = useNavigate();
  // ЗАКОММЕНТИРОВАНО: Проверка авторизации
  // const { user } = useAuth();
  
  // Создаем фиктивного пользователя для работы без авторизации
  const user = { userId: 'demo_user_123' };
  
  // Функции для работы с localStorage
  const saveLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
      }
      console.log('Урок сохранен в localStorage:', lessonId);
    } catch (error) {
      console.error('Ошибка сохранения в localStorage:', error);
    }
  };

  const checkLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      return completedLessons.includes(lessonId);
    } catch (error) {
      console.error('Ошибка проверки localStorage:', error);
      return false;
    }
  };
  
  // Используем новый хук для управления прогрессом
  const {
    currentStep,
    lessonProgress,
    updateCurrentStep,
    saveStepAnswer,
    getStepAnswer,
    isLessonCompleted,
    completeLesson,
    clearLessonProgress
  } = useLessonProgress(2);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: 'Переменные. Вывод и ввод данных 📊',
      content: '🎯 Это самый фундаментальный урок — всё в программировании строится на переменных, выводе и вводе данных. Без этого невозможно создать ни одну программу!\n\n🏠 Представьте, что вы строите дом. Переменные — это фундамент 🧱, input() — это двери 🚪 (через них входит информация), а print() — это окна 🪟 (через них выходит результат). Без фундамента, дверей и окон дом не построишь!',
      code: null
    },
    {
      type: 'theory',
      title: 'Что такое переменные? 📦',
      content: '📦 Переменные — это контейнеры для хранения данных. Представьте их как коробки с наклейками 🏷️. Вы кладете что-то в коробку и пишете на наклейке название. Потом можете найти эту коробку по названию и использовать то, что в ней лежит.\n\n🗄️ Или представьте переменные как ячейки в шкафчике. У каждой ячейки есть номер (имя переменной), и вы кладете туда свои вещи (данные). Потом можете сказать "дай мне вещь из ячейки 5" и получить то, что там лежит.',
      code: 'name = "Иван"\nage = 25\nheight = 1.75',
      explanation: '📝 name, age, height — это имена переменных. "Иван", 25, 1.75 — это значения, которые мы сохраняем в переменных. Переменная — это "коробка" с названием, где хранится какая-то информация.\n\n🎲 Это как в игре "Монополия" — у вас есть разные карточки (переменные) с названиями улиц, и на каждой написана цена (значение).'
    },
    {
      type: 'code',
      title: 'Вывод данных с помощью print() 📢',
      content: '📢 Функция print() — это основной способ вывода информации на экран в Python:\n\n📣 Представьте print() как мегафон. Вы говорите в мегафон, и все слышат ваше сообщение. В программировании вы "говорите" в print(), и компьютер показывает это на экране.',
      code: 'print("Привет, мир!")\nprint(42)\nprint(name)  # выведет значение переменной name',
      explanation: '🖥️ print() — это команда Python: "покажи на экране". Она может выводить текст в кавычках, числа, значения переменных и многое другое.\n\n📺 Это как телевизор — вы нажимаете кнопку (print), и на экране появляется изображение (ваш текст или число).'
    },
    {
      type: 'practice',
      title: 'Создайте переменную и выведите её 🎯',
      content: '📝 Создайте переменную name со значением "Анна" и выведите её на экран\n\n💼 Представьте, что вы создаете визитную карточку. Сначала вы пишете имя на карточке (создаете переменную), а потом показываете эту карточку всем (выводите на экран).',
      code: 'name = "Анна"\nprint(name)',
      task: 'Создайте переменную name со значением "Анна" и выведите её',
      answer: 'name = "Анна"\nprint(name)',
      hint: '💡 Сначала создайте переменную: name = "Анна", затем используйте print(name) для вывода. Переменная — это "коробка" с названием name, где хранится текст "Анна".\n\n🍽️ Это как в ресторане: сначала вы заказываете блюдо (создаете переменную), а потом официант приносит его вам (выводит результат).'
    },
    {
      type: 'theory',
      title: 'Ввод данных с помощью input() 🎤',
      content: '🎤 Функция input() позволяет получать данные от пользователя. Программа ждет, пока пользователь что-то введет и нажмет Enter.\n\n👨‍🍳 Представьте input() как официанта в ресторане. Официант подходит к вашему столику и спрашивает: "Что вы хотите заказать?" Программа ждет, пока вы не ответите и не скажете "готово" (нажмете Enter).',
      code: 'name = input("Введите ваше имя: ")\nprint("Привет,", name)',
      explanation: '⏳ input() — это команда Python: "спроси у пользователя и жди ответа". Она всегда возвращает строку, даже если пользователь ввел число. Программа ждет ввода и продолжает работу только после нажатия Enter.\n\n📋 Это как заполнение анкеты — вы видите вопрос, пишете ответ, и только после этого переходите к следующему вопросу.'
    },
    {
      type: 'practice',
      title: 'Создайте программу с вводом 🤝',
      content: '👋 Напишите программу, которая спрашивает имя пользователя и приветствует его\n\n🏠 Представьте, что вы встречаете гостя. Сначала вы спрашиваете его имя (input), а потом говорите "Привет, [имя]!" (print).',
      code: 'name = input("Как вас зовут? ")\nprint("Привет,", name, "!")',
      task: 'Создайте программу, которая спрашивает имя и приветствует пользователя',
      answer: 'name = input("Как вас зовут? ")\nprint("Привет,", name, "!")',
      hint: '💡 Используйте input() для получения имени, затем print() для приветствия. input() — это "спроси и жди ответа", print() — "покажи на экране".\n\n👥 Это как знакомство: сначала вы узнаете имя нового друга, а потом здороваетесь с ним по имени.'
    },
    {
      type: 'theory',
      title: 'Преобразование типов данных 🔄',
      content: '🔄 input() всегда возвращает строку. Если нужно число, нужно преобразовать тип:\n\n📮 Представьте, что input() — это почтальон, который всегда приносит письма (строки). Даже если в письме написано число "25", это все равно письмо. Чтобы получить число, нужно "открыть письмо" (int()) и достать оттуда число.',
      code: 'age_str = input("Введите ваш возраст: ")\nage = int(age_str)  # преобразуем строку в число\nprint("Через 10 лет вам будет:", age + 10)',
      explanation: '🔢 int() — это команда Python: "преврати в целое число". float() — "преврати в число с запятой". input() всегда возвращает строку, поэтому для математики нужно преобразование.\n\n💱 Это как обмен валюты. У вас есть доллары (строка "25"), а нужны рубли (число 25). Банк (int()) обменивает одну валюту на другую.'
    },
    {
      type: 'practice',
      title: 'Калькулятор возраста 🔮',
      content: '🔮 Создайте программу, которая спрашивает возраст и говорит, сколько лет будет через 5 лет\n\n🔮 Представьте, что вы гадалка с хрустальным шаром. Вы спрашиваете у человека его возраст, а потом предсказываете, сколько ему будет через 5 лет.',
      code: 'age = int(input("Введите ваш возраст: "))\nfuture_age = age + 5\nprint("Через 5 лет вам будет:", future_age)',
      task: 'Создайте программу, которая спрашивает возраст и показывает возраст через 5 лет',
      answer: 'age = int(input("Введите ваш возраст: "))\nfuture_age = age + 5\nprint("Через 5 лет вам будет:", future_age)',
      hint: '💡 Используйте int(input()) для получения числа, создайте переменную future_age для расчета, затем print() для вывода. int() превращает строку в число для математики.\n\n🏖️ Это как планирование отпуска: вы узнаете текущую дату, добавляете к ней 5 дней, и получаете дату возвращения.'
    },
    {
      type: 'theory',
      title: 'Форматирование строк 🎨',
      content: '🎨 Есть несколько способов красиво выводить данные:\n\n🎂 Представьте форматирование как украшение торта. У вас есть торт (текст) и украшения (переменные). Вы можете просто положить украшения рядом с тортом, а можете красиво встроить их в торт (f-строки).',
      code: 'name = "Иван"\nage = 25\n\n# Способ 1: через запятую\nprint("Меня зовут", name, "и мне", age, "лет")\n\n# Способ 2: f-строки (рекомендуется)\nprint(f"Меня зовут {name} и мне {age} лет")\n\n# Способ 3: .format()\nprint("Меня зовут {} и мне {} лет".format(name, age))',
      explanation: '✨ f-строки (f"...") — самый современный и удобный способ форматирования в Python. Буква f перед кавычками говорит Python: "подставь значения переменных в фигурные скобки".\n\n📝 Это как заполнение бланка. У вас есть бланк с пустыми полями {имя} и {возраст}, а f-строка автоматически заполняет эти поля вашими данными.'
    },
    {
      type: 'practice',
      title: 'Персональная информация 📋',
      content: '📋 Создайте программу, которая собирает имя и возраст, а затем красиво выводит информацию\n\n💼 Представьте, что вы создаете персональную визитную карточку. Сначала вы собираете информацию о человеке, а потом создаете красивую карточку с этой информацией.',
      code: 'name = input("Введите ваше имя: ")\nage = int(input("Введите ваш возраст: "))\nprint(f"Привет, {name}! Тебе {age} лет.")',
      task: 'Создайте программу, которая собирает имя и возраст, затем выводит приветствие',
      answer: 'name = input("Введите ваше имя: ")\nage = int(input("Введите ваш возраст: "))\nprint(f"Привет, {name}! Тебе {age} лет.")',
      hint: '💡 Используйте input() для имени, int(input()) для возраста, затем f-строку для красивого вывода. f-строки позволяют вставлять переменные прямо в текст.\n\n🎮 Это как создание персонажа в игре: сначала вы выбираете имя и возраст, а потом игра показывает красивую карточку персонажа.'
    },
    {
      type: 'quiz',
      title: 'Проверьте свои знания 🧠',
      question: 'Что возвращает функция input()?',
      options: ['Число', 'Строку', 'Логическое значение', 'Список'],
      correct: 1,
      hint: '💡 Подумай: input() — это "спроси у пользователя и жди ответа". Что пользователь вводит с клавиатуры? Текст или числа? И как Python это обрабатывает?\n\n📮 Представьте: если вы пишете письмо другу, что вы отправляете — числа или текст? input() работает как почтальон, который всегда приносит письма (строки).'
    }
  ], []);

  // Мемоизируем текущий шаг
  const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);

  // Обработка завершения урока
  const handleLessonCompletion = useCallback(async () => {
    if (isLessonCompleted) return;
    
    try {
      // ЗАКОММЕНТИРОВАНО: Сохранение прогресса на сервере (требует авторизации)
      /*
      if (user?.userId) {
        const response = await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.userId,
            lessonId: 2, // ID текущего урока
            progress: 100,
            completed: true,
            score: 100,
            timeSpent: 0 // Можно добавить подсчет времени
          }),
        });

        if (!response.ok) {
          console.error('Ошибка сохранения прогресса на сервере');
        } else {
          console.log('Прогресс сохранен на сервере');
        }
      }
      */
      console.log('Демо режим: прогресс не сохраняется на сервере');

      // Завершаем урок локально
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        // Сохраняем прогресс в localStorage
        saveLessonProgress(2);
        console.log('Урок успешно завершен!');
        
        // Показываем поздравление и переходим к Python курсу
        alert('🎉 Поздравляем! Вы успешно завершили урок "Переменные. Вывод и ввод данных"!\n\nВы изучили:\n• Создание и использование переменных\n• Функции print() и input()\n• Преобразование типов данных\n• Форматирование строк\n\nОтличная работа! Вы освоили фундаментальные основы программирования! 🚀');
        navigate('/python-course');
      } else {
        console.error('Ошибка завершения урока');
      }
    } catch (error) {
      console.error('Ошибка при завершении урока:', error);
    }
  }, [completeLesson, isLessonCompleted, navigate, user?.userId]);

  // Загрузка сохраненного ответа при изменении шага
  useEffect(() => {
    const stepAnswer = getStepAnswer(currentStep);
    if (stepAnswer && stepAnswer.answer) {
      setUserAnswer(stepAnswer.answer);
      // Для тестов сбрасываем isCorrect, чтобы пользователь мог ответить заново
      if (steps[currentStep]?.type === 'quiz') {
        setIsCorrect(null);
      } else {
        setIsCorrect(stepAnswer.isCorrect);
      }
    } else {
      setUserAnswer('');
      setIsCorrect(null);
    }
  }, [currentStep, getStepAnswer, steps]);

  // Очистка сохраненных ответов при загрузке урока (если урок не завершен)
  useEffect(() => {
    if (!isLessonCompleted) {
      clearLessonProgress();
      console.log('Очищены сохраненные ответы для повторного прохождения');
    }
  }, [isLessonCompleted, clearLessonProgress]);

  // Инициализация прогресса при загрузке
  useEffect(() => {
    if (lessonProgress.progress === 0) {
      updateCurrentStep(currentStep, steps.length);
    }
    
    // Проверяем, пройден ли урок
    const lessonPassed = checkLessonProgress(2);
    setIsLessonPassed(lessonPassed);
  }, [currentStep, steps.length, lessonProgress.progress, updateCurrentStep]);

  // Сохранение ответа в localStorage
  const saveAnswer = (answer) => {
    saveStepAnswer(currentStep, answer);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1);
      setShowHint(false);
      setUserAnswer('');
      setIsCorrect(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
      setShowHint(false);
      setUserAnswer('');
      setIsCorrect(null);
    }
  };

  // Оптимизированный обработчик изменения текста
  const handleTextChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  // Оптимизированный обработчик показа подсказки
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  // Улучшенная проверка ответа с более гибким сравнением
  const normalizeAnswer = (answer) => {
    return answer
      .trim()
      .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
      .replace(/["""]/g, '"') // Нормализуем кавычки
      .replace(/[''']/g, "'") // Нормализуем одинарные кавычки
      .toLowerCase();
  };

  const handleAnswerSubmit = () => {
    const currentStepData = steps[currentStep];
    let isAnswerCorrect = false;
    
    if (currentStepData.type === 'practice') {
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrectAnswer = normalizeAnswer(currentStepData.answer);
      
      // Проверяем точное совпадение
      const isExactMatch = normalizedUserAnswer === normalizedCorrectAnswer;
      
      // Проверяем наличие ключевых элементов для разных типов заданий
      const hasInput = normalizedUserAnswer.includes('input');
      const hasPrint = normalizedUserAnswer.includes('print');
      const hasInt = normalizedUserAnswer.includes('int');
      const hasFString = normalizedUserAnswer.includes('f"') || normalizedUserAnswer.includes("f'");
      const hasQuotes = normalizedUserAnswer.includes('"') || normalizedUserAnswer.includes("'");
      
      if (isExactMatch) {
        setIsCorrect(true);
        isAnswerCorrect = true;
        console.log('✅ Ответ правильный!');
      } else if (
        (hasInput && hasPrint && hasQuotes) || // Для заданий с input
        (hasInt && hasInput && hasPrint) || // Для заданий с int(input)
        (hasFString && hasInput && hasInt) // Для заданий с f-строками
      ) {
        setIsCorrect('almost');
        isAnswerCorrect = false; // Почти правильно, но не совсем
        console.log('⚠️ Ответ почти правильный');
      } else {
        setIsCorrect(false);
        isAnswerCorrect = false;
        console.log('❌ Ответ неправильный');
      }
    } else if (currentStepData.type === 'quiz') {
      console.log('Проверяем тест:', {
        userAnswer,
        correctAnswer: currentStepData.correct,
        userAnswerType: typeof userAnswer,
        correctAnswerType: typeof currentStepData.correct
      });
      
      isAnswerCorrect = userAnswer === currentStepData.correct.toString();
      setIsCorrect(isAnswerCorrect);
      console.log('Результат теста:', { isAnswerCorrect, isCorrect });
    }
    
    // Сохраняем ответ
    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 mb-5"
    >
      {/* Прогресс бар */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              📚 Урок 2: Переменные. Вывод и ввод данных
            </span>
            {isLessonPassed && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                ✅ Пройден
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              📍 {currentStep + 1} из {steps.length}
            </span>
            <span className="text-sm font-medium text-green-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-gray-100">
        <motion.h1
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          {currentStepData.title}
        </motion.h1>

        <motion.div
          key={`content-${currentStep}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Теоретический контент */}
          {currentStepData.content && (
            <div className="text-gray-700 leading-relaxed text-lg">
              {currentStepData.content.split('\n').map((line, index) => (
                <p key={index} className="mb-3">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Код */}
          {currentStepData.code && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-medium flex items-center">
                  🐍 Python
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.code)}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <pre className="text-green-400 overflow-x-auto text-lg">
                <code>{currentStepData.code}</code>
              </pre>
            </div>
          )}

          {/* Объяснение кода */}
          {currentStepData.explanation && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💡</span>
                <span className="text-blue-800 font-semibold">Объяснение</span>
              </div>
              <p className="text-blue-800 text-lg">{currentStepData.explanation}</p>
            </div>
          )}

          {/* Практическое задание */}
          {currentStepData.type === 'practice' && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Задание
              </h3>
              <p className="text-yellow-700 mb-4 text-lg">{currentStepData.task}</p>
              
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={handleTextChange}
                  placeholder="✍️ Введите ваш код здесь..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-mono resize-none"
                  spellCheck="false"
                />
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>✅</span>
                    <span>Проверить</span>
                  </button>
                  <button
                    onClick={toggleHint}
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
                    <p className="text-blue-800 text-lg">
                      {currentStepData.hint}
                    </p>
                  </div>
                )}

                {isCorrect !== null && (
                  <div className={`p-4 rounded-lg ${
                    isCorrect === true 
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300' 
                      : isCorrect === 'almost'
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300'
                      : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-300'
                  }`}>
                    <p className={
                      isCorrect === true 
                        ? 'text-green-800 text-lg font-semibold' 
                        : isCorrect === 'almost'
                        ? 'text-yellow-800 text-lg font-semibold'
                        : 'text-red-800 text-lg font-semibold'
                    }>
                      {isCorrect === true 
                        ? '🎉 Правильно! Отличная работа! Теперь можете перейти к следующему шагу.' 
                        : isCorrect === 'almost'
                        ? '⚠️ Ответ почти верный, но проверь скобки и кавычки. Убедись, что используешь правильные кавычки и нет лишних пробелов.'
                        : '❌ Попробуйте еще раз. Проверьте синтаксис.'}
                    </p>
                  </div>
                )}

                {/* Информация о необходимости выполнения задания */}
                {currentStepData.type === 'practice' && isCorrect === null && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-blue-800 text-lg">
                        Выполните задание правильно, чтобы перейти к следующему шагу
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Тест */}
          {currentStepData.type === 'quiz' && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🧠</span>
                Вопрос
              </h3>
              <p className="text-purple-700 mb-6 text-lg">{currentStepData.question}</p>
              
              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-purple-100 transition-colors">
                    <input
                      type="radio"
                      name="quiz"
                      value={index}
                      checked={userAnswer === index.toString()}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                      }}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-purple-700 text-lg">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleAnswerSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <span>✅</span>
                  <span>Проверить ответ</span>
                </button>
                <button
                  onClick={toggleHint}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                >
                  <span>💡</span>
                  <span>Подсказка</span>
                </button>
              </div>

              {showHint && currentStepData.hint && (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4 mt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">💡</span>
                    <span className="text-blue-800 font-semibold">Подсказка</span>
                  </div>
                  <p className="text-blue-800 text-lg">
                    {currentStepData.hint}
                  </p>
                </div>
              )}

              {isCorrect !== null && (
                <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300' : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-300'}`}>
                  <p className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? '🎉 Правильно! input() всегда возвращает строку, даже если пользователь ввел число. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
                  </p>
                </div>
              )}

              {/* Информация о необходимости ответа на вопрос */}
              {currentStepData.type === 'quiz' && isCorrect === null && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">ℹ️</span>
                    <p className="text-blue-800 text-lg">
                      Ответьте на вопрос правильно, чтобы перейти к следующему шагу
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Навигация */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            currentStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg'
          }`}
        >
          <span>←</span>
          <span>Назад</span>
        </button>

        <div className="flex space-x-4">
          <Link
            to="/python-course"
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <span>📚</span>
            <span>К Python курсу</span>
          </Link>
          
          {lessonCompleted ? (
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg animate-pulse">
              <span>🎉</span>
              <span>Урок завершен! Перенаправление...</span>
            </div>
          ) : isLessonPassed ? (
            <button
              onClick={() => {
                // Сбрасываем прогресс урока для повторного прохождения
                clearLessonProgress();
                setLessonCompleted(false);
                setShowCongratulations(false);
                setIsLessonPassed(false);
                updateCurrentStep(0, steps.length);
                setUserAnswer('');
                setIsCorrect(null);
                setShowHint(false);
                
                // Удаляем урок из localStorage для полного сброса
                try {
                  const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
                  const updatedLessons = completedLessons.filter(id => id !== 2);
                  localStorage.setItem('completedLessons', JSON.stringify(updatedLessons));
                  console.log('Урок удален из localStorage для повторного прохождения');
                } catch (error) {
                  console.error('Ошибка удаления урока из localStorage:', error);
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>🔄</span>
              <span>Повторить урок</span>
            </button>
          ) : currentStep === steps.length - 1 && isCorrect === true ? (
            <button
              onClick={handleLessonCompletion}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>🎉</span>
              <span>Завершить урок</span>
            </button>
          ) : currentStep === steps.length - 1 ? (
            <div className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg flex items-center space-x-2 shadow-lg">
              <span>🎯</span>
              <span>Ответьте на вопрос выше для завершения урока</span>
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={(() => {
                const currentStepData = steps[currentStep];
                if (currentStepData.type === 'practice' || currentStepData.type === 'quiz') {
                  // Если урок уже был пройден, не блокируем кнопку
                  return isCorrect !== true && !isLessonPassed;
                }
                return false;
              })()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                (() => {
                  const currentStepData = steps[currentStep];
                  if (currentStepData.type === 'practice' || currentStepData.type === 'quiz') {
                    return (isCorrect !== true && !isLessonPassed)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg';
                  }
                  return 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg';
                })()
              }`}
            >
              <span>Далее</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Level1Unit2; 