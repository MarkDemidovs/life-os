"use server"
import { db } from "@/db";
import { taskSchema } from "@/lib/schemas";
import { tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getTasks() {
    const { userId } = await auth();

    return await db.select().from(tasks).where(eq(tasks.userId, userId));
}