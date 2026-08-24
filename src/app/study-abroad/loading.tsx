import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";

export default function StudyAbroadLoading() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <Container>
        <LoadingState message="Loading study destinations..." />
      </Container>
    </main>
  );
}
