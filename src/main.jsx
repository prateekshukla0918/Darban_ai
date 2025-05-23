import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

import { ThemeProvider } from './contexts/ThemeContext';
import { GameModeProvider } from './contexts/GameModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <GameModeProvider>
        <App />
      </GameModeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
