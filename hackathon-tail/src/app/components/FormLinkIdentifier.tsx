'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';


interface FormData{
  linkidentificado: string;
}

const FormLinkIdentifier = () =>{
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data)); //Creio que o axios.post() entre aqui, pq nessa função eu recebo o data, mas eu só printo na tela
  }

  return (
    <div className="h-screen flex items-center justify-center">
        <div className='flex flex-col gap-4 w-full max-w-xs'>
          <div className="flex flex-col gap-1">
          <h1 className="text-white">Vamos Jogar? Coloque sua Música abaixo</h1>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
              <input
                  className="border border-zinc-200 shadow-sm rounded h-10 px-3 max-w-xs outline-none"
                  type="text"
                  placeholder="Digite ou cole o link..."
                  {...register('linkidentificado', {required:true , validate: (value) =>{
                    if (!value.includes("youtube.com") && !value.includes("spotify.com") && !value.includes("deezer.com")) {
                      return false;
                    }
                    return true;
                  }})}
              />
              </form>
              {errors?.linkidentificado?.type == 'validate' && (<p className="error-message text-red-600">Link Inválido</p>)}
              <button onClick={() => handleSubmit(onSubmit)()} className="bg-emerald-500 rounded font-semibold text-white h-10" type='submit'>Jogar</button>
          </div>
        
        </div>
    </div>
    
  );
}

  
//};



export default FormLinkIdentifier ;
