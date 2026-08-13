import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Globe2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/search-bar";
import { FeatureCard } from "@/components/home/feature-card";
export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[680px] overflow-hidden bg-blue-50">
        <Image
          src="/images/pathly-hero.jpeg"
          alt="Futuristic global education campus connected by glowing blue paths"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,.50)_0%,rgba(255,255,255,.30)_34%,rgba(255,255,255,.04)_60%,rgba(255,255,255,0)_100%)]" />
        <div className="shell flex min-h-[680px] items-center py-16 lg:py-20">
          <div className="w-full max-w-[650px]">
            <h1 className="display max-w-xl">
              Always know{" "}
              <span className="block text-blue-600">your next step.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-700 sm:text-lg">
              Pathly guides Lebanese students to scholarships, study abroad
              programs, and student visas with a clear plan from start to
              success.
            </p>
            <div className="mt-7">
              <Button href="/find-my-path" className="px-6">
                Start Your Path <ArrowRight size={17} />
              </Button>
              <p className="mt-2 text-xs font-medium text-slate-600">
                It’s free and takes 2 minutes
              </p>
            </div>
            <div className="mt-7 max-w-[620px]">
              <SearchBar placeholder="Search scholarships, programs, universities, countries…" />
            </div>
          </div>
        </div>
      </section>
      <section className="shell py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Start exploring</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">
            One place for the whole journey
          </h2>
          <p className="mt-4 text-slate-500">
            Practical tools and guidance, organized around what you need to do
            next.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={GraduationCap}
            title="Scholarships"
            text="Discover funding matched to your profile and goals."
            href="/scholarships"
          />
          <FeatureCard
            icon={Globe2}
            title="Study abroad"
            text="Compare destinations, programs, and requirements."
            href="/study-abroad"
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Student visa"
            text="Turn complex visa steps into a clear checklist."
            href="/student-visa"
          />
          <FeatureCard
            icon={Compass}
            title="Find my path"
            text="Answer a few questions and get your personal roadmap."
            href="/find-my-path"
          />
        </div>
      </section>
      <section className="shell pb-20">
        <div className="overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-300">
              Need a second opinion?
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Ask your AI Guide.
            </h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Get quick answers about scholarships, documents, destinations, and
              your next best move.
            </p>
          </div>
          <Button
            href="/ai-guide"
            className="mt-7 bg-white text-ink hover:bg-blue-50 lg:mt-0"
          >
            <BookOpen size={17} />
            Start a conversation
          </Button>
        </div>
      </section>
    </>
  );
}
