import "server-only";

import prisma from "@/lib/prisma";

export async function checkDatabaseConnection(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}