// src/models/Lexer.ts

import { Automaton, createAutomaton, INITIAL_STATE, ERROR_STATE, State, ALPHABET } from '@/lib/automaton';

export class Lexer {
  private automaton: Automaton;
  private currentState: State;
  private token: string;

  constructor(presetWords: string[]) {
    this.automaton = createAutomaton(presetWords);
    this.currentState = this.automaton.initialState;
    this.token = '';
  }

  /**
   * Reseta o Lexer para o estado inicial.
   */
  reset() {
    this.currentState = this.automaton.initialState;
    this.token = '';
  }

  /**
   * Processa um símbolo e atualiza o estado atual.
   * @param symbol Símbolo a ser processado.
   * @returns O novo estado após a transição.
   */
  processSymbol(symbol: string): State {
    if (!ALPHABET.includes(symbol)) {
      this.currentState = this.automaton.errorState;
      return this.currentState;
    }

    const nextState = this.automaton.transitions[this.currentState]?.[symbol];
    if (nextState !== undefined) {
      this.currentState = nextState;
    } else {
      this.currentState = this.automaton.errorState;
    }
    this.token += symbol;
    return this.currentState;
  }

  /**
   * Verifica se o estado atual é um estado final.
   * @returns Verdadeiro se for um estado final, falso caso contrário.
   */
  isFinalState(): boolean {
    return this.automaton.finalStates.has(this.currentState);
  }

  /**
   * Verifica se o estado atual é o estado de erro.
   * @returns Verdadeiro se for o estado de erro, falso caso contrário.
   */
  isErrorState(): boolean {
    return this.currentState === this.automaton.errorState;
  }

  /**
   * Obtém o estado atual do Lexer.
   * @returns O estado atual.
   */
  getCurrentState(): State {
    return this.currentState;
  }

  /**
   * Obtém a matriz de transições do autômato.
   * @returns A matriz de transições.
   */
  getTransitionMatrix(): { [key: number]: { [symbol: string]: number } } {
    return this.automaton.transitions;
  }
}
