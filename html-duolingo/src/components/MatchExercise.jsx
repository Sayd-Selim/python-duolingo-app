import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function MatchExercise({ question, pairs, answer, onComplete }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const tags = pairs.map(pair => pair.tag);
  const purposes = pairs.map(pair => pair.purpose);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const handlePurposeSelect = (purpose) => {
    if (selectedTag) {
      const newMatch = [selectedTag, purpose];
      setMatches([...matches, newMatch]);
      setSelectedTag(null);
      setSelectedPurpose(null);

      // Проверяем, все ли пары сопоставлены
      if (matches.length + 1 === pairs.length) {
        setShowFeedback(true);
        const isCorrect = matches.every(([tag, purpose]) => {
          const correctPair = answer.find(([a, b]) => a === tag && b === purpose);
          return !!correctPair;
        });
        onComplete(isCorrect);
      }
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Теги</h3>
          {tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTagSelect(tag)}
              disabled={matches.some(match => match[0] === tag)}
              className={`w-full p-3 text-left rounded-lg border ${
                selectedTag === tag
                  ? 'border-green-500 bg-green-50'
                  : matches.some(match => match[0] === tag)
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-green-500'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Назначение</h3>
          {purposes.map((purpose) => (
            <motion.button
              key={purpose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePurposeSelect(purpose)}
              disabled={matches.some(match => match[1] === purpose)}
              className={`w-full p-3 text-left rounded-lg border ${
                selectedPurpose === purpose
                  ? 'border-green-500 bg-green-50'
                  : matches.some(match => match[1] === purpose)
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-green-500'
              }`}
            >
              {purpose}
            </motion.button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-green-50"
        >
          <p className="text-sm">
            Отлично! Вы правильно сопоставили все теги с их назначением.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default MatchExercise; 