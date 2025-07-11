import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

function Level1Unit1() {
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const navigate = useNavigate();
  // ЗАКОММЕНТИРОВАНО: Проверка авторизации
  // const { user } = useAuth();
  const { refreshUserProgress } = useProgress();
  
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
    isLoading,
    updateCurrentStep,
    saveStepAnswer,
    getStepAnswer,
    isLessonCompleted,
    completeLesson,
    clearLessonProgress,
    loadProgressFromServer
  } = useLessonProgress(1);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: '🌟 Добро пожаловать в мир Python! 🐍',
      content: '🎯 Python - это высокоуровневый язык программирования, который известен своей простотой и читаемостью. Он отлично подходит для начинающих программистов.\n\n💡 Представьте Python как дружелюбного переводчика между вами и компьютером. Вы говорите на простом языке, а Python переводит это в команды, которые компьютер понимает!\n\n🚀 Готовы начать увлекательное путешествие в мир программирования?',
      code: null
    },
    {
      type: 'theory',
      title: '🤔 Почему Python?',
      content: '✨ Python популярен благодаря:\n\n📝 Простому и понятному синтаксису\n📚 Большому количеству библиотек\n👥 Активному сообществу\n🌍 Широкому применению в различных областях\n\n🎮 Python — как конструктор LEGO для программистов. У вас есть готовые блоки (библиотеки), и вы просто соединяете их, чтобы создать что-то удивительное!\n\n💪 Начнем с простого и постепенно перейдем к сложному!',
      code: null
    },
    {
      type: 'code',
      title: '🎉 Ваша первая программа',
      content: '🎯 В Python даже самая простая программа может состоять всего из одной строки:\n\n💭 Представьте, что print() — это как крикнуть "Эй!" в комнате. Вы говорите что-то, и все это слышат. В нашем случае компьютер "слышит" и показывает это на экране.\n\n🎪 Это как выступление на сцене - вы говорите, а зрители (компьютер) вас слушают!',
      code: 'print("Hello, World!")',
      explanation: '🔍 print() — это команда Python: "покажи на экране". Строка — это просто текст в кавычках: "Hello, World!"\n\n📝 Это как написать сообщение на доске — вы берете мел (print) и пишете слова (текст в кавычках).\n\n🎨 Теперь вы художник, а экран - ваш холст!'
    },
    {
      type: 'practice',
      title: '🎯 Попробуйте сами!',
      content: '✍️ Напишите программу, которая выводит "Привет, Python!"\n\n🗣️ Представьте, что вы учите компьютер говорить по-русски. Вы даете ему команду "скажи это" и указываете, что именно сказать.\n\n🎭 Это как репетиция спектакля - вы учите актера (компьютер) произносить свои реплики!',
      code: 'print("Привет, Python!")',
      task: 'Выведите текст "Привет, Python!"',
      answer: 'print("Привет, Python!")',
      hint: '💡 Используйте функцию print() и поместите текст в кавычки. Помните: print() — это команда Python для вывода на экран.\n\n📝 Это как написать письмо — у вас есть конверт (print) и вы кладете в него сообщение (текст в кавычках).\n\n🎯 Не забудьте про скобки и кавычки!'
    },
    {
      type: 'theory',
      title: '💬 Комментарии в Python',
      content: '📝 Комментарии помогают объяснить код. Они начинаются с символа # и игнорируются при выполнении программы.\n\n📖 Представьте комментарии как заметки на полях книги. Вы читаете книгу (код), а заметки (комментарии) помогают понять, что происходит. Компьютер читает только основную историю, а ваши заметки пропускает.\n\n🎨 Комментарии - это ваши личные заметки в коде!',
      code: '# Это комментарий\nprint("Это код")  # А это комментарий в конце строки',
      explanation: '🔍 Комментарий — это подсказка в коде для тебя или других. Символ # называется "символ комментария" и говорит Python: "не выполняй эту строку, она только для чтения".\n\n📌 Это как поставить восклицательный знак на важной странице — вы помечаете что-то важное, но это не часть основного текста.\n\n💭 Комментарии помогают не только вам, но и другим программистам понять ваш код!'
    },
    {
      type: 'practice',
      title: '📝 Задача 1: Приветствие',
      content: '🎯 Напишите программу, которая выводит приветствие "Добрый день!"\n\n💭 Это простое упражнение поможет закрепить использование функции print().\n\n🎪 Представьте, что вы создаете программу-приветствие для посетителей!',
      code: 'print("Добрый день!")',
      task: 'Выведите текст "Добрый день!"',
      answer: 'print("Добрый день!")',
      hint: '💡 Используйте функцию print() с текстом в кавычках. Это очень похоже на предыдущее задание!\n\n📝 Формат: print("ваш текст")\n\n🎯 Не забудьте про кавычки и скобки!'
    },
    {
      type: 'practice',
      title: '📝 Задача 2: Комментарий',
      content: '🎯 Напишите программу с комментарием, которая выводит "Мой первый код"\n\n💭 Добавьте комментарий, объясняющий, что делает программа.\n\n🎨 Комментарии помогают понять код и себе, и другим!',
      code: '# Это моя первая программа\nprint("Мой первый код")',
      task: 'Создайте программу с комментарием и выводом "Мой первый код"',
      answer: '# Это моя первая программа\nprint("Мой первый код")',
      hint: '💡 Начните с комментария (символ #), затем на новой строке добавьте print() с текстом.\n\n📝 Структура:\n# комментарий\nprint("текст")\n\n🎯 Комментарий должен объяснять, что делает программа!'
    },
    {
      type: 'practice',
      title: '📝 Задача 3: Множественный вывод',
      content: '🎯 Напишите программу, которая выводит две строки:\n1. "Python - это круто!"\n2. "Я изучаю программирование"\n\n💭 Используйте два print() подряд.\n\n🎪 Это как написать два сообщения на доске!',
      code: 'print("Python - это круто!")\nprint("Я изучаю программирование")',
      task: 'Выведите две строки: "Python - это круто!" и "Я изучаю программирование"',
      answer: 'print("Python - это круто!")\nprint("Я изучаю программирование")',
      hint: '💡 Используйте два print() один за другим. Каждый print() на новой строке.\n\n📝 Формат:\nprint("первая строка")\nprint("вторая строка")\n\n🎯 Каждая строка должна быть в отдельном print()!'
    },
    {
      type: 'practice',
      title: '📝 Задача 4: Комментарий в строке',
      content: '🎯 Напишите программу, которая выводит "Результат: 42" с комментарием в той же строке\n\n💭 Комментарий можно писать в конце строки после кода.\n\n🎨 Это удобно для кратких пояснений!',
      code: 'print("Результат: 42")  # Выводим результат вычисления',
      task: 'Выведите "Результат: 42" с комментарием в той же строке',
      answer: 'print("Результат: 42")  # Выводим результат вычисления',
      hint: '💡 Сначала напишите print(), затем добавьте комментарий с символом # в той же строке.\n\n📝 Формат: print("текст")  # комментарий\n\n🎯 Комментарий идет после кода, разделенный пробелами!'
    },
    {
      type: 'practice',
      title: '📝 Задача 5: Сложная программа',
      content: '🎯 Создайте программу с несколькими комментариями, которая выводит:\n1. "Начинаем изучение Python"\n2. "Это увлекательно!"\n\n💭 Добавьте комментарии, объясняющие каждый шаг.\n\n🎪 Это как написать мини-историю с пояснениями!',
      code: '# Программа для изучения Python\nprint("Начинаем изучение Python")  # Первое сообщение\nprint("Это увлекательно!")  # Второе сообщение',
      task: 'Создайте программу с комментариями, выводящую "Начинаем изучение Python" и "Это увлекательно!"',
      answer: '# Программа для изучения Python\nprint("Начинаем изучение Python")  # Первое сообщение\nprint("Это увлекательно!")  # Второе сообщение',
      hint: '💡 Начните с общего комментария, затем добавьте два print() с комментариями в строках.\n\n📝 Структура:\n# общий комментарий\nprint("текст1")  # комментарий1\nprint("текст2")  # комментарий2\n\n🎯 Комментарии должны объяснять, что делает каждая часть!'
    },
    {
      type: 'quiz',
      title: '🧠 Проверьте свои знания',
      question: 'Какой символ используется для комментариев в Python?',
      options: ['//', '#', '/*', '--'],
      correct: 1,
      hint: '💡 Подумай: что в коде не запускается, а просто объясняет? Какой символ говорит Python "не выполняй эту строку"?\n\n🔍 Представьте: какой знак вы бы поставили на важной заметке, чтобы выделить её?\n\n🎯 Вспомните, что мы только что изучили про комментарии!'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Приветствие пользователя',
      content: '💻 Теперь попробуйте написать программу самостоятельно!\n\n🎯 Задача: Создайте программу, которая выводит приветствие "Добро пожаловать в мир программирования!"\n\n💭 Это простое упражнение поможет закрепить использование функции print().\n\n🎪 Представьте, что вы создаете программу-приветствие для посетителей вашего сайта!',
      code: 'print("Добро пожаловать в мир программирования!")',
      explanation: '🔍 Функция print() выводит текст на экран. Текст должен быть в кавычках.\n\n📝 Это как написать сообщение на доске — вы берете мел (print) и пишете слова (текст в кавычках).\n\n🎨 Теперь вы художник, а экран - ваш холст!',
      expectedOutput: 'Добро пожаловать в мир программирования!',
      hint: '💡 Используйте функцию print() и поместите текст в кавычки. Помните: print() — это команда Python для вывода на экран.\n\n📝 Это как написать письмо — у вас есть конверт (print) и вы кладете в него сообщение (текст в кавычках).\n\n🎯 Не забудьте про скобки и кавычки!'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Множественные сообщения',
      content: '💻 Попробуйте создать программу с несколькими сообщениями!\n\n🎯 Задача: Напишите программу, которая выводит три строки:\n1. "Привет, мир!"\n2. "Я изучаю Python"\n3. "Это увлекательно!"\n\n💭 Используйте три print() подряд.\n\n🎪 Это как написать три сообщения на доске!',
      code: 'print("Привет, мир!")\nprint("Я изучаю Python")\nprint("Это увлекательно!")',
      explanation: '🔍 Каждый print() выводит новую строку. Python автоматически переходит на новую строку после каждого print().\n\n📝 Это как написать три строчки в тетради — каждая на новой строке.\n\n🎨 Каждое сообщение появляется отдельно!',
      expectedOutput: 'Привет, мир!\nЯ изучаю Python\nЭто увлекательно!',
      hint: '💡 Используйте три print() один за другим. Каждый print() на новой строке.\n\n📝 Формат:\nprint("первая строка")\nprint("вторая строка")\nprint("третья строка")\n\n🎯 Каждая строка должна быть в отдельном print()!'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Программа с комментариями',
      content: '💻 Создайте программу с комментариями!\n\n🎯 Задача: Напишите программу с комментарием, которая выводит "Моя первая программа на Python"\n\n💭 Добавьте комментарий, объясняющий, что делает программа.\n\n🎨 Комментарии помогают понять код и себе, и другим!',
      code: '# Это моя первая программа на Python\nprint("Моя первая программа на Python")',
      explanation: '🔍 Комментарий начинается с символа # и объясняет код. Компьютер игнорирует комментарии.\n\n📝 Это как заметка на полях — вы читаете книгу (код), а заметки (комментарии) помогают понять.\n\n💭 Комментарии — это ваши личные заметки в коде!',
      expectedOutput: 'Моя первая программа на Python',
      hint: '💡 Начните с комментария (символ #), затем на новой строке добавьте print() с текстом.\n\n📝 Структура:\n# комментарий\nprint("текст")\n\n🎯 Комментарий должен объяснять, что делает программа!'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Сложная программа',
      content: '💻 Создайте более сложную программу!\n\n🎯 Задача: Напишите программу, которая выводит:\n1. "=== МОЯ ПРОГРАММА ==="\n2. "Привет, пользователь!"\n3. "Сегодня я изучаю Python"\n4. "Это очень интересно!"\n5. "=================="\n\n💭 Используйте пять print() и добавьте комментарий в начале.\n\n🎪 Это как создать красивую рамку с текстом!',
      code: '# Программа-приветствие с рамкой\nprint("=== МОЯ ПРОГРАММА ===")\nprint("Привет, пользователь!")\nprint("Сегодня я изучаю Python")\nprint("Это очень интересно!")\nprint("==================")',
      explanation: '🔍 Символы === создают визуальную рамку. Это делает вывод более красивым и читаемым.\n\n📝 Это как нарисовать рамку вокруг картины — она выделяет содержимое.\n\n🎨 Красивый код — это код, который легко читать и понимать!',
      expectedOutput: '=== МОЯ ПРОГРАММА ===\nПривет, пользователь!\nСегодня я изучаю Python\nЭто очень интересно!\n==================',
      hint: '💡 Начните с комментария, затем добавьте пять print() с разным текстом.\n\n📝 Структура:\n# комментарий\nprint("=== МОЯ ПРОГРАММА ===")\nprint("Привет, пользователь!")\nprint("Сегодня я изучаю Python")\nprint("Это очень интересно!")\nprint("==================")\n\n🎯 Не забудьте про кавычки и символы ===!'
    }
  ], []);

  // Мемоизируем текущий шаг
  const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);

  // Обработка завершения урока
  const handleLessonCompletion = useCallback(async () => {
    if (isLessonCompleted) return;
    
    try {
      // Завершаем урок локально (это автоматически сохранит на сервер)
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        // Сохраняем прогресс в localStorage
        saveLessonProgress(1);
        console.log('Урок успешно завершен!');
        
        // ЗАКОММЕНТИРОВАНО: Обновление активности пользователя (требует авторизации)
        /*
        if (user?.userId) {
          try {
            await fetch(`http://localhost:5000/api/user/${user.userId}/activity`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ currentLesson: 1 }),
            });
            console.log('Активность пользователя обновлена');
          } catch (error) {
            console.error('Ошибка обновления активности:', error);
          }
        }
        */
        console.log('Демо режим: активность не сохраняется');
        
        // ЗАКОММЕНТИРОВАНО: Обновление прогресса в контексте (требует авторизации)
        // await refreshUserProgress();
        console.log('Демо режим: прогресс не сохраняется в контексте');
        
        // Перенаправляем на страницу курсов через 3 секунды
        setTimeout(() => {
          navigate('/python-course');
        }, 3000);
      } else {
        console.error('Ошибка завершения урока');
      }
    } catch (error) {
      console.error('Ошибка при завершении урока:', error);
    }
  }, [completeLesson, isLessonCompleted, navigate, refreshUserProgress, user?.userId]);

  // Загрузка сохраненного ответа при изменении шага
  useEffect(() => {
    const stepAnswer = getStepAnswer(currentStep);
    if (stepAnswer && stepAnswer.answer) {
      setUserAnswer(stepAnswer.answer);
      // Восстанавливаем правильность ответа для всех типов заданий
      setIsCorrect(stepAnswer.isCorrect);
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
    const lessonPassed = checkLessonProgress(1);
    setIsLessonPassed(lessonPassed);
    
    console.log('Инициализация урока:', { lessonPassed, currentStep, lessonProgress });
    
    // ЗАКОММЕНТИРОВАНО: Обновление активности пользователя при загрузке урока
    /*
    if (user?.userId) {
      fetch(`http://localhost:5000/api/user/${user.userId}/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentLesson: 1 }),
      }).catch(error => {
        console.error('Ошибка обновления активности при загрузке:', error);
      });
    }
    */
    console.log('Демо режим: активность не сохраняется при загрузке');
  }, [currentStep, steps.length, lessonProgress.progress, updateCurrentStep, user?.userId]);

  // Проверка завершения урока при достижении последнего шага
  useEffect(() => {
    // Убираем автоматическое завершение урока
    // Теперь пользователь должен сам нажать кнопку завершения
    console.log('useEffect для завершения урока:', {
      currentStep,
      isCorrect,
      isLessonCompleted,
      isLastStep: currentStep === steps.length - 1
    });
  }, [currentStep, steps, isCorrect, isLessonCompleted, handleLessonCompletion]);

  const handleNext = useCallback(() => {
    // Проверяем, выполнено ли текущее задание
    const currentStepData = steps[currentStep];
    let canProceed = true;
    
    if (currentStepData.type === 'practice') {
      // Для практических заданий проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === 'quiz') {
      // Для тестов проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === 'theory_practice') {
      // Для теории с практикой проверяем, что задание выполнено
      if (isCorrect !== true) {
        canProceed = false;
      }
    }
    
    // Нельзя перейти дальше на последнем шаге
    if (currentStep >= steps.length - 1) {
      canProceed = false;
    }
    
    if (canProceed && currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1, steps.length);
      setShowHint(false);
      
      // ЗАКОММЕНТИРОВАНО: Обновление активности пользователя при переходе к следующему шагу
      /*
      if (user?.userId) {
        fetch(`http://localhost:5000/api/user/${user.userId}/activity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentLesson: 1 }),
        }).catch(error => {
          console.error('Ошибка обновления активности:', error);
        });
      }
      */
      console.log('Демо режим: активность не сохраняется при переходе');
    } else if (!canProceed) {
      // Показываем предупреждение
      if (currentStep >= steps.length - 1) {
        alert('🎯 Это последний шаг урока. Ответьте на вопрос выше!');
      } else {
        alert('⚠️ Сначала выполните текущее задание правильно!');
      }
    }
  }, [currentStep, steps, isCorrect, updateCurrentStep, user?.userId]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1, steps.length);
      setShowHint(false);
    }
  }, [currentStep, updateCurrentStep, steps.length]);

  // Улучшенная проверка ответа с более гибким сравнением
  const normalizeAnswer = useCallback((answer) => {
    const normalized = answer
      .trim()
      // Нормализуем пробелы в комментариях - убираем лишние пробелы после #
      .replace(/#\s+/g, '# ') // Один пробел после #
      .replace(/\s+#/g, ' #') // Один пробел перед #
      // Нормализуем пробелы в коде
      .replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
      .replace(/["""]/g, '"') // Нормализуем кавычки
      .replace(/[''']/g, "'") // Нормализуем одинарные кавычки
      .toLowerCase();
    
    console.log('Нормализация:', { original: answer, normalized });
    return normalized;
  }, []);

  const handleAnswerSubmit = useCallback(() => {
    console.log('handleAnswerSubmit вызвана!', {
      currentStep,
      userAnswer,
      stepType: steps[currentStep]?.type
    });
    
    const currentStepData = steps[currentStep];
    let isAnswerCorrect = false;
    
    console.log('Проверяем ответ:', {
      userAnswer,
      correctAnswer: currentStepData.answer,
      type: currentStepData.type
    });
    
    if (currentStepData.type === 'practice') {
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrectAnswer = normalizeAnswer(currentStepData.answer);
      
      console.log('Нормализованные ответы:', {
        user: normalizedUserAnswer,
        correct: normalizedCorrectAnswer
      });
      
      // Проверяем точное совпадение
      const isExactMatch = normalizedUserAnswer === normalizedCorrectAnswer;
      
      console.log('Точное совпадение:', isExactMatch);
      
      // Проверяем наличие ключевых элементов для разных типов заданий
      const hasInput = normalizedUserAnswer.includes('input');
      const hasPrint = normalizedUserAnswer.includes('print');
      const hasInt = normalizedUserAnswer.includes('int');
      const hasFString = normalizedUserAnswer.includes('f"') || normalizedUserAnswer.includes("f'");
      const hasQuotes = normalizedUserAnswer.includes('"') || normalizedUserAnswer.includes("'");
      const hasComment = normalizedUserAnswer.includes('#');
      
      // Специальная проверка для заданий с комментариями
      if (hasComment) {
        // Разбиваем на строки и проверяем каждую
        const userLines = normalizedUserAnswer.split('\n').filter(line => line.trim());
        const correctLines = normalizedCorrectAnswer.split('\n').filter(line => line.trim());
        
        if (userLines.length === correctLines.length) {
          let allLinesMatch = true;
          for (let i = 0; i < userLines.length; i++) {
            const userLine = userLines[i].trim();
            const correctLine = correctLines[i].trim();
            
            // Если строки не совпадают точно, проверяем основные элементы
            if (userLine !== correctLine) {
              // Проверяем, что в строке есть основные элементы (print, комментарий и т.д.)
              const hasRequiredElements = 
                (userLine.includes('print') && correctLine.includes('print')) ||
                (userLine.startsWith('#') && correctLine.startsWith('#'));
              
              if (!hasRequiredElements) {
                allLinesMatch = false;
                break;
              }
            }
          }
          
          if (allLinesMatch) {
            setIsCorrect(true);
            isAnswerCorrect = true;
            console.log('✅ Ответ правильный (с комментариями)!');
          }
        }
      }
      
      // Проверяем точное совпадение только если не было совпадения с комментариями
      if (!isAnswerCorrect) {
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
      }
    } else if (currentStepData.type === 'quiz') {
      console.log('Проверяем тест:', {
        userAnswer,
        correctAnswer: currentStepData.correct,
        userAnswerType: typeof userAnswer,
        correctAnswerType: typeof currentStepData.correct
      });
      
      // Приводим оба значения к строкам для корректного сравнения
      isAnswerCorrect = userAnswer.toString() === currentStepData.correct.toString();
      setIsCorrect(isAnswerCorrect);
      console.log('Результат теста:', { 
        isAnswerCorrect, 
        isCorrect: isAnswerCorrect,
        userAnswer: userAnswer.toString(),
        correctAnswer: currentStepData.correct.toString(),
        currentStep,
        isLastStep: currentStep === steps.length - 1
      });
    } else if (currentStepData.type === 'theory_practice') {
      // Для теории с практикой автоматически помечаем как выполненное
      // Пользователь сам проверяет результат в своем редакторе
      isAnswerCorrect = true;
      setIsCorrect(true);
      console.log('✅ Теория с практикой выполнена!');
    }
    
    // Сохраняем ответ
    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
    
    // Убираем автоматическое завершение урока
    // Пользователь должен сам нажать кнопку завершения
  }, [currentStep, steps, userAnswer, normalizeAnswer, saveStepAnswer]);

  // Оптимизированный обработчик изменения текста
  const handleTextChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  // Оптимизированный обработчик показа подсказки
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загружаем прогресс из базы данных...</p>
        </div>
      </div>
    );
  }

  // Если урок уже завершен, показываем поздравления
  if (isLessonCompleted && !showCongratulations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Урок уже завершен!</h1>
          <p className="text-gray-600 mb-6">Вы уже прошли этот урок. Прогресс сохранен в базе данных.</p>
          <div className="space-x-4">
            <button
              onClick={() => {
                clearLessonProgress();
                setLessonCompleted(false);
                setShowCongratulations(false);
                loadProgressFromServer();
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Пройти заново
            </button>
            <Link
              to="/python-course"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Вернуться к курсу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6 mb-5"
    >
      {/* Модальное окно с поздравлением */}
      {showCongratulations && (
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
              Поздравляем!
            </h2>
            <p className="text-gray-600 mb-6">
              Вы успешно завершили урок "Введение в Python"!
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium mb-2">🎯 Вы изучили:</p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Основы языка Python</li>
                <li>• Функцию print() для вывода</li>
                <li>• Комментарии в коде</li>
              </ul>
            </div>
            <p className="text-gray-500 text-sm">
              Перенаправление на страницу курсов через 3 секунды...
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Прогресс бар */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              📚 Урок 1: Введение в Python
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
              <div className="text-blue-800 text-lg space-y-3">
                {currentStepData.explanation.split('\n').map((line, index) => (
                  <p key={index} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
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
                    <div className="text-blue-800 text-lg space-y-3">
                      {currentStepData.hint.split('\n').map((line, index) => (
                        <p key={index} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
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
                  <div className="text-blue-800 text-lg space-y-3">
                    {currentStepData.hint.split('\n').map((line, index) => (
                      <p key={index} className="leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {isCorrect !== null && (
                <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300' : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-300'}`}>
                  <p className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? '🎉 Правильно! Символ # используется для комментариев в Python. Теперь можете перейти к следующему шагу.' : '❌ Неправильно. Попробуйте еще раз.'}
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

          {/* Теория с практикой */}
          {currentStepData.type === 'theory_practice' && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💻</span>
                Самостоятельная практика
              </h3>
              
              <div className="space-y-6">
                {/* Ожидаемый результат */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🎯</span>
                    <span className="text-blue-800 font-semibold">Ожидаемый результат:</span>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-green-400 text-lg font-mono">
                      {currentStepData.expectedOutput}
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
                    <li>1. Откройте ваш редактор кода (PyCharm, VS Code, IDLE или любой другой)</li>
                    <li>2. Создайте новый файл с расширением .py</li>
                    <li>3. Напишите код согласно заданию</li>
                    <li>4. Запустите программу и проверьте результат</li>
                    <li>5. Убедитесь, что вывод совпадает с ожидаемым результатом</li>
                    <li>6. Когда будете готовы, нажмите "Продолжить"</li>
                  </ol>
                </div>

                {/* Кнопки */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      // Автоматически помечаем как выполненное
                      setIsCorrect(true);
                      saveStepAnswer(currentStep, 'theory_practice_completed', true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>✅</span>
                    <span>Продолжить</span>
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
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💡</span>
                      <span className="text-blue-800 font-semibold">Подсказка</span>
                    </div>
                    <div className="text-blue-800 text-lg space-y-3">
                      {currentStepData.hint.split('\n').map((line, index) => (
                        <p key={index} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Информация о выполнении */}
                {isCorrect === null && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-emerald-800 text-lg">
                        Выполните задание в своем редакторе кода, затем нажмите "Продолжить"
                      </p>
                    </div>
                  </div>
                )}

                {isCorrect === true && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🎉</span>
                      <p className="text-green-800 text-lg font-semibold">
                        Отлично! Вы можете перейти к следующему шагу.
                      </p>
                    </div>
                  </div>
                )}
              </div>
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
                  const updatedLessons = completedLessons.filter(id => id !== 1);
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
                if (currentStepData.type === 'practice' || currentStepData.type === 'quiz' || currentStepData.type === 'theory_practice') {
                  // Если урок уже был пройден, не блокируем кнопку
                  return isCorrect !== true && !isLessonPassed;
                }
                return false;
              })()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                (() => {
                  const currentStepData = steps[currentStep];
                  if (currentStepData.type === 'practice' || currentStepData.type === 'quiz' || currentStepData.type === 'theory_practice') {
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

export default Level1Unit1;
