import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PremiumFeatures from './PremiumFeatures';
import AffiliateProgram from './AffiliateProgram';
import Certification from './Certification';

const Premium = () => {
  const [activeTab, setActiveTab] = useState('features');

  const tabs = [
    { id: 'features', name: 'Премиум-функции', icon: '⭐' },
    { id: 'certification', name: 'Сертификация', icon: '🏆' },
    { id: 'affiliate', name: 'Партнерская программа', icon: '🤝' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Премиум возможности
          </h1>
          <p className="text-xl text-gray-600">
            Расширьте свои возможности обучения
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
            {activeTab === 'features' && <PremiumFeatures />}
            {activeTab === 'certification' && <Certification />}
            {activeTab === 'affiliate' && <AffiliateProgram />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium; 