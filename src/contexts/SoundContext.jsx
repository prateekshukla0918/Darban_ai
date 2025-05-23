import React, { createContext, useState, useContext, useEffect } from 'react';

const SoundContext = createContext(undefined);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSoundPreference = localStorage.getItem('soundEnabled');
    return savedSoundPreference ? savedSoundPreference === 'true' : true;
  });

  const [placeSound, setPlaceSound] = useState(null);
  const [winSound, setWinSound] = useState(null);
  const [selectSound, setSelectSound] = useState(null);

  useEffect(() => {
    const place = new Audio('/sounds/place.mp3');
    const win = new Audio('/sounds/win.mp3');
    const select = new Audio('/sounds/select.mp3');

    setPlaceSound(place);
    setWinSound(win);
    setSelectSound(select);

    return () => {
      place.pause();
      win.pause();
      select.pause();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playPlaceSound = () => {
    if (soundEnabled && placeSound) {
      placeSound.currentTime = 0;
      placeSound.play().catch(e => console.log('Error playing sound:', e));
    }
  };

  const playWinSound = () => {
    if (soundEnabled && winSound) {
      winSound.currentTime = 0;
      winSound.play().catch(e => console.log('Error playing sound:', e));
    }
  };

  const playSelectSound = () => {
    if (soundEnabled && selectSound) {
      selectSound.currentTime = 0;
      selectSound.play().catch(e => console.log('Error playing sound:', e));
    }
  };

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      toggleSound,
      playPlaceSound,
      playWinSound,
      playSelectSound
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
