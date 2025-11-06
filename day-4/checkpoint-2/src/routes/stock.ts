import express from "express";
import { getProducts, getLogStocks, updateStockFromSuppliers } from "../controllers/stock";

const router = express.Router();

router.get("/products", getProducts);
router.get("/log-stocks", getLogStocks);
router.post("/suppliers/stock", updateStockFromSuppliers);

export default router;
