import React, { useState } from 'react';
import { useReview } from '../context/ReviewContext';
import { motion } from 'framer-motion';

const CustomFlashcards = () => {
  const { addFlashcard } = useReview();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) {
      setMessage('Пожалуйста, заполните обе стороны карточки');
      return;
    }

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    addFlashcard({
      front,
      back,
      tags: tagArray,
      createdAt: new Date().toISOString(),
      lastReviewed: new Date().toISOString(),
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      reviewCount: 0,
      successCount: 0
    });

    setFront('');
    setBack('');
    setTags('');
    setMessage('Карточка успешно создана!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Создать карточку</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="front"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Вопрос
          </label>
          <textarea
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Введите вопрос или термин"
          />
        </div>

        <div>
          <label
            htmlFor="back"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ответ
          </label>
          <textarea
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Введите ответ или определение"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Теги (через запятую)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="html, css, javascript"
          />
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg ${
              message.includes('успешно')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Создать карточку
        </button>
      </form>
    </motion.div>
  );
};

export default CustomFlashcards; 