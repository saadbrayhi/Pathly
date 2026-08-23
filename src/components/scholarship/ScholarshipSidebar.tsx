"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";

import Card from "@/components/shared/Card";

import type { Scholarship } from "@/constant/scholarships";

type ScholarshipSidebarProps = {
  scholarship: Scholarship;
};

export default function ScholarshipSidebar({
  scholarship,
}: ScholarshipSidebarProps) {
  const isOpen = scholarship.deadlineTone === "success";

  function openOfficialPage() {
    window.open(scholarship.officialUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <aside className="space-y-5">
      {/* Deadline Status */}
      <Card className="border-[#dce5f0] bg-white p-5 shadow-none">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8ba0c0]">
          Deadline Status
        </p>

        <div
          className={`mt-4 rounded-xl border px-4 py-4 ${
            isOpen
              ? "border-[#bde9df] bg-[#e7f8f4]"
              : "border-[#f0d070] bg-[#fff5df]"
          }`}
        >
          <div className="flex items-start gap-3">
            <Clock3
              size={16}
              className={`mt-0.5 shrink-0 ${
                isOpen ? "text-[#0f9f8f]" : "text-[#b76800]"
              }`}
            />

            <div>
              <p
                className={`text-sm font-semibold ${
                  isOpen ? "text-[#16856f]" : "text-[#b76800]"
                }`}
              >
                {scholarship.deadlineStatus}
              </p>

              <p className="mt-1 text-xs leading-5 text-[#61779a]">
                {scholarship.deadline}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-[#8ba0c0]">
          Always verify the current deadline on the official provider page
          before planning.
        </p>
      </Card>

      {/* Official Source */}
      <Card className="border-[#dce5f0] bg-white p-5 shadow-none">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#0f9f8f]" />

          <p className="text-sm font-semibold text-[#111827]">
            Official source linked
          </p>
        </div>

        <button
          type="button"
          onClick={openOfficialPage}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2849bb]"
        >
          Open official page
          <ExternalLink size={14} />
        </button>

        <p className="mt-3 text-center text-xs text-[#8ba0c0]">
          You&apos;ll see a brief notice before leaving Pathly.
        </p>
      </Card>

      {/* Related Resources */}
      <Card className="border-[#dce5f0] bg-white p-5 shadow-none">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8ba0c0]">
          Related Resources
        </p>

        <div className="mt-4 space-y-3">
          <Link
            href="/documents"
            className="flex items-center gap-2 text-sm font-medium text-[#3157d5] transition hover:underline"
          >
            <FileText size={14} />
            Required Documents Guide
          </Link>

          <Link
            href="/scholarship"
            className="flex items-center gap-2 text-sm font-medium text-[#3157d5] transition hover:underline"
          >
            <ArrowRight size={14} />
            More Scholarships
          </Link>

          <Link
            href="/find-my-path"
            className="flex items-center gap-2 text-sm font-medium text-[#3157d5] transition hover:underline"
          >
            <ArrowRight size={14} />
            Build Your Study Path
          </Link>
        </div>
      </Card>
    </aside>
  );
}
