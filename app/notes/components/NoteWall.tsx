"use client";
import { getNotes } from "@/app/actions";
import { NoteType } from "@/db/schema"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Note from "./Note";

export default function NoteWall({initialNotes} : {initialNotes: NoteType[]}) {
    
    const queryClient = useQueryClient();
    
    const { data: notes } = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
        initialData: initialNotes,
        staleTime: 1000 * 60,
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {notes.map((note) => (
                <Note key={note.id} noteId={note.id} noteContent={note.noteContent ?? "No content"} />
            ))} 
        </div>
    )
}