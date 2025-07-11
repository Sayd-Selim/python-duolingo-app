import React, { useState } from 'react';

const InterviewPrep = () => {
  const [selectedCategory, setSelectedCategory] = useState('html');

  const questions = {
    html: [
      {
        question: 'Что такое семантическая верстка и почему она важна?',
        answer: 'Семантическая верстка - это подход к написанию HTML, при котором используются теги, наиболее точно описывающие содержимое. Например, <header>, <nav>, <main>, <article>, <section>, <footer>. Это важно для: 1) Доступности (screen readers), 2) SEO, 3) Поддержки кода, 4) Поисковой оптимизации.'
      },
      {
        question: 'В чем разница между <div> и <span>?',
        answer: '<div> - блочный элемент, который занимает всю доступную ширину и создает новую строку. <span> - строчный элемент, который занимает только необходимое пространство и не создает новую строку.'
      },
      {
        question: 'Что такое HTML5 и какие новые возможности он предоставляет?',
        answer: 'HTML5 - это последняя версия HTML, которая добавляет: 1) Семантические теги, 2) Аудио и видео элементы, 3) Canvas для рисования, 4) Web Storage, 5) Geolocation API, 6) Drag and Drop API, 7) Web Workers.'
      }
    ],
    css: [
      {
        question: 'Что такое CSS Box Model?',
        answer: 'CSS Box Model описывает, как элементы отображаются на странице. Он состоит из: 1) Content (содержимое), 2) Padding (внутренний отступ), 3) Border (граница), 4) Margin (внешний отступ).'
      },
      {
        question: 'В чем разница между position: relative, absolute, fixed и sticky?',
        answer: 'relative - позиционирование относительно нормального положения элемента; absolute - относительно ближайшего позиционированного предка; fixed - относительно окна браузера; sticky - переключается между relative и fixed в зависимости от прокрутки.'
      },
      {
        question: 'Что такое Flexbox и Grid?',
        answer: 'Flexbox - одномерная система макета (строка или колонка), идеальна для компонентов интерфейса. Grid - двумерная система макета (строки и колонки), идеальна для макетов страниц.'
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Подготовка к собеседованию</h1>
      
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === 'html' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('html')}
        >
          HTML
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedCategory === 'css' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('css')}
        >
          CSS
        </button>
      </div>

      <div className="space-y-6">
        {questions[selectedCategory].map((q, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
            <p className="text-gray-700">{q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep; 