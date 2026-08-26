"use client";

import { changeStatus } from "../../actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/db/schema";

export default function TaskCheckbox({
    id,
    status,
}: {
    id: number;
    status: boolean;
}) {
    const queryClient = useQueryClient();

    const optimisticMutation = useMutation({
        mutationFn: (newStatus: boolean) =>
            changeStatus(id, newStatus),

        onMutate: async (newStatus) => {
            await queryClient.cancelQueries({
                queryKey: ["tasks"],
            });

            const previousTasks =
                queryClient.getQueryData<TaskType[]>(["tasks"]);

            queryClient.setQueryData<TaskType[]>(
                ["tasks"],
                (old = []) =>
                    old.map((task) =>
                        task.id === id
                            ? {
                                  ...task,
                                  isCompleted: newStatus,
                              }
                            : task
                    )
            );

            return { previousTasks };
        },

        onError: (_error, _newStatus, context) => {
            queryClient.setQueryData(
                ["tasks"],
                context?.previousTasks
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });
        },
    });

    return (
        <input
            type="checkbox"
            checked={status ?? false}
            onChange={(e) =>
                optimisticMutation.mutate(e.target.checked)
            }
        />
    );
}