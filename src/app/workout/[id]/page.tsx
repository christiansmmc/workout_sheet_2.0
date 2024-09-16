"use client";

import {ArrowLeft, User} from "lucide-react";
import {useRouter} from "next/navigation";
import {BeatLoader} from "react-spinners";
import ExerciseCard from "@/components/card/exerciseCard";
import {useGetExercisesFromWorkoutQuery} from "@/api/workout/queries";

export default function Page({params}: { params: { id: number } }) {
    const router = useRouter();

    const {isSuccess, data, remove} = useGetExercisesFromWorkoutQuery(params.id);

    const handleGoBack = () => {
        router.push("/workout");
        remove();
    };

    return (
        <main>
            <header className={"flex items-center justify-between px-10 bg-zinc-800 h-16 shadow-lg"}>
                <ArrowLeft size={32} className={"cursor-pointer"} onClick={handleGoBack}/>
                <User size={32} className={"cursor-pointer"}/>
            </header>
            <div
                className='flex flex-col gap-5 items-center mt-4 max-h-[calc(100vh-6rem)] overflow-y-auto lg:gap-6'>
                {isSuccess && data ? (
                    data?.workoutExercises
                        .sort((a, b) => {
                            const bodyPartComparison = a.exercise.bodyPart.localeCompare(b.exercise.bodyPart);

                            return bodyPartComparison === 0
                                ? a.exercise.name.localeCompare(b.exercise.name)
                                : bodyPartComparison;
                        })
                        .map((workoutExercise) => (
                            <ExerciseCard
                                key={workoutExercise.exercise.id}
                                workoutExercise={workoutExercise}
                                workoutId={params.id}
                            />
                        ))
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BeatLoader size={26} color="#dc2626"/>
                    </div>
                )}
            </div>
        </main>
    );
}
