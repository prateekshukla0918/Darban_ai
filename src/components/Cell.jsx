import React from 'react';
import { useSoundContext } from '../contexts/SoundContext';  // useSoundContext here
import '../styles/Cell.css';

const Cell = ({ value, onClick, isWinning }) => {
  const { playClickSound } = useSoundContext();

  const handleClick = () => {
    playClickSound();
    onClick();
  };

  return (
    <button
      className={`cell ${isWinning ? 'winning-cell' : ''}`}
      onClick={handleClick}
      disabled={!!value}
      aria-label={value?.emoji ? `Cell with ${value.emoji}` : 'Empty cell'}
    >
      {value?.emoji || ''}
    </button>
  );
};

export default Cell;

