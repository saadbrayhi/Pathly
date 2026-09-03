import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseQuery } from "@/server/api/query";
import { getCountries } from "@/server/services/countryService";
import { countryListQuerySchema } from "@/server/validation/country";

export const GET = withApiHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = parseQuery(
    searchParams,
    countryListQuerySchema,
  );

  const countries = await getCountries(query);

  return successResponse(countries);
});
