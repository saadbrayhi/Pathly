export type StudyLevel = "Bachelor" | "Master" | "PhD";

export type Country = {
  slug: string;
  name: string;
  flag: string;
  image: string;
  languages: string[];
  levels: StudyLevel[];
};

export const countries: Country[] = [
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    image: "/images/home/destinations/france.jpg",
    languages: ["French", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    image: "/images/home/destinations/germany.jpg",
    languages: ["German", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    image: "/images/home/destinations/italy.jpg",
    languages: ["Italian", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    image: "/images/home/destinations/canada.jpg",
    languages: ["English", "French"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    image: "/images/home/destinations/turkey.jpg",
    languages: ["Turkish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    image: "/images/home/destinations/netherlands.jpg",
    languages: ["Dutch", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
  {
    slug: "spain",
    name: "Spain",
    flag: "🇪🇸",
    image: "/images/home/destinations/spain.jpg",
    languages: ["Spanish", "English"],
    levels: ["Bachelor", "Master", "PhD"],
  },
];