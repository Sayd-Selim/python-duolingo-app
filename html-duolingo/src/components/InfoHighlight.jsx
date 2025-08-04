import React from 'react';

const InfoHighlight = ({ children, className = "" }) => {
  return (
    <span className={`bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold border border-blue-300 ${className}`}>
      {children}
    </span>
  );
};

export default InfoHighlight; 