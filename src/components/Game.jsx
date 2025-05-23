import React, { useState, useEffect } from 'react';
import Board from './Board';
import PlayerInfo from './PlayerInfo';
import Leaderboard from './Leaderboard';
import { useSound } from '../contexts/SoundContext';
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
  
  const { playPlaceSound, playWinSound } = useSound();
  const { updateLeaderboard } = useGame();
  
  const WINNING_SCORE = 5;

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
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </button>
          <button 
            className="action-button"
            onClick={onResetGame}
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
              category={emojiCategories[playerOneCategory]?.name || 'Unknown'}
              categoryEmoji={emojiCategories[playerOneCategory]?.preview || '❓'}
            />
            <div className="score-display">
              <span>{playerOneScore}</span>
              <span>-</span>
              <span>{playerTwoScore}</span>
            </div>
            <PlayerInfo 
              player={2}
              score={playerTwoScore}
              isActive={!isPlayerOneTurn && !gameOver}
              category={emojiCategories[playerTwoCategory]?.name || 'Unknown'}
              categoryEmoji={emojiCategories[playerTwoCategory]?.preview || '❓'}
              isAI={gameMode === 'single'}
            />
          </div>
          
          <Board 
            board={board} 
            onCellClick={handleCellClick}
            winningLine={winningLine}
          />
          
          {matchWinner && (
            <div className="match-result">
              <h2>{matchWinner} wins the match!</h2>
              <button 
                className="new-match-button"
                onClick={startNewMatch}
              >
                Start New Match
              </button>
            </div>
          )}
          
          <div className="game-rules-reminder">
            <p>Remember: You can only have 3 emojis on the board at once!</p>
            <p>First to {WINNING_SCORE} wins takes the match.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;