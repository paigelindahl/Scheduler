import { useState } from "react";

//acts as a history to transition between various modes when passed back to index.js
export default function useVisualMode(initial) {
  const [state, setState] = useState([initial]);
  function transition(mode, replace) {
    const newState = [...state];
    if (replace) {
      newState.pop();
    }
    newState.push(mode);
    setState(newState);
  }
  const back = function () {
    if (state.length < 2) {
      return;
    }
    const newState = [...state];
    newState.pop();
    setState(newState);
  };

  const mode = state[state.length - 1];

  return { mode, transition, back };
}
