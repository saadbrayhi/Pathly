import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseQuery } from "@/server/api/query";
import { searchAll } from "@/server/services/searchService";
import { searchQuerySchema } from "@/server/validation/search";

export const GET = withApiHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const query = parseQuery(searchParams, searchQuerySchema);

  const results = await searchAll(query.q);

  return successResponse(results, {
    meta: {
      count: results.length,
    },
  });
});
