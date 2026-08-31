export default function Note({ noteContent }: { noteContent: string }) {
    return (
        <div>
            <p>{noteContent}</p>
        </div>
    );
}