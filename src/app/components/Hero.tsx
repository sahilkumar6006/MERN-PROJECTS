"use client";
import { signIn } from "next-auth/react";
import { SecondaryButton } from "./Button";

export const Hero = () => {
  return (
    <div className="text-4xl font-medium justify-center items-center flex flex-col mt-10 ">
      <span>The Indian Cryptocurrency</span>

      <span className="text-blue-500  pl-4">Revolution</span>

      <div className="text-xl font-semibold mt-4">
        Create a frictionless wallet from India with just a Google Account
      </div>

      <div className="text-xl font-semibold mt-2 mb-4">
        Convert your INR into Cryptocurrency
      </div>
      <SecondaryButton
        onClick={() => {
          signIn("google");
        }}
      >
        Login with Google
      </SecondaryButton>
    </div>
  );
};
