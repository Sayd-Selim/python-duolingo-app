import React from 'react';
import { motion } from 'framer-motion';

function Level1Unit10() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Формы ввода данных</title>
</head>
<body>
    <form action="/submit" method="post">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" name="username" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit">Отправить</button>
    </form>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Формы и ввод данных: Диалог с пользователем 💬</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое формы? 💬</h2>
          <p className="text-gray-700 mb-4">
            Формы - это элементы веб-страницы, которые позволяют пользователям
            вводить данные и отправлять их на сервер. Они используются для
            регистрации, авторизации, поиска, обратной связи и многих других целей.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<form action="/submit" method="post">
    <input type="text" name="username">
    <button type="submit">Отправить</button>
</form>`}
            </pre>
          </div>
        </section>

        {/* Основные элементы форм */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Основные элементы форм 📝</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. Текстовые поля</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для ввода текста:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<input type="text" name="username" placeholder="Введите имя">
<input type="email" name="email" placeholder="Введите email">
<input type="password" name="password" placeholder="Введите пароль">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. Выпадающие списки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для выбора из списка:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<select name="country">
    <option value="ru">Россия</option>
    <option value="us">США</option>
    <option value="uk">Великобритания</option>
</select>`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. Чекбоксы и радио-кнопки</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для выбора одного или нескольких вариантов:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<!-- Чекбоксы -->
<input type="checkbox" name="hobby" value="reading"> Чтение
<input type="checkbox" name="hobby" value="sports"> Спорт

<!-- Радио-кнопки -->
<input type="radio" name="gender" value="male"> Мужской
<input type="radio" name="gender" value="female"> Женский`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Атрибуты форм */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Атрибуты форм 🎯</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">Обязательные атрибуты</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Основные атрибуты для валидации:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<input type="text" required>
<input type="email" required>
<input type="number" min="0" max="100">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Дополнительные атрибуты</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Полезные атрибуты для улучшения UX:
                </p>
                <pre className="text-sm text-red-900 bg-white p-2 rounded">
{`<input type="text" placeholder="Подсказка">
<input type="text" pattern="[A-Za-z]{3}">
<input type="text" autocomplete="off">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай форму регистрации! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте форму регистрации со следующими полями:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Имя пользователя (текстовое поле)</li>
            <li>Email (поле для email)</li>
            <li>Пароль (поле для пароля)</li>
            <li>Страна (выпадающий список)</li>
            <li>Интересы (чекбоксы)</li>
            <li>Пол (радио-кнопки)</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание формы
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе с формами 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Используйте label</h3>
              <p className="text-gray-700">
                Всегда связывайте поля ввода с подписями через атрибут for.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Добавляйте валидацию</h3>
              <p className="text-gray-700">
                Используйте атрибуты required, pattern и type для проверки данных.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Улучшайте UX</h3>
              <p className="text-gray-700">
                Добавляйте подсказки, группируйте связанные поля и используйте autocomplete.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После изучения форм вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить JavaScript для валидации форм</li>
              <li>Познакомиться с CSS для стилизации форм</li>
              <li>Изучить работу с формами на сервере</li>
              <li>Освоить AJAX для отправки форм без перезагрузки</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Level1Unit10; 