import React, { useEffect, useState } from 'react';
import { useReview } from '../context/ReviewContext';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewNotifications = () => {
  const { getDueReviews, getDueFlashcards, getDueTests } = useReview();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkDueItems = () => {
      const dueReviews = getDueReviews();
      const dueFlashcards = getDueFlashcards();
      const dueTests = getDueTests();

      const newNotifications = [];

      if (dueReviews.length > 0) {
        newNotifications.push({
          type: 'review',
          count: dueReviews.length,
          message: `У вас есть ${dueReviews.length} уроков для повторения`
        });
      }

      if (dueFlashcards.length > 0) {
        newNotifications.push({
          type: 'flashcard',
          count: dueFlashcards.length,
          message: `У вас есть ${dueFlashcards.length} карточек для повторения`
        });
      }

      if (dueTests.length > 0) {
        newNotifications.push({
          type: 'test',
          count: dueTests.length,
          message: `У вас есть ${dueTests.length} тестов для прохождения`
        });
      }

      setNotifications(newNotifications);
    };

    // Проверяем сразу при монтировании
    checkDueItems();

    // Проверяем каждый час
    const interval = setInterval(checkDueItems, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [getDueReviews, getDueFlashcards, getDueTests]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl"
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Уведомления
              </h3>
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          notification.type === 'review'
                            ? 'bg-blue-100 text-blue-600'
                            : notification.type === 'flashcard'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-purple-100 text-purple-600'
                        }`}
                      >
                        {notification.type === 'review' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        )}
                        {notification.type === 'flashcard' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        )}
                        {notification.type === 'test' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">
                        {notification.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewNotifications; 