'use client';

import { useState } from 'react';
import { CreateWorkoutRequest } from '@/api/interfaces/workout';
import { useGetExercisesQuery } from '@/api/exercise/queries';
import { useCreateWorkoutMutation } from '@/api/workout/queries';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { capitalize } from '@/utils/stringUtils';
import ActionButton from '@/components/button/actionButton';
import { MoonLoader } from 'react-spinners';

const bodyParts = ['PEITO', 'BICEPS', 'COSTAS', 'TRICEPS', 'OMBRO', 'PERNA'];

enum workoutSetRepType {
  THREE_FIFTEEN = '3x15',
  FOUR_TWELVE = '4x12',
  OTHER = 'OTHER'
}

export default function Page() {
  const router = useRouter();

  const [fetchExercises, setFetchExercises] = useState(false);

  const [steps, setSteps] = useState({
    bodyPartsSelected: false,
    setsRepsSelected: false,
    exercisesSelected: false,
    detailsSelected: false,
  });

  const [workoutBodyParts, setWorkoutBodyParts] = useState<string[]>([]);

  const [workoutSetsReps, setWorkoutSetsReps] = useState<string>();
  const [workoutReps, setWorkoutReps] = useState<number>(0);
  const [workoutSets, setWorkoutSets] = useState<number>(0);

  const [workoutExercises, setWorkoutExercises] = useState<number[]>([]);

  const [workoutName, setWorkoutName] = useState<string>();

  const {
    isLoading,
    data,
  } = useGetExercisesQuery(fetchExercises, workoutBodyParts);

  const {
    mutate: mutateCreateWorkout,
    isLoading: isLoadingCreateWorkout,
  } = useCreateWorkoutMutation();

  const handleSelectBodyParts = (bodyPart: string) => {
    setWorkoutBodyParts(prevState =>
      prevState.includes(bodyPart)
        ? prevState.filter(item => item !== bodyPart)
        : [...prevState, bodyPart],
    );
  };

  const handleFinishBodyPartsStep = () => {
    if (workoutBodyParts.length <= 0) {
      return;
    }

    setSteps({ ...steps, bodyPartsSelected: true });
  };

  const handleFinishWorkoutSetsRepsStep = () => {
    setFetchExercises(true);
    setSteps({ ...steps, setsRepsSelected: true });
  };

  const handleSelectExercise = (exercise: number) => {
    setWorkoutExercises(prevState =>
      prevState.includes(exercise)
        ? prevState.filter(item => item !== exercise)
        : [...prevState, exercise],
    );
  };

  const handleFinishWorkoutExercisesStep = () => {
    if (workoutExercises.length <= 0) {
      return;
    }

    setSteps({ ...steps, exercisesSelected: true });
  };

  const handleFinishWorkoutDetailsStep = () => {
    if (!workoutName || workoutName.length === 0) {
      return;
    }

    const createWorkoutRequest: CreateWorkoutRequest = {
      workoutName: workoutName,
      exercises: workoutExercises.map(exerciseId => ({ exerciseId, reps: workoutReps, sets: workoutSets })),
    };

    mutateCreateWorkout(createWorkoutRequest);
  };

  const handleGoBack = () => {
    router.push('/workout');
  };

  const handleSetWorkoutSetsReps = (workoutSetRepTypeSelected: workoutSetRepType) => {
    setWorkoutSetsReps(workoutSetRepTypeSelected);

    switch (workoutSetRepTypeSelected) {
      case workoutSetRepType.THREE_FIFTEEN:
        setWorkoutSets(3);
        setWorkoutReps(15);
        break;
      case workoutSetRepType.FOUR_TWELVE:
        setWorkoutSets(4);
        setWorkoutReps(12);
        break;
      case workoutSetRepType.OTHER:
        setWorkoutSets(0);
        setWorkoutReps(0);
        break;
    }
  };

  return (
    <main className="h-full flex flex-col">
      <header className="flex flex-shrink-1 items-center justify-between px-10 bg-zinc-800 h-16 shadow-lg">
        <div
          onClick={handleGoBack}
          className="cursor-pointer p-1 active:bg-neutral-600 active:rounded lg:active:bg-neutral-600 lg:hover:bg-neutral-700 lg:hover:rounded">
          <ArrowLeft size={32} />
        </div>
      </header>

      {!steps.bodyPartsSelected ? (
        <>
          <div className="flex flex-1 flex-col justify-center gap-16">
            <div className="text-3xl text-center">
              Escolha que músculos vão ser trabalhados nesse treino
            </div>
            <div className="flex justify-center items-center flex-wrap gap-3">
              {bodyParts.map((bodyPart, index) => {
                const isSelected = workoutBodyParts.includes(bodyPart);

                return (
                  <div
                    key={index}
                    onClick={() => handleSelectBodyParts(bodyPart)}
                    className={`flex justify-center items-center w-28 h-12 text-lg rounded border cursor-pointer active:bg-red-600 active:border-red-700 lg:active:bg-red-600 lg:active:border-red-600 lg:hover:bg-red-700 lg:hover:border-red-700 ${
                      isSelected ? 'bg-red-600 border-red-600' : 'border-neutral-700 bg-neutral-800'
                    }`}>
                    {capitalize(bodyPart)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <ActionButton onClick={handleFinishBodyPartsStep}>Continuar</ActionButton>
          </div>
        </>
      ) : !steps.setsRepsSelected ? (
        <>
          <div className="flex flex-1 flex-col justify-center gap-16">
            <div className="text-3xl text-center">
              Quantas séries e repetições cada exercício terá?
            </div>
            <div className="relative flex justify-center items-center flex-wrap gap-3">
              <div
                onClick={() => handleSetWorkoutSetsReps(workoutSetRepType.THREE_FIFTEEN)}
                className={`${
                  workoutSetsReps === workoutSetRepType.THREE_FIFTEEN
                    ? 'bg-red-600 border-red-600'
                    : 'bg-neutral-800 border-neutral-700'
                } flex justify-center items-center w-28 h-12 text-lg rounded border cursor-pointer active:bg-red-600 active:border-red-700 lg:active:bg-red-600 lg:active:border-red-600 lg:hover:bg-red-700 lg:hover:border-red-700`}>
                3x15
              </div>
              <div
                onClick={() => handleSetWorkoutSetsReps(workoutSetRepType.FOUR_TWELVE)}
                className={`${
                  workoutSetsReps === workoutSetRepType.FOUR_TWELVE
                    ? 'bg-red-600 border-red-600'
                    : 'bg-neutral-800 border-neutral-700'
                } flex justify-center items-center w-28 h-12 text-lg rounded border cursor-pointer active:bg-red-600 active:border-red-700 lg:active:bg-red-600 lg:active:border-red-600 lg:hover:bg-red-700 lg:hover:border-red-700`}>
                4x12
              </div>
              <div
                onClick={() => handleSetWorkoutSetsReps(workoutSetRepType.OTHER)}
                className={`${
                  workoutSetsReps === workoutSetRepType.OTHER
                    ? 'bg-red-600 border-red-600'
                    : 'bg-neutral-800 border-neutral-700'
                } flex justify-center items-center w-28 h-12 text-lg rounded border cursor-pointer active:bg-red-600 active:border-red-700 lg:active:bg-red-600 lg:active:border-red-600 lg:hover:bg-red-700 lg:hover:border-red-700`}>
                Outro
              </div>
              {workoutSetsReps === workoutSetRepType.OTHER && (
                <div className="w-full absolute top-28 flex flex-col justify-center items-center gap-7">
                  <div className="flex justify-between w-2/3 border-b text-2xl">
                    <div className="flex items-end pb-2">Séries:</div>
                    <div className="pb-2">
                      <input
                        type="number"
                        placeholder={workoutSets.toString()}
                        onChange={(e) => setWorkoutSets(Number(e.target.value))}
                        className="w-16 h-10 rounded-lg text-center text-xl bg-neutral-700"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between w-2/3 border-b text-2xl">
                    <div className="flex items-end pb-2">Repetições:</div>
                    <div className="pb-2">
                      <input
                        type="number"
                        placeholder={workoutReps.toString()}
                        onChange={(e) => setWorkoutReps(Number(e.target.value))}
                        className="w-16 h-10 rounded-lg text-center text-xl bg-neutral-700"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <ActionButton onClick={handleFinishWorkoutSetsRepsStep}>Continuar</ActionButton>
          </div>
        </>
      ) : !steps.exercisesSelected ? (
        <>
          <div className="flex flex-col flex-1 pt-3 mb-3 gap-5 h-[calc(100%-11rem)]">
            <div className="text-3xl text-center">Escolha os exercícios que estarão no treino</div>
            <div className="flex flex-col flex-1 gap-3 px-2 py-1 overflow-y-auto border-b border-t border-neutral-600">
              {isLoading &&
                <div className="absolute bottom-14 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                  <MoonLoader color="#dc2626" />
                </div>
              }
              {data?.map((exercise, index) => {
                const isSelected = workoutExercises.includes(exercise.id);

                return (
                  <div
                    key={index}
                    onClick={() => handleSelectExercise(exercise.id)}
                    className={`flex justify-between items-center py-6 px-4 rounded-lg ${
                      isSelected ? 'bg-zinc-700 border border-red-600' : 'bg-zinc-800 border border-zinc-600'
                    }`}>
                    <div className="text-lg">{capitalize(exercise.name)}</div>
                    <div
                      className={`${
                        exercise.bodyPart === 'PEITO'
                          ? 'bg-teal-500'
                          : exercise.bodyPart === 'TRICEPS'
                            ? 'bg-blue-500'
                            : exercise.bodyPart === 'OMBRO'
                              ? 'bg-emerald-500'
                              : exercise.bodyPart === 'PERNA'
                                ? 'bg-amber-500'
                                : exercise.bodyPart === 'COSTAS'
                                  ? 'bg-pink-500'
                                  : exercise.bodyPart === 'BICEPS'
                                    ? 'bg-violet-500'
                                    : 'bg-zinc-600'
                      } flex justify-center items-center h-8 w-1/5 rounded text-sm lg:w-24`}>
                      {exercise.bodyPart}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <ActionButton onClick={handleFinishWorkoutExercisesStep}>Continuar</ActionButton>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-1 flex-col justify-center gap-10">
            <div className="text-3xl text-center">Escolha o nome desse treino</div>
            <div className="flex justify-center items-center flex-wrap gap-3">
              <input placeholder={'Digite o nome de seu treino'}
                     onChange={(e) => setWorkoutName(e.target.value)}
                     className="w-[90%] h-14 rounded-lg text-center text-2xl bg-neutral-700 placeholder:text-lg" />
            </div>
          </div>
          {!isLoadingCreateWorkout ? (
            <div className="h-16 flex justify-center mb-6">
              <ActionButton onClick={handleFinishWorkoutDetailsStep}>Criar treino</ActionButton>
            </div>
          ) : (
            <div className="h-16 flex justify-center mb-6">
              <MoonLoader color="#dc2626" />
            </div>
          )}
        </>
      )}
    </main>
  );
}
