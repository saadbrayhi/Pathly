import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { createPersonalSupportRequest } from "@/server/services/personalSupportService";
import { createPersonalSupportSchema } from "@/server/validation/personalSupport";
import { parseJsonBody } from "@/server/validation/request";

export const POST = withApiHandler(async (request: Request) => {
  const body = await parseJsonBody(request, createPersonalSupportSchema);
  const supportRequest = await createPersonalSupportRequest(body);

  return successResponse(supportRequest, { status: 201 });
});
