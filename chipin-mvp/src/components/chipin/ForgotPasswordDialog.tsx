import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "@/features/authentication/useForgotPassword";
import SpinnerMini from "./SpinnerMini";

export function ForgotPasswordDialog() {
  const [email, setEmail] = useState("");

  const { forgotPassword, isPending } = useForgotPassword();
  function handleSendLink(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();
    forgotPassword(email, {
      onSuccess: () => {
        setEmail("");
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Forgot Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send password reset link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSendLink} disabled={isPending}>
            {isPending && <SpinnerMini />}
            Send link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
