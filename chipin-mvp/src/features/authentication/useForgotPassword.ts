import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import { useToast } from "@/hooks/useToast";

export function useForgotPassword() {
  const { toast } = useToast();

  const { mutate: forgotPassword, isPending } = useMutation<any, Error, string>(
    {
      mutationFn: (email) => forgotPasswordApi(email),
      onSuccess: () => {
        toast({
          description: "Pasword reset link sent to your email",
        });
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          description: err.message,
        });
      },
    },
  );

  return { forgotPassword, isPending };
}
