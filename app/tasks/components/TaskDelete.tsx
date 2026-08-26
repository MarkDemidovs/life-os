'use client'
import { deleteTask } from "@/app/actions";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/db/schema";
import { Button } from "@/components/ui/button"
import { Task } from "@/app/types"

export default function TaskDelete({ taskId }: { taskId: number }) {
    const queryClient = useQueryClient();

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,

        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: ["tasks"] });

            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

            queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
                old.filter((task) => task.id !== taskId)
            );

            return { previousTasks };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(["tasks"], context.previousTasks);
            }
        },
    });

    return (
        <Button variant="outline" className="ml-10 font-heading " onClick={() => deleteTaskMutation.mutate(taskId)}>
            Delete
        </Button>
    )
}