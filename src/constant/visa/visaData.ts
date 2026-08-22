export type VisaCountry = {
  slug: string;
  name: string;
  flag: string;
  image: string;
  description: string;
  visaType: string;
  processingTime: string;
};
export const visaCountries: VisaCountry[] = [
  {
    slug: "france",
    name: "France",
    flag: "🇫🇷",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&auto=format&fit=crop&q=80",
    description:
      "Review the long-stay student visa process, required documents, financial proof, and official sources.",
    visaType: "Long-Stay Student Visa (VLS-TS)",
    processingTime: "3–8 weeks (estimate — varies)",
  },
  {
    slug: "germany",
    name: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&auto=format&fit=crop&q=80",
    description:
      "Understand the German student visa process, blocked-account requirements, documents, and application steps.",
    visaType: "National Visa (Student)",
    processingTime: "4–12 weeks (estimate — varies)",
  },
  {
    slug: "italy",
    name: "Italy",
    flag: "🇮🇹",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&auto=format&fit=crop&q=80",
    description:
      "Prepare for the Italian study visa process, including financial proof, accommodation, and enrollment documents.",
    visaType: "Type D Student Visa",
    processingTime: "3–8 weeks (estimate — varies)",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&auto=format&fit=crop&q=80",
    description:
      "Review study permit requirements, proof of funds, required documents, and application guidance.",
    visaType: "Study Permit",
    processingTime: "8–16 weeks (estimate — varies)",
  },
  {
    slug: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&auto=format&fit=crop&q=80",
    description:
      "Review the student visa and residence preparation process before studying in Turkey.",
    visaType: "Student Visa",
    processingTime: "2–6 weeks (estimate — varies)",
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    flag: "🇳🇱",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=900&auto=format&fit=crop&q=80",
    description:
      "Understand entry visa and residence permit requirements for international students.",
    visaType: "MVV + Residence Permit",
    processingTime: "2–4 weeks after enrollment (estimate)",
  },
];
