import React, { useState, useEffect, useCallback } from 'react';
import { usePersonalization } from '../context/PersonalizationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';

const MiniSite = () => {
  const { user } = useUser();
  const { miniSite, updateMiniSite } = usePersonalization();
  const [blocks, setBlocks] = useState(miniSite.blocks || []);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showHTML, setShowHTML] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [ws, setWs] = useState(null);
  const [lastCursorPosition, setLastCursorPosition] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [siteSettings, setSiteSettings] = useState({
    title: miniSite.title || 'Мой мини-сайт',
    description: miniSite.description || '',
    theme: miniSite.theme || 'light',
    layout: miniSite.layout || 'centered',
    backgroundColor: miniSite.backgroundColor || '#ffffff',
    textColor: miniSite.textColor || '#000000',
    accentColor: miniSite.accentColor || '#3b82f6',
    fontFamily: miniSite.fontFamily || 'Arial',
    fontSize: miniSite.fontSize || '16px',
    spacing: miniSite.spacing || 'normal'
  });

  const themes = {
    light: {
      background: '#ffffff',
      text: '#000000',
      accent: '#3b82f6'
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      accent: '#60a5fa'
    },
    nature: {
      background: '#f0fdf4',
      text: '#064e3b',
      accent: '#059669'
    },
    ocean: {
      background: '#f0f9ff',
      text: '#075985',
      accent: '#0284c7'
    }
  };

  const layouts = [
    { id: 'centered', name: 'Центрированный' },
    { id: 'left-aligned', name: 'По левому краю' },
    { id: 'right-aligned', name: 'По правому краю' },
    { id: 'grid', name: 'Сетка' }
  ];

  const tutorialSteps = [
    {
      title: "Добро пожаловать в конструктор HTML-страниц!",
      content: "Здесь вы научитесь создавать веб-страницы, изучая HTML на практике. Давайте начнем с выбора шаблона.",
      action: "Выберите шаблон 'Портфолио' для начала"
    },
    {
      title: "Добавление контента",
      content: "Теперь вы можете добавлять различные блоки: текст, изображения, код и ссылки. Каждый блок сопровождается подсказками по HTML-тегам.",
      action: "Попробуйте добавить текстовый блок"
    },
    {
      title: "Редактирование HTML",
      content: "В текстовых блоках вы можете использовать HTML-теги. Например, <h1> для заголовка, <p> для параграфа, <ul> и <li> для списков.",
      action: "Добавьте заголовок, используя тег <h1>"
    },
    {
      title: "Просмотр кода",
      content: "Нажмите кнопку 'Показать HTML', чтобы увидеть, как ваша страница выглядит в HTML-коде. Это поможет понять структуру веб-страницы.",
      action: "Нажмите 'Показать HTML'"
    },
    {
      title: "Настройка стилей",
      content: "Вы можете изменить тему и макет страницы. Попробуйте разные варианты, чтобы понять, как они влияют на внешний вид.",
      action: "Попробуйте изменить тему на 'Темная'"
    }
  ];

  const templates = [
    {
      id: 'portfolio',
      name: 'Портфолио',
      description: 'Создайте свое портфолио с проектами и навыками',
      blocks: [
        { 
          type: 'text', 
          content: '<h1>Мое Портфолио</h1><p>Привет! Я веб-разработчик.</p>',
          style: { padding: '2rem', backgroundColor: '#f3f4f6' }
        },
        { 
          type: 'text', 
          content: '<h2>Мои проекты</h2><ul><li>Проект 1</li><li>Проект 2</li></ul>',
          style: { padding: '1.5rem', backgroundColor: '#ffffff' }
        },
        { 
          type: 'text', 
          content: '<h2>Навыки</h2><ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>',
          style: { padding: '1.5rem', backgroundColor: '#f3f4f6' }
        }
      ]
    },
    {
      id: 'blog',
      name: 'Блог',
      description: 'Создайте свой блог с постами и комментариями',
      blocks: [
        { 
          type: 'text', 
          content: '<h1>Мой Блог</h1><p>Делимся мыслями и идеями</p>',
          style: { padding: '2rem', backgroundColor: '#f3f4f6' }
        },
        { 
          type: 'text', 
          content: '<article><h2>Первый пост</h2><p>Содержание поста...</p></article>',
          style: { padding: '1.5rem', backgroundColor: '#ffffff' }
        },
        { 
          type: 'text', 
          content: '<section><h3>Комментарии</h3><div>Ваш комментарий...</div></section>',
          style: { padding: '1.5rem', backgroundColor: '#f3f4f6' }
        }
      ]
    },
    {
      id: 'landing',
      name: 'Лендинг',
      description: 'Создайте продающую страницу для вашего продукта',
      blocks: [
        { 
          type: 'text', 
          content: '<h1>Наш Продукт</h1><p>Лучшее решение для вас</p>',
          style: { padding: '2rem', backgroundColor: '#f3f4f6' }
        },
        { 
          type: 'text', 
          content: '<section><h2>Преимущества</h2><ul><li>Преимущество 1</li><li>Преимущество 2</li></ul></section>',
          style: { padding: '1.5rem', backgroundColor: '#ffffff' }
        },
        { 
          type: 'text', 
          content: '<section><h2>Контакты</h2><p>Свяжитесь с нами</p></section>',
          style: { padding: '1.5rem', backgroundColor: '#f3f4f6' }
        }
      ]
    }
  ];

  const htmlTips = {
    text: [
      'Используйте <h1> - <h6> для заголовков',
      '<p> для параграфов',
      '<ul> и <li> для списков',
      '<strong> для жирного текста',
      '<em> для курсива',
      '<br> для переноса строки',
      '<hr> для горизонтальной линии'
    ],
    image: [
      'Всегда указывайте alt для доступности',
      'Используйте src для пути к изображению',
      'Можно задать width и height',
      'Используйте figure и figcaption для подписей',
      'Поддерживаются форматы: jpg, png, gif, webp',
      'Рекомендуемый размер: не более 2MB'
    ],
    code: [
      'Используйте <pre> для сохранения форматирования',
      '<code> для фрагментов кода',
      'Можно добавить подсветку синтаксиса',
      'Используйте &lt; и &gt; для < и >',
      'Для JavaScript используйте <script>',
      'Для CSS используйте <style>'
    ],
    link: [
      'Используйте <a href="..."> для ссылок',
      'target="_blank" для открытия в новой вкладке',
      'rel="noopener" для безопасности',
      'Можно добавить title для подсказки',
      'Для якорных ссылок используйте #id',
      'Для email используйте mailto:'
    ]
  };

  const htmlExamples = {
    text: [
      { title: 'Заголовок', code: '<h1>Главный заголовок</h1>' },
      { title: 'Параграф', code: '<p>Это параграф текста.</p>' },
      { title: 'Список', code: '<ul><li>Пункт 1</li><li>Пункт 2</li></ul>' },
      { title: 'Жирный текст', code: '<strong>Важный текст</strong>' },
      { title: 'Курсив', code: '<em>Выделенный текст</em>' }
    ],
    image: [
      { title: 'Простое изображение', code: '<img src="image.jpg" alt="Описание">' },
      { title: 'С подписью', code: '<figure><img src="image.jpg" alt="Описание"><figcaption>Подпись</figcaption></figure>' },
      { title: 'С размерами', code: '<img src="image.jpg" alt="Описание" width="300" height="200">' }
    ],
    code: [
      { title: 'Простой код', code: '<pre><code>console.log("Hello");</code></pre>' },
      { title: 'JavaScript', code: '<script>console.log("Hello");</script>' },
      { title: 'CSS', code: '<style>body { color: blue; }</style>' }
    ],
    link: [
      { title: 'Простая ссылка', code: '<a href="https://example.com">Ссылка</a>' },
      { title: 'В новой вкладке', code: '<a href="https://example.com" target="_blank">Ссылка</a>' },
      { title: 'Email', code: '<a href="mailto:email@example.com">Написать</a>' }
    ]
  };

  const fontFamilies = [
    { id: 'Arial', name: 'Arial' },
    { id: 'Roboto', name: 'Roboto' },
    { id: 'Open Sans', name: 'Open Sans' },
    { id: 'Montserrat', name: 'Montserrat' },
    { id: 'Lato', name: 'Lato' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Маленький', value: '14px' },
    { id: 'normal', name: 'Средний', value: '16px' },
    { id: 'large', name: 'Большой', value: '18px' },
    { id: 'xlarge', name: 'Очень большой', value: '20px' }
  ];

  const spacingOptions = [
    { id: 'compact', name: 'Компактный', value: '0.5rem' },
    { id: 'normal', name: 'Обычный', value: '1rem' },
    { id: 'comfortable', name: 'Комфортный', value: '1.5rem' },
    { id: 'spacious', name: 'Просторный', value: '2rem' }
  ];

  useEffect(() => {
    if (isCollaborating) {
      const socket = new WebSocket('wss://your-websocket-server.com');
      
      socket.onopen = () => {
        console.log('WebSocket соединение установлено');
        socket.send(JSON.stringify({
          type: 'join',
          userId: user.id,
          userName: user.name,
          siteId: miniSite.id
        }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleCollaborationMessage(data);
      };

      socket.onclose = () => {
        console.log('WebSocket соединение закрыто');
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    }
  }, [isCollaborating, user.id, user.name, miniSite.id]);

  const handleCollaborationMessage = (data) => {
    switch (data.type) {
      case 'user_joined':
        setActiveUsers(prev => [...prev, { id: data.userId, name: data.userName }]);
        break;
      case 'user_left':
        setActiveUsers(prev => prev.filter(user => user.id !== data.userId));
        break;
      case 'block_updated':
        setBlocks(prev => prev.map(block => 
          block.id === data.blockId ? { ...block, ...data.changes } : block
        ));
        break;
      case 'cursor_moved':
        setLastCursorPosition({
          userId: data.userId,
          userName: data.userName,
          position: data.position
        });
        break;
      default:
        console.log('Неизвестный тип сообщения:', data.type);
    }
  };

  const startCollaboration = () => {
    const link = `${window.location.origin}/mini-site/${miniSite.id}?collaborate=true`;
    setShareLink(link);
    setIsCollaborating(true);
  };

  const stopCollaboration = () => {
    if (ws) {
      ws.close();
    }
    setIsCollaborating(false);
    setShareLink('');
  };

  const handleBlockUpdate = useCallback((blockId, changes) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'block_updated',
        blockId,
        changes,
        userId: user.id
      }));
    }
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...changes } : block
    ));
  }, [ws, user.id]);

  const handleCursorMove = useCallback((position) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'cursor_moved',
        position,
        userId: user.id,
        userName: user.name
      }));
    }
  }, [ws, user.id, user.name]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: '',
      position: blocks.length,
      style: {
        padding: '1rem',
        margin: '0.5rem 0',
        borderRadius: '0.5rem'
      }
    };
    setBlocks([...blocks, newBlock]);
    updateMiniSite({ ...miniSite, blocks: [...blocks, newBlock] });
  };

  const updateBlock = (id, content) => {
    const updatedBlocks = blocks.map(block =>
      block.id === id ? { ...block, content } : block
    );
    setBlocks(updatedBlocks);
    updateMiniSite({ ...miniSite, blocks: updatedBlocks });
  };

  const updateBlockStyle = (id, style) => {
    const updatedBlocks = blocks.map(block =>
      block.id === id ? { ...block, style: { ...block.style, ...style } } : block
    );
    setBlocks(updatedBlocks);
    updateMiniSite({ ...miniSite, blocks: updatedBlocks });
  };

  const deleteBlock = (id) => {
    const updatedBlocks = blocks.filter(block => block.id !== id);
    setBlocks(updatedBlocks);
    updateMiniSite({ ...miniSite, blocks: updatedBlocks });
  };

  const moveBlock = (id, direction) => {
    const index = blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === blocks.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedBlocks = [...blocks];
    [updatedBlocks[index], updatedBlocks[newIndex]] = [updatedBlocks[newIndex], updatedBlocks[index]];

    setBlocks(updatedBlocks);
    updateMiniSite({ ...miniSite, blocks: updatedBlocks });
  };

  const updateSiteSettings = (newSettings) => {
    setSiteSettings(newSettings);
    updateMiniSite({ ...miniSite, ...newSettings });
  };

  const applyTemplate = (template) => {
    const newBlocks = template.blocks.map((block, index) => ({
      ...block,
      id: Date.now() + index,
      position: index,
      style: {
        padding: '1rem',
        margin: '0.5rem 0',
        borderRadius: '0.5rem'
      }
    }));
    setBlocks(newBlocks);
    updateMiniSite({ ...miniSite, blocks: newBlocks });
    setSelectedTemplate(template.id);
  };

  const generateHTML = () => {
    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteSettings.title}</title>
    <style>
        body {
            font-family: ${siteSettings.fontFamily}, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: ${siteSettings.spacing};
            background-color: ${themes[siteSettings.theme].background};
            color: ${themes[siteSettings.theme].text};
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        ${siteSettings.layout === 'grid' ? `
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        ` : ''}
    </style>
</head>
<body>
    <div class="container ${siteSettings.layout === 'grid' ? 'grid' : ''}">
        ${blocks.map(block => {
          switch (block.type) {
            case 'text':
              return `<div class="block">${block.content}</div>`;
            case 'image':
              return `<div class="block">
                <img src="${block.content}" alt="" style="width: ${block.style?.width || '100%'}; height: ${block.style?.height || 'auto'};">
              </div>`;
            case 'code':
              return `<div class="block">
                <pre><code>${block.content}</code></pre>
              </div>`;
            case 'link':
              return `<div class="block">
                <a href="${block.content}" target="_blank" rel="noopener noreferrer">${block.style?.text || block.content}</a>
              </div>`;
            default:
              return '';
          }
        }).join('\n')}
    </div>
</body>
</html>`;
    return html;
  };

  const renderBlock = (block) => {
    const blockStyle = {
      ...block.style,
      backgroundColor: siteSettings.theme === 'dark' ? '#2d2d2d' : '#ffffff',
      color: siteSettings.theme === 'dark' ? '#ffffff' : '#000000'
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {htmlTips[block.type]?.map((tip, index) => (
              <div key={index} className="mb-1">💡 {tip}</div>
            ))}
          </div>
        </div>
        {(() => {
          switch (block.type) {
            case 'text':
              return (
                <div className="prose max-w-none" style={blockStyle}>
                  {editingBlock === block.id ? (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={4}
                      style={{ backgroundColor: siteSettings.theme === 'dark' ? '#1a1a1a' : '#ffffff' }}
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: block.content }} />
                  )}
                </div>
              );
            case 'image':
              return (
                <div className="relative" style={blockStyle}>
                  {editingBlock === block.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="URL изображения"
                        style={{ backgroundColor: siteSettings.theme === 'dark' ? '#1a1a1a' : '#ffffff' }}
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={block.style?.width || 100}
                          onChange={(e) => updateBlockStyle(block.id, { width: `${e.target.value}%` })}
                          className="w-20 p-2 border rounded"
                          placeholder="Ширина %"
                        />
                        <input
                          type="number"
                          value={block.style?.height || 'auto'}
                          onChange={(e) => updateBlockStyle(block.id, { height: `${e.target.value}px` })}
                          className="w-20 p-2 border rounded"
                          placeholder="Высота px"
                        />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={block.content}
                      alt=""
                      className="rounded-lg"
                      style={{
                        width: block.style?.width || '100%',
                        height: block.style?.height || 'auto'
                      }}
                    />
                  )}
                </div>
              );
            case 'code':
              return (
                <div className="bg-gray-800 text-white p-4 rounded-lg" style={blockStyle}>
                  {editingBlock === block.id ? (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white rounded"
                      rows={4}
                    />
                  ) : (
                    <pre><code>{block.content}</code></pre>
                  )}
                </div>
              );
            case 'link':
              return (
                <div style={blockStyle}>
                  {editingBlock === block.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="URL ссылки"
                        style={{ backgroundColor: siteSettings.theme === 'dark' ? '#1a1a1a' : '#ffffff' }}
                      />
                      <input
                        type="text"
                        value={block.style?.text || 'Перейти по ссылке'}
                        onChange={(e) => updateBlockStyle(block.id, { text: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Текст ссылки"
                        style={{ backgroundColor: siteSettings.theme === 'dark' ? '#1a1a1a' : '#ffffff' }}
                      />
                    </div>
                  ) : (
                    <a
                      href={block.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                      style={{ color: siteSettings.accentColor }}
                    >
                      {block.style?.text || block.content}
                    </a>
                  )}
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  const nextTutorialStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const prevTutorialStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateHTML = () => {
    const results = [];
    const html = generateHTML();

    // Проверка наличия основных тегов
    if (!html.includes('<html')) results.push({ type: 'error', message: 'Отсутствует тег <html>' });
    if (!html.includes('<head')) results.push({ type: 'error', message: 'Отсутствует тег <head>' });
    if (!html.includes('<body')) results.push({ type: 'error', message: 'Отсутствует тег <body>' });

    // Проверка мета-тегов
    if (!html.includes('charset')) results.push({ type: 'warning', message: 'Рекомендуется добавить meta charset' });
    if (!html.includes('viewport')) results.push({ type: 'warning', message: 'Рекомендуется добавить meta viewport' });

    // Проверка изображений
    blocks.forEach(block => {
      if (block.type === 'image' && !block.content.includes('alt=')) {
        results.push({ type: 'warning', message: 'Изображение должно иметь атрибут alt' });
      }
    });

    // Проверка ссылок
    blocks.forEach(block => {
      if (block.type === 'link' && !block.content.includes('rel=')) {
        results.push({ type: 'warning', message: 'Внешние ссылки должны иметь атрибут rel="noopener"' });
      }
    });

    setValidationResults(results);
    setShowValidation(true);
  };

  const exportSite = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-site.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const previewSite = () => {
    const html = generateHTML();
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-lg max-w-md z-50"
          >
            <h3 className="text-xl font-bold mb-2">{tutorialSteps[currentStep].title}</h3>
            <p className="text-gray-600 mb-4">{tutorialSteps[currentStep].content}</p>
            <p className="text-blue-500 mb-4">💡 {tutorialSteps[currentStep].action}</p>
            <div className="flex justify-between">
              <button
                onClick={prevTutorialStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
              >
                Назад
              </button>
              <button
                onClick={nextTutorialStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {currentStep === tutorialSteps.length - 1 ? 'Завершить' : 'Далее'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Конструктор HTML-страниц</h1>
            <p className="text-gray-600">
              Создавайте и редактируйте HTML-страницы, изучая структуру и теги.
            </p>
          </div>
          <div className="flex gap-2">
            {!isCollaborating ? (
              <button
                onClick={startCollaboration}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                👥 Начать совместную работу
              </button>
            ) : (
              <button
                onClick={stopCollaboration}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                🚫 Остановить совместную работу
              </button>
            )}
            <button
              onClick={previewSite}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              👁️ Предпросмотр
            </button>
            <button
              onClick={exportSite}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              💾 Экспорт
            </button>
            <button
              onClick={validateHTML}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              ✓ Проверить
            </button>
          </div>
        </div>

        {isCollaborating && (
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Совместная работа</h3>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">Ссылка для совместной работы:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 p-2 border rounded bg-white"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                      alert('Ссылка скопирована!');
                    }}
                    className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    📋 Копировать
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Активные пользователи:</p>
                <div className="flex gap-2 mt-1">
                  {activeUsers.map(user => (
                    <div
                      key={user.id}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {showValidation && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Результаты проверки:</h3>
            {validationResults.map((result, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 mb-2 ${
                  result.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                }`}
              >
                {result.type === 'error' ? '❌' : '⚠️'} {result.message}
              </div>
            ))}
            <button
              onClick={() => setShowValidation(false)}
              className="mt-2 text-gray-500 hover:text-gray-700"
            >
              Скрыть
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Название сайта</label>
            <input
              type="text"
              value={siteSettings.title}
              onChange={(e) => updateSiteSettings({ ...siteSettings, title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Описание</label>
            <input
              type="text"
              value={siteSettings.description}
              onChange={(e) => updateSiteSettings({ ...siteSettings, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Тема</label>
            <select
              value={siteSettings.theme}
              onChange={(e) => updateSiteSettings({ ...siteSettings, theme: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="nature">Природа</option>
              <option value="ocean">Океан</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Шрифт</label>
            <select
              value={siteSettings.fontFamily}
              onChange={(e) => updateSiteSettings({ ...siteSettings, fontFamily: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {fontFamilies.map(font => (
                <option key={font.id} value={font.id}>{font.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Размер текста</label>
            <select
              value={siteSettings.fontSize}
              onChange={(e) => updateSiteSettings({ ...siteSettings, fontSize: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {fontSizes.map(size => (
                <option key={size.id} value={size.value}>{size.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Отступы</label>
            <select
              value={siteSettings.spacing}
              onChange={(e) => updateSiteSettings({ ...siteSettings, spacing: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {spacingOptions.map(option => (
                <option key={option.id} value={option.value}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Добавить блок</h2>
          <button
            onClick={() => setShowHTML(!showHTML)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {showHTML ? 'Скрыть HTML' : 'Показать HTML'}
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => addBlock('text')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            📝 Добавить текст
          </button>
          <button
            onClick={() => addBlock('image')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            🖼️ Добавить изображение
          </button>
          <button
            onClick={() => addBlock('code')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            💻 Добавить код
          </button>
          <button
            onClick={() => addBlock('link')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            🔗 Добавить ссылку
          </button>
        </div>
      </div>

      {showHTML && (
        <div className="mb-8 bg-gray-800 text-white p-4 rounded-lg">
          <pre className="overflow-x-auto">
            <code>{generateHTML()}</code>
          </pre>
        </div>
      )}

      <div className={`space-y-6 ${siteSettings.layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white p-6 rounded-lg shadow-md ${
              siteSettings.layout === 'left-aligned' ? 'mr-auto' :
              siteSettings.layout === 'right-aligned' ? 'ml-auto' :
              'mx-auto'
            }`}
            style={{
              maxWidth: siteSettings.layout === 'grid' ? '100%' : '800px',
              backgroundColor: themes[siteSettings.theme].background,
              color: themes[siteSettings.theme].text
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => moveBlock(block.id, 'up')}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(block.id, 'down')}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ↓
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingBlock(editingBlock === block.id ? null : block.id)}
                  className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {editingBlock === block.id ? '💾 Сохранить' : '✏️ Редактировать'}
                </button>
                <button
                  onClick={() => deleteBlock(block.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  🗑️ Удалить
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                {htmlTips[block.type]?.map((tip, index) => (
                  <div key={index} className="mb-1">💡 {tip}</div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Примеры кода:</h4>
                {htmlExamples[block.type]?.map((example, index) => (
                  <div key={index} className="mb-2">
                    <div className="text-sm text-gray-600">{example.title}:</div>
                    <code className="block bg-gray-800 text-white p-2 rounded text-sm">
                      {example.code}
                    </code>
                  </div>
                ))}
              </div>
              {renderBlock(block)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MiniSite; 