import React from 'react';
import EmojiSelector from './EmojiSelector';

export default function GameSetup({ mode, categories, setCategories }) {
  const isSingle = mode === 'single';
  const bothPicked = isSingle
    ? categories.player1 && categories.player2
    : categories.player1 && categories.player2;

  return (
    <div>
      {!categories.player1 && (
        <EmojiSelector
          player="Player 1"
          onSelect={(cat) => setCategories({ ...categories, player1: cat })}
        />
      )}
      {isSingle && categories.player1 && !categories.player2 && (
        <p>AI will auto-pick category: <strong>Food</strong></p>
      )}
    </div>
  );
}
