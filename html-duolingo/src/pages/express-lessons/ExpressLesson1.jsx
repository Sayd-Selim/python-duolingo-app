import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import CodeHighlight from "../../components/CodeHighlight";
import WarningHighlight from "../../components/WarningHighlight";
import ReminderBlock from "../../components/ReminderBlock";

function ExpressLesson1() {
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
        title: "Как работает Express.js изнутри? Строим свой сервер с нуля! 🧱",
        content:
          "Express.js не магия — это просто обёртка над стандартным HTTP-сервером Node.js. Чтобы понимать Express «на ты», нужно начать с самого фундамента — с обычного http.createServer().\n\nСегодня мы заглянем внутрь и создадим HTTP-сервер с нуля, чтобы понять, как работает Express.js изнутри.\n\n🏣 Метафора: Express.js — это как современный почтовый центр с автоматизацией. Но если ты хочешь понять, как работает почта — нужно начать с простого почтового отделения. Сегодня мы — как почтальоны, которые сами сортируют письма и доставляют их.\n\n🎯 Цель: Создать простой HTTP-сервер вручную и понять, как обрабатываются запросы.",

        motivation: "Понимание основ HTTP-серверов — это ключ к мастерству в веб-разработке!",
      },

      {
        type: "theory",
        title: "Что такое HTTP-сервер и как работает Express.js?",
        content:
          "HTTP-сервер — это программа, которая:\n1. Слушает входящие HTTP-запросы от клиентов (браузеров)\n2. Обрабатывает эти запросы\n3. Отправляет HTTP-ответы обратно\n\nExpress.js — это фреймворк, который упрощает работу с HTTP-сервером, добавляя удобные функции поверх базового функционала Node.js.",
        metaphor: [
          "🏣 Метафора:",
          "HTTP-сервер — это как почтовое отделение, а Express.js — это современный почтовый центр с автоматизацией.",
          "Представь почтовое отделение: клиенты приносят письма (HTTP-запросы), работники обрабатывают их и отправляют ответы. Express.js — это то же почтовое отделение, но с автоматическими сортировщиками, конвейерами и готовыми шаблонами ответов.",
          "Без Express.js ты сам пишешь все инструкции для работников. С Express.js у тебя есть готовые процедуры!",
        ],
        code: `// Что происходит под капотом Express.js:

        // 1. Express.js создаёт HTTP-сервер
        const http = require('http');
        const server = http.createServer((req, res) => {
          // 2. Express.js добавляет middleware и маршрутизацию
          // 3. Express.js парсит URL и определяет маршрут
          // 4. Express.js вызывает соответствующий обработчик
          // 5. Express.js отправляет ответ
        });

        // 6. Express.js запускает сервер
        server.listen(3000);

        // Всё это Express.js делает автоматически!`,
        explanation:
          "Express.js — это не магия, а просто удобная обёртка над встроенным модулем http Node.js.\n\nКогда ты пишешь app.get('/', ...), Express.js внутри создаёт HTTP-сервер и добавляет логику маршрутизации.\n\nКогда ты пишешь res.send(), Express.js внутри вызывает res.writeHead() и res.end().\n\nПонимая основы, ты сможешь лучше использовать возможности Express.js!",
        examples: [
          "Что делает Express.js под капотом?:",
          "Создание HTTP-сервера:",
          "Express.js автоматически создаёт HTTP-сервер с помощью http.createServer().",
          `// Express.js делает это за тебя:
        const http = require('http');
        const server = http.createServer((req, res) => {
          // Логика Express.js
        });`,
          "Что делает app.get() под капотом?:",
          "Маршрутизация запросов:",
          "Express.js парсит URL и определяет, какой обработчик вызвать.",
          `// Express.js превращает это:
        app.get('/users', (req, res) => {
          res.json(users);
        });

        // В это:
        if (req.url === '/users' && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(users));
        }`,
          "Что делает res.send() под капотом?:",
          "Отправка ответов:",
          "Express.js автоматически устанавливает заголовки и отправляет ответ.",
          `// Express.js превращает это:
        res.send('Hello World');

        // В это:
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Hello World');`,
          "Что делает middleware под капотом?:",
          "Промежуточная обработка:",
          "Express.js выполняет функции middleware перед основным обработчиком.",
          `// Express.js делает это:
        app.use((req, res, next) => {
          console.log('Request:', req.method, req.url);
          next();
        });

        // Под капотом это выглядит так:
        const middlewares = [logger, auth, cors];
        let currentMiddleware = 0;

        function processMiddleware() {
          if (currentMiddleware < middlewares.length) {
            middlewares[currentMiddleware++](req, res, processMiddleware);
          } else {
            // Выполнить основной обработчик
          }
        }`,
          "Что делает app.listen() под капотом?:",
          "Запуск сервера:",
          "Express.js запускает HTTP-сервер на указанном порту.",
          `// Express.js делает это:
        app.listen(3000, () => {
          console.log('Server running on port 3000');
        });

        // Под капотом:
        server.listen(3000, () => {
          console.log('Server running on port 3000');
        });`,
          "Что делает парсинг тела запроса под капотом?:",
          "Обработка данных:",
          "Express.js автоматически парсит JSON и form-данные.",
          `// Express.js делает это:
        app.use(express.json());

        // Под капотом:
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          req.body = JSON.parse(body);
        });`,
          "Что делает обработка ошибок под капотом?:",
          "Централизованная обработка ошибок:",
          "Express.js предоставляет удобные способы обработки ошибок.",
          `// Express.js делает это:
        app.use((err, req, res, next) => {
          console.error(err.stack);
          res.status(500).send('Something broke!');
        });

        // Под капотом это try-catch блоки вокруг каждого обработчика`,
        ],
        exampleAnalysis: {
          title: "Разбор примера: Express.js vs Нативный HTTP-сервер",
          content: `🔍 Сравним, как Express.js упрощает работу:\n\nExpress.js (простой способ):\n\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/users', (req, res) => {\n  res.json(users);\n});\n\napp.post('/users', (req, res) => {\n  const newUser = req.body;\n  users.push(newUser);\n  res.status(201).json(newUser);\n});\n\napp.listen(3000);\n\nНативный HTTP-сервер (то же самое, но сложнее):\n\nconst http = require('http');\n\nconst server = http.createServer((req, res) => {\n  // Парсинг URL\n  const url = new URL(req.url, 'http://localhost');\n  const path = url.pathname;\n  \n  // Парсинг JSON тела\n  if (req.method === 'POST') {\n    let body = '';\n    req.on('data', chunk => body += chunk);\n    req.on('end', () => {\n      try {\n        const newUser = JSON.parse(body);\n        users.push(newUser);\n        res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));\n      } catch (err) {\n        res.writeHead(400);\n        res.end('Invalid JSON');\n      }\n    });\n  } else if (req.method === 'GET' && path === '/users') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));\n  } else {\n    res.writeHead(404);\n    res.end('Not found');\n  }\n});\n\nserver.listen(3000);\n\n🔍 Видишь разницу? Express.js делает то же самое, но код намного чище и понятнее!`,
        },
        motivation: "Понимая основы HTTP-серверов, ты сможешь лучше использовать возможности Express.js и создавать более эффективные приложения!",
      },

      {
        type: "code",
        title: "Импортируем модуль HTTP — нанимаем почтовую службу 📦",
        content:
          "Откройте ваш редактор кода и создайте папку <CodeHighlight>MyExpress</CodeHighlight> и там файл <CodeHighlight>MyExpress.js</CodeHighlight> .\n\n" +
          "В начале файла подключите встроенный модуль <CodeHighlight>HTTP</CodeHighlight>  из Node.js:\n\n" +
          "Этот модуль нужен для создания HTTP-сервера — программы, которая будет принимать запросы и отправлять ответы.\n\n" +
          "💡<CodeHighlight>Express.js</CodeHighlight> использует этот модуль под капотом, поэтому мы начнём именно с него.",
        code: `const http = require('http');`,
        metaphor: [
          "🏣 Метафора:",
          " <CodeHighlight>http</CodeHighlight> — это как аренда здания — будущего почтового офиса, пока без отделений и сотрудников.",
          "Это здание умеет принимать письма (HTTP-запросы) и отправлять ответы обратно.",
          "Когда мы пишем <CodeHighlight>require('http')</CodeHighlight>, это словно подписываем договор с почтовой службой — теперь мы можем принимать и отправлять письма через их инфраструктуру.",
        ],
        explanation:
          "require('http') подключает модуль, встроенный в Node.js.\nС помощью него мы сможем создать свой сервер вручную — как это делает Express внутри себя.",
        motivation:
          "Ты только что подключил основной строительный блок для создания веб-серверов. Без него не будет ни Express, ни твоего будущего фреймворка!",
      },

      {
        type: "code",
        title: "Создаём хранилище маршрутов — папку с инструкциями для GET-запросов 📂",
        content:
          "В файле <CodeHighlight>MyExpress.js</CodeHighlight>  создаём переменную <CodeHighlight>routes</CodeHighlight> , чтобы хранить все маршруты для  <CodeHighlight>GET</CodeHighlight>-запросов:\n\n" +
          "Это объект, где ключ — путь (URL), а значение — функция, которая обработает запрос.\n\n" +
          "💡 Метафора: представь, что это наша папка с инструкциями. Каждый раз, когда приходит письмо (GET-запрос) на конкретный адрес (путь), мы смотрим в эту папку, чтобы узнать, что с ним делать.",
        code: `const http = require('http');

        const routes = {
            GET: {}
        }; `,
        metaphor: [
          "📂 Метафора:",
          "<CodeHighlight>routes</CodeHighlight> — это как папка с инструкциями для почтовых сотрудников.",
          "В ней хранятся правила: если письмо пришло обычным письмом (GET) на определённый адрес (URL), то как его обработать.",
          "Каждый адрес — это отдельное дело, и для него есть своя инструкция — функция-обработчик.",
        ],
        motivation: "Теперь у нас есть база — место, где мы будем хранить все маршруты. Это основа для построения нашего сервера!",
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢  <CodeHighlight>http</CodeHighlight> — мы арендовали здание и можем принимать письма (запросы).",
          "- 📂 <CodeHighlight>routes</CodeHighlight>  — у нас появилась папка с инструкциями, куда мы будем складывать правила обработки писем.",
        ],
        whatNext: ["🧑‍💼 Следующий шаг: пора нанимать сотрудников — добавим функцию `get(path, handler)` для регистрации маршрутов!"],
      },

      {
        type: "code",
        title: "Регистрируем маршруты: добавляем сотрудников, которые обрабатывают письма 📬",
        content:
          "Теперь давайте создадим функцию <CodeHighlight>get(path, handler)</CodeHighlight>, которая будет добавлять маршрут в наш объект <CodeHighlight>routes</CodeHighlight>.\n\n" +
          "Когда мы захотим обработать, например, <CodeHighlight>GET</CodeHighlight>-запрос на <CodeHighlight>/</CodeHighlight>, мы вызовем:\n\n" +
          "<CodeHighlight>get('/', handler)</CodeHighlight> — это как дать сотруднику инструкцию: если придёт письмо на <CodeHighlight>/</CodeHighlight>, обработай его вот так.\n\n" +
          "📌 Эта функция аналогична <CodeHighlight>app.get()</CodeHighlight> в Express.js.",
        code: `const http = require('http');

        const routes = {
            GET: {}
        };

        function get(path, handler) {
            routes.GET[path] = handler;
        }`,
        metaphor: [
          "👨‍💼 Метафора:",
          "<CodeHighlight>get()</CodeHighlight> — это как если бы мы нанимали сотрудника и говорили ему:",
          "«Если придёт письмо (GET-запрос) на такой-то адрес <CodeHighlight>path</CodeHighlight>, обрабатывай его вот так <CodeHighlight>handler</CodeHighlight>».",
          "Каждый такой сотрудник знает, на какое письмо он должен реагировать, и что с ним делать.",
        ],
        motivation: "Теперь у нас есть механизм регистрации маршрутов! Это как настраивать правила работы с письмами: кто за что отвечает.",
        whatWeLearned: [
          "🧱 Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — мы арендовали здание и готовы принимать письма.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — у нас есть папка с инструкциями по обработке писем.",
          "- 👨‍💼 <CodeHighlight>get(path, handler)</CodeHighlight> — мы начали нанимать сотрудников, которые знают, как отвечать на письма по адресу.",
        ],
        whatNext: ["📨 Следующий шаг: давайте построим механизм, который будет принимать письма (запросы) и отправлять их нужному сотруднику (обработчику)!"],
      },

      {
        type: "code",
        title: "Создаём сервер — наш приёмный стол в почтовом офисе 🏤",
        content:
          "Теперь создадим сам сервер с помощью <CodeHighlight>http.createServer()</CodeHighlight> — это основа, на которой мы построим всю нашу логику.\n\n" +
          "Сейчас мы пока просто ставим приёмный стол, который будет принимать все письма (HTTP-запросы), но пока не знаем, что с ними делать.\n\n" +
          "Давайте также разберёмся с двумя важными помощниками:\n\n" +
          "- <CodeHighlight>req</CodeHighlight> — объект запроса, который содержит информацию о входящем HTTP-запросе: откуда он пришёл, какой у него адрес (URL), метод и тело.\n" +
          "- <CodeHighlight>res</CodeHighlight> — объект ответа, который мы используем, чтобы сформировать и отправить ответ клиенту: задать заголовки, статус и тело ответа.",
        code: `const server = http.createServer((req, res) => {
            // Пока ничего не делаем
        });`,
        metaphor: [
          "📬 Метафора:",
          "<CodeHighlight>server</CodeHighlight> — это как приёмный стол в почтовом отделении, где обрабатываются все входящие письма.",
          "<CodeHighlight>req</CodeHighlight> — наш сотрудник, который первым берёт письмо. Он знает, откуда оно пришло, какой у него адрес и что внутри.",
          "<CodeHighlight>res</CodeHighlight> — второй сотрудник, который формирует и отправляет ответ клиенту. Он подготавливает письмо-ответ и кладёт его в исходящую почту.",
          "Сейчас у нас есть стол и сотрудники, но пока нет правил: кто обрабатывает какое письмо.",
        ],
        motivation: "Это первый реальный шаг к собственному Express.js! У нас уже есть основа — теперь осталось научить сотрудников, что делать с письмами.",
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — арендовали здание.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — завели папку с маршрутами.",
          "- 👨‍💼 <CodeHighlight>get(path, handler)</CodeHighlight> — наняли сотрудников-обработчиков.",
          "- 🏤 <CodeHighlight>http.createServer</CodeHighlight> — поставили приёмный стол и назначили сотрудников, которые будут обрабатывать и отвечать на письма.",
        ],
        whatNext: [
          "📮 Следующий шаг: научим нашего приёмного сотрудника (HTTP-сервер) внимательно смотреть на адрес письма (URL запроса) и передавать его тому сотруднику (обработчику), кто отвечает за этот адрес!",
        ],
      },

      {
        type: "code",
        title: "Передаём письма нужным сотрудникам — маршрутизация запросов 📬➡️👨‍💼",
        content:
          "Теперь научим наш сервер не просто принимать письма, а разбирать их и передавать нужному сотруднику (обработчику).\n\n" +
          "Когда к приёмному столу (серверу) приходит письмо (HTTP-запрос), наш сотрудник <CodeHighlight>req</CodeHighlight> берёт его и смотрит:\n\n" +
          "- 📍 <CodeHighlight>req.url</CodeHighlight> — адрес получателя: куда направлено письмо.\n" +
          "- 🧾 <CodeHighlight>req.method</CodeHighlight> — тип задачи: что от нас хотят (например, просто получить информацию — <CodeHighlight>GET</CodeHighlight>, или отправить данные — <CodeHighlight>POST</CodeHighlight>).\n\n" +
          "С этим методом и адресом мы ищем нужную инструкцию в папке маршрутов <CodeHighlight>routes</CodeHighlight>. Если она есть — передаём письмо нужному сотруднику-обработчику. Если инструкции нет — возвращаем вежливый ответ: «404 Not Found».",
        code: `const http = require('http');

            // это наша папка с инструкциями
            const routes = {
              GET: {}
            };

            // Мы нанимаем сотрудника и даём ему инструкцию:
            // «Если письмо пришло на такой-то адрес, обрабатывай его так»
            function get(path, handler) {
              routes.GET[path] = handler;
            }

            // Создаём сервер — приёмный стол
            const server = http.createServer((req, res) => {
              const method = req.method; // Тип задачи: GET, POST и т.д.
              const url = req.url;       // Адрес запроса

              // Ищем инструкцию в нашей папке маршрутов
              const handler = routes[method] && routes[method][url];

              if (handler) {
                handler(req, res); // Передаём письмо нужному сотруднику
              } else {
                res.statusCode = 404;
                res.end('Not Found');
              }
            });`,
        metaphor: [
          "📬 Метафора:",
          "1. Письмо приходит к приёмному столу (серверу).",
          "2. Сотрудник <CodeHighlight>req</CodeHighlight> говорит: «Письмо с задачей GET пришло на адрес `/`».",
          "3. Мы проверяем, есть ли инструкция в нашей папке <CodeHighlight>routes</CodeHighlight> для такой задачи и адреса.",
          "4. Если есть — другой сотрудник обрабатывает и отвечает (handler).",
          "5. Если нет — отправляем вежливый отказ: «Адрес не найден» (404).",
        ],
        motivation:
          "Теперь наш сервер умеет понимать, что хочет клиент: не просто принимает запрос, а осмысленно передаёт его тем, кто знает, как с ним работать.",
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — арендовали здание для нашего сервера.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — создали папку с маршрутами.",
          "- 👨‍💼 <CodeHighlight>get(path, handler)</CodeHighlight> — наняли сотрудников для обработки маршрутов.",
          "- 🏤 <CodeHighlight>server</CodeHighlight> — поставили приёмный стол.",
          "- 📨 <CodeHighlight>req.method</CodeHighlight> — определяет, какую задачу нужно выполнить: получить данные, отправить, обновить и т.д.",
          "- 🧭 <CodeHighlight>req.url</CodeHighlight> — указывает, на какой адрес пришло письмо.",
          "- 🔄 Маршрутизация — определяем, какой обработчик (handler) должен выполнить задачу.",
          "- ❌ 404 — если обработчик не найден, мы возвращаем вежливый отказ.",
        ],
        whatNext: ["🚪 Следующий шаг: наконец-то запустим сервер и откроем двери нашего почтового отделения!"],
      },

      {
        type: "code",
        title: "Открываем двери — запускаем сервер для приёма писем 🚪📨",
        content:
          "Теперь, когда у нас есть здание, сотрудники и инструкции, пора открыть двери и начать принимать письма от клиентов.\n\n" +
          "Мы запускаем сервер с помощью <CodeHighlight>server.listen(port, callback)</CodeHighlight> — указываем порт и функцию, которая сработает после запуска.\n\n" +
          "После запуска сервер будет слушать входящие запросы и передавать их нужным обработчикам.",
        code: `server.listen(3000, () => {
              console.log('Сервер запущен на порту 3000');
          });`,
        metaphor: [
          "🚪 Метафора:",
          "Мы открыли двери нашего почтового отделения (сервера) на порту 3000.",
          "Теперь посетители (клиенты) могут приносить письма (HTTP-запросы), и наши сотрудники готовы их обрабатывать.",
        ],
        motivation: "Это важный шаг — сервер заработал и готов принимать реальные запросы!",
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — здание для сервера.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — папка с маршрутами и инструкциями.",
          "- <CodeHighlight>get(path, handler)</CodeHighlight> — сотрудники-обработчики.",
          "- 🏤 <CodeHighlight>server</CodeHighlight> — приёмный стол.",
          "- <CodeHighlight>маршрутизация</CodeHighlight> — механизм передачи писем нужным сотрудникам.",
          "- 🚪 <CodeHighlight>server.listen()</CodeHighlight> — открыли двери и готовы принимать письма!",
        ],
        whatNext: ["📡 Следующий шаг: научимся обрабатывать разные методы запросов и расширим наш сервер."],
      },

      {
        type: "recap",
        title: "📦 Резюме: что мы построили и как всё работает вместе",
        content:
          "Поздравляю! Мы с нуля создали мини-версию Express.js — простой, но полноценный HTTP-сервер. Давайте подведём итоги и вспомним, как работает каждая часть нашего почтового офиса.\n\n" +
          "🧱 Каждая строчка кода — это кирпичик в нашей системе. Вот как всё устроено:\n\n" +
          "1. <CodeHighlight>http</CodeHighlight> — это как арендованное здание. Без него не было бы офиса.\n" +
          "2. <CodeHighlight>routes</CodeHighlight> — папка с инструкциями: на какие письма как реагировать.\n" +
          "3. <CodeHighlight>get(path, handler)</CodeHighlight> — регистратор маршрутов. Ты говоришь: «если придёт письмо по адресу `/`, обрабатывай его так-то».\n" +
          "4. <CodeHighlight>req</CodeHighlight> — сотрудник, который приносит письмо, говорит откуда оно и что в нём.\n" +
          "5. <CodeHighlight>res</CodeHighlight> — сотрудник, который оформляет ответ и отправляет его обратно клиенту.\n" +
          "6. <CodeHighlight>createServer()</CodeHighlight> — приёмный стол. Он встречает все письма и распределяет их.\n" +
          "7. <CodeHighlight>server.listen()</CodeHighlight> — открытие офиса. С этого момента мы готовы к работе и принимаем запросы.",
        metaphor: [
          "📬 Метафора — наш почтовый офис в действии:",
          "- Клиенты (браузеры) присылают письма (HTTP-запросы).",
          "- Приёмный стол (сервер) принимает их.",
          "- Сотрудник <CodeHighlight>req</CodeHighlight> смотрит, куда письмо адресовано и каким методом.",
          "- Мы ищем инструкцию в папке <CodeHighlight>routes</CodeHighlight>.",
          "- Если инструкция есть — вызываем нужного сотрудника (обработчик через <CodeHighlight>get()</CodeHighlight>).",
          "- Сотрудник <CodeHighlight>res</CodeHighlight> формирует ответ и отправляет клиенту.",
        ],
        motivation: "Теперь ты понимаешь, как работает Express.js изнутри. Это уже не чёрная магия — ты сам построил фундамент для собственного фреймворка!",
        whatWeLearned: [
          "✅ Что у нас есть сейчас:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — здание нашего сервера.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — правила обработки писем.",
          "- 👨‍💼 <CodeHighlight>get()</CodeHighlight> — сотрудники, которые умеют обрабатывать конкретные письма.",
          "- 🧾 <CodeHighlight>req</CodeHighlight> и 📦 <CodeHighlight>res</CodeHighlight> — внутренние помощники сервера.",
          "- 🏤 <CodeHighlight>createServer()</CodeHighlight> — приёмный стол.",
          "- 🚪 <CodeHighlight>server.listen()</CodeHighlight> — открыли двери и начали принимать посетителей.",
          "- 🔄 Логика маршрутизации — письма передаются нужному обработчику.",
        ],
        whatNext: ["📨 Следующий шаг: протестируем работу маршрутов — проверим, как наш офис отвечает на письма!"],
      },

      {
        type: "code",
        title: "Тестируем наш сервер: отправляем первое письмо ✉️📨",
        content:
          "Пора протестировать, как работает наша собственная мини-библиотека <CodeHighlight>Express.js</CodeHighlight> !\n\n" +
          "  Мы экспортировали её из файла <CodeHighlight>MyExpress.js</CodeHighlight> и теперь можем использовать как привычный Express:\n\n" +
          "- Вызываем <CodeHighlight>express()</CodeHighlight>, чтобы создать приложение.\n" +
          "- Регистрируем маршрут с помощью <CodeHighlight>app.get()</CodeHighlight>.\n" +
          "- Запускаем сервер через <CodeHighlight>app.listen()</CodeHighlight>.\n\n" +
          "<WarningHighlight>Важно</WarningHighlight>: когда приходит запрос, наш сервер должен обязательно отправить **ответ** клиенту. Если мы забудем вызвать <CodeHighlight>res.end()</CodeHighlight>, браузер будет ждать вечно, а пользователь увидит только бесконечную загрузку.\n\n" +
          "Теперь запускаем сервер и открываем в браузере <CodeHighlight>http://localhost:3000</CodeHighlight> — если всё работает, мы увидим сообщение от сервера!",
        code: `// 📁 index.js — основной файл, где мы используем нашу библиотеку

          const express = require('./MyExpress'); // Импортируем нашу версию Express
          const app = express(); // Создаём экземпляр приложения

          // 📨 Регистрируем маршрут на GET /
          app.get('/', (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            // ОБЯЗАТЕЛЬНО вызываем res.end(), чтобы отправить ответ клиенту
            res.end('Добро пожаловать в наш почтовый офис!');
          });

          // 🚪 Запускаем сервер на порту 3000
          app.listen(3000, () => {
            console.log('Сервер запущен на порту 3000');
          });
          `,
        metaphor: [
          "📫 Метафора:",
          "1. Мы построили своё здание (сервер) с помощью собственного конструктора — как будто открыли свой офис с нуля.",
          "2. Зарегистрировали сотрудника (handler) для входящих писем по адресу `/`.",
          "<WarningHighlight>3. Важно</WarningHighlight>: если сотрудник получил письмо, он ОБЯЗАТЕЛЬНО должен ответить клиенту — иначе клиент будет в замешательстве и ждать вечно!",
        ],
        motivation: "Теперь у нас есть полноценная заготовка для сервера! Проверив, что он действительно отвечает на запросы, мы убедимся: наш офис работает!",
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — арендовали здание для нашего сервера.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — создали папку с маршрутами.",
          "- <CodeHighlight>get(path, handler)</CodeHighlight> — наняли сотрудников для обработки маршрутов.",
          "- 🏤 <CodeHighlight>server</CodeHighlight> — поставили приёмный стол.",
          "- <CodeHighlight>req.method</CodeHighlight> — определяем, какую задачу нужно выполнить.",
          "- <CodeHighlight>req.url</CodeHighlight> — указывает, на какой адрес пришло письмо.",
          "- 🔄 Маршрутизация — определяем, какой обработчик должен выполнить задачу.",
          "- ❌ 404 — если обработчик не найден, возвращаем вежливый отказ.",
          "- 🚪 <CodeHighlight>server.listen()</CodeHighlight> — открыли двери и готовы принимать письма.",
          "- 🧱 Собственная мини-библиотека <CodeHighlight>MyExpress.js</CodeHighlight>.",
          "- 📂 Регистрируем маршруты через <CodeHighlight>app.get()</CodeHighlight>.",
          "- 📮 Сервер слушает и обрабатывает запросы.",
          "- <WarningHighlight>Важно</WarningHighlight>: не забываем вызывать <CodeHighlight>res.end()</CodeHighlight> для завершения ответа.",
          "- 🌐 Тестируем сервер через <CodeHighlight>http://localhost:3000</CodeHighlight>.",
        ],
        whatNext: [
          "🚀 Следующий шаг: добавим удобный метод <CodeHighlight>res.send()</CodeHighlight>, чтобы отвечать клиенту было проще и быстрее!",
          // "🔍 А затем — добавим дополнительные маршруты, например, <CodeHighlight>/about</CodeHighlight> и <CodeHighlight>/contact</CodeHighlight>, чтобы наш офис стал более многофункциональным!",
        ],
      },

      {
        type: "code",
        title: "Удобный способ отправлять ответы — добавляем метод res.send 📨✨",
        content:
          "Чтобы отправлять ответы клиенту было проще и удобнее, добавим метод <CodeHighlight>send</CodeHighlight> в объект <CodeHighlight>res</CodeHighlight> — так же, как это делает настоящий Express.js.\n\n" +
          "Теперь не нужно вручную писать <CodeHighlight>res.statusCode = 200</CodeHighlight>, <CodeHighlight>res.setHeader</CodeHighlight> и <CodeHighlight>res.end</CodeHighlight> — всё это будет делать <CodeHighlight>res.send()</CodeHighlight> автоматически!\n\n" +
          "Метод <CodeHighlight>send</CodeHighlight> принимает три параметра:\n" +
          "- <CodeHighlight>body</CodeHighlight> — тело ответа (строка или Buffer)\n" +
          "- <CodeHighlight>statusCode</CodeHighlight> — HTTP статус (по умолчанию 200)\n" +
          "- <CodeHighlight>contentType</CodeHighlight> — заголовок Content-Type (по умолчанию 'text/plain; charset=utf-8')\n\n" +
          "Теперь писать обработчики стало проще и быстрее!",
        code: `// 📁 MyExpress.js

        const http = require('http');

        function express() {
          const routes = {
            GET: {},
          };

          function get(path, handler) {
            routes.GET[path] = handler;
          }

          function listen(port, callback) {
            const server = http.createServer((req, res) => {
              // 📦 Добавляем метод send в res
              res.send = (body, statusCode = 200, contentType = 'text/plain; charset=utf-8') => {
                res.statusCode = statusCode;
                res.setHeader('Content-Type', contentType);
                res.end(body);
              };

              const method = req.method;
              const url = req.url;

              const handler = routes[method] && routes[method][url];

              if (handler) {
                handler(req, res);
              } else {
                res.statusCode = 404;
                res.end('Not Found');
              }
            });

            server.listen(port, callback);
          }

          return {
            get,
            listen,
          };
        }

        module.exports = express;`,
        metaphor: [
          "📬 Метафора:",
          "Раньше наш сотрудник (res) вручную собирал каждое письмо — клеил конверт, ставил печать и лично отправлял.",
          "Теперь у него есть шаблонное письмо (send), которое он быстро заполняет и отправляет — меньше рутины, больше эффективности!",
          "Метод <CodeHighlight>send</CodeHighlight> — это как автоматический конвейер для исходящих писем.",
        ],
        motivation:
          "Добавление <CodeHighlight>res.send</CodeHighlight> — это шаг в сторону настоящего удобства. Всё как в настоящем Express — а ведь мы сделали это сами!",
        metaphor: [
          "📬 Метафора:",
          "Раньше наш сотрудник (<CodeHighlight>res</CodeHighlight>) вручную собирал каждое письмо — клеил конверт, ставил печать и лично отправлял.",
          "Теперь у него есть шаблонное письмо (<CodeHighlight>send</CodeHighlight>), которое он быстро заполняет и отправляет — меньше рутины, больше эффективности!",
          "Метод <CodeHighlight>send</CodeHighlight> — это как автоматический конвейер для исходящих писем.",
          "",
          "✉️ Что такое <CodeHighlight>body</CodeHighlight>, <CodeHighlight>statusCode</CodeHighlight> и <CodeHighlight>contentType</CodeHighlight>?",
          "- <CodeHighlight>body</CodeHighlight> — это само письмо: его содержимое, что клиент должен прочитать.",
          "- <CodeHighlight>statusCode</CodeHighlight> — это печать на письме: показывает, как прошла обработка (успешно, с ошибкой и т.д.).",
          "- <CodeHighlight>contentType</CodeHighlight> — это ярлык на конверте: говорит клиенту, как читать содержимое (текст, HTML, JSON и т.д.).",
        ],

        whatNext: ["📦 Следующий шаг: добавим поддержку других HTTP методов — наймём сотрудников не только для GET, но и для POST, PUT и DELETE!"],
      },

      {
        type: "code",
        title: "Добавляем поддержку других типов писем — POST, PUT, DELETE ✉️📦📤",
        content:
          "Сейчас наш сервер понимает только письма, доставленные обычной почтой — то есть запросы с методом <CodeHighlight>GET</CodeHighlight>.\n\n" +
          "Но в реальном мире есть и другие виды писем:\n" +
          "- <CodeHighlight>POST</CodeHighlight> — когда клиент отправляет нам новую информацию (пример: письмо-заявление)\n" +
          "- <CodeHighlight>PUT</CodeHighlight> — когда нужно обновить уже существующее (пример: исправленная копия письма)\n" +
          "- <CodeHighlight>DELETE</CodeHighlight> — когда просят удалить что-то (пример: письмо с просьбой убрать из базы)\n\n" +
          "Давайте расширим наш <CodeHighlight>routes</CodeHighlight> и добавим функции регистрации маршрутов для каждого метода!",
        code: `const routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
          };

          function post(path, handler) {
            routes.POST[path] = handler;
          }

          function put(path, handler) {
            routes.PUT[path] = handler;
          }

          function del(path, handler) {
            routes.DELETE[path] = handler;
          }`,
        metaphor: [
          "📦 <CodeHighlight>Метафора:</CodeHighlight>",
          "<CodeHighlight>POST</CodeHighlight>, <CodeHighlight>PUT</CodeHighlight>, <CodeHighlight>DELETE</CodeHighlight> — это как разные типы писем, которые приносят клиенты:",
          "- <CodeHighlight>POST</CodeHighlight> — новое письмо, заявка, которую нужно зарегистрировать.",
          "- <CodeHighlight>PUT</CodeHighlight> — письмо с правками — клиент просит заменить уже имеющееся.",
          "- <CodeHighlight>DELETE</CodeHighlight> — письмо с просьбой удалить что-то из базы.",
          "Теперь у нас есть отдельные сотрудники, которые отвечают за каждый тип писем!",
        ],
        motivation:
          "Теперь наш сервер становится настоящим офисом, который умеет обрабатывать не только запросы, но и действия: добавление, обновление и удаление!",
        reminders: [
          "📂 <CodeHighlight>routes</CodeHighlight> — как офисный шкаф с полками для писем разного типа: GET, POST, PUT, DELETE. Мы заранее создаём ячейки, куда кладём инструкции (обработчики), что делать с письмами по каждому адресу.",
          "🗂️ <CodeHighlight>get(path, handler)</CodeHighlight>, <CodeHighlight>post()</CodeHighlight>, <CodeHighlight>put()</CodeHighlight>, <CodeHighlight>del()</CodeHighlight> — это сотрудники, которые просто складывают инструкции в нужные полки <CodeHighlight>routes</CodeHighlight>, чтобы потом их нашли и выполнили.",
        ],
        whatWeLearned: [
          "✅ Что у нас есть на данный момент:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — арендовали здание для нашего сервера.",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — это как офисный шкаф с ячейками для разных типов писем: GET, POST, PUT, DELETE. Мы туда складываем инструкции, как обрабатывать каждый запрос.",
          "- 👨‍💼 <CodeHighlight>get(path, handler)</CodeHighlight>, <CodeHighlight>post()</CodeHighlight>, <CodeHighlight>put()</CodeHighlight>, <CodeHighlight>del()</CodeHighlight> — наши сотрудники, которые добавляют инструкции в соответствующие отделы шкафа <CodeHighlight>routes</CodeHighlight>.",
          "- 🏤 <CodeHighlight>server</CodeHighlight> — приёмный стол, который принимает письма (запросы).",
          "- ✉️ <CodeHighlight>req.method</CodeHighlight> — определяем, какое письмо пришло: GET, POST и т.д.",
          "- 🗺️ <CodeHighlight>req.url</CodeHighlight> — адрес, на который пришло письмо.",
          "- 🔄 Маршрутизация — определяем, какой обработчик должен выполнить задачу.",
          "- ❌ 404 — если обработчик не найден, отправляем вежливый отказ.",
          "- 🚪 <CodeHighlight>server.listen()</CodeHighlight> — открыли двери и начали работу.",
          "- 🧱 Собственная мини-библиотека <CodeHighlight>MyExpress.js</CodeHighlight> — наш самодельный Express.",
          "- 📂 Регистрируем маршруты через <CodeHighlight>app.get()</CodeHighlight> и другие методы.",
          "- 📮 Сервер слушает и обрабатывает запросы.",
          "- 🧠 Добавили метод <CodeHighlight>res.send()</CodeHighlight> — теперь отправлять ответы проще.",
          "- 🧾 <CodeHighlight>res.send()</CodeHighlight> автоматически выставляет статус, заголовки и завершает ответ.",
          "- 💌 <CodeHighlight>body</CodeHighlight> — тело ответа: то, что увидит клиент (например, текст).",
          "- 🏷️ <CodeHighlight>statusCode</CodeHighlight> — статус, с которым мы отправляем письмо (по умолчанию 200).",
          "- 🧾 <CodeHighlight>contentType</CodeHighlight> — формат письма, например <CodeHighlight>text/html</CodeHighlight> или <CodeHighlight>application/json</CodeHighlight>.",
          "- <WarningHighlight>Важно</WarningHighlight>: не забываем вызывать <CodeHighlight>res.end()</CodeHighlight>, если не используем <CodeHighlight>send()</CodeHighlight>.",
          "- 🌐 Тестируем сервер через <CodeHighlight>http://localhost:3000</CodeHighlight>.",
        ],
        whatNext: ["📥 Следующий шаг: добавим обработку тела запроса (body), чтобы сотрудники могли читать содержимое писем!"],
      },

      {
        type: "code",
        title: "🎉 Готово! Наш собственный HTTP-сервер с маршрутизацией — мини-Express.js!",
        content:
          "🎉 Поздравляем! Мы создали полноценный HTTP-сервер с нуля, который умеет:\n\n" +
          "✅ Принимать HTTP-запросы от клиентов (браузеров)\n" +
          "✅ Анализировать метод запроса (<CodeHighlight>GET</CodeHighlight>, <CodeHighlight>POST</CodeHighlight>, <CodeHighlight>PUT</CodeHighlight>, <CodeHighlight>DELETE</CodeHighlight>) и <CodeHighlight>URL</CodeHighlight>\n" +
          "✅ Находить подходящий обработчик в нашей системе маршрутов — <CodeHighlight>routes</CodeHighlight>\n" +
          "✅ Передавать запрос нужному обработчику, зарегистрированному через <CodeHighlight>get()</CodeHighlight>, <CodeHighlight>post()</CodeHighlight> и другие\n" +
          "✅ Отправлять ответы клиенту с помощью <CodeHighlight>res.end()</CodeHighlight> или <CodeHighlight>res.send()</CodeHighlight>\n" +
          "✅ Автоматически устанавливать статус и заголовки через <CodeHighlight>res.send()</CodeHighlight>\n" +
          "✅ Обрабатывать ошибки, если маршрут не найден — <CodeHighlight>404 Not Found</CodeHighlight>\n\n" +
          "🧱 Всё это — основа настоящего <CodeHighlight>Express.js</CodeHighlight>. Только теперь ты сам знаешь, как он устроен изнутри.\n\n" +
          "🚀 Мы построили свой собственный мини-фреймворк, и это только начало!",
        codeFiles: {
          "MyExpress.js": `// 📁 MyExpress.js — наша собственная мини-библиотека Express      
const http = require('http');
      
function express() {
  const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };

  function get(path, handler) {
    routes.GET[path] = handler;
  }

  function post(path, handler) {
    routes.POST[path] = handler;
  }

  function put(path, handler) {
    routes.PUT[path] = handler;
  }

  function del(path, handler) {
    routes.DELETE[path] = handler;
  }

  function listen(port, callback) {
    const server = http.createServer((req, res) => {
      // 📦 Добавляем метод send в res
      res.send = (body, statusCode = 200, contentType = 'text/plain; charset=utf-8') => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', contentType);
        res.end(body);
      };

      const method = req.method;
      const url = req.url;

      const handler = routes[method] && routes[method][url];

      if (handler) {
        handler(req, res);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    });

    server.listen(port, callback);
  }

  return {
    get,
    post,
    put,
    del,
    listen,
    routes
  };
}

module.exports = express;`,
          "index.js": `// 📁 index.js — основной файл приложения

const express = require("./MyExpress"); // импортируем как express

const app = express(); // создаём экземпляр сервера (наш "офис")


app.get("/money", (req, res) => { 
   // Отправляем тело ответа клиенту
   res.send('Добро пожаловать в наш почтовый офис! get');

});

app.post("/auth", (req, res) => { 
   // Отправляем тело ответа клиенту
   res.send('Добро пожаловать в наш почтовый офис! post');
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});

console.log('routes',app.routes);
`,
        },
        metaphor: [
          "🎉 Метафора:",
          "Мы построили полноценное почтовое отделение с нуля!",
          "🏢 <CodeHighlight>http</CodeHighlight> — арендовали здание для нашего офиса.",
          "📂 <CodeHighlight>routes</CodeHighlight> — создали систему сортировки и хранения инструкций, куда направлять письма.",
          "👨‍💼 <CodeHighlight>get()</CodeHighlight>, <CodeHighlight>post()</CodeHighlight>, <CodeHighlight>put()</CodeHighlight>, <CodeHighlight>delete()</CodeHighlight> — наняли сотрудников с чёткими инструкциями для каждого типа письма.",
          "🏤 <CodeHighlight>server</CodeHighlight> — поставили приёмный стол, который встречает все входящие письма.",
          "🧠 Маршрутизация — научили сотрудников читать адреса и методы, чтобы правильно направлять письма к нужным исполнителям.",
          "🚪 <CodeHighlight>server.listen()</CodeHighlight> — открыли двери для посетителей, чтобы офис начал принимать письма.",
          "Теперь наше отделение работает как настоящее — принимает письма и доставляет их по адресам!",
        ],

        motivation:
          "Ты только что создал свой собственный веб-сервер с нуля! Это основа всех современных веб-фреймворков. Теперь ты понимаешь, как работает Express.js изнутри! В следующем уроке мы научимся читать содержимое писем — обрабатывать данные, которые отправляют клиенты.",

        whatWeLearned: [
          "✅ Что мы изучили за весь урок:",
          "- 🏢 <CodeHighlight>http</CodeHighlight> — встроенный модуль Node.js для создания HTTP-серверов",
          "- 📂 <CodeHighlight>routes</CodeHighlight> — объект для хранения маршрутов, где ключ — путь, значение — обработчик",
          "- 👨‍💼 <CodeHighlight>get(path, handler)</CodeHighlight> — функция для регистрации GET-маршрутов (аналог app.get() в Express)",
          "- 🗂️ <CodeHighlight>post()</CodeHighlight>, <CodeHighlight>put()</CodeHighlight>, <CodeHighlight>del()</CodeHighlight> — функции для регистрации других HTTP-методов",
          "- 🏤 <CodeHighlight>http.createServer()</CodeHighlight> — создание HTTP-сервера с обработчиком запросов",
          "- 📬 <CodeHighlight>req</CodeHighlight> — объект запроса с информацией о входящем HTTP-запросе",
          "- 📨 <CodeHighlight>res</CodeHighlight> — объект ответа для отправки данных клиенту",
          "- 🔄 <CodeHighlight>req.method</CodeHighlight> и <CodeHighlight>req.url</CodeHighlight> — получение метода и URL запроса",
          "- 🚪 <CodeHighlight>server.listen()</CodeHighlight> — запуск сервера на указанном порту",
          "- 🎯 Полный рабочий HTTP-сервер с маршрутизацией — основа для понимания Express.js!",
        ],
        summary: [
          "🎯 <WarningHighlight>Краткое резюме урока</WarningHighlight>",
          "",
          "🏢 <CodeHighlight>http</CodeHighlight> — это здание нашего почтового офиса, где мы принимаем и отправляем письма.",
          "",
          "📂 <CodeHighlight>routes</CodeHighlight> — это наш шкаф для хранения инструкций. В нём есть полки для каждого типа писем: GET, POST, PUT, DELETE.",
          "",
          "👨‍💼 <CodeHighlight>get()</CodeHighlight>, <CodeHighlight>post()</CodeHighlight>, <CodeHighlight>put()</CodeHighlight>, <CodeHighlight>del()</CodeHighlight> — это наши четыре сотрудника, которые складывают инструкции в нужные полки шкафа <CodeHighlight>routes</CodeHighlight>.",
          "",
          "🏤 <CodeHighlight>server</CodeHighlight> — это приёмный стол, который принимает все входящие письма и смотрит, на какую полку шкафа их положить.",
          "",
          "🧠 <CodeHighlight>req.method</CodeHighlight> и <CodeHighlight>req.url</CodeHighlight> — это адрес и тип письма, по которым мы определяем, какую инструкцию взять из шкафа.",
          "",
          "🚪 <CodeHighlight>server.listen()</CodeHighlight> — это открытие дверей офиса, чтобы начать принимать письма от посетителей.",
          "",
          "🎉 <WarningHighlight>Итог</WarningHighlight>: Мы построили полноценный почтовый офис, который умеет принимать письма, читать их адреса и выполнять нужные инструкции!",
        ],
        whatNext: [
          "🚀 Урок 2: Как клиент передаёт данные серверу — params, query, body",
          "добавим поддержку параметров в URL (`req.params`) и тела запроса (`req.body`), чтобы сервер мог обрабатывать динамические данные от клиентов!",
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

  // Функция для парсинга JSX тегов в тексте
  const parseJSXInText = (text) => {
    if (!text) return [];

    const parts = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      // Ищем CodeHighlight теги
      const codeOpenTagIndex = text.indexOf("<CodeHighlight>", currentIndex);
      // Ищем WarningHighlight теги
      const warningOpenTagIndex = text.indexOf("<WarningHighlight>", currentIndex);

      // Определяем, какой тег ближе
      let openTagIndex = -1;
      let tagType = "";
      let openTagLength = 0;
      let closeTagLength = 0;

      if (codeOpenTagIndex !== -1 && (warningOpenTagIndex === -1 || codeOpenTagIndex < warningOpenTagIndex)) {
        openTagIndex = codeOpenTagIndex;
        tagType = "code";
        openTagLength = 15; // "<CodeHighlight>".length
        closeTagLength = 16; // "</CodeHighlight>".length
      } else if (warningOpenTagIndex !== -1) {
        openTagIndex = warningOpenTagIndex;
        tagType = "warning";
        openTagLength = 18; // "<WarningHighlight>".length
        closeTagLength = 19; // "</WarningHighlight>".length
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
      const closeTagName = tagType === "code" ? "</CodeHighlight>" : "</WarningHighlight>";
      const closeTagIndex = text.indexOf(closeTagName, openTagIndex);

      if (closeTagIndex === -1) {
        // Нет закрывающего тега, добавляем как обычный текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Извлекаем содержимое тега
      const tagContent = text.slice(openTagIndex + openTagLength, closeTagIndex);
      parts.push({ type: tagType, content: tagContent });

      currentIndex = closeTagIndex + closeTagLength;
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
                  {parseJSXInText(line).map((part, partIndex) =>
                    part.type === "code" ? (
                      <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                    ) : part.type === "warning" ? (
                      <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                    ) : (
                      <span key={partIndex}>{part.content}</span>
                    )
                  )}
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
                    {parseJSXInText(line).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
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
                  {currentStepData.codeFiles[activeCodeTab].split("\n").map((line, lineIndex) => (
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
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
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
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
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
                    {parseJSXInText(item).map((part, partIndex) =>
                      part.type === "code" ? (
                        <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                      ) : part.type === "warning" ? (
                        <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                      ) : (
                        <span key={partIndex}>{part.content}</span>
                      )
                    )}
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
          <div className="text-yellow-800 text-lg">
            {parseJSXInText(currentStepData.motivation).map((part, partIndex) =>
              part.type === "code" ? (
                <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
              ) : part.type === "warning" ? (
                <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
              ) : (
                <span key={partIndex}>{part.content}</span>
              )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ExpressLesson1;
