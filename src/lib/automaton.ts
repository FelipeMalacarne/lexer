// src/lexer/automaton.ts

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

import { PRESETS } from '../lib/presets';

// Função para construir o autômato baseado em um preset de palavras
export const createAutomaton = (presetWords: string[]): Automaton => {
  let nextStateId = 1; // Reinicia a contagem para cada novo autômato

  const transitions: { [key: number]: Transition } = {
    [INITIAL_STATE]: {},
    [ERROR_STATE]: {}, // Estado de erro não tem transições
  };
  const finalStates = new Set<State>();

  // Mapa para armazenar os estados de cada prefixo
  const stateMap: { [prefix: string]: State } = {};

  // Construção da trie
  presetWords.forEach(word => {
    let currentPrefix = '';
    let currentState = INITIAL_STATE;

    for (const char of word) {
      if (!ALPHABET.includes(char)) {
        // Ignorar caracteres fora do alfabeto
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
