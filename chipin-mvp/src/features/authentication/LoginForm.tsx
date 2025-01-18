import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { NavLink } from "react-router-dom";
import SpinnerMini from "@/components/chipin/SpinnerMini";
import { ForgotPasswordDialog } from "@/components/chipin/ForgotPasswordDialog";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Card className="w-[488px] p-6">
      <CardHeader>
        <div className="flex justify-center">
          <img
            className="w-[104px]"
            alt="chipin"
            src="/chipin-logo-transparent-bg.png"
          />
        </div>
        <CardTitle className="pb-2 pt-4 text-center font-medium tracking-wide">
          Welcome back
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="font-normal">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="font-normal">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberme" />
                <Label htmlFor="rememberme">Remember me</Label>
              </div>
              <ForgotPasswordDialog />
            </div>
            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
              {isPending && <SpinnerMini />}
              Sign in
            </Button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <p className="text-sm text-slate-700">Don’t have an account?</p>
          <Button asChild variant="link">
            <NavLink to="/signup">Sign up</NavLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
