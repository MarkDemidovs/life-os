import HabitCheckmark from "./HabitCheckmark";

export default function Habit({id, habitName, streak, }: {id: number; habitName: string; streak: number; }) {
    return (
        <div>
            <p>{habitName}</p>
            <p>{streak}</p>
            <HabitCheckmark />
        </div>
    )
}