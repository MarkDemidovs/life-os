"use client";

import { deleteTask } from "@/app/actions";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function TaskDelete({
    taskId,
    onDeleteStart,
}: {
    taskId: number;
    onDeleteStart: () => void;
}) {
    const deleteTaskMutation = useMutation({
        mutationFn: deleteTask,
    });

    const handleDelete = () => {
        onDeleteStart();
        deleteTaskMutation.mutate(taskId);
    };

    return (
        <Button
            variant="outline"
            className="ml-10 font-heading"
            onClick={handleDelete}
            disabled={deleteTaskMutation.isPending}
        >
            Delete
        </Button>
    );
}