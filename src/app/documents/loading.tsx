import Card from "@/components/shared/Card";
import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";
import Skeleton from "@/components/shared/states/Skeleton";

export default function DocumentsLoading() {
  return (
    <main className="warm-page py-10 sm:py-12">
      <Container>
        <LoadingState message="Loading document guidance" className="sr-only" />
        <div>
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-7 h-10 w-72 max-w-full" />
          <Skeleton className="mt-3 h-5 w-130 max-w-full" />
          <Skeleton className="mt-8 h-12 rounded-xl border border-slate-200 bg-white" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <Card key={index} className="h-40 bg-white p-5">
                <Skeleton className="size-10 rounded-xl" />
                <Skeleton className="mt-4 h-4 w-32" />
                <Skeleton className="mt-3 h-3 w-full bg-slate-100" />
                <Skeleton className="mt-2 h-3 w-3/4 bg-slate-100" />
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
