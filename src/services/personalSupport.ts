import type { SupportRequestValues } from "../app/data/personalSupport";

export type PersonalSupportRequestPayload = SupportRequestValues & {
  submittedAt: string;
  source: "personal-support-page";
};

export type PersonalSupportResponse = {
  requestId: string;
  receivedAt: string;
};

export async function submitPersonalSupportRequest(
  values: SupportRequestValues,
): Promise<PersonalSupportResponse> {
  const payload: PersonalSupportRequestPayload = {
    ...values,
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    currentCountry: values.currentCountry.trim(),
    fieldOfStudy: values.fieldOfStudy.trim(),
    target: values.target.trim(),
    deadline: values.deadline.trim(),
    description: values.description.trim(),
    submittedAt: new Date().toISOString(),
    source: "personal-support-page",
  };

  // Replace this mock delay and response with a POST request when the API is ready.
  await new Promise<void>((resolve) => window.setTimeout(resolve, 700));

  return {
    requestId: `support-${Date.now()}`,
    receivedAt: payload.submittedAt,
  };
}
