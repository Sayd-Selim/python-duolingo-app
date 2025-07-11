import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет! Как дела с изучением HTML?',
      sender: 'Анна',
      time: '10:30',
      type: 'message'
    },
    {
      id: 2,
      text: 'Привет! Пока всё хорошо, но есть вопросы по тегам.',
      sender: 'Вы',
      time: '10:31',
      type: 'message'
    },
    {
      id: 3,
      text: 'Какой тег используется для создания списка?',
      sender: 'Вы',
      time: '10:32',
      type: 'question'
    },
    {
      id: 4,
      text: 'Для создания списка используются теги <ul> (маркированный список) и <ol> (нумерованный список).',
      sender: 'Михаил',
      time: '10:33',
      type: 'answer'
    }
  ]);

  const [onlineUsers, setOnlineUsers] = useState([
    { id: 1, name: 'Анна', status: 'online' },
    { id: 2, name: 'Михаил', status: 'online' },
    { id: 3, name: 'Дмитрий', status: 'offline' }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'Вы',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const renderMessage = (msg) => {
    const isUser = msg.sender === 'Вы';
    const messageClasses = {
      message: 'bg-white',
      question: 'bg-yellow-50 border-l-4 border-yellow-400',
      answer: 'bg-green-50 border-l-4 border-green-400'
    };

    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-lg p-4 shadow ${
            messageClasses[msg.type] || messageClasses.message
          }`}
        >
          {!isUser && (
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <span className="font-medium text-gray-900">{msg.sender}</span>
            </div>
          )}
          <p className="text-gray-800">{msg.text}</p>
          <span className="text-xs text-gray-500 mt-2 block">
            {msg.time}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Чат</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {onlineUsers.filter(user => user.status === 'online').length} онлайн
              </span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <div className="h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                <AnimatePresence>
                  {messages.map(renderMessage)}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Отправить
                </button>
              </form>
            </div>

            <div className="w-64">
              <h3 className="font-medium text-gray-900 mb-4">Онлайн пользователи</h3>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 