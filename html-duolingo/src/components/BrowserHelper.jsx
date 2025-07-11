import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BrowserHelper = ({ userCode, currentTask, welcome, step }) => {
  // Не показывать, если пользователь ещё ничего не ввёл
  if (!userCode || userCode.length === 0) return null;

  // Если есть browserSignals, ищем первое подходящее сообщение
  if (currentTask && Array.isArray(currentTask.browserSignals)) {
    const code = userCode;
    const found = currentTask.browserSignals.find(item => item.signal(code));
    if (found) {
      return (
        <div className="flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg bg-blue-600 border-blue-700 text-white mt-2">
          <div className="text-2xl mt-1">💡</div>
          <div className="flex-1">
            <div className="font-bold mb-1">Браузер говорит:</div>
            <div className="text-sm leading-relaxed">{found.message}</div>
          </div>
        </div>
      );
    }
    // Если ни одно сообщение не подходит — не показывать ничего
    return null;
  }

  // Анализируем код пользователя и даём советы
  const getBrowserAdvice = () => {
    if (currentTask && currentTask.browserMessage) {
      return {
        message: currentTask.browserMessage,
        type: "info"
      };
    }

    if (!userCode) {
      return {
        message: "🤔 Хм... Я не вижу никакого кода. Может быть, стоит что-то написать?",
        type: "confused"
      };
    }

 
    
    const code = userCode
    
    console.log("code", code);
    // Проверяем наличие DOCTYPE
    if (!code.includes('<!DOCTYPE html>')) {
      return {
        message: "😵‍💫 Без DOCTYPE я не знаю, как интерпретировать этот документ! Добавь <!DOCTYPE html> в начало.",
        type: "error"
      };
    }

    // Проверяем наличие html тега
    if (!code.includes('<html>')) {
      return {
        message: "🤷‍♂️ Где же тег <html>? Без него я не понимаю структуру документа!",
        type: "warning"
      };
    }

    // Проверяем наличие head
    if (!code.includes('<head>')) {
      return {
        message: "🧐 А где <head>? Там обычно метаданные и заголовок страницы.",
        type: "info"
      };
    }

    // Проверяем наличие body
    if (!code.includes('<body>')) {
      return {
        message: "🤔 Где <body>? Там должно быть содержимое страницы!",
        type: "warning"
      };
    }

    // Проверяем конкретные задания
    if (currentTask.type === "write" && currentTask.question.includes("заголовок")) {
      if (!code.includes('<h1>')) {
        return {
          message: "📝 Для заголовка нужен тег <h1>. Попробуй написать <h1>Привет, мир!</h1>",
          type: "hint"
        };
      }
      if (code.includes('<h1>') && !code.includes('привет')) {
        return {
          message: "✅ Тег <h1> есть! Теперь добавь текст 'Привет, мир!' внутрь него.",
          type: "success"
        };
      }
    }

    if (currentTask.type === "fill" && currentTask.question.includes("абзац")) {
      if (!code.includes('<p>')) {
        return {
          message: "📄 Для абзаца нужен тег <p>. Заполни пропуск: <p>Я учу HTML на Duolingo!</p>",
          type: "hint"
        };
      }
    }

    if (currentTask.type === "fix") {
      if (code.includes('<h2>') && currentTask.question.includes("заголовок")) {
        return {
          message: "🔧 Вижу <h2>, но нужен <h1> для главного заголовка! Исправь это.",
          type: "fix"
        };
      }
      if (code.includes('<pr>')) {
        return {
          message: "❌ <pr> - это не тег! Нужен <p> для абзаца. Исправь!",
          type: "error"
        };
      }
    }

    // Если код выглядит хорошо
    if (code.includes('doctype') && code.includes('<html>') && code.includes('<head>') && code.includes('<body>')) {
      return {
        message: "🎉 Отлично! Код выглядит правильно. Теперь я понимаю структуру!",
        type: "success"
      };
    }

    return {
      message: "🤔 Интересный код... Но что-то не так. Проверь синтаксис!",
      type: "confused"
    };
  };

  const advice = getBrowserAdvice();

  const getIcon = () => {
    switch (advice.type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'hint': return '💡';
      case 'success': return '✅';
      case 'fix': return '🔧';
      default: return '🤔';
    }
  };

  const getToastStyle = () => {
    switch (advice.type) {
      case 'error': return 'bg-red-500 border-red-600';
      case 'warning': return 'bg-yellow-500 border-yellow-600';
      case 'info': return 'bg-blue-500 border-blue-600';
      case 'hint': return 'bg-purple-500 border-purple-600';
      case 'success': return 'bg-green-500 border-green-600';
      case 'fix': return 'bg-orange-500 border-orange-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getToastStyle()} text-white rounded-lg shadow-xl border-l-4`}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-xl flex-shrink-0">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm mb-1">Браузер</div>
              <div className="text-sm opacity-90 leading-relaxed">{advice.message}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BrowserHelper; 