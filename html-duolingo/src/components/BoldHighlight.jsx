import React from 'react';

const BoldHighlight = ({ children }) => {
  return (
    <span className="font-bold text-gray-900">
      {children}
    </span>
  );
};

export default BoldHighlight; 