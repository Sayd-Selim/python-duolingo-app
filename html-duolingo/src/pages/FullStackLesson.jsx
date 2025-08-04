import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';

const FullStackLesson = () => {
  const { levelId, lessonId } = useParams();
  const { user } = useAuth();
  const { updateProgress } = useProgress();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Структура курса (та же, что и в FullStackCourse.jsx)
  const fullStackCourse = {
    levels: [
      {
        id: 1,
        name: '🔰 Уровень 1: Базовые запросы с Axios',
        color: 'from-green-500 to-emerald-600',
        lessons: [
          {
            id: '1.1',
            title: 'Что такое HTTP и методы',
            description: 'Понятие HTTP, GET/POST/PUT/DELETE как действия в отеле',
            metaphor: 'Клиент приходит в отель и может: посмотреть информацию (GET), забронировать номер (POST), изменить бронь (PUT), отменить бронь (DELETE)',
            theory: [
              {
                title: 'HTTP - протокол передачи данных',
                content: 'HTTP (HyperText Transfer Protocol) - это протокол для передачи данных между клиентом и сервером. Представьте, что это как язык общения между клиентом отеля и рецепцией.',
                code: null
              },
              {
                title: 'HTTP методы',
                content: 'GET - получить информацию (как спросить "какие номера свободны?")\nPOST - создать новую запись (как заполнить анкету для бронирования)\nPUT - обновить существующую запись (как изменить дату заезда)\nDELETE - удалить запись (как отменить бронь)',
                code: '// Примеры HTTP методов\nGET /api/rooms - получить список номеров\nPOST /api/bookings - создать бронь\nPUT /api/bookings/123 - обновить бронь\nDELETE /api/bookings/123 - отменить бронь'
              }
            ],
            practice: {
              task: 'Создайте кнопку "Показать номера" и отобразите список доступных номеров',
              initialCode: 'import React, { useState } from "react";\nimport axios from "axios";\n\nfunction HotelRooms() {\n  const [rooms, setRooms] = useState([]);\n  \n  // Ваш код здесь\n  \n  return (\n    <div>\n      <button>Показать номера</button>\n      <div>\n        {/* Список номеров */}\n      </div>\n    </div>\n  );\n}',
              solution: 'const fetchRooms = async () => {\n  try {\n    const response = await axios.get("/api/rooms");\n    setRooms(response.data);\n  } catch (error) {\n    console.error("Ошибка:", error);\n  }\n};\n\n// В JSX:\n{rooms.map(room => (\n  <div key={room.id}>\n    <h3>Номер {room.number}</h3>\n    <p>Цена: {room.price} руб/ночь</p>\n  </div>\n))}'
            }
          },
          {
            id: '1.2',
            title: 'Первый GET запрос',
            description: 'Отправляем запрос на получение данных',
            metaphor: 'Клиент спрашивает у рецепции: "Какие номера у вас есть?"',
            theory: [
              {
                title: 'Axios - HTTP клиент',
                content: 'Axios - это библиотека для выполнения HTTP запросов. Она упрощает работу с API и автоматически обрабатывает JSON данные.',
                code: 'import axios from "axios";\n\n// Базовый GET запрос\nconst response = await axios.get("/api/rooms");\nconsole.log(response.data);'
              },
              {
                title: 'Обработка ответа',
                content: 'Axios автоматически парсит JSON ответ и помещает данные в response.data. Также важно обрабатывать ошибки.',
                code: 'try {\n  const response = await axios.get("/api/rooms");\n  setRooms(response.data);\n} catch (error) {\n  console.error("Ошибка загрузки:", error.message);\n}'
              }
            ],
            practice: {
              task: 'Создайте компонент, который загружает и отображает список гостей отеля',
              initialCode: 'import React, { useState, useEffect } from "react";\nimport axios from "axios";\n\nfunction GuestList() {\n  const [guests, setGuests] = useState([]);\n  const [loading, setLoading] = useState(false);\n  \n  // Ваш код здесь\n  \n  return (\n    <div>\n      <h2>Список гостей</h2>\n      {loading && <p>Загрузка...</p>}\n      <div>\n        {/* Список гостей */}\n      </div>\n    </div>\n  );\n}',
              solution: 'useEffect(() => {\n  const fetchGuests = async () => {\n    setLoading(true);\n    try {\n      const response = await axios.get("/api/guests");\n      setGuests(response.data);\n    } catch (error) {\n      console.error("Ошибка:", error);\n    } finally {\n      setLoading(false);\n    }\n  };\n  \n  fetchGuests();\n}, []);\n\n// В JSX:\n{guests.map(guest => (\n  <div key={guest.id}>\n    <h3>{guest.name}</h3>\n    <p>Номер: {guest.roomNumber}</p>\n  </div>\n))}'
            }
          }
          // Добавьте остальные уроки здесь
        ]
      }
      // Добавьте остальные уровни здесь
    ]
  };

  // Находим текущий урок
  const currentLevel = fullStackCourse.levels.find(l => l.id === parseInt(levelId));
  const currentLesson = currentLevel?.lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (!currentLesson) {
      navigate('/fullstack-course');
      return;
    }

    // Проверяем, завершен ли урок
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    if (isDemoMode) {
      const savedProgress = localStorage.getItem('fullStackProgress');
      if (savedProgress) {
        const completed = JSON.parse(savedProgress);
        setIsCompleted(completed.includes(lessonId));
      }
    }
  }, [lessonId, levelId, user, navigate, currentLesson]);

  const handleComplete = () => {
    const isDemoMode = !user || (user && user.userId === "demo_user_123");
    
    if (isDemoMode) {
      const savedProgress = localStorage.getItem('fullStackProgress') || '[]';
      const completed = JSON.parse(savedProgress);
      if (!completed.includes(lessonId)) {
        const newCompleted = [...completed, lessonId];
        localStorage.setItem('fullStackProgress', JSON.stringify(newCompleted));
      }
    } else {
      updateProgress('fullStack', lessonId);
    }
    
    setIsCompleted(true);
  };

  const handleNextLesson = () => {
    const currentIndex = currentLevel.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < currentLevel.lessons.length - 1) {
      const nextLesson = currentLevel.lessons[currentIndex + 1];
      navigate(`/fullstack-course/level/${levelId}/lesson/${nextLesson.id}`);
    } else {
      // Переходим к следующему уровню или завершаем курс
      navigate('/fullstack-course');
    }
  };

  if (!currentLesson) {
    return <div>Урок не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${currentLevel.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate('/fullstack-course')}
                className="text-white/80 hover:text-white transition-colors mb-2"
              >
                ← Назад к курсу
              </button>
              <h1 className="text-3xl font-bold mb-2">
                Урок {lessonId}: {currentLesson.title}
              </h1>
              <p className="text-white/80">{currentLesson.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">🏨</div>
              <div className="text-sm text-white/80">Уровень {levelId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            {['Теория', 'Метафора', 'Практика', 'Завершение'].map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 hidden sm:inline">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Теория</h2>
              {currentLesson.theory?.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-4 whitespace-pre-line">
                    {section.content}
                  </p>
                  {section.code && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">💻 Пример кода:</h4>
                      <pre className="text-sm text-gray-700 bg-gray-100 p-3 rounded overflow-x-auto">
                        {section.code}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Далее: Метафора отеля →
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏨 Метафора отеля</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-4xl mb-4">🏨</div>
              <p className="text-lg text-blue-800 leading-relaxed">
                {currentLesson.metaphor}
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ← Назад
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Далее: Практика →
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Практическое задание</h2>
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-800 mb-2">Задание:</h3>
                <p className="text-purple-700">{currentLesson.practice?.task}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Ваш код:</h3>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder={currentLesson.practice?.initialCode}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {showSolution ? 'Скрыть' : 'Показать'} решение
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  ← Назад
                </button>
              </div>

              {showSolution && (
                <div className="mt-6 bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-3">✅ Решение:</h3>
                  <pre className="text-sm text-green-700 bg-green-100 p-4 rounded overflow-x-auto">
                    {currentLesson.practice?.solution}
                  </pre>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Готовы к следующему шагу?</h3>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Завершить урок →
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Поздравляем! Урок завершен
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Вы успешно изучили: <strong>{currentLesson.title}</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-2">✅ Что вы изучили:</h3>
                <ul className="text-green-700 text-left space-y-1">
                  {currentLesson.theory?.map((section, index) => (
                    <li key={index}>• {section.title}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Практические навыки:</h3>
                <p className="text-blue-700">{currentLesson.practice?.task}</p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!isCompleted && (
                <button
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
                >
                  ✅ Отметить как завершенный
                </button>
              )}
              <button
                onClick={handleNextLesson}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
              >
                {isCompleted ? 'Следующий урок →' : 'Продолжить →'}
              </button>
            </div>

            {isCompleted && (
              <div className="mt-6 bg-green-100 rounded-lg p-4">
                <p className="text-green-800 font-medium">✅ Урок отмечен как завершенный!</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FullStackLesson; 