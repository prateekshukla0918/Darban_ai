import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState(() => {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    return savedLeaderboard ? JSON.parse(savedLeaderboard) : {};
  });

  const updateLeaderboard = (playerName) => {
    setLeaderboard(prevLeaderboard => {
      const updatedLeaderboard = { ...prevLeaderboard };

      if (updatedLeaderboard[playerName]) {
        updatedLeaderboard[playerName] = {
          ...updatedLeaderboard[playerName],
          wins: updatedLeaderboard[playerName].wins + 1
        };
      } else {
        updatedLeaderboard[playerName] = {
          name: playerName,
          wins: 1
        };
      }

      localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
      return updatedLeaderboard;
    });
  };

  const resetLeaderboard = () => {
    setLeaderboard({});
    localStorage.removeItem('leaderboard');
  };

  return (
    <GameContext.Provider value={{ leaderboard, updateLeaderboard, resetLeaderboard }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
