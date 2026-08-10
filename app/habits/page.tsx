import { auth } from "@clerk/nextjs/server";

export default async function Habits() {
  await auth.protect();

  return (
    <p>
      youre in the habits page
    </p>
  );
}