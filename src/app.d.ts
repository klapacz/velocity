/* eslint-disable @typescript-eslint/consistent-type-imports */

declare namespace Lucia {
  type Auth = import("@/lib/server/auth/lucia").Auth;
  type DatabaseUserAttributes = import("@/lib/server/db/schema").UserAttributes;
  type DatabaseSessionAttributes =
    import("@/lib/server/db/schema").SessionAttributes;
}
