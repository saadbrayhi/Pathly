"use client";

import { ExternalLink } from "lucide-react";

import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";

import type { Scholarship } from "@/constant/scholarships";

type ScholarshipHeaderProps = {
  scholarship: Scholarship;
};

export default function ScholarshipHeader({
  scholarship,
}: ScholarshipHeaderProps) {
  function openOfficialPage() {
    window.open(scholarship.officialUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="mb-6 border-[#dce5f0] bg-white p-7 shadow-none">
      {/* Top content */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
        <div>
          {/* Country + badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl">{scholarship.flag}</span>

            <span className="text-sm font-medium text-[#61779a]">
              {scholarship.country}
            </span>

            <Badge
              variant={scholarship.status === "Open" ? "success" : "warning"}
            >
              {scholarship.status === "Open"
                ? "Open"
                : scholarship.deadlineStatus}
            </Badge>

            <Badge variant="warning">{scholarship.level}</Badge>
          </div>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[#111827]">
            {scholarship.title}
          </h1>

          {/* Provider */}
          <p className="mt-1 text-sm text-[#61779a]">{scholarship.provider}</p>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-2 lg:w-62.5">
          <Button
            type="button"
            onClick={openOfficialPage}
            className="h-12 w-full justify-center whitespace-nowrap rounded-xl px-4 text-[14px] font-semibold"
          >
            View Official Application
            <ExternalLink size={14} />
          </Button>

          <Button
            href="/documents"
            variant="secondary"
            className="h-12 w-full justify-center whitespace-nowrap rounded-xl px-4 text-[14px] font-semibold"
          >
            Review Required Documents
          </Button>
        </div>
      </div>

      {/* Quick information */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickInfo label="Funding type" value={scholarship.funding} />

        <QuickInfo label="Study level" value={scholarship.level} />

        <QuickInfo label="Field" value={scholarship.field} />

        <QuickInfo label="Deadline" value={scholarship.deadline} />
      </div>
    </Card>
  );
}

type QuickInfoProps = {
  label: string;
  value: string;
};

function QuickInfo({ label, value }: QuickInfoProps) {
  return (
    <div className="rounded-xl bg-[#f5f6f2] px-4 py-3">
      <p className="text-xs text-[#8ba0c0]">{label}</p>

      <p className="mt-1 text-xs font-semibold leading-5 text-[#263a5b]">
        {value}
      </p>
    </div>
  );
}
