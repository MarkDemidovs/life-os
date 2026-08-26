"use client";

import TaskCheckbox from "./TaskCheckbox";
import TaskDelete from "./TaskDelete";
import { useState } from "react";

export default function Task({
    id,
    title,
    status,
    onDelete,
}: {
    id: number;
    title: string;
    status: boolean;
    onDelete: (taskId: number) => void;
}) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        onDelete(id);
    };

    return (
        <div
            className={`flex w-96 items-center justify-between py-2 px-3 hover:bg-gray-800/50 rounded-lg ${
                isDeleting
                    ? "animate-task-out"
                    : "animate-task-in"
            }`}
        >
            <p
                className={
                    status
                        ? "text-gray-400 line-through"
                        : "text-gray-100"
                }
            >
                {title}
            </p>

            <div className="pr-2">
                <TaskCheckbox
                    id={id}
                    status={status}
                />

                <TaskDelete
                    taskId={id}
                    onDeleteStart={handleDelete}
                />
            </div>
        </div>
    );
}