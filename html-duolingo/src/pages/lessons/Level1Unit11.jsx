import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit11() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Текстовые теги</title>
</head>
<body>
    <p>Это <strong>жирный</strong> и <em>курсивный</em> текст.</p>
    <p>Это <mark>выделенный</mark> и <del>зачеркнутый</del> текст.</p>
    <blockquote>Это цитата</blockquote>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Текстовые теги и форматирование: Создаем красивые тексты ✍️</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое текстовые теги? ✍️</h2>
          <p className="text-gray-700 mb-4">
            Текстовые теги - это HTML-элементы, которые позволяют форматировать текст,
            выделять важные части, создавать структуру и придавать тексту
            определенное значение. Они помогают сделать текст более читабельным
            и понятным для пользователей.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<p>Обычный текст</p>
<strong>Жирный текст</strong>
<em>Курсивный текст</em>`}
            </pre>
          </div>
        </section>

        {/* Основные текстовые теги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Основные текстовые теги 📝</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Жирный и курсивный текст</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для выделения важного текста:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<strong>Жирный текст</strong>
<em>Курсивный текст</em>
<b>Жирный текст (устаревший)</b>
<i>Курсивный текст (устаревший)</i>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. Выделение и зачеркивание</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для выделения и зачеркивания текста:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<mark>Выделенный текст</mark>
<del>Зачеркнутый текст</del>
<ins>Подчеркнутый текст</ins>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Цитаты и определения</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для оформления цитат и определений:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<blockquote>Длинная цитата</blockquote>
<q>Короткая цитата</q>
<dfn>Термин</dfn>
<cite>Источник цитаты</cite>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Специальные теги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Специальные теги 🎯</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">Теги для кода и технического текста</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для оформления кода и технического текста:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<code>Код</code>
<pre>Предварительно отформатированный текст</pre>
<kbd>Текст, вводимый с клавиатуры</kbd>
<samp>Пример вывода программы</samp>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Теги для специальных символов</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для отображения специальных символов:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`&copy; - знак копирайта
&reg; - знак зарегистрированной торговой марки
&trade; - знак торговой марки
&nbsp; - неразрывный пробел`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай отформатированный текст! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу со следующим форматированием:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Заголовок с использованием разных уровней</li>
            <li>Абзац с жирным и курсивным текстом</li>
            <li>Цитату с указанием автора</li>
            <li>Список определений</li>
            <li>Пример кода</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание текста
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по форматированию текста 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте семантические теги</h3>
              <p className="text-gray-700">
                Предпочитайте strong вместо b и em вместо i для лучшей семантики.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Не перегружайте текст</h3>
              <p className="text-gray-700">
                Используйте форматирование умеренно, чтобы не затруднять чтение.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Следите за доступностью</h3>
              <p className="text-gray-700">
                Убедитесь, что форматирование не мешает чтению текста программами чтения с экрана.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения текстовых тегов вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить CSS для стилизации текста</li>
              <li>Познакомиться с типографикой</li>
              <li>Изучить доступность текста</li>
              <li>Освоить работу с шрифтами</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit11; 