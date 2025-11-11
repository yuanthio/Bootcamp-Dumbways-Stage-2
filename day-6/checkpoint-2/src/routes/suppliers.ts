// src/routes/suppliers.ts
import { Router } from "express";
import { register, login, getMyProducts, getMySensitiveInfo } from "../controllers/suppliersController";
import { validate } from "../middlewares/validate";
import { supplierRegisterSchema, supplierLoginSchema } from "../utils/validators";
import { authMiddleware } from "../middlewares/authMiddleware";
import limiter from "../middlewares/rate-limiter";

const router = Router();

router.post("/register", validate(supplierRegisterSchema), register);
router.post("/login", validate(supplierLoginSchema), login);
router.get("/products", authMiddleware, limiter, getMyProducts);
router.get("/sensitive-info", authMiddleware, limiter, getMySensitiveInfo);

export default router;
