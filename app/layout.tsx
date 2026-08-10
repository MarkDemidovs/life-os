import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ClerkProvider } from "@clerk/nextjs"

const notoSerifHeading = Noto_Serif({subsets:['latin'],variable:'--font-heading'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Life OS",
  description: "Because technology is meant to serve us.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", geistSans.variable, geistMono.variable, notoSerifHeading.variable) }
      
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
    </ClerkProvider>
  );
}
