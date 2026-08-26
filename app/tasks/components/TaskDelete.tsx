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
            await queryClient.cancelQueries({ queryKey: ["tasks"]});

            const previousKeys = queryClient.getQueryData<Task[]>(["tasks"]);
        }
    });
    
    return (
        <Button variant="outline" className="ml-10 font-heading " onClick={() => deleteTaskMutation.mutate(taskId)}>  
            Delete
        </Button>
    )
}