"use server"
import { db } from "@/db";
import { taskSchema, deleteTaskSchema } from "@/lib/schemas";
import { tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, asc} from "drizzle-orm";

export async function getTasks() {
    const { userId } = await auth.protect();

    return await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(asc(tasks.id));
}

export async function createTask(formData: FormData) {
    const { userId } = await auth.protect();

    const result = taskSchema.safeParse({
        taskName: formData.get("taskName")
    });

    if (!result.success) {
        console.error(result.error);
        throw new Error("Invalid task data");
    }

    await db.insert(tasks).values({
        taskName: result.data.taskName,
        userId
    })
}

export async function deleteTask(taskId: string) {
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