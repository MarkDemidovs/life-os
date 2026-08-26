"use client";

import { deleteTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/db/schema";

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

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ["tasks"],
            });

            const previousTasks =
                queryClient.getQueryData<TaskType[]>(["tasks"]);

            return { previousTasks };
        },

        onSuccess: () => {
            queryClient.setQueryData<TaskType[]>(
                ["tasks"],
                (old = []) =>
                    old.filter((task) => task.id !== taskId)
            );
        },

        onError: (_error, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(
                    ["tasks"],
                    context.previousTasks
                );
            }
        },
    });

    return (
        <Button
            variant="outline"
            className="ml-10 font-heading"
            onClick={() => {
                onDeleteStart();
                deleteTaskMutation.mutate(taskId);
            }}
            disabled={deleteTaskMutation.isPending}
        >
            Delete
        </Button>
    );
}