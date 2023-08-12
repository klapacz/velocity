import { useContext } from "react";
import { AuthSessionContext } from "@/lib/client/contexts/auth-session-context";

export function useAuthSession() {
  const sesion = useContext(AuthSessionContext);
  if (!sesion) {
    throw new Error(
      "useAuthSession must be used within AuthSessionContext.Provider"
    );
  }
  return sesion;
}
