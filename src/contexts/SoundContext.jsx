import React, { createContext, useContext, useState, useCallback } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play sound utility
  const playSound = useCallback((url) => {
    if (!soundEnabled) return;
    const audio = new Audio(url);
    audio.play();
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // You should have these sound files in /src/assets/sounds/
  const sounds = {
    click: '/src/assets/sounds/click.mp3',
    place: '/src/assets/sounds/place.mp3',
    win: '/src/assets/sounds/win.mp3',
    reset: '/src/assets/sounds/reset.mp3',
    start: '/src/assets/sounds/start.mp3',
    draw: '/src/assets/sounds/draw.mp3',
    toggle: '/src/assets/sounds/toggle.mp3',
    select: '/src/assets/sounds/select.mp3',
    error: '/src/assets/sounds/error.mp3',
  };

  // Define play functions for each sound effect
  const playClickSound = () => playSound(sounds.click);
  const playPlaceSound = () => playSound(sounds.place);
  const playWinSound = () => playSound(sounds.win);
  const playResetSound = () => playSound(sounds.reset);
  const playStartSound = () => playSound(sounds.start);
  const playDrawSound = () => playSound(sounds.draw);
  const playToggleSound = () => playSound(sounds.toggle);
  const playSelectSound = () => playSound(sounds.select);
  const playErrorSound = () => playSound(sounds.error);

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      toggleSound,
      playClickSound,
      playPlaceSound,
      playWinSound,
      playResetSound,
      playStartSound,
      playDrawSound,
      playToggleSound,
      playSelectSound,
      playErrorSound
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};
