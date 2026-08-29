import Link from "next/link"

export default function HomeButton() {
    return (
        <nav className="fixed top-4 left-4 z-10">
            <Link href={"/"}>
                <button className="border w-12 h-12 rounded-full bg-background hover:bg-accent transition-colors">
                    &lt;
                </button>
            </Link>
        </nav>
    )
}