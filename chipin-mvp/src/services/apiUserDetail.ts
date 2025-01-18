import { UpdateUserDetailParams } from "@/hooks/useUpdateUserDetail";
import supabase from "./supabase";

export async function getUserDetail(user_UID: string) {
  let { data, error } = await supabase
    .from("user_detail")
    .select("*")
    .eq("user_UID", user_UID)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserDetail(
  user_UID: string,
  params: UpdateUserDetailParams,
) {
  const updateData: Partial<UpdateUserDetailParams> = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null,
    ),
  );

  const { data, error } = await supabase
    .from("user_detail")
    .update(updateData)
    .eq("user_UID", user_UID)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
