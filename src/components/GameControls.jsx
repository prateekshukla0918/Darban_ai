import React from 'react';

export default function GameControls({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset Game</button>
    </div>
  );
}
