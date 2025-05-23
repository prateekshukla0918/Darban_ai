import React from 'react';
import '../styles/PlayerInfo.css';

const PlayerInfo = ({ 
  player, 
  score, 
  isActive, 
  category,
  categoryEmoji,
  isAI = false
}) => {
  return (
    <div className={`player-info ${isActive ? 'active' : ''}`}>
      <div className="player-avatar">
        <span className="player-emoji">{categoryEmoji}</span>
      </div>
      <div className="player-details">
        <h3>{isAI ? 'AI' : `Player ${player}`}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
