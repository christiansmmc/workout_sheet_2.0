import LandingPageImage from "@/components/images/landing_page_image";
import Link from "next/link";

export default function Home() {
  return (
    <main className={"flex flex-col justify-center items-center w-full h-screen"}>
      <div className="flex flex-1 justify-center items-end w-full h-1/2">
        <div className="flex justify-center w-full">
          <LandingPageImage width={"90%"} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-end gap-12 h-1/2">
        <div className="flex flex-col items-center justify-center w-full pt-12">
          <div className="text-4xl">MeuTreino</div>
          <div className="text-center text-lg px-3 pt-5">Organize e potencialize seus treinos.</div>
          <div className="text-center text-lg px-3 pt-1">
            Crie, edite e acompanhe sua evolução com facilidade.
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-8">
          <Link href={"/login"}>
            <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>Entrar</button>
          </Link>
          <Link href={"/register"}>
            <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>Criar Conta</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
