export type DeadlineGroup = "upcoming" | "later" | "verify";

export interface Deadline {
  label: string;
  date: string;
  group: DeadlineGroup;
  type: "Scholarship" | "Admission";
}

export const deadlines: Deadline[] = [
  {
    label: "Türkiye Scholarships — Application window",
    date: "Verify official portal",
    group: "verify",
    type: "Scholarship",
  },
  {
    label: "Erasmus Mundus — Round 1 (selected programs)",
    date: "Nov–Jan (varies)",
    group: "upcoming",
    type: "Scholarship",
  },
  {
    label: "DAAD EPOS — Intake",
    date: "Varies by course",
    group: "upcoming",
    type: "Scholarship",
  },
  {
    label: "France Campus France — BAC intake",
    date: "Jan–Mar (varies by country)",
    group: "upcoming",
    type: "Admission",
  },
  {
    label: "Eiffel Excellence — Nomination cycle",
    date: "Verify current cycle",
    group: "verify",
    type: "Scholarship",
  },
  {
    label: "Germany — Winter semester applications",
    date: "May–Jul (varies by university)",
    group: "later",
    type: "Admission",
  },
  {
    label: "Holland Scholarship — Application window",
    date: "Feb–May (verify university portal)",
    group: "upcoming",
    type: "Scholarship",
  },
  {
    label: "Italy DSU (regional grants) — Application",
    date: "Varies by region — verify EDISU/ARDSU",
    group: "verify",
    type: "Scholarship",
  },
];
