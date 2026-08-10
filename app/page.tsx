import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center px-6">
      <div className="mx-auto w-full max-w-6xl">

        <div className="mb-8 md:mb-6">
          <h1 className="font-heading text-4xl tracking-tight md:text-6xl">
            LIFE OS
          </h1>

          <p className="mt-2 text-muted-foreground">
Because technology is meant to serve us.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <Link href="/tasks">
            <Card className="h-full transition-colors hover:bg-accent md:min-h-48">
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription className="md:text-base">
                  Keep track of what needs to get done.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/habits">
            <Card className="h-full transition-colors hover:bg-accent md:min-h-48">
              <CardHeader>
                <CardTitle>Habits</CardTitle>
                <CardDescription className="md:text-base">
                  Build consistency and track daily habits you want to maintain.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/notes">
            <Card className="h-full transition-colors hover:bg-accent md:min-h-48">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription className="md:text-base">
                  Capture ideas, thoughts, information and insights you want to remember.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

      </div>
    </main>
  );
}
