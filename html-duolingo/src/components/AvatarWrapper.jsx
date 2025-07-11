import React from 'react';
import { PersonalizationProvider } from '../context/PersonalizationContext';
import AvatarAssistant from './AvatarAssistant';

const AvatarWrapper = () => {
  return (
    <PersonalizationProvider>
      {/* <AvatarAssistant /> */}
    </PersonalizationProvider>
  );
};

export default AvatarWrapper; 