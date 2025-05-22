import { useState, useEffect } from "react";
import { getRandomEmoji } from "../utils/gameHelpers";
import { checkWin } from "../utils/gameHelpers";

const INITIAL_GRID = Array(9).fill(null);

export default function useGameLogic(playerEmojis) {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [turn, setTurn] = useState("player1");
  const [history, setHistory] = useState({ player1: [], player2: [] });
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (grid[index] || winner) return;

    const newGrid = [...grid];
    const emoji = getRandomEmoji(playerEmojis[turn]);
    newGrid[index] = { player: turn, emoji };

    const updatedHistory = { ...history };
    updatedHistory[turn].push(index);

    if (updatedHistory[turn].length > 3) {
      const oldest = updatedHistory[turn].shift();
      newGrid[oldest] = null;
    }

    setGrid(newGrid);
    setHistory(updatedHistory);

    const win = checkWin(newGrid, turn);
    if (win) {
      setWinner(turn);
    } else {
      setTurn(turn === "player1" ? "player2" : "player1");
    }
  };

  const resetGame = () => {
    setGrid(INITIAL_GRID);
    setTurn("player1");
    setHistory({ player1: [], player2: [] });
    setWinner(null);
  };

  return {
    grid,
    turn,
    winner,
    handleCellClick,
    resetGame,
  };
}
