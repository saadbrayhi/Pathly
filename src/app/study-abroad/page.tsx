import { Globe2 } from "lucide-react";

import Badge from "@/app/components/shared/Badge";
import Container from "@/app/components/shared/Container";

import CountryExplorer from "./CountryExplorer";

export default function StudyAbroadPage() {
  return (
    <main className="flex-1 bg-warm-surface">
      <section className="hero-gradient border-b border-slate-200 py-16 sm:py-20">
        <Container>
          <Badge variant="primary" className="gap-2">
            <Globe2 size={14} aria-hidden="true" />
            Country guides
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-heading sm:text-5xl">
            Find the right country for your study goals
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Compare destinations, study levels, languages, scholarships, and
            visa guidance in one clear place.
          </p>
        </Container>
      </section>

      <Container>
        <CountryExplorer />
      </Container>
    </main>
  );
}