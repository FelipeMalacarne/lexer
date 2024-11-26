// src/components/Lexer/LexerComponent.tsx

import React, { useState, useEffect} from "react";
import { Lexer } from "@/lib/lexer";
import {  INITIAL_STATE,  State } from "@/lib/automaton";
import { Input } from "./ui/input";
import LexerResults from "./lexer-results";
import TransitionMatrix from "./transition-matrix";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { usePresets } from "@/providers/preset-provider";

const LexerComponent: React.FC = () => {
  const { selectedPreset } = usePresets();
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [lexer, setLexer] = useState<Lexer>(
    new Lexer(selectedPreset.tokens)
  );
  const [transitionMatrix, setTransitionMatrix] = useState<{
    [key: number]: { [symbol: string]: number };
  }>({});
  const [currentState, setCurrentState] = useState<State>(INITIAL_STATE);

  useEffect(() => {
    const newLexer = new Lexer(selectedPreset.tokens);
    setLexer(newLexer);
    setTransitionMatrix(newLexer.getTransitionMatrix());
    setResults([]);
    setInput("");
    setCurrentState(INITIAL_STATE);
  }, [selectedPreset]);

  /**
   * Handles user input changes.
   * Processes tokens and updates results and transition matrix.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Process tokens separated by space
    const tokens = value.split(" ").filter((token) => token !== "");
    const newResults: string[] = [];
    lexer.reset();

    tokens.forEach((token) => {
      lexer.reset();
      let isValid = true;
      let tempCurrentState = INITIAL_STATE;

      for (const char of token) {
        tempCurrentState = lexer.processSymbol(char);
        if (lexer.isErrorState()) {
          isValid = false;
          break;
        }
      }

      if (isValid && lexer.isFinalState()) {
        newResults.push(`${token}: Reconhecido`);
      } else {
        newResults.push(`${token}: Rejeitado`);
      }

      setCurrentState(tempCurrentState);
    });

    setResults(newResults);
    setTransitionMatrix(lexer.getTransitionMatrix());
  };

  return (
    <div className="p-4">

      <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Digite os tokens separados por espaço"
              className="border p-2 w-full mb-4"
            />

        <Card>
          <CardHeader>
            <CardTitle>Active Preset</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      {/* Resultados do Lexer */}
      <LexerResults results={results} />

      {/* Matriz de Transições */}
      <TransitionMatrix
        transitionMatrix={transitionMatrix}
        currentState={currentState}
      />
    </div>
  );
};

export default LexerComponent;
