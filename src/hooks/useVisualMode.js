import { useState, useEffect } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    (!replace) ? setHistory(prev => [...prev, mode]) : null;
    setMode(newMode);
  };

  const back = () => {
    if (history.length < 1 ) {
      return;
    }
    const lastMode = history.pop();
    setHistory(history);
    setMode(lastMode);
  };
  
  return { mode, transition, back, history };
}

export default useVisualMode;

