import { Link } from "react-router-dom";

export function Venceu() {
    return (
        <div className="bg-gradient-to-r from-zinc-400 to-zinc-800 h-screen items-center">
            <div className="animate-slide-down duration-700">
                <div className="relative isolate px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">Parabéns você venceu!!</h1>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link to='/' className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-500">Jogar Novamente</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};