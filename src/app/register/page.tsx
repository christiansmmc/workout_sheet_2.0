"use client";

import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BeatLoader} from "react-spinners";
import ActionButton from "@/components/button/actionButton";
import Image3 from "@/components/images/image3";
import {useRegisterMutation} from "@/api/user/queries";

const createUserFormSchema = z
    .object({
        name: z.string().min(1, "Nome não pode ser vazio"),
        height: z.string(),
        weight: z.string(),
        email: z.string().email("Formato de email inválido"),
        password: z.string().min(6, "A senha precisa de pelo menos 6 caracteres"),
        confirmPassword: z.string(),
    })
    .superRefine(({confirmPassword, password}, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                path: ["password"],
                message: "As senhas não são idênticas",
            });
        }
    });

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    });

    const {mutate, isLoading} = useRegisterMutation();

    const createUser = (data: CreateUserFormData) => {
        mutate({
            firstName: data.name,
            height: Number(data.height.replace(",", "")),
            weight: Number(data.weight),
            user: {
                email: data.email,
                password: data.password
            }
        });
    };

    return (
        <main className={"flex flex-col h-full lg:flex-row pt-8"}>
            <div
                className={
                    "w-full flex flex-1 " +
                    "lg:flex lg:justify-end lg:border-r-2 lg:border-zinc-800 lg:px-28"
                }
            >
                <Image3 className={"lg:w-full"}/>
            </div>
            <div
                className={
                    "w-full flex flex-col items-center gap-4 pb-6 " +
                    'lg:flex-1 lg:justify-center lg:gap-6 lg:px-28"'
                }
            >
                <p className={"text-4xl my-2 w-96 text-center"}>Crie sua conta</p>
                <form
                    onSubmit={handleSubmit(createUser)}
                    className={"flex flex-col gap-6"}
                >
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Nome"}
                            type={"text"}
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.name.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Altura"}
                            type={"text"}
                            {...register("height")}
                        />
                        {errors.height && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.height.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Peso"}
                            type={"text"}
                            {...register("weight")}
                        />
                        {errors.weight && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.weight.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Email"}
                            type={"text"}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.email.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Senha"}
                            type={"password"}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.password.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        <input
                            className={"bg-zinc-800 rounded-lg h-12 px-3 text-lg w-full"}
                            placeholder={"Confirma a senha"}
                            type={"password"}
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span className={"text-sm text-red-500 ml-2"}>
                {errors.confirmPassword.message}
              </span>
                        )}
                    </div>
                    <div className={"w-96"}>
                        {!isLoading ? (
                            <ActionButton>Criar conta</ActionButton>
                        ) : (
                            <BeatLoader className={"text-center w-full"} color="#dc2626"/>
                        )}
                        <p className={"text-end text-sm pt-1"}>
                            Ja tem uma conta?
                            <Link className={"underline cursor-pointer"} href={"/login"}>
                                clique aqui
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}
