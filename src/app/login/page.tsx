"use client";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {BeatLoader} from "react-spinners";
import ActionButton from "@/components/button/actionButton";
import Image1 from "@/components/images/image1";
import {useLoginMutation} from "@/api/user/queries";

const loginUserFormSchema = z.object({
    email: z.string().email("Formato de email inválido").toLowerCase(),
    password: z.string(),
});

type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema),
    });

    const {mutate, isLoading} = useLoginMutation();

    const loginUser = (data: LoginUserFormData) => {
        mutate(data);
    };

    return (
        <main className={"flex flex-col h-screen lg:flex-row"}>
            <div
                className={"w-full flex flex-1 " + "lg:flex lg:justify-end lg:border-r-2 lg:border-zinc-800 lg:px-28"}
            >
                <Image1 className={"lg:w-full"}/>
            </div>
            <div
                className={
                    "w-full flex flex-col items-center gap-4 pb-10 " + 'lg:flex-1 lg:justify-center lg:gap-6 lg:px-28"'
                }
            >
                <p className={"text-4xl w-96 text-center"}>Acesse sua conta</p>
                <form onSubmit={handleSubmit(loginUser)} className={"flex flex-col gap-6"}>
                    <div className={"w-96"}>
                        <input
                            className={`bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full ${
                                errors.email && "outline-red-500"
                            }`}
                            placeholder={"Email"}
                            {...register("email")}
                        />
                        {errors.email && <span className={"text-sm text-red-500 ml-2"}>{errors.email.message}</span>}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={`bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full ${
                                errors.password && "outline-red-500"
                            }`}
                            placeholder={"Senha"}
                            type={"password"}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className={"text-sm text-red-500 ml-2"}>{errors.password.message}</span>
                        )}
                        <p className={"text-end text-sm pt-1"}>
                            <span className={"underline cursor-pointer"}>Esqueceu sua senha?</span>
                        </p>
                    </div>
                    <div className={"w-96"}>
                        {!isLoading ? (
                            <ActionButton>Entrar</ActionButton>
                        ) : (
                            <BeatLoader className={"text-center w-full"} color="#dc2626"/>
                        )}
                        <p className={"text-end text-sm pt-1"}>
                            Ainda não tem conta?
                            <Link className={"underline cursor-pointer"} href={"/register"}>
                                clique aqui
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}
