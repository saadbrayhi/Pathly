import axios from "axios";

type ApiErrorBody = {
  message?: string;
  error?: {
    message?: string;
  };
};

export function getAdminApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return (
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      (error.response ? fallback : "Unable to reach the server. Try again.")
    );
  }

  return error instanceof Error ? error.message : fallback;
}
