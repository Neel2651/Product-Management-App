import { ProductStatus } from "@/constants/status";

// ------------------
// Sorting Keys
// ------------------
export type SortBy = "name" | "price" | "status";

// ------------------
// Sorting Direction
// ------------------
export type SortDir = "asc" | "desc";

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
  sortBy?: SortBy;
  sortDir?: SortDir;
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

// ------------------
// Filter Schemas
// ------------------
export type Filters = {
  search: string;
  status: ProductStatus | undefined;
  sortBy: SortBy;
  sortDir: SortDir;
};
