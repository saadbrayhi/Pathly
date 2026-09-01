import { z } from "zod";

import { ApiError } from "@/server/api/errors";

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20),
});

export type PaginationParams = {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export function parsePagination(
  searchParams: URLSearchParams,
): PaginationParams {
  const result = paginationSchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    pageSize: searchParams.get("pageSize") ?? undefined,
  });

  if (!result.success) {
    const { fieldErrors } = z.flattenError(result.error);

    throw new ApiError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "Invalid pagination parameters.",
      details: {
        fieldErrors,
      },
    });
  }

  const { page, pageSize } = result.data;

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}

export function createPaginationMeta(
  page: number,
  pageSize: number,
  total: number,
): PaginationMeta {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}