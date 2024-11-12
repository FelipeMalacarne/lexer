// src/lexer/lexer.ts

import { Automaton, createAutomaton, State } from './automaton';

const RESERVED_WORDS = new Set(['BEGIN', 'END', 'IF', 'ELSE']);
const SPECIAL_SYMBOLS = new Set([';', ':', ':=', '+', '-', '*', '/']);

export class Lexer {
  private automaton: Automaton;
  private currentState: State;
  private token: string;

  constructor() {
    this.automaton = createAutomaton();
    this.currentState = this.automaton.initialState;
    this.token = '';
  }

  reset() {
    this.currentState = this.automaton.initialState;
    this.token = '';
  }

  processSymbol(symbol: string): State {
    const nextState = this.automaton.transitions[this.currentState][symbol];
    if (nextState !== undefined) {
      this.currentState = nextState;
    } else {
      this.currentState = this.automaton.errorState;
    }
    this.token += symbol;
    return this.currentState;
  }

  isFinalState(): boolean {
    return this.automaton.finalStates.has(this.currentState);
  }

  isErrorState(): boolean {
    return this.currentState === this.automaton.errorState;
  }

  isReserved(): boolean {
    return RESERVED_WORDS.has(this.token.toUpperCase());
  }

  isSpecialSymbol(): boolean {
    return SPECIAL_SYMBOLS.has(this.token);
  }
}
