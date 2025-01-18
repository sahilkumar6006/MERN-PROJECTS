import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/features/authentication/LoginForm";
import { useUser } from "@/features/authentication/useUser";
import { useUserDetail } from "@/hooks/useUserDetail";

export function Login() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  const { userDetail } = useUserDetail();

  useEffect(
    function () {
      if (isAuthenticated && !isLoading && userDetail?.birthday) {
        navigate("/dashboard");
      } else if (isAuthenticated && !isLoading) {
        navigate("/birthday-faves", { replace: true });
      }
    },
    [isAuthenticated, isLoading, userDetail, navigate],
  );

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
