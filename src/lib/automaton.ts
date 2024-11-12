
export enum State {
  INITIAL = 0,
  IDENTIFIER = 1,
  RESERVED = 2,
  ERROR = 99,
}

export type Symbol = string;

export interface Transition {
  [symbol: string]: State;
}

export interface Automaton {
  transitions: { [key in State]: Transition };
  initialState: State;
  finalStates: Set<State>;
  errorState: State;
}

const RESERVED_WORDS = new Set(['BEGIN', 'END', 'IF', 'ELSE']);
const SPECIAL_SYMBOLS = new Set([';', ':', ':=', '+', '-', '*', '/']);


// src/lexer/automaton.ts

export const createAutomaton = (): Automaton => {
  const transitions: { [key in State]: Transition } = {
    [State.INITIAL]: {},
    [State.IDENTIFIER]: {},
    [State.RESERVED]: {},
    [State.ERROR]: {},
  };

  // Preencher transições para o Estado Inicial
  for (let char = 97; char <= 122; char++) { // 'a' to 'z'
    transitions[State.INITIAL][String.fromCharCode(char)] = State.IDENTIFIER;
  }
  for (let char = 65; char <= 90; char++) { // 'A' to 'Z'
    transitions[State.INITIAL][String.fromCharCode(char)] = State.IDENTIFIER;
  }

  // Preencher transições para o Estado de Identificador
  for (let char = 97; char <= 122; char++) { // 'a' to 'z'
    transitions[State.IDENTIFIER][String.fromCharCode(char)] = State.IDENTIFIER;
  }
  for (let char = 65; char <= 90; char++) { // 'A' to 'Z'
    transitions[State.IDENTIFIER][String.fromCharCode(char)] = State.IDENTIFIER;
  }
  for (let char = 48; char <= 57; char++) { // '0' to '9'
    transitions[State.IDENTIFIER][String.fromCharCode(char)] = State.IDENTIFIER;
  }

  // Transições para símbolos especiais no Estado Inicial
  SPECIAL_SYMBOLS.forEach(symbol => {
    transitions[State.INITIAL][symbol] = State.RESERVED;
  });

  // Estado de Erro não tem transições

  const finalStates = new Set<State>([State.IDENTIFIER, State.RESERVED]);

  return {
    transitions,
    initialState: State.INITIAL,
    finalStates,
    errorState: State.ERROR,
  };
};
