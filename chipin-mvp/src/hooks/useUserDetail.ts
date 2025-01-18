import { useQuery } from "@tanstack/react-query";
import { getUserDetail } from "@/services/apiUserDetail";
import { useUser } from "../features/authentication/useUser";

export function useUserDetail() {
  const user = useUser();

  const {
    isPending,
    data: userDetail,
    error,
  } = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => getUserDetail(user.user?.id || ""),
    enabled: Boolean(user.user?.id),
  });

  return {
    isPending,
    error,
    userDetail,
  };
}
