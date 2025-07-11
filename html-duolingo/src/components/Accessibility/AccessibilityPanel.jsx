import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleHighContrast,
    setFontSize,
    toggleScreenReader,
    toggleKeyboardNavigation,
    toggleSubtitles
  } = useAccessibility();

  const fontSizeOptions = [14, 16, 18, 20, 22, 24];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Открыть настройки доступности"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Настройки доступности
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Закрыть настройки доступности"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Высокий контраст */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Высокий контраст</h3>
                    <p className="text-sm text-gray-500">
                      Увеличивает контрастность элементов
                    </p>
                  </div>
                  <button
                    onClick={toggleHighContrast}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.highContrast ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.highContrast}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Размер текста */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Размер текста</h3>
                  <div className="flex space-x-2">
                    {fontSizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`px-3 py-1 rounded ${
                          settings.fontSize === size
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* Поддержка скринридера */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Поддержка скринридера
                    </h3>
                    <p className="text-sm text-gray-500">
                      Включает дополнительные ARIA-атрибуты
                    </p>
                  </div>
                  <button
                    onClick={toggleScreenReader}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.screenReader ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.screenReader}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Клавиатурная навигация */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Клавиатурная навигация
                    </h3>
                    <p className="text-sm text-gray-500">
                      Улучшает навигацию с клавиатуры
                    </p>
                  </div>
                  <button
                    onClick={toggleKeyboardNavigation}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.keyboardNavigation ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.keyboardNavigation}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Субтитры */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Субтитры</h3>
                    <p className="text-sm text-gray-500">
                      Включает субтитры для видео
                    </p>
                  </div>
                  <button
                    onClick={toggleSubtitles}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.subtitles ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={settings.subtitles}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.subtitles ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-900 mb-4">
                  Горячие клавиши
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Tab - Переключение между элементами</p>
                  <p>Enter - Активация элемента</p>
                  <p>Esc - Закрыть модальное окно</p>
                  <p>Space - Переключение переключателей</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel; 