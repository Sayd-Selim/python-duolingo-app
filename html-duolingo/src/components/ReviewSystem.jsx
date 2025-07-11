import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReview } from '../context/ReviewContext';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewSystem = () => {
  const navigate = useNavigate();
  const {
    reviews,
    flashcards,
    tests,
    getDueReviews,
    getDueFlashcards,
    getDueTests,
    updateReview,
    updateFlashcard,
    updateTest
  } = useReview();

  const [activeTab, setActiveTab] = useState('reviews');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const dueReviews = getDueReviews();
  const dueFlashcards = getDueFlashcards();
  const dueTests = getDueTests();

  const handleReviewComplete = (success) => {
    if (activeTab === 'reviews' && dueReviews[currentIndex]) {
      updateReview(dueReviews[currentIndex].id, success);
    } else if (activeTab === 'flashcards' && dueFlashcards[currentIndex]) {
      updateFlashcard(dueFlashcards[currentIndex].id, success);
    }
    setShowAnswer(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleTestSubmit = () => {
    if (activeTab === 'tests' && dueTests[currentIndex]) {
      const test = dueTests[currentIndex];
      const correctAnswers = test.questions.filter(
        (q, i) => q.correctAnswer === selectedAnswers[i]
      ).length;
      const score = (correctAnswers / test.questions.length) * 100;
      updateTest(test.id, score);
      setSelectedAnswers({});
      setCurrentIndex(prev => prev + 1);
    }
  };

  const renderReview = () => {
    if (currentIndex >= dueReviews.length) {
      return (
        <div className="text-center p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Повторения завершены!</h3>
          <p className="text-gray-600">Вернитесь позже для новых повторений.</p>
        </div>
      );
    }

    const review = dueReviews[currentIndex];
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{review.lessonTitle}</h3>
          <p className="text-sm text-gray-600">{review.levelTitle}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleReviewComplete(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Нужно повторить
          </button>
          <button
            onClick={() => handleReviewComplete(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Знаю хорошо
          </button>
        </div>
      </div>
    );
  };

  const renderFlashcard = () => {
    if (currentIndex >= dueFlashcards.length) {
      return (
        <div className="text-center p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Карточки завершены!</h3>
          <p className="text-gray-600">Вернитесь позже для новых карточек.</p>
        </div>
      );
    }

    const card = dueFlashcards[currentIndex];
    return (
      <motion.div
        initial={false}
        animate={{ rotateY: showAnswer ? 180 : 0 }}
        className="p-6 bg-white rounded-xl shadow-lg cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className="flex flex-col items-center justify-center h-48">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            {showAnswer ? card.back : card.front}
          </h3>
          <p className="text-sm text-gray-500">
            {showAnswer ? 'Нажмите для переворота' : 'Нажмите для ответа'}
          </p>
        </div>
        {showAnswer && (
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReviewComplete(false);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Нужно повторить
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReviewComplete(true);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Знаю хорошо
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  const renderTest = () => {
    if (currentIndex >= dueTests.length) {
      return (
        <div className="text-center p-8">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Тесты завершены!</h3>
          <p className="text-gray-600">Вернитесь позже для новых тестов.</p>
        </div>
      );
    }

    const test = dueTests[currentIndex];
    return (
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{test.lessonTitle}</h3>
        <div className="space-y-4">
          {test.questions.map((question, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium text-gray-800">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={selectedAnswers[index] === option}
                      onChange={() => setSelectedAnswers(prev => ({
                        ...prev,
                        [index]: option
                      }))}
                      className="text-indigo-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleTestSubmit}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Завершить тест
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setActiveTab('reviews');
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'reviews'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Повторения ({dueReviews.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('flashcards');
            setCurrentIndex(0);
            setShowAnswer(false);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'flashcards'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Карточки ({dueFlashcards.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('tests');
            setCurrentIndex(0);
            setSelectedAnswers({});
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'tests'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Тесты ({dueTests.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'reviews' && renderReview()}
          {activeTab === 'flashcards' && renderFlashcard()}
          {activeTab === 'tests' && renderTest()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ReviewSystem; 