import { api } from "@/lib/axios";

import type { SupportRequestValues } from "@/data/personalSupport";

export type PersonalSupportResponse = {
  id: string;
  status: "NEW";
};

type ApiSuccess<T> = {
  success: true;
  data: T;
};

export async function submitPersonalSupportRequest(
  values: SupportRequestValues,
): Promise<PersonalSupportResponse> {
  const payload: SupportRequestValues = {
    ...values,
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    currentCountry: values.currentCountry.trim(),
    fieldOfStudy: values.fieldOfStudy.trim(),
    target: values.target.trim(),
    deadline: values.deadline.trim(),
    description: values.description.trim(),
  };

  const response = await api.post<ApiSuccess<PersonalSupportResponse>>(
    "/personal-support",
    payload,
  );

  return response.data.data;
}
