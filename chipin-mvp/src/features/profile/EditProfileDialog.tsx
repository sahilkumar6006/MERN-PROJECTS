import { CircleUser, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Spinner from "@/components/chipin/Spinner";
import { useUser } from "../authentication/useUser";
import { useUserDetail } from "../../hooks/useUserDetail";
import ProfileForm from "./ProfileForm";
import ShippingAddressForm from "./ShippingAddressForm";
import { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";

interface EditProfileDialogProps {
  isOpen: boolean;
  toggleDialog: Function;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  toggleDialog,
}) => {
  const [showChangePasswordForm, setShowChangePasswordForm] =
    useState<boolean>(false);
  const { isLoading: isUserLoading } = useUser();
  const { isPending: isUserDetailLoading } = useUserDetail();

  const onToggleChangePassword = () => {
    setShowChangePasswordForm((value) => !value);
  };

  if (isUserLoading || isUserDetailLoading) return <Spinner />;

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => toggleDialog()}>
        <Settings className="cursor-pointer text-slate-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[788px]" hideClose={true}>
        <Button
          className="absolute right-0 text-slate-400"
          variant="ghost"
          onClick={() => toggleDialog()}
        >
          <X size="18" />
        </Button>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex">
          <Button variant="outline" size="icon">
            <CircleUser className="h-5 w-5 text-slate-700" />
          </Button>
          <div className="ml-4 flex flex-col">
            <span className="text-lg">
              {showChangePasswordForm ? "Change Password" : "Edit your profile"}
            </span>
            {!showChangePasswordForm && (
              <span className="text-sm font-light text-slate-600">
                Add a profile pic, your favs, socials and shipping address
              </span>
            )}
          </div>
        </div>
        <div>
          {!showChangePasswordForm && (
            <Tabs defaultValue="profile" className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="shippingAddress">
                  Shipping Address
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileForm
                  toggleDialog={toggleDialog}
                  toggleChangePassword={onToggleChangePassword}
                />
              </TabsContent>
              <TabsContent value="shippingAddress">
                <ShippingAddressForm toggleDialog={toggleDialog} />
              </TabsContent>
            </Tabs>
          )}
          {showChangePasswordForm && (
            <ChangePasswordForm
              toggleDialog={toggleDialog}
              toggleChangePassword={onToggleChangePassword}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
