import Image2 from "@/components/images/image2";
import Link from "next/link";

export default function Home() {
  return (
    <main className={"flex flex-col h-screen"}>
      <div className="w-full flex flex-1">
        <Image2 />
      </div>
      <div className="w-full flex flex-col items-center gap-4 pb-10">
        <Link href={"/login"}>
          <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>
            Entrar
          </button>
        </Link>
        <Link href={"/register"}>
          <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>
            Criar Conta
          </button>
        </Link>
      </div>
    </main>
  );
}
