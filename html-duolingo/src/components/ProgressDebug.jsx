import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const ProgressDebug = () => {
  const { 
    completedLessons, 
    lessonProgress, 
    getCourseProgress, 
    getCompletedLessonsCount,
    allUsersProgress 
  } = useProgress();
  
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4">
      <h2 className="text-xl font-bold mb-4">🔍 Отладка прогресса</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Пользователь:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Завершенные уроки:</h3>
          <div className="bg-blue-50 p-2 rounded">
            {completedLessons.length > 0 ? (
              <span className="text-blue-700">
                {completedLessons.join(', ')}
              </span>
            ) : (
              <span className="text-gray-500">Нет завершенных уроков</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Прогресс по урокам:</h3>
          <div className="bg-green-50 p-2 rounded">
            {Object.keys(lessonProgress).length > 0 ? (
              <div className="space-y-1">
                {Object.entries(lessonProgress).map(([lessonId, progress]) => (
                  <div key={lessonId} className="text-sm">
                    Урок {lessonId}: {progress}%
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">Нет данных о прогрессе</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Общий прогресс курса:</h3>
          <div className="bg-purple-50 p-2 rounded">
            <span className="text-purple-700 font-bold">
              {getCourseProgress(0)}% ({getCompletedLessonsCount()} из 15 уроков)
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Прогресс всех пользователей:</h3>
          <div className="bg-yellow-50 p-2 rounded max-h-40 overflow-auto">
            {allUsersProgress.length > 0 ? (
              <div className="space-y-1">
                {allUsersProgress.map((userProgress, index) => (
                  <div key={index} className="text-sm">
                    {userProgress.user?.name}: {userProgress.lessons?.length || 0} уроков
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">Нет данных о других пользователях</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Действия:</h3>
          <div className="space-x-2">
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Обновить страницу
            </button>
            <button 
              onClick={() => {
                console.log('=== ОТЛАДКА ПРОГРЕССА ===');
                console.log('User:', user);
                console.log('Completed lessons:', completedLessons);
                console.log('Lesson progress:', lessonProgress);
                console.log('All users progress:', allUsersProgress);
              }}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Логи в консоль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDebug; 