import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import CodeHighlight from "../../components/CodeHighlight";
import WarningHighlight from "../../components/WarningHighlight";
import ImportantHighlight from "../../components/ImportantHighlight";
import SuccessHighlight from "../../components/SuccessHighlight";
import InfoHighlight from "../../components/InfoHighlight";
import StepHighlight from "../../components/StepHighlight";
import TipHighlight from "../../components/TipHighlight";
import ReminderBlock from "../../components/ReminderBlock";

function FullStackLesson1() {
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
  const [activeCodeTab, setActiveCodeTab] = useState("MyExpress.js");
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
        title: "Что тебя ждёт в этом курсе — с нуля и до своего приложения-отеля 🏨",
        content:
          "Добро пожаловать, брат! Если ты пока не знаешь, как приложения общаются с сервером, и впервые слышишь про Axios, Express или MongoDB — ты попал точно по адресу.\n\n" +
          "📦 Мы начинаем **с нуля** и шаг за шагом построим реальное приложение — **отель**, в котором можно регистрировать клиентов, хранить их данные и обрабатывать заявки.\n\n" +
          "Будем писать код, отправлять запросы, подключать базу и строить настоящий бэкенд — как в продакшене, но **на простом языке**, без заумных слов.",
        metaphor: [
          "🏨 Метафора курса: ты создаёшь **свой отель**.",
          "Клиенты заходят и заполняют анкету на стойке регистрации.",
          "🛎️ Axios — это посыльный, который передаёт анкету администратору.",
          "👨‍💻 Express — администратор отеля: принимает заявки, отвечает, что делать, кого записать.",
          "📂 MongoDB — это архив, где мы сохраняем данные о клиентах: кто заезжал, когда и с какими условиями.",
          "А ты — управляющий всем этим отелем! 😉",
        ],
        whatWeLearned: [
          "📡 Узнаешь, как Axios отправляет данные с формы на сервер.",
          "🚪 Построим сервер на Express, который умеет принимать и обрабатывать запросы.",
          "💾 Подключим MongoDB и научим сервер сохранять клиентов как в реальную базу.",
        ],
        motivation:
          "💡 Каждый шаг — это теория + сразу практика. Никаких скучных лекций: **ты сразу делаешь всё руками**.\n\n" +
          "🚀 Когда освоишь лёгкий уровень — сможешь перейти к следующему и построить уже **настоящий защищённый сервис с авторизацией, токенами и фильтрацией данных**.\n\n" +
          "📘 Не переживай, брат, **всё объяснено простыми словами**, как будто я рядом сижу. Ты всё поймёшь, обещаю.",
        whatNext: [
          "✍️ Уже в следующем шаге мы создадим **простую форму регистрации** и отправим наш **первый запрос с помощью Axios**.",
          "Погнали строить свой отель! 🏁",
        ],
      },

      {
        type: "intro",
        title: "Давай сделаем это просто — начинаем с регистрации 🧾",
        content:
          "Ты точно сталкивался с этим в интернете: заходишь на сайт или в приложение — и тебе предлагают зарегистрироваться.\n\n" +
          "Имя, email, пароль — вроде просто. Но что происходит на самом деле, когда ты нажимаешь кнопку «Зарегистрироваться»?\n\n" +
          "Вот с этого и начнётся наш курс.\n\n" +
          "Мы начнём с самой простой регистрации. Без сложностей. Без проверок. Просто — ты заполнил форму и нажал кнопку. А дальше — **магия запроса**.\n\n" +
          "📡 Научим твоё приложение отправлять данные на сервер с помощью <CodeHighlight>Axios</CodeHighlight>.\n\n" +
          "🌱 А дальше — шаг за шагом будем улучшать наш проект: добавим обработку ошибок, безопасность, настоящую базу данных и многое другое.",
        metaphor: [
          "🏨 Метафора: ты зашёл в отель и заполнил регистрационную анкету.",
          "— Имя? — Ввёл.",
          "— Email? — Ввёл.",
          "— Отправляешь администратору (серверу) — и он тебя регистрирует.",
          "Мы начнём с этого простого процесса, а дальше ты узнаешь, как обрабатываются анкеты, как проверяются, как хранятся, как отправляются ответы.",
        ],
        motivation:
          "💬 Не бойся, если что-то кажется новым или сложным — мы всё объясним на пальцах.\n\n" +
          "Этот курс — 🔥 **реально мощный**. Здесь ты найдёшь ответы на все свои вопросы — обещаю.\n\n" +
          "🚀 Готов? Вперёд к первой практике! Там ты увидишь, как работает запрос — прямо в браузере, на живом примере.",
        whatWeLearned: [
          "🔰 Мы начинаем с самого простого: с регистрации.",
          "📡 Узнаем, как отправлять данные с помощью <CodeHighlight>Axios</CodeHighlight>.",
          "🧱 Постепенно построим настоящий сервер и подключим базу данных.",
        ],
        whatNext: [
          "🧰 В следующем шаге — подготовим проект для работы: подключим всё нужное, настроим интерфейс.",
          "🧾 Затем изучим <CodeHighlight>POST</CodeHighlight>-запрос: зарегистрируем нового клиента через форму.",
          "📡 Научим твой фронтенд отправлять данные на сервер с помощью <CodeHighlight>Axios</CodeHighlight>.",
          "⚙️ Всё будет на практике — с формой, кнопкой и реальным запросом, как в боевом приложении!",
        ],
      },

      {
        type: "code",
        title: "Подготовка проекта — создаём React, подключаем Axios и Express.js 🚀",
        content:
          "Перед тем как отправлять запросы, нужно подготовить рабочее место — создать проект на React, подключить библиотеку для HTTP-запросов Axios и настроить сервер Express.js.\n\n" +
          "🛠 Вот что нужно сделать:\n" +
          "1. Установить Node.js и npm, если ещё не установлены.\n" +
          "2. Создать новый React-проект командой:\n" +
          "npx create-react-app my-hotel-app\n" +
          "cd my-hotel-app\n" +
          "3. Установить Axios для фронтенда:\n" +
          "npm install axios\n" +
          "4. Создать папку `server` в корне проекта и перейти в неё:\n" +
          "mkdir server\n" +
          "cd server\n" +
          "5. Инициализировать package.json для сервера:\n" +
          "npm init -y\n" +
          "6. Установить Express.js и другие зависимости:\n" +
          "npm install express cors\n" +
          "7. Создать файл `src/RegisterForm.js` — здесь будет форма регистрации и отправка данных.\n" +
          "8. В `src/App.js` импортировать `RegisterForm` и вывести его на экран.\n" +
          "9. Создать файл `server/server.js` — здесь будет наш Express-сервер.\n\n" +
          "Теперь у нас есть и фронтенд (React + Axios), и бэкенд (Express.js) — полный стек для работы!\n\n" +
          "📡 В следующих шагах напишем форму, настроим сервер и научимся отправлять данные между ними.",
        codeFiles: {
          "src/RegisterForm.js": `import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные на наш Express-сервер
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
      });
      setResult(response.data);
    } catch (error) {
      setResult("Ошибка при отправке данных");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Регистрация</h2>
      <div>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <div style={{ marginTop: 12 }}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      <button type="submit" style={{ marginTop: 16 }}>Зарегистрироваться</button>
      {result && (
        <div style={{ marginTop: 16 }}>
          <strong>Ответ сервера:</strong> {typeof result === "string" ? result : JSON.stringify(result)}
        </div>
      )}
    </form>
  );
}

export default RegisterForm;
`,
          "src/App.js": `import React from "react";
import RegisterForm from "./RegisterForm";

function App() {
  return (
    <div>
      <h1>Добро пожаловать в My Hotel App!</h1>
      <RegisterForm />
    </div>
  );
}

export default App;
`,
          "server/server.js": ` файл по что пустой, потихоньку заполним не переживай !
`,
          "server/package.json": `{
  "name": "hotel-app-server",
  "version": "1.0.0",
  "description": "Express.js сервер для приложения отеля",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`,
        },
        metaphor: [
          "🔧 Метафора: мы строим полноценный отель — сначала ставим здание (React), подключаем телефон (Axios), а теперь строим офис администрации (Express.js).",
          "Без офиса администрации мы не сможем обрабатывать заявки клиентов и управлять отелем.",
          "Теперь у нас есть и ресепшн (фронтенд), и администрация (бэкенд) — отель готов к работе!",
        ],
        whatWeLearned: [
          "✅ Создали React-проект — наше рабочее пространство.",
          "✅ Подключили Axios — инструмент для отправки HTTP-запросов.",
          "✅ Настроили Express.js сервер — бэкенд для обработки запросов.",
          "✅ Спланировали структуру: форма регистрации + API сервер.",
        ],
        whatNext: [
          "👨‍💻 В следующем шаге — запустим сервер и протестируем регистрацию.",
          "📩 Научимся отправлять данные с формы на Express-сервер и получать ответ.",
          "⚡️ Всё — с реальной практикой и готовым кодом!",
        ],
      },

      {
        type: "code",
        title: "POST-запрос с Axios — как форма отправляет данные 📬",
        content:
          "Пришло время разобраться, **как именно форма «общается» с сервером**.\n\n" +
          "📨 В интернете есть два основных типа запросов: `GET` — чтобы **получать данные**, и `POST` — чтобы **отправлять данные**.\n\n" +
          "Сейчас мы сконцентрируемся на `POST`: это когда ты **отправляешь информацию**, например, имя и email из формы регистрации.\n\n" +
          "🛎️ Представь: клиент подошёл к стойке и заполнил анкету. Её нужно передать дальше — и это делает `Axios`, наш помощник.\n\n" +
          "Давай посмотрим, как это выглядит в коде. Пока без сервера — просто отправим запрос на несуществующий адрес и разберём логику.",
        codeFiles: {
          "src/RegisterForm.js": `import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://example.com/register", {
        name,
        email,
      });
      setResult("Успешно отправлено!");
    } catch (error) {
      setResult("❌ Сервер пока не отвечает (но это нормально!)");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Отправить</button>
      {result && <p>{result}</p>}
    </form>
  );
}

export default RegisterForm;
`,
        },
        metaphor: [
          "📮 POST — это как ты кладёшь письмо в конверт и отправляешь по адресу.",
          "📦 Axios — почтовая служба, которая доставит письмо.",
          "📬 А сервер — это тот, кто должен его принять. Пока его нет — мы просто тренируемся отправлять письма.",
        ],
        whatWeLearned: [
          "📨 Что такое <CodeHighlight>POST</CodeHighlight>-запрос и зачем он нужен.",
          "🛎️ Как использовать <CodeHighlight>axios.post()</CodeHighlight> для отправки данных.",
          "🧠 Разобрались с тем, как работает форма и передаёт данные в запросе.",
        ],
        whatNext: [
          "🔧 В следующем шаге — создадим свой Express-сервер, который примет наш POST-запрос.",
          "📬 То есть научим администратора отеля **принимать анкеты клиентов**!",
        ],
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

        // Перенаправляем на страницу курса Express.js через 3 секунды
        setTimeout(() => {
          navigate("/js-libraries-course");
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
      const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
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
        const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
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

  // Функция для рендеринга тегов
  const renderTag = (part, partIndex) => {
    switch (part.type) {
      case "code":
        return <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>;
      case "warning":
        return <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>;
      case "important":
        return <ImportantHighlight key={partIndex}>{part.content}</ImportantHighlight>;
      case "success":
        return <SuccessHighlight key={partIndex}>{part.content}</SuccessHighlight>;
      case "info":
        return <InfoHighlight key={partIndex}>{part.content}</InfoHighlight>;
      case "step":
        return <StepHighlight key={partIndex}>{part.content}</StepHighlight>;
      case "tip":
        return <TipHighlight key={partIndex}>{part.content}</TipHighlight>;
      case "bold":
        return <strong key={partIndex}>{part.content}</strong>;
      case "italic":
        return <em key={partIndex}>{part.content}</em>;
      case "error":
        return (
          <span key={partIndex} className="bg-red-100 text-red-800 px-2 py-1 rounded font-semibold border border-red-300">
            {part.content}
          </span>
        );
      default:
        return <span key={partIndex}>{part.content}</span>;
    }
  };

  // Функция для парсинга JSX тегов в тексте
  const parseJSXInText = (text) => {
    if (!text) return [];

    const parts = [];
    let currentIndex = 0;

    // Определяем все поддерживаемые теги
    const supportedTags = [
      { open: "<CodeHighlight>", close: "</CodeHighlight>", type: "code", length: 15 },
      { open: "<WarningHighlight>", close: "</WarningHighlight>", type: "warning", length: 18 },
      { open: "<Important>", close: "</Important>", type: "important", length: 10 },
      { open: "<Bold>", close: "</Bold>", type: "bold", length: 6 },
      { open: "<Italic>", close: "</Italic>", type: "italic", length: 8 },
      { open: "<Success>", close: "</Success>", type: "success", length: 9 },
      { open: "<Error>", close: "</Error>", type: "error", length: 7 },
      { open: "<Info>", close: "</Info>", type: "info", length: 6 },
      { open: "<Step>", close: "</Step>", type: "step", length: 6 },
      { open: "<Tip>", close: "</Tip>", type: "tip", length: 5 },
    ];

    while (currentIndex < text.length) {
      // Ищем все открывающие теги
      let foundTag = null;
      let openTagIndex = -1;

      for (const tag of supportedTags) {
        const index = text.indexOf(tag.open, currentIndex);
        if (index !== -1 && (openTagIndex === -1 || index < openTagIndex)) {
          openTagIndex = index;
          foundTag = tag;
        }
      }

      if (openTagIndex === -1) {
        // Нет больше тегов, добавляем оставшийся текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Добавляем текст до тега
      if (openTagIndex > currentIndex) {
        parts.push({ type: "text", content: text.slice(currentIndex, openTagIndex) });
      }

      // Ищем закрывающий тег
      const closeTagIndex = text.indexOf(foundTag.close, openTagIndex);

      if (closeTagIndex === -1) {
        // Нет закрывающего тега, добавляем как обычный текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Извлекаем содержимое тега
      const tagContent = text.slice(openTagIndex + foundTag.length, closeTagIndex);
      parts.push({ type: foundTag.type, content: tagContent });

      currentIndex = closeTagIndex + foundTag.close.length;
    }

    return parts;
  };

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
    const userLines = userCode
      .trim()
      .split("\n")
      .filter((line) => line.trim());
    const correctLines = correctCode
      .trim()
      .split("\n")
      .filter((line) => line.trim());

    const errors = [];

    // Проверяем количество строк
    if (userLines.length < correctLines.length) {
      errors.push(`Проверь, что ты написал все ${correctLines.length} строки кода`);
    }

    // Проверяем наличие ключевых элементов
    if (!userCode.includes("print")) {
      errors.push("Проверь, что ты используешь функцию print() для вывода результата");
    }

    // Проверяем математические операторы
    const operators = ["+", "-", "*", "/", "//", "%", "**"];
    const missingOperators = operators.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingOperators.length > 0) {
      if (missingOperators.length === 1) {
        errors.push(`Проверь, что ты используешь оператор ${missingOperators[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы: ${missingOperators.join(", ")}`);
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
    const missingVars = Object.keys(correctVars).filter((varName) => !userVars[varName]);
    if (missingVars.length > 0) {
      errors.push(`Проверь, что ты создал переменную ${missingVars[0]}`);
    }

    // Проверяем неправильные значения переменных
    Object.keys(correctVars).forEach((varName) => {
      if (userVars[varName] && userVars[varName] !== correctVars[varName]) {
        errors.push(`Проверь переменную ${varName} - правильно ли ты написал число ${correctVars[varName]}`);
      }
    });

    // Проверяем операторы сравнения
    const comparisonOps = ["==", "!=", ">", "<", ">=", "<="];
    const missingComparison = comparisonOps.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingComparison.length > 0) {
      if (missingComparison.length === 1) {
        errors.push(`Проверь, что ты используешь оператор сравнения ${missingComparison[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь операторы сравнения: ${missingComparison.join(", ")}`);
      }
    }

    // Проверяем синтаксис
    if (userCode.includes("==") && !userCode.includes("print")) {
      errors.push("Проверь, что ты выводишь результат сравнения через print()");
    }

    // Проверяем логические операторы
    const logicalOps = ["and", "or", "not"];
    const missingLogical = logicalOps.filter((op) => correctCode.includes(op) && !userCode.includes(op));
    if (missingLogical.length > 0) {
      if (missingLogical.length === 1) {
        errors.push(`Проверь, что ты используешь логический оператор ${missingLogical[0]}`);
      } else {
        errors.push(`Проверь, что ты используешь логические операторы: ${missingLogical.join(", ")}`);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6 mb-5 bg-gray-50 min-h-screen">
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
            <span className="text-sm font-medium text-gray-600">📚 Урок 1: Введение в Express</span>
            {isLessonPassed && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">✅ Пройден</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600">
              📍 {currentStep + 1} из {steps.length}
            </span>
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
                <p key={index} className="mb-3">
                  {parseJSXInText(line).map((part, partIndex) => renderTag(part, partIndex))}
                </p>
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
                  <p key={i} className="text-purple-700 text-lg">
                    {parseJSXInText(line).map((part, partIndex) => renderTag(part, partIndex))}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Код с вкладками */}
          {currentStepData.codeFiles && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {Object.keys(currentStepData.codeFiles).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => setActiveCodeTab(fileName)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeCodeTab === fileName ? "bg-blue-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      📁 {fileName}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.codeFiles[activeCodeTab])}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <div className="overflow-y-auto p-4 border border-gray-200 rounded-lg">
                <code className="whitespace-pre text-base font-mono text-gray-800">
                  {currentStepData.codeFiles[activeCodeTab]?.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed">
                      {line.split(" ").map((word, wordIndex) => {
                        // Простая подсветка синтаксиса
                        let className = "text-gray-800";
                        // Комментарии (проверяем первым, чтобы они имели приоритет)
                        if (word.startsWith("//") || line.trim().startsWith("//")) {
                          className = "text-gray-500 italic";
                        }
                        // Ключевые слова
                        else if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                          className = "text-blue-600 font-semibold";
                        }
                        // Строки
                        else if (word.includes("'") || word.includes('"')) {
                          className = "text-green-600";
                        }
                        // Числа
                        else if (/^\d+$/.test(word)) {
                          className = "text-orange-600";
                        }
                        // Методы
                        else if (word.includes("(") && !word.startsWith("(")) {
                          className = "text-purple-600";
                        }

                        return (
                          <span key={wordIndex} className={className}>
                            {word}{" "}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </code>
              </div>
            </div>
          )}

          {/* Обычный код (для других шагов) */}
          {currentStepData.code && !currentStepData.codeFiles && currentStepData.type !== "theory_practice" && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium flex items-center"> JavaScript</span>
                <button
                  onClick={() => navigator.clipboard.writeText(currentStepData.code)}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-2"
                >
                  <span>📋</span>
                  <span>Копировать</span>
                </button>
              </div>
              <div className="overflow-y-auto p-4 border border-gray-200 rounded-lg">
                <code className="whitespace-pre text-base font-mono text-gray-800">
                  {currentStepData.code.split("\n").map((line, lineIndex) => (
                    <div key={lineIndex} className="leading-relaxed">
                      {line.split(" ").map((word, wordIndex) => {
                        // Простая подсветка синтаксиса
                        let className = "text-gray-800";

                        // Комментарии (проверяем первым, чтобы они имели приоритет)
                        if (word.startsWith("//") || line.trim().startsWith("//")) {
                          className = "text-gray-500 italic";
                        }
                        // Ключевые слова
                        else if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                          className = "text-blue-600 font-semibold";
                        }
                        // Строки
                        else if (word.includes("'") || word.includes('"')) {
                          className = "text-green-600";
                        }
                        // Числа
                        else if (/^\d+$/.test(word)) {
                          className = "text-orange-600";
                        }
                        // Методы
                        else if (word.includes("(") && !word.startsWith("(")) {
                          className = "text-purple-600";
                        }

                        return (
                          <span key={wordIndex} className={className}>
                            {word}{" "}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </code>
              </div>
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
              ответов "да/нет" — <span className="font-mono">bool</span>. Главное — использовать тот тип, который подходит для вашей задачи!"
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
                      <p className="text-green-800 text-lg font-semibold">🎉 Правильно! Отличная работа! Теперь можете перейти к следующему шагу.</p>
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
                      <p className="text-red-800 text-lg font-semibold">❌ Попробуйте еще раз. Проверьте синтаксис.</p>
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
                <h3 className="text-xl font-semibold text-indigo-800 flex items-center">{currentStepData.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-indigo-700">
                    Выполнено: {currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length}/5
                  </span>
                  <div className="w-16 h-2 bg-indigo-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
                      style={{
                        width: `${(currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true).length / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-indigo-700 mb-6 text-lg">{currentStepData.content}</p>

              <div className="space-y-6">
                {currentStepData.tasks.map((task, index) => (
                  <div key={index} className="bg-white border border-indigo-200 rounded-lg p-4 shadow-md">
                    <h4 className="text-lg font-semibold text-indigo-800 mb-3">Задача {index + 1}:</h4>
                    <p className="text-gray-700 mb-4 text-lg">{task.task}</p>

                    <div className="space-y-3">
                      <textarea
                        value={additionalTaskAnswers[index] || ""}
                        onChange={(e) => {
                          setAdditionalTaskAnswers((prev) => ({
                            ...prev,
                            [index]: e.target.value,
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
                              setAdditionalTaskAttempts((prev) => ({
                                ...prev,
                                [index]: newAttempts,
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
                            setAdditionalTaskAnswers((prev) => ({
                              ...prev,
                              [`${index}_correct`]: result,
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
                            setAdditionalTaskHints((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }));
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-md text-sm"
                        >
                          <span>💡</span>
                          <span>Подсказка</span>
                        </button>
                        <button
                          onClick={() => {
                            setAdditionalTaskShowAnswer((prev) => ({
                              ...prev,
                              [index]: !prev[index],
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
                          <div className="text-blue-800 text-base">{task.hint}</div>
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
                            <p className="text-green-800 text-base font-semibold">🎉 Правильно! Отличная работа!</p>
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
                            <p className="text-red-800 text-base font-semibold">❌ Попробуйте еще раз. Проверьте синтаксис.</p>
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
                          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
                            <div className="flex items-center mb-2">
                              <span className="text-gray-700 font-medium text-sm"> JavaScript</span>
                            </div>
                            <div className="overflow-y-auto p-3 bg-gray-50 border border-gray-200 rounded">
                              <code className="whitespace-pre text-sm font-mono text-gray-800">
                                {task.answer.split("\n").map((line, lineIndex) => (
                                  <div key={lineIndex} className="leading-relaxed">
                                    {line.split(" ").map((word, wordIndex) => {
                                      let className = "text-gray-800";

                                      if (["const", "let", "var", "function", "if", "else", "return", "require", "module", "exports"].includes(word)) {
                                        className = "text-blue-600 font-semibold";
                                      } else if (word.includes("'") || word.includes('"')) {
                                        className = "text-green-600";
                                      } else if (/^\d+$/.test(word)) {
                                        className = "text-orange-600";
                                      } else if (word.startsWith("//")) {
                                        className = "text-gray-500 italic";
                                      } else if (word.includes("(") && !word.startsWith("(")) {
                                        className = "text-purple-600";
                                      }

                                      return (
                                        <span key={wordIndex} className={className}>
                                          {word}{" "}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ))}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Информация о выполнении задач */}
              {(() => {
                const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
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
                        <p className="text-yellow-800 text-lg">
                          Отлично! Выполнено {completedTasks.length} из {totalTasks} задач. Продолжайте!
                        </p>
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

          {/* Напоминание из курса */}
          {currentStepData.reminders && <ReminderBlock reminders={currentStepData.reminders} />}

          {/* Что мы изучили */}
          {currentStepData.whatWeLearned && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">✅</span>
                Что мы изучили
              </h3>
              <div className="space-y-3">
                {currentStepData.whatWeLearned.map((item, index) => (
                  <div key={index} className="text-green-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) => renderTag(part, partIndex))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Краткое резюме */}
          {currentStepData.summary && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Краткое резюме урока
              </h3>
              <div className="space-y-3">
                {currentStepData.summary.map((item, index) => (
                  <div key={index} className="text-purple-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) => renderTag(part, partIndex))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Что дальше */}
          {currentStepData.whatNext && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🚀</span>
                Что дальше
              </h3>
              <div className="space-y-3">
                {currentStepData.whatNext.map((item, index) => (
                  <div key={index} className="text-blue-800 text-lg">
                    {parseJSXInText(item).map((part, partIndex) => renderTag(part, partIndex))}
                  </div>
                ))}
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
                  const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
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
                  const completedTasks = currentStepData.tasks.filter((_, index) => additionalTaskAnswers[`${index}_correct`] === true);
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
          <div className="text-yellow-800 text-lg">{parseJSXInText(currentStepData.motivation).map((part, partIndex) => renderTag(part, partIndex))}</div>
        </div>
      )}
    </motion.div>
  );
}

export default FullStackLesson1;
