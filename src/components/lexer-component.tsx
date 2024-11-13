// src/components/Lexer/LexerComponent.tsx

import React, { useState, useEffect } from 'react';
import { Lexer } from '@/lib/lexer';
import { PRESETS } from '@/lib/presets';
import { ALPHABET, INITIAL_STATE, ERROR_STATE, State } from '@/lib/automaton';
import TransitionMatrix from '@/components/transition-matrix';
import LexerResults from '@/components/lexer-results';

export 
const LexerComponent: React.FC = () => {
  const [preset, setPreset] = useState<string>('default');
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [lexer, setLexer] = useState<Lexer>(new Lexer(PRESETS['default']));
  const [customWord, setCustomWord] = useState<string>('');
  const [transitionMatrix, setTransitionMatrix] = useState<{ [key: number]: { [symbol: string]: number } }>({});
  const [currentState, setCurrentState] = useState<State>(INITIAL_STATE);

  const addCustomWord = (word: string): void => {
    if (!PRESETS.custom.includes(word)) {
        PRESETS.custom.push(word);
    }
   };

  // Inicializa o Lexer quando o preset muda
  useEffect(() => {
    const newLexer = new Lexer(PRESETS[preset]);
    setLexer(newLexer);
    setTransitionMatrix(newLexer.getTransitionMatrix());
    setResults([]);
    setInput('');
    setCurrentState(INITIAL_STATE);
  }, [preset]);

  /**
   * Lida com a mudança na entrada do usuário.
   * Processa os tokens e atualiza os resultados e a matriz de transições.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Processa os tokens separados por espaço
    const tokens = value.split(' ').filter(token => token !== '');
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
   * Lida com a mudança de preset.
   */
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreset(e.target.value);
  };

  /**
   * Adiciona uma palavra personalizada ao preset 'custom'.
   */
  const handleAddCustomWord = () => {
    const trimmedWord = customWord.trim().toLowerCase();
    if (trimmedWord !== '' && /^[a-z]+$/.test(trimmedWord)) { // Validação para letras minúsculas
      addCustomWord(trimmedWord);
      setCustomWord('');
      if (preset === 'custom') {
        const newLexer = new Lexer(PRESETS.custom);
        setLexer(newLexer);
        setTransitionMatrix(newLexer.getTransitionMatrix());
        setCurrentState(INITIAL_STATE);
      }
    } else {
      alert('Por favor, insira uma palavra válida contendo apenas letras de a a z.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analisador Léxico</h2>
      
      {/* Seleção de Preset */}
      <div className="mb-4 flex items-center">
        <label htmlFor="preset" className="mr-2">Selecionar Preset:</label>
        <select
          id="preset"
          value={preset}
          onChange={handlePresetChange}
          className="border p-2"
        >
          {Object.keys(PRESETS).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Adição de Palavras Personalizadas */}
      {preset === 'custom' && (
        <div className="mb-4 flex items-center">
          <input
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
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Digite os tokens separados por espaço"
        className="border p-2 w-full mb-4"
      />
      
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
