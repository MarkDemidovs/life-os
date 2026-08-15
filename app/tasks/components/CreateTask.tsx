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

            // 4. Optimistically update the cache with a temporary ID
            queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
                ...old,
                { id: Date.now(), taskName: newTaskName },
            ]);

            // 5. Return context containing the snapshot
            return { previousTasks };
        },

        // 6. If the mutation fails, roll back to the previous snapshot
        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(["tasks"], context.previousTasks);
            }
        },

        // 7. Always refetch after error or success to sync with the server
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
                className="border-2 p-1 rounded"
            />
            <button
                className="border-2 rounded p-1"
                disabled={createTaskMutation.isPending}
            >
                {createTaskMutation.isPending ? "Posting..." : "Post"}
            </button>
        </form>
    );
}