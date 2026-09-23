"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleStreak } from "@/app/actions";
import { HabitType } from "@/db/schema";
import { formatCalendarDate } from "@/lib/streaks";

export default function HabitCheckmark({
    id,
    lastCompleted,
}: {
    id: number;
    lastCompleted: string;
}) {
    const queryClient = useQueryClient();

    const handleCheckmark = useMutation({
        mutationFn: () => handleStreak(id),
        onSuccess: (updatedHabit) => {
            if (updatedHabit) {
                queryClient.setQueryData<HabitType[]>(["habits"], (habits = []) =>
                    habits.map((habit) =>
                        habit.id === id
                            ? { ...habit, ...updatedHabit }
                            : habit
                    )
                );
            }
            queryClient.invalidateQueries({ queryKey: ["habits"] });
        },
    });

    return (
        <input
            type="checkbox"
            aria-label="Mark habit as completed"
            checked={lastCompleted === formatCalendarDate()}
            disabled={handleCheckmark.isPending}
            onChange={(event) => {
                if (event.currentTarget.checked) {
                    handleCheckmark.mutate();
                }
            }}
        />
    );
}