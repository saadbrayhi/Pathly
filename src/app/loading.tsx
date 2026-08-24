import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";

export default function AppLoading() {
  return (
    <main className="warm-page flex-1 py-16">
      <Container>
        <LoadingState message="Loading Pathly..." />
      </Container>
    </main>
  );
}
