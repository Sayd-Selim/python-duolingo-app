import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLessonProgress } from '../../hooks/useLessonProgress';
import { useAuth } from '../../context/AuthContext';

function Level1Unit3() {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
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

  // Отладка изменений isCorrect (перемещено после объявления currentStep)
  useEffect(() => {
    console.log('=== isCorrect ИЗМЕНИЛСЯ ===');
    console.log('Новое значение isCorrect:', isCorrect);
    console.log('Текущий шаг:', currentStep);
    console.log('userAnswer:', userAnswer);
  }, [isCorrect, currentStep, userAnswer]);

  // Отладка перерендеров компонента
  console.log('=== КОМПОНЕНТ ПЕРЕРЕНДЕРЕН ===');
  console.log('currentStep:', currentStep);
  console.log('userAnswer:', userAnswer);
  console.log('isCorrect:', isCorrect);

  // Мемоизируем шаги урока
  const steps = useMemo(() => [
    {
      type: 'intro',
      title: 'Типы данных в Python 🔢',
      content: '🎯 В этом уроке вы узнаете о самых важных типах данных в Python: числа, строки и логические значения.\n\n💡 Типы данных — это как разные ящики для хранения разных вещей. Числа — для математики, строки — для текста, логические значения — для ответов "да" или "нет".\n\n🏗️ Представьте, что вы строите дом. Числа — это кирпичи (для расчетов), строки — это краска (для текста), а логические значения — это выключатели (включено/выключено).\n\n🎪 Или представьте цирк: числа — это жонглеры (они работают с математикой), строки — это клоуны (они развлекают текстом), а логические значения — это фокусники (они показывают "да" или "нет").',
      code: null
    },
    {
      type: 'theory',
      title: 'Числа (int, float) ➕',
      content: '➕ Числа используются для вычислений.\n\nint — целые числа (например, 5, -3, 100)\nfloat — числа с запятой (например, 3.14, -0.5, 2.0)\n\n📦 Представьте: int — это коробка для яблок (целых), float — для сока (дробных).\n\n🔢 С числами можно выполнять все математические операции: +, -, *, /, ** (степень), % (остаток от деления).\n\n💰 Представьте числа как деньги: int — это монеты (целые рубли), float — это монеты с копейками (рубли и копейки).\n\n🏪 В магазине: товар стоит 5 рублей (int) или 5.99 рублей (float).',
      code: 'a = 5\nb = 3.14\nc = a + b  # 8.14\nd = a * 2  # 10\ne = a ** 2  # 25',
      explanation: 'a — это целое число (int), b — число с плавающей точкой (float).\n\nС числами можно складывать, вычитать, умножать, делить.\n\n** — это возведение в степень, % — остаток от деления.\n\n🎲 Это как игральные кости: int — это результат броска (1, 2, 3, 4, 5, 6), а float — это время в секундах (1.5, 2.7, 3.2).'
    },
    {
      type: 'practice',
      title: 'Практика: Числа 🎯',
      content: '🎯 Создайте переменную x со значением 10 и y со значением 2.5. Выведите их сумму.\n\n💰 Представьте, что у вас есть 10 рублей и 2.50 рубля. Сколько всего денег?',
      code: 'x = 10\ny = 2.5\nprint(x + y)',
      task: 'Создайте переменные x = 10, y = 2.5 и выведите их сумму',
      answer: 'x = 10\ny = 2.5\nprint(x + y)',
      hint: '💡 Используйте x = 10, y = 2.5, затем print(x + y).\n\nСложение чисел разных типов (int + float) даст float.\n\n🍎 Это как сложить 10 яблок и 2.5 яблока — получится 12.5 яблока.'
    },
    {
      type: 'theory',
      title: 'Строки (str) 📝',
      content: '📝 Строки — это текст.\n\nВ Python строки записываются в кавычках: "Привет", \'Python\', "123"\n\n📦 Строка — это как коробка для писем. Внутри — буквы, слова, предложения.\n\n🔤 Строки можно соединять (+), повторять (*), получать длину (len()), обращаться к символам по индексу.\n\n📚 Представьте строки как книги: каждая книга (строка) содержит текст, и вы можете соединять книги в библиотеку (+), копировать одну книгу много раз (*), или посчитать количество страниц (len()).\n\n🎭 Или как театр: строка — это пьеса, символы — это актеры, а операции — это постановки (соединение пьес, повторение сцен).',
      code: 'name = "Анна"\ngreeting = "Привет!"\nfull_text = name + " " + greeting  # "Анна Привет!"\nrepeated = "Ha" * 3  # "HaHaHa"\nlength = len(name)  # 4',
      explanation: 'name — строка с именем, greeting — строка с приветствием.\n\nСтроки можно соединять (складывать), повторять, получать длину.\n\nlen() — функция для получения длины строки.\n\n🔗 Это как составление предложения: "Анна" + " " + "Привет!" = "Анна Привет!"\n\n📏 len("Анна") = 4, потому что в слове "Анна" 4 буквы.'
    },
    {
      type: 'practice',
      title: 'Практика: Строки 📝',
      content: '📝 Создайте переменную text со значением "Python — круто!" и выведите её.\n\n📖 Представьте, что вы создаете заголовок для своей первой книги о программировании.',
      code: 'text = "Python — круто!"\nprint(text)',
      task: 'Создайте переменную text со значением "Python — круто!" и выведите её',
      answer: 'text = "Python — круто!"\nprint(text)',
      hint: '💡 Сначала text = "Python — круто!", затем print(text).\n\nОбратите внимание на кавычки — они обязательны для строк.\n\n📝 Это как написать заголовок на обложке книги — текст должен быть в кавычках, как название.'
    },
    {
      type: 'practice',
      title: 'Задача 1: Соединение строк 🔗',
      content: '🔗 Создайте две переменные: first = "Привет" и second = "мир". Соедините их и выведите результат.\n\n🤝 Представьте, что вы знакомитесь с новым человеком и говорите "Привет" + "мир" = "Привет мир".',
      code: 'first = "Привет"\nsecond = "мир"\nresult = first + " " + second\nprint(result)',
      task: 'Создайте переменные first = "Привет", second = "мир" и выведите их соединение',
      answer: 'first = "Привет"\nsecond = "мир"\nresult = first + " " + second\nprint(result)',
      hint: '💡 Используйте + для соединения строк. Не забудьте пробел между словами.\n\n🔗 Это как составление предложения из слов: "Привет" + " " + "мир" = "Привет мир".'
    },
    {
      type: 'theory',
      title: 'Логические значения (bool) ✔️',
      content: '✔️ Логические значения отвечают на вопросы: да или нет.\n\nВ Python есть два значения: True (истина) и False (ложь).\n\n📦 Это как индикатор: включено (True) или выключено (False).\n\n🔍 Логические значения получаются при сравнении: == (равно), != (не равно), >, <, >=, <=.\n\n🚦 Представьте логические значения как светофор: зеленый свет (True) — можно идти, красный свет (False) — стой.\n\n🎯 Или как стрельбу по мишени: попал в цель (True) или промахнулся (False).\n\n🔍 Сравнения — это как вопросы: "5 больше 3?" — True, "2 равно 7?" — False.',
      code: 'is_sunny = True\nis_raining = False\nage = 18\nis_adult = age >= 18  # True\nis_teen = age < 20  # True',
      explanation: 'is_sunny — истина, is_raining — ложь.\n\nЛогические значения часто используются в проверках и условиях.\n\nСравнения возвращают True или False.\n\n🔍 age >= 18 означает "возраст больше или равен 18" — это True для возраста 18.\n\n🎯 Это как проверка билета: "У вас есть билет?" — да или нет.'
    },
    {
      type: 'practice',
      title: 'Практика: Логика ✔️',
      content: '✔️ Создайте переменную is_student со значением True и выведите её.\n\n🎓 Представьте, что вы заполняете анкету и отвечаете на вопрос "Вы студент?" — да (True).',
      code: 'is_student = True\nprint(is_student)',
      task: 'Создайте переменную is_student = True и выведите её',
      answer: 'is_student = True\nprint(is_student)',
      hint: '💡 is_student = True, затем print(is_student).\n\nTrue и False пишутся с большой буквы в Python.\n\n✅ Это как поставить галочку "да" в анкете.'
    },
    {
      type: 'practice',
      title: 'Задача 2: Сравнения 🔍',
      content: '🔍 Создайте переменную age = 25 и проверьте, больше ли возраст 18. Выведите результат.\n\n🎂 Представьте, что вы проверяете, можно ли человеку войти в клуб (возраст должен быть больше 18).',
      code: 'age = 25\nis_adult = age > 18\nprint(is_adult)',
      task: 'Создайте age = 25 и проверьте, больше ли возраст 18',
      answer: 'age = 25\nis_adult = age > 18\nprint(is_adult)',
      hint: '💡 age = 25, затем is_adult = age > 18, и print(is_adult).\n\nСравнение > вернет True или False.\n\n🎯 25 > 18 — это True, потому что 25 больше 18.'
    },
    {
      type: 'theory',
      title: 'Преобразование типов данных 🔄',
      content: '🔄 Иногда нужно превратить число в строку или наоборот.\n\nstr(число) — превращает число в строку\nint(строка) — превращает строку в целое число\nfloat(строка) — превращает строку в число с запятой\nbool(значение) — превращает в логическое значение\n\n📦 Это как перекладывание вещей из одной коробки в другую.\n\n🔄 Представьте преобразование как перевод с одного языка на другой: число "5" на языке математики становится словом "пять" на языке текста.\n\n🏪 Или как в магазине: у вас есть купюра 100 рублей (число), а нужно написать "сто рублей" (строка) в чеке.\n\n🎭 Это как перевоплощение актера: один и тот же человек может играть разные роли (число может стать строкой).',
      code: 'a = 5\ntext = str(a)  # "5"\nb = int("42")  # 42\nc = float("3.14")  # 3.14\nflag = bool(1)  # True\nflag2 = bool(0)  # False',
      explanation: 'str(5) даст строку "5". int("42") даст число 42. float("3.14") даст 3.14.\n\nbool(1) даст True, bool(0) даст False.\n\nПреобразование типов — важная часть программирования.\n\n🔄 str(5) — это как написать число "5" на бумаге.\n\n🔢 int("42") — это как прочитать число "42" с бумаги и использовать для математики.\n\n✅ bool(1) — это как сказать "да" вместо "1".'
    },
    {
      type: 'practice',
      title: 'Практика: Преобразование типов 🔄',
      content: '🔄 Преобразуйте строку "123" в число и выведите сумму с числом 7.\n\n💰 Представьте, что у вас есть записка с числом "123" и 7 монет. Нужно сложить их вместе.',
      code: 'num = int("123")\nprint(num + 7)',
      task: 'Преобразуйте строку "123" в число и выведите сумму с 7',
      answer: 'num = int("123")\nprint(num + 7)',
      hint: '💡 int("123") превращает строку в число.\n\nБез преобразования нельзя складывать строку и число.\n\n🔄 Это как прочитать число с бумажки и использовать его для подсчета.'
    },
    {
      type: 'practice',
      title: 'Задача 3: Сложное преобразование 🔧',
      content: '🔧 Создайте переменную price = "15.50", преобразуйте её в число и выведите удвоенную цену.\n\n🏪 Представьте, что вы работаете в магазине: товар стоит "15.50" рублей, а вам нужно посчитать цену со скидкой 50% (умножить на 2).',
      code: 'price = "15.50"\nprice_num = float(price)\nresult = price_num * 2\nprint(result)',
      task: 'Преобразуйте строку "15.50" в число и выведите удвоенную цену',
      answer: 'price = "15.50"\nprice_num = float(price)\nresult = price_num * 2\nprint(result)',
      hint: '💡 Используйте float() для преобразования строки с запятой в число.\n\nЗатем умножьте на 2.\n\n💰 float("15.50") превращает цену с копейками в число для расчетов.'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Работа с числами',
      content: '💻 Теперь попробуйте написать программу самостоятельно!\n\n🎯 Задача: Создайте программу, которая создает переменные a = 10, b = 3 и выводит результат деления a на b\n\n💭 Это упражнение поможет закрепить работу с числами и математическими операциями.\n\n🧮 Представьте, что вы создаете простой калькулятор!\n\n🍕 Представьте, что у вас есть 10 пицц и 3 друга. Сколько пицц достанется каждому?',
      code: 'a = 10\nb = 3\nresult = a / b\nprint(result)',
      explanation: '🔍 Создаем две переменные с числами: a = 10 и b = 3.\n\nВыполняем деление: result = a / b.\n\nprint() выводит результат деления.\n\n📊 Деление в Python всегда возвращает float, даже если результат целый.\n\n🍕 10 пицц ÷ 3 друга = 3.33 пиццы каждому (остаток остается в виде десятичной дроби).',
      expectedOutput: '3.3333333333333335',
      hint: '💡 Создайте переменные a = 10 и b = 3.\n\nВыполните деление: result = a / b.\n\nВыведите результат: print(result).\n\n🔢 Деление в Python возвращает число с плавающей точкой.\n\n🍕 Это как делить пиццу между друзьями — получается дробная часть.'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Работа со строками',
      content: '💻 Попробуйте создать программу со строками!\n\n🎯 Задача: Напишите программу, которая создает переменную name = "Алексей" и выводит "Привет, Алексей!"\n\n💭 Используйте строки и их соединение.\n\n👋 Представьте, что вы создаете программу-приветствие!\n\n📝 Это как составление приветственной открытки для друга.',
      code: 'name = "Алексей"\ngreeting = "Привет, " + name + "!"\nprint(greeting)',
      explanation: '🔍 Создаем переменную name со строкой "Алексей".\n\nСоединяем строки: greeting = "Привет, " + name + "!".\n\nprint() выводит результат соединения.\n\n📝 Это как составление предложения из отдельных слов.\n\n🔗 Оператор + соединяет строки, как склеивание слов в предложение.',
      expectedOutput: 'Привет, Алексей!'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Логические операции',
      content: '💻 Создайте программу с логическими значениями!\n\n🎯 Задача: Напишите программу, которая создает переменную age = 20 и проверяет, является ли возраст совершеннолетним (>= 18)\n\n💭 Используйте переменные для хранения чисел и логические операции.\n\n🔍 Представьте, что вы создаете систему проверки возраста!\n\n🎂 Это как проверка билета в кино: "Вам есть 18 лет?" — да или нет.',
      code: 'age = 20\nis_adult = age >= 18\nprint(f"Возраст: {age}, Совершеннолетний: {is_adult}")',
      explanation: '🔍 Создаем переменную age = 20.\n\nПроверяем условие: is_adult = age >= 18.\n\nИспользуем f-строку для красивого вывода результата.\n\n📊 Логические операции возвращают True или False.\n\n🎯 20 >= 18 — это True, потому что 20 больше или равно 18.\n\n✅ Это как проверка документа: "Возраст подходит для входа?" — да (True).',
      expectedOutput: 'Возраст: 20, Совершеннолетний: True',
      hint: '💡 Создайте переменную age = 20.\n\nПроверьте условие: is_adult = age >= 18.\n\nВыведите результат: print(f"Возраст: {age}, Совершеннолетний: {is_adult}").\n\n🔍 >= означает "больше или равно".\n\n🎂 Это как проверка возраста для входа в клуб.'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Преобразование типов',
      content: '💻 Попробуйте использовать преобразование типов!\n\n🎯 Задача: Создайте программу, которая берет строку "25", преобразует её в число и выводит "Мне 25 лет"\n\n💭 Используйте int() для преобразования и f-строку для вывода.\n\n🎂 Представьте, что вы создаете персональную карточку!\n\n📝 Это как прочитать возраст с паспорта и написать его в анкете.',
      code: 'age_str = "25"\nage = int(age_str)\nprint(f"Мне {age} лет")',
      explanation: '🔍 Создаем строку age_str = "25".\n\nПреобразуем в число: age = int(age_str).\n\nИспользуем f-строку для вывода: print(f"Мне {age} лет").\n\n📝 Это как перевод текста в число для дальнейших вычислений.\n\n🔄 int("25") превращает текст "25" в число 25.\n\n📋 Это как заполнение анкеты: читаете возраст с документа и записываете в бланк.',
      expectedOutput: 'Мне 25 лет'
    },
    {
      type: 'theory_practice',
      title: '🎯 Практика: Сложная программа',
      content: '💻 Создайте более сложную программу!\n\n🎯 Задача: Напишите программу, которая:\n1. Создает переменную name = "Мария"\n2. Создает переменную age_str = "22"\n3. Преобразует возраст в число\n4. Проверяет, является ли возраст совершеннолетним\n5. Выводит "Привет, Мария! Тебе 22 года. Совершеннолетняя: True"\n\n💭 Используйте строки, преобразование типов, логические операции и f-строки.\n\n🎉 Представьте, что вы создаете программу-знакомство!\n\n👋 Это как встреча с новым человеком: узнаете имя, проверяете возраст и составляете приветствие.',
      code: 'name = "Мария"\nage_str = "22"\nage = int(age_str)\nis_adult = age >= 18\nprint(f"Привет, {name}! Тебе {age} года. Совершеннолетняя: {is_adult}")',
      explanation: '🔍 Создаем строку name = "Мария" и age_str = "22".\n\nПреобразуем возраст: age = int(age_str).\n\nПроверяем условие: is_adult = age >= 18.\n\nИспользуем f-строку для красивого вывода всей информации.\n\n📅 Это как создание персональной карточки с проверкой возраста.\n\n👋 Это как знакомство: "Привет, как тебя зовут?" + "Сколько тебе лет?" + "Можно ли тебе в клуб?"',
      expectedOutput: 'Привет, Мария! Тебе 22 года. Совершеннолетняя: True'
    },
    {
      type: 'practice',
      title: 'Задача 4: Математика с преобразованием 🧮',
      content: '🧮 Создайте программу, которая берет строку "10", преобразует её в число и выводит квадрат этого числа.\n\n📐 Представьте, что у вас есть квадрат со стороной "10" см. Нужно найти его площадь (10 × 10 = 100).',
      code: 'num_str = "10"\nnum = int(num_str)\nsquare = num ** 2\nprint(square)',
      task: 'Преобразуйте строку "10" в число и выведите его квадрат',
      answer: 'num_str = "10"\nnum = int(num_str)\nsquare = num ** 2\nprint(square)',
      hint: '💡 Используйте int("10") для преобразования, затем num ** 2 для возведения в квадрат.\n\n** — это оператор возведения в степень.\n\n📐 Квадрат числа — это число, умноженное само на себя: 10² = 10 × 10 = 100.'
    },
    {
      type: 'practice',
      title: 'Задача 5: Строки и числа 📊',
      content: '📊 Создайте переменную text = "Количество: " и число count = 5. Соедините их и выведите.\n\n📦 Представьте, что вы делаете этикетку для коробки: "Количество: " + количество предметов внутри.',
      code: 'text = "Количество: "\ncount = 5\nresult = text + str(count)\nprint(result)',
      task: 'Соедините строку "Количество: " и число 5',
      answer: 'text = "Количество: "\ncount = 5\nresult = text + str(count)\nprint(result)',
      hint: '💡 Используйте str(count) для преобразования числа в строку перед соединением.\n\nНельзя складывать строку и число напрямую.\n\n📦 Это как написать на коробке: "Количество: 5" — сначала текст, потом число.'
    },
    {
      type: 'quiz',
      title: 'Проверьте свои знания 🧠',
      question: 'Какой тип данных у значения "True" (без кавычек)?',
      options: ['str', 'int', 'bool', 'float'],
      correct: 2,
      hint: '💡 True и False — это логические значения (bool).\n\nОни используются для ответов "да" или "нет".\n\n🔍 В Python логические значения пишутся с большой буквы.\n\n🚦 Это как светофор: True = зеленый свет (можно идти), False = красный свет (стой).'
    }
  ], []);

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
        console.log('Урок успешно завершен!');
        
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
  }, [completeLesson, isLessonCompleted, navigate, user?.userId]);

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
      updateCurrentStep(currentStep + 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
    } else if (!canProceed) {
      // Показываем предупреждение
      if (currentStep >= steps.length - 1) {
        alert('🎯 Это последний шаг урока. Ответьте на вопрос выше!');
      } else {
        alert('⚠️ Сначала выполните текущее задание правильно!');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
    }
  };

  // Оптимизированный обработчик изменения текста
  const handleTextChange = useCallback((e) => {
    setUserAnswer(e.target.value);
  }, []);

  // Оптимизированный обработчик изменения ответа в тесте
  const handleQuizAnswerChange = useCallback((e) => {
    console.log('=== ИЗМЕНЕНИЕ ОТВЕТА В ТЕСТЕ ===');
    console.log('e.target.value:', e.target.value);
    console.log('typeof e.target.value:', typeof e.target.value);
    setUserAnswer(e.target.value);
    console.log('setUserAnswer вызван с:', e.target.value);
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

  const handleAnswerSubmit = useCallback(() => {
    console.log('=== НАЧАЛО handleAnswerSubmit ===');
    console.log('currentStep:', currentStep);
    console.log('userAnswer:', userAnswer);
    console.log('typeof userAnswer:', typeof userAnswer);
    
    const currentStepData = steps[currentStep];
    console.log('currentStepData:', currentStepData);
    console.log('currentStepData.type:', currentStepData.type);
    
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
      } else if (
        (hasInput && hasPrint && hasQuotes) || // Для заданий с input
        (hasInt && hasInput && hasPrint) || // Для заданий с int(input)
        (hasFString && hasInput && hasInt) // Для заданий с f-строками
      ) {
        setIsCorrect('almost');
        isAnswerCorrect = false; // Почти правильно, но не совсем
      } else {
        setIsCorrect(false);
        isAnswerCorrect = false;
      }
    } else if (currentStepData.type === 'quiz') {
      console.log('=== ОБРАБОТКА ТЕСТА ===');
      console.log('userAnswer:', userAnswer);
      console.log('currentStepData.correct:', currentStepData.correct);
      console.log('typeof userAnswer:', typeof userAnswer);
      console.log('typeof currentStepData.correct:', typeof currentStepData.correct);
      
      // Приводим оба значения к строкам для корректного сравнения
      const userAnswerStr = userAnswer.toString();
      const correctAnswerStr = currentStepData.correct.toString();
      
      console.log('userAnswerStr:', userAnswerStr);
      console.log('correctAnswerStr:', correctAnswerStr);
      
      isAnswerCorrect = userAnswerStr === correctAnswerStr;
      console.log('isAnswerCorrect:', isAnswerCorrect);
      
      setIsCorrect(isAnswerCorrect);
      console.log('setIsCorrect вызван с:', isAnswerCorrect);
    }
    
    // Сохраняем ответ
    console.log('=== СОХРАНЕНИЕ ОТВЕТА ===');
    console.log('currentStep:', currentStep);
    console.log('userAnswer:', userAnswer);
    console.log('isAnswerCorrect:', isAnswerCorrect);
    
    saveStepAnswer(currentStep, userAnswer, isAnswerCorrect);
    console.log('=== КОНЕЦ handleAnswerSubmit ===');
  }, [currentStep, steps, userAnswer, normalizeAnswer, saveStepAnswer]);

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
              Вы успешно завершили урок "Переменные. Вывод и ввод данных"!
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium mb-2">🎯 Вы изучили:</p>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Создание и использование переменных</li>
                <li>• Функции print() и input()</li>
                <li>• Преобразование типов данных</li>
                <li>• Форматирование строк</li>
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
              📚 Урок 3: Типы данных
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
          {currentStepData.code && currentStepData.type !== 'theory_practice' && (
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
          {currentStepData.explanation && currentStepData.type !== 'theory_practice' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">💡</span>
                <span className="text-blue-800 font-semibold">Объяснение</span>
              </div>
              <div className="text-blue-800 text-lg">
                {currentStepData.explanation.split('\n').map((line, index) => (
                  <p key={index} className="mb-3">
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
                    <div className="text-blue-800 text-lg">
                      {currentStepData.hint.split('\n').map((line, index) => (
                        <p key={index} className="mb-3">
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
                  <button
                    onClick={() => setShowAnswer(prev => !prev)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
                  >
                    <span>🎯</span>
                    <span>{showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</span>
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
                    {currentStepData.explanation && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-xl mt-4">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">💡</span>
                          <span className="text-blue-800 font-semibold">Объяснение</span>
                        </div>
                        <div className="text-blue-800 text-lg">
                          {currentStepData.explanation.split('\n').map((line, index) => (
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
                      {currentStepData.hint.split('\n').map((line, index) => (
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
                    console.log('userAnswer перед вызовом:', userAnswer);
                    console.log('typeof userAnswer:', typeof userAnswer);
                    console.log('disabled:', !userAnswer);
                    handleAnswerSubmit();
                  }}
                  disabled={!userAnswer}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg ${
                    userAnswer 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
                    {currentStepData.hint.split('\n').map((line, index) => (
                      <p key={index} className="mb-3">
                        {line}
                      </p>
                    ))}
                  </div>
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
                      {userAnswer ? 'Ответьте на вопрос правильно, чтобы перейти к следующему шагу' : 'Выберите ответ на вопрос выше'}
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

export default Level1Unit3; 