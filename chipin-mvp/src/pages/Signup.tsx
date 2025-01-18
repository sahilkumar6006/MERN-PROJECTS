import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "@/features/authentication/SignupForm";
import { useUser } from "@/features/authentication/useUser";

function Signup() {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (isAuthenticated && !isLoading) navigate("/dashboard");
    },
    [isAuthenticated, isLoading, navigate],
  );

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;
