import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

function SortExercise({ items, correctOrder, onComplete }) {
  const [sortedItems, setSortedItems] = useState([...items]);
  const [feedback, setFeedback] = useState(null);

  const checkOrder = () => {
    const isCorrect = sortedItems.every((item, index) => item === correctOrder[index]);
    setFeedback(isCorrect);
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-4">
        Расставьте элементы в правильном порядке, перетаскивая их
      </p>

      <Reorder.Group axis="y" values={sortedItems} onReorder={setSortedItems}>
        {sortedItems.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            className="bg-white p-4 rounded-lg shadow mb-2 cursor-move"
          >
            <motion.div
              whileDrag={{ scale: 1.05 }}
              className="flex items-center"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                <span className="text-gray-600 text-sm">⋮⋮</span>
              </div>
              <span>{item}</span>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={checkOrder}
          className="btn-primary"
        >
          Проверить порядок
        </button>
      </div>

      {feedback !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center ${
            feedback ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {feedback ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
          ) : (
            <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
          )}
          <span>
            {feedback
              ? "Отлично! Элементы расположены в правильном порядке!"
              : "Попробуйте еще раз! Порядок неверный."}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export default SortExercise; 