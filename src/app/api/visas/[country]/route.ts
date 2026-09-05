import { z } from "zod";

import { ApiError } from "@/server/api/errors";
import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getVisaByCountrySlug } from "@/server/services/visaService";
import { visaCountrySlugSchema } from "@/server/validation/visa";

type VisaRouteContext = {
  params: Promise<{
    country: string;
  }>;
};

export const GET = withApiHandler<VisaRouteContext>(
  async (_request, context) => {
    const { country } = await context.params;

    const result = visaCountrySlugSchema.safeParse(country);

    if (!result.success) {
      throw new ApiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Invalid country slug.",
        details: z.flattenError(result.error),
      });
    }

    const visa = await getVisaByCountrySlug(result.data);

    return successResponse(visa);
  },
);
