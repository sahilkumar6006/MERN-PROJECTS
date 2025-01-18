import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/features/authentication/useUser";
import { useUserDetail } from "@/hooks/useUserDetail";
import SpinnerFull from "./SpinnerFull";

function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();
  const { userDetail } = useUserDetail();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [userDetail, isAuthenticated, isLoading, navigate],
  );

  if (isLoading) return <SpinnerFull />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
