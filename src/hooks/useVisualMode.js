import { useState, useEffect } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log('mode: ',mode);

  const transition = (newMode) => {
    setMode(newMode);
  };

  return {mode, transition, back, history};
}

export default useVisualMode;

