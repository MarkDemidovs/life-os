import TaskCheckbox from "./TaskCheckbox";
import TaskDelete from "./TaskDelete";

export default function Task({ id, title, status }: { id: number, title: string, status: boolean }) {
    return (
        <div className="flex w-96 items-center justify-between py-2 px-3 hover:bg-gray-800/50 rounded-lg">
            <p className={status ? "text-gray-400 line-through" : "text-gray-100 "}>{title}</p>
            <div className="pr-2">
                <TaskCheckbox id={id} status={status} />
                <TaskDelete />
            </div>
        </div>
    );
}