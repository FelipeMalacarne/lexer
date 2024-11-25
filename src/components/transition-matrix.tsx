// src/components/Lexer/TransitionMatrix.tsx

import React from 'react';
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
  const states = Object.keys(transitionMatrix).map(key => parseInt(key));
  const sortedStates = states.sort((a, b) => a - b);

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <Table className='bg-card' >
            <TableCaption>Matriz de transações</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className='font-medium' >Estado</TableHead>
                {ALPHABET.map(symbol => (
                    <TableHead key={symbol} >{symbol}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
          <TableBody>
            {sortedStates.map(state => (
              <TableRow key={state} className={state === currentState ? 'bg-primary/80 text-primary-foreground hover:bg-primary/90' : 'text-foreground'}>
                <TableCell className={'font-medium'}>{state}</TableCell>
                {ALPHABET.map(symbol => (
                  <TableCell key={symbol} >
                    {transitionMatrix[state][symbol] !== undefined ? transitionMatrix[state][symbol] : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {/* Estado de Erro */}
            <TableRow className={currentState === ERROR_STATE ? 'bg-red-200' : ''}>
              <TableCell >{ERROR_STATE} (Erro)</TableCell>
{/* className="px-4 py-2 border border-gray-400" */}
              {ALPHABET.map(symbol => (
// className="px-4 py-2 border border-gray-400 text-center"
                <TableCell key={symbol} >-</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransitionMatrix;
