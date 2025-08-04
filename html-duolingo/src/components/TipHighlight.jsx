import React from 'react';

const TipHighlight = ({ children, className = "" }) => {
  return (
    <span className={`bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold border border-yellow-300 ${className}`}>
      {children}
    </span>
  );
};

export default TipHighlight; 