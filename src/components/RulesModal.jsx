import React from "react";
import "../styles/RulesModal.css";

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Game Rules</h2>
        <ul>
          <li>3x3 grid classic tic tac toe style</li>
          <li>Each player chooses an emoji category</li>
          <li>Random emoji from category per turn</li>
          <li>Max 3 emojis on board per player</li>
          <li>When placing the 4th emoji, oldest emoji vanishes (FIFO)</li>
          <li>Cannot reuse vanished cell</li>
          <li>Win by 3 in a row of your emojis</li>
          <li>No draws possible due to vanishing rule</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
