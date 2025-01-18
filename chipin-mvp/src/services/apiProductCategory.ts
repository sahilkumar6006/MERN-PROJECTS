import supabase from "./supabase";

// Fetch product categories with optional filters
export async function getProductCategory(filters = {}) {
  let query = supabase.from("product_category").select("Books");

  // Apply filters if provided
  if (filters.eq) {
    query = query.eq(filters.eq.column, filters.eq.value);
  }

  const { data: product_category, error } = await query;

  console.log("Product Category Data:", product_category);
  if (error) {
    console.error("Error fetching product categories:", error);
    throw new Error(error.message);
  }

  return product_category || [];
}
