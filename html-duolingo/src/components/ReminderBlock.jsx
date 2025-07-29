import React from 'react';
import CodeHighlight from './CodeHighlight';
import WarningHighlight from './WarningHighlight';

const ReminderBlock = ({ reminders }) => {
  const parseJSXInText = (text) => {
    if (!text) return [];

    const parts = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      // Ищем CodeHighlight теги
      const codeOpenTagIndex = text.indexOf("<CodeHighlight>", currentIndex);
      // Ищем WarningHighlight теги
      const warningOpenTagIndex = text.indexOf("<WarningHighlight>", currentIndex);

      // Определяем, какой тег ближе
      let openTagIndex = -1;
      let tagType = "";
      let openTagLength = 0;
      let closeTagLength = 0;

      if (codeOpenTagIndex !== -1 && (warningOpenTagIndex === -1 || codeOpenTagIndex < warningOpenTagIndex)) {
        openTagIndex = codeOpenTagIndex;
        tagType = "code";
        openTagLength = 15; // "<CodeHighlight>".length
        closeTagLength = 16; // "</CodeHighlight>".length
      } else if (warningOpenTagIndex !== -1) {
        openTagIndex = warningOpenTagIndex;
        tagType = "warning";
        openTagLength = 18; // "<WarningHighlight>".length
        closeTagLength = 19; // "</WarningHighlight>".length
      }

      if (openTagIndex === -1) {
        // Нет больше тегов, добавляем оставшийся текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Добавляем текст до тега
      if (openTagIndex > currentIndex) {
        parts.push({ type: "text", content: text.slice(currentIndex, openTagIndex) });
      }

      // Ищем закрывающий тег
      const closeTagName = tagType === "code" ? "</CodeHighlight>" : "</WarningHighlight>";
      const closeTagIndex = text.indexOf(closeTagName, openTagIndex);

      if (closeTagIndex === -1) {
        // Нет закрывающего тега, добавляем как обычный текст
        parts.push({ type: "text", content: text.slice(currentIndex) });
        break;
      }

      // Извлекаем содержимое тега
      const tagContent = text.slice(openTagIndex + openTagLength, closeTagIndex);
      parts.push({ type: tagType, content: tagContent });

      currentIndex = closeTagIndex + closeTagLength;
    }

    return parts;
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6 shadow-lg mb-6">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">📝</span>
        <span className="text-orange-800 font-bold text-xl">Напоминание из курса</span>
      </div>
      <div className="space-y-3">
        {reminders.map((reminder, index) => (
          <div key={index} className="text-orange-700 text-lg flex items-start">
            <span className="text-orange-600 mr-2 mt-1">•</span>
            <div>
              {parseJSXInText(reminder).map((part, partIndex) =>
                part.type === "code" ? (
                  <CodeHighlight key={partIndex}>{part.content}</CodeHighlight>
                ) : part.type === "warning" ? (
                  <WarningHighlight key={partIndex}>{part.content}</WarningHighlight>
                ) : (
                  <span key={partIndex}>{part.content}</span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderBlock; 