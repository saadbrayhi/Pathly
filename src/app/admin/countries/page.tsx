import CountriesAdmin from "@/components/admin/CountriesAdmin";

export default async function CountriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string | string[] }>;
}) {
  const params = await searchParams;
  return <CountriesAdmin openCreateOnLoad={params.action === "new"} />;
}
