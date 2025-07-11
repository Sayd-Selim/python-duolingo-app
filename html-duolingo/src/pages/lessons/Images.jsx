import React from 'react';
import { motion } from 'framer-motion';

function Images() {
  const initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>Изображения в HTML</title>
</head>
<body>
    <h1>Изображения - визуальные истории</h1>
    
    <!-- Простое изображение -->
    <img src="images/photo.jpg" alt="Описание фотографии">
    
    <!-- Изображение с размерами -->
    <img src="images/logo.png" 
         alt="Логотип компании" 
         width="200" 
         height="100">
    
    <!-- Изображение с подписью -->
    <figure>
        <img src="images/artwork.jpg" alt="Произведение искусства">
        <figcaption>Описание произведения искусства</figcaption>
    </figure>
</body>
</html>`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Изображения: Визуальные истории 🖼️</h1>

      <div className="space-y-6">
        {/* Введение */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что такое изображения в HTML? 🎯</h2>
          <p className="text-gray-700 mb-4">
            Изображения в HTML - это как окна, через которые мы показываем визуальные истории нашим посетителям.
            Они делают страницы живыми, информативными и привлекательными.
          </p>
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-md border border-indigo-200">
            <pre className="text-sm text-indigo-900 whitespace-pre">
{`<!-- Базовая структура изображения -->
<img src="путь_к_изображению" alt="описание">

<!-- Пример -->
<img src="images/photo.jpg" alt="Красивый закат">`}
            </pre>
          </div>
        </section>

        {/* Основные атрибуты */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Основные атрибуты изображений 🛠️</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">1. src - источник</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Указывает путь к файлу изображения:
                </p>
                <pre className="text-sm text-blue-900 bg-white p-2 rounded">
{`<!-- Абсолютный путь -->
<img src="https://example.com/images/photo.jpg" alt="Фото">

<!-- Относительный путь -->
<img src="images/photo.jpg" alt="Фото">
<img src="../images/photo.jpg" alt="Фото">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-green-700">2. alt - альтернативный текст</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Описывает изображение для тех, кто не может его увидеть:
                </p>
                <pre className="text-sm text-green-900 bg-white p-2 rounded">
{`<img src="cat.jpg" alt="Рыжий кот сидит на подоконнике">
<img src="logo.png" alt="Логотип компании Example">`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-purple-700">3. width и height</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Задают размеры изображения:
                </p>
                <pre className="text-sm text-purple-900 bg-white p-2 rounded">
{`<img src="photo.jpg" 
     alt="Фотография" 
     width="300" 
     height="200">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Фигуры и подписи */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Фигуры и подписи 📝</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-yellow-700">figure и figcaption</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для изображений с подписями используйте теги figure и figcaption:
                </p>
                <pre className="text-sm text-yellow-900 bg-white p-2 rounded">
{`<figure>
    <img src="artwork.jpg" alt="Картина">
    <figcaption>Мона Лиза, Леонардо да Винчи</figcaption>
</figure>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Форматы изображений */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Форматы изображений 🎨</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 bg-red-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-red-700">Популярные форматы</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>JPEG (.jpg, .jpeg) - для фотографий</li>
                <li>PNG (.png) - для изображений с прозрачностью</li>
                <li>GIF (.gif) - для анимаций</li>
                <li>WebP (.webp) - современный формат с хорошим сжатием</li>
                <li>SVG (.svg) - для векторной графики</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Адаптивные изображения */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Адаптивные изображения 📱</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 rounded-r-md p-4">
              <h3 className="font-semibold text-lg mb-2 text-indigo-700">srcset и sizes</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  Для разных размеров экрана можно использовать разные изображения:
                </p>
                <pre className="text-sm text-indigo-900 bg-white p-2 rounded">
{`<img src="small.jpg"
     srcset="small.jpg 300w,
             medium.jpg 600w,
             large.jpg 900w"
     sizes="(max-width: 600px) 300px,
            (max-width: 900px) 600px,
            900px"
     alt="Адаптивное изображение">`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Практическое задание */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Создай галерею! 🎯</h2>
          <p className="text-gray-700 mb-4">
            Создайте страницу с галереей изображений:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Добавьте несколько изображений с подписями</li>
            <li>Используйте разные форматы изображений</li>
            <li>Сделайте адаптивную галерею</li>
            <li>Добавьте альтернативные тексты</li>
          </ul>

          <div className="mt-4">
            <button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Начать создание галереи
            </button>
          </div>
        </section>

        {/* Советы */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Советы по работе с изображениями 💡</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-700">Совет 1: Оптимизируйте размеры</h3>
              <p className="text-gray-700">
                Сжимайте изображения перед загрузкой на сайт. Это ускорит загрузку страницы.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
              <h3 className="font-semibold mb-2 text-green-700">Совет 2: Всегда используйте alt</h3>
              <p className="text-gray-700">
                Альтернативный текст важен для доступности и SEO. Он должен быть информативным.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-700">Совет 3: Указывайте размеры</h3>
              <p className="text-gray-700">
                Задавайте width и height для предотвращения сдвига контента при загрузке.
              </p>
            </div>
          </div>
        </section>

        {/* Что дальше */}
        <section className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Что дальше? 🎓</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              После освоения изображений вы можете:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Изучить CSS для стилизации изображений</li>
              <li>Создать слайдер или карусель</li>
              <li>Добавить эффекты при наведении</li>
              <li>Изучить работу с фоновыми изображениями</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Images; 