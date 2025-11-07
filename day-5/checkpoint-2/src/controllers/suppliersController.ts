import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../utils/cryptoUtil";

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { name, email, password, sensitiveInfo } = req.body;
  try {
    const existing = await prisma.supplier.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const encrypted = sensitiveInfo ? encrypt(sensitiveInfo) : null;

    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        password: hashed,
        sensitiveInfo: encrypted || undefined
      },
      select: { id: true, name: true, email: true }
    });

    return res.status(201).json({ message: "Supplier registered", supplier });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const supplier = await prisma.supplier.findUnique({ where: { email } });
    if (!supplier) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, supplier.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: supplier.id, email: supplier.email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "8h"
    });

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyProducts = async (req: Request & { supplier?: { id: number } }, res: Response) => {
  try {
    const supplierId = req.supplier!.id;
    const products = await prisma.product.findMany({ where: { supplierId } });
    return res.json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMySensitiveInfo = async (req: Request & { supplier?: { id: number } }, res: Response) => {
  try {
    const supplierId = req.supplier!.id;
    const supplier = await prisma.supplier.findUnique({ where: { id: supplierId } });
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    const decrypted = supplier.sensitiveInfo ? decrypt(supplier.sensitiveInfo) : null;
    return res.json({ sensitiveInfo: decrypted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
