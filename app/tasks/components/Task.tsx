import TaskCheckbox from "./TaskCheckbox";

export default function Task({ id, title, status }: { id: number, title: string, status: boolean }) {
    return (
        <div>
            <p className={status ? "text-gray-400 line-through" : "text-gray-100 "}>{title}</p>
            <TaskCheckbox id={id} status={status}/>
        </div>
    );
}