import { Response, NextFunction } from "express";
import prisma from "../prisma/client";
import { AuthRequest } from "./authMiddleware";

export const authorizeProductOwner = () => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const supplier = req.supplier;
    if (!supplier) return res.status(401).json({ message: "Not authenticated" });

    const productId = Number(req.params.id);
    if (isNaN(productId)) return res.status(400).json({ message: "Invalid product id" });

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.supplierId !== supplier.id) {
      return res.status(403).json({ message: "Forbidden: you are not allowed to modify this product" });
    }
    next();
  };
};
