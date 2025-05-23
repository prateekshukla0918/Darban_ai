import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import Leaderboard from './Leaderboard';
import { useSoundContext } from '../contexts/SoundContext';  // useSoundContext here
import { useGame } from '../contexts/GameContext';
import { checkWinner, makeAIMove } from '../utils/gameHelpers';
import { emojiCategories } from '../utils/emojiCategories';
import '../styles/Game.css';

const Game = ({
  gameMode,
  playerOneCategory,
  playerTwoCategory,
  onResetGame
}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerOneMoves, setPlayerOneMoves] = useState([]);
  const [playerTwoMoves, setPlayerTwoMoves] = useState([]);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [winningLine, setWinningLine] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [matchWinner, setMatchWinner] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const {
    playPlaceSound,
    playWinSound,
    playResetSound,
    playStartSound,
    playDrawSound,
    playToggleSound
  } = useSoundContext();

  const { updateLeaderboard } = useGame();
  const WINNING_SCORE = 5;

  useEffect(() => {
    playStartSound();
  }, []);

  useEffect(() => {
    if (gameMode === 'single' && !isPlayerOneTurn && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = makeAIMove(board, playerTwoMoves);
        if (aiMove !== -1) {
          handleCellClick(aiMove);
        }
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [isPlayerOneTurn, gameMode, gameOver]);

  const handleCellClick = (index) => {
    if (board[index] !== null || gameOver) return;

    playPlaceSound();

    const newBoard = [...board];
    const isP1 = isPlayerOneTurn;
    const category = isP1 ? playerOneCategory : playerTwoCategory;
    const emojis = emojiCategories[category]?.emojis || [];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    newBoard[index] = {
      emoji: randomEmoji,
      player: isP1 ? 1 : 2
    };

    if (isP1) {
      const newMoves = [...playerOneMoves, index];
      if (newMoves.length > 3) {
        newBoard[newMoves.shift()] = null;
      }
      setPlayerOneMoves(newMoves);
    } else {
      const newMoves = [...playerTwoMoves, index];
      if (newMoves.length > 3) {
        newBoard[newMoves.shift()] = null;
      }
      setPlayerTwoMoves(newMoves);
    }

    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      playWinSound();
      setWinningLine(result.line);
      setGameOver(true);

      if (isP1) {
        setPlayerOneScore(prev => prev + 1);
        if (playerOneScore + 1 >= WINNING_SCORE) {
          setMatchWinner('Player 1');
          updateLeaderboard('Player 1');
        }
      } else {
        setPlayerTwoScore(prev => prev + 1);
        if (playerTwoScore + 1 >= WINNING_SCORE) {
          setMatchWinner(gameMode === 'single' ? 'AI' : 'Player 2');
          updateLeaderboard(gameMode === 'single' ? 'AI' : 'Player 2');
        }
      }

      setTimeout(() => {
        if (playerOneScore + 1 < WINNING_SCORE && playerTwoScore + 1 < WINNING_SCORE) {
          resetRound();
        }
      }, 2000);
    } else {
      setIsPlayerOneTurn(!isP1);
    }
  };

  const resetRound = () => {
    playResetSound();
    setBoard(Array(9).fill(null));
    setPlayerOneMoves([]);
    setPlayerTwoMoves([]);
    setIsPlayerOneTurn(true);
    setWinningLine(null);
    setGameOver(false);
  };

  const startNewMatch = () => {
    resetRound();
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setMatchWinner(null);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Blink Tac Toe</h1>
        <div className="game-actions">
          <button 
            className="action-button"
            onClick={() => {
              playToggleSound();
              setShowLeaderboard(!showLeaderboard);
            }}
          >
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </button>
          <button 
            className="action-button"
            onClick={() => {
              playResetSound();
              onResetGame();
            }}
          >
            New Game
          </button>
        </div>
      </div>

      {showLeaderboard ? (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      ) : (
        <>
          <div className="game-info">
            <PlayerInfo 
              player={1}
              score={playerOneScore}
              isActive={isPlayerOneTurn && !gameOver}
              category={playerOneCategory}
            />
            <PlayerInfo 
              player={gameMode === 'single' ? 'AI' : 2}
              score={playerTwoScore}
              isActive={!isPlayerOneTurn && !gameOver}
              category={playerTwoCategory}
            />
          </div>

          {matchWinner ? (
            <div className="match-winner">
              <h2>{matchWinner} wins the match!</h2>
              <button onClick={startNewMatch}>Start New Match</button>
            </div>
          ) : (
            <Board 
              board={board}
              onCellClick={handleCellClick}
              winningLine={winningLine}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Game;
