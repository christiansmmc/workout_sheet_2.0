export interface GetWorkoutsResponse {
    id: number;
    name: string;
}

export interface GetWorkoutExercisesResponse {
    id: number;
    name: string;
    workoutExercises: {
        id: number;
        sets: number;
        reps: number;
        exerciseLoad: number;
        exercise: {
            id: number;
            name: string;
            bodyPart: string;
        };
    }[];
}

export interface CreateWorkoutRequest {
    workoutName: string;
    exercises: {
        exerciseId: number;
        reps?: number;
        sets?: number;
        load?: number;
    }[];
}
