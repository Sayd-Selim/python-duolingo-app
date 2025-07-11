import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Forum = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    {
      id: 1,
      title: 'Проблемы с HTML тегами',
      author: 'Анна',
      replies: 5,
      views: 120,
      lastActivity: '2 часа назад',
      category: 'HTML',
      tags: ['теги', 'структура']
    },
    {
      id: 2,
      title: 'Как правильно использовать CSS Grid?',
      author: 'Михаил',
      replies: 8,
      views: 250,
      lastActivity: '5 часов назад',
      category: 'CSS',
      tags: ['grid', 'layout']
    },
    {
      id: 3,
      title: 'Вопросы по JavaScript',
      author: 'Дмитрий',
      replies: 12,
      views: 300,
      lastActivity: '1 день назад',
      category: 'JavaScript',
      tags: ['js', 'программирование']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все темы', count: 25 },
    { id: 'html', name: 'HTML', count: 10 },
    { id: 'css', name: 'CSS', count: 8 },
    { id: 'js', name: 'JavaScript', count: 7 }
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Форум</h2>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Создать тему
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Поиск тем..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex space-x-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {topic.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Автор: {topic.author}</span>
                      <span>Ответов: {topic.replies}</span>
                      <span>Просмотров: {topic.views}</span>
                      <span>Последняя активность: {topic.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {topic.category}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">По вашему запросу ничего не найдено</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum; 