import React from 'react';

const CodeHighlight = ({ children, className = "" }) => {
  return (
    <code className={`bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-sm border border-blue-200 ${className}`}>
      {children}
    </code>
  );
};


export default CodeHighlight; 