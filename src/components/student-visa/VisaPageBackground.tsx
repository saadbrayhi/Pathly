export default function VisaPageBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Top-left dots */}
      <div className="absolute left-14 top-8 grid grid-cols-5 gap-3 opacity-30">
        {Array.from({ length: 20 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      {/* Top-right circles */}
      <div className="absolute -right-32 -top-28 h-107.5 w-107.5 rounded-full border border-slate-200/60" />
      <div className="absolute -right-20 -top-16 h-82 w-82 rounded-full border border-slate-200/50" />
      <div className="absolute -right-5 top-1 h-55 w-55 rounded-full border border-slate-200/40" />

      {/* Bottom-left soft shape */}
      <div className="absolute -bottom-28 -left-40 h-90 w-90 rounded-full bg-slate-100/70" />

      {/* Bottom-right circles */}
      <div className="absolute -bottom-28 -right-32 h-97.5 w-97.5 rounded-full border border-slate-200/50" />
      <div className="absolute -bottom-16 -right-20 h-72.5 w-72.5 rounded-full border border-slate-200/40" />

      {/* Bottom-right dots */}
      <div className="absolute bottom-20 right-16 grid grid-cols-4 gap-3 opacity-25">
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-accent" />
        ))}
      </div>
    </div>
  );
}
