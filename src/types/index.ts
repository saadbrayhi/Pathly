export type DiscoveryItem = { title:string; subtitle:string; location:string; tags:string[]; deadline?:string; featured?:boolean; image?:string };
export type DiscoveryPageData = { eyebrow:string; title:string; description:string; placeholder:string; filters:{label:string; options:string[]}[]; items:DiscoveryItem[] };
