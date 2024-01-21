'use client'
import React, { useState } from 'react';

const LinkIdentifier: React.FC = () => {
  const [link, setLink] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');

  const identifyPlatform = () => {
    if (link.includes('youtube.com')) {
      setPlatform('YouTube');
    } else if (link.includes('spotify.com')) {
      setPlatform('Spotify');
    } else if (link.includes('deezer.com')) {
      setPlatform('Deezer');
    } else {
      setPlatform('Plataforma não suportada');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
        <div className='flex flex-col gap-4 w-full max-w-xs'>
          <div className="flex flex-col gap-1">
          <h1 className="text-white">Vamos Jogar? Coloque sua Música abaixo</h1>
            <input
                className="border border-zinc-200 shadow-sm rounded h-10 px-3"
                type="text"
                placeholder="Digite o link..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button onClick={identifyPlatform} className="bg-emerald-500 rounded font-semibold text-white h-10">Identificar Plataforma</button>
        {platform && <p className="text-white">A plataforma identificada é: {platform}</p>}
        </div>
    </div>
    
  );
};



export default LinkIdentifier;
