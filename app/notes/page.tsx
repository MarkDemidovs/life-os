import { auth } from "@clerk/nextjs/server";
import HomeButton from "@/components/ui/homebutton";
import { db } from "@/db";
import { notes } from "@/db/schema";import { eq } from "drizzle-orm";

export default async function Notes() {
  const { userId } = await auth.protect();

  const initialNotes = await db.select().from(notes).where(eq(notes.userId, userId));
  return (
    <>
    <HomeButton />
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <p>
        youre in the notes page
      </p>
    </main>
    </>
  );
}