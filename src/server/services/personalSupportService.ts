import "server-only";

import {
  createPersonalSupportRequestRecord,
  findPreferredCountryId,
} from "@/server/repositories/personalSupportRepository";
import {
  getSafeEmailErrorInformation,
  sendSupportNotification,
} from "@/server/services/emailService";
import type { CreatePersonalSupportInput } from "@/server/validation/personalSupport";

export async function createPersonalSupportRequest(
  input: CreatePersonalSupportInput,
) {
  const preferredCountry =
    input.preferredCountry && input.preferredCountry !== "not-sure"
      ? await findPreferredCountryId(input.preferredCountry)
      : null;

  const supportRequest = await createPersonalSupportRequestRecord({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone ?? "",
    currentCountry: input.currentCountry,
    educationLevel: input.educationLevel,
    desiredDegree: input.desiredDegree || undefined,
    preferredCountryId: preferredCountry?.id,
    fieldOfStudy: input.fieldOfStudy,
    helpType: input.helpType,
    target: input.target,
    deadline: input.deadline,
    description: input.description,
  });

  try {
    await sendSupportNotification(supportRequest);
  } catch (error) {
    console.error(
      "Support notification email failed",
      getSafeEmailErrorInformation(error),
    );
  }

  return {
    id: supportRequest.id,
    status: supportRequest.status,
  };
}
