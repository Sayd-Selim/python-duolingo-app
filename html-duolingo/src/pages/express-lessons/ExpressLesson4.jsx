import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLessonProgress } from "../../hooks/useLessonProgress";
import CodeHighlight from "../../components/CodeHighlight";
import WarningHighlight from "../../components/WarningHighlight";
import ReminderBlock from "../../components/ReminderBlock";

function ExpressLesson2() {
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
  const [activeCodeTab, setActiveCodeTab] = useState("app.js");
  const navigate = useNavigate();

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
    useLessonProgress(4); // ID для урока 2

  // Мемоизируем шаги урока
  const steps = useMemo(
    () => [
      {
        type: "intro",
        title: "Урок 2: Роутинг Система роутов 🛣️",
        content:
          "Теперь, когда мы понимаем основы HTTP-серверов, давайте изучим систему роутинга — сердце любого веб-приложения!\n\nРоутинг — это система, которая определяет, как приложение отвечает на запросы клиентов к определённым конечным точкам (endpoints).\n\n🏗️ Метафора: Роутинг — это как система навигации в большом здании. Каждый URL — это адрес комнаты, а роут — это инструкция, как добраться до этой комнаты и что там делать.\n\n🎯 Цель: Научиться создавать и управлять роутами в Express.js, понимать различные типы маршрутов и их применение.",
        motivation: "Роутинг — это основа любого веб-приложения! Без него невозможно создать современный сайт или API.",
      },

      {
        type: "theory",
        title: "Что такое роутинг и зачем он нужен?",
        content:
          "Роутинг — это процесс определения того, как приложение отвечает на запросы клиентов к определённым URL-адресам.\n\nКогда пользователь заходит на сайт, браузер отправляет HTTP-запрос на определённый URL. Роутинг определяет, какая функция должна обработать этот запрос.\n\nОсновные концепции роутинга:\n• <CodeHighlight>Маршрут (Route)</CodeHighlight> — это комбинация HTTP-метода и URL-пути\n• <CodeHighlight>Обработчик (Handler)</CodeHighlight> — функция, которая выполняется при совпадении маршрута\n• <CodeHighlight>Параметры</CodeHighlight> — динамические части URL, которые могут меняться",
        metaphor: [
          "🏗️ Метафора:",
          "Представь, что твоё приложение — это большой офисный центр с множеством комнат.",
          "Каждый URL — это адрес конкретной комнаты (например, /users — комната пользователей, /products — комната товаров).",
          "Роутинг — это система указателей и инструкций, которая говорит: «Если кто-то идёт в комнату /users, покажи ему список пользователей».",
          "Без роутинга все посетители попадали бы в одну и ту же комнату, независимо от того, куда они хотят попасть!",
        ],
        code: `// Базовый роутинг в Express.js

const express = require('express');
const app = express();

// Простой роут для главной страницы
app.get('/', (req, res) => {
  res.send('Добро пожаловать на главную страницу!');
});

// Роут для страницы пользователей
app.get('/users', (req, res) => {
  res.send('Список пользователей');
});

// Роут для конкретного пользователя
app.get('/users/:id', (req, res) => {
  res.send(\`Пользователь с ID: \${req.params.id}\`);
});

app.listen(3000);`,
        explanation:
          "Роутинг в Express.js работает по принципу сопоставления паттернов. Когда приходит запрос, Express.js проверяет все зарегистрированные маршруты и выполняет первый подходящий обработчик.\n\nМаршруты проверяются в том порядке, в котором они были зарегистрированы. Поэтому важно размещать более специфичные маршруты перед более общими.",
        examples: [
          "Базовые типы роутов:",
          "1. Статические роуты:",
          "Маршруты с фиксированным URL-путём.",
          `app.get('/about', (req, res) => {
  res.send('О нас');
});`,
          "2. Динамические роуты:",
          "Маршруты с параметрами, которые могут меняться.",
          `app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(\`Пользователь \${userId}\`);
});`,
          "3. Роуты с несколькими параметрами:",
          "Маршруты с множественными динамическими частями.",
          `app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(\`Пост \${postId} пользователя \${userId}\`);
});`,
        ],
        whatWeLearned: [
          "Роутинг — это система определения обработчиков для URL-запросов",
          "Каждый роут состоит из HTTP-метода (GET, POST, PUT, DELETE) и URL-пути",
          "Express.js проверяет маршруты в порядке их регистрации",
          "Статические роуты имеют фиксированный URL",
          "Динамические роуты используют параметры (например, :id)",
          "Параметры доступны через req.params",
        ],
      },

      {
        type: "code",
        title: "Создаём базовую структуру роутинга",
        content:
          "Давайте создадим простое приложение с базовой системой роутинга. Мы создадим несколько маршрутов для демонстрации различных концепций.\n\nСначала создадим основную структуру приложения с несколькими роутами для разных типов контента.",
        code: `const express = require('express');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Главная страница
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в наше API!',
    endpoints: [
      'GET /users - получить всех пользователей',
      'GET /users/:id - получить пользователя по ID',
      'POST /users - создать нового пользователя',
      'GET /products - получить все товары'
    ]
  });
});

// Роуты для пользователей
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Анна', email: 'anna@example.com' },
    { id: 2, name: 'Борис', email: 'boris@example.com' },
    { id: 3, name: 'Виктория', email: 'victoria@example.com' }
  ];
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = [
    { id: 1, name: 'Анна', email: 'anna@example.com' },
    { id: 2, name: 'Борис', email: 'boris@example.com' },
    { id: 3, name: 'Виктория', email: 'victoria@example.com' }
  ];
  
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Пользователь не найден' });
  }
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Имя и email обязательны' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  res.status(201).json(newUser);
});

// Роуты для товаров
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Смартфон', price: 25000 },
    { id: 3, name: 'Наушники', price: 5000 }
  ];
  res.json(products);
});

// Обработка 404 ошибок
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Сервер запущен на порту \${PORT}\`);
});`,
        metaphor: [
          "🏗️ Метафора:",
          "Мы создаём карту офисного центра с указателями на каждую комнату.",
          "Каждый роут — это указатель, который говорит: «Если идёшь сюда, то делай это».",
          "Главная страница (/) — это ресепшн, где посетители получают карту здания.",
          "Комнаты /users и /products — это отделы с разной информацией.",
        ],
        explanation:
          "В этом коде мы создали базовую структуру роутинга с несколькими типами маршрутов:\n\n1. <CodeHighlight>GET /</CodeHighlight> — главная страница с информацией о доступных endpoints\n2. <CodeHighlight>GET /users</CodeHighlight> — получение списка всех пользователей\n3. <CodeHighlight>GET /users/:id</CodeHighlight> — получение конкретного пользователя по ID\n4. <CodeHighlight>POST /users</CodeHighlight> — создание нового пользователя\n5. <CodeHighlight>GET /products</CodeHighlight> — получение списка товаров\n6. <CodeHighlight>app.use('*')</CodeHighlight> — обработка всех несуществующих маршрутов (404 ошибка)",
        whatWeLearned: [
          "Как создавать базовые GET и POST роуты",
          "Как использовать параметры в URL (:id)",
          "Как обрабатывать данные из тела запроса (req.body)",
          "Как возвращать JSON ответы",
          "Как устанавливать HTTP статус коды",
          "Как обрабатывать ошибки 404",
        ],
      },

      {
        type: "practice",
        title: "Практика: Добавь недостающие роуты",
        content:
          "Теперь твоя очередь! Добавь недостающие роуты в наш API. Нам нужно добавить возможность обновления и удаления пользователей.\n\nЗадача: Дополни код, добавив роуты для:\n1. <CodeHighlight>PUT /users/:id</CodeHighlight> — обновление пользователя\n2. <CodeHighlight>DELETE /users/:id</CodeHighlight> — удаление пользователя\n3. <CodeHighlight>GET /products/:id</CodeHighlight> — получение конкретного товара",
        code: `const express = require('express');
const app = express();

app.use(express.json());

// Существующие роуты...
app.get('/', (req, res) => {
  res.json({ message: 'API работает!' });
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Анна', email: 'anna@example.com' },
    { id: 2, name: 'Борис', email: 'boris@example.com' }
  ]);
});

// TODO: Добавь недостающие роуты здесь
// 1. PUT /users/:id - обновление пользователя
// 2. DELETE /users/:id - удаление пользователя  
// 3. GET /products/:id - получение товара по ID

app.listen(3000);`,
        correctAnswer: `// 1. PUT /users/:id - обновление пользователя
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Имя и email обязательны' });
  }
  
  // Здесь должна быть логика обновления в базе данных
  const updatedUser = { id: userId, name, email };
  res.json(updatedUser);
});

// 2. DELETE /users/:id - удаление пользователя
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // Здесь должна быть логика удаления из базы данных
  res.status(204).send();
});

// 3. GET /products/:id - получение товара по ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Ноутбук', price: 50000 },
    { id: 2, name: 'Смартфон', price: 25000 }
  ];
  
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});`,
        hint: "Вспомни, что:\n- PUT используется для обновления ресурсов\n- DELETE используется для удаления ресурсов\n- Для получения параметров используй req.params.id\n- Для получения данных из тела запроса используй req.body\n- Статус 204 означает 'No Content' (успешное удаление)",
        whatWeLearned: [
          "PUT роуты используются для обновления существующих ресурсов",
          "DELETE роуты используются для удаления ресурсов",
          "Статус 204 (No Content) используется при успешном удалении",
          "Параметры из URL доступны через req.params",
          "Данные из тела запроса доступны через req.body",
        ],
      },

      {
        type: "theory",
        title: "Продвинутые техники роутинга",
        content:
          "Теперь изучим более продвинутые техники роутинга, которые помогут создавать более сложные и гибкие приложения.\n\nМы рассмотрим:\n• <CodeHighlight>Router</CodeHighlight> — модульную организацию роутов\n• <CodeHighlight>Middleware</CodeHighlight> — промежуточную обработку запросов\n• <CodeHighlight>Query параметры</CodeHighlight> — фильтрацию и поиск\n• <CodeHighlight>Вложенные роуты</CodeHighlight> — иерархическую структуру",
        metaphor: [
          "🏗️ Метафора:",
          "Представь, что твоё приложение выросло и теперь это не просто офис, а целый бизнес-центр с несколькими зданиями.",
          "Router — это как отдельное здание с собственными указателями и правилами.",
          "Middleware — это как система безопасности, которая проверяет каждого посетителя перед входом в здание.",
          "Query параметры — это как фильтры в поисковой системе, которые помогают найти нужную информацию.",
        ],
        code: `// Модульная организация роутов с Router

const express = require('express');
const app = express();

// Создаём отдельные роутеры
const userRouter = express.Router();
const productRouter = express.Router();

// Middleware для логирования
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
  next();
});

// Middleware для проверки авторизации
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }
  
  // Здесь должна быть проверка токена
  req.user = { id: 1, name: 'Пользователь' };
  next();
};

// Роуты для пользователей
userRouter.get('/', (req, res) => {
  // Получение query параметров
  const { page = 1, limit = 10, search } = req.query;
  
  let users = [
    { id: 1, name: 'Анна', email: 'anna@example.com' },
    { id: 2, name: 'Борис', email: 'boris@example.com' },
    { id: 3, name: 'Виктория', email: 'victoria@example.com' }
  ];
  
  // Фильтрация по поиску
  if (search) {
    users = users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Пагинация
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.json({
    users: paginatedUsers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: users.length,
      pages: Math.ceil(users.length / limit)
    }
  });
});

// Вложенные роуты
userRouter.get('/:id/posts', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json([
    { id: 1, title: 'Мой первый пост', userId },
    { id: 2, title: 'Второй пост', userId }
  ]);
});

userRouter.get('/:id/posts/:postId', (req, res) => {
  const { id: userId, postId } = req.params;
  res.json({
    id: parseInt(postId),
    title: 'Конкретный пост',
    userId: parseInt(userId)
  });
});

// Роуты для товаров с авторизацией
productRouter.use(authMiddleware); // Применяем middleware ко всем роутам товаров

productRouter.get('/', (req, res) => {
  const { category, minPrice, maxPrice } = req.query;
  
  let products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'electronics' },
    { id: 2, name: 'Смартфон', price: 25000, category: 'electronics' },
    { id: 3, name: 'Книга', price: 500, category: 'books' }
  ];
  
  // Фильтрация по категории
  if (category) {
    products = products.filter(p => p.category === category);
  }
  
  // Фильтрация по цене
  if (minPrice) {
    products = products.filter(p => p.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    products = products.filter(p => p.price <= parseInt(maxPrice));
  }
  
  res.json(products);
});

// Подключаем роутеры к основному приложению
app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(3000);`,
        explanation:
          "В этом примере мы показали несколько продвинутых техник:\n\n1. <CodeHighlight>Router</CodeHighlight> — позволяет организовать роуты в модули\n2. <CodeHighlight>Middleware</CodeHighlight> — функции, которые выполняются перед обработчиками\n3. <CodeHighlight>Query параметры</CodeHighlight> — доступны через req.query для фильтрации\n4. <CodeHighlight>Вложенные роуты</CodeHighlight> — создают иерархическую структуру URL\n5. <CodeHighlight>Пагинация</CodeHighlight> — разбиение больших списков на страницы",
        whatWeLearned: [
          "Router позволяет модульно организовывать роуты",
          "Middleware выполняются перед обработчиками роутов",
          "Query параметры доступны через req.query",
          "Вложенные роуты создают иерархическую структуру URL",
          "Пагинация помогает обрабатывать большие списки данных",
          "Фильтрация данных через query параметры",
        ],
      },

      {
        type: "recap",
        title: "🎉 Готово! Система роутинга Express.js освоена!",
        content:
          "Поздравляем! Ты успешно изучил систему роутинга Express.js. Теперь ты умеешь создавать маршруты, обрабатывать различные типы запросов и организовывать структуру приложения.\n\n<WarningHighlight>Что мы изучили:</WarningHighlight>\n• Основы роутинга и его назначение\n• Создание GET, POST, PUT, DELETE маршрутов\n• Работу с параметрами URL и тела запроса\n• Модульную организацию с Router\n• Middleware для промежуточной обработки\n• Query параметры для фильтрации\n• Вложенные роуты для сложных структур\n\n<WarningHighlight>Следующий урок:</WarningHighlight> Урок 3: Middleware и промежуточная обработка",
        metaphor: [
          "🏗️ Метафора:",
          "Ты построил полноценную систему навигации для своего веб-приложения!",
          "Теперь у тебя есть карта с указателями, система безопасности, фильтры для поиска и модульная архитектура.",
          "Твоё приложение может принимать посетителей в любую комнату и правильно их обслуживать.",
        ],
        motivation: "Роутинг — это основа любого веб-приложения. Теперь ты можешь создавать сложные API и веб-сайты!",
        whatWeLearned: [
          "Роутинг определяет, как приложение отвечает на запросы к определённым URL",
          "Express.js предоставляет простой и мощный API для создания маршрутов",
          "GET, POST, PUT, DELETE — основные HTTP методы для работы с ресурсами",
          "Параметры URL (:id) позволяют создавать динамические маршруты",
          "req.params содержит параметры из URL",
          "req.body содержит данные из тела запроса",
          "req.query содержит query параметры для фильтрации",
          "Router позволяет модульно организовывать роуты",
          "Middleware выполняет промежуточную обработку запросов",
          "Вложенные роуты создают иерархическую структуру URL",
          "Пагинация помогает обрабатывать большие списки данных",
          "Обработка ошибок важна для создания надёжных API",
        ],
        whatNext: "В следующем уроке мы изучим Middleware — мощный инструмент для промежуточной обработки запросов, аутентификации, логирования и многого другого!",
        reminders: [
          "Напоминание из курса:",
          "Express.js — это фреймворк, который упрощает работу с HTTP-сервером Node.js",
          "Роутинг — это сердце любого веб-приложения",
          "Правильная организация кода делает приложение более поддерживаемым",
        ],
        summary: [
          "🎯 <WarningHighlight>Краткое резюме урока</WarningHighlight>",
          "",
          "🛣️ <CodeHighlight>Роутинг</CodeHighlight> — это система навигации, которая определяет, как приложение отвечает на запросы к определённым URL.",
          "",
          "📍 <CodeHighlight>Маршрут</CodeHighlight> — это комбинация HTTP-метода (GET, POST, PUT, DELETE) и URL-пути.",
          "",
          "👨‍💼 <CodeHighlight>Обработчик</CodeHighlight> — это функция, которая выполняется при совпадении маршрута.",
          "",
          "🔧 <CodeHighlight>Router</CodeHighlight> — это модуль для организации связанных маршрутов в отдельные файлы.",
          "",
          "🛡️ <CodeHighlight>Middleware</CodeHighlight> — это функции, которые выполняются перед обработчиками для промежуточной обработки.",
          "",
          "🔍 <CodeHighlight>Query параметры</CodeHighlight> — это фильтры в URL (?page=1&search=test) для поиска и фильтрации данных.",
          "",
          "📁 <CodeHighlight>Вложенные роуты</CodeHighlight> — это иерархическая структура URL (/users/1/posts/2) для сложных ресурсов.",
          "",
          "🎉 <WarningHighlight>Итог</WarningHighlight>: Мы создали полноценную систему навигации для веб-приложения с поддержкой всех основных операций!",
        ],
        codeFiles: {
          "app.js": `const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Базовые роуты
app.get('/', (req, res) => {
  res.json({ message: 'API работает!' });
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Анна', email: 'anna@example.com' },
    { id: 2, name: 'Борис', email: 'boris@example.com' }
  ]);
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  res.json({ id: userId, name: 'Пользователь', email: 'user@example.com' });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: Date.now(), name, email });
});

app.listen(3000);`,
          "routes/users.js": `const express = require('express');
const router = express.Router();

// Middleware для логирования
router.use((req, res, next) => {
  console.log(\`User route: \${req.method} \${req.url}\`);
  next();
});

// Роуты пользователей
router.get('/', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  res.json({ users: [], pagination: { page, limit } });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'Пользователь' });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: Date.now(), name, email });
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  res.json({ id: userId, name, email });
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.status(204).send();
});

module.exports = router;`
        }
      }
    ],
    [currentStep]
  );

  // Отладка изменений isCorrect
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

  const currentStepData = steps[currentStep];

  const saveAnswer = (answer) => {
    saveStepAnswer(currentStep, answer);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      updateCurrentStep(currentStep + 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setIsCorrect(null);
    } else {
      setLessonCompleted(true);
      setShowCongratulations(true);
      completeLesson();
      saveLessonProgress(4); // ID для урока 2
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      updateCurrentStep(currentStep - 1);
      setShowHint(false);
      setShowAnswer(false);
      setUserAnswer("");
      setIsCorrect(null);
    }
  };

  const parseJSXInText = (text) => {
    if (!text) return [];
    const parts = [];
    let currentIndex = 0;
    while (currentIndex < text.length) {
      const codeOpenTagIndex = text.indexOf("<CodeHighlight>", currentIndex);
      const warningOpenTagIndex = text.indexOf("<WarningHighlight>", currentIndex);
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
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }
      if (openTagIndex > currentIndex) {
        parts.push({ type: "text", content: text.slice(currentIndex, openTagIndex) });
      }
      const closeTagName = tagType === "code" ? "</CodeHighlight>" : "</WarningHighlight>";
      const closeTagIndex = text.indexOf(closeTagName, openTagIndex);
      if (closeTagIndex === -1) {
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }
      const tagContent = text.slice(openTagIndex + openTagLength, closeTagIndex);
      parts.push({ type: tagType, content: tagContent });
      currentIndex = closeTagIndex + closeTagLength;
    }
    return parts;
  };

  const normalizeAnswer = (answer) => {
    return answer.toLowerCase().trim().replace(/\s+/g, " ");
  };

  const analyzeCodeErrors = (userCode, correctCode) => {
    const userLines = userCode.split("\n").filter(line => line.trim());
    const correctLines = correctCode.split("\n").filter(line => line.trim());
    
    const errors = [];
    
    // Проверяем наличие основных элементов
    if (!userCode.includes("app.put") && correctCode.includes("app.put")) {
      errors.push("Отсутствует PUT роут для обновления пользователя");
    }
    
    if (!userCode.includes("app.delete") && correctCode.includes("app.delete")) {
      errors.push("Отсутствует DELETE роут для удаления пользователя");
    }
    
    if (!userCode.includes("app.get('/products/:id'") && correctCode.includes("app.get('/products/:id'")) {
      errors.push("Отсутствует GET роут для получения товара по ID");
    }
    
    if (!userCode.includes("req.params.id") && correctCode.includes("req.params.id")) {
      errors.push("Не используется req.params.id для получения ID из URL");
    }
    
    if (!userCode.includes("req.body") && correctCode.includes("req.body")) {
      errors.push("Не используется req.body для получения данных из запроса");
    }
    
    return errors;
  };

  const handleCodeSubmit = () => {
    const userCode = userAnswer;
    const correctCode = currentStepData.correctAnswer;
    
    if (!userCode.trim()) {
      setIsCorrect(false);
      return;
    }
    
    const errors = analyzeCodeErrors(userCode, correctCode);
    
    if (errors.length === 0) {
      setIsCorrect(true);
      saveAnswer(userCode);
    } else {
      setIsCorrect(false);
    }
  };

  const handleTextSubmit = () => {
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(currentStepData.correctAnswer);
    
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setIsCorrect(true);
      saveAnswer(userAnswer);
    } else {
      setIsCorrect(false);
    }
  };

  const handleSubmit = () => {
    if (currentStepData.type === "code") {
      handleCodeSubmit();
    } else {
      handleTextSubmit();
    }
  };

  const handleAdditionalTaskSubmit = (taskIndex) => {
    const task = currentStepData.additionalTasks[taskIndex];
    const userTaskAnswer = additionalTaskAnswers[taskIndex] || "";
    
    if (!userTaskAnswer.trim()) {
      setAdditionalTaskAttempts(prev => ({ ...prev, [taskIndex]: (prev[taskIndex] || 0) + 1 }));
      return;
    }
    
    const normalizedUserAnswer = normalizeAnswer(userTaskAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(task.correctAnswer);
    
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setAdditionalTaskShowAnswer(prev => ({ ...prev, [taskIndex]: true }));
      saveAnswer(userTaskAnswer);
    } else {
      setAdditionalTaskAttempts(prev => ({ ...prev, [taskIndex]: (prev[taskIndex] || 0) + 1 }));
    }
  };

  const handleAdditionalTaskHint = (taskIndex) => {
    setAdditionalTaskHints(prev => ({ ...prev, [taskIndex]: !prev[taskIndex] }));
  };

  const handleAdditionalTaskShowAnswer = (taskIndex) => {
    setAdditionalTaskShowAnswer(prev => ({ ...prev, [taskIndex]: !prev[taskIndex] }));
  };

  const handleQuizSubmit = () => {
    const selectedAnswers = {};
    currentStepData.questions.forEach((question, index) => {
      const answerKey = `question_${index}`;
      selectedAnswers[answerKey] = getStepAnswer(answerKey) || "";
    });
    
    let correctCount = 0;
    currentStepData.questions.forEach((question, index) => {
      const answerKey = `question_${index}`;
      if (selectedAnswers[answerKey] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const isPassed = correctCount >= currentStepData.questions.length * 0.7;
    setIsCorrect(isPassed);
    
    if (isPassed) {
      saveAnswer(JSON.stringify(selectedAnswers));
    }
  };

  const handleQuizAnswerChange = (questionIndex, answer) => {
    const answerKey = `question_${questionIndex}`;
    saveStepAnswer(answerKey, answer);
  };

  const handleCloseCongratulations = () => {
    setShowCongratulations(false);
    navigate("/express-lessons");
  };

  const handleRestartLesson = () => {
    clearLessonProgress();
    updateCurrentStep(0);
    setShowHint(false);
    setShowAnswer(false);
    setUserAnswer("");
    setIsCorrect(null);
    setLessonCompleted(false);
    setShowCongratulations(false);
    setIsLessonPassed(false);
    setAdditionalTaskAnswers({});
    setAdditionalTaskHints({});
    setAdditionalTaskAttempts({});
    setAdditionalTaskShowAnswer({});
  };

  if (showCongratulations) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Поздравляем!</h2>
          <p className="text-gray-600 mb-6">
            Ты успешно завершил урок по роутингу в Express.js!
          </p>
          <div className="space-y-3">
            <button
              onClick={handleCloseCongratulations}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться к урокам
            </button>
            <button
              onClick={handleRestartLesson}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Пройти урок заново
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/express-lessons"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Урок 2: Роутинг</h1>
                <p className="text-sm text-gray-500">Система роутов Express.js</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Шаг {currentStep + 1} из {steps.length}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lesson Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              {/* Step Title */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentStepData.title}
                </h2>
                {currentStepData.type === "intro" && (
                  <div className="text-sm text-gray-500">
                    Введение в тему урока
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="prose prose-lg max-w-none mb-6">
                {currentStepData.content && (
                  <div className="text-gray-700 leading-relaxed">
                    {currentStepData.content.split('\n').map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        {parseJSXInText(paragraph).map((part, partIndex) =>
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
                )}
              </div>

              {/* Metaphor */}
              {currentStepData.metaphor && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🏗️</span>
                    Метафора
                  </h3>
                  <div className="space-y-3">
                    {currentStepData.metaphor.map((item, index) => (
                      <div key={index} className="text-purple-800">
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

              {/* Reminder Block */}
              {currentStepData.reminders && (
                <ReminderBlock reminders={currentStepData.reminders} />
              )}

              {/* Summary Block */}
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

              {/* Code Block */}
              {currentStepData.code && (
                <div className="bg-gray-900 rounded-xl p-6 mb-6 overflow-x-auto">
                  <pre className="text-green-400 text-sm">
                    <code>{currentStepData.code}</code>
                  </pre>
                </div>
              )}

              {/* Tabbed Code Files */}
              {currentStepData.codeFiles && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <div className="flex items-center justify-between mb-4 bg-gray-50 px-6 py-3 border-b">
                    <div className="flex space-x-1">
                      {Object.keys(currentStepData.codeFiles).map((fileName) => (
                        <button
                          key={fileName}
                          onClick={() => setActiveCodeTab(fileName)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeCodeTab === fileName
                              ? "bg-blue-600 text-white"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {fileName}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{currentStepData.codeFiles[activeCodeTab]}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Explanation */}
              {currentStepData.explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    Объяснение
                  </h3>
                  <div className="text-blue-800 leading-relaxed">
                    {currentStepData.explanation.split('\n').map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        {parseJSXInText(paragraph).map((part, partIndex) =>
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

              {/* Examples */}
              {currentStepData.examples && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📚</span>
                    Примеры
                  </h3>
                  <div className="space-y-4">
                    {currentStepData.examples.map((example, index) => (
                      <div key={index} className="text-green-800">
                        {parseJSXInText(example).map((part, partIndex) =>
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

              {/* What We Learned */}
              {currentStepData.whatWeLearned && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🎓</span>
                    Что мы изучили
                  </h3>
                  <ul className="space-y-2">
                    {currentStepData.whatWeLearned.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span className="text-yellow-800">
                          {parseJSXInText(item).map((part, partIndex) =>
                            part.type === "code" ? (
                              <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                            ) : part.type === "warning" ? (
                              <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                            ) : (
                              <span key={partIndex}>{part.content}</span>
                            )
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What Next */}
              {currentStepData.whatNext && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Что дальше
                  </h3>
                  <div className="text-indigo-800 leading-relaxed">
                    {parseJSXInText(currentStepData.whatNext).map((part, partIndex) =>
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

              {/* Motivation */}
              {currentStepData.motivation && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💪</span>
                    Мотивация
                  </h3>
                  <div className="text-green-800 leading-relaxed">
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

            {/* Practice Section */}
            {currentStepData.type === "practice" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💻</span>
                  Практическое задание
                </h3>
                
                <div className="mb-6">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Введите ваш код здесь..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    {showHint ? "Скрыть подсказку" : "Показать подсказку"}
                  </button>
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    {showAnswer ? "Скрыть ответ" : "Показать ответ"}
                  </button>
                </div>

                {showHint && currentStepData.hint && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Подсказка:</h4>
                    <div className="text-yellow-800 whitespace-pre-line">
                      {currentStepData.hint}
                    </div>
                  </div>
                )}

                {showAnswer && currentStepData.correctAnswer && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Правильный ответ:</h4>
                    <pre className="text-green-800 bg-green-100 p-3 rounded font-mono text-sm overflow-x-auto">
                      {currentStepData.correctAnswer}
                    </pre>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Проверить код
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className={`font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? '✅ Правильно!' : '❌ Попробуйте еще раз'}
                    </div>
                    {!isCorrect && (
                      <div className="text-red-700 mt-2">
                        Проверьте, что вы добавили все необходимые роуты и правильно использовали параметры.
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Quiz Section */}
            {currentStepData.type === "quiz" && currentStepData.questions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🧠</span>
                  Проверь свои знания
                </h3>
                
                <div className="space-y-6">
                  {currentStepData.questions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {index + 1}. {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center">
                            <input
                              type="radio"
                              name={`question_${index}`}
                              value={option}
                              checked={getStepAnswer(`question_${index}`) === option}
                              onChange={(e) => handleQuizAnswerChange(index, e.target.value)}
                              className="mr-3"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleQuizSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Проверить ответы
                  </button>
                </div>

                {isCorrect !== null && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className={`font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? '✅ Отлично! Тест пройден!' : '❌ Попробуйте еще раз'}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Additional Practice Section */}
            {currentStepData.type === "additional_practice" && currentStepData.additionalTasks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🔧</span>
                  Дополнительная практика
                </h3>
                
                <div className="space-y-6">
                  {currentStepData.additionalTasks.map((task, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Задание {index + 1}: {task.title}
                      </h4>
                      <p className="text-gray-700 mb-4">{task.description}</p>
                      
                      <textarea
                        value={additionalTaskAnswers[index] || ""}
                        onChange={(e) => setAdditionalTaskAnswers(prev => ({
                          ...prev,
                          [index]: e.target.value
                        }))}
                        placeholder="Введите ваш ответ..."
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                      />
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAdditionalTaskSubmit(index)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Проверить
                        </button>
                        <button
                          onClick={() => handleAdditionalTaskHint(index)}
                          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm"
                        >
                          {additionalTaskHints[index] ? "Скрыть подсказку" : "Подсказка"}
                        </button>
                        <button
                          onClick={() => handleAdditionalTaskShowAnswer(index)}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                          {additionalTaskShowAnswer[index] ? "Скрыть ответ" : "Ответ"}
                        </button>
                      </div>
                      
                      {additionalTaskHints[index] && task.hint && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="text-yellow-800 text-sm">{task.hint}</div>
                        </div>
                      )}
                      
                      {additionalTaskShowAnswer[index] && task.correctAnswer && (
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-green-800 text-sm font-mono">{task.correctAnswer}</div>
                        </div>
                      )}
                      
                      {additionalTaskAttempts[index] > 0 && (
                        <div className="mt-3 text-sm text-gray-600">
                          Попыток: {additionalTaskAttempts[index]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Навигация по уроку</h3>
              
              <div className="space-y-2 mb-6">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => updateCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === index
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  ← Предыдущий шаг
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentStep === steps.length - 1 ? "Завершить урок" : "Следующий шаг →"}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleRestartLesson}
                  className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Начать урок заново
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpressLesson2;
