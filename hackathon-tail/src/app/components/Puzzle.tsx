'use client'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


interface SquareProps {
  id: string;
  name: string;
  type: string;
  index: number;
  moveSquare: (dragIndex: number, hoverIndex: number) => void;
}

const Square: React.FC<SquareProps> = ({ id, name, type, index, moveSquare }) => {
  const [, ref] = useDrag({
    type,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item: any, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveSquare(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className='bg-blue-100 m-1 p-10 rounded-lg'>
      {name}
    </div>
  );
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState([
    { id: '1', name: 'Square 1', type: 'SQUARE', index: 0 },
    { id: '2', name: 'Square 2', type: 'SQUARE', index: 1 },
    { id: '3', name: 'Square 3', type: 'SQUARE', index: 2 },
    { id: '4', name: 'Square 4', type: 'SQUARE', index: 3 },
    { id: '5', name: 'Square 5', type: 'SQUARE', index: 4 },
    { id: '6', name: 'Square 6', type: 'SQUARE', index: 5 },
    { id: '7', name: 'Square 7', type: 'SQUARE', index: 6 },
  ]);

  const moveSquare = (dragIndex: number, hoverIndex: number) => {
    const newSquares = [...squares];
    const draggedSquare = newSquares[dragIndex];

    newSquares.splice(dragIndex, 1);
    newSquares.splice(hoverIndex, 0, draggedSquare);

    setSquares(newSquares);
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-60'>
      <h2 className='text-white font-bold text-base'>EnigMusic</h2>
      <div className="flex justify-center items-center">
        {squares.map((square) => (
          <Square key={square.id} {...square} moveSquare={moveSquare} />
        ))}
      </div>
      <button onClick={() => alert(JSON.stringify(squares.map((square) => square.name)))} className='bg-blue-500 p-2 rounded'>
        Enviar Resposta
      </button>
    </div>
  );
};

const DragAndDropBoard: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
};

export default DragAndDropBoard;
