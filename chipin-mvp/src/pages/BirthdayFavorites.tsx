import { useNavigate } from "react-router-dom";
import BirthdayFavoritesForm from "@/features/birthdayFavorites/BirthdayFavorites";
import { useUserDetail } from "@/hooks/useUserDetail";
import Spinner from "@/components/chipin/Spinner";

function BirthdayFavorites() {
  const navigate = useNavigate();
  const { userDetail, isPending } = useUserDetail();

  if (userDetail?.birthday) {
    navigate("/dashboard", { replace: true });
  }

  if (isPending) return <Spinner />;

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <BirthdayFavoritesForm />
      </div>
    </div>
  );
}

export default BirthdayFavorites;
