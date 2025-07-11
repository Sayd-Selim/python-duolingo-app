import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit5() {
  const initialCode = `<!DOCTYPE html>
  <html>
  <head>
      <title>Секретные заметки в коде</title>
  </head>
  <body>
      <!-- Это секретная заметка, которую видит только разработчик -->
      <h1>Детективная работа с кодом</h1>
      
      <!-- Временное отключение блока
      <div class="old-version">
          <p>Старая версия контента</p>
      </div>
      -->
      
      <div class="new-version">
          <p>Новая версия контента</p>
      </div>
  </body>
  </html>`;
  
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">Комментарии и отладка: Секретные заметки в коде 🔍</h1>
  
        <div className="space-y-6">
          {/* Введение */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Секретные заметки в коде 📝</h2>
            <p className="text-gray-700 mb-4">
              Комментарии в HTML - это как секретные заметки, которые видят только разработчики.
              Они помогают понять код и оставить важные подсказки для себя и других.
            </p>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
              <pre className="text-sm text-indigo-900 whitespace-pre">
  {`<!-- Это однострочный комментарий -->
  
  <!-- 
    Это многострочный комментарий.
    Здесь можно писать несколько строк.
    Полезно для длинных объяснений.
  -->
  
  <!-- Временное отключение кода
  <div>
      <p>Этот код временно отключен</p>
  </div>
  -->`}
              </pre>
            </div>
          </section>
  
          {/* Типы комментариев */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Виды секретных заметок 🎯</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Быстрые заметки</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Однострочные комментарии для быстрых пометок:
                  </p>
                  <pre className="text-sm text-blue-900 bg-white p-2 rounded">
  {`<!-- TODO: Добавить анимацию -->
  <!-- FIXME: Исправить отступы -->
  <!-- NOTE: Важно для SEO -->`}
                  </pre>
                </div>
              </div>
  
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-green-700">2. Детальные объяснения</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Многострочные комментарии для подробных объяснений:
                  </p>
                  <pre className="text-sm text-green-900 bg-white p-2 rounded">
  {`<!-- 
    Этот блок кода отвечает за:
    1. Отображение меню навигации
    2. Обработку кликов по пунктам
    3. Анимацию при наведении
  -->`}
                  </pre>
                </div>
              </div>
  
              <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Временное отключение</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Комментарии для временного отключения кода:
                  </p>
                  <pre className="text-sm text-purple-900 bg-white p-2 rounded">
  {`<!-- Временное отключение старой версии
  <div class="old-version">
      <p>Старый контент</p>
  </div>
  -->
  
  <div class="new-version">
      <p>Новый контент</p>
  </div>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>
  
          {/* Отладка */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Детективная работа с кодом 🔍</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-yellow-700">Поиск ошибок</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Как детектив ищет улики, так и мы ищем ошибки в коде:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Проверяем закрытие всех тегов</li>
                    <li>Ищем неправильные атрибуты</li>
                    <li>Проверяем правильность вложенности</li>
                  </ul>
                </div>
              </div>
  
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
                <h3 className="font-semibold text-lg mb-2 text-red-700">Инструменты детектива</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Полезные инструменты для отладки:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Инспектор элементов в браузере</li>
                    <li>Валидатор HTML</li>
                    <li>Консоль разработчика</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  
          {/* Практическое задание */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Практическое задание 🎯</h2>
            <p className="text-gray-700 mb-4">
              Создайте страницу с разными типами комментариев:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Добавьте однострочные комментарии с пометками TODO и NOTE</li>
              <li>Создайте многострочный комментарий с объяснением структуры</li>
              <li>Временно отключите один блок кода</li>
              <li>Найдите и исправьте ошибки в коде</li>
            </ul>
  
            <div className="mt-4">
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Начать детективную работу
              </button>
            </div>
          </section>
  
          {/* Советы детектива */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы детектива 💡</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Оставляйте понятные заметки</h3>
                <p className="text-gray-700">
                  Комментарии должны быть понятными и полезными. Избегайте очевидных комментариев.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
                <h3 className="font-semibold mb-2 text-green-700">Совет 2: Используйте систему пометок</h3>
                <p className="text-gray-700">
                  TODO, FIXME, NOTE - это как цветные стикеры для разных типов заметок.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Регулярно проверяйте код</h3>
                <p className="text-gray-700">
                  Как хороший детектив, регулярно проверяйте код на наличие ошибок и устаревших комментариев.
                </p>
              </div>
            </div>
          </section>
  
          {/* Что дальше */}
          <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Следующее расследование 🎓</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                После освоения комментариев и отладки вы можете:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Изучить инструменты разработчика в браузере</li>
                <li>Научиться использовать валидаторы кода</li>
                <li>Освоить систему контроля версий</li>
                <li>Изучить автоматическое тестирование</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    );
}

export default Level1Unit5; 