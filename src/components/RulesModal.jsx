import React from 'react';
import { X } from 'lucide-react';
import '../styles/RulesModal.css';

const RulesModal = ({ onClose }) => {
  return (
    <div className="rules-modal-overlay">
      <div className="rules-modal">
        <div className="rules-header">
          <h2>How to Play Blink Tac Toe</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="rules-content">
          <section>
            <h3>🎮 Basic Rules</h3>
            <p>Like traditional Tic-Tac-Toe, players take turns placing emojis on a 3×3 grid with the goal of forming a straight line (horizontal, vertical, or diagonal).</p>
          </section>
          
          <section>
            <h3>🎭 Emoji Categories</h3>
            <p>Each player selects an emoji category. On your turn, a random emoji from your category will be placed on the board.</p>
          </section>
          
          <section>
            <h3>🔄 The Vanishing Rule</h3>
            <p>You can only have 3 emojis on the board at once. When you place your 4th emoji, your oldest emoji disappears (FIFO - First In, First Out).</p>
            <p>This makes strategy more dynamic - your winning line might vanish if you don't plan carefully!</p>
          </section>
          
          <section>
            <h3>🏆 Scoring</h3>
            <p>Each round win earns you 1 point. This wins the match.</p>
          </section>
          
          <section>
            <h3>👤 Game Modes</h3>
            <ul>
              <li><strong>Single Player:</strong> Play against the Computer</li>
              <li><strong>Two Player:</strong> Play against a friend</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
