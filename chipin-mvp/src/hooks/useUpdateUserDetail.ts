import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetail as updateUserDetailApi } from "@/services/apiUserDetail";
import { useToast } from "@/hooks/useToast";
import UserDetail from "@/model/UserDetail";

export interface UpdateUserDetailParams {
  fav_drink?: string;
  fav_snack?: string;
  nick_name?: string;
  instagram?: string;
  linkedin?: string;
  birthday?: any;
}

export function useUpdateUserDetail() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUserDetail, isPending } = useMutation<
    UserDetail,
    Error,
    { user_UID: string; userDetail: UpdateUserDetailParams }
  >({
    mutationFn: ({ user_UID, userDetail }) =>
      updateUserDetailApi(user_UID, userDetail),
    onSuccess: (userDetail) => {
      toast({ description: "Profile updated successfully" });
      queryClient.setQueryData(["userDetail"], userDetail);
    },
    onError: (err) =>
      toast({
        variant: "destructive",
        description: err.message,
      }),
  });

  return { updateUserDetail, isPending };
}
