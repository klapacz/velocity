import { createContext } from "react";

export const AuthSessionContext = createContext<{
  email: string;
  userId: string;
} | null>(null);
