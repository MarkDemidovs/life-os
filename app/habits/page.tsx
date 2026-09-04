import { auth } from "@clerk/nextjs/server";
import HomeButton from "@/components/ui/homebutton";
export default async function Habits() {
  await auth.protect();

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