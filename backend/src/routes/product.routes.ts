import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import { validateProductBody } from "../middleware/validate.middleware";

const router = Router();

// GET /api/products?page=1&limit=10&search=abc&status=active&tag=tech&sortBy=price&sortDir=asc
router.get("/", getProducts);

// POST /api/products
router.post("/", validateProductBody, createProduct);

// PUT /api/products/:id
router.put("/:id", validateProductBody, updateProduct);

// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

export default router;
