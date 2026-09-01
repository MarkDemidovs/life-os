"use client"

import { createNote } from "@/app/actions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Note } from "@/app/types";

export default function CreateNote() {
    const queryClient = useQueryClient();

    const createNoteMutation = useMutation({
        mutationFn: createNote,

        onSuccess: (newNote) => {
            queryClient.setQueryData<Note[]>(
                ["notes"],
                (old = []) => [...old, newNote]
            );
        },
    });

    return (
        <form 
            className="mb-6 mt-2"
            onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;

                createNoteMutation.mutate(
                    new FormData(form)
                );

                form.reset();
            }}
        >
            <input
                name="noteContent"
                type="text"
                className="border-2 p-1 rounded font-heading"
                placeholder="enter the new note"
            />

            <button
                className="border-2 font-heading px-3 rounded p-1 transition-colors hover:bg-accent"
                disabled={createNoteMutation.isPending}
            >
                {createNoteMutation.isPending
                    ? "Creating..."
                    : "Create"}
            </button>
        </form>
    )
}