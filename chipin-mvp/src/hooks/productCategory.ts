import { getProductCategory } from "@/services/apiProductCategory";
import { useQuery } from "@tanstack/react-query";

export function useCategory_Product() {
    const {
      isPending,
      data: products,
      error,
    } = useQuery({
      queryKey: ["products"],
      queryFn: () => getProductCategory(),
      staleTime: 5 * 60000,
    });
  
    return {
      isPending,
      error,
      products,
    };
  }
  