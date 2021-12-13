import { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => (
    (!replace) ? setHistory(prev => [...prev, mode]) : null,
    setMode(newMode)
  );

  const back = () => {
    if (history.length < 1 ) {
      return undefined;
    }
    const lastMode = history.pop();
    setHistory(history);
    setMode(lastMode);
  };
  console.log('mode:',mode, 'transition:',transition, 'back:',back, 'history:',history);
  return { mode, transition, back };
};
