'use client'
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface Item {
  id: string;
  content: string;
  audioSrc: string;
}

interface FrameProps {
  frameId: string;
  items: Item[];
  onDrop: (item: Item, frameId: string) => void;
  onRemove: (item: Item) => void;
}

interface DraggableItemProps {
  item: Item;
  onRemove: () => void;
}

const ItemType = 'ITEM';

const DraggableItem: React.FC<DraggableItemProps> = ({ item, onRemove }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, content: item.content, audioSrc: item.audioSrc },
  });

  return (
    <div className='flex items-center'>
      <audio controls ref={drag} style={{padding: '10px', margin: '10px', cursor: 'move' }}>
        <source src={item.audioSrc} type="audio/mp3" />
      </audio>
      <button onClick={onRemove} className='bg-red-500 h-10 text-white rounded p-2 ml-3'>Remover</button>
    </div>
  );
};

const Frame: React.FC<FrameProps> = ({ frameId, items, onDrop, onRemove }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: Item) => onDrop(item, frameId),
  });

  return (
    <div className='flex justify-center'>
        <div className='bg-black w-80 rounded-lg p-2' ref={drop}>
            <p className='text-white'>Musica  {frameId}</p>
                {items.map((item) => (
                     <DraggableItem key={item.id} item={item} onRemove={() => onRemove(item)} />
                ))}
        </div>
    </div>
  );
};

const DragAndDropContainer: React.FC = () => {
  const [frames, setFrames] = useState<Array<Item[]>>([[], []]);
  const [availableItems, setAvailableItems] = useState<Item[]>([
    { id: '1', content: 'Item 1', audioSrc: 'path/to/audio1.mp3' },
    { id: '2', content: 'Item 2', audioSrc: 'path/to/audio2.mp3' },
    { id: '3', content: 'Item 3', audioSrc: 'path/to/audio3.mp3' },
    { id: '4', content: 'Item 4', audioSrc: 'path/to/audio4.mp3' },
    { id: '5', content: 'Item 5', audioSrc: 'path/to/audio5.mp3' },
    { id: '6', content: 'Item 6', audioSrc: 'path/to/audio6.mp3' },
    // Adicione mais itens conforme necessário
  ]);

  const handleDrop = (draggedItem: Item, targetFrameId: string) => {
    setFrames((prevFrames) => {
      const newFrames = prevFrames.map((frame) => frame.filter((item) => item.id !== draggedItem.id));
      const targetFrameIndex = parseInt(targetFrameId, 10);
      newFrames[targetFrameIndex] = [...newFrames[targetFrameIndex], draggedItem];
      return newFrames;
    });

    setAvailableItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== draggedItem.id));

    const audio = new Audio(draggedItem.audioSrc);
    audio.play();
  };

  const handleRemove = (removedItem: Item) => {
    setFrames((prevFrames) => {
      const newFrames = prevFrames.map((frame) => frame.filter((item) => item.id !== removedItem.id));
      return newFrames;
    });

    setAvailableItems((prevItems) => [...prevItems, removedItem]);
  };

  const handleEnviar = () => {
    try {
      // Mapeando os dados de cada frame e exibindo em um alerta
      const frameData = frames.map((items, index) => ({
        items: items.map((item) => ({
          audioSrc: item.audioSrc,
        })),
      }));

      // Exibindo os dados no alerta
      alert(JSON.stringify(frameData, null, 2));
    } catch (error) {
      console.error('Erro ao enviar quadros:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='h-screen flex flex-col gap-4 justify-center items-center'>
      <div className='flex gap-5 text-center'>
          <div className='flex gap-4'>
          {frames.map((items, index) => (
            <Frame
            key={index}
            frameId={index.toString()}
            items={items}
            onDrop={(draggedItem) => handleDrop(draggedItem, index.toString())}
            onRemove={handleRemove}
          />
          ))}
          </div>
            <div>
            {availableItems.map((item) => (
                <DraggableItem key={item.id} item={item} onRemove={() => handleRemove(item)} />
            ))}
            </div>
      </div>
      <button onClick={handleEnviar} className='bg-blue-700 items-center text-white rounded p-2 text-center justify-center'>Enviar Quadros</button>
      </div>
      
    </DndProvider>
  );
};

export default DragAndDropContainer;