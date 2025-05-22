import React from 'react';
import Cell from './Cell';
import '../styles/Board.css';

export default function Board({ board, onCellClick }) {
  return (
    <div className="board">
      {board.map((cell, i) => (
        <Cell
          key={i}
          value={cell}
          onClick={() => onCellClick(i)}
        />
      ))}
    </div>
  );
}
