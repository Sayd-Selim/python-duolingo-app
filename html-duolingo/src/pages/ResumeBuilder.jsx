import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('resume');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    experience: [],
    education: [],
    skills: []
  });

  const [portfolioData, setPortfolioData] = useState({
    projects: [],
    about: '',
    contact: {
      email: '',
      github: '',
      linkedin: ''
    }
  });

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: '', position: '', period: '', description: '' }
      ]
    });
  };

  const addProject = () => {
    setPortfolioData({
      ...portfolioData,
      projects: [
        ...portfolioData.projects,
        { title: '', description: '', technologies: '', link: '' }
      ]
    });
  };

  const updateResumeField = (section, index, field, value) => {
    if (section === 'personalInfo') {
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          [field]: value
        }
      });
    } else {
      const newSection = [...resumeData[section]];
      newSection[index] = { ...newSection[index], [field]: value };
      setResumeData({
        ...resumeData,
        [section]: newSection
      });
    }
  };

  const updatePortfolioField = (section, index, field, value) => {
    if (section === 'about' || section === 'contact') {
      setPortfolioData({
        ...portfolioData,
        [section]: section === 'contact' 
          ? { ...portfolioData.contact, [field]: value }
          : value
      });
    } else {
      const newProjects = [...portfolioData.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      setPortfolioData({
        ...portfolioData,
        projects: newProjects
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Создание резюме и портфолио</h1>

      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'resume' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('resume')}
        >
          Резюме
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'portfolio' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('portfolio')}
        >
          Портфолио
        </button>
      </div>

      {activeTab === 'resume' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Личная информация</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Имя"
                value={resumeData.personalInfo.name}
                onChange={(e) => updateResumeField('personalInfo', null, 'name', e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updateResumeField('personalInfo', null, 'email', e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updateResumeField('personalInfo', null, 'phone', e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Местоположение"
                value={resumeData.personalInfo.location}
                onChange={(e) => updateResumeField('personalInfo', null, 'location', e.target.value)}
                className="border rounded p-2"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Опыт работы</h2>
              <button
                onClick={addExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Добавить опыт
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Компания"
                    value={exp.company}
                    onChange={(e) => updateResumeField('experience', index, 'company', e.target.value)}
                    className="border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Должность"
                    value={exp.position}
                    onChange={(e) => updateResumeField('experience', index, 'position', e.target.value)}
                    className="border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Период"
                    value={exp.period}
                    onChange={(e) => updateResumeField('experience', index, 'period', e.target.value)}
                    className="border rounded p-2"
                  />
                  <textarea
                    placeholder="Описание"
                    value={exp.description}
                    onChange={(e) => updateResumeField('experience', index, 'description', e.target.value)}
                    className="border rounded p-2"
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">О себе</h2>
            <textarea
              placeholder="Расскажите о себе"
              value={portfolioData.about}
              onChange={(e) => updatePortfolioField('about', null, null, e.target.value)}
              className="w-full border rounded p-2"
              rows="4"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Проекты</h2>
              <button
                onClick={addProject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Добавить проект
              </button>
            </div>
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Название проекта"
                    value={project.title}
                    onChange={(e) => updatePortfolioField('projects', index, 'title', e.target.value)}
                    className="border rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Технологии"
                    value={project.technologies}
                    onChange={(e) => updatePortfolioField('projects', index, 'technologies', e.target.value)}
                    className="border rounded p-2"
                  />
                  <textarea
                    placeholder="Описание проекта"
                    value={project.description}
                    onChange={(e) => updatePortfolioField('projects', index, 'description', e.target.value)}
                    className="border rounded p-2"
                    rows="3"
                  />
                  <input
                    type="url"
                    placeholder="Ссылка на проект"
                    value={project.link}
                    onChange={(e) => updatePortfolioField('projects', index, 'link', e.target.value)}
                    className="border rounded p-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Контакты</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={portfolioData.contact.email}
                onChange={(e) => updatePortfolioField('contact', null, 'email', e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="url"
                placeholder="GitHub"
                value={portfolioData.contact.github}
                onChange={(e) => updatePortfolioField('contact', null, 'github', e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="url"
                placeholder="LinkedIn"
                value={portfolioData.contact.linkedin}
                onChange={(e) => updatePortfolioField('contact', null, 'linkedin', e.target.value)}
                className="border rounded p-2"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded"
          onClick={() => {
            // Здесь будет логика экспорта в PDF или HTML
            console.log(activeTab === 'resume' ? resumeData : portfolioData);
          }}
        >
          Экспортировать
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilder; 