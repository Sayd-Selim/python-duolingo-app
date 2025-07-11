import React, { useState } from 'react';
import FAQ from './FAQ';
import Forum from './Forum';
import Feedback from './Feedback';
import SupportChat from './SupportChat';

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq');

  const tabs = [
    { id: 'faq', name: 'FAQ', icon: '❓' },
    { id: 'forum', name: 'Форум', icon: '💬' },
    { id: 'feedback', name: 'Обратная связь', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Центр поддержки
          </h1>
          <p className="text-gray-600">
            Выберите раздел, чтобы получить помощь
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'faq' && <FAQ />}
            {activeTab === 'forum' && <Forum />}
            {activeTab === 'feedback' && <Feedback />}
          </div>
        </div>
      </div>

      <SupportChat />
    </div>
  );
};

export default Support; 