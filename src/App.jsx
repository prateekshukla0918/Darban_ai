import React, { useState } from "react";
import ModeSelect from "./components/ModeSelect";
import RulesModal from "./components/RulesModal";
import "./styles/ModeSelect.css";
import "./styles/RulesModal.css";

export default function App() {
  const [mode, setMode] = useState(null); // 'single' | 'multi' | null
  const [showRules, setShowRules] = useState(false);

  function handleSelectMode(selectedMode) {
    setMode(selectedMode);
  }

  function handleShowRules() {
    setShowRules(true);
  }

  function handleCloseRules() {
    setShowRules(false);
  }

  if (!mode) {
    // Show mode select screen first
    return (
      <>
        <ModeSelect onSelectMode={handleSelectMode} onShowRules={handleShowRules} />
        <RulesModal isOpen={showRules} onClose={handleCloseRules} />
      </>
    );
  }

  // Placeholder for next screens (setup or game)
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{mode === "single" ? "Single Player Mode" : "Multiplayer Mode"}</h2>
      <button onClick={() => setMode(null)}>Back to Mode Select</button>
    </div>
  );
}
