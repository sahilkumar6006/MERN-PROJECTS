import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormRow from "@/components/chipin/FormRow";
import { DialogClose } from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useLogin } from "../authentication/useLogin";
import { useUser } from "../authentication/useUser";

export interface ChangePasswordInput {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

interface ChangePasswordFormProps {
  toggleDialog: Function;
  toggleChangePassword: Function;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  toggleDialog,
  toggleChangePassword,
}) => {
  const { user } = useUser();
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<ChangePasswordInput>();
  const { updateUser, isPending: isPendingUpdate } = useUpdateUser();
  const { login, isPending: isPendingLogin } = useLogin();
  const { errors } = formState;

  const onSubmit = (data: ChangePasswordInput) => {
    const { password } = data;
    const email = user?.user_metadata?.email;

    login(
      { email, password: data.currentPassword },
      {
        onSuccess: () => {
          updateUser({ password }, { onSuccess: () => reset });
        },
      },
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => toggleChangePassword()}
      >
        <ChevronLeft />
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormRow
            label="Current Password"
            error={errors?.currentPassword?.message as string}
          >
            <Input
              id="currentPassword"
              type="password"
              disabled={isPendingUpdate || isPendingLogin}
              {...register("currentPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="New Password"
            error={errors?.password?.message as string}
          >
            <Input
              id="password"
              type="password"
              disabled={isPendingUpdate || isPendingLogin}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Confirm Password"
            error={errors?.confirmPassword?.message as string}
          >
            <Input
              id="confirmPassword"
              type="password"
              disabled={isPendingUpdate || isPendingLogin}
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  getValues().password === value || "Passwords need to match",
              })}
            />
          </FormRow>
        </div>
        <div className="min-h-48"></div>
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
          <Button disabled={isPendingUpdate || isPendingLogin} type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
