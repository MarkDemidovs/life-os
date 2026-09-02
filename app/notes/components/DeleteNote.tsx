import { deleteNote } from "@/app/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function DeleteNote({ noteId }: { noteId: number }) {
    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote
    });

    return (
        <button 
        onClick={() => {deleteNoteMutation.mutate(noteId)}}>Delete Task</button>
    )
}