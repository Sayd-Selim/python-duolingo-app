import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { Link } from 'react-router-dom';

function Courses() {
  const [activeTab, setActiveTab] = useState('python');
  const { isLessonCompleted, isLessonLocked, getLessonProgress, getCourseProgress } = useProgress();

  const pythonUnits = [
    { id: 1, title: 'Введение в Python', path: '/level/1/unit/1' },
    { id: 2, title: 'Переменные. Вывод и ввод данных', path: '/level/1/unit/2' },
    { id: 3, title: 'Типы данных', path: '/level/1/unit/3' },
    { id: 4, title: 'Операторы и выражения', path: '/level/1/unit/4' },
    { id: 5, title: 'Условные операторы', path: '/level/1/unit/5' },
    { id: 6, title: 'Циклы for и while', path: '/level/1/unit/6' },
    { id: 7, title: 'Списки и кортежи', path: '/level/1/unit/7' },
    { id: 8, title: 'Словари и множества', path: '/level/1/unit/8' },
    { id: 9, title: 'Функции', path: '/level/1/unit/9' },
    { id: 10, title: 'Работа с файлами', path: '/level/1/unit/10' },
    { id: 11, title: 'Обработка исключений', path: '/level/1/unit/11' },
    { id: 12, title: 'Модули и пакеты', path: '/level/1/unit/12' },
    { id: 13, title: 'Объектно-ориентированное программирование', path: '/level/1/unit/13' },
    { id: 14, title: 'Работа с библиотеками', path: '/level/1/unit/14' },
    { id: 15, title: 'Практический проект', path: '/level/1/unit/15' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      {/* Заголовок */}
      <h1 className="text-4xl font-bold mb-8 text-center text-green-600">
        Курс Python для начинающих
      </h1>

      {/* Описание курса */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Изучите основы программирования на Python - одном из самых популярных языков программирования. 
          От простых переменных до создания собственных проектов.
        </p>
      </div>

      {/* Список уроков */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pythonUnits.map((unit) => {
          const isCompleted = isLessonCompleted(unit.id);
          const isLocked = isLessonLocked(unit.id);
          const progress = getLessonProgress(unit.id);
          
          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: unit.id * 0.1 }}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow border-l-4 ${
                isCompleted 
                  ? 'border-green-500 hover:shadow-lg' 
                  : isLocked 
                    ? 'border-gray-300 opacity-60' 
                    : 'border-green-500 hover:shadow-lg'
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-semibold ${
                    isCompleted ? 'text-green-600' : isLocked ? 'text-gray-400' : 'text-green-600'
                  }`}>
                    Урок {unit.id}
                  </span>
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <span className="text-green-500 text-lg">✅</span>
                    )}
                    {isLocked && (
                      <span className="text-gray-400 text-lg">🔒</span>
                    )}
                    <span className="text-sm text-gray-500">
                      Python
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${
                  isCompleted ? 'text-gray-800' : isLocked ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {unit.title}
                </h3>
                
                {/* Прогресс бар */}
                {!isLocked && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Прогресс</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {isLocked ? (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500 text-center">
                      🔒 Урок пока недоступен
                    </p>
                  </div>
                ) : (
                  <Link
                    to={unit.path}
                    className={`mt-4 w-full px-4 py-2 rounded-lg transition-colors text-center block ${
                      isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isCompleted ? 'Повторить урок' : 'Начать урок'}
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Прогресс */}
      <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Ваш прогресс
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Python Курс</span>
              <span className="text-green-600">{getCourseProgress(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getCourseProgress(0)}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Завершено уроков: {pythonUnits.filter(unit => isLessonCompleted(unit.id)).length} из {pythonUnits.length}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Courses; 