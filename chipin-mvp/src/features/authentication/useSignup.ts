import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";

export interface SignupPayload {
  full_name: string;
  email: string;
  password: string;
}

interface UserResponse {
  user: User | null;
  session: Session | null;
}

export function useSignup() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation<
    UserResponse,
    Error,
    SignupPayload
  >({
    mutationFn: signupApi,
    onSuccess: () => {
      toast({
        description: "Account successfully created!",
      });
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        description: err.message,
      });
    },
  });
  return { signup, isPending };
}
