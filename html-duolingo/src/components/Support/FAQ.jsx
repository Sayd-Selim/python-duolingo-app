import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Все вопросы' },
    { id: 'general', name: 'Общие вопросы' },
    { id: 'technical', name: 'Технические вопросы' },
    { id: 'account', name: 'Аккаунт' },
    { id: 'learning', name: 'Обучение' }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'Как начать обучение?',
      answer: 'Для начала обучения просто зарегистрируйтесь на платформе и выберите интересующий вас курс. После этого вы сможете начать с первого урока.',
      category: 'general'
    },
    {
      id: 2,
      question: 'Как работает система повторения?',
      answer: 'Система повторения использует алгоритм интервального повторения, который помогает эффективно запоминать материал. Карточки для повторения появляются в оптимальное время для лучшего усвоения.',
      category: 'learning'
    },
    {
      id: 3,
      question: 'Как изменить настройки аккаунта?',
      answer: 'Настройки аккаунта можно изменить в разделе "Профиль". Там вы найдете опции для изменения личной информации, настроек уведомлений и предпочтений обучения.',
      category: 'account'
    },
    {
      id: 4,
      question: 'Что делать, если не работает редактор кода?',
      answer: 'Попробуйте очистить кэш браузера и перезагрузить страницу. Если проблема сохраняется, проверьте, что у вас установлена последняя версия браузера.',
      category: 'technical'
    },
    {
      id: 5,
      question: 'Как получить сертификат?',
      answer: 'Сертификат выдается после успешного завершения курса. Вам нужно выполнить все задания и пройти финальное тестирование с результатом не менее 80%.',
      category: 'learning'
    }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск вопросов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">По вашему запросу ничего не найдено</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 