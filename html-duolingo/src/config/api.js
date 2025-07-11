// API Configuration
// Замените этот URL на ваш ngrok URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://e638eece72bb.ngrok-free.app';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/login`,
  REGISTER: `${API_BASE_URL}/api/register`,
  
  // Progress
  PROGRESS: `${API_BASE_URL}/api/progress`,
  USER_PROGRESS: (userId) => `${API_BASE_URL}/api/progress/${userId}`,
  
  // Users
  USERS: `${API_BASE_URL}/api/users`,
  ALL_USERS: `${API_BASE_URL}/api/users/all`,
  USER_LESSONS: (userId) => `${API_BASE_URL}/api/user/${userId}/lessons`,
  USER_ACTIVITY: (userId) => `${API_BASE_URL}/api/user/${userId}/activity`,
};

export default API_BASE_URL; 