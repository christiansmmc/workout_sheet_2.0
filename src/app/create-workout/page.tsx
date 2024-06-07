'use client'

import {useState} from "react";
import {capitalize} from "@/utils/stringUtils";
import {useGetExercisesQuery} from "@/api/exercise";
import {MoonLoader} from "react-spinners";
import {CreateWorkoutRequest} from "@/api/interfaces/workout";
import {useCreateWorkoutMutation} from "@/api/workout";

export default function Page() {
    const [fetchExercises, setFetchExercises] = useState(false);

    const [bodyPartsSelected, setBodyPartsSelected] = useState<string[]>([]);
    const [exercisesSelected, setExercisesSelected] = useState<string[]>([]);
    const [workoutNameSelected, setWorkoutNameSelected] = useState<string>();

    const {
        isLoading,
        data
    } = useGetExercisesQuery(fetchExercises, bodyPartsSelected)

    const {
        mutate: mutateCreateWorkout,
        isLoading: isLoadingCreateWorkout
    } = useCreateWorkoutMutation()

    const bodyParts = ["PEITO", "BICEPS", "COSTAS", "TRICEPS", "OMBRO", "PERNA"]

    const [steps, setSteps] = useState({
        bodyPartsSelected: false,
        exercisesSelected: false,
        detailsSelected: false,
    });

    const handleSelectBodyParts = (bodyPart: string) => {
        setBodyPartsSelected(prevState =>
            prevState.includes(bodyPart)
                ? prevState.filter(item => item !== bodyPart)
                : [...prevState, bodyPart]
        );
    }

    const handleSelectExercise = (exercise: string) => {
        setExercisesSelected(prevState =>
            prevState.includes(exercise)
                ? prevState.filter(item => item !== exercise)
                : [...prevState, exercise]
        );
    }

    const handleFinishBodyPartsSelect = () => {
        if (bodyPartsSelected.length <= 0) {
            console.log("error")
            return
        }

        setFetchExercises(true)
        setSteps({...steps, bodyPartsSelected: true});
    }

    const handleFinishExercisesSelect = () => {
        if (exercisesSelected.length <= 0) {
            console.log("error")
            return
        }

        setSteps({...steps, exercisesSelected: true});
    }

    const handleFinishDetailsSelect = () => {
        if (!workoutNameSelected || workoutNameSelected.length === 0) {
            console.log("error")
            return
        }

        const createWorkoutRequest: CreateWorkoutRequest = {
            name: workoutNameSelected,
            workoutExercises: exercisesSelected.map(exerciseId => ({exerciseId})),
        };

        mutateCreateWorkout(createWorkoutRequest)
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen w-screen space-y-16">
            {!steps.bodyPartsSelected
                ?
                <>
                    <div className="text-2xl text-center">Escolha que músculos vão ser trabalhados nesse treino</div>
                    <div className="flex flex-wrap justify-center items-center gap-5">
                        {bodyParts.map((bodyPartName, index) => {
                            const isSelected = bodyPartsSelected.includes(bodyPartName);

                            return <div
                                key={index}
                                onClick={() => handleSelectBodyParts(bodyPartName)}
                                className={`flex justify-center items-center border ${isSelected ? 'border-red-500' : 'border-zinc-600'} bg-zinc-800 rounded h-10 w-24 cursor-pointer`}>
                                {capitalize(bodyPartName)}
                            </div>
                        })}
                    </div>
                    <div
                        onClick={handleFinishBodyPartsSelect}
                        className={"flex justify-center items-center w-80 h-10 border border-zinc-500 rounded bg-zinc-900"}>
                        Continuar
                    </div>
                </>
                :
                !steps.exercisesSelected
                    ?
                    <>
                        <div className="text-2xl text-center">Escolha os exercícios que estarão nesse treino</div>
                        <div
                            className="flex flex-col items-center gap-5 w-full h-3/5 overflow-y-scroll">
                            {isLoading && <MoonLoader color="#dc2626"/>}
                            {data?.map((exercise, index) => {
                                const isSelected = exercisesSelected.includes(exercise.id);

                                return <div
                                    key={index}
                                    onClick={() => handleSelectExercise(exercise.id)}
                                    className={`flex flex-shrink-0 justify-between items-center px-2 border ${isSelected ? 'border-red-500' : 'border-zinc-600'} bg-zinc-800 rounded w-4/5 h-12 cursor-pointer`}>
                                    <div>
                                        {capitalize(exercise.name)}
                                    </div>
                                    <div
                                        className={`${
                                            exercise.bodyPart === "PEITO"
                                                ? "bg-teal-500"
                                                : exercise.bodyPart === "TRICEPS"
                                                    ? "bg-blue-500"
                                                    : exercise.bodyPart === "OMBRO"
                                                        ? "bg-emerald-500"
                                                        : exercise.bodyPart === "PERNA"
                                                            ? "bg-amber-500"
                                                            : exercise.bodyPart === "COSTAS"
                                                                ? "bg-pink-500"
                                                                : exercise.bodyPart === "BICEPS"
                                                                    ? "bg-violet-500"
                                                                    : "bg-zinc-600"
                                        } flex justify-center items-center h-8 w-20 rounded-xl text-sm lg:w-24`}
                                    >
                                        {exercise.bodyPart}
                                    </div>
                                </div>
                            })}
                        </div>
                        <div
                            onClick={handleFinishExercisesSelect}
                            className={"flex justify-center items-center w-80 h-10 border border-zinc-500 rounded bg-zinc-900"}>
                            Continuar
                        </div>
                    </>
                    :
                    <>
                        <div className="text-2xl text-center">Escolha o nome desse treino</div>
                        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
                            <input
                                className={`bg-zinc-800 border border-zinc-600 rounded h-12 w-2/3 pl-2`}
                                placeholder={"Nome do treino"}
                                onChange={(e) => setWorkoutNameSelected(e.target.value)}
                            />
                        </div>
                        {!isLoadingCreateWorkout
                            ? <div
                                onClick={handleFinishDetailsSelect}
                                className={"flex justify-center items-center w-80 h-10 border border-zinc-500 rounded bg-zinc-900"}>
                                Criar treino
                            </div>
                            : <MoonLoader color="#dc2626"/>}
                    </>
            }
        </main>
    );
}
