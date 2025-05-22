// EmojiSelector.jsx
import React from 'react';
import { emojiCategories } from '../utils/emojiCategories';

export default function EmojiSelector({ player, onSelect }) {
  return (
    <div>
      <h3>{player}, pick your emoji category:</h3>
      <div className="emoji-grid">
        {Object.keys(emojiCategories).map((cat) => (
          <button key={cat} onClick={() => onSelect(cat)}>
            {cat} {emojiCategories[cat].slice(0, 4).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
