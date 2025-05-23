import React, { createContext, useState } from 'react';

export const GameModeContext = createContext();

export const GameModeProvider = ({ children }) => {
  const [mode, setMode] = useState('single'); // default: single or 'multi'

  return (
    <GameModeContext.Provider value={{ mode, setMode }}>
      {children}
    </GameModeContext.Provider>
  );
};
