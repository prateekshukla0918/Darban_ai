import React from 'react';
import '../styles/Cell.css';

const Cell = ({ value, onClick, isWinningCell }) => {
  return (
    <button 
      className={`game-cell ${isWinningCell ? 'winning' : ''} ${value ? `player-${value.player}` : ''}`}
      onClick={onClick}
      aria-label={value ? `Cell with ${value.emoji}` : "Empty cell"}
    >
      {value && (
        <span className="cell-emoji">{value.emoji}</span>
      )}
    </button>
  );
};

export default Cell;