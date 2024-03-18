import {
  GetWorkoutExercisesResponse,
  GetWorkoutsResponse,
} from "@/api/interfaces/workout";
import api from "@/api/axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { RequestError } from "@/api/interfaces/request";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const getWorkoutsData = async (): Promise<GetWorkoutsResponse[]> => {
  const { data } = await api.get<GetWorkoutsResponse[]>(`/workouts`);
  return data;
};

export const useGetWorkoutsQuery = () => {
  const router = useRouter();

  const { isLoading, isSuccess, isError, error, data, remove } = useQuery<
    GetWorkoutsResponse[],
    AxiosError<RequestError>
  >({
    queryKey: ["GetWorkouts"],
    queryFn: () => getWorkoutsData(),
    onError: (err) => {
      if (err?.response?.status === 401) {
        router.push("/login");
      }
    },
  });

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    remove,
  };
};

export const getExercisesFromWorkoutQuery = async (
  workoutId: string,
): Promise<GetWorkoutExercisesResponse> => {
  const { data } = await api.get<GetWorkoutExercisesResponse>(
    `/workouts/${workoutId}`,
  );
  return data;
};

export const useGetExercisesFromWorkoutQuery = (workoutId: string) => {
  const { isLoading, isSuccess, isError, isFetching, error, remove, data } =
    useQuery<GetWorkoutExercisesResponse, AxiosError<RequestError>>({
      queryKey: ["GetWorkoutExercises"],
      enabled: workoutId != "",
      queryFn: () => getExercisesFromWorkoutQuery(workoutId),
      onError: (err) => {
        if (err?.response?.status === 401) {
          router.push("/login");
        }
      },
    });

  return {
    isLoading,
    isSuccess,
    isError,
    isFetching,
    error,
    remove,
    data,
  };
};

export const deleteExerciseFromWorkout = async (
  workoutId: string,
  exerciseId: string,
): Promise<AxiosResponse> => {
  const promise = api.delete<void>(
    `/workouts/${workoutId}/exercises/${exerciseId}`,
  );

  return await toast.promise(promise, {
    pending: "Deletando exercício...",
    success: "Exercício deletado",
    error: "Erro deletando exercício",
  });
};

export const useDeleteExerciseFromWorkoutMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<RequestError>,
    { workoutId: string; exerciseId: string },
    unknown
  >({
    mutationFn: ({ workoutId, exerciseId }) =>
      deleteExerciseFromWorkout(workoutId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries("GetWorkoutExercises");
    },
  });

  return {
    mutate,
  };
};

const patchExerciseLoad = async (
  workoutId: string,
  exerciseId: string,
  load: number,
) => {
  const promise = api.patch(`/workouts/${workoutId}/exercises/${exerciseId}`, {
    load,
  });

  return await toast.promise(promise, {
    pending: "Atualizando carga...",
    success: "Carga atualizada",
    error: "Erro atualizando carga",
  });
};

export const usePatchWorkoutExerciseMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<RequestError>,
    { workoutId: string; exerciseId: string; load: number },
    unknown
  >({
    mutationFn: ({ workoutId, exerciseId, load }) =>
      patchExerciseLoad(workoutId, exerciseId, load),
    onSuccess: () => {
      queryClient.invalidateQueries("GetWorkoutExercises");
    },
  });

  return {
    mutate,
  };
};

export const patchWorkout = async (
  workoutId: string,
  name: string,
): Promise<AxiosResponse> => {
  const promise = api.patch<void>(`/workouts/${workoutId}`, { name });

  return await toast.promise(promise, {
    pending: "Atualizando treino...",
    success: "Treino atualizado",
    error: "Erro atualizando treino",
  });
};

export const usePatchWorkoutMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<RequestError>,
    { workoutId: string; name: string },
    unknown
  >({
    mutationFn: ({ workoutId, name }) => patchWorkout(workoutId, name),
    onSuccess: () => {
      queryClient.invalidateQueries("GetWorkouts");
    },
  });

  return {
    mutate,
  };
};

export const deleteWorkout = async (
  workoutId: string,
): Promise<AxiosResponse> => {
  const promise = api.delete<void>(`/workouts/${workoutId}`);

  return await toast.promise(promise, {
    pending: "Deletando treino...",
    success: "Treino deletado",
    error: "Erro deletando treino",
  });
};

export const useDeleteWorkoutMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<RequestError>,
    string,
    unknown
  >({
    mutationFn: (workoutId: string) => deleteWorkout(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries("GetWorkouts");
    },
  });

  return {
    mutate,
  };
};
