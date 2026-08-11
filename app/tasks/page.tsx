import { auth } from "@clerk/nextjs/server";
import { db } from "@/db"
import { tasks } from "@/db/schema";
import TaskWall from "./components/TaskWall";

export default async function Tasks() {
  await auth.protect();
  const initialTasks = await db.select().from(tasks);
  

  return (
    <TaskWall initialTasks={initialTasks} />
  );
}