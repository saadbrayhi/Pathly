import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseQuery } from "@/server/api/query";
import { parseJsonBody } from "@/server/validation/request";
import {
  createCountry,
  getCountries,
} from "@/server/services/countryService";
import { countryListQuerySchema, createCountrySchema } from "@/server/validation/country";

export const GET = withApiHandler(async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = parseQuery(
    searchParams,
    countryListQuerySchema,
  );

  const countries = await getCountries(query);

  return successResponse(countries);
});

export const POST = withApiHandler(async (request: Request) => {
  const body = await parseJsonBody(request, createCountrySchema);
  const country = await createCountry(body);
  return successResponse(country, { status: 201 });
});
