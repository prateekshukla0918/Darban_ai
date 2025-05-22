import React, { useState } from 'react';
import './App.css';
import ModeSelect from './components/ModeSelect';
import EmojiSelector from './components/EmojiSelector';
import Board from './components/Board';
import GameControls from './components/GameControls';
import { useGameEngine } from './hooks/useGameEngine';

function App() {
  const [mode, setMode] = useState(null);
  const [categories, setCategories] = useState({ player1: '', player2: '' });

  const bothChosen = categories.player1 && categories.player2;
  const { board, placeEmoji, currentPlayer, winner, resetGame } = useGameEngine(categories);

  if (!mode) return <ModeSelect onSelect={setMode} />;
  if (!bothChosen) {
    return (
      <div>
        {!categories.player1 && (
          <EmojiSelector player="Player 1" onSelect={(cat) => setCategories({ ...categories, player1: cat })} />
        )}
        {categories.player1 && !categories.player2 && (
          <EmojiSelector player="Player 2" onSelect={(cat) => setCategories({ ...categories, player2: cat })} />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Blink Tac Toe</h1>
      {winner && <h2>{winner} wins!</h2>}
      <p>Turn: {currentPlayer}</p>
      <Board board={board} onCellClick={placeEmoji} />
      <GameControls onReset={resetGame} />
    </div>
  );
}

export default App;
