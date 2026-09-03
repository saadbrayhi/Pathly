import ScholarshipsAdmin from "@/components/admin/ScholarshipsAdmin";

export default async function ScholarshipsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string | string[] }>;
}) {
  const params = await searchParams;
  return <ScholarshipsAdmin openCreateOnLoad={params.action === "new"} />;
}
