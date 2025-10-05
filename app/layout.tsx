import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Nafila Shop Platform",
  description:
    "A collaborative marketplace connecting entrepreneurs and investors with verified opportunities.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={twMerge("min-h-screen bg-slate-50 font-sans")}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
