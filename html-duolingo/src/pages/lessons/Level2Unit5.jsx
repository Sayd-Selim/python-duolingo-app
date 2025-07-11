import React from 'react';
import { motion } from 'framer-motion';

function Level2Unit5() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Таблицы в HTML</title>
</head>
<body>
    <h1>Таблицы - организаторы данных</h1>
    
    <!-- Простая таблица -->
    <table>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Город</th>
        </tr>
        <tr>
            <td>Иван</td>
            <td>25</td>
            <td>Москва</td>
        </tr>
        <tr>
            <td>Мария</td>
            <td>30</td>
            <td>Санкт-Петербург</td>
        </tr>
    </table>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Таблицы: Организаторы данных 📊</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое таблицы? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Таблицы в HTML - это как сетки, которые помогают нам организовать информацию
            в строках и столбцах. Они идеально подходят для представления структурированных данных,
            таких как расписания, списки, статистика и многое другое.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Базовая структура таблицы -->
<table>
    <tr>
        <th>Заголовок 1</th>
        <th>Заголовок 2</th>
    </tr>
    <tr>
        <td>Данные 1</td>
        <td>Данные 2</td>
    </tr>
</table>`}
            </pre>
          </div>
        </section>

        {/* Основные элементы таблицы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Элементы таблицы 🏗️</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. table - контейнер</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Основной элемент, который содержит всю таблицу:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<table>
    <!-- Содержимое таблицы -->
</table>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. tr - строка</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Определяет строку таблицы:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<tr>
    <td>Ячейка 1</td>
    <td>Ячейка 2</td>
</tr>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. th и td - ячейки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  th - для заголовков, td - для данных:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<tr>
    <th>Заголовок</th>
    <td>Данные</td>
</tr>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Структурные элементы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Структурные элементы 📑</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">thead, tbody, tfoot</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Группируют строки таблицы:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<table>
    <thead>
        <tr>
            <th>Заголовки</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Данные</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Итоги</td>
        </tr>
    </tfoot>
</table>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Объединение ячеек */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Объединение ячеек 🔄</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">colspan и rowspan</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Объединение ячеек по горизонтали и вертикали:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<table>
    <tr>
        <th colspan="2">Объединенный заголовок</th>
    </tr>
    <tr>
        <td rowspan="2">Объединенная ячейка</td>
        <td>Обычная ячейка</td>
    </tr>
    <tr>
        <td>Еще ячейка</td>
    </tr>
</table>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Доступность */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Доступность таблиц ♿</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-indigo-700">caption и scope</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Улучшаем доступность таблиц:
                </p>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
{`<table>
    <caption>Описание таблицы</caption>
    <tr>
        <th scope="col">Заголовок столбца</th>
        <th scope="row">Заголовок строки</th>
    </tr>
</table>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай свою таблицу! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте таблицу с данными:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте заголовок таблицы</li>
            <li>Используйте thead, tbody и tfoot</li>
            <li>Объедините некоторые ячейки</li>
            <li>Сделайте таблицу доступной</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание таблицы
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе с таблицами 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте семантику</h3>
              <p className="text-gray-700">
                Применяйте thead, tbody и tfoot для лучшей структуры и доступности.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Добавляйте описания</h3>
              <p className="text-gray-700">
                Используйте caption для описания таблицы и scope для заголовков.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Не злоупотребляйте объединением</h3>
              <p className="text-gray-700">
                Слишком сложные объединения ячеек могут затруднить понимание таблицы.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После освоения таблиц вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить CSS для стилизации таблиц</li>
              <li>Создать интерактивные таблицы</li>
              <li>Добавить сортировку данных</li>
              <li>Изучить работу с данными в таблицах</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level2Unit5; 