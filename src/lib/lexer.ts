import { Automaton, createAutomaton, State, ALPHABET } from "@/lib/automaton";

export class Lexer {
  private automaton: Automaton;
  private currentState: State;
  private token: string;

  constructor(presetWords: string[]) {
    this.automaton = createAutomaton(presetWords);
    this.currentState = this.automaton.initialState;
    this.token = "";
  }

  reset() {
    this.currentState = this.automaton.initialState;
    this.token = "";
  }

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

  isFinalState(): boolean {
    return this.automaton.finalStates.has(this.currentState);
  }

  isErrorState(): boolean {
    return this.currentState === this.automaton.errorState;
  }

  getCurrentState(): State {
    return this.currentState;
  }

  getTransitionMatrix(): { [key: number]: { [symbol: string]: number } } {
    return this.automaton.transitions;
  }
}
