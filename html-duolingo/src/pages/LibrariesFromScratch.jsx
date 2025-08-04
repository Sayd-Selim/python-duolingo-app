import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

const LibrariesFromScratch = () => {
  const { user } = useAuth();
  const { updateProgress } = useProgress();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Определяем курс Full-Stack Development с метафорой отеля
  const fullStackCourse = {
    id: 'fullstack-hotel',
    name: 'Full-Stack Development с нуля',
    icon: '🏨',
    description: 'Создайте полноценное веб-приложение с метафорой отеля: от клиентских запросов до базы данных',
    color: 'from-blue-500 to-purple-600',
    levels: [
      {
        id: 1,
        name: '🔰 Уровень 1: Базовые запросы с Axios',
        description: 'Изучаем HTTP запросы как клиенты отеля',
        color: 'from-green-500 to-emerald-600',
        lessons: [
          {
            id: '1.1',
            title: 'Что такое HTTP и методы',
            description: 'Понятие HTTP, GET/POST/PUT/DELETE как действия в отеле',
            metaphor: 'Клиент приходит в отель и может: посмотреть информацию (GET), забронировать номер (POST), изменить бронь (PUT), отменить бронь (DELETE)',
            codeFrontend: 'axios.get("/api/rooms")',
            codeBackend: null,
            realResult: 'Получение списка доступных номеров',
            practiceTask: 'Создать кнопку "Показать номера" и отобразить список'
          },
          {
            id: '1.2',
            title: 'Первый GET запрос',
            description: 'Отправляем запрос на получение данных',
            metaphor: 'Клиент спрашивает у рецепции: "Какие номера у вас есть?"',
            codeFrontend: 'const response = await axios.get("/api/rooms");\nsetRooms(response.data);',
            codeBackend: null,
            realResult: 'Отображение списка номеров в интерфейсе',
            practiceTask: 'Создать компонент с кнопкой и списком номеров'
          },
          {
            id: '1.3',
            title: 'POST запрос - создание данных',
            description: 'Отправляем данные на сервер для создания',
            metaphor: 'Клиент заполняет анкету для бронирования номера',
            codeFrontend: 'const response = await axios.post("/api/bookings", {\n  guestName: "Иван",\n  roomNumber: 101,\n  checkIn: "2024-01-15"\n});',
            codeBackend: null,
            realResult: 'Создание новой брони',
            practiceTask: 'Создать форму бронирования с валидацией'
          },
          {
            id: '1.4',
            title: 'PUT запрос - обновление данных',
            description: 'Изменяем существующие данные',
            metaphor: 'Клиент хочет изменить дату заезда в своей брони',
            codeFrontend: 'const response = await axios.put(`/api/bookings/${bookingId}`, {\n  checkIn: "2024-01-20"\n});',
            codeBackend: null,
            realResult: 'Обновление информации о брони',
            practiceTask: 'Создать форму редактирования брони'
          },
          {
            id: '1.5',
            title: 'DELETE запрос - удаление данных',
            description: 'Удаляем данные с сервера',
            metaphor: 'Клиент отменяет свою бронь',
            codeFrontend: 'await axios.delete(`/api/bookings/${bookingId}`);',
            codeBackend: null,
            realResult: 'Удаление брони из системы',
            practiceTask: 'Добавить кнопку "Отменить бронь" с подтверждением'
          }
        ]
      },
      {
        id: 2,
        name: '🛠 Уровень 2: Express.js как сервер',
        description: 'Создаем сервер-рецепцию для обработки запросов',
        color: 'from-orange-500 to-red-600',
        lessons: [
          {
            id: '2.1',
            title: 'Создание Express сервера',
            description: 'Настраиваем сервер для приема запросов',
            metaphor: 'Открываем рецепцию отеля и нанимаем персонал',
            codeFrontend: null,
            codeBackend: 'const express = require("express");\nconst app = express();\napp.listen(3000, () => {\n  console.log("Сервер запущен на порту 3000");\n});',
            realResult: 'Работающий сервер на localhost:3000',
            practiceTask: 'Создать базовый сервер и проверить его работу'
          },
          {
            id: '2.2',
            title: 'Маршруты и методы',
            description: 'Создаем эндпоинты для разных операций',
            metaphor: 'Создаем отделы в отеле: бронирование, информация, администрация',
            codeFrontend: null,
            codeBackend: 'app.get("/api/rooms", (req, res) => {\n  res.json(rooms);\n});\n\napp.post("/api/bookings", (req, res) => {\n  // Логика создания брони\n});',
            realResult: 'API эндпоинты для работы с данными',
            practiceTask: 'Создать все CRUD маршруты для отеля'
          },
          {
            id: '2.3',
            title: 'Middleware - промежуточные функции',
            description: 'Добавляем логирование, проверки, обработку данных',
            metaphor: 'Устанавливаем системы безопасности, логирования, проверки документов',
            codeFrontend: null,
            codeBackend: 'app.use(express.json());\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.path}`);\n  next();\n});',
            realResult: 'Автоматическая обработка JSON и логирование',
            practiceTask: 'Добавить middleware для логирования и валидации'
          },
          {
            id: '2.4',
            title: 'req.body, req.params, req.query',
            description: 'Работаем с разными типами входящих данных',
            metaphor: 'Рецепция получает данные: из формы (body), из URL (params), из адресной строки (query)',
            codeFrontend: null,
            codeBackend: 'app.get("/api/rooms/:id", (req, res) => {\n  const roomId = req.params.id;\n  const room = rooms.find(r => r.id === roomId);\n  res.json(room);\n});',
            realResult: 'Гибкая обработка различных типов запросов',
            practiceTask: 'Создать маршруты с параметрами и query строками'
          },
          {
            id: '2.5',
            title: 'Обработка ошибок',
            description: 'Создаем систему обработки ошибок',
            metaphor: 'Устанавливаем протоколы действий при проблемах: номер занят, клиент не найден',
            codeFrontend: null,
            codeBackend: 'app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: "Что-то пошло не так!" });\n});',
            realResult: 'Корректная обработка ошибок сервера',
            practiceTask: 'Добавить обработку ошибок и валидацию данных'
          }
        ]
      },
      {
        id: 3,
        name: '🧱 Уровень 3: MongoDB и продвинутая логика',
        description: 'Подключаем базу данных и создаем полноценную систему',
        color: 'from-purple-500 to-indigo-600',
        lessons: [
          {
            id: '3.1',
            title: 'Подключение к MongoDB',
            description: 'Настраиваем подключение к базе данных',
            metaphor: 'Подключаемся к центральной базе данных отеля, где хранятся все записи',
            codeFrontend: null,
            codeBackend: 'const mongoose = require("mongoose");\nmongoose.connect("mongodb://localhost:27017/hotel");',
            realResult: 'Активное подключение к MongoDB',
            practiceTask: 'Настроить подключение и проверить соединение'
          },
          {
            id: '3.2',
            title: 'Схемы и модели данных',
            description: 'Создаем структуру данных для отеля',
            metaphor: 'Создаем формы и шаблоны для разных типов записей: гости, номера, брони',
            codeFrontend: null,
            codeBackend: 'const guestSchema = new mongoose.Schema({\n  name: String,\n  email: String,\n  phone: String\n});\nconst Guest = mongoose.model("Guest", guestSchema);',
            realResult: 'Модели данных для работы с базой',
            practiceTask: 'Создать схемы для гостей, номеров и бронирований'
          },
          {
            id: '3.3',
            title: 'CRUD операции с базой данных',
            description: 'Создание, чтение, обновление, удаление записей',
            metaphor: 'Полный цикл работы с гостями: регистрация, поиск, изменение данных, выписка',
            codeFrontend: null,
            codeBackend: '// Создание\nconst guest = new Guest({ name: "Иван", email: "ivan@email.com" });\nawait guest.save();\n\n// Чтение\nconst guests = await Guest.find();',
            realResult: 'Полноценная работа с базой данных',
            practiceTask: 'Реализовать все CRUD операции для гостей'
          },
          {
            id: '3.4',
            title: 'Фильтрация и поиск',
            description: 'Поиск и фильтрация данных в базе',
            metaphor: 'Поиск гостей по имени, номеру, дате заезда - как в картотеке отеля',
            codeFrontend: null,
            codeBackend: 'const guests = await Guest.find({\n  name: { $regex: searchTerm, $options: "i" }\n});',
            realResult: 'Гибкий поиск по базе данных',
            practiceTask: 'Создать поиск гостей с фильтрами'
          },
          {
            id: '3.5',
            title: 'Безопасность и валидация',
            description: 'Добавляем проверки, CORS, аутентификацию',
            metaphor: 'Устанавливаем системы безопасности: проверка документов, охрана, контроль доступа',
            codeFrontend: null,
            codeBackend: 'app.use(cors());\napp.use(helmet());\n// Валидация данных\nconst { body, validationResult } = require("express-validator");',
            realResult: 'Безопасное приложение с валидацией',
            practiceTask: 'Добавить CORS, валидацию и базовую безопасность'
          }
        ]
      }
    ]
  };

  // Определяем библиотеки для изучения
  const libraries = [
    {
      id: 'fullstack-hotel',
      name: 'Full-Stack Development с нуля',
      icon: '🏨',
      description: 'Создайте полноценное веб-приложение с метафорой отеля: от клиентских запросов до базы данных',
      color: 'from-blue-500 to-purple-600',
      levels: [
        {
          id: 1,
          name: '🔰 Легкий уровень',
          description: 'Базовые операции: POST, GET, PUT, DELETE запросы',
          color: 'from-green-500 to-emerald-600',
          lessons: [
            { id: '1.1', title: 'POST запрос - бронирование номера', description: 'Полный цикл: Frontend → Backend → Database' }
          ]
        },
        {
          id: 2,
          name: '🛠 Средний уровень',
          description: 'Валидация, обработка ошибок, middleware',
          color: 'from-orange-500 to-red-600',
          lessons: [
            { id: '2.1', title: 'Валидация данных гостей', description: 'Проверка документов и обработка ошибок' }
          ]
        },
        {
          id: 3,
          name: '🧱 Сложный уровень',
          description: 'Аутентификация, безопасность, оптимизация',
          color: 'from-purple-500 to-indigo-600',
          lessons: [
            { id: '3.1', title: 'Система безопасности отеля', description: 'JWT токены, роли, защита маршрутов' }
          ]
        }
      ]
    },
    {
      id: 'express',
      name: 'Express.js с нуля',
      icon: '🚀',
      description: 'Освойте Express.js — самый популярный фреймворк для Node.js. Пишите серверы легко и красиво!',
      color: 'from-orange-500 to-red-600',
      lessons: [
        { id: 1, title: 'Знакомство с Express.js', description: 'Установка и базовая настройка сервера' },
        { id: 2, title: 'Маршруты: GET, POST и другие', description: 'Создание и обработка маршрутов' },
        { id: 3, title: 'Передача данных: Params, Query, Body', description: 'Как Express обрабатывает входящие данные' },
        { id: 4, title: 'Middleware — основа Express', description: 'Подключение и написание промежуточных функций' },
        { id: 5, title: 'Парсинг тела запроса', description: 'Используем express.json() и express.urlencoded()' },
        { id: 6, title: 'Валидация данных', description: 'Проверка тела запроса с помощью express-validator' },
        { id: 7, title: 'Работа со статикой', description: 'Подключение статических файлов (HTML, CSS, изображения)' },
        { id: 8, title: 'Обработка ошибок', description: 'Создание собственного middleware для ошибок' },
        { id: 9, title: 'Аутентификация и JWT', description: 'Регистрация, вход, токены и защита маршрутов' },
        { id: 10, title: 'Подключение базы данных', description: 'Работа с MongoDB через Mongoose' },
        { id: 11, title: 'Финальный проект: REST API', description: 'Создание полноценного API с пользователями и задачами' }
      ]
    }
  ];

  useEffect(() => {
    // В демо режиме загружаем прогресс из localStorage
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    
    if (isDemoMode) {
      const savedProgress = localStorage.getItem('jsLibrariesProgress');
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      }
    }
  }, [user]);

  const handleLessonComplete = (lessonId) => {
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    
    if (isDemoMode) {
      // Демо режим - сохраняем в localStorage
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem('jsLibrariesProgress', JSON.stringify(newCompleted));
    } else {
      // Реальный режим - сохраняем через API
      updateProgress('jsLibraries', lessonId);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const isLessonLocked = (lessonId) => {
    // В демо режиме (когда нет реального пользователя) доступны первые 3 урока
    // Проверяем, что это демо режим - если пользователь есть, но это демо пользователь
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    
    if (true) {
      return lessonId > 6;
    }
    
    // В реальном режиме проверяем прогресс
    // Урок 1 доступен всегда, остальные после завершения предыдущего
    if (lessonId === 1) return false;
    return !isLessonCompleted(lessonId - 1);
  };

  const handleLibrarySelect = (library) => {
    setSelectedLibrary(library);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleBackToLibraries = () => {
    setSelectedLibrary(null);
    setSelectedLevel(null);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  // Если выбран уровень, показываем его уроки
  if (selectedLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedLevel.color} text-white`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={handleBackToLevels}
                  className="text-white/80 hover:text-white transition-colors mb-2"
                >
                  ← Назад к уровням
                </button>
                <h1 className="text-4xl font-bold">{selectedLevel.name}</h1>
                <p className="text-white/80 mt-2">{selectedLevel.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">🏨</div>
                <div className="text-sm text-white/80">Уровень {selectedLevel.id}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс уровня</span>
              <span className="text-sm text-gray-500">
                {selectedLevel.lessons.filter(l => isLessonCompleted(l.id)).length} из {selectedLevel.lessons.length} уроков
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${selectedLevel.color} h-2 rounded-full transition-all duration-300`}
                style={{
                  width: `${(selectedLevel.lessons.filter(l => isLessonCompleted(l.id)).length / selectedLevel.lessons.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedLevel.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isLessonCompleted(lesson.id)
                    ? 'border-green-500 shadow-green-100'
                    : isLessonLocked(lesson.id)
                    ? 'border-gray-200 opacity-60'
                    : 'border-purple-200 hover:border-purple-400 hover:shadow-xl'
                }`}
              >
                {/* Lock Icon */}
                {isLessonLocked(lesson.id) && (
                  <div className="absolute top-4 right-4 text-gray-400">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}

                {/* Completed Check */}
                {isLessonCompleted(lesson.id) && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <span className="text-2xl">✅</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">🏨</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        Урок {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                  </div>

                  {isLessonLocked(lesson.id) ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      🔒 Заблокировано
                    </button>
                  ) : (
                    <Link
                      to={selectedLibrary.id === 'express' 
                        ? `/library/express/lesson/${lesson.id}`
                        : selectedLibrary.id === 'fullstack-hotel'
                        ? `/fullstack-course/lesson/1`
                        : `/js-libraries-course/${selectedLibrary.id}/lesson/${lesson.id}`
                      }
                      className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 ${
                        isLessonCompleted(lesson.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r ${selectedLevel.color} text-white hover:opacity-90`
                      }`}
                    >
                      {isLessonCompleted(lesson.id) ? '✅ Повторить' : '🚀 Начать'}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Если выбрана библиотека, показываем её уровни или уроки
  if (selectedLibrary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedLibrary.color} text-white`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={handleBackToLibraries}
                  className="text-white/80 hover:text-white transition-colors mb-2"
                >
                  ← Назад к библиотекам
                </button>
                <h1 className="text-4xl font-bold">{selectedLibrary.icon} {selectedLibrary.name}</h1>
                <p className="text-white/80 mt-2">{selectedLibrary.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl mb-2">{selectedLibrary.icon}</div>
                <div className="text-sm text-white/80">Продвинутый уровень</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс курса</span>
              <span className="text-sm text-gray-500">
                {completedLessons?.length} из {selectedLibrary.lessons?.length} уроков
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${selectedLibrary.color} h-2 rounded-full transition-all duration-300`}
                style={{
                  width: `${(completedLessons?.length / selectedLibrary.lessons?.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Levels or Lessons */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedLibrary.id === 'fullstack-hotel' ? (
              // Для Full-Stack курса показываем уровни
              selectedLibrary.levels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-white rounded-xl shadow-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleLevelSelect(level)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">🏨</div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {level.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Уроков:</span>
                        <span>{level.lessons.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${level.color} h-2 rounded-full transition-all duration-300`}
                          style={{
                            width: `${(level.lessons.filter(l => isLessonCompleted(l.id)).length / level.lessons.length) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 bg-gradient-to-r ${level.color} text-white hover:opacity-90`}
                    >
                      🚀 Изучить уровень
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              // Для других курсов показываем уроки
              selectedLibrary.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isLessonCompleted(lesson.id)
                    ? 'border-green-500 shadow-green-100'
                    : isLessonLocked(lesson.id)
                    ? 'border-gray-200 opacity-60'
                    : 'border-purple-200 hover:border-purple-400 hover:shadow-xl'
                }`}
              >
                {/* Lock Icon */}
                {isLessonLocked(lesson.id) && (
                  <div className="absolute top-4 right-4 text-gray-400">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}

                {/* Completed Check */}
                {isLessonCompleted(lesson.id) && (
                  <div className="absolute top-4 right-4 text-green-500">
                    <span className="text-2xl">✅</span>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{selectedLibrary.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        Урок {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                  </div>

                  {isLessonLocked(lesson.id) ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      🔒 Заблокировано
                    </button>
                  ) : (
                    <Link
                      to={selectedLibrary.id === 'express' 
                        ? `/library/express/lesson/${lesson.id}`
                        : selectedLibrary.id === 'fullstack-hotel'
                        ? `/fullstack-course/lesson/1`
                        : `/js-libraries-course/${selectedLibrary.id}/lesson/${lesson.id}`
                      }
                      className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 ${
                        isLessonCompleted(lesson.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r ${selectedLibrary.color} text-white hover:opacity-90`
                      }`}
                    >
                      {isLessonCompleted(lesson.id) ? '✅ Повторить' : '🚀 Начать'}
                    </Link>
                  )}
                </div>
              </motion.div>
            )))}
          </div>
        </div>
      </div>
    );
  }

  // Показываем выбор библиотеки
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      

      {/* Library Selection */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎯 Выберите библиотеку для изучения
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Каждая библиотека содержит 10 уроков, где вы создадите её с нуля, 
            понимая все принципы работы под капотом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {libraries.map((library, index) => (
            <motion.div
              key={library.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleLibrarySelect(library)}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${library.color} p-8 text-white text-center`}>
                <div className="text-6xl mb-4">{library.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{library.name}</h3>
                <p className="text-lg opacity-90">{library.description}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {library.id === 'fullstack-hotel' ? library.levels.length : library.lessons.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      {library.id === 'fullstack-hotel' ? 'Уровней' : 'Уроков'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">10-12</div>
                    <div className="text-sm text-gray-600">Недель</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Что вы создадите:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {library.id === 'fullstack-hotel' ? (
                      // Для Full-Stack курса показываем уровни
                      library.levels.slice(0, 3).map((level, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className={`w-2 h-2 bg-gradient-to-r ${library.color} rounded-full mr-3`}></span>
                          {level.name}
                        </li>
                      ))
                    ) : (
                      // Для других курсов показываем уроки
                      library.lessons.slice(0, 5).map((lesson, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className={`w-2 h-2 bg-gradient-to-r ${library.color} rounded-full mr-3`}></span>
                          {lesson.title}
                        </li>
                      ))
                    )}
                    {library.id === 'fullstack-hotel' ? (
                      library.levels.length > 3 && (
                        <li className="text-purple-600 font-medium">... и ещё {library.levels.length - 3} уровней</li>
                      )
                    ) : (
                      library.lessons.length > 5 && (
                        <li className="text-purple-600 font-medium">... и ещё {library.lessons.length - 5} уроков</li>
                      )
                    )}
                  </ul>
                </div>

                <button
                  className={`w-full py-4 bg-gradient-to-r ${library.color} hover:opacity-90 text-white rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <span>{library.icon} Изучить {library.name}</span>
                  <span className="text-xl">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Course Info
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 О курсе JavaScript библиотеки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">🎯 Что вы изучите:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Архитектуру современных JavaScript библиотек</li>
                <li>• Принципы работы Virtual DOM</li>
                <li>• Системы реактивности</li>
                <li>• State management паттерны</li>
                <li>• Middleware архитектуру</li>
                <li>• Тестирование и документацию</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">👥 Для кого этот курс:</h3>
              <p className="text-gray-600 mb-4">
                Продвинутые JavaScript разработчики, которые хотят понять, как работают популярные библиотеки под капотом.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">📊 Статистика курса:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-purple-600 font-medium">Библиотек:</span> 21
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Уроков:</span> 210
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Уровень:</span> Продвинутый
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">Проектов:</span> 21
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LibrariesFromScratch; 