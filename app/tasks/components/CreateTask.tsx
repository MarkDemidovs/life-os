"use client";

import { createTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/app/types";

export default function CreateTaskComponent() {
    const queryClient = useQueryClient();

    const createTaskMutation = useMutation({
        mutationFn: createTask,

        onSuccess: (newTask) => {
            queryClient.setQueryData<Task[]>(
                ["tasks"],
                (old = []) => [...old, newTask]
            );
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;

                createTaskMutation.mutate(
                    new FormData(form)
                );

                form.reset();
            }}
        >
            <input
                name="taskName"
                type="text"
                className="border-2 p-1 rounded font-heading"
                placeholder="enter the new task name"
            />

            <button
                className="border-2 font-heading px-3 rounded p-1 transition-colors hover:bg-accent"
                disabled={createTaskMutation.isPending}
            >
                {createTaskMutation.isPending
                    ? "Creating..."
                    : "Create"}
            </button>
        </form>
    );
}