import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMVisualizer = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(['html']);

  const domStructure = {
    id: 'html',
    type: 'html',
    children: [
      {
        id: 'head',
        type: 'head',
        children: [
          {
            id: 'title',
            type: 'title',
            content: 'Заголовок страницы'
          },
          {
            id: 'meta',
            type: 'meta',
            attributes: {
              charset: 'UTF-8'
            }
          }
        ]
      },
      {
        id: 'body',
        type: 'body',
        children: [
          {
            id: 'header',
            type: 'header',
            children: [
              {
                id: 'nav',
                type: 'nav',
                children: [
                  {
                    id: 'ul',
                    type: 'ul',
                    children: [
                      {
                        id: 'li1',
                        type: 'li',
                        content: 'Пункт меню 1'
                      },
                      {
                        id: 'li2',
                        type: 'li',
                        content: 'Пункт меню 2'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'main',
            type: 'main',
            children: [
              {
                id: 'article',
                type: 'article',
                children: [
                  {
                    id: 'h1',
                    type: 'h1',
                    content: 'Заголовок статьи'
                  },
                  {
                    id: 'p1',
                    type: 'p',
                    content: 'Параграф текста'
                  }
                ]
              }
            ]
          },
          {
            id: 'footer',
            type: 'footer',
            content: 'Подвал сайта'
          }
        ]
      }
    ]
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode === node.id;

    return (
      <div key={node.id} style={{ marginLeft: `${level * 20}px` }}>
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isSelected ? '#EEF2FF' : 'transparent',
            borderColor: isSelected ? '#4F46E5' : '#E5E7EB'
          }}
          className={`flex items-center p-2 rounded-lg border cursor-pointer hover:bg-gray-50`}
          onClick={() => setSelectedNode(node.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
              className="mr-2 text-gray-500 hover:text-indigo-600"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          <span className="text-indigo-600 font-mono">&lt;{node.type}&gt;</span>
          {node.content && (
            <span className="ml-2 text-gray-600">{node.content}</span>
          )}
          {node.attributes && (
            <span className="ml-2 text-gray-500">
              {Object.entries(node.attributes).map(([key, value]) => (
                <span key={key} className="mr-2">
                  {key}="{value}"
                </span>
              ))}
            </span>
          )}
          {!hasChildren && (
            <span className="text-indigo-600 font-mono ml-1">&lt;/{node.type}&gt;</span>
          )}
        </motion.div>
        
        {hasChildren && isExpanded && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children.map(child => renderNode(child, level + 1))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Интерактивная структура DOM</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Выбранный элемент:</h3>
            {selectedNode ? (
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-indigo-600 font-mono">
                  &lt;{domStructure.children.find(node => node.id === selectedNode)?.type || 'html'}&gt;
                </p>
              </div>
            ) : (
              <p className="text-gray-500">Выберите элемент для просмотра информации</p>
            )}
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            {renderNode(domStructure)}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Подсказки:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Нажмите на элемент, чтобы выделить его</li>
              <li>Используйте стрелки для раскрытия/скрытия вложенных элементов</li>
              <li>Структура показывает иерархию HTML-документа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DOMVisualizer; 