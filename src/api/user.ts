"use client";

import {
  LoginRequestPayload,
  LoginResponsePayload,
  RegisterRequestPayload,
} from "@/api/interfaces/user";
import { AxiosError } from "axios";
import { RequestError } from "@/api/interfaces/request";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/authUtils";
import api from "@/api/axiosConfig";

export const postLoginData = async (
  payload: LoginRequestPayload,
): Promise<LoginResponsePayload> => {
  const { data } = await api.post<LoginResponsePayload>(
    `/authenticate`,
    payload,
  );
  return data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation<
    LoginResponsePayload,
    AxiosError<RequestError>,
    LoginRequestPayload,
    unknown
  >({
    mutationFn: (data: LoginRequestPayload) => postLoginData(data),
    onSuccess: (data: LoginResponsePayload) => {
      if (data) {
        setToken(data.access_token);
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

export const postRegisterData = async (payload: RegisterRequestPayload) => {
  const { data } = await api.post(`/users`, payload);
  return data;
};

export const useRegisterMutation = () => {
  const router = useRouter();

  const { mutate, isLoading, isError, error } = useMutation<
    unknown,
    AxiosError<RequestError>,
    RegisterRequestPayload,
    unknown
  >({
    mutationFn: (data: RegisterRequestPayload) => postRegisterData(data),
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
