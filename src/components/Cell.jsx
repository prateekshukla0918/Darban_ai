// src/components/Cell.jsx
import { useEffect, useRef } from "react";
import { useSound } from "../contexts/SoundContext";
import moveSound from "../assets/sounds/move.mp3";

export default function Cell({ value, onClick, isWinning }) {
  const { soundOn } = useSound();
  const audioRef = useRef(null);

  useEffect(() => {
    if (value && soundOn) {
      audioRef.current?.play();
    }
  }, [value, soundOn]);

  return (
    <div
      className={`cell ${isWinning ? "winning" : ""}`}
      onClick={onClick}
    >
      <span className={`emoji ${value ? "animate-in" : ""}`}>{value}</span>
      <audio ref={audioRef} src={moveSound} preload="auto" />
    </div>
  );
}
