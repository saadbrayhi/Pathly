import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

const exploreLinks = [
  { label: "Study Path Finder", href: "/find-my-path" },
  { label: "Countries", href: "/study-abroad" },
  { label: "Scholarships", href: "/scholarship" },
];

const prepareLinks = [
  { label: "Admissions", href: "/study-abroad/france" },
  { label: "Documents", href: "/documents" },
  { label: "Student Visa", href: "/student-visa" },
];

const helpLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "AI Navigator", href: "/ai-navigator" },
  { label: "Personal Support", href: "/personal-support" },
  { label: "About Pathly", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-heading text-slate-300">
      <div className="page-container py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/branding/pathly-logo-light.png"
                  alt="Pathly"
                  width={160}
                  height={52}
                  className="h-auto w-32"
                />
              </Link>
            </div>

            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-400">
              Pathly organizes the complete international study journey — from
              choosing a path to verifying official requirements — in one clear,
              trusted guide.
            </p>

            <div className="flex items-start gap-2 rounded-xl border border-slate-700/60 bg-slate-800/60 p-3">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />

              <p className="text-xs leading-relaxed text-slate-400">
                Information can change. Always verify important requirements
                with official university, government, and embassy sources.
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="footer-heading">Explore</h3>

            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Prepare */}
          <div>
            <h3 className="footer-heading">Prepare</h3>

            <ul className="space-y-2.5">
              {prepareLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="footer-heading">Help</h3>

            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
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
            <Link href="/privacy" className="footer-meta-link">
              Privacy
            </Link>

            <Link href="/terms" className="footer-meta-link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
