import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SocialChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  // Имитация получения сообщений
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        user: 'Анна',
        text: 'Привет! Кто-нибудь может помочь с HTML тегами?',
        timestamp: new Date(Date.now() - 3600000),
        type: 'question'
      },
      {
        id: 2,
        user: 'Михаил',
        text: 'Конечно! Какие именно теги вас интересуют?',
        timestamp: new Date(Date.now() - 3500000),
        type: 'answer'
      },
      {
        id: 3,
        user: 'Анна',
        text: 'Как правильно использовать div и span?',
        timestamp: new Date(Date.now() - 3400000),
        type: 'question'
      }
    ];

    const mockUsers = [
      { id: 1, name: 'Анна', status: 'online', level: 3 },
      { id: 2, name: 'Михаил', status: 'online', level: 5 },
      { id: 3, name: 'Дмитрий', status: 'offline', level: 2 }
    ];

    setMessages(mockMessages);
    setUsers(mockUsers);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      user: 'Вы',
      text: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const renderMessage = (message) => {
    const isQuestion = message.type === 'question';
    const isAnswer = message.type === 'answer';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${message.user === 'Вы' ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            message.user === 'Вы'
              ? 'bg-indigo-600 text-white'
              : isQuestion
              ? 'bg-yellow-100 text-yellow-800'
              : isAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          <div className="flex items-center mb-1">
            <span className="font-medium">{message.user}</span>
            <span className="text-xs ml-2 opacity-70">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <p>{message.text}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'chat'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Чат
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Пользователи
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'groups'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Группы
          </button>
        </div>

        <div className="h-[600px] flex">
          {/* Список пользователей */}
          <div
            className={`w-64 border-r ${
              activeTab === 'users' ? 'block' : 'hidden'
            }`}
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Пользователи онлайн
              </h3>
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`flex items-center p-2 rounded-lg cursor-pointer ${
                      selectedUser?.id === user.id
                        ? 'bg-indigo-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        user.status === 'online'
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        Уровень {user.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Чат */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <div key={message.id}>{renderMessage(message)}</div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSendMessage}
              className="border-t p-4 bg-gray-50"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialChat; 