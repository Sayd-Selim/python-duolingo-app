import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GroupTasks = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Создание адаптивного меню',
      description: 'Создайте адаптивное меню навигации с использованием HTML и CSS',
      participants: ['Анна', 'Михаил', 'Дмитрий'],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      progress: 60
    },
    {
      id: 2,
      title: 'Форма обратной связи',
      description: 'Разработайте форму обратной связи с валидацией на JavaScript',
      participants: ['Анна', 'Михаил'],
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'active',
      progress: 30
    },
    {
      id: 3,
      title: 'Галерея изображений',
      description: 'Создайте галерею изображений с модальным окном',
      participants: ['Дмитрий', 'Михаил'],
      deadline: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed',
      progress: 100
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    participants: []
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'active',
      progress: 0
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      deadline: '',
      participants: []
    });
  };

  const renderTask = (task) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            task.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {task.status === 'active' ? 'Активно' : 'Завершено'}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Прогресс</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Участники:</span>
            <div className="flex -space-x-2">
              {task.participants.map((participant, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium"
                >
                  {participant[0]}
                </div>
              ))}
            </div>
          </div>
          <span className="text-gray-600">
            Дедлайн: {task.deadline.toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'active'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Активные задания
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Завершенные
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'create'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Создать задание
        </button>
      </div>

      {activeTab === 'create' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Создать групповое задание
          </h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Название задания
              </label>
              <input
                type="text"
                id="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Описание
              </label>
              <textarea
                id="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Дедлайн
              </label>
              <input
                type="date"
                id="deadline"
                value={newTask.deadline}
                onChange={(e) =>
                  setNewTask({ ...newTask, deadline: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Создать задание
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {tasks
            .filter((task) => task.status === activeTab)
            .map((task) => renderTask(task))}
        </div>
      )}
    </div>
  );
};

export default GroupTasks; 