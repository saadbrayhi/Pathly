import "server-only";

import type { SupportRequestStatus } from "@/generated/prisma/enums";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "Pathly <onboarding@resend.dev>";

export type SupportNotificationRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  educationLevel: string;
  desiredDegree: string | null;
  fieldOfStudy: string | null;
  helpType: string;
  target: string | null;
  deadline: string | null;
  description: string;
  status: SupportRequestStatus;
  createdAt: Date;
};

class EmailServiceError extends Error {
  readonly providerStatus?: number;

  constructor(message: string, providerStatus?: number) {
    super(message);
    this.name = "EmailServiceError";
    this.providerStatus = providerStatus;
  }
}

export function getSafeEmailErrorInformation(error: unknown) {
  return {
    errorName: error instanceof Error ? error.name : "UnknownError",
    providerStatus:
      error instanceof EmailServiceError ? error.providerStatus : undefined,
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function displayValue(value: string | null | undefined): string {
  return value && value.trim() ? value : "Not provided";
}

function buildTextEmail(request: SupportNotificationRequest): string {
  return [
    "A new Personal Support request was submitted to Pathly.",
    "",
    `Request ID: ${request.id}`,
    `Full name: ${request.fullName}`,
    `Email: ${request.email}`,
    `Phone: ${displayValue(request.phone)}`,
    `Current country: ${request.currentCountry}`,
    `Education level: ${request.educationLevel}`,
    `Desired degree: ${displayValue(request.desiredDegree)}`,
    `Study field: ${displayValue(request.fieldOfStudy)}`,
    `Help type: ${request.helpType}`,
    `Target: ${displayValue(request.target)}`,
    `Deadline: ${displayValue(request.deadline)}`,
    `Status: ${request.status}`,
    `Created at: ${request.createdAt.toISOString()}`,
    "",
    "Description:",
    request.description,
  ].join("\n");
}

function buildHtmlEmail(request: SupportNotificationRequest): string {
  const rows = [
    ["Request ID", request.id],
    ["Full name", request.fullName],
    ["Email", request.email],
    ["Phone", displayValue(request.phone)],
    ["Current country", request.currentCountry],
    ["Education level", request.educationLevel],
    ["Desired degree", displayValue(request.desiredDegree)],
    ["Study field", displayValue(request.fieldOfStudy)],
    ["Help type", request.helpType],
    ["Target", displayValue(request.target)],
    ["Deadline", displayValue(request.deadline)],
    ["Status", request.status],
    ["Created at", request.createdAt.toISOString()],
  ]
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#f8fafc;border:1px solid #e2e8f0">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.5">
      <h1 style="font-size:20px">New Pathly Personal Support Request</h1>
      <p>A new Personal Support request was submitted to Pathly.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px"><tbody>${rows}</tbody></table>
      <h2 style="font-size:16px;margin-top:24px">Description</h2>
      <p style="white-space:pre-wrap">${escapeHtml(request.description)}</p>
    </div>
  `.trim();
}

export async function sendSupportNotification(
  request: SupportNotificationRequest,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const notificationEmail = process.env.SUPPORT_NOTIFICATION_EMAIL?.trim();
  const fromEmail =
    process.env.SUPPORT_NOTIFICATION_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  if (!apiKey || !notificationEmail) {
    throw new EmailServiceError("Support email configuration is incomplete");
  }

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      reply_to: request.email,
      subject: "New Pathly Personal Support Request",
      text: buildTextEmail(request),
      html: buildHtmlEmail(request),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new EmailServiceError(
      `Support email provider returned status ${response.status}`,
      response.status,
    );
  }
}
