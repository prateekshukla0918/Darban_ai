// ModeSelect.jsx
import React from 'react';

export default function ModeSelect({ onSelect }) {
  return (
    <div className="mode-select">
      <h2>Choose Game Mode</h2>
      <button onClick={() => onSelect('single')}>Single Player</button>
      <button onClick={() => onSelect('multi')}>Multiplayer</button>
    </div>
  );
}
