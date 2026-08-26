'use client'
import { deleteTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/db/schema";

export default function TaskDelete() {
    return (
        <button className="ml-10 font-heading">
            Delete
        </button>
    )
}