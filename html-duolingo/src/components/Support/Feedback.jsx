import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('bug');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'bug',
      name: 'Сообщить об ошибке',
      icon: '🐛',
      description: 'Нашли ошибку? Помогите нам её исправить.'
    },
    {
      id: 'feature',
      name: 'Предложить функцию',
      icon: '💡',
      description: 'Есть идея для улучшения платформы?'
    },
    {
      id: 'content',
      name: 'Отзыв о контенте',
      icon: '📚',
      description: 'Поделитесь мнением о материалах курса.'
    },
    {
      id: 'other',
      name: 'Другое',
      icon: '📝',
      description: 'Другие вопросы и предложения.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки данных
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTitle('');
      setDescription('');
      setEmail('');
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Спасибо за обратную связь!
            </h2>
            <p className="text-gray-600 mb-6">
              Мы получили ваше сообщение и рассмотрим его в ближайшее время.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Отправить еще
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Обратная связь</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {feedbackTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFeedbackType(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  feedbackType === type.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Краткое описание"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Подробно опишите вашу проблему или предложение"
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (для обратной связи)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback; 