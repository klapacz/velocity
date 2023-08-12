import { useRouter } from "next/router";
import { api } from "../api";

export function authLogout() {
  const router = useRouter();
  const logout = api.auth.logout.useMutation({
    onSuccess() {
      router.push("/auth/login");
    },
  });
  return logout;
}
