import { useState, useEffect } from 'react';
import { checkWin } from '../utils/gameHelpers';
import { getRandomEmojiFromCategory } from '../utils/emojiCategories';
import { getRandomAIMove } from '../utils/aiLogic'; // ✅

export const useGameEngine = (playerCategories, isSinglePlayer = false) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('player1');
  const [winner, setWinner] = useState(null);
  const [emojiStacks, setEmojiStacks] = useState({ player1: [], player2: [] });
  const [bannedCells, setBannedCells] = useState({ player1: new Set(), player2: new Set() });

  const currentPlayer = turn;

  const placeEmoji = (index, customPlayer = null) => {
    const player = customPlayer || currentPlayer;
    if (winner || board[index] || bannedCells[player].has(index)) return;

    const emoji = getRandomEmojiFromCategory(playerCategories[player]);
    const updatedBoard = [...board];
    updatedBoard[index] = { player, emoji };
    setBoard(updatedBoard);

    const newStack = [...emojiStacks[player], index];
    if (newStack.length > 3) {
      const [removed, ...rest] = newStack;
      updatedBoard[removed] = null;
      setBannedCells((prev) => ({
        ...prev,
        [player]: new Set(prev[player]).add(removed),
      }));
      setEmojiStacks((prev) => ({ ...prev, [player]: [...rest, index] }));
    } else {
      setEmojiStacks((prev) => ({ ...prev, [player]: newStack }));
    }

    if (checkWin(updatedBoard, player)) {
      setWinner(player);
    } else {
      if (!customPlayer) {
        setTurn(player === 'player1' ? 'player2' : 'player1');
      }
    }
  };

  // ✅ AI MOVE TRIGGER
  useEffect(() => {
    if (isSinglePlayer && turn === 'player2' && !winner) {
      const timeout = setTimeout(() => {
        const aiMove = getRandomAIMove(board, bannedCells.player2);
        if (aiMove !== null) placeEmoji(aiMove, 'player2');
        setTurn('player1');
      }, 600); // short delay for realism
      return () => clearTimeout(timeout);
    }
  }, [turn, board, winner, isSinglePlayer]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('player1');
    setWinner(null);
    setEmojiStacks({ player1: [], player2: [] });
    setBannedCells({ player1: new Set(), player2: new Set() });
  };

  return { board, placeEmoji, currentPlayer, winner, resetGame };
};
