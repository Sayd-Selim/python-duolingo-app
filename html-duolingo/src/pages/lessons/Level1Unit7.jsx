import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit7() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Вложенность тегов</title>
</head>
<body>
    <div class="container">
        <header>
            <h1>Заголовок страницы</h1>
            <nav>
                <ul>
                    <li><a href="#">Ссылка 1</a></li>
                    <li><a href="#">Ссылка 2</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <article>
                <h2>Статья</h2>
                <p>Текст статьи</p>
            </article>
        </main>
    </div>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Вложенность тегов: Строительные блоки HTML 🏗️</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое вложенность? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Вложенность тегов - это способ организации HTML-документа, где одни теги
            находятся внутри других. Это как конструктор, где каждый элемент
            может содержать другие элементы, создавая иерархическую структуру.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Пример вложенности -->
<div>
    <h1>Заголовок</h1>
    <p>Параграф с <strong>жирным</strong> текстом</p>
</div>`}
            </pre>
          </div>
        </section>

        {/* Правила вложенности */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Правила вложенности 📋</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Правильный порядок закрытия</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Теги должны закрываться в обратном порядке их открытия:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<!-- Правильно -->
<div>
    <p>
        <strong>Текст</strong>
    </p>
</div>

<!-- Неправильно -->
<div>
    <p>
        <strong>Текст</strong>
    </div>
</p>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. Одинарные теги</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Некоторые теги не могут содержать другие элементы:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<!-- Одинарные теги -->
<img src="photo.jpg" alt="Фото">
<br>
<hr>
<input type="text">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Специфические правила</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Некоторые теги могут содержать только определенные элементы:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<!-- ul может содержать только li -->
<ul>
    <li>Элемент списка</li>
    <li>Другой элемент</li>
</ul>

<!-- table имеет строгую структуру -->
<table>
    <thead>
        <tr>
            <th>Заголовок</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Данные</td>
        </tr>
    </tbody>
</table>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Типичные ошибки */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Типичные ошибки ❌</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Неправильная вложенность</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Распространенные ошибки в структуре:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<!-- Неправильно -->
<p>
    <div>Текст</div>
</p>

<!-- Правильно -->
<div>
    <p>Текст</p>
</div>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">Нарушение спецификации</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Неправильное использование тегов:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<!-- Неправильно -->
<ul>
    <div>Текст</div>
</ul>

<!-- Правильно -->
<ul>
    <li>Текст</li>
</ul>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай правильную структуру! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте HTML-документ с правильной вложенностью:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Используйте семантические теги</li>
            <li>Создайте список с вложенными элементами</li>
            <li>Добавьте таблицу с правильной структурой</li>
            <li>Проверьте порядок закрытия тегов</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание структуры
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по вложенности 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте отступы</h3>
              <p className="text-gray-700">
                Правильные отступы помогают визуально отслеживать вложенность тегов.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Проверяйте спецификацию</h3>
              <p className="text-gray-700">
                Убедитесь, что используете теги согласно их спецификации.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Валидируйте код</h3>
              <p className="text-gray-700">
                Используйте валидаторы для проверки правильности вложенности.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения вложенности тегов вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить семантические теги</li>
              <li>Познакомиться с CSS для стилизации вложенных элементов</li>
              <li>Изучить доступность и ARIA-атрибуты</li>
              <li>Освоить работу с формами и их структурой</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit7; 