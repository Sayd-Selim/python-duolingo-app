import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AffiliateProgram = () => {
  const [referralCode, setReferralCode] = useState('HTML2024');
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Приглашено друзей', value: '12' },
    { label: 'Активных рефералов', value: '8' },
    { label: 'Заработано', value: '2400₽' },
    { label: 'Доступно к выводу', value: '1200₽' }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Партнерская программа
        </h1>
        <p className="text-xl text-gray-600">
          Приглашайте друзей и зарабатывайте вместе с нами
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ваша статистика
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-indigo-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ваша реферальная ссылка
              </h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`https://html-duolingo.com/ref/${referralCode}`}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {copied ? 'Скопировано!' : 'Копировать'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Как это работает
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Пригласите друга
                </h3>
                <p className="text-gray-600">
                  Поделитесь своей реферальной ссылкой с друзьями
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Друг регистрируется
                </h3>
                <p className="text-gray-600">
                  Ваш друг регистрируется по вашей ссылке
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Получайте вознаграждение
                </h3>
                <p className="text-gray-600">
                  Получайте 20% от оплаты за премиум-подписку
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Условия программы
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Минимальная сумма вывода: 1000₽</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Выплаты производятся ежемесячно</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Реферал должен быть активен минимум 30 дней</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Нет ограничений на количество рефералов</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram; 