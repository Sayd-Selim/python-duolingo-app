import React from 'react';

const ImportantHighlight = ({ children, className = "" }) => {
  return (
    <span className={`bg-red-100 text-red-800 px-2 py-1 rounded font-semibold border border-red-300 ${className}`}>
      {children}
    </span>
  );
};

export default ImportantHighlight; 