import { useRouter } from "next/navigation";
import { api } from "../api";

export function useAuthLogout() {
  const router = useRouter();
  const logout = api.auth.logout.useMutation({
    onSuccess() {
      router.push("/auth/login");
    },
  });
  return logout;
}
