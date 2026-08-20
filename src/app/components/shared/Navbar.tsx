"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const navLinks = [
  { label: "Study Abroad", href: "/study-abroad" },
  { label: "Scholarships", href: "/scholarship" },
  { label: "Documents", href: "/documents" },
  { label: "Student Visa", href: "/student-visa" },
  { label: "AI Navigator", href: "/ai-navigator" },
  { label: "Personal Support", href: "/personal-support" },

];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* LOGO */}
        <Link
          href="/"
          className="nav-brand"
        >
          Pathly
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">
          <Button
            href="/find-my-path"
            className="rounded-lg px-4 py-2 text-sm font-medium"
          >
            Find My Path
          </Button>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex h-16 items-center font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-slate-700 hover:text-primary"
                }`}
              >
                {link.label}

                {/* UNDERLINE */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* LANGUAGE */}
        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-sm">
          <button className="bg-primary px-3 py-2 text-white">
            EN
          </button>

          <button className="nav-language">
            AR
          </button>

          <button className="nav-language">
            FR
          </button>
        </div>
      </div>
    </nav>
  );
}