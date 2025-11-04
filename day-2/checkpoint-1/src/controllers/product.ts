import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data!" });
  }
};

export const findProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data!" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseFloat(stock),
      },
    });
    res.status(201).json({message: "Berhasil tambah product", product});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan data!" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {name, price, stock} = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, price: parseFloat(price), stock: parseInt(stock) }
    });

    if (!product) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil update product", product});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus data!" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.delete({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil hapus product", product});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus data!" });
  }
};

