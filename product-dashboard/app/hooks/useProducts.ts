import {
  PaginatedResponse,
  Product,
  ProductQueryParams,
} from "@/types/product.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios";

const API_BASE = "/products";

export function useProduct({
  id,
  page,
  limit = 20,
  search,
  status,
  sortBy,
  sortDir,
}: ProductQueryParams) {
  const queryClient = useQueryClient();

  // fetch product(s)
  // if id is provided -> fetch single product
  // if not -> fetch products with pagination, filtering, and sorting
  const { data, isLoading, isError, error } = useQuery<PaginatedResponse>({
    queryKey: id
      ? ["products", id]
      : ["products", { page, limit, search, status, sortBy, sortDir }],
    queryFn: async (): Promise<PaginatedResponse> => {
      if (id) {
        const res = await api.get(`${API_BASE}/${id}`);
        return res.data;
      }
      // List with pagination & filtering
      const res = await api.get(API_BASE, {
        params: {
          page,
          limit,
          search,
          status,
          sortBy,
          sortDir,
        },
      });
      return res.data;
    },
    enabled: id ? !!id : true,
  });

  // create product
  const createProduct = useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: async (newProduct) => {
      const res = await api.post(API_BASE, newProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // edit product
  const editProduct = useMutation<
    Product,
    Error,
    { id: string; data: Partial<Omit<Product, "id">> }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await api.put(`${API_BASE}/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", variables.id] });
    },
  });

  // delete product
  const deleteProduct = useMutation<void, Error, string>({
    mutationFn: async (idToDelete) => {
      await api.delete(`${API_BASE}/${idToDelete}`);
    },
    onSuccess: (_, idToDelete) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", idToDelete] });
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    createProduct,
    editProduct,
    deleteProduct,
  };
}
