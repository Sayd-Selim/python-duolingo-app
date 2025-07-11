import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { motion, AnimatePresence } from 'framer-motion';

const FriendsList = () => {
  const { friends, addFriend, removeFriend } = useSocial();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = () => {
    const newFriendId = Date.now();
    addFriend(newFriendId);
    setShowAddFriend(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Друзья</h2>
        <button
          onClick={() => setShowAddFriend(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Добавить друга
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск друзей..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredFriends.map((friend) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <span className="text-2xl">{friend.avatar}</span>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{friend.name}</h3>
                  <p className="text-sm text-gray-600">
                    Уровень {friend.level} • {friend.xp} XP
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {friend.streak} 🔥
                </span>
                <button
                  onClick={() => removeFriend(friend.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Добавить нового друга
            </h3>
            <p className="text-gray-600 mb-4">
              Введите ID пользователя, которого хотите добавить в друзья
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleAddFriend}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Добавить
              </button>
              <button
                onClick={() => setShowAddFriend(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FriendsList; 