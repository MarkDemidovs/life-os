import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      <h1>
        LIFE OS
      </h1>
      
      <div className="my-10">
      <Link href={"/tasks"}>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Keep track of what needs to get done.</CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <Link href={"/habits"}>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Build consistency and track daily habits you want to maintan.</CardDescription>
          </CardHeader>
        </Card>
      </Link>

      <Link href={"/notes"}>
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Capture any ideas, thoughts, information and insights you want to remember.</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      </div>
    </main>
  );
}
