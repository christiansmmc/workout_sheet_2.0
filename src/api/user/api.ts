import {LoginRequestPayload, LoginResponsePayload, RegisterRequestPayload} from "@/api/interfaces/user";
import api from "@/api/axiosConfig";

export const loginRequest = async (payload: LoginRequestPayload): Promise<LoginResponsePayload> => {
    const {data} = await api.post<LoginResponsePayload>(`/authenticate`, payload);
    return data;
};

export const registerRequest = async (payload: RegisterRequestPayload) => {
    const {data} = await api.post(`/clients`, payload);
    return data;
};
