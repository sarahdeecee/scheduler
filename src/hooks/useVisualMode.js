import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length < 1 ) {
      return undefined;
    }
    const lastMode = history.pop();
    setHistory(history);
    setMode(lastMode);
  };
  return { mode, transition, back };
};
