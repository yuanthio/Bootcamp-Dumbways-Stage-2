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

export const uploadImage = async (req: Request & { supplier?: { id: number } }, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Tidak ada file yang diupload" });

    const supplierId = req.supplier!.id;
    const { productId } = req.body;

    if (!productId) return res.status(400).json({ message: "productId harus disertakan" });

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    if (product.supplierId !== supplierId) return res.status(403).json({ message: "Tidak boleh mengubah produk orang lain" });

    const updated = await prisma.product.update({
      where: { id: product.id },
      data: { profile: req.file.filename }
    });

    return res.json({ message: "Gambar produk berhasil diupload", product: updated });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

