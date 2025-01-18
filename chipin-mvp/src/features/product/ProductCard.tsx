import { Card, CardContent } from "@/components/ui/card";
import Product from "@/model/Product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/products/${product.product_id}`)}>
      <CardContent className="flex h-[366px] flex-col justify-between gap-6 p-5">
        <div className="flex h-40 justify-center">
          <img className="max-h-40" src={product.thumbnail_url} />
        </div>
        <div>
          <div className="pb-2 text-sm font-semibold text-primary">
            {product.brand}
          </div>
          <div className="line-clamp-2 min-h-14 text-lg font-semibold">
            {product.name}
          </div>
          <div className="pt-3 text-sm font-semibold text-primary">
            ${product.price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
