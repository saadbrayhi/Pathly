import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { generateStudyPath } from "@/server/services/studyPathService";
import { createStudyPathSchema } from "@/server/validation/studyPath";
import { parseJsonBody } from "@/server/validation/request";

export const POST = withApiHandler(async (request) => {
  const input = await parseJsonBody(request, createStudyPathSchema);
  const result = await generateStudyPath(input);

  return successResponse(result, { status: 201 });
});
  
