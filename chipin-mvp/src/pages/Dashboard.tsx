import DashboardComponent from "@/features/dashboard/Dashboard";
import supabase from "@/services/supabase";
import { useEffect, useState,  } from "react";

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Tech");
   async function getProductCategory(filters = {}) {
    let query = supabase.from("product_category").select("*"); 

    
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


  // Updated useEffect hook in the component
    useEffect (() => {
      const fetchCategories = async () => {
        try {
          const filters =
            selectedCategory !== "office"
              ? { eq: { column: "product_category_name", value: selectedCategory } }
              : {};
          const data = await getProductCategory(filters); // Fetch data with filters
          console.log("Fetched Data:", data);
        } catch (err) {
          console.error("Error fetching categories:", err);
        }
      };

      fetchCategories(); // Invoke the function
    }, []); 
  return <DashboardComponent />;
}

export default Dashboard;