import React from "react";
import { emojiCategories } from "../utils/emojiCategories";
import "../styles/PlayerInfo.css";

export default function PlayerInfo({ player, emojiCategory }) {
  return (
    <div className="player-info">
      <h3>{player}</h3>
      <div className="emoji-preview">
        {emojiCategory
          ? emojiCategories[emojiCategory].slice(0, 5).map((emoji, i) => (
              <span key={i}>{emoji}</span>
            ))
          : "No selection"}
      </div>
    </div>
  );
}
