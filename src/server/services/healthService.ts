import "server-only";

import { checkDatabaseConnection } from "@/server/repositories/healthRepository";

export type HealthStatus = {
  status: "ok";
  database: "connected";
};

export async function getHealthStatus(): Promise<HealthStatus> {
  await checkDatabaseConnection();

  return {
    status: "ok",
    database: "connected",
  };
}