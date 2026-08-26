"use client";

import { deleteTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/types";

export default function TaskDelete({
    taskId,
    onDeleteStart,
}: {
    taskId: number;
    onDeleteStart: () => void;
}) {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,

        onMutate: async (taskId) => {
            // Start the exit animation
            onDeleteStart();

            await queryClient.cancelQueries({
                queryKey: ["tasks"],
            });

            const previousTasks =
                queryClient.getQueryData<Task[]>(["tasks"]);

            setTimeout(() => {
                queryClient.setQueryData<Task[]>(
                    ["tasks"],
                    (old = []) =>
                        old.filter((task) => task.id !== taskId)
                );
            }, 300);

            return { previousTasks };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(
                    ["tasks"],
                    context.previousTasks
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },
    });

    return (
        <Button
            variant="outline"
            className="ml-10 font-heading"
            onClick={() => deleteTaskMutation.mutate(taskId)}
            disabled={deleteTaskMutation.isPending}
        >
            Delete
        </Button>
    );
}