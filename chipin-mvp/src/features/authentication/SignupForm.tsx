import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import FormRow from "@/components/chipin/FormRow";
import { useSignup } from "./useSignup";
import SpinnerMini from "@/components/chipin/SpinnerMini";

export default function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const onSubmit: SubmitHandler<Record<string, string>> = (data) => {
    const { full_name, email, password } = data;
    signup(
      { full_name, email, password },
      {
        onSuccess: () => reset(),
      },
    );
  };

  return (
    <Card className="w-[488px] p-6">
      <CardHeader>
        <img
          className="w-[104px]"
          alt="chipin"
          src="/chipin-logo-transparent-bg.png"
        />
        <CardTitle className="pb-2 pt-4 font-medium tracking-wide">
          Sign up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <FormRow label="Email*" error={errors?.email?.message as string}>
              <Input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                disabled={isPending}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
            </FormRow>
            <FormRow label="Name*" error={errors?.full_name?.message as string}>
              <Input
                id="full_name"
                autoComplete="off"
                placeholder="Enter your name"
                disabled={isPending}
                {...register("full_name", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow
              label="Password*"
              info="Must be at least 8 characters."
              error={errors?.password?.message as string}
            >
              <Input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="Create a passsword"
                disabled={isPending}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
              />
            </FormRow>

            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
              {isPending && <SpinnerMini />}
              Get started
            </Button>
            <div className="flex items-center justify-center">
              <p className="text-sm text-slate-700">Already have account?</p>
              <Button asChild variant="link" disabled={isPending}>
                <NavLink to="/login">Log in</NavLink>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
