import { auth } from "@clerk/nextjs/server";
import HomeButton from "@/components/ui/homebutton";
import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import NoteWall from "./components/NoteWall";
import CreateNote from "./components/CreateNote";

export default async function Notes() {
  const { userId } = await auth.protect();

  const initialNotes = await db.select().from(notes).where(eq(notes.userId, userId));
  return (
    <>
    <HomeButton />

    <main className="w-full h-full pt-24 px-6 py-6">
          <CreateNote />
      <NoteWall initialNotes={initialNotes} />
    </main>
    </>
  );
}