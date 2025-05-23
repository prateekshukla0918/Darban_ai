// src/components/SoundToggle.jsx
import { useSound } from "../contexts/SoundContext";

export default function SoundToggle() {
  const { soundOn, setSoundOn } = useSound();

  return (
    <button className="sound-toggle" onClick={() => setSoundOn(!soundOn)}>
      {soundOn ? "🔊 Sound On" : "🔇 Sound Off"}
    </button>
  );
}
