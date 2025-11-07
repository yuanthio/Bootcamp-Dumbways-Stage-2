import { Router } from "express";
import suppliers from "./suppliers";
import products from "./products";

const router = Router();

router.use("/suppliers", suppliers);
router.use("/products", products);

export default router;
