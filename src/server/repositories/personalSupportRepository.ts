import "server-only";

import prisma from "@/lib/prisma";

export type CreatePersonalSupportRecordInput = {
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  educationLevel: string;
  desiredDegree?: string;
  preferredCountryId?: string;
  fieldOfStudy: string;
  helpType: string;
  target: string;
  deadline: string;
  description: string;
};

export function findPreferredCountryId(slug: string) {
  return prisma.country.findUnique({
    where: { slug },
    select: { id: true },
  });
}

export function createPersonalSupportRequestRecord(
  input: CreatePersonalSupportRecordInput,
) {
  return prisma.personalSupportRequest.create({
    data: input,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      currentCountry: true,
      educationLevel: true,
      desiredDegree: true,
      fieldOfStudy: true,
      helpType: true,
      target: true,
      deadline: true,
      description: true,
      status: true,
      createdAt: true,
    },
  });
}
