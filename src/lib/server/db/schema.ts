import { type InferModel, relations } from "drizzle-orm";
import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export type User = InferModel<typeof user>;
export type UserAttributes = Omit<User, "id">;
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  keys: many(key),
}));

export type Session = InferModel<typeof session>;
export type SessionAttributes = Omit<
  Session,
  "id" | "userId" | "activeExpires" | "idleExpires"
>;
export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),

  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});
export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export type Key = InferModel<typeof key>;
export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  hashedPassword: text("hashed_password"),
});
export const keyRelations = relations(key, ({ one }) => ({
  user: one(user, {
    fields: [key.userId],
    references: [user.id],
  }),
}));
