import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Trophy, X } from 'lucide-react';
import '../styles/Leaderboard.css';

const Leaderboard = ({ onClose }) => {
  const { leaderboard, resetLeaderboard } = useGame();

  // Sort players by wins (descending)
  const sortedPlayers = Object.values(leaderboard).sort((a, b) => b.wins - a.wins);

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2><Trophy size={24} /> Leaderboard</h2>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {sortedPlayers.length > 0 ? (
        <>
          <div className="leaderboard-list">
            {sortedPlayers.map((player, index) => (
              <div key={player.name} className="leaderboard-item">
                <span className="player-rank">{index + 1}</span>
                <span className="player-name">{player.name}</span>
                <span className="player-wins">
                  {player.wins} {player.wins === 1 ? 'win' : 'wins'}
                </span>
              </div>
            ))}
          </div>

          <button 
            className="reset-leaderboard-button"
            onClick={resetLeaderboard}
          >
            Reset Leaderboard
          </button>
        </>
      ) : (
        <div className="empty-leaderboard">
          <p>No games played yet!</p>
          <p>Complete a match to see results here.</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
