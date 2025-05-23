import React, { useState, useEffect } from "react";
import EmojiSelector from "./components/EmojiSelector";  // Ensure correct path
import Board from "./components/Board";  // The game board
import { generateRandomEmoji } from "./utils/emojiCategories";  // Emoji generation logic
import { checkWinner } from "./utils/gameHelpers";  // Game win logic
import { getEasyMove } from "./utils/aiLogic";  // Simple AI logic
import RulesModal from "./components/RulesModal";  // Rules modal component
import { ThemeContext } from "./contexts/ThemeContext";  // Theme context (light/dark mode)
import { GameModeContext } from "./contexts/GameModeContext";  // Game mode (single/multi)
import "./styles/App.css";  // Ensure you have a global CSS file

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [gameMode, setGameMode] = useState('');  // 'single' or 'multi'
  const [playerEmoji, setPlayerEmoji] = useState([]);
  const [aiEmoji, setAiEmoji] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null)); // Board state (9 cells)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player's turn or AI's
  const [gameResult, setGameResult] = useState(null); // 'win', 'draw', or null
  const [rulesVisible, setRulesVisible] = useState(false); // Show rules modal
  const [playerName, setPlayerName] = useState('Player 1'); // Player name
  const [theme, setTheme] = useState('light'); // Theme state (light/dark)

  // Handle category selection from EmojiSelector
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log(`Category selected: ${category}`);

    // Generate random emojis for the player and AI based on category
    const emojis = generateRandomEmoji(category);

    // Check if emojis are valid
    if (!emojis || !emojis.player || !emojis.ai) {
      console.error("Error: Invalid emojis returned");
      return;
    }

    setPlayerEmoji(emojis.player);
    setAiEmoji(emojis.ai);
  };

  // Handle game mode selection (single-player or multiplayer)
  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    setIsGameStarted(true);
    setBoard(Array(9).fill(null));
    setGameResult(null);
    setIsPlayerTurn(true);
  };

  // Handle board cell click (player's move)
  const handleCellClick = (index) => {
    if (board[index] || gameResult) return; // Ignore if the cell is occupied or game is over

    const newBoard = [...board];
    newBoard[index] = playerEmoji[0]; // Place player's emoji
    setBoard(newBoard);

    // Check for winner after the move
    const winner = checkWinner(newBoard);
    if (winner) {
      setGameResult(winner);
      return;
    }

    setIsPlayerTurn(false); // Switch to AI's turn if player moves

    // If single player mode and AI's turn, call AI to make a move
    if (gameMode === 'single' && !isPlayerTurn) {
      setTimeout(() => handleAiMove(), 1000);
    }
  };

  // Handle AI move (in single-player mode)
  const handleAiMove = () => {
    const emptyCells = board.map((cell, index) => (cell === null ? index : null)).filter((index) => index !== null);
    const aiMove = getEasyMove(emptyCells); // Get AI move (easy level)
    const newBoard = [...board];
    newBoard[aiMove] = aiEmoji[0]; // Place AI's emoji
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameResult(winner);
    } else {
      setIsPlayerTurn(true); // Switch back to player's turn
    }
  };

  // Handle game restart
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setGameResult(null);
    setIsPlayerTurn(true);
    setSelectedCategory('');
    setGameMode('');
  };

  // Toggle between light/dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GameModeContext.Provider value={{ gameMode, handleGameModeSelect }}>
        <div className={`app-container ${theme}`}>
          <h1>Welcome to Blink Tac Toe!</h1>

          <div className="game-info">
            <button onClick={() => setRulesVisible(true)}>Rules</button>
            <RulesModal isVisible={rulesVisible} onClose={() => setRulesVisible(false)} />

            {!isGameStarted ? (
              <div>
                <h2>Choose Game Mode</h2>
                <button onClick={() => handleGameModeSelect('single')}>Single Player</button>
                <button onClick={() => handleGameModeSelect('multi')}>Multiplayer</button>
              </div>
            ) : (
              <div>
                <h2>{gameMode === 'single' ? 'Single Player' : 'Multiplayer'}</h2>
                <h3>Player: {playerName}</h3>
                <div>Selected Emoji Category: {selectedCategory}</div>
              </div>
            )}
          </div>

          {gameMode && (
            <div className="emoji-selector">
              <EmojiSelector onCategorySelect={handleCategorySelect} />
            </div>
          )}

          {isGameStarted && !gameResult && (
            <Board
              board={board}
              onCellClick={handleCellClick}
              playerEmoji={playerEmoji}
              aiEmoji={aiEmoji}
            />
          )}

          {gameResult && (
            <div className="game-result">
              {gameResult === 'win' ? `${playerName} wins!` : 'It\'s a draw!'}
              <button onClick={restartGame}>Restart</button>
            </div>
          )}
        </div>
      </GameModeContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;

