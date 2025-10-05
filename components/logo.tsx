import Link from "next/link";
import { Sparkles } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={twMerge(
        "group inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-200 transition hover:bg-white",
        className,
      )}
    >
      <Sparkles className="h-4 w-4 text-brand-500 transition group-hover:rotate-6" />
      Nafila Shop
    </Link>
  );
}
