"use client"

import type { TaskType } from "@/db/schema";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/app/actions";
import { User } from "lucide-react";

export default function TaskWall({ initialTasks }: { initialTasks: TaskType[]}) {
    const {data: tasks} = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
        initialData: initialTasks,
        staleTime: 1000*60,
    })

    return (
        <div className="w-full">
            <div className="flex flex-col justify-center items-center gap-2">
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.taskName} status={task.isCompleted} />
                ))}
            </div>
        </div>
    )
}