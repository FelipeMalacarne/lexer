import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface LexerResultsProps {
  results: string[];
}

const LexerResults: React.FC<LexerResultsProps> = ({ results }) => {
  return (
    <ScrollArea className="h-full max-h-screen overflow-y-auto">
      {results.map((result, index) => (
        <>
        <p
          key={index}
          className={result.includes('Reconhecido') ? 'text-green-600' : 'text-red-600'}
        >
          {result}
        </p>

        <Separator className="my-2" />

        </>
      ))}
    </ScrollArea>
  );
};

export default LexerResults;
