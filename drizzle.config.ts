import type { Config } from "drizzle-kit";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();
const env = z
  .object({
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().min(1),
  })
  .parse(process.env);

export default {
  schema: "./src/lib/server/db/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
