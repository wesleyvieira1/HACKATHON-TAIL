'use client'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
  render() {
    return (
        <div className="bg-white h-screen items-center relative" style={{ backdropFilter: 'blur(10px) brightness(0.8)' }}>
    <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Seja Bem-vindo(a) ao EnigMusic</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">Jogo de quebra-cabeça desenvolvido utilizando a API do <a href='https://music.ai/?click_section=header_api' className='text-moisesai-color rounded p-2 bg-black'>Moises</a></p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to='/jogar' className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500">Jogar</Link>
                    <Link to='' target='_blank' className="text-sm font-semibold leading-6 text-gray-900">Como Jogar <span aria-hidden="true">→</span></Link>
                </div>
            </div>
        </div>
    </div>
</div>
      
    )
  };
};
