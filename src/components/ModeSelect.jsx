import React from 'react';
import { Users, User } from 'lucide-react';
import '../styles/ModeSelect.css';

const ModeSelect = ({ selectedMode, onSelectMode }) => {
  return (
    <div className="mode-select">
      <h2>Select Game Mode</h2>
      <div className="mode-options">
        <button
          className={`mode-option ${selectedMode === 'single' ? 'selected' : ''}`}
          onClick={() => onSelectMode('single')}
        >
          <User size={24} />
          <span>Single Player</span>
          <p className="mode-description">Play against AI</p>
        </button>
        
        <button
          className={`mode-option ${selectedMode === 'two-player' ? 'selected' : ''}`}
          onClick={() => onSelectMode('two-player')}
        >
          <Users size={24} />
          <span>Two Players</span>
          <p className="mode-description">Play with a friend</p>
        </button>
      </div>
    </div>
  );
};

export default ModeSelect;
