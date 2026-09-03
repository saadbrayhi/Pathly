import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseJsonBody } from "@/server/validation/request";
import {
  deleteCountry,
  getCountryBySlug,
  updateCountry,
} from "@/server/services/countryService";
import { updateCountrySchema } from "@/server/validation/country";

type CountryRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const GET = withApiHandler<CountryRouteContext>(
  async (_request, context) => {
    const { slug } = await context.params;

    const country = await getCountryBySlug(slug);

    return successResponse(country);
  },
);

export const PUT = withApiHandler<CountryRouteContext>(
  async (request, context) => {
    const { slug } = await context.params;
    const body = await parseJsonBody(request, updateCountrySchema);
    const country = await updateCountry(slug, body);
    return successResponse(country);
  },
);

export const DELETE = withApiHandler<CountryRouteContext>(
  async (_request, context) => {
    const { slug } = await context.params;
    await deleteCountry(slug);
    return successResponse(null, { status: 200 });
  },
);