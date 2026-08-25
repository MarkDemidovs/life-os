import { auth } from "@clerk/nextjs/server";
import { db } from "@/db"
import { tasks } from "@/db/schema";
import TaskWall from "./components/TaskWall";
import { eq, asc } from "drizzle-orm";
import CreateTaskComponent from "./components/CreateTask";

export default async function Tasks() {
  await auth.protect();
  const { userId } = await auth.protect();

  const initialTasks = await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(asc(tasks.id));

  return (
    <main className="w-full h-full flex flex-col items-center w-full h-screen justify-center">
      <TaskWall initialTasks={initialTasks} />

      <div className="mt-6">
        <CreateTaskComponent />
      </div>
    </main>
  );
}