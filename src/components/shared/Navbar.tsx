"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/branding/pathly-logo2.png"
            alt="Pathly"
            width={160}
            height={52}
            priority
            className="h-auto w-28 sm:w-32 lg:w-36"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-5 text-sm lg:flex">
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
                className={`group relative flex h-16 items-center whitespace-nowrap font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-slate-700 hover:text-primary"
                }`}
              >
                {link.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-heading lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE / TABLET MENU */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            <Link
              href="/find-my-path"
              onClick={() => setIsOpen(false)}
              className="mb-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Find My Path
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-soft-blue text-primary"
                      : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
