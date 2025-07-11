import React from 'react';
import { motion } from 'framer-motion';

function Attributes() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Атрибуты в HTML</title>
</head>
<body>
    <h1>Атрибуты - настройщики тегов</h1>
    
    <!-- Примеры атрибутов -->
    <img src="photo.jpg" alt="Описание фото" width="300" height="200">
    <a href="https://example.com" target="_blank" title="Перейти на сайт">
        Ссылка
    </a>
    <div class="container" id="main" style="color: blue;">
        Текст с атрибутами
    </div>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Атрибуты: Настройщики тегов ⚙️</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое атрибуты? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Атрибуты - это дополнительные настройки для HTML тегов. Они позволяют нам
            изменять поведение тегов, добавлять им новые возможности и настраивать их внешний вид.
            Атрибуты всегда указываются в открывающем теге.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Синтаксис атрибутов -->
<тег атрибут="значение">
    Содержимое
</тег>`}
            </pre>
          </div>
        </section>

        {/* Общие атрибуты */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Общие атрибуты 🎨</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. class - классы</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Используется для группировки элементов и применения стилей:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<div class="container">
    <p class="text-primary">Текст</p>
    <p class="text-secondary">Другой текст</p>
</div>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. id - идентификатор</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Уникальный идентификатор элемента:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<div id="header">
    <h1 id="main-title">Заголовок</h1>
</div>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. style - стили</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Встроенные CSS стили:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<p style="color: blue; font-size: 16px;">
    Текст с встроенными стилями
</p>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Специфические атрибуты */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Специфические атрибуты 🎯</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">Изображения</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Атрибуты для тега img:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<img src="photo.jpg" 
     alt="Описание фото"
     width="300"
     height="200"
     title="Подсказка">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Ссылки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Атрибуты для тега a:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<a href="https://example.com"
   target="_blank"
   rel="noopener"
   title="Перейти на сайт">
    Ссылка
</a>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Булевы атрибуты */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Булевы атрибуты ⚡</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-indigo-700">Атрибуты без значений</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Некоторые атрибуты не требуют значения:
                </p>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
{`<input type="text" required>
<button disabled>Кнопка</button>
<video autoplay loop muted>
    <source src="video.mp4">
</video>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай страницу с атрибутами! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу, используя различные атрибуты:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте изображение с alt и title</li>
            <li>Создайте ссылку с target="_blank"</li>
            <li>Используйте class и id для стилизации</li>
            <li>Добавьте форму с required полями</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание страницы
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе с атрибутами 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте осмысленные имена</h3>
              <p className="text-gray-700">
                Давайте атрибутам class и id понятные и описательные имена.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Не забывайте про alt</h3>
              <p className="text-gray-700">
                Всегда добавляйте атрибут alt для изображений - это важно для доступности.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Проверяйте значения</h3>
              <p className="text-gray-700">
                Убедитесь, что значения атрибутов корректны и соответствуют требованиям.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения атрибутов вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить CSS для стилизации элементов</li>
              <li>Познакомиться с JavaScript для динамического изменения атрибутов</li>
              <li>Изучить доступность и ARIA-атрибуты</li>
              <li>Освоить работу с формами и их атрибутами</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Attributes; 