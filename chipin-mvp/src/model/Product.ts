export default interface Product {
  product_id: number;
  name: string;
  created_at: string;
  url: string;
  asin: string;
  position: number;
  price: number;
  value: number | null;
  currency: string;
  number_of_offers: number | null;
  stars: number;
  reviews_count: number;
  thumbnail_url: string;
  supplier_category_name: string;
  supplier_categoryfull_name: string;
  category_url: string;
  main_supplier: string;
  second_supplier: string | null;
  third_supplier: string | null;
  description: string | null;
  short_description: string | null;
  category_id: number | null;
  sub_category_id: number | null;
  brand: string | null;
  author: string | null;
}
