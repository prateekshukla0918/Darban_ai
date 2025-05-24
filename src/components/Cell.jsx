import React from 'react';
import { useSoundContext } from '../contexts/SoundContext';
import '../styles/Cell.css';

const Cell = ({ value, onClick, isWinning }) => {
  const { playClickSound } = useSoundContext();

  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <button
      className={`game-cell ${isWinning ? 'winning' : ''}`}
      onClick={handleClick}
      disabled={!!value}
      aria-label={value?.emoji ? `Cell with ${value.emoji}` : 'Empty cell'}
    >
      <span className="cell-emoji">{value?.emoji || ''}</span>
    </button>
  );
};

export default Cell;


