export type ProductStatus = 'active' | 'archived';

export interface Product {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
  tags: string[];
}
