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
        initialData: initialTasks
    })

    return (
        <div>
            <div>
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.taskName} status={task.isCompleted} />
                ))}
            </div>
        </div>
    )
}