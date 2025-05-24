import React, { useState } from 'react';
import ModeSelect from './ModeSelect';
import EmojiSelector from './EmojiSelector';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSoundContext } from '../contexts/SoundContext';
import RulesModal from './RulesModal';
import { emojiCategories } from '../utils/emojiCategories'; 
import '../styles/GameSetup.css';

const GameSetup = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState('two-player');
  const [playerOneCategory, setPlayerOneCategory] = useState('');
  const [playerTwoCategory, setPlayerTwoCategory] = useState('');
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerTwoName, setPlayerTwoName] = useState('Player 2');
  const [showRules, setShowRules] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playSelectSound } = useSoundContext();

  const getRandomCategory = () => {
    const keys = Object.keys(emojiCategories);
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const handleStartGame = () => {
    if (playerOneCategory && (gameMode === 'single' || playerTwoCategory)) {
      playSelectSound();
      const categoryForPlayerTwo =
        gameMode === 'single' ? getRandomCategory() : playerTwoCategory;
      onStartGame(
        gameMode,
        playerOneCategory,
        categoryForPlayerTwo,
        playerOneName.trim(),
        gameMode === 'single' ? 'Computer' : playerTwoName.trim()
      );
    }
  };

  const handleCategorySelect = (category, player) => {
    playSelectSound();
    if (player === 'p1') {
      setPlayerOneCategory(category);
    } else {
      setPlayerTwoCategory(category);
    }
  };

  return (
    <div className="game-setup">
      <h1 className="game-title">Blink Tac Toe</h1>
      <p className="game-subtitle">An emoji twist on a classic game</p>

      <div className="setup-controls">
        <button
          className="control-button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          className="control-button"
          onClick={toggleSound}
          aria-label={`${soundEnabled ? 'Disable' : 'Enable'} sound`}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <button
          className="control-button rules-button"
          onClick={() => setShowRules(true)}
        >
          Rules
        </button>
      </div>

      <ModeSelect
        selectedMode={gameMode}
        onSelectMode={(mode) => {
          playSelectSound();
          setGameMode(mode);
        }}
      />

      <div className="player-setup">
        <div className="player-config">
          <label htmlFor="player-one-name">Player 1 Name:</label>
          <input
            id="player-one-name"
            type="text"
            value={playerOneName}
            onChange={(e) => setPlayerOneName(e.target.value)}
            className="player-name-input"
            placeholder="Player 1"
          />
          <EmojiSelector
            onSelectCategory={(category) => handleCategorySelect(category, 'p1')}
            selectedCategory={playerOneCategory}
          />
        </div>

        {gameMode === 'two-player' && (
          <div className="player-config">
            <label htmlFor="player-two-name">Player 2 Name:</label>
            <input
              id="player-two-name"
              type="text"
              value={playerTwoName}
              onChange={(e) => setPlayerTwoName(e.target.value)}
              className="player-name-input"
              placeholder="Player 2"
            />
            <EmojiSelector
              onSelectCategory={(category) => handleCategorySelect(category, 'p2')}
              selectedCategory={playerTwoCategory}
              disabledCategory={playerOneCategory}
            />
          </div>
        )}
      </div>

      <button
        className={`start-game-button ${
          !playerOneCategory || (gameMode === 'two-player' && !playerTwoCategory)
            ? 'disabled'
            : ''
        }`}
        onClick={handleStartGame}
        disabled={!playerOneCategory || (gameMode === 'two-player' && !playerTwoCategory)}
      >
        Start Game
      </button>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
};

export default GameSetup;