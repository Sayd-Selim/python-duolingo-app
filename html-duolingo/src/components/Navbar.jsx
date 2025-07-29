import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';

const Navbar = () => {
  const { user: appUser } = useUser();
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isJobPrepOpen, setIsJobPrepOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">🚀 S.P.E.G Academy</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* <Link
              to="/courses"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/courses')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              📚 Наши курсы
            </Link> */}
            <Link
              to="/reference"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Справочник Python
            </Link>
            {/* <Link
              to="/code-vs-design"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              🎨 Код vs Дизайн
            </Link> */}
            {/* <Link
              to="/dom-visualizer"
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              🌳 DOM-структура
            </Link> */}
            {/* <Link
              to="/achievements"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Достижения
            </Link> */}
            {/* <Link
              to="/friends-progress"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              👥 Друзья
            </Link> */}
            {/* <Link
              to="/social"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Социальные
            </Link> */}
            {/* <Link
              to="/motivation"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              🎯 Мотивация
            </Link> */}
            <Link
              to="/practice"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/practice')
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              💻 Практика
            </Link>

           
            {/* <Link
              to="/collaboration"
              className={`px-4 py-2 rounded-md transition-colors ${location.pathname === '/collaboration'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              👥 Совместная работа
            </Link> */}
            {/* <Link
              to="/support"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Поддержка
            </Link> */}
            {/* <Link
              to="/premium"
              className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium bg-green-50"
            >
              ⭐ Премиум
            </Link> */}

            {/* <Link
              to="/error-analysis"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/error-analysis'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Анализ ошибок
            </Link> */}


            {/* <Link
              to="/personalization"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/personalization'
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎨 Персонализация
            </Link> */}

            
            
            {/* <Notifications /> */}
            
            {/* {authUser && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="text-xl">{appUser.avatar}</span>
                  <span>{authUser.name}</span>
                </button>
                
              </div>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 