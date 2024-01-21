import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
        <form action="" className="flex flex-col gap-4 w-full max-w-xs">
          <div className="flex flex-col gap-1">
            <h1 className="text-white">Vamos Jogar? Coloque sua Música abaixo</h1>
            <input type="url" name="url" id="" className="border border-zinc-200 shadow-sm rounded h-10 px-3"/>
          </div>
          <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10">Jogar</button>
        </form>
    </div>
  );
}
