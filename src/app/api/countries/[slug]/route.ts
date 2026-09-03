import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getCountryBySlug } from "@/server/services/countryService";

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