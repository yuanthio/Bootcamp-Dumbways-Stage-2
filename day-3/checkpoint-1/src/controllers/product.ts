import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getProducts = async (req: Request, res: Response) => {
  const { sortBy, order, minPrice, maxPrice, limit, offset, minStock, maxStock } = req.query;

  const filters: any = {};
  if (minPrice || maxPrice) {
    filters.price = {
      ...(minPrice ? {gte: parseFloat(minPrice as string)} : {}),
      ...(maxPrice ? {lte: parseFloat(maxPrice as string)} : {})
    }
  }

  if (minStock || maxStock) {
    filters.stock = {
      ...(minStock ? {gte: parseFloat(minStock as string)} : {}),
      ...(maxStock ? {lte: parseFloat(maxStock as string)} : {})
    }
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    const total = await prisma.product.count({ where: filters });
    res.status(200).json({ message: "Data berhasil ditampilkan", data: products, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mendapatkan data" });
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
    res.status(201).json({ message: "Berhasil tambah product", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambahkan data!" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, price: parseFloat(price), stock: parseInt(stock) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil update product", product });
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

    res.status(200).json({ message: "Berhasil hapus product", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus data!" });
  }
};
