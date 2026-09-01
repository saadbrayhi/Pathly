import { z } from "zod";

import { ApiError } from "@/server/api/errors";

function queryParamsToObject(
  searchParams: URLSearchParams,
): Record<string, string | string[]> {
  const query: Record<string, string | string[]> = {};

  for (const [key, value] of searchParams.entries()) {
    const currentValue = query[key];

    if (currentValue === undefined) {
      query[key] = value;
    } else if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else {
      query[key] = [currentValue, value];
    }
  }

  return query;
}

export function parseQuery<TSchema extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: TSchema,
): z.output<TSchema> {
  const query = queryParamsToObject(searchParams);
  const result = schema.safeParse(query);

  if (!result.success) {
    const { formErrors, fieldErrors } = z.flattenError(
      result.error,
    );

    throw new ApiError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Invalid query parameters.",
      details: {
        formErrors,
        fieldErrors,
      },
    });
  }

  return result.data;
}