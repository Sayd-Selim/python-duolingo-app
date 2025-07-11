import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit8() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Семантические теги</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#">Главная</a></li>
                <li><a href="#">О нас</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h1>Заголовок статьи</h1>
            <section>
                <h2>Раздел 1</h2>
                <p>Текст раздела</p>
            </section>
        </article>
        
        <aside>
            <h3>Дополнительная информация</h3>
            <p>Боковая панель</p>
        </aside>
    </main>
    
    <footer>
        <p>Подвал сайта</p>
    </footer>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Семантические теги: Умная структура страницы 🏗️</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое семантические теги? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Семантические теги - это HTML-элементы, которые несут смысловую нагрузку.
            Они помогают браузерам, поисковым системам и программам чтения с экрана
            лучше понимать структуру и содержание веб-страницы.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Вместо -->
<div class="header">...</div>
<div class="main">...</div>
<div class="footer">...</div>

<!-- Используйте -->
<header>...</header>
<main>...</main>
<footer>...</footer>`}
            </pre>
          </div>
        </section>

        {/* Основные семантические теги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Основные семантические теги 📋</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. header - шапка</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Содержит вводную информацию страницы:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<header>
    <h1>Название сайта</h1>
    <nav>
        <ul>
            <li><a href="#">Меню</a></li>
        </ul>
    </nav>
</header>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. main - основное содержимое</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Содержит основной контент страницы:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<main>
    <article>
        <h2>Заголовок статьи</h2>
        <p>Содержимое статьи</p>
    </article>
</main>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. footer - подвал</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Содержит информацию о сайте:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<footer>
    <p>© 2024 Мой сайт</p>
    <nav>
        <a href="#">Контакты</a>
    </nav>
</footer>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Дополнительные семантические теги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Дополнительные теги 🎯</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">article, section, aside</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Теги для структурирования контента:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<article>
    <h2>Статья</h2>
    <section>
        <h3>Раздел статьи</h3>
        <p>Текст раздела</p>
    </section>
</article>

<aside>
    <h3>Дополнительная информация</h3>
    <p>Боковая панель</p>
</aside>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">nav, figure, figcaption</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Теги для навигации и медиа-контента:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<nav>
    <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#">О нас</a></li>
    </ul>
</nav>

<figure>
    <img src="photo.jpg" alt="Фото">
    <figcaption>Описание фото</figcaption>
</figure>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества семантики */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Преимущества семантики ✨</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">1. SEO-оптимизация</h3>
              <p className="text-gray-700">
                Поисковые системы лучше понимают структуру и содержание страницы.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">2. Доступность</h3>
              <p className="text-gray-700">
                Программы чтения с экрана лучше ориентируются в контенте.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">3. Поддержка кода</h3>
              <p className="text-gray-700">
                Код становится более понятным и легким в поддержке.
              </p>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай семантическую страницу! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу, используя семантические теги:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте header с навигацией</li>
            <li>Создайте main с article и section</li>
            <li>Используйте aside для дополнительной информации</li>
            <li>Добавьте footer с контактной информацией</li>
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
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по семантике 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте теги по назначению</h3>
              <p className="text-gray-700">
                Каждый семантический тег должен использоваться в соответствии с его смыслом.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Не злоупотребляйте div</h3>
              <p className="text-gray-700">
                Используйте div только когда нет подходящего семантического тега.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Проверяйте структуру</h3>
              <p className="text-gray-700">
                Убедитесь, что структура страницы логична и понятна.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения семантических тегов вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить ARIA-атрибуты для улучшения доступности</li>
              <li>Познакомиться с CSS для стилизации семантических элементов</li>
              <li>Изучить микроразметку для SEO</li>
              <li>Освоить работу с формами и их семантикой</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit8; 