import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useToast } from "@/hooks/useToast";

export interface LoginPayload {
  email: string;
  password: string;
}

interface UserResponse {
  user: {};
}

export function useLogin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation<
    UserResponse,
    Error,
    LoginPayload
  >({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        description: err.message,
      });
    },
  });

  return { login, isPending };
}
