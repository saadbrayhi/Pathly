import Card from "@/app/components/shared/Card";
import Container from "@/app/components/shared/Container";

export default function DocumentsLoading() {
  return (
    <main className="min-h-screen bg-warm-surface py-10 sm:py-12">
      <Container>
        <div role="status" aria-live="polite" className="animate-pulse">
          <span className="sr-only">Loading document guidance</span>
          <div className="h-4 w-36 rounded bg-slate-200" />
          <div className="mt-7 h-10 w-72 max-w-full rounded bg-slate-200" />
          <div className="mt-3 h-5 w-[520px] max-w-full rounded bg-slate-200" />
          <div className="mt-8 h-12 rounded-xl border border-slate-200 bg-white" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <Card key={index} className="h-40 bg-white p-5">
                <div className="size-10 rounded-xl bg-slate-200" />
                <div className="mt-4 h-4 w-32 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
