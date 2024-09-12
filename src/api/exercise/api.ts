import {GetExercisesResponse} from "@/api/interfaces/exercise";
import api from "@/api/axiosConfig";

export const getExercisesRequest = async (bodyPart: string[]): Promise<GetExercisesResponse[]> => {
    const bodyPartParams = bodyPart.map((part) => `body_part=${part}`).join("&");

    const {data} = await api.get<GetExercisesResponse[]>(`/exercises?${bodyPartParams}`);
    return data;
};