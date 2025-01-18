import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { updateCurrentUser } from "../services/apiAuth";

export interface UpdateUserParams {
  password?: string;
  full_name?: string;
  avatar?: File | null;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast({ description: "Profile updated successfully" });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err: Error) =>
      toast({
        variant: "destructive",
        description: err.message,
      }),
  });

  return { updateUser, isPending };
}
