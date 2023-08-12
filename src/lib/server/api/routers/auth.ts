import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";
import { db, key, user } from "@/lib/server/db/client";
import { generateLuciaPasswordHash } from "lucia/utils";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email().trim().toLowerCase(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: handle duplicated email
      const result = await db.transaction(async (tx) => {
        const createdUser = await tx
          .insert(user)
          .values({
            email: input.email,
          })
          .returning({
            id: user.id,
          })
          .get();

        const hashedPassword = await generateLuciaPasswordHash(input.password);

        const createdKey = await tx
          .insert(key)
          .values({
            id: `email:${input.email}`,
            userId: createdUser.id,
            hashedPassword,
          })
          .returning({
            id: key.id,
            userId: key.userId,
            hashedPassword: key.hashedPassword,
          })
          .get();
      });
      return {
        greeting: JSON.stringify("Hello, world!"),
      };
    }),
});
