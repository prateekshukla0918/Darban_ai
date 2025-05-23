export function checkWinner(board) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      board[a] && 
      board[b] && 
      board[c] && 
      board[a].player === board[b].player && 
      board[a].player === board[c].player
    ) {
      return {
        player: board[a].player,
        line: line
      };
    }
  }
  
  return null;
}

export function makeAIMove(board, playerTwoMoves) {
  const winningMove = findWinningMove(board, 2, playerTwoMoves);
  if (winningMove !== -1) return winningMove;
  
  const blockingMove = findWinningMove(board, 1, []);
  if (blockingMove !== -1) return blockingMove;
  
  const strategicMove = findStrategicMove(board, playerTwoMoves);
  if (strategicMove !== -1) return strategicMove;
  
  const emptyCells = board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
  
  if (emptyCells.length > 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  
  return -1;
}

function findWinningMove(board, player, playerMoves) {
  if (playerMoves.length >= 3) {
    for (let i = 0; i < 9; i++) {
      if (board[i] !== null) continue;
      
      const newBoard = [...board];
      newBoard[playerMoves[0]] = null;
      newBoard[i] = { emoji: '🔄', player };
      
      if (checkWinner(newBoard)) {
        return i;
      }
    }
  } else {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const line of lines) {
      const [a, b, c] = line;
      const cells = [board[a], board[b], board[c]];
      const indices = [a, b, c];
      
      const playerCells = cells.filter(cell => cell && cell.player === player);
      const emptyCellIndex = indices.find(index => board[index] === null);
      
      if (playerCells.length === 2 && emptyCellIndex !== undefined) {
        return emptyCellIndex;
      }
    }
  }
  
  return -1;
}

function findStrategicMove(board, playerTwoMoves) {
  if (board[4] === null) {
    return 4;
  }
  
  if (playerTwoMoves.length > 0) {
    const adjacentMoves = {
      0: [1, 3, 4],
      1: [0, 2, 4],
      2: [1, 4, 5],
      3: [0, 4, 6],
      4: [0, 1, 2, 3, 5, 6, 7, 8],
      5: [2, 4, 8],
      6: [3, 4, 7],
      7: [4, 6, 8],
      8: [4, 5, 7]
    };
    
    const possibleMoves = playerTwoMoves
      .flatMap(move => adjacentMoves[move])
      .filter(move => board[move] === null);
    
    if (possibleMoves.length > 0) {
      return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
  }
  
  const corners = [0, 2, 6, 8].filter(corner => board[corner] === null);
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  return -1;
}