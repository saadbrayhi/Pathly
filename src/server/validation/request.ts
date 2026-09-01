import { z } from "zod";
import { ApiError } from "@/server/api/errors";

export async function parseJsonBody<TSchema extends z.ZodType>(
  request: Request,
  schema: TSchema,
): Promise<z.output<TSchema>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new ApiError({
      status: 400,
      code: "BAD_REQUEST",
      message: "The request body must contain valid JSON.",
    });
  }

  const result = await schema.safeParseAsync(body);

  if (!result.success) {
    const { formErrors, fieldErrors } = z.flattenError(
      result.error,
    );

    throw new ApiError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Please check the submitted fields.",
      details: {
        formErrors,
        fieldErrors,
      },
    });
  }

  return result.data;
}