import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/solid';

const levels = {
  1: {
    title: "Начальный",
    description: "Основы HTML и первые теги",
    units: [
      { id: 1, title: "Что такое HTML", xp: 10, completed: false },
      { id: 4, title: "Комментарии и отладка", xp: 15, completed: false }
    ]
  }
};

function Level() {
  const { levelId } = useParams();
  const level = levels[levelId];

  if (!level) return <div>Level not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="text-3xl font-bold mb-2">{level.title}</h1>
        <p className="text-gray-600 mb-8">{level.description}</p>

        <div className="space-y-4">
          {level.units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/level/${levelId}/unit/${unit.id}`}
                className={`block p-6 rounded-lg transition-colors ${
                  index === 0 || level.units[index - 1].completed
                    ? "bg-white hover:bg-gray-50 shadow-sm"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      unit.completed ? "bg-green-500" : "bg-gray-200"
                    }`}>
                      {unit.completed ? (
                        <span className="text-white">✓</span>
                      ) : (
                        <span className="text-gray-500">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{unit.title}</h3>
                      <p className="text-sm text-gray-500">{unit.xp} XP</p>
                    </div>
                  </div>
                  {index > 0 && !level.units[index - 1].completed && (
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Level; 