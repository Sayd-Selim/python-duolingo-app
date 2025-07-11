import React from 'react';
import FriendsList from '../components/FriendsList';
import Leaderboard from '../components/Leaderboard';
import { motion } from 'framer-motion';

const SocialPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Социальные функции</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FriendsList />
        <Leaderboard />
      </div>
    </motion.div>
  );
};

export default SocialPage; 