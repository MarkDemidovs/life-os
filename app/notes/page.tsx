import { auth } from "@clerk/nextjs/server";

export default async function Notes() {
  await auth.protect();

  return (
    <p>
      youre in the notes page
    </p>
  );
}