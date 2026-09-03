import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getDocuments } from "@/server/services/documentService";

export const GET = withApiHandler(async () => {
  const documents = await getDocuments();

  return successResponse(documents, {
    meta: {
      count: documents.length,
    },
  });
});