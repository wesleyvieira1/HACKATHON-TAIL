'use client'
// Importando dependências
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Interface para os dados do formulário
interface FormData {
  linkIdentificado1: string;
  linkIdentificado2: string;
}

// Componente do formulário
const FormLinkIdentifier = () => {
  // Funções do react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Função chamada quando o formulário é submetido
  const onSubmit = (data: FormData) => {
    // Enviar os dados para a API
    axios.post("/api/music", JSON.stringify(data))
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Retorno do componente em HTML
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-700">
      <div className='bg-zinc-900 h-96 w-96 p-10 flex justify-center items-center shadow-lg rounded-full flex-col'>
      
      <div className='flex flex-col gap-4 w-full max-w-xs'>

        <div className="flex flex-col gap-4">

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <input
              className="border border-zinc-200 shadow-sm rounded h-10 px-3 max-w-xs outline-none text-black"
              type="text"
              placeholder="Digite ou cole o link..."
              {...register('linkIdentificado1', {
                required: true,
                validate: (value) => {
                  if (!value.includes("youtube.com")) {
                    return false;
                  }
                  return true;
                }
              })}
            />
            <input
              className="border border-zinc-200 shadow-sm rounded h-10 px-3 max-w-xs outline-none text-black"
              type="text"
              placeholder="Digite ou cole o link..."
              {...register('linkIdentificado2', {
                required: true,
                validate: (value) => {
                  if (!value.includes("youtube.com")) {
                    return false;
                  }
                  return true;
                }
              })}
            />
          </form>

          {(errors?.linkIdentificado1?.type === 'validate' || errors?.linkIdentificado2?.type === 'validate') && (
            <p className="error-message text-red-600">Pelo menos um dos links é inválido</p>
          )}

        <Link to='/puzzle' onClick={() => handleSubmit(onSubmit)()}  className="shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500 rounded font-semibold text-white h-10 text-center flex justify-center items-center" type='submit'>Jogar</Link>
        </div>
      </div>
      </div>
    </div>
  );
}

// Exportar o componente
export default FormLinkIdentifier;
