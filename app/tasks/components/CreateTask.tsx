"use client";

import { createTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Task {
    id: string | number;
    taskName: string;
}

export default function CreateTaskComponent() {
    const queryClient = useQueryClient();

    const createTaskMutation = useMutation({
        mutationFn: createTask,

        onMutate: async (formData: FormData) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

            const newTaskName = formData.get("taskName") as string;

            queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
                ...old,
                { id: Date.now(), taskName: newTaskName },
            ]);

            return { previousTasks };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(["tasks"], context.previousTasks);
            }
        },

    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                createTaskMutation.mutate(new FormData(form));
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
                {createTaskMutation.isPending ? "Creating..." : "Create"}
            </button>
        </form>
    );
}