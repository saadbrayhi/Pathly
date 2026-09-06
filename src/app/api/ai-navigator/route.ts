import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { parseJsonBody } from "@/server/validation/request";
import { aiNavigatorRequestSchema } from "@/server/validation/aiNavigator";
import { generateAiGuidance } from "@/server/services/aiNavigatorService";

export const POST = withApiHandler(async (request: Request) => {
  const body = await parseJsonBody(request, aiNavigatorRequestSchema);

  const guidance = await generateAiGuidance(body);
  return successResponse(guidance);
});
