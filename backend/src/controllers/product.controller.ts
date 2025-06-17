import { Request, Response } from "express";
import { Product } from "../types/product.types";
import { products } from "../data/mock.db";
import { statusCodes } from "../constants/statusCodes";

let productList: Product[] = [...products]; // In-memory clone

// GET /api/products
export const getProducts = (req: Request, res: Response) => {
  const {
    search = "",
    tag,
    status,
    sortBy = "name",
    sortDir = "asc",
    page = "1",
    limit = "10",
  } = req.query;

  let result = [...productList];

  // Search by name
  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes((search as string).toLowerCase())
    );
  }

  // Filter by tag
  if (tag) {
    result = result.filter((p) => p.tags.includes(tag as string));
  }

  // Filter by status
  if (status) {
    result = result.filter((p) => p.status === status);
  }

  // Sort
  result.sort((a, b) => {
    const dir = sortDir === "desc" ? -1 : 1;
    if (sortBy === "price") {
      return dir * (a.price - b.price);
    }
    return dir * a.name.localeCompare(b.name);
  });

  // Pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const start = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  res.json({
    data: paginated,
    total: result.length,
    page: pageNum,
    limit: limitNum,
  });
  return;
};

// POST /api/products
export const createProduct = (req: Request, res: Response): void => {
  const newProduct: Product = {
    id: Date.now().toString(),
    ...req.body,
  };
  productList.push(newProduct);
  res.status(statusCodes.CREATED).json(newProduct);
  return;
};

// PUT /api/products/:id
export const updateProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const index = productList.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(statusCodes.NOT_FOUND).json({ message: "Product not found" });
    return;
  }

  productList[index] = {
    ...productList[index],
    ...req.body,
  };

  res.json(productList[index]);
  return;
};

// DELETE  /api/products/:id
export const deleteProduct = (req: Request, res: Response): void => {
  const { id } = req.params;
  const index = productList.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(statusCodes.NOT_FOUND).json({ message: "Product not found" });
    return;
  }

  // Remove the product from the array
  productList.splice(index, 1);

  res.json({ message: "Product successfully deleted" });
  return;
};
