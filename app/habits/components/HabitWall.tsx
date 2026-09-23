"use client"
import { getHabits } from "@/app/actions";
import { HabitType } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import Habit from "./Habit";
export default function HabitWall({
    initialHabits,
}: {
    initialHabits: HabitType[];
}) {

    const { data: habits } = useQuery({
        queryKey: ["habits"],
        queryFn: getHabits,
        initialData: initialHabits,
        staleTime: 1000 * 60,
    });
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {habits.map((habit) => (
                <Habit
                    key={habit.id}
                    id={habit.id}
                    habitName={habit.habitName}
                    streak={habit.streak}
                    lastCompleted={habit.lastCompleted}
                />
            ))}
        </div>
    );
}