import {ChevronRight, Dumbbell, Pencil, Trash2} from "lucide-react";
import {useState} from "react";
import {Dialog} from "@mui/material";
import {useDeleteWorkoutMutation, usePatchWorkoutMutation} from "@/api/workout/queries";

interface WorkoutCardProps {
    workout: {
        id: number;
        name: string;
    };
    onClick: (id: number) => void;
}

const WorkoutCard = ({workout, onClick}: WorkoutCardProps) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(workout.name);

    const {mutate: patchWorkoutMutate} = usePatchWorkoutMutation();
    const {mutate: deleteWorkoutMutate} = useDeleteWorkoutMutation();

    const handleInputOnChange = (e: string) => {
        setInputValue(e);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditWorkout = () => {
        if (workout.name == inputValue) return handleClose();
        if (inputValue == "") return handleClose();

        patchWorkoutMutate({workoutId: workout.id, name: inputValue});
        handleClose();
    };

    const handleDeleteWorkout = () => {
        deleteWorkoutMutate(workout.id);
        handleClose();
    };

    return (
        <>
            <div
                key={workout.id}
                className={
                    "flex justify-between items-center bg-zinc-800 rounded-lg w-11/12 max-w-xl h-20 text-xl shadow-lg lg:h-28"
                }
            >
                <div className={"flex items-center gap-5 ml-5"}>
                    <Dumbbell size={28}/>
                    <p>{workout.name}</p>
                </div>
                <div className={"flex items-center gap-2 mr-5"}>
                    <button onClick={handleClickOpen} className={"flex justify-center items-center w-14 h-12"}>
                        <Pencil size={24}/>
                    </button>
                    <button
                        className={"flex justify-center items-center bg-red-600 rounded-lg w-14 h-12"}
                        onClick={() => onClick(workout.id)}
                    >
                        <ChevronRight size={28}/>
                    </button>
                </div>
            </div>
            <Dialog
                style={{backdropFilter: "blur(5px)"}}
                PaperProps={{sx: {borderRadius: "10px", background: "#000"}}}
                open={open}
                onClose={handleClose}
            >
                <div className={"flex flex-col p-7 bg-zinc-800 border-zinc-800 text-zinc-100"}>
                    <p className={"mb-5 text-xl font-bold"}>Edite ou delete seu treino</p>
                    <div>
                        <input
                            className={`bg-zinc-700 rounded-lg h-12 px-3 text-lg w-full`}
                            placeholder={inputValue}
                            onChange={(e) => handleInputOnChange(e.target.value)}
                        />
                    </div>
                    <div className={"flex justify-between gap-20 pt-7"}>
                        <button onClick={handleDeleteWorkout}>
                            <Trash2 size={28} color={"#dc2626"}/>
                        </button>
                        <div className={"flex gap-3"}>
                            <button
                                className={"bg-red-600 w-20 h-12 rounded-lg font-bold lg:w-32"}
                                onClick={handleEditWorkout}
                            >
                                Salvar
                            </button>
                            <button className={"bg-gray-500 w-20 h-12 rounded-lg font-bold lg:w-32"}
                                    onClick={handleClose}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default WorkoutCard;
