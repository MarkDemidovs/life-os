import DeleteNote from "./DeleteNote"

export default function Note({ noteContent, noteId }: { noteContent: string, noteId: number }) {
    return (
        <div className="min-h-40 bg-black text-white rounded-lg p-5 shadow-lg border border-zinc-800">
            <DeleteNote noteId={noteId} />
            <p className="text-sm leading-relaxed">
                {noteContent}
            </p>
        </div>
    );
}