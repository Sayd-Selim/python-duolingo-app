import React from 'react';

const StepHighlight = ({ children, className = "" }) => {
  return (
    <span className={`bg-purple-100 text-purple-800 px-2 py-1 rounded font-semibold border border-purple-300 ${className}`}>
      {children}
    </span>
  );
};

export default StepHighlight; 