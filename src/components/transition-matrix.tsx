// src/components/Lexer/TransitionMatrix.tsx

import React, { useEffect, useRef } from 'react';
import { ALPHABET, ERROR_STATE } from '@/lib/automaton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TransitionMatrixProps {
  transitionMatrix: { [key: number]: { [symbol: string]: number } };
  currentState: number;
}

const TransitionMatrix: React.FC<TransitionMatrixProps> = ({ transitionMatrix, currentState }) => {
  const states = Object.keys(transitionMatrix).map(key => parseInt(key, 10));
  const sortedStates = states.sort((a, b) => a - b);

  const currentRowRef = useRef<HTMLTableRowElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentRowRef.current && scrollContainerRef.current) {
      const row = currentRowRef.current;
      const container = scrollContainerRef.current;

      // Calculate the position to scroll to (center the row)
      const containerHeight = container.clientHeight;
      const rowTop = row.offsetTop;
      const rowHeight = row.clientHeight;
      const scrollPosition = rowTop - (containerHeight / 2) + (rowHeight / 2);

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentState]);

  return (
    <div className="mt-8">
      <Table
        outerClassName="max-h-96 overflow-y-auto relative"
        outerRef={scrollContainerRef}
        className='bg-card w-full'
      >
        <TableHeader>
          <TableRow>
            <TableHead className='sticky top-0 bg-card z-10 font-medium border-b px-4 py-2'>
              Estado
            </TableHead>
            {ALPHABET.map(symbol => (
              <TableHead
                key={symbol}
                className='sticky top-0 bg-card z-10 font-medium border-b px-4 py-2'
              >
                {symbol}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStates.map(state => (
            <TableRow
              key={state}
              ref={state === currentState ? currentRowRef : null}
              className={
                state === currentState
                  ? 'bg-primary/80 text-primary-foreground hover:bg-primary/90'
                  : 'text-foreground'
              }
            >
              <TableCell className="font-medium border-t px-4 py-2">
                {state}
              </TableCell>
              {ALPHABET.map(symbol => (
                <TableCell key={symbol} className="border-t px-4 py-2">
                  {transitionMatrix[state][symbol] !== undefined ? transitionMatrix[state][symbol] : '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* Estado de Erro */}
          <TableRow className={currentState === ERROR_STATE ? 'bg-red-200' : 'text-foreground'}>
            <TableCell className="border-t px-4 py-2">
              {ERROR_STATE} (Erro)
            </TableCell>
            {ALPHABET.map(symbol => (
              <TableCell key={symbol} className="border-t px-4 py-2">
                -
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TransitionMatrix;
