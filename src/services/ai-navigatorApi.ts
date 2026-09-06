import { api } from "@/lib/axios";

import type {
  AINavigatorGuidance,
  AINavigatorRequest,
} from "@/interfaces/aiNavigator";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

export async function fetchAiGuidance(
  payload: AINavigatorRequest,
): Promise<AINavigatorGuidance> {
  const response = await api.post<ApiSuccess<AINavigatorGuidance>>(
    "/ai-navigator",
    payload,
  );

  return response.data.data;
}
