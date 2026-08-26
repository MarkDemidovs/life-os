'use client'
import { deleteTask } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskType } from "@/db/schema";
import { Button } from "@/components/ui/button"

export default function TaskDelete() {
    return (
        <Button variant="outline" className="ml-10 font-heading">
            Delete
        </Button>
    )
}