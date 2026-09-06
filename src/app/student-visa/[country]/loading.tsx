import Container from "@/components/shared/Container";
import LoadingState from "@/components/shared/states/LoadingState";
import VisaPageBackground from "@/components/student-visa/VisaPageBackground";

export default function Loading() {
  return (
    <main className="warm-page relative min-h-screen overflow-hidden py-10">
      <VisaPageBackground />

      <div className="relative z-10">
        <Container>
          <LoadingState message="Loading visa guide..." />
        </Container>
      </div>
    </main>
  );
}
