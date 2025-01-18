import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useProducts } from "./useProducts";
import ProductCard from "./ProductCard";
import Product from "@/model/Product";
import SpinnerFull from "@/components/chipin/SpinnerFull";

const categories = [
  { name: "All Gifts" },
  { name: "Books" },
  { name: "Office" },
  { name: "Audio" },
  { name: "Tech" },
  { name: "Experiences" },
  { name: "Lego" },
  { name: "Fitness" },
  { name: "Home" },
];

function ProductList() {
  const { products, isPending } = useProducts();
  const selectedCategory = "All Gifts"; 

  

  if (isPending) return <SpinnerFull />;

  return (
    <>
      <div className="flex flex-col items-center justify-between border-b border-b-slate-300 pb-2 xl:flex-row">
        <div className="mt-2">
          {categories.map((category) => (
            <Button
              className={
                category.name === selectedCategory
                  ? "text-sm"
                  : "text-sm text-slate-500"
              }
              variant={
                category.name === selectedCategory ? "secondary" : "ghost"
              }
              key={category.name}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="mt-2 rounded-full border border-yellow-300 bg-orange-50 p-1 xl:mt-0">
          <span className="px-3 text-sm text-orange-800">
            Have something in mind? Paste a link instead.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-7 rounded-full border-yellow-300 text-xs text-orange-800"
          >
            <span className="pe-1">Submit Link</span>
            <ArrowRight size="16" />
          </Button>
        </div>
      </div>
      <div className="grid gap-6 bg-gray-50 p-8 md:grid-cols-2 lg:grid-cols-4 ">
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product.product_id} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
