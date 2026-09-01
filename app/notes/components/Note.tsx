export default function Note({ noteContent }: { noteContent: string }) {
    return (
        <div className="min-h-40 bg-black text-white rounded-lg p-5 shadow-lg border border-zinc-800">
            <p className="text-sm leading-relaxed">
                {noteContent}
            </p>
        </div>
    );
}