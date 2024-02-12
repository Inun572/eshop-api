export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  seller_id: number;
}

export interface ProductImage {
  image_url: string;
  product_id: number;
}
