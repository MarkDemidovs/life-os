"use server"
import { db } from "@/db";
import { taskSchema } from "@/lib/schemas";
import { tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getTasks() {
    const { userId } = await auth.protect();

    return await db.select().from(tasks).where(eq(tasks.userId, userId));
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