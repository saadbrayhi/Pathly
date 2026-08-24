import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";

export default function SearchLoading() {
  return (
    <main className="warm-page py-10 sm:py-14">
      <Container className="max-w-225">
        <LoadingState message="Searching Pathly..." />
      </Container>
    </main>
  );
}
