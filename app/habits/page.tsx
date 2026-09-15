import { auth } from "@clerk/nextjs/server";
import HomeButton from "@/components/ui/homebutton";
import { habits } from "@/db/schema";
import { db } from "@/db";
import HabitsWall from "./components/HabitWall";

export default async function Habits() {
  await auth.protect();
  const initialHabits = await db.select().from(habits);

  return (
    <>
      <HomeButton />
      <main className="w-full h-full pt-24 px-6 py-6">
        <HabitsWall initialHabits={initialHabits} />
      </main>
    </>
  );
}