import React, { useState } from 'react';
import ModeSelect from './components/ModeSelect';
import GameSetup from './components/GameSetup';
import Board from './components/Board';
import GameControls from './components/GameControls';
import { useGameEngine } from './hooks/useGameEngine';
import './App.css';

function App() {
  const [mode, setMode] = useState(null);
  const [categories, setCategories] = useState({ player1: '', player2: '' });

  const isSinglePlayer = mode === 'single';
  const ready = categories.player1 && categories.player2;
  const engine = useGameEngine(categories, isSinglePlayer);

  if (!mode) return <ModeSelect onSelect={setMode} />;
  if (!ready) {
    if (isSinglePlayer && categories.player1 && !categories.player2) {
      setCategories({ ...categories, player2: 'Food' }); // AI fixed category
    }
    return <GameSetup mode={mode} categories={categories} setCategories={setCategories} />;
  }

  return (
    <div className="app">
      <h1>Blink Tac Toe</h1>
      {engine.winner && <h2>{engine.winner} wins!</h2>}
      <p>Turn: {engine.currentPlayer}</p>
      <Board board={engine.board} onCellClick={engine.placeEmoji} />
      <GameControls onReset={engine.resetGame} />
    </div>
  );
}

export default App;
