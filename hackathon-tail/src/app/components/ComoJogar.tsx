import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ComoJogar extends Component {
  render() {
    return (
      

<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Como Jogar o EnigMusic ?</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Ao clicar em jogar você será redirecionando para um formulário onde deverá colocar o link de duas músicas do <span className='text-red-700 font-semibold'>youtube</span>, caso o link não seja do youtube o jogo não irá funcionar. Após começar o jogo você deverá colocar cada instrumento no quadro de sua respectiva música. Quando terminar envie sua resposta e veja se acertou ou não.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Link to='/' className="w-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500 text-center">Voltar</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}
