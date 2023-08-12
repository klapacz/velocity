import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/lib/server/api/trpc";
import { auth } from "@/lib/server/auth/lucia";

const credentialsSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8),
});

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(credentialsSchema)
    .mutation(async ({ input }) => {
      const user = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: input.email,
          password: input.password,
        },
        attributes: {
          email: input.email,
        },
      });

      return {
        greeting: JSON.stringify("Hello, world!"),
      };
    }),
  login: publicProcedure
    .input(credentialsSchema)
    .mutation(async ({ input, ctx }) => {
      const authRequest = auth.handleRequest(ctx);
      const key = await auth.useKey("email", input.email, input.password);
      await auth.deleteDeadUserSessions(key.userId);
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      });
      authRequest.setSession(session);

      return null;
    }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const authRequest = auth.handleRequest(ctx);
    const session = await authRequest.validate();
    if (!session) {
      return null;
    }
    await auth.deleteDeadUserSessions(session.user.userId);
    await auth.invalidateSession(session.sessionId);
    authRequest.setSession(null);
    return null;
  }),
  session: publicProcedure.query(async ({ ctx }) => {
    const authRequest = auth.handleRequest(ctx);
    const session = await authRequest.validate();
    return session
      ? {
          email: session.user.email,
          userId: session.user.userId,
        }
      : null;
  }),
});
