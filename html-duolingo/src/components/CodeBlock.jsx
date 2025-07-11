import React from 'react';

function CodeBlock({ code }) {
  const highlightSyntax = (line) => {
    // Разбиваем строку на части для подсветки
    const parts = [];
    let currentPart = '';
    let inTag = false;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '<' && !inString) {
        if (currentPart) {
          parts.push({ text: currentPart, type: 'text' });
          currentPart = '';
        }
        inTag = true;
        currentPart += char;
      } else if (char === '>' && !inString) {
        currentPart += char;
        parts.push({ text: currentPart, type: 'tag' });
        currentPart = '';
        inTag = false;
      } else if ((char === '"' || char === "'") && inTag) {
        if (!inString) {
          inString = true;
          stringChar = char;
          currentPart += char;
        } else if (char === stringChar) {
          inString = false;
          currentPart += char;
        } else {
          currentPart += char;
        }
      } else {
        currentPart += char;
      }
    }

    if (currentPart) {
      parts.push({ text: currentPart, type: inTag ? 'tag' : 'text' });
    }

    return parts;
  };

  return (
    <div className="relative">
      <pre className="bg-[#1E1E1E] rounded-lg p-4 overflow-x-auto">
        <code className="text-sm leading-relaxed">
          {code.split('\n').map((line, index) => (
            <div key={index} className="flex">
              <span className="text-gray-500 mr-4 w-8 text-right select-none">
                {index + 1}
              </span>
              <span className="flex-1">
                {highlightSyntax(line).map((part, partIndex) => (
                  <span
                    key={partIndex}
                    className={
                      part.type === 'tag'
                        ? 'text-[#569CD6]'
                        : part.text.includes('=')
                        ? 'text-[#9CDCFE]'
                        : part.text.includes('"') || part.text.includes("'")
                        ? 'text-[#CE9178]'
                        : 'text-white'
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default CodeBlock; 