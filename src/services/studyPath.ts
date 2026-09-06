import axios from "axios";

import { api } from "@/lib/axios";
import type {
  StudyPathRequestPayload,
  StudyPathResult,
} from "@/interfaces/studyPath";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export const STUDY_PATH_RESULT_STORAGE_KEY = "pathly:study-path-result";

export async function createStudyPath(
  payload: StudyPathRequestPayload,
): Promise<StudyPathResult> {
  const response = await api.post<ApiSuccess<StudyPathResult>>(
    "/study-path",
    payload,
  );

  return response.data.data;
}

export function getStudyPathErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiFailure>(error)) {
    return (
      error.response?.data?.error?.message ??
      (error.response
        ? "We could not generate this study path."
        : "Unable to reach the server. Check your connection and try again.")
    );
  }

  return error instanceof Error
    ? error.message
    : "We could not generate this study path.";
}
