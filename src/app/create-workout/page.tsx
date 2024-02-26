"use client";

import { ArrowLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  const handleInputOnChange = (e: string) => {
    setInputValue(e);
  };

  const handleGoBack = () => {
    router.push("/workout");
  };

  return (
    <main className={"h-screen flex flex-col"}>
      <header
        className={
          "flex items-center justify-between px-10 bg-zinc-800 h-16 shadow-lg"
        }
      >
        <ArrowLeft
          size={32}
          className={"cursor-pointer"}
          onClick={handleGoBack}
        />
        <User size={32} className={"cursor-pointer"} />
      </header>
      {/*<section*/}
      {/*  className={"flex flex-1 flex-col items-center gap-7 my-10"}*/}
      {/*></section>*/}
      <section className={"flex flex-col w-96 m-auto gap-3 mb-10"}>
        <input
          className={`bg-zinc-700 rounded-lg h-12 px-3 text-lg`}
          placeholder={"Nome do treino"}
          onChange={(e) => handleInputOnChange(e.target.value)}
        />
        <button className={"bg-red-600 w-full h-14 rounded-lg font-bold"}>
          Adicionar exercício
        </button>
        <button className={"bg-red-600 w-full h-14 rounded-lg font-bold"}>
          Criar treino
        </button>
      </section>
    </main>
  );
}
