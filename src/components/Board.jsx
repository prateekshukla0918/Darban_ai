import React from 'react';
import '../styles/Board.css';
import '../styles/animations.css';

export default function Board({ board, onCellClick, winIndices }) {
  return (
    <div className="board">
      {board.map((cell, idx) => {
        let classes = 'cell';
        
        // Add 'emoji-pop' if the cell has an emoji (adjusted for non-object cells)
        if (cell && typeof cell === 'string') {
          classes += ' emoji-pop';
        }

        // Highlight winning cells with 'win-cell'
        if (winIndices?.includes(idx)) {
          classes += ' win-cell';
        }

        // For empty cells, add 'empty' class
        if (cell === null) {
          classes += ' empty';
        }

        return (
          <div key={idx} className={classes} onClick={() => onCellClick(idx)}>
            {cell}
          </div>
        );
      })}
    </div>
  );
}
