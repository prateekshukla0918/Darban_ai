import React from 'react';
import '../styles/PlayerInfo.css';

const PlayerInfo = ({ 
  player, 
  score, 
  isActive, 
  category,
  playerName = '',
  isAI = false
}) => {
  const displayName = playerName.trim() !== '' 
    ? playerName 
    : isAI 
      ? 'Computer' 
      : `Player ${player}`;

  const avatarSeed = isAI ? 'ai-opponent' : `player-${player}-${category}`;
  const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(avatarSeed)}`;

  return (
    <div className={`player-info ${isActive ? 'active' : ''}`}>
      <div className="player-avatar">
        <img 
          src={avatarUrl} 
          alt={`Avatar for ${displayName}`} 
          className="avatar-image"
        />
      </div>
      <div className="player-details">
        <h3>{displayName}</h3>
        <p>{category}</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
