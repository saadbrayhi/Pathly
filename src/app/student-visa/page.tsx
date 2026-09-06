import Container from "@/components/shared/Container";
import VisaHero from "@/components/student-visa/VisaHero";
import VisaCountryList from "@/components/student-visa/VisaCountryList";
import { fetchVisas } from "@/services/visa";

export default async function StudentVisaPage() {
  const visas = await fetchVisas();

  return (
    <main className="warm-page py-8">
      <Container>
        <div className="mx-auto max-w-280">
          <VisaHero />
          <VisaCountryList visas={visas} />
        </div>
      </Container>
    </main>
  );
}
