import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className={"h-screen flex justify-center align-middle"}>
        <div
          className={"flex justify-end border-r-2 border-zinc-800 w-1/2 px-28"}
        >
          <Image src="/image2.svg" alt="picture" width={600} height={0} />
        </div>
        <div className={"flex flex-1 flex-col justify-center gap-4 px-28"}>
          <Link href={"/login"}>
            <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>
              Entrar
            </button>
          </Link>
          <Link href={"/register"}>
            <button className={"bg-red-600 w-96 h-16 rounded-lg font-bold"}>
              Criar conta
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
