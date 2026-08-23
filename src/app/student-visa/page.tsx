import Container from "@/components/shared/Container";
import VisaHero from "@/components/student-visa/VisaHero";
import VisaCountryList from "@/components/student-visa/VisaCountryList";

export default function StudentVisaPage() {
  return (
    <main className="warm-page py-8">
      <Container>
        <div className="mx-auto max-w-280">
          <VisaHero />
          <VisaCountryList />
        </div>
      </Container>
    </main>
  );
}
