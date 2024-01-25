'use client'
import React, { useState } from 'react';
import FormLinkIdentifier from './FormLinkIdentifier'; 

function DifficultScreen() {
  const [inputCount, setInputCount] = useState(0);

  const handleDifficultyClick = (count: React.SetStateAction<number>) => {
    setInputCount(count);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="flex flex-col gap-2 w-full max-w-xs text-white">
        <button
          className="bg-emerald-500 h-10 rounded max-w-xs hover:bg-emerald-800"
          type="button"
          onClick={() => handleDifficultyClick(1)}
        >Fácil</button>

        <button
          className="bg-zinc-500 h-10 rounded max-w-xs hover:bg-zinc-800"
          type="button"
          onClick={() => handleDifficultyClick(2)}
        >Normal
        </button>

        <button
          className="bg-red-500 h-10 rounded max-w-xs hover:bg-red-800"
          type="button"
          onClick={() => handleDifficultyClick(3)}
        >Difícil
        </button>

        {/* Renderiza os componentes FormIdentifier com base na quantidade definida */}
        {Array.from({ length: inputCount }).map((_, index) => (
          <FormLinkIdentifier key={index} />
        ))}
      </form>
    </div>
  );
}

export default DifficultScreen;