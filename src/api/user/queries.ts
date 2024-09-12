"use client";

import {LoginRequestPayload, LoginResponsePayload, RegisterRequestPayload} from "@/api/interfaces/user";
import {AxiosError} from "axios";
import {RequestError} from "@/api/interfaces/request";
import {useMutation} from "react-query";
import {useRouter} from "next/navigation";
import {setToken} from "@/utils/authUtils";
import {loginRequest, registerRequest} from "@/api/user/api";

export const useLoginMutation = () => {
    const router = useRouter();

    const {mutate, isLoading, isError, error} = useMutation<
        LoginResponsePayload,
        AxiosError<RequestError>,
        LoginRequestPayload,
        unknown
    >({
        mutationFn: (data: LoginRequestPayload) => loginRequest(data),
        onSuccess: (data: LoginResponsePayload) => {
            if (data) {
                setToken(data.token);
                router.push("/workout");
            }
        },
    });

    return {
        mutate,
        isLoading,
        isError,
        error,
    };
};

export const useRegisterMutation = () => {
    const router = useRouter();

    const {mutate, isLoading, isError, error} = useMutation<
        unknown,
        AxiosError<RequestError>,
        RegisterRequestPayload,
        unknown
    >({
        mutationFn: (data: RegisterRequestPayload) => registerRequest(data),
        onSuccess: () => {
            router.push("/login");
        },
    });

    return {
        mutate,
        isLoading,
        isError,
        error,
    };
};
