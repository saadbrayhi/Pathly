import Image from "next/image";

export function HeroBackdrop({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <Image
        src="/images/pathly-hero.jpeg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        className={`absolute inset-0 -z-10 ${dark ? "bg-ink/80" : "bg-gradient-to-r from-white/60 via-white/55 to-white/20"}`}
      />
    </>
  );
}
