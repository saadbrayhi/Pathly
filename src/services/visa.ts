import { axiosGet } from "@/lib/axios";


export type VisaApiItem = {
  id: string;
  name: string;
  slug: string;
  flag: string | null;
  image: string | null;

  visaType: string | null;
  visaSummary: string | null;
  visaDescription: string | null;
  visaProcessingTime: string | null;
  visaAppointment: string | null;
  visaEstimatedFee: string | null;
  visaFinancialProof: string | null;
  visaWarning: string | null;
  visaLastReviewedAt: string | null;
  visaOfficialSourceLabel: string | null;
  visaOfficialSourceUrl: string | null;

  visaDocuments: string[];
  visaSteps: string[];
  visaCommonMistakes: string[];
};


export async function fetchVisas(): Promise<VisaApiItem[]> {
  const response = await axiosGet<VisaApiItem[]>("visas");

  return response.data ?? [];
}

export async function fetchVisaByCountry(
  country: string,
): Promise<VisaApiItem | null> {
  const response = await axiosGet<VisaApiItem>(`visas/${country}`);

  return response.data ?? null;
}
