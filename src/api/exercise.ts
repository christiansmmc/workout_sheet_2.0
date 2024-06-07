import api from "@/api/axiosConfig";
import {AxiosError} from "axios";
import {RequestError} from "@/api/interfaces/request";
import {useQuery} from "react-query";
import {useRouter} from "next/navigation";
import {GetExercisesResponse} from "@/api/interfaces/exercise";
import {toast} from "react-toastify";

export const getExercisesData = async (bodyPart: string[]): Promise<GetExercisesResponse[]> => {
    const bodyPartParams = bodyPart.map(part => `bodyPart=${part}`).join('&');

    const {data} = await api.get<GetExercisesResponse[]>(`/exercises?${bodyPartParams}`);
    return data;
};

export const useGetExercisesQuery = (fetchExercises: boolean, bodyPart: string[]) => {
    const router = useRouter();

    const {isLoading, data} = useQuery<GetExercisesResponse[], AxiosError<RequestError>>({
        queryKey: ["GetExercises", bodyPart],
        queryFn: () => getExercisesData(bodyPart),
        enabled: fetchExercises,
        onError: (err) => {
            if (err?.response?.status === 401) {
                router.push("/login");
            }

            toast.error("Erro ao buscar exercícios")
            router.push("/workout");
        },
    });

    return {
        isLoading,
        data,
    };
};