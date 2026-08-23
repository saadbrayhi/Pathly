"use client";

import { useState } from "react";

const sections = [
  {
    id: "education-system",
    label: "Education System",
  },
  {
    id: "who-can-apply",
    label: "Who Can Apply?",
  },
  {
    id: "admission-requirements",
    label: "Admission Requirements",
  },
  {
    id: "study-levels",
    label: "Study Levels",
  },
  {
    id: "required-documents",
    label: "Required Documents",
  },
  {
    id: "language-requirements",
    label: "Language Requirements",
  },
  {
    id: "application-process",
    label: "Application Process",
  },
  {
    id: "scholarships",
    label: "Scholarships",
  },
  {
    id: "student-visa",
    label: "Student Visa",
  },
  {
    id: "official-sources",
    label: "Official Sources",
  },
  {
    id: "common-mistakes",
    label: "Common Mistakes",
  },
];

export default function CountrySectionNav() {
  const [activeSection, setActiveSection] = useState("education-system");

  return (
    <aside className="hidden lg:block">
      <nav>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8ba0c0]">
          Sections
        </p>

        <div className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={`block rounded-lg px-3 py-2 text-sm transition ${
                activeSection === section.id
                  ? "bg-[#eaf0ff] font-semibold text-[#3157d5]"
                  : "text-[#61779a] hover:bg-slate-100 hover:text-[#3157d5]"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
