"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Globe2,
  GraduationCap,
  LayoutDashboard,
  Menu,
  ShieldAlert,
  X,
  type LucideIcon,
} from "lucide-react";

import ThemeToggle from "@/components/theme/ThemeToggle";

type AdminLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const adminLinks: AdminLink[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Countries", href: "/admin/countries", icon: Globe2 },
  {
    label: "Scholarships",
    href: "/admin/scholarships",
    icon: GraduationCap,
  },
];

function AdminNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="space-y-1.5">
      {adminLinks.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/admin" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? "bg-soft-blue text-primary"
                : "text-content hover:bg-surface-subtle hover:text-heading"
            }`}
          >
            <Icon
              aria-hidden="true"
              size={19}
              strokeWidth={isActive ? 2.2 : 1.8}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="border-b border-border px-6 py-5">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src="/branding/pathly-logo2.png"
            alt="Pathly"
            width={140}
            height={46}
            priority
            className="h-auto w-28 dark:hidden"
          />
          <Image
            src="/branding/pathly-logo-light.png"
            alt="Pathly"
            width={140}
            height={46}
            priority
            className="hidden h-auto w-28 dark:block"
          />
        </Link>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          Administration
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <AdminNavigation onNavigate={onNavigate} />
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-4 flex gap-3 rounded-xl border border-warning-border bg-soft-warning p-3 text-warning">
          <ShieldAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
          <p className="text-xs leading-5">
            Demo admin area. Authentication is not enabled.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 px-1">
          <span className="text-xs font-medium text-muted">Appearance</span>
          <ThemeToggle compact />
        </div>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <SidebarContent />
      </aside>

      <header className="fixed inset-x-0 top-0 z-[120] flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <Link
          href="/admin"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Image
            src="/branding/pathly-logo2.png"
            alt="Pathly admin"
            width={126}
            height={42}
            priority
            className="h-auto w-25 dark:hidden"
          />
          <Image
            src="/branding/pathly-logo-light.png"
            alt="Pathly admin"
            width={126}
            height={42}
            priority
            className="hidden h-auto w-25 dark:block"
          />
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="admin-mobile-sidebar"
          aria-label={isOpen ? "Close admin navigation" : "Open admin navigation"}
          className="flex size-10 items-center justify-center rounded-xl border border-border text-heading transition hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close admin navigation"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[110] bg-slate-950/45 lg:hidden"
          />
          <aside
            id="admin-mobile-sidebar"
            className="fixed inset-y-0 left-0 z-[130] flex w-[min(19rem,88vw)] flex-col border-r border-border bg-surface shadow-2xl lg:hidden"
          >
            <SidebarContent onNavigate={() => setIsOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}
