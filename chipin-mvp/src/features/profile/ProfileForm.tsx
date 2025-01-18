import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImagePlus } from "lucide-react";
import { DragAndDrop, FileBrowser } from "react-drag-drop-browser";
import { useUser } from "../authentication/useUser";
import { useUserDetail } from "../../hooks/useUserDetail";
import { useUpdateUserDetail } from "../../hooks/useUpdateUserDetail";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import FormRow from "@/components/chipin/FormRow";
import { DialogClose } from "@/components/ui/dialog";

export interface ProfileInput {
  email: string;
  full_name: string;
  avatar: any;
  fav_drink: string;
  fav_snack: string;
  nick_name: string;
  instagram: string;
  linkedin: string;
  birthday: any;
}

interface ProfileFormProps {
  toggleDialog: Function;
  toggleChangePassword: Function;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  toggleDialog,
  toggleChangePassword,
}) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const { user } = useUser();
  const { userDetail } = useUserDetail();
  const birthday = userDetail?.birthday ? new Date(userDetail?.birthday) : null;

  const { register, handleSubmit, setValue, formState } =
    useForm<ProfileInput>();
  const { updateUserDetail, isPending } = useUpdateUserDetail();
  const { updateUser } = useUpdateUser();
  const { errors } = formState;

  useEffect(
    function () {
      if (user?.user_metadata && userDetail) {
        setValue("full_name", user?.user_metadata?.full_name);
        setValue("email", user?.user_metadata?.email);
        setValue("birthday.day", birthday ? birthday?.getDate() : "");
        setValue("birthday.month", birthday ? birthday.getMonth() + 1 : "");
        setValue("birthday.year", birthday ? birthday?.getFullYear() : "");
        setValue("fav_drink", userDetail?.fav_drink);
        setValue("fav_snack", userDetail?.fav_snack);
        setValue("nick_name", userDetail?.nick_name);
        setValue("instagram", userDetail?.instagram);
        setValue("linkedin", userDetail?.linkedin);
      }
    },
    [user, userDetail],
  );

  const onSubmit = (data: ProfileInput) => {
    const { full_name, fav_drink, fav_snack, nick_name, instagram, linkedin } =
      data;

    if ((full_name && full_name !== user?.user_metadata.full_name) || avatar) {
      updateUser(
        { full_name, avatar },
        {
          onSuccess: () => {
            setAvatar(null);
          },
        },
      );
    }
    updateUserDetail({
      user_UID: user?.id || "",
      userDetail: {
        fav_drink,
        fav_snack,
        nick_name,
        instagram,
        linkedin,
      },
    });
  };

  const onAddFile = (files: File[]) => {
    if (files) {
      setAvatar(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 grid grid-cols-2">
        <div className="flex flex-col gap-4 pr-5">
          <div className="flex flex-col gap-2">
            <Label className="font-normal text-slate-700">Profile image</Label>
            <div className="flex">
              <Avatar className="h-16 w-16 border">
                <AvatarImage
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : user?.user_metadata?.avatar
                  }
                />
                <AvatarFallback>
                  <ImagePlus
                    className="stroke-1 text-gray-500"
                    height="32"
                    width="32"
                  />
                </AvatarFallback>
              </Avatar>

              <div className="m-auto mr-0">
                <DragAndDrop
                  zoneId="clickableZone"
                  zoneClassName="flex items-center justify-center border border-slate-200 rounded-md"
                  onDropFiles={onAddFile}
                >
                  <FileBrowser
                    inputId="pickerInClickableZone"
                    onSelectFiles={onAddFile}
                    render={(props) => {
                      return (
                        <div onClick={props.onClick} className="p-4 text-sm">
                          <span className="text-primary">Click to upload</span>
                          <span className="pl-2 font-normal">
                            or drag and drop
                          </span>
                        </div>
                      );
                    }}
                    pickerBtnText="This picker is rendered inside a drop zone"
                  />
                </DragAndDrop>
              </div>
            </div>
          </div>
          <FormRow
            label="Full Name"
            error={errors?.full_name?.message as string}
          >
            <Input
              id="full_name"
              autoComplete="off"
              disabled={isPending}
              {...register("full_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Email">
            <Input
              id="email"
              autoComplete="off"
              disabled={true}
              {...register("email")}
            />
          </FormRow>
          <div className="flex">
            <div className="basis-3/12 space-y-1.5 pr-2">
              <Label htmlFor="day" className="font-normal text-slate-700">
                Day
              </Label>
              <Input id="day" disabled={true} {...register("birthday.day")} />
            </div>
            <div className="space-y-1.5 pr-2">
              <Label htmlFor="month" className="font-normal text-slate-700">
                Month
              </Label>
              <Input
                id="month"
                disabled={true}
                {...register("birthday.month")}
              />
            </div>
            <div className="basis-4/12 space-y-1.5">
              <Label htmlFor="year" className="font-normal text-slate-700">
                Year
              </Label>

              <Input id="year" disabled={true} {...register("birthday.year")} />
            </div>
          </div>
          <div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => toggleChangePassword()}
            >
              Change Password
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 pl-5">
          <FormRow
            label="Nick Name"
            error={errors?.nick_name?.message as string}
          >
            <Input
              id="nick_name"
              disabled={isPending}
              {...register("nick_name")}
            />
          </FormRow>

          <Label>Favourites</Label>
          <FormRow label="Drink" error={errors?.fav_drink?.message as string}>
            <Input
              id="fav_drink"
              disabled={isPending}
              {...register("fav_drink", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Snack" error={errors?.fav_snack?.message as string}>
            <Input
              id="fav_snack"
              disabled={isPending}
              {...register("fav_snack", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Socials">
            <Input
              id="instagram"
              placeholder="@instagram"
              disabled={isPending}
              {...register("instagram")}
            />
          </FormRow>

          <FormRow>
            <Input
              id="linkedin"
              placeholder="@linkedin"
              disabled={isPending}
              {...register("linkedin")}
            />
          </FormRow>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 pt-5">
        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
            onClick={() => toggleDialog()}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={isPending} type="submit">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
