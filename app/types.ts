export interface Task {
    id: string | number;
    taskName: string;
}

export interface Note {
    id: string | number;
    noteContent: string;
}

export interface Habit {
    id: string | number;
    habitName: string;
    streak: number;
}