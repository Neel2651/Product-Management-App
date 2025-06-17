import { ProductStatus } from "@/constants/status"; // Enum for product status values
import { titleCase } from "@/lib/utils"; // Utility to convert strings to title case
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
import { FormEvent, useEffect, useState } from "react";

interface ProductDialogProps {
  open: boolean; // Dialog open state
  onClose: () => void; // Handler to close the dialog
  onSave: (item: Omit<Product, "id"> | Product) => Promise<Boolean>; // Handler for saving a new/edited product
  productToEdit?: Product | null; // Optional product to edit
}

export function ProductDialog({
  open,
  onClose,
  onSave,
  productToEdit,
}: ProductDialogProps) {
  const [name, setName] = useState(""); // Product name
  const [status, setStatus] = useState(ProductStatus.ACTIVE); // Product status
  const [price, setPrice] = useState(""); // Product price as string for controlled input
  const [tags, setTags] = useState<string[]>([]); // Product tags as an array of strings
  const [newTag, setNewTag] = useState(""); // New tag to be added

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    newTag: "",
  }); // Error messages for form validation

  useEffect(() => {
    if (productToEdit) {
      // If editing an existing product, populate the fields with its data
      setName(productToEdit.name);
      setStatus(productToEdit.status);
      setPrice(productToEdit.price.toString());
      setTags(productToEdit.tags);
    } else {
      // Reset fields when dialog is opened for adding a new product
      setName("");
      setStatus(ProductStatus.ACTIVE);
      setPrice("");
      setTags([]);
    }
    setErrors({ name: "", price: "", newTag: "" });
  }, [productToEdit]);

  const validate = () => {
    const newErrors = { name: "", price: "", newTag: "" };
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate price
    const parsedPrice = parseFloat(price);
    if (!price.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form inputs before saving
    if (!validate()) return;

    // If editing, ensure the productToEdit has an id
    const result = await onSave({
      ...(productToEdit ? { id: productToEdit.id } : {}),
      name: name.trim(),
      status,
      price: parseFloat(price),
      tags,
    });

    setName("");
    setStatus(ProductStatus.ACTIVE);
    setPrice("");
    setTags([]);
    setNewTag("");
    setErrors({ name: "", price: "", newTag: "" });
  };

  // Handler to add a new tag
  const handleAddTag = () => {
    if (!newTag.trim()) return;

    // Check for duplicate tags
    if (tags.includes(newTag.trim().toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        newTag: "Duplicate tag not allowed",
      }));
      return;
    }

    setTags((prev) => [...prev, newTag.trim().toLowerCase()]);
    setNewTag("");
    setErrors((prev) => ({ ...prev, newTag: "" }));
  };

  // Handler to remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Dialog Title */}
      <DialogTitle>
        {productToEdit ? "Edit Product" : "Add Product"}
      </DialogTitle>
      <DialogContent>
        <form id="product-form" onSubmit={handleSave}>
          {/* Product Name */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          {/* Product Status */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
            >
              <MenuItem value={ProductStatus.ACTIVE}>Active</MenuItem>
              <MenuItem value={ProductStatus.ARCHIVED}>Archive</MenuItem>
            </Select>
          </FormControl>

          {/* Price Input */}
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            required
          />

          {/* Tag Input */}
          <Box
            mt={2}
            display={"flex"}
            alignItems={"start"}
            flexDirection={"column"}
          >
            <Box display={"flex"} alignItems={"center"}>
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

            <Box mt={1}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={titleCase(tag)}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: 5, marginBottom: 5 }}
                />
              ))}
            </Box>
          </Box>
        </form>
      </DialogContent>
      {/* Dialog Actions  */}
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
