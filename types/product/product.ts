export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  sellerId: number;
}

export interface ProductImage {
  image_url: string;
  product_id: number;
}
