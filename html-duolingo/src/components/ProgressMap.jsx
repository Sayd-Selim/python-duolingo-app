import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProgressMap = ({ units, currentUnit }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 w-64 z-30">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Прогресс обучения</h3>
      <div className="space-y-2">
        {units.map((unit, index) => {
          const isCompleted = unit.progress === 100;
          const isCurrent = unit.id === currentUnit;
          const isLocked = !isCompleted && index > 0 && units[index - 1].progress < 100;

          return (
            <Link
              key={unit.id}
              to={isLocked ? '#' : `/level/1/unit/${unit.id}`}
              className={`block relative ${
                isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <motion.div
                whileHover={!isLocked ? { scale: 1.02 } : {}}
                className={`p-3 rounded-lg ${
                  isCompleted
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : isCurrent
                    ? 'bg-gradient-to-r from-indigo-400 to-indigo-500'
                    : isLocked
                    ? 'bg-gray-100'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-lg ${isLocked ? 'opacity-50' : ''}`}>
                    {unit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        isCompleted || isCurrent ? 'text-white' : 'text-gray-700'
                      }`}>
                        {unit.title}
                      </span>
                      <span className={`text-xs ${
                        isCompleted || isCurrent ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {unit.progress}%
                      </span>
                    </div>
                    <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${unit.progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                </div>
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                    <span className="text-white text-sm">🔒</span>
                  </div>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressMap; 