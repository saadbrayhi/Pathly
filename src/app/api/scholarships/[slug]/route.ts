import { z } from "zod";

import { ApiError } from "@/server/api/errors";
import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseJsonBody } from "@/server/validation/request";
import {
  deleteScholarship,
  getScholarshipBySlug,
  updateScholarship,
} from "@/server/services/scholarshipService";
import {
  scholarshipSlugSchema,
  updateScholarshipSchema,
} from "@/server/validation/scholarship";

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

export const PUT = withApiHandler<ScholarshipRouteContext>(
  async (request, context) => {
    const { slug } = await context.params;
    const body = await parseJsonBody(request, updateScholarshipSchema);
    const scholarship = await updateScholarship(slug, body);
    return successResponse(scholarship);
  },
);

export const DELETE = withApiHandler<ScholarshipRouteContext>(
  async (_request, context) => {
    const { slug } = await context.params;
    await deleteScholarship(slug);
    return successResponse(null, { status: 200 });
  },
);
