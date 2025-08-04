import React from 'react';

const SuccessHighlight = ({ children, className = "" }) => {
  return (
    <span className={`bg-green-100 text-green-800 px-2 py-1 rounded font-semibold border border-green-300 ${className}`}>
      {children}
    </span>
  );
};

export default SuccessHighlight; 