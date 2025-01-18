import FormRow from "@/components/chipin/FormRow";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATES } from "@/constants/states";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface ShippingAddressInput {
  firstname: string;
  lastname: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  phone: string;
}

interface ShippingAddressFormProps {
  toggleDialog: Function;
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
  toggleDialog,
}) => {
  const [shipToOffice, setShipToOffice] = useState<boolean>(false);
  const { control, register, handleSubmit, formState } =
    useForm<ShippingAddressInput>();
  const isPending = false;
  const { errors } = formState;

  const toggleShipToOffice = () => {
    setShipToOffice((value) => !value);
  };
  const onSubmit = (data: ShippingAddressInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 flex cursor-pointer rounded-xl border p-4">
        <div className="pt-1">
          <div
            className={
              "m-auto h-4 w-4 rounded-full border " +
              (shipToOffice ? "bg-primary" : "")
            }
          ></div>
        </div>
        <div
          className="flex cursor-pointer flex-col pl-2"
          onClick={toggleShipToOffice}
        >
          <div className="text-sm font-semibold text-slate-700">
            Ship to office
          </div>
          <div className="text-sm text-slate-600">
            Select this option if you would like your gift to be shipped to your
            work place
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <FormRow
              label="First Name"
              error={errors?.firstname?.message as string}
            >
              <Input
                id="firstname"
                disabled={isPending}
                {...register("firstname", {
                  required: "This field is required",
                })}
              />
            </FormRow>
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormRow
              label="Last Name"
              error={errors?.lastname?.message as string}
            >
              <Input
                id="lastname"
                disabled={isPending}
                {...register("lastname", {
                  required: "This field is required",
                })}
              />
            </FormRow>
          </div>
        </div>
        <FormRow label="Address" error={errors?.address?.message as string}>
          <Input
            id="address"
            disabled={isPending}
            {...register("address", {
              required: "This field is required",
            })}
          />
        </FormRow>
        <div className="grid grid-cols-3 gap-4">
          <FormRow label="Suburb" error={errors?.suburb?.message as string}>
            <Input
              id="suburb"
              disabled={isPending}
              {...register("suburb", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Postcode" error={errors?.postcode?.message as string}>
            <Input
              id="postcode"
              disabled={isPending}
              {...register("postcode", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <div className="flex flex-col space-y-1.5">
            <Label className="font-normal" htmlFor="state">
              State
            </Label>
            <Controller
              control={control}
              name="state"
              rules={{
                required: "This field is required",
              }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} disabled={isPending}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATES.map((state) => (
                        <SelectItem value={state.code} key={state.code}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
            {errors?.state?.message && (
              <div className="text-xs text-red-700">
                {errors?.state?.message}
              </div>
            )}
          </div>
        </div>
        <FormRow label="Phone(optional)">
          <Input id="phone" disabled={isPending} {...register("phone")} />
        </FormRow>
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

export default ShippingAddressForm;
