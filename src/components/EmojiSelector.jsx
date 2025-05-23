import React from 'react';
import { emojiCategories } from '../utils/emojiCategories';
import '../styles/EmojiSelector.css';

const EmojiSelector = ({ 
  onSelectCategory, 
  selectedCategory,
  disabledCategory 
}) => {
  return (
    <div className="emoji-selector">
      <h3>Select Emoji Category</h3>
      <div className="category-grid">
        {Object.entries(emojiCategories).map(([category, data]) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => onSelectCategory(category)}
            disabled={disabledCategory === category}
            aria-label={`Select ${data.name} category`}
          >
            <span className="category-emoji">{data.preview}</span>
            <span className="category-name">{data.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
