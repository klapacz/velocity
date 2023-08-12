// import { env } from "@/env.mjs";
// import { createClient } from "@libsql/client";
//
// const db = createClient({
//   url: env.DATABASE_URL,
//   authToken: env.DATABASE_AUTH_TOKEN,
// });
//

import { sqliteTable, text, blob, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  // other user attributes
});

export const session = sqliteTable("user_session", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => user.id),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
