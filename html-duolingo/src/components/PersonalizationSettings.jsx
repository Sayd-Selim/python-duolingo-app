import React from 'react';
import { motion } from 'framer-motion';
import { usePersonalization } from '../context/PersonalizationContext';

const PersonalizationSettings = () => {
  const {
    theme,
    avatar,
    miniSite,
    updateTheme,
    updateAvatar,
    updateMiniSite
  } = usePersonalization();

  const avatarTypes = [
    { id: 'robot', emoji: '🤖', name: 'Робот' },
    { id: 'cat', emoji: '🐱', name: 'Котик' },
    { id: 'dog', emoji: '🐶', name: 'Пёсик' },
    { id: 'owl', emoji: '🦉', name: 'Сова' }
  ];

  const moods = [
    { id: 'happy', emoji: '😊', name: 'Радостный' },
    { id: 'thinking', emoji: '🤔', name: 'Задумчивый' },
    { id: 'excited', emoji: '🎉', name: 'Взволнованный' }
  ];

  const fonts = [
    { id: 'Inter', name: 'Inter' },
    { id: 'Poppins', name: 'Poppins' },
    { id: 'Roboto', name: 'Roboto' },
    { id: 'Open Sans', name: 'Open Sans' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Персонализация</h2>

      {/* Настройки аватара */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Аватар-помощник</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип аватара
            </label>
            <div className="grid grid-cols-4 gap-4">
              {avatarTypes.map(type => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 ${
                    avatar.type === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => updateAvatar({ type: type.id })}
                >
                  <div className="text-3xl mb-2">{type.emoji}</div>
                  <div className="text-sm text-gray-600">{type.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Настроение
            </label>
            <div className="grid grid-cols-3 gap-4">
              {moods.map(mood => (
                <motion.button
                  key={mood.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg border-2 ${
                    avatar.mood === mood.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => updateAvatar({ mood: mood.id })}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm text-gray-600">{mood.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя аватара
            </label>
            <input
              type="text"
              value={avatar.name}
              onChange={(e) => updateAvatar({ name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Настройки темы */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Тема оформления</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Основной цвет
            </label>
            <input
              type="color"
              value={theme.colors.primary}
              onChange={(e) => updateTheme({
                colors: { ...theme.colors, primary: e.target.value }
              })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дополнительный цвет
            </label>
            <input
              type="color"
              value={theme.colors.secondary}
              onChange={(e) => updateTheme({
                colors: { ...theme.colors, secondary: e.target.value }
              })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Шрифт
            </label>
            <select
              value={theme.fonts.main}
              onChange={(e) => updateTheme({
                fonts: { ...theme.fonts, main: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {fonts.map(font => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sounds"
              checked={theme.sounds.enabled}
              onChange={(e) => updateTheme({
                sounds: { ...theme.sounds, enabled: e.target.checked }
              })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="sounds" className="text-sm text-gray-700">
              Включить звуки
            </label>
          </div>

          {theme.sounds.enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Громкость
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={theme.sounds.volume}
                onChange={(e) => updateTheme({
                  sounds: { ...theme.sounds, volume: parseFloat(e.target.value) }
                })}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Настройки мини-сайта */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Мини-сайт</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок
            </label>
            <input
              type="text"
              value={miniSite.title}
              onChange={(e) => updateMiniSite({ title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Фон
            </label>
            <input
              type="color"
              value={miniSite.background}
              onChange={(e) => updateMiniSite({ background: e.target.value })}
              className="w-full h-10 rounded-md cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Макет
            </label>
            <select
              value={miniSite.layout}
              onChange={(e) => updateMiniSite({ layout: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Стандартный</option>
              <option value="grid">Сетка</option>
              <option value="masonry">Каменная кладка</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationSettings; 