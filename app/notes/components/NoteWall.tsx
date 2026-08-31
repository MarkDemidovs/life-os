"use client";
import { getNotes } from "@/app/actions";
import { NoteType } from "@/db/schema"
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function NoteWall({initialNotes} : {initialNotes: NoteType[]}) {
    
    const queryClient = useQueryClient();
    
    const { data: notes } = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
        initialData: initialNotes,
        staleTime: 1000 * 60,
    });

    return (
        <div>
            <p>tba</p>
        </div>
    )
}