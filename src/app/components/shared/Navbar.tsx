"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Study Abroad", href: "/study-aboard" },
  { label: "Scholarships", href: "/scholarship" },
  { label: "Documents", href: "/documents" },
  { label: "Student Visa", href: "/student-visa" },
  { label: "AI Navigator", href: "/ai-navigator" },
  { label: "Personal Support", href: "/personal-support" },
   { label: "find-my-path", href: "/find-my-path" },

];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* LOGO */}
        <Link
          href="/"
          className="font-bold text-slate-900 transition-colors duration-200 hover:text-[#3157d5]"
        >
          Pathly
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/find-my-path"
            className="rounded-lg bg-[#3157d5] px-4 py-2 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2647b8] hover:shadow-md"
          >
            Find My Path
          </Link>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex h-16 items-center font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#3157d5]"
                    : "text-slate-700 hover:text-[#3157d5]"
                }`}
              >
                {link.label}

                {/* UNDERLINE */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#3157d5] transition-all duration-300 ease-out ${
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
          <button className="bg-[#3157d5] px-3 py-2 text-white">
            EN
          </button>

          <button className="px-3 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-[#3157d5]">
            AR
          </button>

          <button className="px-3 py-2 text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-[#3157d5]">
            FR
          </button>
        </div>
      </div>
    </nav>
  );
}