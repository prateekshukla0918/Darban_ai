import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import Leaderboard from './Leaderboard';
import { useSoundContext } from '../contexts/SoundContext';
import { useGame } from '../contexts/GameContext';
import { checkWinner, makeAIMove } from '../utils/gameHelpers';
import { emojiCategories } from '../utils/emojiCategories';
import '../styles/Game.css';

const Game = ({
  gameMode,
  playerOneCategory,
  playerTwoCategory,
  playerOneName,
  playerTwoName,
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
  const WINNING_SCORE = 1;

  useEffect(() => {
    playStartSound();
  }, []);

  useEffect(() => {
    if (gameMode === 'single' && !isPlayerOneTurn && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = makeAIMove(board, playerTwoMoves);
        if (aiMove !== -1) {
          handleAIMove(aiMove);
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
      // Add current move index to player one's moves
      const updatedPlayerOneMoves = [...playerOneMoves, index];
      // If more than 3 moves, remove oldest player one's move from board
      if (updatedPlayerOneMoves.length > 3) {
        const oldestMoveIndex = updatedPlayerOneMoves.shift();
        newBoard[oldestMoveIndex] = null;
      }
      setPlayerOneMoves(updatedPlayerOneMoves);
    } else {
      // Add current move index to player two's moves
      const updatedPlayerTwoMoves = [...playerTwoMoves, index];
      // If more than 3 moves, remove oldest player two's move from board
      if (updatedPlayerTwoMoves.length > 3) {
        const oldestMoveIndex = updatedPlayerTwoMoves.shift();
        newBoard[oldestMoveIndex] = null;
      }
      setPlayerTwoMoves(updatedPlayerTwoMoves);
    }

    setBoard(newBoard);
    // setPlayerOneMoves(newMoves);
    

    const result = checkWinner(newBoard);
    if (result) {
      playWinSound();
      setWinningLine(result.line);
      setGameOver(true);

      if (isP1) {
        setPlayerOneScore(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            setMatchWinner('Player 1');
            updateLeaderboard('Player 1');
          }
          return newScore;
        });
      } else {
        setPlayerTwoScore(prev => {
          const newScore = prev + 1;
          if (newScore >= WINNING_SCORE) {
            setMatchWinner(gameMode === 'single' ? 'AI' : 'Player 2');
            updateLeaderboard(gameMode === 'single' ? 'AI' : 'Player 2');
          }
          return newScore;
        });
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

  const handleAIMove = (index) => {
    if (board[index] !== null || gameOver) return;

    playPlaceSound();
    const newBoard = [...board];
    const emojis = emojiCategories[playerTwoCategory]?.emojis || [];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    newBoard[index] = { emoji: randomEmoji, player: 2 };
    const newMoves = [...playerTwoMoves, index];
    if (newMoves.length > 3) {
      newBoard[newMoves.shift()] = null;
    }

    setBoard(newBoard);
    setPlayerTwoMoves(newMoves);

    const result = checkWinner(newBoard);
    if (result) {
      playWinSound();
      setWinningLine(result.line);
      setGameOver(true);

      setPlayerTwoScore(prev => {
        const newScore = prev + 1;
        setTimeout(() => {
          if (newScore >= WINNING_SCORE) {
            setMatchWinner(playerTwoName || (gameMode === 'single' ? 'Computer' : 'Player 2'));
            updateLeaderboard(playerTwoName || (gameMode === 'single' ? 'Computer' : 'Player 2'));
          } else {
            resetRound();
          }
        }, 1800);
        return newScore;
      });
    } else {
      setIsPlayerOneTurn(true);
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
            Quit
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
              playerName={playerOneName || 'Player 1'}
            />
            <PlayerInfo 
              player={gameMode === 'single' ? 'AI' : 2}
              score={playerTwoScore}
              isActive={!isPlayerOneTurn && !gameOver}
              category={playerTwoCategory}
              playerName={playerTwoName || (gameMode === 'single' ? 'Computer' : 'Player 2')}
              isAI={gameMode === 'single'}
            />
          </div>

          <Board 
            board={board} 
            onCellClick={handleCellClick} 
            winningLine={winningLine} 
            gameOver={gameOver}
          />

          {matchWinner && (
            <div className="match-winner">
              <h2>{matchWinner} wins the match!</h2>
              <button className="action-button" onClick={startNewMatch}>
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game;