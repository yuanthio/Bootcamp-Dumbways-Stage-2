import { Router } from "express";
import { addProduct, updateProduct } from "../controllers/productsController";
import { validate } from "../middlewares/validate";
import { productCreateSchema } from "../utils/validators";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeProductOwner } from "../middlewares/authorizeProductOwner";

const router = Router();

router.post("/add", authMiddleware, validate(productCreateSchema), addProduct);
router.patch("/:id", authMiddleware, authorizeProductOwner(), validate(productCreateSchema), updateProduct);

export default router;
