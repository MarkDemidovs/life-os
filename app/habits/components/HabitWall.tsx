import { getHabits } from "@/app/actions";
import { HabitType } from "@/db/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Habit from "./Habit";
export default function HabitWall({
    initialHabits,
}: {
    initialHabits: HabitType[];
}) {

    const queryClient = useQueryClient();

    const { data: habits } = useQuery({
        queryKey: ["habits"],
        queryFn: getHabits,
        initialData: initialHabits,
        staleTime: 1000 * 60,
    });
    return (
        <div>
            {habits.map((habit) => (
                <Habit
                    id={habit.id}
                    habitName={habit.habitName}
                    streak={habit.streak}
                />
            ))}
        </div>
    );
}