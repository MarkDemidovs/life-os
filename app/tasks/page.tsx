import { auth } from "@clerk/nextjs/server";
import { db } from "@/db"
import { tasks } from "@/db/schema";
import TaskWall from "./components/TaskWall";
import { eq } from "drizzle-orm";

export default async function Tasks() {
  await auth.protect();
  const { userId } = await auth.protect(); 

  const initialTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));

  return (
    <TaskWall initialTasks={initialTasks} />
  );
}