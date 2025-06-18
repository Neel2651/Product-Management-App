import { ProductStatus } from "@/constants/status";
import { Filters, SortBy, SortDir } from "@/types/product.types";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";

interface ProductFiltersProps {
  filters: Filters;
  setFilters: (updatedFilters: Partial<Filters>) => void;
}

const ProductFilters = ({ filters, setFilters }: ProductFiltersProps) => {
  const handleChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters({ [key]: value });
  };

  return (
    <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" mb={2}>
      {/* Search Filter */}
      <TextField
        label="Search products"
        variant="outlined"
        size="small"
        value={filters.search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange("search", e.target.value)
        }
        sx={{ minWidth: 300 }}
      />
      {/* Status Filter */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) =>
            handleChange("status", e.target.value as ProductStatus | undefined)
          }
        >
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="archived">Archived</MenuItem>
        </Select>
      </FormControl>
      {/* Sort By Property */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sortBy}
          label="Sort By"
          onChange={(e) => handleChange("sortBy", e.target.value as SortBy)}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
      {/* Sort Direction */}
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Direction</InputLabel>
        <Select
          value={filters.sortDir}
          label="Direction"
          onChange={(e) => handleChange("sortDir", e.target.value as SortDir)}
        >
          <MenuItem value="asc">Low To High</MenuItem>
          <MenuItem value="desc">High To Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductFilters;
