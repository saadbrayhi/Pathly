import { z } from "zod";

import { ApiError } from "@/server/api/errors";
import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getScholarshipBySlug } from "@/server/services/scholarshipService";
import { scholarshipSlugSchema } from "@/server/validation/scholarship";

type ScholarshipRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const GET = withApiHandler<ScholarshipRouteContext>(
  async (_request, context) => {
    const { slug } = await context.params;

    const result = scholarshipSlugSchema.safeParse(slug);

    if (!result.success) {
      throw new ApiError({
        status: 400,
        code: "VALIDATION_ERROR",
        message: "Invalid scholarship slug.",
        details: z.flattenError(result.error),
      });
    }

    const scholarship = await getScholarshipBySlug(result.data);

    return successResponse(scholarship);
  },
);
