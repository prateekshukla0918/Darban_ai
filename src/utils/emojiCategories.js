// utils/emojiCategories.js

export const generateRandomEmoji = (category) => {
  const emojiCategories = {
    Animals: ["🐶", "🐱", "🐯", "🐷", "🐰"],
    Food: ["🍎", "🍔", "🍕", "🍩", "🍓"],
    Nature: ["🌳", "🌸", "🌵", "🍂", "🌍"],
  };

  // Check if the category exists in the emojiCategories object
  const emojis = emojiCategories[category];

  if (!emojis) {
    console.error("Invalid category selected");
    return { player: [], ai: [] }; // Return empty arrays for player and AI as fallback
  }

  // Randomly pick one emoji for the player and AI from the selected category
  const playerEmoji = [emojis[Math.floor(Math.random() * emojis.length)]];
  const aiEmoji = [emojis[Math.floor(Math.random() * emojis.length)]];

  // Return the emojis object for player and AI
  return { player: playerEmoji, ai: aiEmoji };
};
