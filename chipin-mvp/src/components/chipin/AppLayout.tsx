import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
  const { pathname } = useLocation();

  return (
    <div className="container h-screen max-w-screen-2xl">
      {pathname !== "/birthday-faves" && <Header />}
      <Outlet />
    </div>
  );
}
