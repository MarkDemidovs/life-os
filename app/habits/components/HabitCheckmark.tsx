"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleStreak } from "@/app/actions";

export default function HabitCheckmark({ id }: { id: number }) {
    const queryClient = useQueryClient();

    const handleCheckmark = useMutation({
        mutationFn: () => handleStreak(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["habits"] });
        },
    });

    return (
        <input
            type="checkbox"
            aria-label="Mark habit as completed"
            disabled={handleCheckmark.isPending}
            onChange={() =>
            handleCheckmark.mutate()}
        />
    );
}