import React from 'react';

const WarningHighlight = ({ children }) => {
  return (
    <span className="bg-yellow-400 text-black  px-2 py-1 rounded text-base font-semibold border-yellow-200">
      {children}
    </span>
  );
};

export default WarningHighlight; 