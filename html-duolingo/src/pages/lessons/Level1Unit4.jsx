import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import { useAuth } from "../../context/AuthContext";

function Level1Unit4() {
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
    useLessonProgress(2);

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
        title: "Операторы и выражения в Python ⚡️",
        content:
          "🎯 В этом уроке ты узнаешь, как Python считает, сравнивает и принимает решения!\n\nОператоры — это как инструменты: с их помощью ты складываешь, сравниваешь, проверяешь условия.\n\n💡 Представь, что твой код — это кухня, а операторы — ножи, ложки и венчики. С их помощью ты смешиваешь ингредиенты (данные) и получаешь результат (выражение)!\n\nСегодня разберём математические и логические операторы.",
        code: `# Пример выражения\na = 5 + 3  # 8\nb = 10 - 2  # 8\nc = a > b  # False`,
        motivation: "Операторы — твой первый шаг к созданию умных программ! Не бойся экспериментировать — ошибки это опыт!",
      },
      {
        type: "theory",
        title: "Математические операторы ➕➖✖️➗",
        content:
          "➕ Математические операторы позволяют складывать, вычитать, умножать, делить и делать ещё много всего!\n\nВ Python есть такие операторы:\n+  — сложение\n-  — вычитание\n*  — умножение\n/  — деление (всегда float)\n// — целочисленное деление (без остатка)\n%  — остаток от деления\n** — возведение в степень\n\n📦 Представь:\n+ — это совмещение двух коробок,\n- — убираешь что-то из коробки,\n* — множишь коробки,\n/ — делишь содержимое между друзьями.\n\n💰 В магазине:\n+ — это сумма покупок,\n- — сдача,\n* — цена за несколько товаров,\n/ — делишь счёт между друзьями.\n\n🔢 Математические выражения можно комбинировать:",
        code: `a = 10\nb = 3\nsum = a + b      # 13\ndiff = a - b     # 7\nprod = a * b     # 30\ndiv = a / b      # 3.333...\nint_div = a // b # 3\nmod = a % b      # 1\npow = a ** b     # 1000`,
        explanation:
          "a и b — это числа.\n\n+ складывает,\n- вычитает,\n* умножает,\n/ делит (всегда с точкой!),\n// — делит без остатка,\n% — даёт остаток,\n** — возводит в степень.\n\n🍕 Делить пиццу между друзьями:\n7 // 3 = 2 (каждому по 2 куска),\n7 % 3 = 1 (останется 1 кусок).",
        examples: [
          // +
          "Где пригодится оператор + (сложение)?:",
          "В игре: увеличение очков: score = score + 10",
          "В магазине: сумма покупок: total = price1 + price2",
          "В калькуляторе: print(2 + 3)",
          // -
          "Где пригодится оператор - (вычитание)?:",
          "В магазине: сдача: change = paid - price",
          "В спорте: разница очков: diff = team1 - team2",
          // *
          "Где пригодится оператор * (умножение)?:",
          "В магазине: цена за несколько товаров: total = price * count",
          "В математике: площадь квадрата: area = side * side",
          // /
          "Где пригодится оператор / (деление)?:",
          "В кулинарии: делим ингредиенты: portion = total / people",
          "В финансах: средний доход: avg = total / months",
          // //
          "Где пригодится оператор // (целочисленное деление)?:",
          "В играх: сколько полных уровней: levels = exp // 100",
          "В быту: сколько полных коробок: boxes = apples // 6",
          // %
          "Где пригодится оператор % (остаток)?:",
          "Проверка чётности: if x % 2 == 0: print('Чётное')",
          "В играх: ход игрока: if turn % 2 == 0: ...",
          // **
          "Где пригодится оператор ** (степень)?:",
          "В математике: возведение в квадрат: sq = x ** 2",
          "В финансах: сложный процент: total = deposit * (1.05 ** years)",
          // Ошибки
          "⚠️ Ошибка: деление на ноль!",
          "a = 5\nb = 0\nprint(a / b)  # Ошибка! Нельзя делить на ноль.",
          "✅ Решение: всегда проверяй знаменатель!",
          "if b != 0: print(a / b)",
          "Резюмируя:",
          "Математические операторы — твой калькулятор в Python! Без них не будет ни игр, ни магазинов, ни расчётов!",
        ],
        motivation: "Математика в Python — это просто! Ты управляешь числами, как волшебник! Даже если ошибся — это опыт!",
      },
      {
        type: "practice",
        title: "Практика: Математические операторы 🎯",
        content:
          "🎯 Создай переменные a = 12 и b = 5. Выведи их сумму, разность, произведение и остаток от деления.\n\n🍎 Представь, что у тебя 12 яблок, а у друга 5. Сколько всего яблок? Сколько останется, если поделить на 5?",
        code: "a = 12\nb = 5\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a % b)",
        task: "Создай переменные a = 12, b = 5 и выведи сумму, разность, произведение и остаток от деления",
        answer: "a = 12\nb = 5\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a % b)",
        hint: "💡 Используй +, -, *, % для вычислений.\n\nprint(a + b), print(a - b), print(a * b), print(a % b)",
        errorExample: {
          code: 'a = "12"\nb = 5\nprint(a + b)  # Ошибка! a — строка, а не число',
          explanation: "Если не использовать числа, программа не сможет сложить значения — будет ошибка.",
        },
        motivation: "Практика — лучший способ понять, как работают операторы! Не бойся ошибаться: каждая попытка делает тебя сильнее.",
      },
      // Дополнительные задачи после математических операторов
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Математические операторы",
        difficulty: "easy",
        content: "🍎 Легкие задачи:",
        tasks: [
          {
            task: "Создай переменные x = 8, y = 3 и выведи их сумму и произведение",
            answer: "x = 8\ny = 3\nprint(x + y)\nprint(x * y)",
            hint: "💡 Используй + для сложения, * для умножения"
          },
          {
            task: "Создай переменную a = 15 и выведи результат деления на 3",
            answer: "a = 15\nprint(a / 3)",
            hint: "💡 Используй / для деления"
          },
          {
            task: "Создай переменные m = 20, n = 6 и выведи остаток от деления",
            answer: "m = 20\nn = 6\nprint(m % n)",
            hint: "💡 Используй % для остатка от деления"
          },
          {
            task: "Создай переменные p = 12, q = 4 и выведи их разность",
            answer: "p = 12\nq = 4\nprint(p - q)",
            hint: "💡 Используй - для вычитания"
          },
          {
            task: "Создай переменную z = 7 и выведи результат умножения на 3",
            answer: "z = 7\nprint(z * 3)",
            hint: "💡 Используй * для умножения"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Математические операторы",
        difficulty: "medium",
        content: "🔥 Средние задачи:",
        tasks: [
          {
            task: "Создай переменные a = 10, b = 4 и выведи: сумму, разность, произведение, частное и остаток",
            answer: "a = 10\nb = 4\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a % b)",
            hint: "💡 Используй все математические операторы: +, -, *, /, %"
          },
          {
            task: "Создай переменную x = 5 и выведи результат возведения в квадрат",
            answer: "x = 5\nprint(x ** 2)",
            hint: "💡 Используй ** для возведения в степень"
          },
          {
            task: "Создай переменные p = 25, q = 7 и выведи целочисленное деление",
            answer: "p = 25\nq = 7\nprint(p // q)",
            hint: "💡 Используй // для целочисленного деления"
          },
          {
            task: "Создай переменные m = 18, n = 5 и выведи: сумму, произведение и целочисленное деление",
            answer: "m = 18\nn = 5\nprint(m + n)\nprint(m * n)\nprint(m // n)",
            hint: "💡 Используй +, *, // для вычислений"
          },
          {
            task: "Создай переменную y = 9 и выведи результат возведения в куб",
            answer: "y = 9\nprint(y ** 3)",
            hint: "💡 Используй ** для возведения в степень (куб = степень 3)"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Математические операторы",
        difficulty: "hard",
        content: "💪 Сложные задачи:",
        tasks: [
          {
            task: "Создай переменные a = 10, b = 3 и выведи: сумму, произведение и остаток от деления",
            answer: "a = 10\nb = 3\nprint(a + b)\nprint(a * b)\nprint(a % b)",
            hint: "💡 Используй +, *, % для вычислений"
          },
          {
            task: "Создай переменные x = 6, y = 2 и выведи:\n1) целочисленное деление\n2) остаток от деления\n3) возведение в степень\n4) обычное деление",
            answer: "x = 6\ny = 2\nprint(x // y)\nprint(x % y)\nprint(x ** y)\nprint(x / y)",
            hint: "💡 Используй операторы:\n// для целочисленного деления\n% для остатка\n** для степени\n/ для обычного деления"
          },
          {
            task: "Создай переменные m = 12, n = 5 и выведи: сумму, разность, произведение и частное",
            answer: "m = 12\nn = 5\nprint(m + n)\nprint(m - n)\nprint(m * n)\nprint(m / n)",
            hint: "💡 Используй основные математические операторы: +, -, *, /"
          },
          {
            task: "Создай переменные c = 16, d = 3 и выведи: целочисленное деление, остаток и возведение в квадрат",
            answer: "c = 16\nd = 3\nprint(c // d)\nprint(c % d)\nprint(c ** 2)",
            hint: "💡 Используй //, %, ** для вычислений"
          },
          {
            task: "Создай переменные e = 14, f = 4 и выведи: сумму, произведение, частное, целочисленное деление и остаток",
            answer: "e = 14\nf = 4\nprint(e + f)\nprint(e * f)\nprint(e / f)\nprint(e // f)\nprint(e % f)",
            hint: "💡 Используй все математические операторы: +, *, /, //, %"
          }
        ]
      },
      {
        type: "theory",
        title: "Логические операторы и сравнения ✔️",
        content:
          "✔️ Логические операторы позволяют сравнивать значения и строить условия.\n\n==  — равно\n!=  — не равно\n>   — больше\n<   — меньше\n>=  — больше или равно\n<=  — меньше или равно\n\nЛогические операторы (and, or, not):\nand — и (True, если оба условия True)\nor  — или (True, если хотя бы одно условие True)\nnot — не (инвертирует значение)\n\n🔍 Представь:\n== — это как сравнить два ключа,\n> — кто выше ростом,\n< — кто младше по возрасту.\n\n🚦 Логика — это как светофор:\nзелёный (True) — можно идти,\nкрасный (False) — стой!\n\nПримеры:",
        code: `a = 7\nb = 3\nprint(a > b)      # True\nprint(a == b)     # False\nprint((a > 0) and (b > 0))  # True\nprint((a > 0) or (b < 0))   # True\nprint(not (a == 7))         # False`,
        explanation:
          "a и b — числа.\n\n== сравнивает,\n> и < — кто больше/меньше,\nand — оба условия,\nor — хотя бы одно,\nnot — инверсия.\n\n🎯 Проверка возраста:\nage >= 18 and has_ticket — можно на концерт!\n\n🚦 Светофор:\ngreen = True,\nred = False.",
        examples: [
          // ==
          "Где пригодится оператор == (равно)?:",
          "Проверка пароля: if password == '1234': ...",
          "Проверка победы: if score == max_score:",
          // !=
          "Где пригодится оператор != (не равно)?:",
          "Проверка ошибки: if answer != correct:",
          // >
          "Где пригодится оператор > (больше)?:",
          "Проверка возраста: if age > 18:",
          // <
          "Где пригодится оператор < (меньше)?:",
          "Проверка скидки: if price < 100:",
          // >=
          "Где пригодится оператор >= (больше или равно)?:",
          "Проверка проходного балла: if points >= 60:",
          // <=
          "Где пригодится оператор <= (меньше или равно)?:",
          "Проверка лимита: if count <= max_count:",
          // and
          "Где пригодится оператор and?:",
          "Проверка возраста и согласия: if age >= 18 and agreed:",
          // or
          "Где пригодится оператор or?:",
          "Проверка скидки: if is_student or is_pensioner:",
          // not
          "Где пригодится оператор not?:",
          "Проверка отсутствия: if not found:",
          // Ошибки
          "⚠️ Ошибка: сравнение строки и числа!",
          "age = '18'\nif age > 17: print('Совершеннолетний')  # Ошибка! age — строка, а не число",
          "✅ Решение: преобразуй строку в число!",
          "age = int(age)\nif age > 17: print('Совершеннолетний')",
          "Резюмируя:",
          "Логические операторы — твой светофор и фильтр! Без них программа не сможет принимать решения.",
        ],
        motivation: "Логика — твой помощник! С её помощью программы принимают решения. Даже если что-то не сработало — это шаг к пониманию!",
      },
      {
        type: "practice",
        title: "Практика: Логические операторы ✔️",
        content:
          "✔️ Создай переменную age = 16. Проверь, больше ли 18, и выведи результат. Затем проверь, что age больше 10 и меньше 20.\n\n🎂 Представь, что ты проверяешь, можно ли попасть на вечеринку (возраст должен быть больше 18).",
        code: "age = 16\nprint(age > 18)\nprint(age > 10 and age < 20)",
        task: "Создай age = 16, проверь условия и выведи результат",
        answer: "age = 16\nprint(age > 18)\nprint(age > 10 and age < 20)",
        hint: "💡 Используй >, <, and для проверки условий.\n\nprint(age > 18), print(age > 10 and age < 20)",
        errorExample: {
          code: 'age = "16"\nprint(age > 10)  # Ошибка! age — строка, а не число',
          explanation: "Если не использовать числа, программа не сможет сравнивать значения — будет ошибка.",
        },
        motivation: "Пробуй разные условия — так ты научишься строить умные программы! Не бойся ошибаться!",
      },
      // Дополнительные задачи после логических операторов
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Логические операторы",
        difficulty: "easy",
        content: "🍎 Легкие задачи:",
        tasks: [
          {
            task: "Создай переменную age = 20 и проверь, больше ли она 18",
            answer: "age = 20\nprint(age > 18)",
            hint: "💡 Используй > для сравнения"
          },
          {
            task: "Создай переменные a = 5, b = 5 и проверь, равны ли они",
            answer: "a = 5\nb = 5\nprint(a == b)",
            hint: "💡 Используй == для проверки равенства"
          },
          {
            task: "Создай переменную x = 10 и проверь, не равно ли x числу 5",
            answer: "x = 10\nprint(x != 5)",
            hint: "💡 Используй != для проверки неравенства"
          },
          {
            task: "Создай переменную score = 85 и проверь, больше ли она 80",
            answer: "score = 85\nprint(score > 80)",
            hint: "💡 Используй > для сравнения"
          },
          {
            task: "Создай переменные num1 = 7, num2 = 9 и проверь, меньше ли num1 чем num2",
            answer: "num1 = 7\nnum2 = 9\nprint(num1 < num2)",
            hint: "💡 Используй < для сравнения"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Логические операторы",
        difficulty: "medium",
        content: "🔥 Средние задачи:",
        tasks: [
          {
            task: "Создай переменную score = 75 и проверь, больше ли она 60 и меньше 90",
            answer: "score = 75\nprint(score > 60 and score < 90)",
            hint: "💡 Используй and для объединения условий"
          },
          {
            task: "Создай переменные age = 16, has_ticket = True и проверь, можно ли на концерт (возраст >= 18 и есть билет)",
            answer: "age = 16\nhas_ticket = True\nprint(age >= 18 and has_ticket)",
            hint: "💡 Используй >= для 'больше или равно' и and для логического И"
          },
          {
            task: "Создай переменную price = 150 и проверь, меньше ли она 100 или больше 200",
            answer: "price = 150\nprint(price < 100 or price > 200)",
            hint: "💡 Используй or для логического ИЛИ"
          },
          {
            task: "Создай переменные temperature = 25, is_sunny = True и проверь, хорошая ли погода (температура > 20 и солнечно)",
            answer: "temperature = 25\nis_sunny = True\nprint(temperature > 20 and is_sunny)",
            hint: "💡 Используй > и and для проверки условий"
          },
          {
            task: "Создай переменную points = 95 и проверь, отличный ли результат (больше 90 или равно 100)",
            answer: "points = 95\nprint(points > 90 or points == 100)",
            hint: "💡 Используй >, == и or для проверки условий"
          }
        ]
      },
      {
        type: "additional_practice",
        title: "🎯 Дополнительные задачи: Логические операторы",
        difficulty: "hard",
        content: "💪 Сложные задачи:",
        tasks: [
          {
            task: "Создай переменные x = 8, y = 4 и проверь:\n1) x больше y\n2) x равен y",
            answer: "x = 8\ny = 4\nprint(x > y)\nprint(x == y)",
            hint: "💡 Используй > и == для сравнения"
          },
          {
            task: "Создай переменную age = 20 и проверь:\n1) возраст чётный (делится на 2 без остатка)\n2) возраст НЕ больше 25",
            answer: "age = 20\nprint(age % 2 == 0)\nprint(not (age > 25))",
            hint: "💡 Используй % для остатка и not для инверсии"
          },
          {
            task: "Создай переменные a = 10, b = 15 и проверь:\n1) a меньше b И b больше 10\n2) a равен b ИЛИ b не равен 10",
            answer: "a = 10\nb = 15\nprint(a < b and b > 10)\nprint(a == b or b != 10)",
            hint: "💡 Используй and и or для объединения условий"
          },
          {
            task: "Создай переменные num = 12, limit = 20 и проверь:\n1) число в диапазоне от 10 до 20\n2) число НЕ равно 15",
            answer: "num = 12\nlimit = 20\nprint(num >= 10 and num <= limit)\nprint(not (num == 15))",
            hint: "💡 Используй >=, <=, and, not для проверки условий"
          },
          {
            task: "Создай переменные value = 7, max_val = 10 и проверь:\n1) значение меньше максимума И чётное\n2) значение равно 5 ИЛИ больше 8",
            answer: "value = 7\nmax_val = 10\nprint(value < max_val and value % 2 == 0)\nprint(value == 5 or value > 8)",
            hint: "💡 Используй <, %, ==, >, and, or для проверки условий"
          }
        ]
      },
      {
        type: "theory_practice",
        title: "🎯 Самостоятельная практика: Операторы",
        content:
          "💻 Попробуй написать программу, которая:\n1. Создаёт переменную x = 21\n2. Проверяет, делится ли x на 7 без остатка\n3. Проверяет, больше ли x 10 и меньше 30\n4. Выводит оба результата\n\n🍕 Представь, что у тебя 21 кусок пиццы и 7 друзей. Делится ли пицца поровну?",
        code: "x = 21\nprint(x % 7 == 0)\nprint(x > 10 and x < 30)",
        expectedOutput: "True\nTrue",
        hint: "💡 Используй %, ==, >, <, and для проверки условий.",
      },
      {
        type: "quiz",
        title: "Проверь себя 🧠",
        question: "Что выведет print(15 // 4)?",
        options: ["3.75", "3", "4", "1"],
        correct: 1,
        hint: "💡 // — это целочисленное деление. 15 // 4 = 3 (остаток отбрасывается).",
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
        saveLessonProgress(2);
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
    const lessonPassed = checkLessonProgress(2);
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
            <span className="text-sm font-medium text-gray-600">📚 Урок 4: Операторы и выражения</span>
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
              {(() => {
                const lines = currentStepData.content.split("\n");
                const result = [];
                let currentMetaphorBlock = [];
                let inMetaphorBlock = false;

                lines.forEach((line, index) => {
                  // Начало блока метафоры
                  if (line.trim().startsWith("📦 Представь:") || line.trim().startsWith("💰 В магазине:") || line.trim().startsWith("🔍 Представь:") || line.trim().startsWith("🚦 Логика — это как светофор:")) {
                    // Если был предыдущий блок метафоры, сохраняем его
                    if (inMetaphorBlock && currentMetaphorBlock.length > 0) {
                      result.push(
                        <div key={`metaphor-${index}`} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg mb-6">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-3">🎭</span>
                            <span className="text-purple-800 font-bold text-xl">Метафора</span>
                          </div>
                          <div className="space-y-3">
                            {currentMetaphorBlock.map((metaphorLine, i) => (
                              <p key={i} className="text-purple-700 text-lg">
                                {metaphorLine}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                      currentMetaphorBlock = [];
                    }
                    inMetaphorBlock = true;
                    currentMetaphorBlock.push(line);
                  } else if (inMetaphorBlock) {
                    // Продолжение блока метафоры
                    if (line.trim() === "") {
                      // Пустая строка - конец блока метафоры
                      if (currentMetaphorBlock.length > 0) {
                        result.push(
                          <div key={`metaphor-${index}`} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg mb-6">
                            <div className="flex items-center mb-4">
                              <span className="text-2xl mr-3">🎭</span>
                              <span className="text-purple-800 font-bold text-xl">Метафора</span>
                            </div>
                            <div className="space-y-3">
                              {currentMetaphorBlock.map((metaphorLine, i) => (
                                <p key={i} className="text-purple-700 text-lg">
                                  {metaphorLine}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                        currentMetaphorBlock = [];
                      }
                      inMetaphorBlock = false;
                    } else {
                      currentMetaphorBlock.push(line);
                    }
                  } else {
                    // Обычная строка
                    result.push(
                      <p key={index} className="mb-3">
                        {line}
                      </p>
                    );
                  }
                });

                // Если остался незакрытый блок метафоры
                if (inMetaphorBlock && currentMetaphorBlock.length > 0) {
                  result.push(
                    <div key={`metaphor-final`} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg mb-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">🎭</span>
                        <span className="text-purple-800 font-bold text-xl">Метафора</span>
                      </div>
                      <div className="space-y-3">
                        {currentMetaphorBlock.map((metaphorLine, i) => (
                          <p key={i} className="text-purple-700 text-lg">
                            {metaphorLine}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }

                return result;
              })()}
            </div>
          )}

          {/* Код */}
          {currentStepData.code && currentStepData.type !== "theory_practice" && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-green-400 font-medium flex items-center">🐍 Python</span>
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
                  <p key={index} className="mb-3">
                    {line}
                  </p>
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
                const typeRegex = /Где пригодится оператор (.+)\?:/i;
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
                          <span className="text-green-900 font-bold text-xl">Оператор: {group.type}</span>
                        </div>
                        <div className="space-y-4">
                          {group.items.map((item, i) => {
                            const ex = item.content;
                            // Блок: Где пригодится тип данных ... (заголовок)
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
                            <p key={index} className="mb-3">
                              {line}
                            </p>
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
                        <p key={index} className="mb-3">
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
                      <p key={index} className="mb-3">
                        {line}
                      </p>
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
                  const updatedLessons = completedLessons.filter((id) => id !== 2);
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

export default Level1Unit4;
