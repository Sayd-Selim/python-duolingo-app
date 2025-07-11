import React from 'react';
import { motion } from 'framer-motion';

function Level2Unit1() {
  const initialCode = `<!DOCTYPE html>
  <html>
  <head>
      <title>Иерархия текста</title>
  </head>
  <body>
      <h1>Главный заголовок - как король текста</h1>
      <p>Параграф - это как рассказ, который раскрывает историю.</p>
      
      <h2>Подзаголовок - как принц</h2>
      <p>Каждый параграф добавляет новые детали к нашей истории.</p>
      
      <h3>Меньший заголовок - как рыцарь</h3>
      <p>И так далее, создавая структуру нашего повествования.</p>
  </body>
  </html>`;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Заголовки и параграфы: Иерархия текста 👑</h1>
  
        <div className="space-y-6">
          {/* Введение */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Королевство текста 📚</h2>
            <p className="text-gray-700 mb-4">
              В HTML тексты организованы как королевство, где заголовки - это короли и принцы,
              а параграфы - это истории, которые они рассказывают. Давайте познакомимся с этой иерархией:
            </p>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
              <pre className="text-sm text-indigo-900 whitespace-pre">
  {`<h1>Король (самый важный заголовок)</h1>
  <p>История, которую рассказывает король</p>
  
  <h2>Принц (важный, но не главный)</h2>
  <p>История принца</p>
  
  <h3>Рыцарь (ещё менее важный)</h3>
  <p>История рыцаря</p>`}
              </pre>
            </div>
          </section>
  
          {/* Заголовки */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Королевская семья заголовков 👑</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Король (h1)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    &lt;h1&gt; - это король всех заголовков. В каждой странице должен быть только один король:
                  </p>
                  <pre className="text-sm text-blue-900 bg-white p-2 rounded">
  {`<h1>Главная тема страницы</h1>
  <!-- Только один h1 на странице! -->`}
                  </pre>
                </div>
              </div>
  
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-green-700">2. Принцы (h2-h3)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    &lt;h2&gt; и &lt;h3&gt; - это принцы, которые помогают королю управлять королевством:
                  </p>
                  <pre className="text-sm text-green-900 bg-white p-2 rounded">
  {`<h2>Важный раздел</h2>
  <h3>Подраздел</h3>
  <h3>Ещё подраздел</h3>
  <h2>Другой важный раздел</h2>`}
                  </pre>
                </div>
              </div>
  
              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Рыцари (h4-h6)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    &lt;h4&gt; - &lt;h6&gt; - это рыцари, которые помогают принцам:
                  </p>
                  <pre className="text-sm text-purple-900 bg-white p-2 rounded">
  {`<h4>Мелкий подраздел</h4>
  <h5>Очень мелкий подраздел</h5>
  <h6>Самый мелкий подраздел</h6>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
  
          {/* Параграфы */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Истории параграфов 📖</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-yellow-700">Структура параграфа</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Параграф &lt;p&gt; - это как отдельная история в нашем королевстве:
                  </p>
                  <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
  {`<p>Это первая история в нашем королевстве.</p>
  <p>А это вторая история, которая продолжает первую.</p>
  <p>И третья история, которая завершает наш рассказ.</p>`}
                  </pre>
                </div>
              </div>
  
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-red-700">Форматирование текста</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Внутри параграфов можно выделять важные части:
                  </p>
                  <pre className="text-sm text-red-900 bg-white p-2 rounded">
  {`<p>Это <strong>важная</strong> часть истории.</p>
  <p>А это <em>выделенная</em> мысль.</p>
  <p>И <mark>особо важная</mark> информация.</p>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
  
          {/* Практическое задание */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай своё королевство! 🎯</h2>
            <p className="text-gray-700 mb-4">
              Создайте страницу о своём хобби, используя правильную иерархию:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Добавьте главный заголовок (h1) с названием хобби</li>
              <li>Создайте несколько разделов (h2) с подзаголовками (h3)</li>
              <li>Напишите параграфы, описывающие каждый раздел</li>
              <li>Выделите важные моменты в тексте</li>
            </ul>
  
            <div className="mt-4">
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Начать создание королевства
              </button>
            </div>
          </section>
  
          {/* Советы королевского писаря */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы королевского писаря 💡</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Соблюдайте иерархию</h3>
                <p className="text-gray-700">
                  Не пропускайте уровни заголовков. После h1 должен идти h2, а не сразу h4.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
                <h3 className="font-semibold mb-2 text-green-700">Совет 2: Делайте параграфы короткими</h3>
                <p className="text-gray-700">
                  Каждый параграф должен содержать одну основную мысль, как отдельная история.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Используйте форматирование</h3>
                <p className="text-gray-700">
                  Выделяйте важные части текста, чтобы читателю было легче ориентироваться.
                </p>
              </div>
            </div>
          </section>
  
          {/* Что дальше */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Расширяем королевство 🎓</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                После освоения заголовков и параграфов вы можете:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Добавить списки для организации информации</li>
                <li>Использовать цитаты для важных высказываний</li>
                <li>Создать таблицы для структурированных данных</li>
                <li>Добавить ссылки для связи с другими страницами</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    );
}

export default Level2Unit1; 