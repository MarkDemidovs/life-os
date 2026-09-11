import { auth } from "@clerk/nextjs/server";
import HomeButton from "@/components/ui/homebutton";
import { habits } from "@/db/schema";
import { db } from "@/db";

export default async function Habits() {
  await auth.protect();
  const initialHabits = await db.select().from(habits);
  
  return (
    <>
    <HomeButton />
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <p>
        youre in the habits page
      </p>
    </main>
    </>
  );
}