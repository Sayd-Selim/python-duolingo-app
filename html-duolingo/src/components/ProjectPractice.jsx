import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectPractice = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectProgress, setProjectProgress] = useState({});

  const projects = [
    {
      id: 1,
      title: 'Личный блог',
      description: 'Создайте современный блог с использованием HTML5',
      difficulty: 'Средний',
      timeEstimate: '2-3 часа',
      skills: ['HTML5', 'Семантическая верстка', 'Формы', 'Мультимедиа'],
      requirements: [
        'Главная страница с последними постами',
        'Страница "Обо мне"',
        'Форма подписки на новости',
        'Галерея изображений',
        'Адаптивный дизайн'
      ],
      resources: [
        'Шаблоны HTML5',
        'Примеры блогов',
        'Руководство по семантической верстке'
      ]
    },
    {
      id: 2,
      title: 'Интернет-магазин',
      description: 'Разработайте главную страницу интернет-магазина',
      difficulty: 'Сложный',
      timeEstimate: '4-5 часов',
      skills: ['HTML5', 'Формы', 'Таблицы', 'Мультимедиа', 'Структура данных'],
      requirements: [
        'Каталог товаров',
        'Корзина покупок',
        'Фильтры и поиск',
        'Страница товара',
        'Форма обратной связи'
      ],
      resources: [
        'Шаблоны интернет-магазинов',
        'Примеры каталогов',
        'Руководство по формам'
      ]
    },
    {
      id: 3,
      title: 'Портфолио',
      description: 'Создайте персональное портфолио',
      difficulty: 'Начинающий',
      timeEstimate: '1-2 часа',
      skills: ['HTML5', 'Структура', 'Мультимедиа'],
      requirements: [
        'Главная страница',
        'Раздел проектов',
        'Контактная информация',
        'Галерея работ'
      ],
      resources: [
        'Шаблоны портфолио',
        'Примеры галерей',
        'Руководство по структуре'
      ]
    }
  ];

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleProjectComplete = (projectId) => {
    setProjectProgress(prev => ({
      ...prev,
      [projectId]: 'completed'
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Проектные задания</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer ${
              projectProgress[project.id] === 'completed' ? 'border-2 border-green-500' : ''
            }`}
            onClick={() => handleProjectSelect(project)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  project.difficulty === 'Сложный' ? 'bg-red-100 text-red-800' :
                  project.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-2">⏱️</span>
                {project.timeEstimate}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {projectProgress[project.id] === 'completed' && (
                <div className="text-green-600 font-semibold">✓ Выполнено</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Требования</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {selectedProject.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ресурсы</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {selectedProject.resources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => handleProjectComplete(selectedProject.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Отметить как выполненное
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPractice; 