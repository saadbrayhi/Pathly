import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";

export default function ScholarshipLoading() {
  return (
    <main className="pathly-page py-12 lg:py-16">
      <Container>
        <LoadingState message="Loading scholarships..." />
      </Container>
    </main>
  );
}
