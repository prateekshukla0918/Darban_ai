import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import Game from './components/Game';
import { ThemeProvider } from './contexts/ThemeContext';
import { SoundProvider } from './contexts/SoundContext';
import { GameProvider } from './contexts/GameContext';
import './styles/App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState('two-player');
  const [playerOneCategory, setPlayerOneCategory] = useState('');
  const [playerTwoCategory, setPlayerTwoCategory] = useState('');
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerTwoName, setPlayerTwoName] = useState('Player 2');

  const startGame = (mode, p1Category, p2Category, p1Name, p2Name) => {
    setGameMode(mode);
    setPlayerOneCategory(p1Category);
    setPlayerTwoCategory(p2Category);
    setPlayerOneName(p1Name || 'Player 1');
    setPlayerTwoName(p2Name || (mode === 'single' ? 'Computer' : 'Player 2'));
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
  };

  return (
    <ThemeProvider>
      <SoundProvider>
        <GameProvider>
          <div className="app-container">
            {!gameStarted ? (
              <GameSetup onStartGame={startGame} />
            ) : (
              <Game 
                gameMode={gameMode} 
                playerOneCategory={playerOneCategory} 
                playerTwoCategory={playerTwoCategory}
                playerOneName={playerOneName}
                playerTwoName={playerTwoName}
                onResetGame={resetGame}
              />
            )}
          </div>
        </GameProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;