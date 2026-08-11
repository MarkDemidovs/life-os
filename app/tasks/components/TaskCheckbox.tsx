"use client";

import { changeStatus } from "../../actions";


export default function TaskCheckbox({
    id,
    status,
}: {
    id: number;
    status: boolean;
}) {
    return (
        <input
            type="checkbox"
            checked={status}
            onChange={() => changeStatus(id, !status)}
        />
    );
}