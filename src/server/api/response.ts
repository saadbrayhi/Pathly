export type ApiSuccess<TData, TMeta = unknown> = {
  success: true;
  data: TData;
  meta?: TMeta;
};

export type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<TData, TMeta = unknown> =
  | ApiSuccess<TData, TMeta>
  | ApiFailure;

type SuccessResponseOptions<TMeta> = {
  status?: number;
  headers?: HeadersInit;
  meta?: TMeta;
};

type ErrorResponseOptions = {
  status?: number;
  headers?: HeadersInit;
  details?: unknown;
};

export function successResponse<TData, TMeta = unknown>(
  data: TData,
  options: SuccessResponseOptions<TMeta> = {},
): Response {
  const { status = 200, headers, meta } = options;

  const body: ApiSuccess<TData, TMeta> =
    meta === undefined
      ? { success: true, data }
      : { success: true, data, meta };

  return Response.json(body, { status, headers });
}

export function errorResponse(
  code: string,
  message: string,
  options: ErrorResponseOptions = {},
): Response {
  const { status = 500, headers, details } = options;

  const body: ApiFailure = {
    success: false,
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details }),
    },
  };

  return Response.json(body, { status, headers });
}