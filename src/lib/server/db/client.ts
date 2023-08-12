import { env } from "@/env.mjs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "@/lib/server/db/schema";

export const dbClient = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(dbClient, { schema });

export * from "@/lib/server/db/schema";
