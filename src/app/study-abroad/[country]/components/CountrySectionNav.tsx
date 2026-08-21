"use client";

import { useEffect, useState } from "react";

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
    id: "tuition-fees",
    label: "Tuition Fees",
  },
  {
    id: "living-costs",
    label: "Living Costs",
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

  function goToSection(sectionId: string) {
    setActiveSection(sectionId);
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="self-start lg:sticky lg:top-24">
      <div className="mb-6 lg:hidden">
        <label
          htmlFor="country-section"
          className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8ba0c0]"
        >
          Jump to section
        </label>

        <select
          id="country-section"
          value={activeSection}
          onChange={(event) => goToSection(event.target.value)}
          className="w-full rounded-xl border border-[#dce5f0] bg-white px-4 py-3 text-sm font-medium text-[#344968] outline-none focus:border-[#3157d5] focus:ring-2 focus:ring-[#3157d5]/20"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <nav className="hidden lg:block" aria-label="Country guide sections">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#8ba0c0]">
          Sections
        </p>

        <div className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => {
                event.preventDefault();
                goToSection(section.id);
              }}
              aria-current={
                activeSection === section.id ? "location" : undefined
              }
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
