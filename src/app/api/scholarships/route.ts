import { withApiHandler } from "@/server/api/handler";
import { parseQuery } from "@/server/api/query";
import { successResponse } from "@/server/api/response";
import { getScholarships } from "@/server/services/scholarshipService";
import { scholarshipQuerySchema } from "@/server/validation/scholarship";

export const GET = withApiHandler(async (request) => {
  const url = new URL(request.url);

  const filters = parseQuery(url.searchParams, scholarshipQuerySchema);

  const scholarships = await getScholarships(filters);

  return successResponse(scholarships);
});
