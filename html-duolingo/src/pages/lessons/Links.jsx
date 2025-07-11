import React from 'react';
import { motion } from 'framer-motion';

function Links() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Ссылки в HTML</title>
</head>
<body>
    <h1>Ссылки - мосты между страницами</h1>
    
    <!-- Простая ссылка -->
    <a href="https://www.example.com">Перейти на Example.com</a>
    
    <!-- Ссылка с атрибутами -->
    <a href="https://www.example.com" target="_blank" rel="noopener">
        Открыть в новой вкладке
    </a>
    
    <!-- Ссылка на якорь -->
    <a href="#section1">Перейти к разделу 1</a>
    
    <!-- Ссылка на email -->
    <a href="mailto:info@example.com">Написать нам</a>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Ссылки: Мосты между страницами 🌉</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое ссылки? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Ссылки в HTML - это как мосты, которые соединяют разные страницы в интернете.
            Они позволяют пользователям путешествовать по веб-сайтам, переходить от одной страницы к другой
            и находить нужную информацию.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Базовая структура ссылки -->
<a href="адрес_страницы">Текст ссылки</a>

<!-- Пример -->
<a href="https://www.example.com">Перейти на Example.com</a>`}
            </pre>
          </div>
        </section>

        {/* Типы ссылок */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Типы ссылок 🗺️</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Внешние ссылки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Ссылки на другие сайты в интернете:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<a href="https://www.google.com">Перейти на Google</a>
<a href="https://www.youtube.com">Смотреть видео на YouTube</a>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. Внутренние ссылки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Ссылки на другие страницы вашего сайта:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<a href="about.html">О нас</a>
<a href="contacts.html">Контакты</a>
<a href="images/photo.jpg">Посмотреть фото</a>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Якорные ссылки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Ссылки на определенные места на странице:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<!-- Создание якоря -->
<h2 id="section1">Раздел 1</h2>

<!-- Ссылка на якорь -->
<a href="#section1">Перейти к разделу 1</a>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Атрибуты ссылок */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Атрибуты ссылок 🛠️</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">target="_blank"</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Открывает ссылку в новой вкладке:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<a href="https://www.example.com" target="_blank">
    Открыть в новой вкладке
</a>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">rel="noopener"</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Защищает от потенциальных уязвимостей при открытии в новой вкладке:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<a href="https://www.example.com" 
   target="_blank" 
   rel="noopener">
    Безопасная ссылка
</a>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-indigo-700">title="подсказка"</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Добавляет всплывающую подсказку при наведении:
                </p>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
{`<a href="https://www.example.com" 
   title="Перейти на главную страницу">
    Главная
</a>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Специальные ссылки */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Специальные ссылки ✨</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">Email ссылки</h3>
              <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<a href="mailto:info@example.com">
    Написать нам
</a>`}
              </pre>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">Телефонные ссылки</h3>
              <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<a href="tel:+71234567890">
    Позвонить нам
</a>`}
              </pre>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">Скачивание файлов</h3>
              <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<a href="files/document.pdf" download>
    Скачать документ
</a>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай свои ссылки! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу с разными типами ссылок:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Навигационное меню с внутренними ссылками</li>
            <li>Ссылки на социальные сети (внешние ссылки)</li>
            <li>Ссылку для отправки email</li>
            <li>Ссылки на якоря для быстрой навигации по странице</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание ссылок
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе со ссылками 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Делайте понятный текст</h3>
              <p className="text-gray-700">
                Текст ссылки должен быть информативным и понятным без контекста.
                Избегайте фраз типа "нажмите здесь" или "подробнее".
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Проверяйте ссылки</h3>
              <p className="text-gray-700">
                Регулярно проверяйте работоспособность ссылок на вашем сайте.
                Неработающие ссылки создают плохое впечатление.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Безопасность</h3>
              <p className="text-gray-700">
                Используйте rel="noopener" для внешних ссылок, открывающихся в новой вкладке.
                Это защищает от потенциальных атак.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После освоения ссылок вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить стилизацию ссылок с помощью CSS</li>
              <li>Создать навигационное меню</li>
              <li>Добавить интерактивные эффекты при наведении</li>
              <li>Изучить работу с относительными и абсолютными путями</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Links; 