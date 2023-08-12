import { lucia } from "lucia";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { dbClient } from "./db/client";
import { nextjs } from "lucia/middleware";
import { env } from "@/env.mjs";

export type Auth = typeof auth;
export const auth = lucia({
  adapter: libsql(dbClient, {
    user: "user",
    session: "user_session",
    key: "user_key",
  }),
  middleware: nextjs(),
  env: env.NODE_ENV === "development" ? "DEV" : "PROD",
  experimental: {
    debugMode: env.NODE_ENV === "development",
  },
  getUserAttributes: (user) => ({
    email: user.email,
    // HACK: we store the user id as a number in the database, but lucia expects a string
    id: user.id as unknown as number,
  }),
});
