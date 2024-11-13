// src/components/LexerComponent.tsx

import React, { useState, useEffect } from 'react';
import { Lexer } from '../lib/lexer';
import { PRESETS } from '../lib/presets';
import { ALPHABET, INITIAL_STATE, ERROR_STATE, State } from '../lib/automaton';

const LexerComponent: React.FC = () => {
  const [preset, setPreset] = useState<string>('default');
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [lexer, setLexer] = useState<Lexer>(new Lexer(PRESETS['default']));
  const [customWord, setCustomWord] = useState<string>('');
  const [transitionMatrix, setTransitionMatrix] = useState<{ [key: number]: { [symbol: string]: number } }>({});
  const [currentState, setCurrentState] = useState<State>(INITIAL_STATE);

  useEffect(() => {
    const newLexer = new Lexer(PRESETS[preset]);
    setLexer(newLexer);
    setTransitionMatrix(newLexer.getTransitionMatrix());
    setResults([]);
    setInput('');
    setCurrentState(INITIAL_STATE);
  }, [preset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Processar os tokens
    const tokens = value.split(' ');
    const newResults: string[] = [];
    lexer.reset();

    tokens.forEach((token) => {
      if (token === '') return; // Ignorar múltiplos espaços

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

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreset(e.target.value);
  };

  const handleAddCustomWord = () => {
    const trimmedWord = customWord.trim().toLowerCase();
    if (trimmedWord !== '' && /^[a-z]+$/.test(trimmedWord)) { // Validar apenas letras do alfabeto
      PRESETS.custom.push(trimmedWord);
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

  // Função para renderizar a matriz de transições
  const renderTransitionMatrix = () => {
    const states = Object.keys(transitionMatrix).map(key => parseInt(key));
    const sortedStates = states.sort((a, b) => a - b);

    return (
      <table className="table-auto w-full mt-6 border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-400">Estado</th>
            {ALPHABET.map(symbol => (
              <th key={symbol} className="px-4 py-2 border border-gray-400">{symbol}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedStates.map(state => (
            <tr key={state} className={state === currentState ? 'bg-yellow-200' : ''}>
              <td className="px-4 py-2 border border-gray-400">{state}</td>
              {ALPHABET.map(symbol => (
                <td key={symbol} className="px-4 py-2 border border-gray-400">
                  {transitionMatrix[state][symbol] !== undefined ? transitionMatrix[state][symbol] : '-'}
                </td>
              ))}
            </tr>
          ))}
          {/* Estado de Erro */}
          <tr className={currentState === ERROR_STATE ? 'bg-red-200' : ''}>
            <td className="px-4 py-2 border border-gray-400">{ERROR_STATE} (Erro)</td>
            {ALPHABET.map(symbol => (
              <td key={symbol} className="px-4 py-2 border border-gray-400">-</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analisador Léxico</h2>
      
      <div className="mb-4">
        <label htmlFor="preset" className="mr-2">Selecionar Preset:</label>
        <select id="preset" value={preset} onChange={handlePresetChange} className="border p-2">
          {Object.keys(PRESETS).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {preset === 'custom' && (
        <div className="mb-4">
          <input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Adicionar palavra personalizada"
            className="border p-2 mr-2"
          />
          <button onClick={handleAddCustomWord} className="bg-blue-500 text-white p-2">
            Adicionar
          </button>
        </div>
      )}
      
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Digite os tokens separados por espaço"
        className="border p-2 w-full mb-4"
      />
      <div className="mt-4">
        {results.map((result, index) => (
          <p key={index} className={result.includes('Reconhecido') ? 'text-green-600' : 'text-red-600'}>
            {result}
          </p>
        ))}
      </div>

      {/* Exibir a matriz de transições */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Matriz de Transições</h3>
        {renderTransitionMatrix()}
      </div>
    </div>
  );
};

export default LexerComponent;
