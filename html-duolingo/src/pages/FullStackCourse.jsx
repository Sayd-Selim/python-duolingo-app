import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

const FullStackCourse = () => {
  const { user } = useAuth();
  const { updateProgress } = useProgress();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Структура курса Full-Stack Development с метафорой отеля
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

  useEffect(() => {
    // В демо режиме загружаем прогресс из localStorage
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    
    if (isDemoMode) {
      const savedProgress = localStorage.getItem('fullStackProgress');
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
      localStorage.setItem('fullStackProgress', JSON.stringify(newCompleted));
    } else {
      // Реальный режим - сохраняем через API
      updateProgress('fullStack', lessonId);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const isLevelUnlocked = (levelId) => {
    if (levelId === 1) return true;
    
    // Проверяем, завершен ли предыдущий уровень
    const previousLevel = fullStackCourse.levels.find(l => l.id === levelId - 1);
    if (!previousLevel) return false;
    
    return previousLevel.lessons.every(lesson => isLessonCompleted(lesson.id));
  };

  const isLessonLocked = (lessonId, levelId) => {
    if (!isLevelUnlocked(levelId)) return true;
    
    // В рамках уровня уроки открываются последовательно
    const level = fullStackCourse.levels.find(l => l.id === levelId);
    const lessonIndex = level.lessons.findIndex(l => l.id === lessonId);
    
    if (lessonIndex === 0) return false;
    
    return !isLessonCompleted(level.lessons[lessonIndex - 1].id);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedLevel.lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isLessonCompleted(lesson.id)
                    ? 'border-green-500 shadow-green-100'
                    : isLessonLocked(lesson.id, selectedLevel.id)
                    ? 'border-gray-200 opacity-60'
                    : 'border-purple-200 hover:border-purple-400 hover:shadow-xl'
                }`}
              >
                {/* Lock Icon */}
                {isLessonLocked(lesson.id, selectedLevel.id) && (
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
                  <div className="flex items-start mb-4">
                    <div className="text-3xl mr-4 mt-1">🏨</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        Урок {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                      
                      {/* Metaphor */}
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <h4 className="font-semibold text-blue-800 mb-1">🏨 Метафора отеля:</h4>
                        <p className="text-sm text-blue-700">{lesson.metaphor}</p>
                      </div>

                      {/* Code Examples */}
                      {lesson.codeFrontend && (
                        <div className="bg-green-50 rounded-lg p-3 mb-3">
                          <h4 className="font-semibold text-green-800 mb-1">💻 Frontend код:</h4>
                          <pre className="text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto">{lesson.codeFrontend}</pre>
                        </div>
                      )}

                      {lesson.codeBackend && (
                        <div className="bg-orange-50 rounded-lg p-3 mb-3">
                          <h4 className="font-semibold text-orange-800 mb-1">⚙️ Backend код:</h4>
                          <pre className="text-xs text-orange-700 bg-orange-100 p-2 rounded overflow-x-auto">{lesson.codeBackend}</pre>
                        </div>
                      )}

                      {/* Practice Task */}
                      <div className="bg-purple-50 rounded-lg p-3">
                        <h4 className="font-semibold text-purple-800 mb-1">🎯 Практическое задание:</h4>
                        <p className="text-sm text-purple-700">{lesson.practiceTask}</p>
                      </div>
                    </div>
                  </div>

                  {isLessonLocked(lesson.id, selectedLevel.id) ? (
                    <button
                      disabled
                      className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                    >
                      🔒 Заблокировано
                    </button>
                  ) : (
                    <Link
                      to={`/fullstack-course/level/${selectedLevel.id}/lesson/${lesson.id}`}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-200 ${
                        isLessonCompleted(lesson.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : `bg-gradient-to-r ${selectedLevel.color} text-white hover:opacity-90`
                      }`}
                    >
                      {isLessonCompleted(lesson.id) ? '✅ Повторить' : '🚀 Начать урок'}
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

  // Показываем выбор уровня
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${fullStackCourse.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">{fullStackCourse.icon}</div>
            <h1 className="text-5xl font-bold mb-4">{fullStackCourse.name}</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">{fullStackCourse.description}</p>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🏨 О курсе "Отель Full-Stack"</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">🎯 Что вы изучите:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• HTTP запросы и методы (как клиент отеля)</li>
                <li>• Создание сервера Express.js (как рецепция)</li>
                <li>• Работа с MongoDB (как база данных отеля)</li>
                <li>• Полный цикл разработки веб-приложения</li>
                <li>• Безопасность и валидация данных</li>
                <li>• Практические проекты на каждом этапе</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">📊 Статистика курса:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-blue-600 font-medium">Уровней:</span> 3
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <span className="text-green-600 font-medium">Уроков:</span> 15
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <span className="text-purple-600 font-medium">Проектов:</span> 15
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <span className="text-orange-600 font-medium">Уровень:</span> От базового до продвинутого
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fullStackCourse.levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                isLevelUnlocked(level.id)
                  ? 'border-purple-200 hover:border-purple-400 hover:shadow-xl cursor-pointer'
                  : 'border-gray-200 opacity-60'
              }`}
              onClick={() => isLevelUnlocked(level.id) && handleLevelSelect(level)}
            >
              {/* Lock Icon for locked levels */}
              {!isLevelUnlocked(level.id) && (
                <div className="absolute top-4 right-4 text-gray-400">
                  <span className="text-2xl">🔒</span>
                </div>
              )}

              {/* Level Header */}
              <div className={`bg-gradient-to-r ${level.color} p-6 text-white text-center rounded-t-xl`}>
                <div className="text-4xl mb-3">🏨</div>
                <h3 className="text-xl font-bold mb-2">{level.name}</h3>
                <p className="text-sm opacity-90">{level.description}</p>
              </div>

              {/* Level Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Уроки в этом уровне:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {level.lessons.slice(0, 3).map((lesson, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className={`w-2 h-2 bg-gradient-to-r ${level.color} rounded-full mr-3`}></span>
                        {lesson.title}
                      </li>
                    ))}
                    {level.lessons.length > 3 && (
                      <li className="text-purple-600 font-medium">... и ещё {level.lessons.length - 3} уроков</li>
                    )}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Прогресс:</span>
                    <span>{level.lessons.filter(l => isLessonCompleted(l.id)).length}/{level.lessons.length}</span>
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

                {isLevelUnlocked(level.id) ? (
                  <button
                    className={`w-full py-3 bg-gradient-to-r ${level.color} hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200`}
                  >
                    🚀 Изучить уровень
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                  >
                    🔒 Заблокировано
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullStackCourse; 