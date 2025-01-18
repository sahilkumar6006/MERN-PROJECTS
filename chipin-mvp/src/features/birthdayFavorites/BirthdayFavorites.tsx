import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import FormRow from "@/components/chipin/FormRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useUser } from "../authentication/useUser";
import { useUpdateUserDetail } from "@/hooks/useUpdateUserDetail";

export interface BirthdayFavoritesInput {
  birthday: Date;
  fav_drink: string;
  fav_snack: string;
}

export default function BirthdayFavoritesForm() {
  const { control, register, formState, handleSubmit } =
    useForm<BirthdayFavoritesInput>();
  const { updateUserDetail, isPending } = useUpdateUserDetail();
  const { user } = useUser();
  const navigate = useNavigate();
  const { errors } = formState;

  const toYear = new Date().getFullYear();
  const fromYear = toYear - 90;

  const onSubmit = (data: BirthdayFavoritesInput) => {
    const { birthday, fav_drink, fav_snack } = data;
    updateUserDetail(
      {
        user_UID: user?.id || "",
        userDetail: {
          birthday,
          fav_drink,
          fav_snack,
        },
      },
      {
        onSuccess: () => navigate("/dashboard", { replace: true }),
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
          Tell us about yourself
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <FormRow
              label="Birthday*"
              error={errors?.birthday?.message as string}
            >
              <Controller
                control={control}
                name="birthday"
                rules={{
                  required: "This field is required",
                }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={isPending}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yy")
                        ) : (
                          <span>dd/mm/yy</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        fromYear={fromYear}
                        toYear={toYear}
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              ></Controller>
            </FormRow>
            <FormRow
              label="What's your drink order?*"
              error={errors?.fav_drink?.message as string}
            >
              <Input
                id="fav_drink"
                autoComplete="off"
                placeholder="e.g. skim cappucino"
                disabled={isPending}
                {...register("fav_drink", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <FormRow
              label="What's your go-to snack?*"
              error={errors?.fav_snack?.message as string}
            >
              <Input
                id="fav_snack"
                autoComplete="off"
                placeholder="e.g. blueberry muffin"
                disabled={isPending}
                {...register("fav_snack", {
                  required: "This field is required",
                })}
              />
            </FormRow>
            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
              Next
            </Button>
            <div className="h-[40px]">&nbsp;</div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
