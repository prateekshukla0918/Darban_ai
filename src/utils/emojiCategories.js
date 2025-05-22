export const emojiCategories = {
  Animals: ['🐶', '🐱', '🐰', '🦊'],
  Food: ['🍕', '🍔', '🍩', '🍟'],
  Sports: ['⚽', '🏀', '🏈', '⚾'],
  Faces: ['😎', '😊', '😂', '😡'],
};

export const getRandomEmojiFromCategory = (categoryName) => {
  const list = emojiCategories[categoryName];
  return list[Math.floor(Math.random() * list.length)];
};
