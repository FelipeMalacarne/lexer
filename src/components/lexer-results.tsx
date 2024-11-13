import React from 'react';

interface LexerResultsProps {
  results: string[];
}

const LexerResults: React.FC<LexerResultsProps> = ({ results }) => {
  return (
    <div className="mt-4">
      {results.map((result, index) => (
        <p
          key={index}
          className={result.includes('Reconhecido') ? 'text-green-600' : 'text-red-600'}
        >
          {result}
        </p>
      ))}
    </div>
  );
};

export default LexerResults;
