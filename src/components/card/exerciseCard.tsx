import {useState} from "react";
import {capitalizeAllWords} from "@/utils/stringUtils";
import {useDeleteExerciseFromWorkoutMutation, usePatchWorkoutExerciseMutation} from "@/api/workout/queries";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Ellipsis} from "lucide-react";

interface ExerciseCardProps {
    workoutExercise: {
        id: number;
        sets: number;
        reps: number;
        exerciseLoad: number;
        exercise: {
            id: number;
            name: string;
            bodyPart: string;
        };
    }
    workoutId: number;
}

const ExerciseCard = ({workoutExercise, workoutId}: ExerciseCardProps) => {
    const [open, setOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [exerciseLoad, setExerciseLoad] = useState(workoutExercise.exerciseLoad);

    const [editExerciseSets, setEditExerciseSets] = useState(workoutExercise.sets || 0)
    const [editExerciseReps, setEditExerciseReps] = useState(workoutExercise.reps || 0)
    const [editExerciseLoad, setEditExerciseLoad] = useState(workoutExercise.exerciseLoad)

    const {mutate: deleteWorkoutExerciseMutate} = useDeleteExerciseFromWorkoutMutation();
    const {mutate: patchWorkoutExerciseMutate} = usePatchWorkoutExerciseMutation();

    const updateExercise = () => {
        setEditDialogOpen(false)

        if (
            workoutExercise.sets === editExerciseSets
            && workoutExercise.reps === editExerciseReps
            && workoutExercise.exerciseLoad === editExerciseLoad
        ) {
            return;
        }

        patchWorkoutExerciseMutate({
            workoutExerciseId: workoutExercise.id,
            load: editExerciseLoad,
            sets: editExerciseSets,
            reps: editExerciseReps
        });
    }

    const updateExerciseLoad = () => {
        if (workoutExercise.exerciseLoad === exerciseLoad) return;
        updateExercise()
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteWorkoutExercise = (workoutExerciseId: number) => {
        deleteWorkoutExerciseMutate({workoutExerciseId});
        handleClose();
    };

    return (
        <>
            <div className='flex flex-col flex-shrink-0 bg-zinc-800 rounded-lg w-11/12 max-w-2xl h-32 shadow-lg'>
                <div className='flex justify-between items-center h-12 mt-2 pb-2 border-b border-zinc-600'>
                    <div className='ml-3 lg:ml-5 lg:text-lg'>
                        <p>{capitalizeAllWords(workoutExercise.exercise.name)}</p>
                    </div>
                    <div className={"flex items-center gap-5 mr-5"}>
                        <div
                            className={`${
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
                            } flex justify-center items-center h-8 w-20 rounded-lg text-sm lg:w-24`}
                        >
                            {workoutExercise.exercise.bodyPart}
                        </div>
                        <button>
                            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <div
                                        className='cursor-pointer p-1 active:bg-neutral-600 active:rounded lg:active:bg-neutral-600 lg:hover:bg-neutral-700 lg:hover:rounded'>
                                        <Ellipsis size={32}/>
                                    </div>
                                </DialogTrigger>
                                <DialogOverlay className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm"/>
                                <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}
                                               className="w-[95%] rounded sm:max-w-[425px] bg-neutral-900 border-0">
                                    <DialogHeader className='flex justify-center items-center'>
                                        <DialogTitle className='text-xl'>Editar exercício</DialogTitle>
                                        <DialogDescription
                                            className='text-xl text-neutral-300'>{capitalizeAllWords(workoutExercise.exercise.name)}</DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center gap-3">
                                        <div
                                            className="flex justify-between items-center w-[90%] border-b border-zinc-600 pb-2">
                                            <div className='w-1/2 text-left text-lg'>Séries:</div>
                                            <input type='number'
                                                   placeholder={editExerciseSets.toString()}
                                                   onChange={(e) => setEditExerciseSets(Number(e.target.value))}
                                                   maxLength={2}
                                                   className='w-16 rounded bg-neutral-800 text-center h-10 outline-0 focus:border focus:border-neutral-400'/>
                                        </div>
                                        <div
                                            className="flex justify-between items-center w-[90%] border-b border-zinc-600 pb-2">
                                            <div className='w-1/2 text-left text-lg'>Repetições:</div>
                                            <input type='number'
                                                   placeholder={editExerciseReps.toString()}
                                                   onChange={(e) => setEditExerciseReps(Number(e.target.value))}
                                                   maxLength={2}
                                                   className='w-16 rounded bg-neutral-800 text-center h-10 outline-0 focus:border focus:border-neutral-400'/>
                                        </div>
                                        <div
                                            className="flex justify-between items-center w-[90%] border-b border-zinc-600 pb-2">
                                            <div className='w-1/2 text-left text-lg'>Carga:</div>
                                            <input type='number'
                                                   placeholder={editExerciseLoad.toString()}
                                                   onChange={(e) => setEditExerciseLoad(Number(e.target.value))}
                                                   className='w-16 rounded bg-neutral-800 text-center h-10 outline-0 focus:border focus:border-neutral-400'/>
                                        </div>
                                    </div>
                                    <DialogFooter
                                        className='flex flex-row justify-center items-center sm:justify-center'>
                                        <button
                                            className='bg-red-600 w-[90%] h-12 rounded-lg font-bold active:bg-red-700 lg:active:bg-red-600 lg:hover:bg-red-700'
                                            onClick={updateExercise}>
                                            Salvar
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </button>
                    </div>
                </div>
                <div className='flex flex-1 justify-between items-center mx-3'>
                    <div><span
                        className='text-sm'>Séries x Repetições:</span> {workoutExercise.sets || 0}x{workoutExercise.reps || 0}
                    </div>
                    <div className='flex items-center'>
                        <div className='text-sm'>Carga:</div>
                        <input
                            placeholder={exerciseLoad.toString()}
                            type={"number"}
                            step="0.01"
                            maxLength={9}
                            onChange={(e) => setExerciseLoad(Number(e.target.value))}
                            onBlur={updateExerciseLoad}
                            className={"w-20 h-10 text-center bg-zinc-900 rounded-lg ml-3 placeholder:text-white"}
                        />
                    </div>
                </div>
            </div>
            {/*<Dialog*/}
            {/*    style={{backdropFilter: "blur(5px)"}}*/}
            {/*    PaperProps={{sx: {borderRadius: "10px", background: "#000"}}}*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*>*/}
            {/*    <div className={"flex flex-col p-7 bg-zinc-800 border-zinc-800 text-zinc-100"}>*/}
            {/*        <p className={"mb-5 text-xl text-center font-bold"}>*/}
            {/*            Tem certeza que deseja deletar esse exercício ?*/}
            {/*        </p>*/}
            {/*        <div className={"flex justify-center gap-10 pt-7"}>*/}
            {/*            <button className={"bg-gray-500 w-32 h-12 rounded-lg font-bold"} onClick={handleClose}>*/}
            {/*                Cancelar*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className={"bg-red-600 w-32 h-12 rounded-lg font-bold"}*/}
            {/*                onClick={() => handleDeleteWorkoutExercise(workoutExercise.id)}*/}
            {/*            >*/}
            {/*                Excluir*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Dialog>*/}
        </>
    );
};

export default ExerciseCard;
