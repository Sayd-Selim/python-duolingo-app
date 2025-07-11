import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit4() {
  const initialCode = `<!DOCTYPE html>
  <html>
  <head>
      <title>Мой первый HTML-город</title>
  </head>
  <body>
      <header>
          <h1>Добро пожаловать в мой город!</h1>
      </header>
      <main>
          <p>Здесь каждый тег - это здание, а атрибуты - его особенности.</p>
      </main>
  </body>
  </html>`;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Строим HTML-город 🏙️</h1>
  
        <div className="space-y-6">
          {/* Введение */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">HTML как город 🏗️</h2>
            <p className="text-gray-700 mb-4">
              Представьте, что HTML-страница - это целый город! Каждый тег - это здание, 
              а атрибуты - это особенности этих зданий. Давайте построим наш первый город:
            </p>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
              <pre className="text-sm text-indigo-900 whitespace-pre">
  {`<!DOCTYPE html>  <!-- Это как устав города -->
  <html>           <!-- Это границы города -->
  <head>           <!-- Это городская администрация -->
      <title>Мой первый HTML-город</title>
  </head>
  <body>           <!-- Это сам город -->
      <header>     <!-- Это центральная площадь -->
          <h1>Добро пожаловать в мой город!</h1>
      </header>
      <main>       <!-- Это главная улица -->
          <p>Здесь каждый тег - это здание, а атрибуты - его особенности.</p>
      </main>
  </body>
  </html>`}
              </pre>
            </div>
          </section>
  
          {/* Городская структура */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Городская структура 🏛️</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Устав города (DOCTYPE)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    &lt;!DOCTYPE html&gt; - это как устав города. Он говорит браузеру: 
                    "Здесь будет современный город (HTML5), а не древний замок (HTML4)".
                  </p>
                </div>
              </div>
  
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-green-700">2. Границы города (HTML)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Тег &lt;html&gt; - это границы города. Всё, что внутри - это наш город.
                    Всё, что снаружи - это уже другой город (другая страница).
                  </p>
                </div>
              </div>
  
              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Городская администрация (Head)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    В &lt;head&gt; хранится вся служебная информация о городе:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>&lt;title&gt; - название города на карте</li>
                    <li>&lt;meta&gt; - правила жизни в городе</li>
                    <li>&lt;link&gt; - дороги к другим городам (стили)</li>
                  </ul>
                </div>
              </div>
  
              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-yellow-700">4. Сам город (Body)</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    В &lt;body&gt; размещаются все здания и улицы:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>&lt;header&gt; - центральная площадь</li>
                    <li>&lt;nav&gt; - навигационные указатели</li>
                    <li>&lt;main&gt; - главная улица</li>
                    <li>&lt;footer&gt; - окраина города</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  
          {/* Здания и их особенности */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Здания и их особенности 🏢</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-red-700">Атрибуты как особенности зданий</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Атрибуты - это как особенности зданий:
                  </p>
                  <pre className="text-sm text-red-900 bg-white p-2 rounded">
  {`<!-- class="tall" - высокое здание -->
  <div class="tall">Небоскрёб</div>
  
  <!-- id="main-square" - главная площадь -->
  <header id="main-square">Центральная площадь</header>
  
  <!-- src="photo.jpg" - фотография здания -->
  <img src="photo.jpg" alt="Фото здания">`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
  
          {/* Практическое задание */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Построй свой город! 🎯</h2>
            <p className="text-gray-700 mb-4">
              Создайте свой первый HTML-город:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Создайте границы города (DOCTYPE и HTML)</li>
              <li>Добавьте городскую администрацию (head с title)</li>
              <li>В теле города (body) разместите:
                <ul className="list-disc pl-6 mt-2">
                  <li>Центральную площадь (header) с названием города</li>
                  <li>Главную улицу (main) с описанием</li>
                  <li>Несколько зданий (div) с разными классами</li>
                </ul>
              </li>
            </ul>
  
            <div className="mt-4">
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Начать строительство
              </button>
            </div>
          </section>
  
          {/* Советы архитектора */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы архитектора 💡</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Планируйте структуру</h3>
                <p className="text-gray-700">
                  Как хороший архитектор, сначала нарисуйте план города (структуру HTML),
                  а потом уже стройте здания (добавляйте контент).
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
                <h3 className="font-semibold mb-2 text-green-700">Совет 2: Следите за порядком</h3>
                <p className="text-gray-700">
                  Здания должны быть правильно расположены (теги правильно вложены),
                  иначе город будет выглядеть неаккуратно.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Давайте имена</h3>
                <p className="text-gray-700">
                  Каждое важное здание должно иметь свой адрес (id или class),
                  чтобы его было легко найти.
                </p>
              </div>
            </div>
          </section>
  
          {/* Что дальше */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Развитие города 🎓</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                После создания базового города вы можете:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Добавить дороги между зданиями (ссылки)</li>
                <li>Украсить фасады (стили CSS)</li>
                <li>Создать интерактивные здания (JavaScript)</li>
                <li>Построить новые районы (дополнительные страницы)</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    );
}

export default Level1Unit4; 