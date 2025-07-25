import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import { useAuth } from "../../context/AuthContext";

function Level1Unit5() {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [additionalTaskAnswers, setAdditionalTaskAnswers] = useState({});
  const [additionalTaskHints, setAdditionalTaskHints] = useState({});
  const [additionalTaskAttempts, setAdditionalTaskAttempts] = useState({});
  const [additionalTaskShowAnswer, setAdditionalTaskShowAnswer] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isLessonPassed, setIsLessonPassed] = useState(false);
  const navigate = useNavigate();
  // ЗАКОММЕНТИРОВАНО: Проверка авторизации
  // const { user } = useAuth();

  // Создаем фиктивного пользователя для работы без авторизации
  const user = { userId: "demo_user_123" };

  // Функции для работы с localStorage
  const saveLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
      }
      console.log("Урок сохранен в localStorage:", lessonId);
    } catch (error) {
      console.error("Ошибка сохранения в localStorage:", error);
    }
  };

  const checkLessonProgress = (lessonId) => {
    try {
      const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      return completedLessons.includes(lessonId);
    } catch (error) {
      console.error("Ошибка проверки localStorage:", error);
      return false;
    }
  };

  // Используем новый хук для управления прогрессом
  const { currentStep, lessonProgress, updateCurrentStep, saveStepAnswer, getStepAnswer, isLessonCompleted, completeLesson, clearLessonProgress } =
    useLessonProgress(3); // Новый id урока

  // Отладка изменений isCorrect (перемещено после объявления currentStep)
  useEffect(() => {
    console.log("=== isCorrect ИЗМЕНИЛСЯ ===");
    console.log("Новое значение isCorrect:", isCorrect);
    console.log("Текущий шаг:", currentStep);
    console.log("userAnswer:", userAnswer);
  }, [isCorrect, currentStep, userAnswer]);

  // Отладка перерендеров компонента
  console.log("=== КОМПОНЕНТ ПЕРЕРЕНДЕРЕН ===");
  console.log("currentStep:", currentStep);
  console.log("userAnswer:", userAnswer);
  console.log("isCorrect:", isCorrect);

  // Мемоизируем шаги урока
  const steps = useMemo(
    () => [
      {
        type: "intro",
        title: "Условные операторы: if, elif, else — принятие решений 🧠",
        content:
          "В программировании часто нужно принимать решения: что делать, если пользователь ввёл определённое значение, или если наступило какое-то событие. Для этого в Python есть условные операторы: if, elif, else.\n\nОни позволяют программе выбирать, какой код выполнять в зависимости от условий.\n\n\uD83D\uDCDD Пример: если идёт дождь — взять зонт, иначе — идти без зонта!",
        code: `rain = True\nif rain:\n    print('Возьми зонт!')\nelse:\n    print('Можно идти без зонта!')`,
        motivation: "Условные операторы — это как дорожные знаки для программы. Они помогают принимать решения и делать твой код умным!"
      },
      {
        type: "theory",
        title: "Как работает if, elif, else?",
        content:
          "if — если условие истинно, выполняется блок кода.\nelif — если предыдущее условие ложно, но это истинно, выполняется этот блок.\nelse — если ни одно из условий не выполнилось, выполняется этот блок.",
        metaphor: [
          "\uD83D\uDEA7 Метафора:",
          "Условные операторы — это как дорожная развилка или светофор.",
          "Представь, что ты едешь на велосипеде и видишь знак: если дождь — поверни налево (возьми зонт), если солнце — поезжай прямо (без зонта), иначе — поверни направо (остановись и подожди).",
          "Программа, как и ты, выбирает путь в зависимости от условий!"
        ],
        code: `score = 85\nif score >= 90:\n    print('Отлично!')\nelif score >= 60:\n    print('Хорошо!')\nelse:\n    print('Попробуй ещё раз!')`,
        explanation:
          "Сначала проверяется первое условие (score >= 90). Если оно ложно, проверяется elif (score >= 60). Если и оно ложно — выполняется else.\n\nОтступы показывают, какой код относится к какому условию.",
        examples: [
          "Где пригодится оператор > (больше)?:",
          "Проверка возраста для доступа в чат: if age > 14: ...",
          "Например, у тебя есть приложение, где пользователи могут попасть в чат только если им больше 14 лет. Оператор > помогает реализовать это правило.",
          `age = 13
if age > 14:
    print('Можно в чат')
else:
    print('Нет доступа')  # Нет доступа, т.к. 13 не больше 14`,
          "Где пригодится оператор < (меньше)?:",
          "Проверка минимального балла:",
          "Например, у тебя есть приложение для тестов, где нужно показать предупреждение, если балл меньше 50. Оператор < помогает это проверить.",
          `score = 45
if score < 50:
    print('Недостаточно баллов')
else:
    print('Достаточно баллов')`,
          "Где пригодится оператор >= (больше или равно)?:",
          "Проверка возраста для совершеннолетия:",
          "Например, у тебя есть приложение, где доступ к уровню открывается только если пользователь набрал 1000 очков или больше. Оператор >= помогает это реализовать.",
          `age = 18
if age >= 18:
    print('Совершеннолетний')
else:
    print('Несовершеннолетний')`,
          "Где пригодится оператор <= (меньше или равно)?:",
          "Проверка лимита попыток:",
          "Например, у тебя есть приложение-викторина, где пользователь может сделать не больше 3 попыток. Оператор <= проверяет, не превышен ли лимит.",
          `attempts = 3
if attempts <= 3:
    print('Попробуй еще раз')
else:
    print('Лимит попыток исчерпан')`,
          "Где пригодится оператор != (не равно)?:",
          "Проверка неправильного пароля:",
          "Например, у тебя есть приложение, где нужно показать ошибку, если введённый пароль не совпадает с сохранённым. Оператор != сравнивает значения.",
          `password = '1234'
if password != 'qwerty':
    print('Пароль неверный')
else:
    print('Пароль верный')`,
          "Где пригодится оператор == (равно)?:",
          "Проверка премиум-доступа: if has_premium == True: ...",
          "Например, у тебя есть приложение, где нужно проверить, активен ли у пользователя премиум. Оператор == сравнивает статус.",
          `has_premium = False
if has_premium == True:
    print('Премиум есть')
else:
    print('Нет премиума')  # Нет премиума`,
          "Где пригодится оператор not (отрицание)?:",
          "Проверка отсутствия подписки:",
          "Например, у тебя есть приложение, где нужно показать предложение купить подписку, если она не активна. Оператор not помогает это проверить.",
          `has_subscription = False
if not has_subscription:
    print('Нет подписки')
else:
    print('Подписка активна')`,
          "Где пригодится оператор and?:",
          "Проверка возраста и премиума одновременно:",
          "Например, у тебя есть приложение, где доступ к VIP-разделу открыт только если пользователь старше 14 лет и у него есть премиум. Оператор and объединяет оба условия.",
          `age = 13
has_premium = False
if age > 14 and has_premium:
    print('Доступ в чат')
else:
    print('Нет доступа')  # Нет доступа, т.к. оба условия не выполнены`,
          "Где пригодится оператор or?:",
          "Проверка альтернативного условия активности:",
          "Например, у тебя есть приложение, где бонус начисляется, если пользователь либо выполнил задание, либо набрал достаточно баллов. Оператор or позволяет учесть оба варианта.",
          `activity = 120
if activity > 100:
    print('Доступ по активности!')  # Доступ открыт, т.к. 120 > 100
else:
    print('Недостаточно активности')`,
        ],
        exampleAnalysis: {
          title: "Разбор примера: Секретный чат",
          content: `\uD83D\uDD0E Представим, что вы делаете приложение для общения. В нём есть секретный чат, куда можно попасть только по правилам:\n\n1. Пользователь должен быть старше 14 лет и иметь премиум-доступ (has_premium = True).\n2. Либо он может попасть в чат, если его уровень активности выше 100 (activity > 100), даже без премиума.\n\nПример кода:\n\nage = 13\nhas_premium = False\nactivity = 120\nif (age > 14 and has_premium) or activity > 100:\n    print('Доступ в секретный чат открыт!')\nelse:\n    print('Нет доступа')\n\nВ этом примере:\n- Первый пользователь не старше 14 и без премиума, но у него activity = 120 (>100), поэтому он попадает в чат!\n- Если бы activity было меньше 100, доступ был бы закрыт.\n\n\uD83D\uDCA1 Где пригодится?\n- В реальных приложениях часто нужно проверять несколько условий сразу: возраст, подписка, активность, статус и т.д.\n- Такие конструкции делают программы гибкими и безопасными.`
        },
        motivation: "С помощью if/elif/else твои программы становятся умнее и гибче! Не бойся ошибаться — это путь к мастерству."
      },
      {
        type: "practice",
        title: "Практика: if, elif, else",
        content:
          "\uD83D\uDCDD Напиши программу, которая спрашивает у пользователя возраст и выводит: 'Взрослый', если возраст 18 и больше, 'Подросток', если от 12 до 17, иначе — 'Ребёнок'.",
        code: `age = int(input('Сколько тебе лет? '))\nif age >= 18:\n    print('Взрослый')\nelif age >= 12:\n    print('Подросток')\nelse:\n    print('Ребёнок')`,
        task: "Запроси возраст и выведи, кто пользователь: взрослый, подросток или ребёнок.",
        answer: `age = int(input('Сколько тебе лет? '))\nif age >= 18:\n    print('Взрослый')\nelif age >= 12:\n    print('Подросток')\nelse:\n    print('Ребёнок')`,
        hint: "\uD83D\uDCA1 Используй int(input()), if, elif, else и print(). Не забудь про отступы!",
        errorExample: {
          code: `age = input('Сколько тебе лет?')\nif age >= 18:\n    print('Взрослый')`,
          explanation: "input() возвращает строку, а не число. Нужно преобразовать в int!"
        },
        motivation: "Практика — лучший способ понять, как работают условия! Не бойся ошибаться: каждая попытка делает тебя сильнее."
      },
      {
        type: "additional_practice",
        title: "\uD83D\uDCDD Дополнительные задачи: if, elif, else",
        difficulty: "easy",
        content: "\uD83C\uDF4E Легкие задачи:",
        tasks: [
          {
            task: "Проверь, является ли число положительным. Если да — выведи 'Положительное', иначе — 'Не положительное'",
            answer: `x = int(input())\nif x > 0:\n    print('Положительное')\nelse:\n    print('Не положительное')`,
            hint: "\uD83D\uDCA1 Используй if, else и print()"
          },
          {
            task: "Проверь, чётное ли число. Если да — выведи 'Чётное', иначе — 'Нечётное'",
            answer: `n = int(input())\nif n % 2 == 0:\n    print('Чётное')\nelse:\n    print('Нечётное')`,
            hint: "\uD83D\uDCA1 Используй %, if, else и print()"
          },
          {
            task: "Проверь, больше ли число 10. Если да — выведи 'Больше 10', иначе — '10 или меньше'",
            answer: `a = int(input())\nif a > 10:\n    print('Больше 10')\nelse:\n    print('10 или меньше')`,
            hint: "\uD83D\uDCA1 Используй if, else и print()"
          },
          {
            task: "Проверь, равно ли число 0. Если да — выведи 'Ноль', иначе — 'Не ноль'",
            answer: `y = int(input())\nif y == 0:\n    print('Ноль')\nelse:\n    print('Не ноль')`,
            hint: "\uD83D\uDCA1 Используй ==, if, else и print()"
          },
          {
            task: "Проверь, делится ли число на 5. Если да — выведи 'Делится', иначе — 'Не делится'",
            answer: `k = int(input())\nif k % 5 == 0:\n    print('Делится')\nelse:\n    print('Не делится')`,
            hint: "\uD83D\uDCA1 Используй %, if, else и print()"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "\uD83D\uDCDD Дополнительные задачи: if, elif, else",
        difficulty: "medium",
        content: "\uD83D\uDD25 Средние задачи:",
        tasks: [
          {
            task: "Проверь, является ли число отрицательным, положительным или нулём.",
            answer: `z = int(input())\nif z > 0:\n    print('Положительное')\nelif z < 0:\n    print('Отрицательное')\nelse:\n    print('Ноль')`,
            hint: "\uD83D\uDCA1 Используй if, elif, else и print()"
          },
          {
            task: "Проверь, делится ли число на 3 и на 2. Если да — выведи 'Делится на 6', иначе — 'Не делится на 6'",
            answer: `n = int(input())\nif n % 3 == 0 and n % 2 == 0:\n    print('Делится на 6')\nelse:\n    print('Не делится на 6')`,
            hint: "\uD83D\uDCA1 Используй %, and, if, else и print()"
          },
          {
            task: "Проверь, больше ли первое число второго, меньше или равно. Выведи соответствующее сообщение.",
            answer: `a = int(input())\nb = int(input())\nif a > b:\n    print('Первое больше')\nelif a < b:\n    print('Второе больше')\nelse:\n    print('Равны')`,
            hint: "\uD83D\uDCA1 Используй if, elif, else и print()"
          },
          {
            task: "Проверь, является ли год високосным (делится на 4, но не на 100, или делится на 400). Выведи 'Високосный' или 'Обычный'",
            answer: `year = int(input())\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print('Високосный')\nelse:\n    print('Обычный')`,
            hint: "\uD83D\uDCA1 Используй %, and, or, if, else и print()"
          },
          {
            task: "Проверь, входит ли число в диапазон от 1 до 100 включительно. Выведи 'Входит' или 'Не входит'",
            answer: `num = int(input())\nif 1 <= num <= 100:\n    print('Входит')\nelse:\n    print('Не входит')`,
            hint: "\uD83D\uDCA1 Используй if, else и print()"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "\uD83D\uDCDD Дополнительные задачи: if, elif, else",
        difficulty: "hard",
        content: "\uD83D\uDCAA Сложные задачи:",
        tasks: [
          {
            task: "Проверь, является ли число трёхзначным и чётным. Если да — выведи 'Трёхзначное чётное', иначе — 'Нет'",
            answer: `n = int(input())\nif 100 <= n <= 999 and n % 2 == 0:\n    print('Трёхзначное чётное')\nelse:\n    print('Нет')`,
            hint: "\uD83D\uDCA1 Используй if, and, else и print()"
          },
          {
            task: "Проверь, является ли число квадратом другого. Вводятся два числа.",
            answer: `a = int(input())\nb = int(input())\nif a == b ** 2 or b == a ** 2:\n    print('Является квадратом')\nelse:\n    print('Не является квадратом')`,
            hint: "\uD83D\uDCA1 Используй if, or, else и print()"
          },
          {
            task: "Проверь, делится ли число на 7 или на 11. Если да — выведи 'Делится', иначе — 'Не делится'",
            answer: `x = int(input())\nif x % 7 == 0 or x % 11 == 0:\n    print('Делится')\nelse:\n    print('Не делится')`,
            hint: "\uD83D\uDCA1 Используй %, or, if, else и print()"
          },
          {
            task: "Проверь, является ли строка палиндромом (читается одинаково слева направо и справа налево). Вводится строка.",
            answer: `s = input()\nif s == s[::-1]:\n    print('Палиндром')\nelse:\n    print('Не палиндром')`,
            hint: "\uD83D\uDCA1 Используй срезы, if, else и print()"
          },
          {
            task: "Проверь, является ли число одновременно кратным 3 и 5. Если да — выведи 'Кратно 15', иначе — 'Нет'",
            answer: `n = int(input())\nif n % 3 == 0 and n % 5 == 0:\n    print('Кратно 15')\nelse:\n    print('Нет')`,
            hint: "\uD83D\uDCA1 Используй %, and, if, else и print()"
          }
        ]
      },
      {
        type: "theory_practice",
        title: "\uD83D\uDCDD Самостоятельная практика: if, elif, else",
        content:
          "\uD83D\uDCBB Напиши программу, которая:\n1. Запрашивает у пользователя число\n2. Если оно делится на 2 и на 3 — выводит 'Делится на 6'\n3. Если только на 2 — 'Делится на 2'\n4. Если только на 3 — 'Делится на 3'\n5. Иначе — 'Не делится на 2 и 3'",
        code: `n = int(input('Введите число: '))\nif n % 2 == 0 and n % 3 == 0:\n    print('Делится на 6')\nelif n % 2 == 0:\n    print('Делится на 2')\nelif n % 3 == 0:\n    print('Делится на 3')\nelse:\n    print('Не делится на 2 и 3')`,
        expectedOutput: "Введите число: 12\nДелится на 6",
        hint: "\uD83D\uDCA1 Используй if, elif, else, %, and, print() и правильные отступы."
      },
      {
        type: "quiz",
        title: "Проверь себя \uD83E\uDDE0",
        question: "Что выведет этот код?\\n\\nage = 10\\nif age > 18:\\n    print('Взрослый')\\nelif age > 12:\\n    print('Подросток')\\nelse:\\n    print('Ребёнок')",
        options: ["Взрослый", "Подросток", "Ребёнок", "Ошибка"],
        correct: 1,
        hint: "\uD83D\uDCA1 Сначала проверяется age > 18 (ложь), затем age > 12 (истина), значит сработает elif."
      },
    ],
    []
  );

  // Мемоизируем текущий шаг
  const currentStepData = useMemo(() => steps[currentStep], [steps, currentStep]);

  // Обработка завершения урока
  const handleLessonCompletion = useCallback(async () => {
    if (isLessonCompleted) return;

    try {
      // Завершаем урок локально
      const success = await completeLesson();
      if (success) {
        setLessonCompleted(true);
        setShowCongratulations(true);
        setIsLessonPassed(true);
        // Сохраняем прогресс в localStorage
        saveLessonProgress(3);
        console.log("Урок успешно завершен!");

        // Перенаправляем на страницу курсов через 3 секунды
        setTimeout(() => {
          navigate("/python-course");
        }, 3000);
      } else {
        console.error("Ошибка завершения урока");
      }
    } catch (error) {
      console.error("Ошибка при завершении урока:", error);
    }
  }, [completeLesson, isLessonCompleted, navigate, user?.userId]);

  // Загрузка сохраненного ответа при изменении шага
  useEffect(() => {
    const stepAnswer = getStepAnswer(currentStep);
    if (stepAnswer && stepAnswer.answer) {
      setUserAnswer(stepAnswer.answer);
      // Восстанавливаем правильность ответа для всех типов заданий
      setIsCorrect(stepAnswer.isCorrect);
    } else {
      setUserAnswer("");
      setIsCorrect(null);
    }
  }, [currentStep, getStepAnswer, steps]);

  // Очистка сохраненных ответов при загрузке урока (если урок не завершен)
  useEffect(() => {
    if (!isLessonCompleted) {
      clearLessonProgress();
      console.log("Очищены сохраненные ответы для повторного прохождения");
    }
  }, [isLessonCompleted, clearLessonProgress]);

  // Инициализация прогресса при загрузке
  useEffect(() => {
    if (lessonProgress.progress === 0) {
      updateCurrentStep(currentStep, steps.length);
    }

    // Проверяем, пройден ли урок
    const lessonPassed = checkLessonProgress(3);
    setIsLessonPassed(lessonPassed);
  }, [currentStep, steps.length, lessonProgress.progress, updateCurrentStep]);

  // Сохранение ответа в localStorage
  const saveAnswer = (answer) => {
    saveStepAnswer(currentStep, answer);
  };

  const handleNext = () => {
    // Проверяем, выполнено ли текущее задание
    const currentStepData = steps[currentStep];
    let canProceed = true;

    if (currentStepData.type === "practice") {
      // Для практических заданий проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "quiz") {
      // Для тестов проверяем, что ответ правильный
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "theory_practice") {
      // Для теории с практикой проверяем, что задание выполнено
      if (isCorrect !== true) {
        canProceed = false;
      }
    } else if (currentStepData.type === "additional_practice") {
      // Для дополнительных задач проверяем, что все 5 задач выполнены правильно
      const completedTasks = currentStepData.tasks.filter((_, index) => 
        additionalTaskAnswers[`${index}_correct`] === true
      );
      if (completedTasks.length < 5) {
        canProceed = false;
      }
    }

    // Нельзя перейти дальше на последнем шаге
    if (currentStep >= steps.length - 1) {
      canProceed = false;
    }

    if (canProceed && currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setAdditionalTaskAnswers({});
      setAdditionalTaskHints({});
      setAdditionalTaskAttempts({});
      setAdditionalTaskShowAnswer({});
      setIsCorrect(null);
    } else if (!canProceed) {
      // Показываем предупреждение
      if (currentStep >= steps.length - 1) {
        alert("🎯 Это последний шаг урока. Ответьте на вопрос выше!");
      } else if (currentStepData.type === "additional_practice") {
        const completedTasks = currentStepData.tasks.filter((_, index) => 
          additionalTaskAnswers[`${index}_correct`] === true
        );
        alert(`⚠️ Выполните все 5 задач правильно! Выполнено: ${completedTasks.length}/5`);
      } else {
        alert("⚠️ Сначала выполните текущее задание правильно!");
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setAdditionalTaskAnswers({});
      setAdditionalTaskHints({});
      setAdditionalTaskAttempts({});
      setAdditionalTaskShowAnswer({});
      setIsCorrect(null);
    }
  };

  // Оптимизированный обработчик изменения текста
  const handleTextChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  // Оптимизированный обработчик изменения ответа в тесте
  const handleQuizAnswerChange = useCallback((e) => {
    console.log("=== ИЗМЕНЕНИЕ ОТВЕТА В ТЕСТЕ ===");
    console.log("e.target.value:", e.target.value);
    console.log("typeof e.target.value:", typeof e.target.value);
    setUserAnswer(e.target.value);
    console.log("setUserAnswer вызван с:", e.target.value);
  }, []);

  // Оптимизированный обработчик показа подсказки
  const toggleHint = useCallback(() => {
    setShowHint((prev) => !prev);
  }, []);

  // Улучшенная проверка ответа с более гибким сравнением
  const normalizeAnswer = (answer) => {
    return answer
      .trim()
      .replace(/\s+/g, "") // Убираем все пробелы
      .replace(/["""]/g, '"') // Нормализуем кавычки
      .replace(/[''']/g, "'") // Нормализуем одинарные кавычки
      .toLowerCase();
  };

  // Функция для анализа ошибок в коде
  const analyzeCodeErrors = (userCode, correctCode) => {
    const userLines = userCode.trim().split('\n').filter(line => line.trim());
    const correctLines = correctCode.trim().split('\n').filter(line => line.trim());
    
    const errors = [];
    
    // Проверяем количество строк
    if (userLines.length < correctLines.length) {
      errors.push(`Проверь, что ты написал все ${correctLines.length} строки кода`);
    }
    
    // Проверяем наличие ключевых элементов
    if (!userCode.includes('print')) {
      errors.push('Проверь, что ты используешь функцию print() для вывода результата');
    }
    
    // Проверяем математические операторы
    const operators = ['+', '-', '*', '/', '//', '%', '**'];
    const missingOperators = operators.filter(op => correctCode.includes(op) && !userCode.includes(op));
    if (missingOperators.length > 0) {
      if (missingOperators.length === 1) {
        errors.push(`Проверь, что ты используешь оператор ${missingOperators[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы: ${missingOperators.join(', ')}`);
      }
    }
    
    // Проверяем переменные и их значения
    const variablePattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^#\n]+)/g;
    const correctVars = {};
    const userVars = {};
    
    // Извлекаем переменные из правильного кода
    let match;
    while ((match = variablePattern.exec(correctCode)) !== null) {
      const varName = match[1].trim();
      const varValue = match[2].trim();
      correctVars[varName] = varValue;
    }
    
    // Извлекаем переменные из кода пользователя
    variablePattern.lastIndex = 0; // Сбрасываем индекс для повторного использования
    while ((match = variablePattern.exec(userCode)) !== null) {
      const varName = match[1].trim();
      const varValue = match[2].trim();
      userVars[varName] = varValue;
    }
    
    // Проверяем отсутствующие переменные
    const missingVars = Object.keys(correctVars).filter(varName => !userVars[varName]);
    if (missingVars.length > 0) {
      errors.push(`Проверь, что ты создал переменную ${missingVars[0]}`);
    }
    
    // Проверяем неправильные значения переменных
    Object.keys(correctVars).forEach(varName => {
      if (userVars[varName] && userVars[varName] !== correctVars[varName]) {
        errors.push(`Проверь переменную ${varName} - правильно ли ты написал число ${correctVars[varName]}`);
      }
    });
    
    // Проверяем операторы сравнения
    const comparisonOps = ['==', '!=', '>', '<', '>=', '<='];
    const missingComparison = comparisonOps.filter(op => correctCode.includes(op) && !userCode.includes(op));
    if (missingComparison.length > 0) {
      if (missingComparison.length === 1) {
        errors.push(`Проверь, что ты используешь оператор сравнения ${missingComparison[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы сравнения: ${missingComparison.join(', ')}`);
      }
    }
    
    // Проверяем синтаксис
    if (userCode.includes('==') && !userCode.includes('print')) {
      errors.push('Проверь, что ты выводишь результат сравнения через print()');
    }
    
    // Проверяем логические операторы
    const logicalOps = ['and', 'or', 'not'];
    const missingLogical = logicalOps.filter(op => correctCode.includes(op) && !userCode.includes(op));
    if (missingLogical.length > 0) {
      if (missingLogical.length === 1) {
        errors.push(`Проверь, что ты используешь логический оператор ${missingLogical[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь логические операторы: ${missingLogical.join(', ')}`);
      }
    }
    
    return errors;
  };

  const handleAnswerSubmit = useCallback(() => {
    console.log("=== НАЧАЛО handleAnswerSubmit ===");
    console.log("currentStep:", currentStep);
    console.log("userAnswer:", userAnswer);
    console.log("typeof userAnswer:", typeof userAnswer);

    const currentStepData = steps[currentStep];
    console.log("currentStepData:", currentStepData);
    console.log("currentStepData.type:", currentStepData.type);

    let isAnswerCorrect = false;

    if (currentStepData.type === "practice") {
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      const normalizedCorrectAnswer = normalizeAnswer(currentStepData.answer);

      // Проверяем точное совпадение
      const isExactMatch = normalizedUserAnswer === normalizedCorrectAnswer;

      // Проверяем наличие ключевых элементов для разных типов заданий
      const hasInput = normalizedUserAnswer.includes("input");
      const hasPrint = normalizedUserAnswer.includes("print");
      const hasInt = normalizedUserAnswer.includes("int");
      const hasFString = normalizedUserAnswer.includes('f"') || normalizedUserAnswer.includes("f'");
      const hasQuotes = normalizedUserAnswer.includes('"') || normalizedUserAnswer.includes("'");

      if (isExactMatch) {
        setIsCorrect(true);
        isAnswerCorrect = true;
      } else {
        // Анализируем ошибки
        const errors = analyzeCodeErrors(userAnswer, currentStepData.answer);
        if (errors.length > 0) {
          setIsCorrect({ type: "error", errors });
        } else {
          setIsCorrect("almost");
        }
        isAnswerCorrect = false;
      }
    } else if (currentStepData.type === "quiz") {
      console.log("=== ОБРАБОТКА ТЕСТА ===");
      console.log("userAnswer:", userAnswer);
      console.log("currentStepData.correct:", currentStepData.correct);
      console.log("typeof userAnswer:", typeof userAnswer);
      console.log("typeof currentStepData.correct:", typeof currentStepData.correct);

      // Приводим оба значения к строкам для корректного сравнения
      const userAnswerStr = userAnswer.toString();
      const correctAnswerStr = currentStepData.correct.toString();

      console.log("userAnswerStr:", userAnswerStr);
      console.log("correctAnswerStr:", correctAnswerStr);

      isAnswerCorrect = userAnswerStr === correctAnswerStr;
      console.log("isAnswerCorrect:", isAnswerCorrect);

      setIsCorrect(isAnswerCorrect);
      console.log("setIsCorrect вызван с:", isAnswerCorrect);
    } else if (currentStepData.type === "additional_practice") {
      // Для дополнительных задач проверяем ответы по очереди
      const normalizedUserAnswer = normalizeAnswer(userAnswer);
      
      // Проверяем все задачи в текущем блоке
      let foundCorrectAnswer = false;
      for (const task of currentStepData.tasks) {
        const normalizedCorrectAnswer = normalizeAnswer(task.answer);
        if (normalizedUserAnswer === normalizedCorrectAnswer) {
          foundCorrectAnswer = true;
          break;
        }
      }
      
      setIsCorrect(foundCorrectAnswer);
      isAnswerCorrect = foundCorrectAnswer;
    }

    // Сохраняем ответ
    console.log("=== СОХРАНЕНИЕ ОТВЕТА ===");
    console.log("currentStep:", currentStep);
    console.log("userAnswer:", userAnswer);
    console.log("isAnswerCorrect:", isAnswerCorrect);

    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
    console.log("=== КОНЕЦ handleAnswerSubmit ===");
  }, [currentStep, steps, userAnswer, normalizeAnswer, saveStepAnswer]);
  
    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6 mb-5">
      {/* Модальное окно с поздравлением */}
      {showCongratulations && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Поздравляем!</h2>
            <p className="text-gray-600 mb-6">Вы успешно завершили урок "Переменные. Вывод и ввод данных"!</p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium mb-2">🎯 Вы изучили:</p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Создание и использование переменных</li>
                <li>• Функции print() и input()</li>
                <li>• Преобразование типов данных</li>
                <li>• Форматирование строк</li>
              </ul>
            </div>
            <p className="text-gray-500 text-sm">Перенаправление на страницу курсов через 3 секунды...</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div className="bg-green-500 h-2 rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}


      {/* Прогресс бар */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">📚 Урок 5: Условные операторы</span>
            {isLessonPassed && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">✅ Пройден</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">📍 {currentStep + 1} из {steps.length}</span>
            <span className="text-sm font-medium text-green-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
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

        <motion.div key={`content-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* Теоретический контент */}
          {currentStepData.content && (
            <div className="text-gray-700 leading-relaxed text-lg">
              {currentStepData.content.split("\n").map((line, index) => (
                <p key={index} className="mb-3">{line}</p>
              ))}
            </div>
          )}

          {/* Метафора */}
          {currentStepData.metaphor && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎭</span>
                <span className="text-purple-800 font-bold text-xl">Метафора</span>
              </div>
              <div className="space-y-3">
                {currentStepData.metaphor.map((line, i) => (
                  <p key={i} className="text-purple-700 text-lg">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Код */}
          {currentStepData.code && currentStepData.type !== "theory_practice" && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-medium flex items-center">🐍 Python</span>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.code)}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <pre className="text-green-400 overflow-x-auto text-lg select-none pointer-events-none">
                <code>{currentStepData.code}</code>
              </pre>
            </div>
          )}

          {/* Объяснение кода */}
          {currentStepData.explanation && currentStepData.type !== "theory_practice" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💡</span>
                <span className="text-blue-800 font-semibold">Объяснение</span>
              </div>
              <div className="text-blue-800 text-lg">
                {currentStepData.explanation.split("\n").map((line, index) => (
                  <p key={index} className="mb-3">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Частые ошибки новичков */}
          {currentStepData.errorExample && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-4 rounded-xl mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">⚠️</span>
                <span className="text-red-800 font-semibold">Частые ошибки новичков:</span>
              </div>
              <div className="text-red-800 text-lg">
                <pre className="bg-gray-900 rounded-lg p-3 text-red-300 text-sm mb-2 overflow-x-auto">{currentStepData.errorExample.code}</pre>
                <div>{currentStepData.errorExample.explanation}</div>
              </div>
            </div>
          )}

          {/* Где пригодится (дополнительный пример) */}
          {currentStepData.examples && (
            <div className="space-y-8 mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">🛠️</span>
                <span className="text-green-800 font-semibold text-lg">Разбор операторов:</span>
              </div>
              {/* Группировка по типам данных и сбор резюме */}
              {(() => {
                // Группируем по типам данных и собираем резюме отдельно
                const groups = [];
                let currentGroup = null;
                let currentType = null;
                const typeRegex = /Где пригодится (.+)\?:/i;
                const resumeBlocks = [];

                let inResume = false;
                let currentResume = [];
                currentStepData.examples.forEach((ex, i) => {
                  // Начало резюме
                  if (ex.trim().startsWith("Резюмируя:") || ex.trim().startsWith("Резюмируя:")) {
                    if (currentResume.length > 0) {
                      resumeBlocks.push([...currentResume]);
                      currentResume = [];
                    }
                    inResume = true;
                    currentResume.push(ex);
                    return;
                  }
                  // Если встретили новый тип данных — закрываем резюме, если оно было
                  const match = ex.match(typeRegex);
                  if (match) {
                    if (inResume && currentResume.length > 0) {
                      resumeBlocks.push([...currentResume]);
                      currentResume = [];
                      inResume = false;
                    }
                    if (currentGroup) groups.push(currentGroup);
                    currentType = match[1].trim();
                    currentGroup = {
                      type: currentType,
                      items: [
                        {
                          type: "header",
                          content: ex,
                        },
                      ],
                    };
                    return;
                  }
                  // Если мы в резюме — продолжаем собирать
                  if (inResume) {
                    currentResume.push(ex);
                    return;
                  }
                  // Обычные элементы типа данных
                  if (currentGroup) {
                    currentGroup.items.push({ type: "item", content: ex });
                  }
                });
                // Закрываем последнее резюме, если оно было
                if (inResume && currentResume.length > 0) {
                  resumeBlocks.push([...currentResume]);
                }
                if (currentGroup) groups.push(currentGroup);
                // Рендерим группы типов данных
                return (
                  <>
                    {groups.map((group, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-green-300 rounded-2xl shadow-lg p-6 space-y-4 animate-fade-in"
                      >
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">🔹</span>
                          <span className="text-green-900 font-bold text-xl">{group.type}</span>
                        </div>
                        <div className="space-y-4">
                          {group.items.map((item, i) => {
                            const ex = item.content;
                            // Блок: Где пригодится ... (заголовок)
                            if (item.type === "header") {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">📦</span>
                                  <span className="text-yellow-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Ошибка
                            if (ex.trim().startsWith("⚠️") || ex.trim().startsWith("❌")) {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-red-100 to-pink-50 border-l-4 border-red-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">⚠️</span>
                                  <span className="text-red-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Правильное решение
                            if (ex.trim().startsWith("✅")) {
                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-r from-green-100 to-emerald-50 border-l-4 border-green-400 shadow-md rounded-xl p-4 flex items-center space-x-3 animate-fade-in"
                                >
                                  <span className="text-2xl">✅</span>
                                  <span className="text-green-900 font-semibold text-base">{ex}</span>
                                </div>
                              );
                            }
                            // Блок: Пример (код)
                            const isCode =
                              ex.trim().match(/^[a-zA-Z_][a-zA-Z0-9_ ]* ?=|print\(|total ?=|score ?=|item[12] ?=|result ?=|^#|^\d+\./) ||
                              ex.trim() === "score + 10";
                            if (isCode) {
                              return (
                                <pre
                                  key={i}
                                  className="bg-gray-900 rounded-xl p-3 text-green-300 text-sm mb-2 overflow-x-auto border border-gray-700 animate-fade-in"
                                >
                                  {ex}
                                </pre>
                              );
                            }
                            
                            // Блок: Обычный текст
                            return (
                              <div
                                key={i}
                                className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 shadow rounded-xl p-4 text-blue-900 animate-fade-in"
                              >
                                {ex}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {/* Резюме отдельными секциями */}
                    {resumeBlocks.length > 0 && (
                      <div className="space-y-6 mt-16">
                        {resumeBlocks.map((resumeArr, i) => (
                          <div key={i} className="bg-white border border-gray-200 shadow rounded-2xl p-6 flex items-start space-x-4 animate-fade-in">
                            <span className="text-3xl mt-1 text-blue-400">📌</span>
                            <div className="space-y-2 w-full">
                              {resumeArr.map((ex, j) =>
                                j === 0 ? (
                                  <div key={j} className="text-lg font-semibold text-blue-800 mb-1">
                                    {ex.replace(/Резюмируя:/, "Резюмируя:")}
                                  </div>
                                ) : (
                                  <div key={j} className="text-base text-gray-800 leading-relaxed">
                                    {ex}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* Пояснение о типах данных */}
          {/* {currentStepData.examples && (
            <div className="mt-4 text-green-900 text-base bg-green-50 border-l-4 border-green-400 rounded p-3">
              <span className="font-semibold">Важно:</span> Это не значит, что нужно всегда использовать только один тип данных (например,{" "}
              <span className="font-mono">int</span>). Просто для каждой задачи есть свой подходящий тип данных: для чисел —{" "}
              <span className="font-mono">int</span> или <span className="font-mono">float</span>, для текста — <span className="font-mono">str</span>, для
              ответов "да/нет" — <span className="font-mono">bool</span>. Главное — использовать тот тип, который подходит для вашей задачи!
            </div>
          )} */}

          {/* Практическое задание */}
          {currentStepData.type === "practice" && (
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
                  className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-mono resize-none"
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
                    <div className="text-blue-800 text-lg">
                      {currentStepData.hint.split("\n").map((line, index) => (
                        <p key={index} className="mb-3">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {isCorrect !== null && (
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect === true
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                        : isCorrect === "almost"
                        ? "bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300"
                        : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                    }`}
                  >
                    {isCorrect === true ? (
                      <p className="text-green-800 text-lg font-semibold">
                        🎉 Правильно! Отличная работа! Теперь можете перейти к следующему шагу.
                      </p>
                    ) : isCorrect === "almost" ? (
                      <p className="text-yellow-800 text-lg font-semibold">
                        ⚠️ Ответ почти верный, но проверь скобки и кавычки. Убедись, что используешь правильные кавычки и нет лишних пробелов.
                      </p>
                    ) : isCorrect.type === "error" ? (
                      <div className="text-red-800">
                        <p className="text-lg font-semibold mb-3">❌ Проверь свой код:</p>
                        <ul className="space-y-2">
                          {isCorrect.errors.map((error, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-red-600 mt-1">•</span>
                              <span className="text-base">{error}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-red-800 text-lg font-semibold">
                        ❌ Попробуйте еще раз. Проверьте синтаксис.
                      </p>
                    )}
                  </div>
                )}

                {/* Информация о необходимости выполнения задания */}
                {currentStepData.type === "practice" && isCorrect === null && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-blue-800 text-lg">Выполните задание правильно, чтобы перейти к следующему шагу</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Дополнительные задачи */}
          {currentStepData.type === "additional_practice" && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                  {currentStepData.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-indigo-700">
                    Выполнено: {currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length}/5
                  </span>
                  <div className="w-16 h-2 bg-indigo-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{ 
                        width: `${(currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length / 5) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-indigo-700 mb-6 text-lg">{currentStepData.content}</p>

              <div className="space-y-6">
                {currentStepData.tasks.map((task, index) => (
                  <div key={index} className="bg-white border border-indigo-200 rounded-lg p-4 shadow-md">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">
                      Задача {index + 1}:
                    </h4>
                    <p className="text-gray-700 mb-4 text-lg">{task.task}</p>
                    
                                         <div className="space-y-3">
                       <textarea
                         value={additionalTaskAnswers[index] || ""}
                         onChange={(e) => {
                           setAdditionalTaskAnswers(prev => ({
                             ...prev,
                             [index]: e.target.value
                           }));
                         }}
                         placeholder="✍️ Введите ваш код здесь..."
                         className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base font-mono resize-none"
                         spellCheck="false"
                       />

                       <div className="flex space-x-3">
                         <button
                           onClick={() => {
                             const answer = additionalTaskAnswers[index] || "";
                             const normalizedUserAnswer = normalizeAnswer(answer);
                             const normalizedCorrectAnswer = normalizeAnswer(task.answer);
                             const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;
                             
                             // Увеличиваем счетчик попыток только если ответ неправильный
                             if (!isCorrect) {
                               const currentAttempts = additionalTaskAttempts[index] || 0;
                               const newAttempts = currentAttempts + 1;
                               setAdditionalTaskAttempts(prev => ({
                                 ...prev,
                                 [index]: newAttempts
                               }));
                             }
                             
                             let result;
                             if (isCorrect) {
                               result = true;
                             } else {
                               const errors = analyzeCodeErrors(answer, task.answer);
                               result = { type: "error", errors };
                             }
                             
                             // Обновляем состояние для конкретной задачи
                             setAdditionalTaskAnswers(prev => ({
                               ...prev,
                               [`${index}_correct`]: result
                             }));
                           }}
                           disabled={!additionalTaskAnswers[index] || additionalTaskAnswers[index].trim() === ""}
                           className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md text-sm ${
                             additionalTaskAnswers[index] && additionalTaskAnswers[index].trim() !== ""
                               ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700"
                               : "bg-gray-300 text-gray-500 cursor-not-allowed"
                           }`}
                         >
                           <span>✅</span>
                           <span>Проверить</span>
                         </button>
                         <button
                           onClick={() => {
                             setAdditionalTaskHints(prev => ({
                               ...prev,
                               [index]: !prev[index]
                             }));
                           }}
                           className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-md text-sm"
                         >
                           <span>💡</span>
                           <span>Подсказка</span>
                         </button>
                         <button
                           onClick={() => {
                             setAdditionalTaskShowAnswer(prev => ({
                               ...prev,
                               [index]: !prev[index]
                             }));
                           }}
                           disabled={additionalTaskAnswers[`${index}_correct`] !== true && (additionalTaskAttempts[index] || 0) < 5}
                           className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md text-sm ${
                             additionalTaskAnswers[`${index}_correct`] === true || (additionalTaskAttempts[index] || 0) >= 5
                               ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                               : "bg-gray-300 text-gray-500 cursor-not-allowed"
                           }`}
                         >
                           <span>🎯</span>
                           <span>Показать ответ</span>
                           {additionalTaskAnswers[`${index}_correct`] !== true && (additionalTaskAttempts[index] || 0) < 5 && (
                             <span className="text-xs">({additionalTaskAttempts[index] || 0}/5)</span>
                           )}
                         </button>
                       </div>

                                             {additionalTaskHints[index] && (
                         <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-3">
                           <div className="flex items-center mb-2">
                             <span className="text-lg mr-2">💡</span>
                             <span className="text-blue-800 font-semibold">Подсказка</span>
                           </div>
                           <div className="text-blue-800 text-base">
                             {task.hint}
                           </div>
                         </div>
                       )}

                                             {additionalTaskAnswers[`${index}_correct`] !== undefined && (
                         <div
                           className={`p-3 rounded-lg ${
                             additionalTaskAnswers[`${index}_correct`] === true
                               ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                               : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                           }`}
                         >
                           {additionalTaskAnswers[`${index}_correct`] === true ? (
                             <p className="text-green-800 text-base font-semibold">
                               🎉 Правильно! Отличная работа!
                             </p>
                           ) : additionalTaskAnswers[`${index}_correct`].type === "error" ? (
                             <div className="text-red-800">
                               <p className="text-base font-semibold mb-2">❌ Проверь свой код:</p>
                               <ul className="space-y-1">
                                 {additionalTaskAnswers[`${index}_correct`].errors.map((error, errorIndex) => (
                                   <li key={errorIndex} className="flex items-start space-x-2">
                                     <span className="text-red-600 mt-1">•</span>
                                     <span className="text-sm">{error}</span>
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           ) : (
                             <p className="text-red-800 text-base font-semibold">
                               ❌ Попробуйте еще раз. Проверьте синтаксис.
                             </p>
                           )}
                         </div>
                       )}

                       {/* Показать ответ */}
                       {additionalTaskShowAnswer[index] && (
                         <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                           <div className="flex items-center mb-2">
                             <span className="text-lg mr-2">🎯</span>
                             <span className="text-purple-800 font-semibold">Ответ:</span>
                           </div>
                           <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 shadow-lg">
                             <div className="flex items-center mb-2">
                               <span className="text-green-400 font-medium text-sm">🐍 Python</span>
                             </div>
                             <pre className="text-green-400 overflow-x-auto text-sm select-none pointer-events-none">
                               <code>{task.answer}</code>
                             </pre>
                           </div>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Информация о выполнении задач */}
              {(() => {
                const completedTasks = currentStepData.tasks.filter((_, index) => 
                  additionalTaskAnswers[`${index}_correct`] === true
                );
                const totalTasks = currentStepData.tasks.length;
                
                if (completedTasks.length === 0) {
                  return (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">ℹ️</span>
                        <p className="text-blue-800 text-lg">Выполните все 5 задач правильно, чтобы перейти к следующему шагу</p>
                      </div>
                    </div>
                  );
                } else if (completedTasks.length < totalTasks) {
                  return (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎯</span>
                        <p className="text-yellow-800 text-lg">Отлично! Выполнено {completedTasks.length} из {totalTasks} задач. Продолжайте!</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-6">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🎉</span>
                        <p className="text-green-800 text-lg font-semibold">Превосходно! Все задачи выполнены правильно! Можете перейти к следующему шагу.</p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          )}

          {/* Теория с практикой */}
          {currentStepData.type === "theory_practice" && (
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
                    <pre className="text-green-400 text-lg font-mono">{currentStepData.expectedOutput}</pre>
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
                      saveStepAnswer(currentStep, "theory_practice_completed", true);
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
                  <button
                    onClick={() => setShowAnswer((prev) => !prev)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>🎯</span>
                    <span>{showAnswer ? "Скрыть ответ" : "Показать ответ"}</span>
                  </button>
                </div>

                {/* Показать ответ */}
                {showAnswer && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">🎯</span>
                      <span className="text-purple-800 font-semibold">Решение:</span>
                    </div>
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-green-400 font-medium flex items-center">🐍 Python</span>
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
                    {currentStepData.explanation && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-xl mt-4">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">💡</span>
                          <span className="text-blue-800 font-semibold">Объяснение</span>
                        </div>
                        <div className="text-blue-800 text-lg">
                          {currentStepData.explanation.split("\n").map((line, index) => (
                            <p key={index} className="mb-3">{line}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {showHint && currentStepData.hint && (
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💡</span>
                      <span className="text-blue-800 font-semibold">Подсказка</span>
                    </div>
                    <div className="text-blue-800 text-lg">
                      {currentStepData.hint.split("\n").map((line, index) => (
                        <p key={index} className="mb-3">{line}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Информация о выполнении */}
                {isCorrect === null && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">ℹ️</span>
                      <p className="text-emerald-800 text-lg">Выполните задание в своем редакторе кода, затем нажмите "Продолжить"</p>
                    </div>
                  </div>
                )}

                {isCorrect === true && (
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🎉</span>
                      <p className="text-green-800 text-lg font-semibold">Отлично! Вы можете перейти к следующему шагу.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Тест */}
          {currentStepData.type === "quiz" && (
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
                      onChange={handleQuizAnswerChange}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-purple-700 text-lg">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    console.log('=== КНОПКА "ПРОВЕРИТЬ ОТВЕТ" НАЖАТА ===');
                    console.log("userAnswer перед вызовом:", userAnswer);
                    console.log("typeof userAnswer:", typeof userAnswer);
                    console.log("disabled:", !userAnswer);
                    handleAnswerSubmit();
                  }}
                  disabled={!userAnswer}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg ${
                    userAnswer
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
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
                  <div className="text-blue-800 text-lg">
                    {currentStepData.hint.split("\n").map((line, index) => (
                      <p key={index} className="mb-3">{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {isCorrect !== null && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    isCorrect
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300"
                      : "bg-gradient-to-r from-red-100 to-pink-100 border border-red-300"
                  }`}
                >
                  <p className={`text-lg font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect
                      ? "🎉 Правильно! input() всегда возвращает строку, даже если пользователь ввел число. Теперь можете перейти к следующему шагу."
                      : "❌ Неправильно. Попробуйте еще раз."}
                  </p>
                </div>
              )}

              {/* Информация о необходимости ответа на вопрос */}
              {currentStepData.type === "quiz" && isCorrect === null && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">ℹ️</span>
                    <p className="text-blue-800 text-lg">
                      {userAnswer ? "Ответьте на вопрос правильно, чтобы перейти к следующему шагу" : "Выберите ответ на вопрос выше"}
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
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg"
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
                setUserAnswer("");
                setIsCorrect(null);
                setShowHint(false);

                // Удаляем урок из localStorage для полного сброса
                try {
                  const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
                  const updatedLessons = completedLessons.filter((id) => id !== 3);
                  localStorage.setItem("completedLessons", JSON.stringify(updatedLessons));
                  console.log("Урок удален из localStorage для повторного прохождения");
                } catch (error) {
                  console.error("Ошибка удаления урока из localStorage:", error);
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
                if (currentStepData.type === "practice" || currentStepData.type === "quiz" || currentStepData.type === "theory_practice") {
                  // Если урок уже был пройден, не блокируем кнопку
                  return isCorrect !== true && !isLessonPassed;
                } else if (currentStepData.type === "additional_practice") {
                  // Для дополнительных задач проверяем, что все 5 задач выполнены правильно
                  const completedTasks = currentStepData.tasks.filter((_, index) => 
                    additionalTaskAnswers[`${index}_correct`] === true
                  );
                  return completedTasks.length < 5;
                }
                return false;
              })()}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${(() => {
                const currentStepData = steps[currentStep];
                if (currentStepData.type === "practice" || currentStepData.type === "quiz" || currentStepData.type === "theory_practice") {
                  return isCorrect !== true && !isLessonPassed
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
                } else if (currentStepData.type === "additional_practice") {
                  const completedTasks = currentStepData.tasks.filter((_, index) => 
                    additionalTaskAnswers[`${index}_correct`] === true
                  );
                  return completedTasks.length < 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
                }
                return "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg";
              })()}`}
            >
              <span>Далее</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>

      {/* Мотивация */}
      {currentStepData.motivation && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-xl mt-8">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">💪</span>
            <span className="text-yellow-800 font-semibold">Мотивация:</span>
          </div>
          <div className="text-yellow-800 text-lg">{currentStepData.motivation}</div>
        </div>
      )}

   
    </motion.div>
    );
}

export default Level1Unit5; 
