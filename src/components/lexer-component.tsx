// src/components/Lexer/LexerComponent.tsx

import React, { useState, useEffect, useRef } from "react";
import { Lexer } from "@/lib/lexer";
import { presets as presetData, Preset } from "@/lib/presets";
import { ALPHABET, INITIAL_STATE, ERROR_STATE, State } from "@/lib/automaton";
import { Input } from "./ui/input";
import LexerResults from "./lexer-results";
import TransitionMatrix from "./transition-matrix";

interface LexerComponentProps {
  presetId: string;
}

const LexerComponent: React.FC<LexerComponentProps> = ({ presetId }) => {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [lexer, setLexer] = useState<Lexer>(new Lexer(getPresetTokens(presetId)));
  const [customWord, setCustomWord] = useState<string>("");
  const [transitionMatrix, setTransitionMatrix] = useState<{
    [key: number]: { [symbol: string]: number };
  }>({});
  const [currentState, setCurrentState] = useState<State>(INITIAL_STATE);

  // Reference to the transition matrix scroll container
  const transitionMatrixRef = useRef<HTMLDivElement | null>(null);

  // Helper function to retrieve tokens based on preset ID
  function getPresetTokens(id: string): string[] {
    const preset = presetData.find((preset) => preset.id === id);
    return preset ? preset.tokens : [];
  }

  // Initialize Lexer and Transition Matrix when presetId changes
  useEffect(() => {
    const newLexer = new Lexer(getPresetTokens(presetId));
    setLexer(newLexer);
    setTransitionMatrix(newLexer.getTransitionMatrix());
    setResults([]);
    setInput("");
    setCurrentState(INITIAL_STATE);
  }, [presetId]);

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

  /**
   * Adds a custom word to the 'custom' preset.
   */
  const handleAddCustomWord = () => {
    const trimmedWord = customWord.trim().toLowerCase();
    if (trimmedWord !== "" && /^[a-z]+$/.test(trimmedWord)) {
      // Validate for lowercase letters
      addCustomWord(trimmedWord);
      setCustomWord("");
      if (presetId === "custom-preset-id") {
        const newLexer = new Lexer(getPresetTokens(presetId));
        setLexer(newLexer);
        setTransitionMatrix(newLexer.getTransitionMatrix());
        setCurrentState(INITIAL_STATE);
      }
    } else {
      alert(
        "Por favor, insira uma palavra válida contendo apenas letras de a a z."
      );
    }
  };

  /**
   * Adds a custom word to the 'custom' preset.
   */
  const addCustomWord = (word: string): void => {
    const customPresetIndex = presetData.findIndex(
      (preset) => preset.id === "custom-preset-id"
    );
    if (customPresetIndex !== -1) {
      presetData[customPresetIndex].tokens.push(word);
    } else {
      console.error("Custom preset not found!");
    }
  };

  return (
    <div className="p-4">
      {/* Adição de Palavras Personalizadas */}
      {presetId === "custom-preset-id" && (
        <div className="mb-4 flex items-center">
          <Input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Adicionar palavra personalizada"
            className="border p-2 mr-2 flex-1"
          />
          <button
            onClick={handleAddCustomWord}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      )}

      {/* Campo de Entrada de Tokens */}
      <div className="grid grid-cols-2">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Digite os tokens separados por espaço"
          className="border p-2 w-full mb-4"
        />
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
