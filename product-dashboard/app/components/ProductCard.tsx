"use client";

import { PRODUCT_STATUS_COLORS } from "@/constants/status";
import { getFormattedNumberValue, titleCase } from "@/lib/utils";
import { Product } from "@/types/product.types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface ProductCardProps {
  product: Product;
  handleSelect: (item: Product, isDelete: Boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleSelect }) => {
  // State to manage anchor element for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handler for edit action
  const handleEdit = () => {
    handleSelect(product, false);
  };

  // Handler for delete action
  const handleDelete = () => {
    handleSelect(product, true);
  };

  // Handler for menu open action
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {/* Product Card */}
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1, paddingRight: 1 }}>
          {/* Header: Product Name & Status */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              gutterBottom
              margin={0}
              variant="h6"
              component="h2"
              noWrap
            >
              {product.name}
            </Typography>
            <Box display={"flex"} gap={"2px"} alignItems={"center"}>
              {/* Status Chip */}
              <Chip
                label={titleCase(product.status)}
                color={PRODUCT_STATUS_COLORS[product.status]}
                size="small"
              />
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                style={{ padding: 0 }}
              >
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
          {/* Tags Section */}
          <Box mb={3}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tags:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {product.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={titleCase(tag)}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
          {/* Price Section */}
          <Typography variant="h5" color="primary" fontWeight="bold">
            {getFormattedNumberValue(product.price)}
          </Typography>
        </CardContent>
        {/* Action Buttons */}
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      {/* Dropdown Menu (Three Dots) */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProductCard;
