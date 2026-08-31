"use server"
import { db } from "@/db";
import { taskSchema, deleteTaskSchema } from "@/lib/schemas";
import { notes, tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, asc} from "drizzle-orm";

export async function getTasks() {
    const { userId } = await auth.protect();

    return await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(asc(tasks.id));
}

export async function createTask(formData: FormData) {
    const { userId } = await auth.protect();

    const result = taskSchema.safeParse({
        taskName: formData.get("taskName"),
    });

    if (!result.success) {
        console.error(result.error);
        throw new Error("Invalid task data");
    }

    const [newTask] = await db
        .insert(tasks)
        .values({
            taskName: result.data.taskName,
            userId,
        })
        .returning();

    return newTask;
}
export async function deleteTask(taskId: number) {
    const { userId } = await auth.protect();

    const result = deleteTaskSchema.safeParse({
        taskId
    })

    if (!result.success) {
        console.error(result.error);
        throw new Error("Invalid task data");
    }

    await db.delete(tasks).where(
        and(
            eq(tasks.id, Number(result.data.taskId)),
            eq(tasks.userId, userId)
        )
    );
}

export async function changeStatus(id:number, isCompleted: boolean) {
    await db.update(tasks).set({ isCompleted }).where(eq(tasks.id, id));
}

export async function getNotes() {
    const { userId } = await auth.protect();

    return await db.select().from(notes).where(eq(notes.userId, userId)).orderBy(asc(notes.id));
}

