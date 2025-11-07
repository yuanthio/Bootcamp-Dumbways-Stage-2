// src/routes/suppliers.ts
import { Router } from "express";
import { register, login, getMyProducts, getMySensitiveInfo } from "../controllers/suppliersController";
import { validate } from "../middlewares/validate";
import { supplierRegisterSchema, supplierLoginSchema } from "../utils/validators";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", validate(supplierRegisterSchema), register);
router.post("/login", validate(supplierLoginSchema), login);
router.get("/products", authMiddleware, getMyProducts);
router.get("/sensitive-info", authMiddleware, getMySensitiveInfo);

export default router;
