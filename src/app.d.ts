declare namespace Lucia {
  type Auth = import("@/lib/lucia").Auth;
  type DatabaseUserAttributes = import("@/lib/db/schema").UserAttributes;
  type DatabaseSessionAttributes = import("@/lib/db/schema").SessionAttributes;
}
