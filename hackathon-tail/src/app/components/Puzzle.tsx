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
    <audio
      ref={(node) => ref(drop(node))}
      controls
      style={{ border: '1px solid #000', padding: '10px', margin: '5px' }}
    >
      <source src={name} type="audio/mp3" />
    </audio>
  );
};

const Board: React.FC = () => {
  const [squares, setSquares] = useState([
    { id: '1', name: 'path/to/audio1.mp3', type: 'SQUARE', index: 0 },
    { id: '2', name: 'path/to/audio2.mp3', type: 'SQUARE', index: 1 },
    { id: '3', name: 'path/to/audio3.mp3', type: 'SQUARE', index: 2 },
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
      <div className="grid justify-center items-center">
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
