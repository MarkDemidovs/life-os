import { auth } from "@clerk/nextjs/server";

export default async function Tasks() {
  await auth.protect();

  return (
    <p>
      youre in the Tasks page
    </p>
  );
}