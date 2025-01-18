import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "@/services/apiProductCategory";

export function useCategory_Product() {
  const { isLoading: isPending2, data: products, error } = useQuery({
    queryKey: ["products"], 
    queryFn: getProductCategory, 
    staleTime: 5 * 60000, 
  });

  return {
    isPending2,
    error,
    products,
  };
}
