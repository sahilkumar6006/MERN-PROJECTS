"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import React from "react";
import { PrimaryButton } from "./Button";

function AppBar() {
  const session = useSession();
  return (
    <div className="border-b px-2 py-2 flex justify-between">
      <div className="text-xl font-bold flex-col justify-center">DCEX</div>
      <div>
        {session?.data?.user ? (
          <PrimaryButton onClick={() => signOut()}>Sign out</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => signIn()}>Sign In</PrimaryButton>
        )}
      </div>
    </div>
  );
}

export default AppBar;
