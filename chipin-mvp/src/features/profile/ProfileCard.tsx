import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import EditProfileDialog from "./EditProfileDialog";
import { Button } from "@/components/ui/button";
import {
  Asterisk,
  Heart,
  Inbox,
  InstagramIcon,
  Linkedin,
  Plus,
  RefreshCcw,
  Sparkles,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUser } from "../authentication/useUser";
import { useUserDetail } from "@/hooks/useUserDetail";
import { format } from "date-fns";
import { useState } from "react";

export default function ProfileCard() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user } = useUser();
  const { userDetail } = useUserDetail();
  const birthday = userDetail?.birthday ? new Date(userDetail?.birthday) : null;
  const formatedBirthday = birthday ? format(birthday, "d MMMM") : "";

  const toggleDialog = () => {
    setIsEditDialogOpen((value) => !value);
  };

  return (
    <Card className="w-[380px]">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src={user?.user_metadata?.avatar} />
            <AvatarFallback>
              <User size="32" className="text-slate-400" />
            </AvatarFallback>
          </Avatar>
          <EditProfileDialog
            isOpen={isEditDialogOpen}
            toggleDialog={toggleDialog}
          />
        </div>
        <div className="pb-4">
          <div className="pt-5 text-2xl text-slate-900">
            {user?.user_metadata?.full_name}
          </div>
          <div className="pt-1 text-slate-500">
            {user?.user_metadata?.email}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-t py-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-4 border-indigo-200 bg-indigo-700"></div>
            <span>Nick Name</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-4 border-yellow-200 bg-yellow-500"></div>
            <span>Birthday</span>
          </div>
          <Button
            variant="outline"
            className="mr-4 h-7 justify-start rounded-full border-indigo-200 bg-indigo-50 pl-2 text-xs text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600"
            size="sm"
          >
            {userDetail?.nick_name ? (
              <span className="pl-1">{userDetail?.nick_name}</span>
            ) : (
              <>
                <Plus size="16" />
                <span className="pl-1" onClick={toggleDialog}>
                  Add nick name
                </span>
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="mr-4 h-7 justify-start rounded-full border-amber-200 bg-amber-50 pl-2 text-xs hover:bg-amber-50"
            size="sm"
          >
            <Asterisk
              size="16"
              className="text-amber-500 hover:text-amber-500"
            />
            <span className="pl-1 text-amber-700">{formatedBirthday}</span>
          </Button>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-4 border-pink-200 bg-pink-500"></div>
            <span>Faves</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-4 border-blue-200 bg-primary"></div>
            <span>Socials</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="mr-4 h-7 justify-start rounded-full border-pink-200 bg-pink-50 pl-2 text-xs text-pink-600 hover:bg-pink-50 hover:text-pink-600"
              size="sm"
            >
              <Heart size="14" />
              <span className="pl-1">{userDetail?.fav_drink}</span>
            </Button>
            <Button
              variant="outline"
              className="mr-4 h-7 justify-start rounded-full border-pink-200 bg-pink-50 pl-2 text-xs text-pink-600 hover:bg-pink-50 hover:text-pink-600"
              size="sm"
            >
              <Heart size="14" />
              <span className="pl-1">{userDetail?.fav_snack}</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="mr-4 h-7 justify-start rounded-full border-slate-200 bg-blue-50 pl-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-slate-600"
              size="sm"
            >
              <InstagramIcon size="14" />
              <span className="pl-2" onClick={toggleDialog}>
                {userDetail?.instagram ? userDetail?.instagram : "+ Add Social"}
              </span>
            </Button>
            <Button
              variant="outline"
              className="mr-4 h-7 justify-start rounded-full border-slate-200 bg-blue-50 pl-2 text-xs text-slate-600 hover:bg-blue-50 hover:text-slate-600"
              size="sm"
            >
              <Linkedin size="14" />
              <span className="pl-2" onClick={toggleDialog}>
                {userDetail?.linkedin ? userDetail?.linkedin : "+ Add Social"}
              </span>
            </Button>
          </div>
        </div>
        <Card className="mt-4 bg-primary">
          <CardContent className="p-2">
            <Card className="border-blue-300 bg-white bg-opacity-25">
              <CardContent className="p-2">
                <div className="flex gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-white p-2">
                    <img
                      className="h-8 w-8"
                      src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                    />
                  </div>
                  <div className="text-sm text-white">
                    Bose SoundLink Max Portable Speaker
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="w-5/6">
                    <Progress className="h-2" value={33} />
                  </div>
                  <div className="text-sm text-white">33%</div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <RefreshCcw size="22" className="text-slate-700" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Inbox size="22" className="text-slate-700" />
                </Button>
              </div>
              <Button
                variant="outline"
                className="h-9 text-slate-700"
                disabled={true}
              >
                Get Gift
                <Sparkles size="22" className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
