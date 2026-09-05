import { withApiHandler } from "@/server/api/handler";
import { successResponse } from "@/server/api/response";
import { getVisas } from "@/server/services/visaService";

export const GET = withApiHandler(async () => {
  const visas = await getVisas();

  return successResponse(visas, {
    meta: {
      count: visas.length,
    },
  });
});
