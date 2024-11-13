// src/components/Lexer/TransitionMatrix.tsx

import React from 'react';
import { ALPHABET, ERROR_STATE } from '@/lib/automaton';

interface TransitionMatrixProps {
  transitionMatrix: { [key: number]: { [symbol: string]: number } };
  currentState: number;
}

const TransitionMatrix: React.FC<TransitionMatrixProps> = ({ transitionMatrix, currentState }) => {
  const states = Object.keys(transitionMatrix).map(key => parseInt(key));
  const sortedStates = states.sort((a, b) => a - b);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Matriz de Transições</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
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
                  <td key={symbol} className="px-4 py-2 border border-gray-400 text-center">
                    {transitionMatrix[state][symbol] !== undefined ? transitionMatrix[state][symbol] : '-'}
                  </td>
                ))}
              </tr>
            ))}
            {/* Estado de Erro */}
            <tr className={currentState === ERROR_STATE ? 'bg-red-200' : ''}>
              <td className="px-4 py-2 border border-gray-400">{ERROR_STATE} (Erro)</td>
              {ALPHABET.map(symbol => (
                <td key={symbol} className="px-4 py-2 border border-gray-400 text-center">-</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransitionMatrix;
