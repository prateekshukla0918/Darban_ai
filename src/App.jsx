import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header>
          <h1>Blink Tac Toe</h1>
          <ThemeToggle />
        </header>

        {/* Placeholder for future components like ModeSelect, Board etc. */}
        <main>
          <p>Welcome to Blink Tac Toe! Choose a mode to start playing.</p>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
