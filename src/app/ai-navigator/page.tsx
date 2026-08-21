import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

import Container from "@/app/components/shared/Container";

import AINavigator from "./AINavigator";

export default function AINavigatorPage() {
  return (
    <main className="min-h-screen bg-[#fafaf7] py-10 sm:py-14">
      <Container className="max-w-5xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-slate-500 transition-colors hover:text-[#3157d5]"
          >
            Home
          </Link>
          <ChevronRight aria-hidden="true" size={15} className="text-slate-400" />
          <span aria-current="page" className="font-medium text-slate-800">
            AI Study Navigator
          </span>
        </nav>

        <header className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
            <Sparkles aria-hidden="true" size={13} />
            AI-assisted guidance
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            Describe your study goal. We&apos;ll help organize the path.
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500 sm:text-lg">
            Tell us your situation and we&apos;ll generate a structured study-abroad
            overview for you to explore and verify.
          </p>
        </header>

        <AINavigator />
      </Container>
    </main>
  );
}
