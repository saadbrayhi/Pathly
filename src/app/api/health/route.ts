import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getHealthStatus } from "@/server/services/healthService";

export const GET = withApiHandler(async () => {
  const health = await getHealthStatus();

  return successResponse(health);
});