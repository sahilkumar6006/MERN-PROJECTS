import supabase from "./supabase";

export async function getAllProducts() {
  let { data, error } = await supabase.from("product").select("*");
  console.log("in the data", data);
  console.log("in the error", error);


  if (error) throw new Error(error.message);
  return data ? data : [];
}
