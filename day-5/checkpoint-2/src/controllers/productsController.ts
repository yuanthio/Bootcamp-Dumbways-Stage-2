import { Request, Response } from "express";
import prisma from "../prisma/client";

export const addProduct = async (req: Request & { supplier?: { id: number } }, res: Response) => {
  try {
    const supplierId = req.supplier!.id;
    const { name, description, price } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        supplierId
      }
    });

    return res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request & { supplier?: { id: number } }, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const { name, description, price } = req.body;

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined
      }
    });

    return res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
