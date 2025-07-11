import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);

// Интервалы повторения (в днях)
const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [tests, setTests] = useState([]);

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const savedFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    const savedTests = JSON.parse(localStorage.getItem('tests')) || [];
    
    setReviews(savedReviews);
    setFlashcards(savedFlashcards);
    setTests(savedTests);
  }, []);

  // Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    localStorage.setItem('tests', JSON.stringify(tests));
  }, [reviews, flashcards, tests]);

  // Добавление урока для повторения
  const addReview = (lesson) => {
    const newReview = {
      id: Date.now(),
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      levelTitle: lesson.levelTitle,
      path: lesson.path,
      nextReview: new Date(Date.now() + REVIEW_INTERVALS[0] * 24 * 60 * 60 * 1000),
      intervalIndex: 0,
      completed: false,
      lastReviewed: new Date(),
      reviewCount: 0
    };

    setReviews(prev => [...prev, newReview]);
  };

  // Обновление статуса повторения
  const updateReview = (reviewId, success) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const newIntervalIndex = success 
          ? Math.min(review.intervalIndex + 1, REVIEW_INTERVALS.length - 1)
          : Math.max(review.intervalIndex - 1, 0);

        return {
          ...review,
          nextReview: new Date(Date.now() + REVIEW_INTERVALS[newIntervalIndex] * 24 * 60 * 60 * 1000),
          intervalIndex: newIntervalIndex,
          lastReviewed: new Date(),
          reviewCount: review.reviewCount + 1,
          completed: newIntervalIndex === REVIEW_INTERVALS.length - 1
        };
      }
      return review;
    }));
  };

  // Добавление карточки для запоминания
  const addFlashcard = (lesson, front, back) => {
    const newFlashcard = {
      id: Date.now(),
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      front,
      back,
      nextReview: new Date(Date.now() + REVIEW_INTERVALS[0] * 24 * 60 * 60 * 1000),
      intervalIndex: 0,
      lastReviewed: new Date(),
      reviewCount: 0
    };

    setFlashcards(prev => [...prev, newFlashcard]);
  };

  // Обновление статуса карточки
  const updateFlashcard = (flashcardId, success) => {
    setFlashcards(prev => prev.map(card => {
      if (card.id === flashcardId) {
        const newIntervalIndex = success 
          ? Math.min(card.intervalIndex + 1, REVIEW_INTERVALS.length - 1)
          : Math.max(card.intervalIndex - 1, 0);

        return {
          ...card,
          nextReview: new Date(Date.now() + REVIEW_INTERVALS[newIntervalIndex] * 24 * 60 * 60 * 1000),
          intervalIndex: newIntervalIndex,
          lastReviewed: new Date(),
          reviewCount: card.reviewCount + 1
        };
      }
      return card;
    }));
  };

  // Добавление теста
  const addTest = (lesson, questions) => {
    const newTest = {
      id: Date.now(),
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      questions,
      nextReview: new Date(Date.now() + REVIEW_INTERVALS[0] * 24 * 60 * 60 * 1000),
      lastTaken: null,
      bestScore: 0,
      attempts: 0
    };

    setTests(prev => [...prev, newTest]);
  };

  // Обновление результатов теста
  const updateTest = (testId, score) => {
    setTests(prev => prev.map(test => {
      if (test.id === testId) {
        const newIntervalIndex = score >= 80 
          ? Math.min(test.intervalIndex + 1, REVIEW_INTERVALS.length - 1)
          : Math.max(test.intervalIndex - 1, 0);

        return {
          ...test,
          nextReview: new Date(Date.now() + REVIEW_INTERVALS[newIntervalIndex] * 24 * 60 * 60 * 1000),
          lastTaken: new Date(),
          bestScore: Math.max(test.bestScore, score),
          attempts: test.attempts + 1
        };
      }
      return test;
    }));
  };

  // Получение уроков для повторения
  const getDueReviews = () => {
    const now = new Date();
    return reviews.filter(review => 
      new Date(review.nextReview) <= now && !review.completed
    );
  };

  // Получение карточек для повторения
  const getDueFlashcards = () => {
    const now = new Date();
    return flashcards.filter(card => 
      new Date(card.nextReview) <= now
    );
  };

  // Получение тестов для повторения
  const getDueTests = () => {
    const now = new Date();
    return tests.filter(test => 
      new Date(test.nextReview) <= now
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        flashcards,
        tests,
        addReview,
        updateReview,
        addFlashcard,
        updateFlashcard,
        addTest,
        updateTest,
        getDueReviews,
        getDueFlashcards,
        getDueTests
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}; 