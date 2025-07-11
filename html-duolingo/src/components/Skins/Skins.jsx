import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Skins = () => {
  const [selectedSkin, setSelectedSkin] = useState(null);

  const skins = [
    {
      id: 1,
      name: 'Классический',
      description: 'Стандартный дизайн приложения',
      image: '🎨',
      price: 0,
      isUnlocked: true
    },
    {
      id: 2,
      name: 'Темный режим',
      description: 'Стильный темный интерфейс',
      image: '🌙',
      price: 100,
      isUnlocked: false
    },
    {
      id: 3,
      name: 'Неон',
      description: 'Яркий неоновый стиль',
      image: '✨',
      price: 200,
      isUnlocked: false
    },
    {
      id: 4,
      name: 'Природа',
      description: 'Спокойные природные тона',
      image: '🌿',
      price: 300,
      isUnlocked: false
    }
  ];

  const handleSkinSelect = (skin) => {
    if (skin.isUnlocked) {
      setSelectedSkin(skin);
      // Здесь будет логика применения скина
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Скины</h1>
          <p className="mt-2 text-gray-600">
            Выберите стиль оформления для вашего обучения
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skins.map((skin) => (
            <motion.div
              key={skin.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer ${
                selectedSkin?.id === skin.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => handleSkinSelect(skin)}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{skin.image}</div>
                <h3 className="text-lg font-medium text-gray-900">{skin.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{skin.description}</p>
                <div className="mt-4">
                  {skin.isUnlocked ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Доступно
                    </span>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {skin.price} монет
                      </span>
                      <button
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Здесь будет логика покупки скина
                        }}
                      >
                        Купить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedSkin && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Выбран скин: <span className="font-medium">{selectedSkin.name}</span>
            </p>
            <button
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={() => {
                // Здесь будет логика применения скина
                console.log('Применен скин:', selectedSkin.name);
              }}
            >
              Применить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skins; 