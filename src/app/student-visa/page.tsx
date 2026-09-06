import Container from "@/components/shared/Container";
import VisaHero from "@/components/student-visa/VisaHero";
import VisaCountryList from "@/components/student-visa/VisaCountryList";
import { getVisas } from "@/server/services/visaService";

export default async function StudentVisaPage() {
  const visaRecords = await getVisas();
  const visas = visaRecords.map((visa) => ({
    ...visa,
    visaLastReviewedAt: visa.visaLastReviewedAt?.toISOString() ?? null,
  }));

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
