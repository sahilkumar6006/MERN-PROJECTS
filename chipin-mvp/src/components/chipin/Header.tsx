import { useLocation } from "react-router-dom";
import { LifeBuoy, LogOut, MessageSquareText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useLogout } from "@/features/authentication/useLogout";
import { useUser } from "@/features/authentication/useUser";

export default function Header() {
  const { pathname } = useLocation();
  const { user } = useUser();

  const { logout, isPending } = useLogout();

  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <img
        className="w-[104px]"
        alt="chipin"
        src="/chipin-logo-transparent-bg.png"
      />

      {pathname === "/products" && (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar} />
            <AvatarFallback>
              <img src="/user.png" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm text-slate-700">
              {user?.user_metadata?.full_name}
            </div>
            <div className="text-xs text-slate-500">
              {user?.user_metadata?.email}
            </div>
          </div>
        </div>
      )}
      {pathname === "/dashboard" && (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <LifeBuoy className="text-slate-600" size="22" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquareText className="text-slate-600" size="22" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={isPending}
            onClick={() => logout()}
          >
            <LogOut className="text-slate-600" size="22" />
          </Button>
        </div>
      )}
    </div>
  );
}
