import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';

const CollaborationHub = () => {
  const { user } = useUser();
  const [activeSessions, setActiveSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');

  // Имитация загрузки активных сессий
  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setActiveSessions([
      {
        id: '1',
        name: 'Создание портфолио',
        owner: 'Иван Петров',
        participants: 3,
        lastActivity: '2 минуты назад'
      },
      {
        id: '2',
        name: 'Учебный проект',
        owner: 'Мария Сидорова',
        participants: 2,
        lastActivity: '5 минут назад'
      }
    ]);

    setMySessions([
      {
        id: '3',
        name: 'Мой первый сайт',
        participants: 1,
        lastActivity: '10 минут назад'
      }
    ]);
  }, []);

  const createNewSession = () => {
    if (newSessionName.trim()) {
      const newSession = {
        id: Date.now().toString(),
        name: newSessionName,
        participants: 1,
        lastActivity: 'только что'
      };
      setMySessions([newSession, ...mySessions]);
      setNewSessionName('');
      setShowCreateModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Совместная работа</h1>
        <p className="text-gray-600">
          Создавайте совместные проекты и работайте над ними вместе с другими пользователями
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Мои сессии */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Мои сессии</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
            >
              + Создать сессию
            </button>
          </div>
          <div className="space-y-4">
            {mySessions.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{session.name}</h3>
                    <p className="text-sm text-gray-500">
                      {session.participants} участник • {session.lastActivity}
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.href = `/mini-site/${session.id}?collaborate=true`}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Присоединиться
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Активные сессии */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Активные сессии</h2>
          <div className="space-y-4">
            {activeSessions.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{session.name}</h3>
                    <p className="text-sm text-gray-500">
                      Владелец: {session.owner} • {session.participants} участников • {session.lastActivity}
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.href = `/mini-site/${session.id}?collaborate=true`}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                  >
                    Присоединиться
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно создания сессии */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Создать новую сессию</h3>
            <input
              type="text"
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="Название сессии"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Отмена
              </button>
              <button
                onClick={createNewSession}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationHub; 