"use client"
import { createTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreateTaskComponent() {
    const queryClient = useQueryClient();

    const createTaskMutation = useMutation({
        mutationFn: createTask,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createTaskMutation.mutate(new FormData(e.currentTarget));
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