"use client";

import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import ProductCard from "@/components/ProductCard";
import { ProductDialog } from "@/components/ProductDialog";
import { ProductStatus } from "@/constants/status";
import useDebounce from "@/hooks/useDebounce";
import { useProduct } from "@/hooks/useProducts";
import { Filters, Product } from "@/types/product.types";
import { Add } from "@mui/icons-material";
import ProductFilters from "./components/ProductFilters";

export default function ProductsPage() {
  const [open, setOpen] = useState(false); // Dialog open state for adding/editing products
  const [deleteOpen, setDeleteOpen] = useState(false); // Dialog open state for confirming deletion
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(); // Currently selected product for editing or deletion
  const [page, setPage] = useState(1); // Current page for pagination

  // Filters and sorting
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: undefined,
    sortBy: "name",
    sortDir: "asc",
  });
  const debouncedSearch = useDebounce(filters.search, 500); // Debounced search term to avoid excessive API calls

  // Fetch products using custom hook with current filters and pagination
  const { data, isLoading, createProduct, editProduct, deleteProduct } =
    useProduct({
      page,
      limit: 20,
      search: debouncedSearch,
      status: filters.status || undefined,
      sortBy: filters.sortBy,
      sortDir: filters.sortDir,
    });

  // Handle product selection for editing or deletion
  const handleSelect = (item: Product, isDelete: Boolean) => {
    setSelectedProduct(item);
    if (isDelete) {
      setDeleteOpen(true);
    } else {
      setOpen(true);
    }
  };

  // Handle product deletion confirmation
  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct.mutate(selectedProduct.id, {
        onSuccess: () => {
          setDeleteOpen(false);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  // Handle saving a new or edited product
  const handleSave = async (
    item: Omit<Product, "id"> | Product
  ): Promise<Boolean> => {
    if ("id" in item) {
      // It's an edit
      await editProduct.mutate(
        { id: item.id!, data: item },
        {
          onSuccess: () => {
            setOpen(false);
            return true;
          },
          onError: (error) => {
            console.error(error);
            return false;
          },
        }
      );
    } else {
      // It's a create
      await createProduct.mutate(item, {
        onSuccess: () => {
          setOpen(false);
          return true;
        },
        onError: (error) => {
          console.error(error);
          return false;
        },
      });
    }
    return false;
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          {/* Total Products */}
          <Typography variant="body2">{data?.total} Products</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Product Dashboard
        </Typography>

        {/* Filters */}
        <ProductFilters
          filters={filters}
          setFilters={(update) =>
            setFilters((prev) => ({ ...prev, ...update }))
          }
        />

        {/* Product List */}
        {isLoading ? (
          <Box textAlign="center" py={6}>
            <CircularProgress />
            <Typography mt={2}>Loading products...</Typography>
          </Box>
        ) : Array.isArray(data?.data) && data.data.length > 0 ? (
          <Grid container spacing={2}>
            {data?.data.map((product) => (
              <Grid
                size={{ xs: 9, sm: 6, md: 3 }}
                width={"100%"}
                key={product.id}
              >
                <ProductCard product={product} handleSelect={handleSelect} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography align="center" color="text.secondary" mt={4}>
            No products found.
          </Typography>
        )}

        {/* Pagination  */}
        {Array.isArray(data?.data) && data.data.length > 0 && (
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(data.total / 20)} // Replace with actual total pages
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}

        {/* Product Add/Edit Dialog */}
        <ProductDialog
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedProduct(undefined);
          }}
          onSave={handleSave}
          productToEdit={selectedProduct}
        />
        {/* Delete Confirmation Dialog */}
        <ConfirmDeleteDialog
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedProduct(undefined);
          }}
          onConfirm={() => handleDelete()}
          itemName={selectedProduct?.name}
        />

        {/* Add Button */}
        <Fab
          color="primary"
          aria-label="add product"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => setOpen(true)}
        >
          <Add />
        </Fab>
      </Container>
    </>
  );
}
