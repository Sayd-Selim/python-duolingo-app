import React from 'react';
import { motion } from 'framer-motion';

function Level2Unit2() {
  const initialCode = `<!DOCTYPE html>
  <html>
  <head>
      <title>Списки в HTML</title>
  </head>
  <body>
      <h1>Списки - организаторы информации</h1>
      
      <!-- Маркированный список -->
      <h2>Что можно купить в магазине:</h2>
      <ul>
          <li>Хлеб</li>
          <li>Молоко</li>
          <li>Яблоки</li>
      </ul>
      
      <!-- Нумерованный список -->
      <h2>Порядок действий:</h2>
      <ol>
          <li>Включить компьютер</li>
          <li>Открыть браузер</li>
          <li>Перейти на сайт</li>
      </ol>
      
      <!-- Список определений -->
      <h2>Термины:</h2>
      <dl>
          <dt>HTML</dt>
          <dd>Язык разметки для создания веб-страниц</dd>
          <dt>CSS</dt>
          <dd>Язык стилей для оформления веб-страниц</dd>
      </dl>
  </body>
  </html>`;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Списки: Организаторы информации 📋</h1>
  
        <div className="space-y-6">
          {/* Введение */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое списки? 🎯</h2>
            <p className="text-gray-700 mb-4">
              Списки в HTML - это как специальные контейнеры, которые помогают нам организовать информацию
              в удобном для чтения виде. Представьте, что вы составляете список покупок или план действий -
              именно для этого и нужны списки!
            </p>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
              <pre className="text-sm text-indigo-900 whitespace-pre">
  {`<!-- Маркированный список -->
  <ul>
      <li>Первый пункт</li>
      <li>Второй пункт</li>
      <li>Третий пункт</li>
  </ul>
  
  <!-- Нумерованный список -->
  <ol>
      <li>Первый шаг</li>
      <li>Второй шаг</li>
      <li>Третий шаг</li>
  </ol>`}
              </pre>
            </div>
          </section>
  
          {/* Маркированные списки */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Маркированные списки (ul) 🔹</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">Когда использовать?</h3>
                <p className="text-gray-700 mb-4">
                  Маркированные списки используют, когда порядок элементов не важен:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Список покупок</li>
                  <li>Список преимуществ</li>
                  <li>Список функций</li>
                  <li>Список ингредиентов</li>
                </ul>
              </div>
  
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-green-700">Пример кода</h3>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
  {`<ul>
      <li>Хлеб</li>
      <li>Молоко</li>
      <li>Яблоки</li>
      <li>Сыр</li>
  </ul>`}
                </pre>
              </div>
            </div>
          </section>
  
          {/* Нумерованные списки */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Нумерованные списки (ol) 🔢</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">Когда использовать?</h3>
                <p className="text-gray-700 mb-4">
                  Нумерованные списки используют, когда важен порядок элементов:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Пошаговые инструкции</li>
                  <li>Рецепты</li>
                  <li>Правила</li>
                  <li>Этапы процесса</li>
                </ol>
              </div>
  
              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-yellow-700">Пример кода</h3>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
  {`<ol>
      <li>Включить компьютер</li>
      <li>Открыть браузер</li>
      <li>Перейти на сайт</li>
      <li>Найти нужную информацию</li>
  </ol>`}
                </pre>
              </div>
            </div>
          </section>
  
          {/* Списки определений */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Списки определений (dl) 📚</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-red-700">Когда использовать?</h3>
                <p className="text-gray-700 mb-4">
                  Списки определений используют для создания словарей и глоссариев:
                </p>
                <dl className="space-y-2 text-gray-700">
                  <dt className="font-semibold">HTML</dt>
                  <dd className="ml-4">Язык разметки для создания веб-страниц</dd>
                  <dt className="font-semibold">CSS</dt>
                  <dd className="ml-4">Язык стилей для оформления веб-страниц</dd>
                </dl>
              </div>
  
              <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-indigo-700">Пример кода</h3>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
  {`<dl>
      <dt>Термин</dt>
      <dd>Определение термина</dd>
      <dt>Другой термин</dt>
      <dd>Определение другого термина</dd>
  </dl>`}
                </pre>
              </div>
            </div>
          </section>
  
          {/* Вложенные списки */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Вложенные списки 🎯</h2>
            <div className="space-y-4">
              <p className="text-gray-700 mb-4">
                Списки можно вкладывать друг в друга, создавая сложные структуры:
              </p>
              <pre className="text-sm text-gray-900 bg-white p-2 rounded">
  {`<ul>
      <li>Фрукты
          <ul>
              <li>Яблоки</li>
              <li>Бананы</li>
          </ul>
      </li>
      <li>Овощи
          <ul>
              <li>Морковь</li>
              <li>Картофель</li>
          </ul>
      </li>
  </ul>`}
              </pre>
            </div>
          </section>
  
          {/* Практическое задание */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай свои списки! 🎯</h2>
            <p className="text-gray-700 mb-4">
              Создайте страницу с разными типами списков:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Список ваших любимых фильмов (маркированный список)</li>
              <li>Пошаговая инструкция по приготовлению чая (нумерованный список)</li>
              <li>Словарь терминов по программированию (список определений)</li>
              <li>Вложенный список с категориями и подкатегориями</li>
            </ul>
  
            <div className="mt-4">
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Начать создание списков
              </button>
            </div>
          </section>
  
          {/* Советы */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе со списками 💡</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Выбирайте правильный тип</h3>
                <p className="text-gray-700">
                  Используйте маркированные списки для неупорядоченных элементов, нумерованные - для последовательностей,
                  а списки определений - для терминов и их объяснений.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
                <h3 className="font-semibold mb-2 text-green-700">Совет 2: Соблюдайте отступы</h3>
                <p className="text-gray-700">
                  Используйте правильные отступы для вложенных списков, чтобы структура была понятной.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Не перегружайте</h3>
                <p className="text-gray-700">
                  Не создавайте слишком глубокую вложенность списков - это затрудняет чтение.
                </p>
              </div>
            </div>
          </section>
  
          {/* Что дальше */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                После освоения списков вы можете:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Изучить стилизацию списков с помощью CSS</li>
                <li>Создать навигационное меню на основе списков</li>
                <li>Использовать списки для создания карты сайта</li>
                <li>Комбинировать списки с другими HTML-элементами</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    );
}

export default Level2Unit2; 