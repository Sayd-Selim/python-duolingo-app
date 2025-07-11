import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit3() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Как работают теги</title>
</head>
<body>
    <h1>Изучаем HTML теги</h1>
    <p>Теги - это строительные блоки веб-страницы.</p>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Как работают HTML теги</h1>

      <div className="space-y-6">
        {/* Введение в теги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое HTML теги? 🎯</h2>
          <p className="text-gray-700 mb-4">
            HTML теги - это специальные команды, которые говорят браузеру, как отображать содержимое веб-страницы.
            Они всегда заключаются в угловые скобки &lt; и &gt;.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Пример простого тега -->
<h1>Это заголовок</h1>

<!-- Тег с атрибутами -->
<img src="photo.jpg" alt="Описание фото">

<!-- Вложенные теги -->
<div>
  <p>Это параграф внутри div</p>
</div>`}
            </pre>
          </div>
        </section>

        {/* Структура тегов */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Структура тегов 📝</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Открывающий и закрывающий теги</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Большинство тегов имеют пару:</p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<h1>Заголовок</h1>
<p>Параграф</p>
<div>Контейнер</div>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. Одиночные теги</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Некоторые теги не требуют закрывающего тега:</p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<img src="photo.jpg" alt="Фото">
<br>
<hr>
<input type="text">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Атрибуты тегов</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Теги могут иметь дополнительные параметры:</p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<!-- Атрибут class для стилизации -->
<div class="container">

<!-- Атрибут href для ссылок -->
<a href="https://example.com">Ссылка</a>

<!-- Несколько атрибутов -->
<img src="photo.jpg" alt="Фото" width="300" height="200">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Вложенность тегов */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Вложенность тегов 🎨</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">Правильная вложенность</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Теги должны быть правильно вложены друг в друга:</p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<!-- Правильно -->
<div>
  <p>Текст</p>
</div>

<!-- Неправильно -->
<div>
  <p>Текст
</div>
</p>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Популярные комбинации</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Часто используемые комбинации тегов:</p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<!-- Ссылка с изображением -->
<a href="page.html">
  <img src="photo.jpg" alt="Фото">
</a>

<!-- Список с ссылками -->
<ul>
  <li><a href="link1.html">Ссылка 1</a></li>
  <li><a href="link2.html">Ссылка 2</a></li>
</ul>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Практическое задание 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте простую HTML страницу, используя разные типы тегов:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте заголовок с помощью тега h1</li>
            <li>Создайте параграф с текстом</li>
            <li>Добавьте изображение с атрибутами</li>
            <li>Создайте список с несколькими элементами</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать практику
            </button>
          </div>
        </section>

        {/* Полезные советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Полезные советы 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Всегда закрывайте теги</h3>
              <p className="text-gray-700">
                Каждый открывающий тег должен иметь закрывающий. Исключение - одиночные теги.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Следите за вложенностью</h3>
              <p className="text-gray-700">
                Теги должны быть правильно вложены друг в друга, как матрешки.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Используйте атрибуты</h3>
              <p className="text-gray-700">
                Атрибуты помогают настроить поведение и внешний вид тегов.
              </p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit3; 