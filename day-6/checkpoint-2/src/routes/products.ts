import { Router } from "express";
import { addProduct, updateProduct } from "../controllers/productsController";
import { validate } from "../middlewares/validate";
import { productCreateSchema } from "../utils/validators";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeProductOwner } from "../middlewares/authorizeProductOwner";
import { uploadImage } from "../controllers/productsController";
import upload from "../middlewares/upload";
import limiter from "../middlewares/rate-limiter";

const router = Router();

router.post("/add", authMiddleware, validate(productCreateSchema), addProduct);
router.patch("/:id", authMiddleware, authorizeProductOwner(), validate(productCreateSchema), updateProduct);
router.post( "/upload-image", authMiddleware, limiter, upload.single("image"), uploadImage);

export default router;
