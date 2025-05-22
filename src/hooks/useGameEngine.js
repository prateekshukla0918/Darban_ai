import { useState } from 'react';
import { checkWin } from '../utils/gameHelpers';
import { getRandomEmojiFromCategory } from '../utils/emojiCategories';

export const useGameEngine = (playerCategories) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('player1');
  const [winner, setWinner] = useState(null);
  const [emojiStacks, setEmojiStacks] = useState({ player1: [], player2: [] });
  const [bannedCells, setBannedCells] = useState({ player1: new Set(), player2: new Set() });

  const currentPlayer = turn;

  const placeEmoji = (index) => {
    if (winner || board[index]) return;
    if (bannedCells[currentPlayer].has(index)) return;

    const emoji = getRandomEmojiFromCategory(playerCategories[currentPlayer]);
    const updatedBoard = [...board];
    updatedBoard[index] = { player: currentPlayer, emoji };
    setBoard(updatedBoard);

    const newStack = [...emojiStacks[currentPlayer], index];

    if (newStack.length > 3) {
      const [removed, ...rest] = newStack;
      updatedBoard[removed] = null;
      setBannedCells((prev) => ({
        ...prev,
        [currentPlayer]: new Set(prev[currentPlayer]).add(removed),
      }));
      setEmojiStacks((prev) => ({ ...prev, [currentPlayer]: [...rest, index] }));
      setBoard([...updatedBoard]);
    } else {
      setEmojiStacks((prev) => ({ ...prev, [currentPlayer]: newStack }));
    }

    if (checkWin(updatedBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setTurn(turn === 'player1' ? 'player2' : 'player1');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('player1');
    setWinner(null);
    setEmojiStacks({ player1: [], player2: [] });
    setBannedCells({ player1: new Set(), player2: new Set() });
  };

  return { board, placeEmoji, currentPlayer, winner, resetGame };
};
