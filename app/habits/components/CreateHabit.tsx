"use client"
import { createHabit } from "@/app/actions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Habit } from "@/app/types";

export default function CreateHabit() {
    const queryClient = useQueryClient();

    const createHabitMutation = useMutation({
        mutationFn: createHabit,

        onSuccess: (newHabit) => {
            queryClient.setQueryData<Habit[]>(
                ["habits"],
                (old = []) => [...old, newHabit]
            );
        }
    })

    return(
        <form
        className="mb-6 mt-2"
        onSubmit={(e) => {
            e.preventDefault();

            const form = e.currentTarget;

            createHabitMutation.mutate(
                new FormData(form)
            );

            form.reset();
        }}
        >
            <input
                name="habitName"
                type="text"
                className="border-2 p-1 rounded font-heading"
                placeholder="enter the new habit"
            ></input>

            <button
                className="border-2 font-heading px-3 rounded p-1 transition-colors hover:bg-accent"
                disabled={createHabitMutation.isPending}
            >
                {createHabitMutation.isPending
                    ? "Creating..."
                    : "Create"}
            </button>
        </form>
    )
}