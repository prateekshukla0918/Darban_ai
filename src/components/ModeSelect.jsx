import React from "react";
import "../styles/ModeSelect.css";


export default function ModeSelect({ onSelectMode, onShowRules }) {
  return (
    <div className="mode-select-container">
      <h1>Blink Tac Toe</h1>
      <button onClick={() => onSelectMode("single")}>Single Player</button>
      <button onClick={() => onSelectMode("multi")}>Multiplayer</button>
      <button className="rules-button" onClick={onShowRules}>
        Show Rules
      </button>
    </div>
  );
}
