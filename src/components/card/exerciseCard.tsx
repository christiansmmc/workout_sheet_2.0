import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@mui/material";
import {
  useDeleteExerciseFromWorkoutMutation,
  usePatchWorkoutExerciseMutation,
} from "@/api/workout";
import { isNumber } from "@/utils/stringUtils";

interface ExerciseCardProps {
  workoutExercise: {
    id: string;
    load: number;
    exercise: { id: string; name: string; bodyPart: string };
  };
  workoutId: string;
}

const ExerciseCard = ({ workoutExercise, workoutId }: ExerciseCardProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(workoutExercise.load);

  const { mutate: deleteWorkoutExerciseMutate } =
    useDeleteExerciseFromWorkoutMutation();
  const { mutate: patchWorkoutExerciseMutate } =
    usePatchWorkoutExerciseMutation();

  const handleInputOnChange = (e: string) => {
    if (isNumber(e)) {
      setInputValue(Number(e));
    }
  };

  const handleInputOnBlur = () => {
    if (workoutExercise.load === inputValue) return;

    patchWorkoutExerciseMutate({
      exerciseId: workoutExercise.exercise.id,
      workoutId,
      load: inputValue,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteWorkoutExercise = (exerciseId: string) => {
    deleteWorkoutExerciseMutate({ workoutId, exerciseId });
    handleClose();
  };

  return (
    <>
      <div
        className={
          "flex justify-between items-center bg-zinc-800 rounded-lg w-11/12 max-w-2xl h-20 shadow-lg"
        }
      >
        <div className={"flex items-center ml-3 text-base lg:ml-5 lg:text-lg"}>
          <p>{workoutExercise.exercise.name}</p>
        </div>
        <div className={"flex items-center gap-5 mr-5"}>
          <input
            value={inputValue}
            onChange={(e) => handleInputOnChange(e.target.value)}
            onBlur={handleInputOnBlur}
            type={"text"}
            maxLength={9}
            className={"w-20 h-10 text-center bg-zinc-900 rounded-lg"}
          />
          <div
            className={`
            ${
              workoutExercise.exercise.bodyPart === "PEITO"
                ? "bg-teal-500"
                : workoutExercise.exercise.bodyPart === "TRICEPS"
                  ? "bg-blue-500"
                  : workoutExercise.exercise.bodyPart === "OMBRO"
                    ? "bg-emerald-500"
                    : workoutExercise.exercise.bodyPart === "PERNA"
                      ? "bg-amber-500"
                      : workoutExercise.exercise.bodyPart === "COSTAS"
                        ? "bg-pink-500"
                        : workoutExercise.exercise.bodyPart === "BICEPS"
                          ? "bg-violet-500"
                          : "bg-zinc-600"
            } flex justify-center items-center h-8 w-20 rounded-xl text-sm lg:w-24`}
          >
            {workoutExercise.exercise.bodyPart}
          </div>
          <button onClick={handleClickOpen}>
            <Trash2 size={28} />
          </button>
        </div>
      </div>
      <Dialog
        style={{ backdropFilter: "blur(5px)" }}
        PaperProps={{ sx: { borderRadius: "10px", background: "#000" } }}
        open={open}
        onClose={handleClose}
      >
        <div
          className={
            "flex flex-col p-7 bg-zinc-800 border-zinc-800 text-zinc-100"
          }
        >
          <p className={"mb-5 text-xl text-center font-bold"}>
            Tem certeza que deseja deletar esse exercício ?
          </p>
          <div className={"flex justify-center gap-10 pt-7"}>
            <button
              className={"bg-gray-500 w-32 h-12 rounded-lg font-bold"}
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              className={"bg-red-600 w-32 h-12 rounded-lg font-bold"}
              onClick={() =>
                handleDeleteWorkoutExercise(workoutExercise.exercise.id)
              }
            >
              Excluir
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ExerciseCard;
