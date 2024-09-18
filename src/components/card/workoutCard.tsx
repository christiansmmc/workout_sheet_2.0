import {ChevronRight, Dumbbell, Pencil, Trash2} from "lucide-react";
import {useState} from "react";
import {useDeleteWorkoutMutation, usePatchWorkoutMutation} from "@/api/workout/queries";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

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
                    <div>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <div
                                    className='flex justify-center items-center w-14 h-12 cursor-pointer p-1 active:bg-neutral-600 active:rounded lg:active:bg-neutral-600 lg:hover:bg-neutral-700 lg:hover:rounded'>
                                    <Pencil size={24}/>
                                </div>
                            </DialogTrigger>
                            <DialogOverlay className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm"/>
                            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}
                                           className="w-[95%] rounded sm:max-w-[425px] bg-neutral-900 border-0">
                                <DialogHeader className='py-2'>
                                    <DialogTitle className='text-xl'>Edite ou delete seu treino</DialogTitle>
                                </DialogHeader>
                                <div className=''>
                                    <input type='text'
                                           placeholder={inputValue}
                                           onChange={(e) => handleInputOnChange(e.target.value)}
                                           className='w-full pl-2 rounded bg-neutral-800 h-14 text-lg outline-0 focus:border focus:border-neutral-400'/>
                                </div>
                                <DialogFooter>
                                    <div className='w-full flex justify-between py-2'>
                                        <button onClick={handleDeleteWorkout}
                                                className='flex justify-center items-center cursor-pointer w-14 h-12 active:bg-neutral-600 active:rounded lg:active:bg-neutral-600 lg:hover:bg-neutral-700 lg:hover:rounded'>
                                            <Trash2 size={28} color={"#dc2626"}/>
                                        </button>
                                        <div className={"flex gap-3"}>
                                            <button
                                                className={"bg-red-600 w-20 h-12 rounded-lg font-bold lg:w-32 active:bg-red-700 lg:active::bg-red-600 lg:hover:bg-red-700"}
                                                onClick={handleEditWorkout}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className={"bg-gray-500 w-20 h-12 rounded-lg font-bold lg:w-32 active:bg-gray-600 lg:active:bg-gray-500 lg:hover:bg-gray-600"}
                                                onClick={handleClose}
                                                type={"submit"}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <button
                        className={"flex justify-center items-center bg-red-600 rounded-lg w-14 h-12 active:bg-red-700 lg:active::bg-red-600 lg:hover:bg-red-700"}
                        onClick={() => onClick(workout.id)}
                    >
                        <ChevronRight size={28}/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default WorkoutCard;
