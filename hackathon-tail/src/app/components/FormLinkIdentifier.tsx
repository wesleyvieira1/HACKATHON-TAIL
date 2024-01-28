'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


interface FormData{
  linkidentificado: string;
}

const FormLinkIdentifier = () =>{
  //Chamando funções da lib hook form
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>()
  
  //Manipulação da API
  const onSubmit = (data: FormData) => {
    axios.post("/api/music", JSON.stringify(data))
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }

  //Retorno do componente FormLinkIdentifier em HTML
  return (
    <div className="flex items-center justify-center">
        <div className='flex flex-col gap-4 w-full max-w-xs'>
          <div className="flex flex-col gap-1">
          
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
              <input
                  className="border border-zinc-200 shadow-sm rounded h-10 px-3 max-w-xs outline-none text-black"
                  type="text"
                  placeholder="Digite ou cole o link..."

                  //Registro do input pela variável linkidentificado
                  {...register('linkidentificado', {required:true , validate: (value) =>{
                    if (!value.includes("youtube.com")){
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

//Retorno do componente
export default FormLinkIdentifier ;
