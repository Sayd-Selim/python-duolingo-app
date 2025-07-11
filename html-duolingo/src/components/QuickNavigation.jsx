import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import { motion, AnimatePresence } from 'framer-motion';

const QuickNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    lessonsStructure,
    bookmarks,
    recentLessons,
    searchQuery,
    addBookmark,
    removeBookmark,
    searchLessons
  } = useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('recent'); // 'recent', 'bookmarks', 'search'

  const handleSearch = (query) => {
    const results = searchLessons(query);
    setSearchResults(results);
  };

  const handleLessonClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleBookmark = (lesson) => {
    const isBookmarked = bookmarks.some(b => b.id === lesson.id);
    if (isBookmarked) {
      removeBookmark(lesson.id);
    } else {
      addBookmark(lesson);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
      >
        <span className="text-xl">🔍</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                  <input
                    type="text"
                    placeholder="Поиск уроков..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('recent')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'recent'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Недавние
                  </button>
                  <button
                    onClick={() => setActiveTab('bookmarks')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'bookmarks'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Закладки
                  </button>
                  <button
                    onClick={() => setActiveTab('search')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'search'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Поиск
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto p-4">
                {activeTab === 'recent' && (
                  <div className="space-y-2">
                    {recentLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => handleLessonClick(lesson.path)}
                          className="flex-1 text-left"
                        >
                          <p className="font-medium text-gray-800">{lesson.title}</p>
                          <p className="text-sm text-gray-600">{lesson.levelTitle}</p>
                        </button>
                        <button
                          onClick={() => toggleBookmark(lesson)}
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          {bookmarks.some(b => b.id === lesson.id) ? '⭐' : '☆'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="space-y-2">
                    {bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => handleLessonClick(bookmark.path)}
                          className="flex-1 text-left"
                        >
                          <p className="font-medium text-gray-800">{bookmark.title}</p>
                          <p className="text-sm text-gray-600">{bookmark.levelTitle}</p>
                        </button>
                        <button
                          onClick={() => toggleBookmark(bookmark)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          ⭐
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'search' && (
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <button
                          onClick={() => handleLessonClick(result.path)}
                          className="flex-1 text-left"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{result.levelIcon}</span>
                            <div>
                              <p className="font-medium text-gray-800">{result.title}</p>
                              <p className="text-sm text-gray-600">{result.levelTitle}</p>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => toggleBookmark(result)}
                          className="text-gray-400 hover:text-yellow-500"
                        >
                          {bookmarks.some(b => b.id === result.id) ? '⭐' : '☆'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickNavigation; 