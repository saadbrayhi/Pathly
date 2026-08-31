"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import Button from "./Button";
import ThemeToggle from "../theme/ThemeToggle";

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
    <nav className="relative z-50 border-b border-border bg-surface">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4">
        {/* LOGO */}
        <Link href="/" className="justify-self-start">
          <Image
            src="/branding/pathly-logo2.png"
            alt="Pathly"
            width={160}
            height={52}
            priority
            className="h-auto w-28 sm:w-32 lg:w-36 dark:hidden"
          />
          <Image
            src="/branding/pathly-logo-light.png"
            alt="Pathly"
            width={160}
            height={52}
            loading="eager"
            className="hidden h-auto w-28 sm:w-32 lg:w-36 dark:block"
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
                    : "text-content hover:text-primary"
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
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-lg border border-border text-heading transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="absolute top-1/2 right-4 hidden -translate-y-1/2 lg:block">
        <ThemeToggle compact />
      </div>

      {/* MOBILE / TABLET MENU */}
      {isOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
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
                      : "text-content hover:bg-surface-subtle hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-border pt-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Theme
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
