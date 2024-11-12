// src/components/LexerComponent.tsx

import React, { useState } from 'react';
import { Lexer } from '@/lib/lexer';

const LexerComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const lexer = new Lexer();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Resetar o lexer para cada nova entrada
    lexer.reset();

    const tokens = value.split(' ');
    const newResults: string[] = [];

    tokens.forEach((token) => {
      if (token === '') return; // Ignorar múltiplos espaços

      lexer.reset();
      let isValid = true;

      for (let char of token) {
        const state = lexer.processSymbol(char);
        if (lexer.isErrorState()) {
          isValid = false;
          break;
        }
      }

      if (isValid && lexer.isFinalState()) {
        if (lexer.isReserved()) {
          newResults.push(`${token}: Palavra Reservada`);
        } else if (lexer.isSpecialSymbol()) {
          newResults.push(`${token}: Símbolo Especial`);
        } else {
          newResults.push(`${token}: Reconhecido`);
        }
      } else {
        newResults.push(`${token}: Rejeitado`);
      }
    });

    setResults(newResults);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analisador Léxico</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Digite os tokens separados por espaço"
        className="border p-2 w-full"
      />
      <div className="mt-4">
        {results.map((result, index) => (
          <p key={index} className={
            result.includes('Reconhecido') || result.includes('Palavra Reservada') || result.includes('Símbolo Especial') 
              ? 'text-green-600' 
              : 'text-red-600'
          }>
            {result}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LexerComponent;
