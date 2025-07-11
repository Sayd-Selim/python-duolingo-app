import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useErrorAnalysis } from '../context/ErrorAnalysisContext';

const ErrorAnalysis = () => {
  const { errors, getErrorStats, getErrorSuggestions, clearErrors } = useErrorAnalysis();
  const [selectedErrorType, setSelectedErrorType] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'frequency', 'type'
  const stats = getErrorStats() || {
    total: 0,
    byType: {},
    byComponent: {},
    mostCommon: [],
    recent: []
  };

  const errorTypeColors = {
    syntax: 'bg-red-100 text-red-800',
    semantic: 'bg-yellow-100 text-yellow-800',
    accessibility: 'bg-blue-100 text-blue-800',
    performance: 'bg-purple-100 text-purple-800',
    responsive: 'bg-green-100 text-green-800'
  };

  const errorTypeIcons = {
    syntax: '🔧',
    semantic: '📝',
    accessibility: '♿',
    performance: '⚡',
    responsive: '📱'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredErrors = () => {
    let filtered = [...(stats.recent || [])];
    
    // Применяем фильтр по времени
    if (filter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(error => {
        const errorDate = new Date(error.timestamp);
        switch (filter) {
          case 'today':
            return errorDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            return errorDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
            return errorDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Применяем поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(error => 
        error.message.toLowerCase().includes(query) ||
        error.type.toLowerCase().includes(query) ||
        (error.component && error.component.toLowerCase().includes(query))
      );
    }

    // Применяем сортировку
    switch (sortBy) {
      case 'frequency':
        filtered.sort((a, b) => {
          const countA = stats.byType[a.type] || 0;
          const countB = stats.byType[b.type] || 0;
          return countB - countA;
        });
        break;
      case 'type':
        filtered.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default: // 'recent'
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    return filtered;
  };

  const filteredErrors = getFilteredErrors();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Анализ ошибок</h2>
          <p className="text-gray-600 mt-1">Отслеживайте и исправляйте ошибки в вашем коде</p>
        </div>
        <button
          onClick={clearErrors}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
        >
          Очистить историю
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Поиск по ошибкам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Все время</option>
            <option value="today">Сегодня</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">По дате</option>
            <option value="frequency">По частоте</option>
            <option value="type">По типу</option>
          </select>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Всего ошибок</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.total || 0}</p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredErrors.length} ошибок в текущем фильтре
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Типы ошибок</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {Object.keys(stats.byType || {}).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Уникальных категорий
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Компоненты</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {Object.keys(stats.byComponent || {}).length}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Затронутых компонентов
          </p>
        </motion.div>
      </div>

      {/* Частые ошибки */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Частые ошибки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(stats.mostCommon || []).map(({ type, count }) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                errorTypeColors[type] || 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setSelectedErrorType(type)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{errorTypeIcons[type]}</span>
                  <span className="font-medium capitalize">{type}</span>
                </div>
                <span className="text-sm bg-white bg-opacity-50 px-2 py-1 rounded">
                  {count} раз
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Рекомендации */}
      <AnimatePresence>
        {selectedErrorType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Рекомендации по исправлению
              </h3>
              <button
                onClick={() => setSelectedErrorType(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                {(getErrorSuggestions(selectedErrorType) || []).map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <span className="text-indigo-600">•</span>
                    <span>{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Последние ошибки */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Последние ошибки</h3>
          <span className="text-sm text-gray-500">
            Показано {filteredErrors.length} из {stats.recent?.length || 0}
          </span>
        </div>
        <div className="space-y-4">
          {filteredErrors.length > 0 ? (
            filteredErrors.map(error => (
              <motion.div
                key={error.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 rounded text-sm ${
                        errorTypeColors[error.type] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {errorTypeIcons[error.type]} {error.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(error.timestamp)}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{error.message}</p>
                  </div>
                </div>
                {error.component && (
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                    <span>📦</span>
                    <span>Компонент: {error.component}</span>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'Нет ошибок, соответствующих поиску' : 'Нет ошибок в выбранном периоде'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAnalysis; 