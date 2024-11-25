// src/models/Automaton.ts

export const INITIAL_STATE = 0;
export const ERROR_STATE = 99;

export type State = number;

export interface Transition {
  [symbol: string]: State;
}

export interface Automaton {
  transitions: { [key: number]: Transition };
  initialState: State;
  finalStates: Set<State>;
  errorState: State;
}

export const ALPHABET: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

export const createAutomaton = (presetWords: string[]): Automaton => {
  let nextStateId = 1;

  const transitions: { [key: number]: Transition } = {
    [INITIAL_STATE]: {},
    [ERROR_STATE]: {},
  };
  const finalStates = new Set<State>();

  const stateMap: { [prefix: string]: State } = {};

  presetWords.forEach((word) => {
    let currentPrefix = '';
    let currentState = INITIAL_STATE;

    for (const char of word) {
      if (!ALPHABET.includes(char)) {
        continue;
      }
      currentPrefix += char;
      if (!stateMap[currentPrefix]) {
        const newState = nextStateId++;
        stateMap[currentPrefix] = newState;
        transitions[newState] = {}; // Inicializa as transições para o novo estado
      }
      transitions[currentState][char] = stateMap[currentPrefix];
      currentState = stateMap[currentPrefix];
    }
    finalStates.add(currentState);
  });

  return {
    transitions,
    initialState: INITIAL_STATE,
    finalStates,
    errorState: ERROR_STATE,
  };
};
