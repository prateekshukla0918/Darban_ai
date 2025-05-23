// src/contexts/SoundContext.jsx
import { createContext, useState, useContext } from "react";

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [soundOn, setSoundOn] = useState(true);

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
};
