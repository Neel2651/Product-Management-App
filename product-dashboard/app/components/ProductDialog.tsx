import { ProductStatus } from "@/constants/status"; // Enum for product statuses
import { titleCase } from "../../lib/utils"; // Utility to convert string to Title Case
import { Product } from "@/types/product.types";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// Props definition for the ProductDialog
interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<Product, "id"> | Product) => Promise<boolean>;
  productToEdit?: Product | null;
}

// Unified state for the product form
interface FormState {
  name: string;
  status: ProductStatus;
  price: string; // price as string for controlled input
  tags: string[];
}

export function ProductDialog({
  open,
  onClose,
  onSave,
  productToEdit,
}: ProductDialogProps) {
  // Centralized form state
  const [form, setForm] = useState<FormState>({
    name: "",
    status: ProductStatus.ACTIVE,
    price: "",
    tags: [],
  });

  // New tag input
  const [newTag, setNewTag] = useState("");

  // Form validation error messages
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    newTag: "",
  });

  // Reset or populate form when dialog opens or productToEdit changes
  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name,
        status: productToEdit.status,
        price: productToEdit.price.toString(),
        tags: productToEdit.tags,
      });
    } else {
      setForm({
        name: "",
        status: ProductStatus.ACTIVE,
        price: "",
        tags: [],
      });
    }
    setNewTag("");
    setErrors({ name: "", price: "", newTag: "" });
  }, [productToEdit]);

  // Generic handler to update form fields by key
  const handleChange = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Validate form fields before submission
  const validate = () => {
    const newErrors = { name: "", price: "", newTag: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const parsedPrice = parseFloat(form.price);
    if (!form.price.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await onSave({
      ...(productToEdit ? { id: productToEdit.id } : {}),
      name: form.name.trim(),
      status: form.status,
      price: parseFloat(form.price),
      tags: form.tags,
    });

    // Reset only if save was successful
    if (result) {
      setForm({
        name: "",
        status: ProductStatus.ACTIVE,
        price: "",
        tags: [],
      });
      setNewTag("");
      setErrors({ name: "", price: "", newTag: "" });
    }
  };

  // Add new tag to the list
  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (!tag) return;

    // Prevent duplicates
    if (form.tags.includes(tag)) {
      setErrors((prev) => ({
        ...prev,
        newTag: "Duplicate tag not allowed",
      }));
      return;
    }

    handleChange("tags", [...form.tags, tag]);
    setNewTag("");
    setErrors((prev) => ({ ...prev, newTag: "" }));
  };

  // Remove tag from the list
  const handleRemoveTag = (tagToRemove: string) => {
    handleChange(
      "tags",
      form.tags.filter((t) => t !== tagToRemove)
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Header */}
      <DialogTitle>
        {productToEdit ? "Edit Product" : "Add Product"}
      </DialogTitle>

      {/* Body */}
      <DialogContent>
        <form id="product-form" onSubmit={handleSave}>
          {/* Name Field */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          {/* Status Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as ProductStatus)
              }
            >
              <MenuItem value={ProductStatus.ACTIVE}>Active</MenuItem>
              <MenuItem value={ProductStatus.ARCHIVED}>Archived</MenuItem>
            </Select>
          </FormControl>

          {/* Price Field */}
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            required
          />

          {/* Tags Input Section */}
          <Box mt={2} display="flex" flexDirection="column" alignItems="start">
            <Box display="flex" alignItems="center">
              <TextField
                label="Add Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                error={!!errors.newTag}
                helperText={errors.newTag}
              />
              <Button onClick={handleAddTag} disabled={!newTag.trim()}>
                Add
              </Button>
            </Box>

            {/* Display Tags */}
            <Box mt={1}>
              {form.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={titleCase(tag)}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        </form>
      </DialogContent>

      {/* Footer */}
      <DialogActions>
        <Button onClick={onClose} color="warning">
          Cancel
        </Button>
        <Button form="product-form" type="submit" color="primary">
          {productToEdit ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
