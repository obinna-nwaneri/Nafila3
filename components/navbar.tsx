"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { twMerge } from "tailwind-merge";

const navigation = [
  { name: "Product", href: "#product" },
  { name: "Showcases", href: "#showcases" },
  { name: "Investors", href: "#investors" },
  { name: "Engage", href: "#engagement" },
  { name: "Admin", href: "#admin" },
];

const authLinks = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="transition hover:text-brand-600">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {authLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                item.name === "Register"
                  ? "bg-brand-600 text-white shadow hover:bg-brand-500"
                  : "text-brand-700 hover:text-brand-600",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white shadow-inner md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-slate-200 px-4 py-4">
            {authLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  "mb-2 block rounded-full px-4 py-2 text-center text-sm font-semibold",
                  pathname === item.href
                    ? "bg-brand-600 text-white shadow"
                    : "text-brand-700 ring-1 ring-brand-200",
                )}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
