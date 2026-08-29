import { auth } from "@clerk/nextjs/server";
import { db } from "@/db"
import { tasks } from "@/db/schema";
import TaskWall from "./components/TaskWall";
import { eq, asc } from "drizzle-orm";
import CreateTaskComponent from "./components/CreateTask";
import HomeButton from "@/components/ui/homebutton";
export default async function Tasks() {
  await auth.protect();
  const { userId } = await auth.protect();

  const initialTasks = await db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(asc(tasks.id));

  return (
    <>
    <HomeButton />
    <main className="w-full h-screen flex flex-col items-center justify-center">

      <TaskWall initialTasks={initialTasks} />

      <div className="mt-6">
        <CreateTaskComponent />
      </div>
    </main>
    </>
  );
}