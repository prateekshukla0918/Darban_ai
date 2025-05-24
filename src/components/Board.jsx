import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

const Board = ({ board, onCellClick, winningLine }) => {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <Cell 
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) || false}
        />
      ))}
      
      {winningLine && (
        <div 
          className={`winning-line line-${winningLine[0]}-${winningLine[2]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Board;
