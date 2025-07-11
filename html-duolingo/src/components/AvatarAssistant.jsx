import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalization } from '../context/PersonalizationContext';

const AvatarAssistant = () => {
  const { avatar, updateAvatar } = usePersonalization();
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = {
    happy: [
      'Отличная работа! Продолжайте в том же духе!',
      'Вы делаете большие успехи!',
      'Давайте разберем следующую тему?'
    ],
    thinking: [
      'Хмм, давайте подумаем...',
      'Интересная задача!',
      'Я помогу вам разобраться с этим.'
    ],
    excited: [
      'Вау! Это потрясающе!',
      'Вы справились с задачей!',
      'Так держать!'
    ]
  };

  const getRandomMessage = (mood) => {
    const moodMessages = messages[mood] || messages.happy;
    return moodMessages[Math.floor(Math.random() * moodMessages.length)];
  };

  const showMessage = (mood) => {
    setIsTyping(true);
    const newMessage = getRandomMessage(mood);
    setMessage(newMessage);
    setTimeout(() => setIsTyping(false), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showMessage(avatar.mood);
    }, 10000);

    return () => clearInterval(interval);
  }, [avatar.mood]);

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  };

  const messageVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  const getAvatarEmoji = () => {
    switch (avatar.type) {
      case 'robot':
        return '🤖';
      case 'cat':
        return '🐱';
      case 'dog':
        return '🐶';
      case 'owl':
        return '🦉';
      default:
        return '🤖';
    }
  };

  const getMoodEmoji = () => {
    switch (avatar.mood) {
      case 'happy':
        return '😊';
      case 'thinking':
        return '🤔';
      case 'excited':
        return '🎉';
      default:
        return '😊';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={avatarVariants}
        >
          <div className="relative">
            <motion.div
              className="bg-white rounded-full p-4 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              onClick={() => showMessage(avatar.mood)}
            >
              <div className="text-4xl">
                {getAvatarEmoji()}
                {getMoodEmoji()}
              </div>
            </motion.div>

            <AnimatePresence>
              {message && (
                <motion.div
                  className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg p-3"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0">
                      {getAvatarEmoji()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {avatar.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isTyping ? 'Печатает...' : message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 text-xs"
            onClick={() => setIsVisible(false)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AvatarAssistant; 