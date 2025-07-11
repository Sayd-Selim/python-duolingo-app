import React from 'react';
import { motion } from 'framer-motion';

function CSSIntro() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Введение в CSS
        </h1>
        <p className="text-gray-600">
          Урок 1 • CSS Курс
        </p>
      </div>

      {/* Основной контент */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Что такое CSS?
          </h2>
          <p className="text-gray-600 mb-4">
            CSS (Cascading Style Sheets) - это язык стилей, который используется для описания внешнего вида документа, написанного на HTML. CSS позволяет:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Задавать цвета текста и фона</li>
            <li>Управлять размерами и расположением элементов</li>
            <li>Создавать анимации и эффекты</li>
            <li>Адаптировать сайт под разные устройства</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Как подключить CSS?
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-800">
{`<!-- Внутри тега <head> -->
<link rel="stylesheet" href="styles.css">

<!-- Или внутри HTML -->
<style>
  body {
    background-color: #f0f0f0;
  }
</style>`}
            </pre>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Базовый синтаксис
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-800">
{`селектор {
  свойство: значение;
}`}
            </pre>
          </div>
          <p className="text-gray-600 mt-4">
            Например:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mt-2">
            <pre className="text-sm text-gray-800">
{`h1 {
  color: blue;
  font-size: 24px;
}`}
            </pre>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
            Практическое задание
          </h2>
          <p className="text-indigo-600 mb-4">
            Создайте простую HTML страницу и добавьте к ней стили:
          </p>
          <ol className="list-decimal list-inside text-indigo-600 space-y-2">
            <li>Создайте файл index.html с базовой структурой</li>
            <li>Создайте файл styles.css</li>
            <li>Подключите CSS к HTML</li>
            <li>Добавьте несколько стилей для текста и фона</li>
          </ol>
        </section>

        {/* Советы */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Советы для начинающих
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Используйте комментарии</h3>
              <p className="text-gray-600">
                Комментируйте свой код для лучшей организации и понимания
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">Следите за специфичностью</h3>
              <p className="text-gray-600">
                Понимайте, какие стили имеют приоритет
              </p>
            </div>
          </div>
        </section>

        {/* Навигация */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => window.location.href = '/courses'}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Назад к курсам
          </button>
          <button
            onClick={() => window.location.href = '/lessons/selectors'}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Следующий урок →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CSSIntro; 