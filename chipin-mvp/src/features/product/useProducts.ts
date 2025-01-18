import { getAllProducts } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const {
    isPending,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    staleTime: 5 * 60000,
  });

  return {
    isPending,
    error,
    products,
  };
}
