import React from 'react';
import FriendsProgress from '../components/FriendsProgress';

function FriendsProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
            👥 Прогресс друзей
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Следите за прогрессом ваших друзей в изучении Python
          </p>
        </div>
        
        <FriendsProgress />
      </div>
    </div>
  );
}

export default FriendsProgressPage; 