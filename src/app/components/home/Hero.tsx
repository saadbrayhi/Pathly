"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [pathAnimated, setPathAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPathAnimated(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const pathSteps = [
    {
      cx: 50,
      cy: 260,
      label: "Your Level",
      color: "#64748b",
      delay: 0,
    },
    {
      cx: 95,
      cy: 205,
      label: "Admission",
      color: "#3157d5",
      delay: 0.15,
    },
    {
      cx: 140,
      cy: 155,
      label: "Documents",
      color: "#3157d5",
      delay: 0.3,
    },
    {
      cx: 185,
      cy: 110,
      label: "Scholarship",
      color: "#0f9f8f",
      delay: 0.5,
    },
    {
      cx: 230,
      cy: 70,
      label: "Visa",
      color: "#0f9f8f",
      delay: 0.7,
    },
  ];

  const destinations = [
    {
      cx: 255,
      cy: 45,
      label: "🇫🇷 France",
      delay: 0.85,
    },
    {
      cx: 262,
      cy: 72,
      label: "🇩🇪 Germany",
      delay: 1,
    },
    {
      cx: 250,
      cy: 100,
      label: "🇮🇹 Italy",
      delay: 1.1,
    },
  ];

  const checklist = [
    "Admission eligibility",
    "Required documents",
    "Scholarships",
    "Student visa",
  ];

  return (
    <section className="bg-gradient-to-br from-[#e8eef7] via-[#eef3f8] to-[#e3ebf6]">
      <div className="mx-auto min-h-[680px] max-w-[1200px] px-6 pt-16 pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c2d3ff] bg-[#eaf0ff] px-3 py-1.5 text-xs font-semibold text-[#3157d5]">
              <span className="text-[#3157d5]">◉</span>
              Your study-abroad journey, made clear
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-[1.12] text-[#0f172a] md:text-5xl xl:text-6xl">
              Know every step
              <br />
              <span className="text-[#3157d5]">before you apply.</span>
            </h1>

            <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-600">
              Understand the right study path for your education level,
              destination, field, documents, scholarships, costs, deadlines, and
              student visa.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/find-my-path"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3157d5] px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#2647b8]"
              >
                Find My Study Path
                <span>→</span>
              </Link>

              <Link
                href="/study-abroad"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore Countries
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="text-[#0f9f8f]">✓</span>
              Guidance connected to official university, government, and embassy
              sources.
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="w-full max-w-sm">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Your study path
                </p>

                <svg
                  viewBox="0 0 280 300"
                  className="w-full"
                  style={{ maxHeight: 300 }}
                >
                  {/* Main path */}
                  <path
                    d="M 50 260 C 80 230 100 180 140 150 C 175 125 195 100 230 70"
                    fill="none"
                    stroke="#3157d5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset={pathAnimated ? 0 : 400}
                    style={{
                      transition:
                        "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />

                  {/* France */}
                  <path
                    d="M 230 70 L 255 45"
                    fill="none"
                    stroke="#3157d5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset={pathAnimated ? 0 : 60}
                    style={{
                      transition:
                        "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s",
                    }}
                  />

                  {/* Germany */}
                  <path
                    d="M 230 70 L 258 72"
                    fill="none"
                    stroke="#0f9f8f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset={pathAnimated ? 0 : 60}
                    style={{
                      transition:
                        "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s",
                    }}
                  />

                  {/* Italy */}
                  <path
                    d="M 230 70 L 250 100"
                    fill="none"
                    stroke="#3157d5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="60"
                    strokeDashoffset={pathAnimated ? 0 : 60}
                    style={{
                      transition:
                        "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s",
                    }}
                  />

                  {/* Journey dots */}
                  {pathSteps.map((dot, index) => (
                    <g
                      key={dot.label}
                      style={{
                        opacity: pathAnimated ? 1 : 0,
                        transition: `opacity 0.3s ease ${dot.delay + 0.4}s`,
                      }}
                    >
                      <circle
                        cx={dot.cx}
                        cy={dot.cy}
                        r={index === 0 ? 8 : 6}
                        fill={dot.color}
                      />

                      <circle
                        cx={dot.cx}
                        cy={dot.cy}
                        r={index === 0 ? 14 : 11}
                        fill={dot.color}
                        opacity="0.15"
                      />

                      <text
                        x={dot.cx - 30}
                        y={dot.cy + 22}
                        fontSize="9"
                        fill="#64748b"
                      >
                        {dot.label}
                      </text>
                    </g>
                  ))}

                  {/* Destination nodes */}
                  {destinations.map((destination) => (
                    <g
                      key={destination.label}
                      style={{
                        opacity: pathAnimated ? 1 : 0,
                        transition: `opacity 0.3s ease ${destination.delay}s`,
                      }}
                    >
                      <circle
                        cx={destination.cx}
                        cy={destination.cy}
                        r="5"
                        fill="#ffffff"
                        stroke="#3157d5"
                        strokeWidth="1.5"
                      />

                      <text
                        x={destination.cx + 9}
                        y={destination.cy + 4}
                        fontSize="9"
                        fill="#334155"
                      >
                        {destination.label}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="mt-2 space-y-1.5">
                  {checklist.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c2d3ff] bg-[#eaf0ff] text-[9px] text-[#3157d5]">
                        ✓
                      </div>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
