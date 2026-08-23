import {
  TrendingUp,
  Globe,
  BookOpen,
  FileText,
  Award,
  Plane,
  Bot,
} from "lucide-react";

export const destinations = [
  {
    name: "France",
    flag: "🇫🇷",
    image: "/images/home/destinations/france.jpg",
    languages: ["French", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/france",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    image: "/images/home/destinations/germany.jpg",
    languages: ["German", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/germany",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    image: "/images/home/destinations/italy.jpg",
    languages: ["Italian", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/italy",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    image: "/images/home/destinations/canada.jpg",
    languages: ["English", "French"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/canada",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    image: "/images/home/destinations/turkey.jpg",
    languages: ["Turkish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/turkey",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    image: "/images/home/destinations/netherlands.jpg",
    languages: ["Dutch", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/netherlands",
    scholarships: true,
    visaRequired: true,
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    image: "/images/home/destinations/spain.jpg",
    languages: ["Spanish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
    href: "/study-abroad/spain",
    scholarships: true,
    visaRequired: true,
  },
];

export const scholarships = [
  {
    name: "Erasmus Mundus Joint Masters",
    country: "Europe",
    flag: "🇪🇺",
    level: "Master",
    funding: "Fully funded scholarship for international students.",
    deadline: "January 2027",
    image: "/images/home/scholarships/erasmus-mundus.jpg",
    href: "/scholarship/erasmus-mundus",
  },
  {
    name: "DAAD EPOS",
    country: "Germany",
    flag: "🇩🇪",
    level: "Master",
    funding: "Funding for development-related postgraduate programs.",
    deadline: "Varies by program",
    image: "/images/home/scholarships/daad-epos.jpg",
    href: "/scholarship/daad-epos",
  },
  {
    name: "Eiffel Excellence Scholarship",
    country: "France",
    flag: "🇫🇷",
    level: "Master",
    funding: "French government scholarship for international students.",
    deadline: "January 2027",
    image: "/images/home/scholarships/eiffel.jpg",
    href: "/scholarship/eiffel-excellence",
  },
];

export const quickCategories = [
  {
    icon: TrendingUp,
    label: "Find My Study Path",
    desc: "Get a personalized step-by-step path for your goal.",
    href: "/find-my-path",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: Globe,
    label: "Explore Countries",
    desc: "Compare admission, costs, and visas by destination.",
    href: "/study-abroad",
    accent: "bg-[#e7f8f4] text-[#0f9f8f]",
  },
  {
    icon: BookOpen,
    label: "Admission Requirements",
    desc: "Know exactly what each country requires for your level.",
    href: "/study-abroad/france",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: FileText,
    label: "Required Documents",
    desc: "Every document explained, with prep guidance.",
    href: "/documents",
    accent: "bg-[#f0fdf4] text-[#16803a]",
  },
  {
    icon: Award,
    label: "Scholarships",
    desc: "Find funding that fits your path, level, and field.",
    href: "/scholarship",
    accent: "bg-[#fff5df] text-[#b76800]",
  },
  {
    icon: Plane,
    label: "Student Visa",
    desc: "Country-by-country visa guides with official steps.",
    href: "/student-visa",
    accent: "bg-[#eaf0ff] text-[#3157d5]",
  },
  {
    icon: Bot,
    label: "AI Study Navigator",
    desc: "Describe your situation — we'll organize your path.",
    href: "/ai-navigator",
    accent: "bg-slate-100 text-slate-600",
    badge: "AI-assisted",
  },
];

export const educationOptions = [
  {
    value: "bac-high-school",
    title: "BAC / High School",
    description:
      "I have completed secondary school and hold my BAC or equivalent.",
  },
  {
    value: "bachelor-student",
    title: "Bachelor Student",
    description: "I am currently completing my undergraduate degree.",
  },
  {
    value: "bachelor-graduate",
    title: "Bachelor Graduate",
    description: "I have completed my undergraduate degree.",
  },
  {
    value: "master-student",
    title: "Master Student",
    description: "I am currently completing a Master's degree.",
  },
  {
    value: "master-graduate",
    title: "Master Graduate",
    description: "I have completed a Master's degree.",
  },
];

export const degreeOptions = [
  {
    value: "bachelor",
    title: "Bachelor",
    description: "Undergraduate degree program (3–4 years).",
  },
  {
    value: "master",
    title: "Master",
    description: "Postgraduate degree program (1–2 years).",
  },
  {
    value: "phd",
    title: "PhD",
    description: "Doctoral research program (3–5 years).",
  },
  {
    value: "exchange",
    title: "Exchange Program",
    description: "A semester or year abroad at a partner university.",
  },
];

export const fieldOptions = [
  {
    value: "computer-science",
    title: "Computer Science",
    description: "Software, AI, data science, and related fields.",
  },
  {
    value: "engineering",
    title: "Engineering",
    description: "Mechanical, civil, electrical, and other disciplines.",
  },
  {
    value: "business",
    title: "Business",
    description: "Management, finance, marketing, and economics.",
  },
  {
    value: "medicine",
    title: "Medicine",
    description: "Medical and healthcare programs.",
  },
  {
    value: "architecture",
    title: "Architecture",
    description: "Architecture and urban design.",
  },
  {
    value: "sciences",
    title: "Sciences",
    description: "Physics, chemistry, biology, and natural sciences.",
  },
  {
    value: "arts-humanities",
    title: "Arts & Humanities",
    description: "Languages, history, arts, and humanities.",
  },
];

export const destinationOptions = [
  {
    value: "france",
    title: "🇫🇷 France",
    description:
      "Grandes écoles, broad scholarship access, French and English programs.",
  },
  {
    value: "germany",
    title: "🇩🇪 Germany",
    description:
      "Many low-tuition public universities, strong engineering and sciences.",
  },
  {
    value: "italy",
    title: "🇮🇹 Italy",
    description:
      "Broad regional scholarship opportunities, Italian and English programs.",
  },
  {
    value: "canada",
    title: "🇨🇦 Canada",
    description: "World-class universities, English and French programs.",
  },
  {
    value: "turkey",
    title: "🇹🇷 Turkey",
    description: "Türkiye Scholarships, Turkish and English programs.",
  },
  {
    value: "netherlands",
    title: "🇳🇱 Netherlands",
    description:
      "Many English-taught programs, strong international community.",
  },
  {
    value: "not-sure",
    title: "I'm not sure yet",
    description: "Show me suitable countries based on my other choices.",
  },
];

export type StudyPathStepKey =
  | "admission"
  | "documents"
  | "scholarships"
  | "visa";

export type StudyPathStep = {
  key: StudyPathStepKey;
  title: string;
  href: string;
};

export const studyPathSteps: StudyPathStep[] = [
  {
    key: "admission",
    title: "Check admission requirements",
    href: "study-abroad",
  },
  {
    key: "documents",
    title: "Prepare required documents",
    href: "documents",
  },
  {
    key: "scholarships",
    title: "Explore scholarships",
    href: "scholarship",
  },
  {
    key: "visa",
    title: "Prepare your student visa",
    href: "student-visa",
  },
];
export type ResultSummaryKey =
  | "eligibility"
  | "language"
  | "documents"
  | "tuition"
  | "livingCost"
  | "scholarships"
  | "visa";

export const resultSummaryConfig: {
  key: ResultSummaryKey;
  label: string;
  style: string;
}[] = [
  {
    key: "eligibility",
    label: "Eligibility",
    style: "bg-soft-success text-success",
  },
  {
    key: "language",
    label: "Language",
    style: "bg-white text-heading",
  },
  {
    key: "documents",
    label: "Documents",
    style: "bg-white text-heading",
  },
  {
    key: "tuition",
    label: "Est. Tuition",
    style: "bg-white text-heading",
  },
  {
    key: "livingCost",
    label: "Living Cost",
    style: "bg-white text-heading",
  },
  {
    key: "scholarships",
    label: "Scholarships",
    style: "bg-soft-warning text-warning",
  },
  {
    key: "visa",
    label: "Visa",
    style: "bg-soft-blue text-primary",
  },
];

export const resultNextSteps = [
  "Check admission eligibility",
  "Prepare academic documents",
  "Complete the language requirement",
  "Select universities and programs",
  "Apply to universities",
];