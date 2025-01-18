import supabase, { supabaseUrl } from "./supabase";
import { LoginPayload } from "@/features/authentication/useLogin";
import { SignupPayload } from "@/features/authentication/useSignup";
import { UpdateUserParams } from "@/hooks/useUpdateUser";
import User from "@/model/User";

export async function signup({ full_name, email, password }: SignupPayload) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: LoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function forgotPassword(email: string) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);
  return data;
}

export async function updatefull_name(full_name: string) {
  let updateData = { data: { full_name } };

  const { error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  return;
}

export async function updateCurrentUser({
  password,
  full_name,
  avatar,
}: UpdateUserParams): Promise<User> {
  let updateData: any = {};
  if (password) updateData = { password };
  if (full_name) updateData = { data: { full_name } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data?.user;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser?.user;
}
