import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit9() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Описание вашей страницы для поисковых систем">
    <meta name="keywords" content="ключевые, слова, через, запятую">
    <meta name="author" content="Ваше имя">
    <title>Заголовок страницы</title>
</head>
<body>
    <h1>Содержимое страницы</h1>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Метатеги и SEO: Визитная карточка сайта 🎯</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое метатеги? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Метатеги - это специальные HTML-элементы, которые предоставляют информацию
            о веб-странице. Они находятся в секции head и помогают поисковым системам
            лучше понимать содержание страницы, а также влияют на её отображение
            в результатах поиска.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<head>
    <meta charset="UTF-8">
    <meta name="description" content="Описание страницы">
    <title>Заголовок страницы</title>
</head>`}
            </pre>
          </div>
        </section>

        {/* Основные метатеги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Основные метатеги 📋</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. charset - кодировка</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Определяет кодировку символов страницы:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<meta charset="UTF-8">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. viewport - отображение</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Настройки отображения на мобильных устройствах:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<meta name="viewport" content="width=device-width, initial-scale=1.0">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. description - описание</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Краткое описание страницы для поисковых систем:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<meta name="description" content="Подробное описание содержимого страницы, 
которое будет отображаться в результатах поиска">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-метатеги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">SEO-метатеги 🎯</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">keywords - ключевые слова</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Ключевые слова, описывающие содержание страницы:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<meta name="keywords" content="HTML, CSS, веб-разработка, обучение">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">robots - правила для роботов</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Указания для поисковых роботов:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<meta name="robots" content="index, follow">
<meta name="robots" content="noindex, nofollow">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Социальные метатеги */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Социальные метатеги 🌐</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-indigo-700">Open Graph и Twitter Cards</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Метатеги для красивого отображения ссылок в соцсетях:
                </p>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
{`<!-- Open Graph -->
<meta property="og:title" content="Заголовок">
<meta property="og:description" content="Описание">
<meta property="og:image" content="url-картинки">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Заголовок">
<meta name="twitter:description" content="Описание">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай SEO-оптимизированную страницу! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу с правильными метатегами:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте основные метатеги (charset, viewport)</li>
            <li>Напишите уникальное описание страницы</li>
            <li>Добавьте ключевые слова</li>
            <li>Настройте социальные метатеги</li>
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
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по SEO 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Пишите уникальные описания</h3>
              <p className="text-gray-700">
                Каждая страница должна иметь уникальное и информативное описание.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Используйте ключевые слова естественно</h3>
              <p className="text-gray-700">
                Не перегружайте страницу ключевыми словами, используйте их органично.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Проверяйте отображение в соцсетях</h3>
              <p className="text-gray-700">
                Убедитесь, что ссылки на вашу страницу красиво отображаются в соцсетях.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения метатегов и SEO вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить микроразметку Schema.org</li>
              <li>Познакомиться с инструментами анализа SEO</li>
              <li>Изучить техническую оптимизацию сайта</li>
              <li>Освоить работу с контентом для SEO</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit9; 