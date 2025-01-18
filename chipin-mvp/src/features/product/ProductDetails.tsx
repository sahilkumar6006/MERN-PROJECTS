import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { useProducts } from "./useProducts";
import { useParams } from "react-router-dom";
import Product from "@/model/Product";
import SpinnerFull from "@/components/chipin/SpinnerFull";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCategory_Product } from "./useCategory";

export function ProductDetails() {
  const { id } = useParams();
  const { products, isPending } = useProducts();


  const { products: categories, isPending2, error } = useCategory_Product();
  console.log("categories", categories,isPending2,error);


  const product: Product | undefined = id
    ? products?.find((p) => p.product_id === parseInt(id))
    : undefined;
  console.log(product);
  if (isPending) return <SpinnerFull />;

  return (
    <div className="min-h-full grow bg-gray-50 px-28 pt-8">
      <div className="pb-8">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      <Card>
        <CardContent>
          {!product && (
            <div className="p-6 pt-10 text-center">
              We could not find the product that you are looking for!
            </div>
          )}
          {product && (
            <div className="grid grid-cols-2 p-16">
              <div className="p-4">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <img className="m-auto" src={product.thumbnail_url} />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div>
                <div className="text-3xl font-semibold">{product.name}</div>
                <div className="pt-4 text-2xl text-primary">
                  ${product.price}
                </div>
                {/* <ul className="list-disc pl-6 pt-8 text-xl font-light text-slate-600">
                  <li>Sennheiser Signature Sound</li>
                  <li>Customized sound</li>
                  <li>Adaptive Noise Cancellation</li>
                  <li>Transparency Mode</li>
                  <li>Premium Comfort</li>
                  <li>Top-Tier Battery Life</li>
                  <li>Crystal-clear Calls</li>
                </ul> */}
                <div className="min-h-36 pl-6 pt-8 text-xl font-light text-slate-600">
                  {product.description}
                </div>
                <Button className="mt-8 py-6 text-lg font-normal">
                  <Plus className="mr-2 h-6 w-6" /> Select Gift
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
