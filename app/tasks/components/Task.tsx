import TaskCheckbox from "./TaskCheckbox";

export default function Task({ id, title, status }: { id: number, title: string, status: boolean }) {
    return (
        <div>
            <p>{title}</p>
            <TaskCheckbox id={id} status={status}/>
        </div>
    );
}