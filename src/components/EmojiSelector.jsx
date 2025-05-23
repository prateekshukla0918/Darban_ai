import React from 'react';

function EmojiSelector({ onCategorySelect }) {
  console.log('onCategorySelect function:', onCategorySelect); // Debugging log

  const categories = ['Animals', 'Food', 'Sports', 'Faces'];

  return (
    <div>
      {categories.map(category => (
        <button 
          key={category}
          onClick={() => onCategorySelect(category)} // Passing the selected category to parent
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default EmojiSelector;
