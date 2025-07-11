import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'framer-motion';

const ItemTypes = {
  ELEMENT: 'element'
};

const DraggableElement = ({ element }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELEMENT,
    item: { type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center p-2 bg-gray-50 rounded cursor-move hover:bg-gray-100"
    >
      <span className="mr-2">{element.icon}</span>
      <span>{element.label}</span>
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onDrop(item, { x: offset.x, y: offset.y });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`relative w-full h-full border-2 border-dashed rounded-lg ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {children}
    </div>
  );
};

const VisualEditorContent = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const availableElements = [
    { type: 'div', label: 'Блок', icon: '⬜' },
    { type: 'p', label: 'Параграф', icon: '📝' },
    { type: 'h1', label: 'Заголовок 1', icon: 'H1' },
    { type: 'h2', label: 'Заголовок 2', icon: 'H2' },
    { type: 'h3', label: 'Заголовок 3', icon: 'H3' },
    { type: 'img', label: 'Изображение', icon: '🖼️' },
    { type: 'a', label: 'Ссылка', icon: '🔗' },
    { type: 'ul', label: 'Список', icon: '📋' },
    { type: 'button', label: 'Кнопка', icon: '🔘' },
  ];

  const handleDrop = (item, dropResult) => {
    const newElement = {
      id: Date.now(),
      type: item.type,
      content: '',
      style: {},
      position: { x: dropResult.x, y: dropResult.y }
    };
    setElements([...elements, newElement]);
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (id, updates) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Панель элементов */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Элементы</h2>
        <div className="space-y-2">
          {availableElements.map((element) => (
            <DraggableElement key={element.type} element={element} />
          ))}
        </div>
      </div>

      {/* Область редактирования */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full">
          <DropZone onDrop={handleDrop}>
            {elements.map((element) => (
              <motion.div
                key={element.id}
                className="absolute"
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  cursor: 'pointer',
                  ...element.style
                }}
                onClick={() => handleElementSelect(element)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {element.content || `<${element.type}></${element.type}>`}
              </motion.div>
            ))}
          </DropZone>
        </div>
      </div>

      {/* Панель свойств */}
      {selectedElement && (
        <div className="w-64 bg-white shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Свойства</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Содержимое</label>
              <input
                type="text"
                value={selectedElement.content}
                onChange={(e) => handleElementUpdate(selectedElement.id, { content: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Цвет текста</label>
              <input
                type="color"
                value={selectedElement.style?.color || '#000000'}
                onChange={(e) => handleElementUpdate(selectedElement.id, { 
                  style: { ...selectedElement.style, color: e.target.value }
                })}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Размер шрифта</label>
              <input
                type="number"
                value={selectedElement.style?.fontSize || 16}
                onChange={(e) => handleElementUpdate(selectedElement.id, {
                  style: { ...selectedElement.style, fontSize: `${e.target.value}px` }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VisualEditor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <VisualEditorContent />
    </DndProvider>
  );
};

export default VisualEditor; 