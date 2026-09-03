import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getDocumentBySlug } from "@/server/services/documentService";

type DocumentRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export const GET =
  withApiHandler<DocumentRouteContext>(
    async (_request, context) => {
      const { slug } = await context.params;

      const document = await getDocumentBySlug(slug);

      return successResponse(document);
    },
  );