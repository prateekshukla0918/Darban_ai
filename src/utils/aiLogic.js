export const getRandomAIMove = (board, bannedCells) => {
    const validIndices = board
      .map((val, idx) => (val === null && !bannedCells.has(idx) ? idx : null))
      .filter((i) => i !== null);
  
    if (validIndices.length === 0) return null;
  
    const randomIndex = Math.floor(Math.random() * validIndices.length);
    return validIndices[randomIndex];
  };
  