import HabitCheckmark from "./HabitCheckmark";

export default function Habit({
    id,
    habitName,
    streak,
    lastCompleted,
}: {
    id: number;
    habitName: string;
    streak: number;
    lastCompleted: string;
}) {
    return (
        <div>
            <p>{habitName}</p>
            <p>{streak}</p>
            <HabitCheckmark id={id} lastCompleted={lastCompleted} />
        </div>
    );
}