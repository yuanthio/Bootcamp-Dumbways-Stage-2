import express from "express";
import {
  getProducts,
  createProduct,
  findProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product";

const router = express.Router();
router.get("/products", getProducts);
router.get("/find-product/:id", findProduct);
router.post("/create-product", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
