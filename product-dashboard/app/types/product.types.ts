import { ProductStatus } from "@/constants/status";

// ------------------
// Product Type
// ------------------

export type Product = {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
  tags: string[];
};

// ------------------
// Query Filters
// ------------------

export type ProductQueryParams = {
  id?: string;
  page: number;
  limit: number;
  search?: string;
  status?: ProductStatus;
  sortBy?: "name" | "price" | "status";
  sortDir?: "asc" | "desc";
};

// ------------------
// Paginated Response
// ------------------

export type PaginatedResponse = {
  data: Product[];
  page: number;
  limit: number;
  total: number;
};

// ------------------
// Validation Schemas
// ------------------
export type UpdateProductInput = {
  name: string;
  price: number;
  status: ProductStatus;
  tags: string[];
};