import { getHabits } from "@/app/actions";
import { HabitType } from "@/db/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
                <p>tba</p>
            ))}
        </div>
    );
}