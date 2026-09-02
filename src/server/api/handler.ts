import { ApiError } from "@/server/api/errors";
import { errorResponse } from "@/server/api/response";

type ApiHandler<TContext = unknown> = (
  request: Request,
  context: TContext,
) => Response | Promise<Response>;

export function handleApiError(error: unknown): Response {
  if (error instanceof ApiError) {
    return errorResponse(error.code, error.message, {
      status: error.status,
      details: error.details,
    });
  }

  console.error("Unhandled API error:", error);

  return errorResponse(
    "INTERNAL_ERROR",
    "Something went wrong. Please try again.",
    {
      status: 500,
    },
  );
}

export function withApiHandler<TContext = unknown>(
  handler: ApiHandler<TContext>,
): ApiHandler<TContext> {
  return async (
    request: Request,
    context: TContext,
  ): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}