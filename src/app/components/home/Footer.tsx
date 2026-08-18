import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const exploreLinks = [
  { label: "Study Path Finder", href: "/study-path" },
  { label: "Countries", href: "/study-abroad" },
  { label: "Scholarships", href: "/scholarships" },
];

const prepareLinks = [
  { label: "Admissions", href: "/study-abroad/france" },
  { label: "Documents", href: "/documents" },
  { label: "Student Visa", href: "/visa" },
];

const helpLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "AI Navigator", href: "/ai-navigator" },
  { label: "Personal Support", href: "/personal-support" },
  { label: "About Pathly", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#0f172a] text-slate-300">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3157d5]">
                <span className="font-bold text-white">P</span>
              </div>

              <span className="text-lg font-bold text-white">Pathly</span>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Pathly organizes the complete international study journey — from
              choosing a path to verifying official requirements — in one clear,
              trusted guide.
            </p>

            <div className="flex items-start gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-3">
              <ShieldCheck
                size={16}
                className="mt-0.5 shrink-0 text-[#0f9f8f]"
              />

              <p className="text-xs leading-relaxed text-slate-400">
                Information can change. Always verify important requirements
                with official university, government, and embassy sources.
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Explore
            </h3>

            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Prepare */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Prepare
            </h3>

            <ul className="space-y-2.5">
              {prepareLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Help
            </h3>

            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Pathly. A free public study-abroad guide.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
