import React from 'react';
import { motion } from 'framer-motion';

const PremiumFeatures = () => {
  const features = [
    {
      id: 1,
      title: 'Расширенные курсы',
      description: 'Доступ к углубленным курсам по HTML, CSS и JavaScript',
      icon: '📚',
      price: '299₽/мес'
    },
    {
      id: 2,
      title: 'Индивидуальные консультации',
      description: 'Персональные занятия с опытными преподавателями',
      icon: '👨‍🏫',
      price: '1500₽/час'
    },
    {
      id: 3,
      title: 'Сертификация',
      description: 'Получите официальный сертификат о прохождении курсов',
      icon: '🏆',
      price: '1999₽'
    },
    {
      id: 4,
      title: 'Партнерская программа',
      description: 'Зарабатывайте, приглашая друзей на платформу',
      icon: '🤝',
      price: 'Бесплатно'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Премиум возможности
        </h1>
        <p className="text-xl text-gray-600">
          Расширьте свои возможности обучения с нашими премиум-функциями
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {feature.price}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Подключить
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Преимущества премиум-подписки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Без рекламы</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Неограниченный доступ к курсам</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Приоритетная поддержка</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Дополнительные практические задания</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Доступ к закрытому сообществу</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <span>Скидки на индивидуальные консультации</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures; 