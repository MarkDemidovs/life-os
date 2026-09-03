"use client"
import { deleteNote } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteNote({ noteId }: { noteId: number }) {
    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    return (
        <button 
        onClick={() => {deleteNoteMutation.mutate(noteId)}}
        disabled={deleteNoteMutation.isPending}
        >{deleteNoteMutation.isPending ? "Deleting..." : "Delete Note"}</button>
    )
}