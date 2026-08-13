import Link from "next/link";

export function Logo({light=false}:{light?:boolean}){
  const gradientId=light?"pathly-mark-light":"pathly-mark";
  return <Link href="/" className="flex items-center gap-2" aria-label="Pathly home">
    <svg aria-hidden="true" viewBox="0 0 32 36" className="h-9 w-8 shrink-0 overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="3" x2="25" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor={light?"#69A8FF":"#3388FF"}/><stop offset="1" stopColor={light?"#2675EE":"#0759DA"}/>
        </linearGradient>
        <filter id={`${gradientId}-shadow`} x="-30%" y="-25%" width="160%" height="165%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.7" floodColor="#0759DA" floodOpacity={light?"0":".18"}/>
        </filter>
        <clipPath id={`${gradientId}-clip`}><path d="M6.3 3.5h11.2c6.7 0 10.7 3.8 10.7 9.5 0 6.2-4.6 10-11.7 10h-4.2v5.2a4.2 4.2 0 0 1-8.4 0V18.9c0-2.2 1.8-4 4-4h8.8c2.1 0 3.2-.7 3.2-2.2 0-1.3-1.1-2-3.1-2H6.3a3.6 3.6 0 1 1 0-7.2Z"/></clipPath>
      </defs>
      <path filter={`url(#${gradientId}-shadow)`} fill={`url(#${gradientId})`} d="M6.3 3.5h11.2c6.7 0 10.7 3.8 10.7 9.5 0 6.2-4.6 10-11.7 10h-4.2v5.2a4.2 4.2 0 0 1-8.4 0V18.9c0-2.2 1.8-4 4-4h8.8c2.1 0 3.2-.7 3.2-2.2 0-1.3-1.1-2-3.1-2H6.3a3.6 3.6 0 1 1 0-7.2Z"/>
      <g clipPath={`url(#${gradientId}-clip)`} fill="none" stroke="white" strokeLinecap="round" opacity=".82">
        <path d="M8.1 31V20.2c0-1 .8-1.8 1.8-1.8h6.7c4.7 0 7.5-2.1 7.5-5.6 0-3.4-2.6-5.2-6.8-5.2H7" strokeWidth="1.15" strokeDasharray="2.4 2.7"/>
      </g>
      <circle cx="8.1" cy="33" r="2" fill={light?"#69A8FF":"#0759DA"}/>
    </svg>
    <span className={`text-xl font-bold tracking-[-.045em] ${light?"text-white":"text-ink"}`}>Pathly</span>
  </Link>
}
